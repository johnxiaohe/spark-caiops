import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './tailwind.css'
import ModuleManage from './pages/modulemanage'
import AdminManage from './pages/adminmanage'
import { Button } from 'antd'
import { useAuth } from './provider/auth'
import {
  CopyOutlined,
} from '@ant-design/icons'
import copy from 'copy-to-clipboard'

function BarLi({click,name,focus}){

  let className = "my-5 h-10 py-2 rounded-l-lg \
    hover:cursor-pointer \
    hover:shadow-slate-300 \
    hover:shadow-[inset_4px_2px_4px_0_rgb(0,0,0,0.05)] \
    hover:bg-white"
  if(focus){
    className = "my-5 h-10 py-2 rounded-l-lg \
      cursor-pointer \
      shadow-slate-300 \
      shadow-[inset_4px_2px_4px_0_rgb(0,0,0,0.05)] \
      bg-white"
  }

  return (
    <li key={name} onClick={() => {click()}} className={className}>
      {name}
    </li>
  )
}

function App() {
  // const [count, setCount] = useState(0)
  const [modules, setModules] = useState(["请登录"])
  const [moduleLis, setModuleLis] = useState([])
  const [current, setCurrent] = useState("请登录")
  const [rightBody, setRightBody] = useState("")
  const {login, isLogin, pid,username} = useAuth()

  const onClickBar = (name) => {
    setCurrent(name)
  }

  useEffect(() => {
    if(isLogin){
      setCurrent("模块管理")
      setModules(["模块管理","成员管理"])
    }
  }, [isLogin])

  useEffect(() =>{ 
    let moduleLis = modules.map(name => {
      let fcs = name === current;
      return (
        <BarLi key={name} click={() => {onClickBar(name)}} name={name} focus={fcs}></BarLi>
    )})
    setModuleLis(moduleLis)
    if (current === "模块管理"){
      setRightBody(<ModuleManage></ModuleManage>)
      return
    }
    if(current === "成员管理"){
      setRightBody(<AdminManage></AdminManage>)
      return
    }
    if(current === "请登录"){
      setRightBody(<p>请登录/联系管理员添加至管理再登陆</p>)
      return
    }
  }, [current])
  // 左右布局，左侧导航栏 + 登陆，右侧内容展示
  // 模块列表 : 新增模块、修改模块信息、模块列表、版本列表
  // 成员管理 : 成员列表、新增成员
  return (
    <div className='flex w-full h-full'>
      <div className='w-1/5 shadow-l bg-slate-100'>
        <div className='mx-auto m-10 py-0.5 w-4/5 h-20 rounded-lg bg-blue-500 shadow-l shadow-blue-500/50'>
          <div className='my-6 text-center text-white'>Spark CaiOps</div>
        </div>
        <div className='mx-auto m-10 py-0.5 w-4/5 h-15'>
          {isLogin?
            <div className="flex justify-center">
              <h1>{username}</h1>
              <Button
                type="link"
                onClick={() => {
                  copy(pid)
                }}
                icon={<CopyOutlined />}
              />

            </div> 
            : 
            <Button type='primary' onClick={login}>login</Button>}
        </div>
        <div className='w-full h-3/5 text-center'>
          <ul className='w-full h-30 my-20 pl-5'>
            {moduleLis}
          </ul>
        </div>
      </div>
      <div className='w-4/5 p-6 bg-white'>
        {rightBody}
      </div>
    </div>
  )
}

export default App
