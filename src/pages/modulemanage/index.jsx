import { Button, Menu,Dropdown,Space,Drawer } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModuleInfo from '../../compones/moduleinfo'
import Versions from '../../compones/versions'
import NewVersion from '../../compones/versions/newversion';
import Canisters from '../../compones/canisters';
import { useAuth } from '../../provider/auth';

const ModuleManage = () => {
    const [modules, setModules] = useState([])
    const [currentModule, setCurrentModule] = useState({})

    // const [actions, setActions] = useState(['模块信息','版本列表','容器列表'])
    const [actions, setActions] = useState(['模块信息','版本列表','容器列表'])
    const [currentAction, setCurrentAction] = useState('模块信息')

    const [items, setItems] = useState([])
    const [menus, setMenus] = useState([])

    const [content, setContent] = useState()

    const [open, setOpen] = useState(false);
    const [newVersion, setNewVersion] = useState(false);

    const {mainActor} = useAuth()

    const initModules = async() => {
        const newModules = await mainActor.modules()
        setModules(newModules)
        if (newModules.length > 0){
            setCurrentModule(newModules[0])
        }
        setOpen(false)
    }

    const resetSelecter = () =>{
        let items = modules.map(item =>{
            return {
                key: item.name,
                label: item.name,
                disabled: currentModule.name === item.name
            }
        })
        setItems(items)
    }

    useEffect(()=>{
        // init modulenames
        initModules()
    }, [])

    useEffect(()=>{
        // init modules selecter
        resetSelecter()

        // init action bar
        let menus = actions.map(menu => {
            return {
                label: menu,
                key: menu,
                // icon
            }
        })
        setMenus(menus)
    }, [modules])

    useEffect(()=>{
        // reset module selector
        resetSelecter() 

        // reset action
        setCurrentAction('版本列表')
    }, [currentModule])

    // useEffect(()=>{
        
    //     // reset content
    //     if(currentAction === '模块信息'){
    //         if (modules.length == 0){
    //             setContent(<p >请先添加模块</p>)
    //         }else{
    //             setContent(<ModuleInfo currentModule={currentModule} modules={modules} createing={false} reset={initModules}></ModuleInfo>)
    //         }
    //         return
    //     }
    //     if(currentAction === '版本列表'){
    //         setContent(<Versions moduleName={currentModule}></Versions>)
    //         return
    //     }
    //     if(currentAction === '容器列表'){
    //         setContent(<Canisters moduleName={currentModule}></Canisters>)
    //         return
    //     }
        
    // }, [currentModule,currentAction])

    const menuClick = (e) => {
        setCurrentAction(e.key)
    }
    const moduleClick = (e) => {
        modules.forEach(item => {
            if (item.name === e.key){
                setCurrentModule(item)
            }
        })
    }
    const handleCreate = () => {
        setOpen(true)
    }

    const handleNewVersion = () => {
        setNewVersion(true)
    }

    const handleCreateClose = () => {
        setOpen(false)
    }

    const handleVersionClose = () => {
        setNewVersion(false)
    }

    // 模块列表、模块的版本列表、模块canister列表、模块详情/更新
    // 二级联动展示 模块列表和其功能
    return (
        <div className='w-full'>
          <div className='w-full h-10 flex flex-row'>
            <div className='basis-1/4 h-full text-slate-400 text-2xl pt-2'>模块管理</div>
          </div>

          <hr className='h-1'/>
          <div className='w-full h-10 flex flex-row'>
            <span className='basis-1/7 h-full text-xl pt-1'>
                模 块: 
            </span>
            <Dropdown menu={{items,onClick:moduleClick}} icon={<DownOutlined />} className='basis-1/6 text-l mt-0.5 ml-3 pt-1'>
                <Button icon={<DownOutlined />} iconPosition='end'>
                    <Space>
                        {currentModule.name}
                    </Space>
                </Button>
            </Dropdown>
            <Button  className='basis-1/7 text-xs ml-3 mt-0.5 pt-0.5' type="primary" onClick={handleCreate}>
                新增模块
            </Button>
            <Button  className='basis-1/7 text-xs ml-3 mt-0.5 pt-0.5' type="primary" onClick={handleNewVersion}>
                新增版本
            </Button>
          </div>
          <div>
            <Menu onClick={menuClick} selectedKeys={[currentAction]} mode="horizontal" items={menus}></Menu>
            <div className='w-full bg-gray1-100'>
                {/* {content} */}
                { currentAction == '模块信息' ? 
                    <ModuleInfo currentModule={currentModule} modules={modules} createing={false} reset={initModules}></ModuleInfo>
                    :
                    currentAction == '版本列表' ?
                    <Versions currentModule={currentModule} refresh={newVersion}></Versions>
                    :
                    <Canisters moduleName={currentModule}></Canisters>
                }
            </div>
          </div>
          <Drawer title="新增模块" onClose={handleCreateClose} open={open}>
            <ModuleInfo currentModule={{name:'',desc:'',isChild:false,parentModule:''}} modules={modules} createing={true} reset={initModules}></ModuleInfo>
          </Drawer>
          <Drawer title="新增版本" onClose={handleVersionClose} open={newVersion}>
                <NewVersion moduleName={currentModule.name} update={false} versionInfo={{}} callback={handleVersionClose}></NewVersion>
          </Drawer>
        </div>
    )
}

export default ModuleManage