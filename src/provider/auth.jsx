import React, {useState} from "react";
import { AuthClient } from '@dfinity/auth-client'
import { HttpAgent } from '@dfinity/agent'
import {createActor} from '../spark_caiops'

const days = BigInt(1)
const hours = BigInt(24)
const nanoseconds = BigInt(3600000000000)
export const defaultOptions = {
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      'local' === 'ic'
        ? 'https://identity.ic0.app/#authorize'
        // : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8080/#authorize`,
         : `http://qhbym-qaaaa-aaaaa-aaafq-cai.localhost:8080/#authorize`,
    // Maximum authorization expiration is 8 days
    maxTimeToLive: days * hours * nanoseconds,
  },
}

const AuthContext = React.createContext()

export const AuthProvider = ({children}) =>{
    const [isLogin, setIsLogin] = useState(false)
    const [pid, setPid] = useState('')
    const [username, setUserName] = useState('')

    const [agent, setAgent] = useState(null)
    const [authClient, setAuthClient] = useState(null)
    const [mainActor, setMainActor] = useState(null)

    const init = async () => {
        console.log('init========')
        const _authClient = await AuthClient.create(defaultOptions.createOptions)
        setAuthClient(_authClient)
        if (await _authClient.isAuthenticated()) {
          handleAuthenticated(_authClient)
        } else {
            setIsLogin(false)
        }
        return _authClient
    }
    const handleAuthenticated = async (authClient) => {
        console.log('handleAuthenticated========')
        const identity = authClient.getIdentity()
        const agent = new HttpAgent({host:process.env.HOST, identity: identity})
        setAgent(agent)
        const _principalId = identity.getPrincipal().toText()
        setPid(_principalId)
        console.log(_principalId)
        
        const actor = createActor(process.env.CANISTER_ID_SPARK_CAIOPS, {agent})
        setMainActor(actor)
        const name = await actor.checkAdmin()
        console.log(name)
        if (name != "") {
        // todo: init userinfo
          setIsLogin(true)
          setUserName(name)
        }else{
          setIsLogin(false)
          setUserName("不是管理员")
        }
    }

    const login = async () => {
        let _authClient = authClient
        if (!_authClient) _authClient = await init()
        _authClient.login({
          ...defaultOptions.loginOptions,
          onSuccess: () => handleAuthenticated(_authClient),
        })
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                isLogin,
                pid,
                username,
                mainActor,
                agent,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const context = React.useContext(AuthContext)
    if (context == undefined){
        throw new Error(" auth failed")
    }
    return context
}