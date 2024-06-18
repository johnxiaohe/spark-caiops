import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './tailwind.css'
import ModuleManage from './pages/modulemanage'
import AdminManage from './pages/adminmanage'
import { Button } from 'antd'

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
  const [modules, setModules] = useState(["模块管理","成员管理"])
  const [moduleLis, setModuleLis] = useState([])
  const [current, setCurrent] = useState("模块管理")
  const [rightBody, setRightBody] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState('reuben')
  const [pid, setPid] = useState('aaaa-aaa')

  const onClickBar = (name) => {
    setCurrent(name)
  }

  useEffect(() => {
    // let moduleLis = modules.map(name => {
    //   let fcs = false;
    //   if (name === current){
    //     fcs = true;
    //   }
    //   return (
    //     <BarLi click={() => {onClickBar(name)}} name={name} focus={fcs}></BarLi>
    // )})
    // setModuleLis(moduleLis)
  }, [])

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
            <div>
              <h1>{username}</h1>
              <p>{pid}</p>
            </div> 
            : 
            <Button type='primary'>login</Button>}
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
