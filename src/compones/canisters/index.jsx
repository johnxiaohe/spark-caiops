import { Table,Button,Space,Drawer,Input,Pagination } from "antd"
import { useEffect, useState } from "react"
import { useAuth } from "../../provider/auth"
import {createActor} from '../../spark_caiops'

// 展示当前模块的所有canisters, 由前端拉取canisters的版本号。
// 可以点击按钮更新所有canister到指定版本
// 可以选择某个canister升级到指定版本
const Canisters = ({moduleName}) => {
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [openAdd, setOpenAdd] = useState(false)
    const [canisterId, setCanisterId] = useState('')
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const {mainActor,agent} = useAuth()

    const initCanisters = async () =>{
        let result = await mainActor.canisters(moduleName, BigInt(page), BigInt(size))
        console.log(result)
        let datas = result.data.map(cai => {
            return {
                key: cai.cid,
                cid: cai.cid,
                version: cai.version
            }
        })
        setList(datas)
        setTotal(Number(result.count))
    };

    const pullCanisters = async () =>{
        await mainActor.initChilds(moduleName)
        initCanisters()
    };

    const showAddDrawer = () => {
        setOpenAdd(true);
    };
  
    const closeAddDrawer = () => {
        setOpenAdd(false);
    };

    const addCanister = async () => {
       let result = await mainActor.addCanisterByAdmin(moduleName, canisterId)
       if (!result){
            alert('add canister failed')
       }else{
            await initCanisters()
            closeAddDrawer()
            setCanisterId('')
       }
    }

    const onPageChange = async(page, pageSize) => {
        setPage(page)
    }

    useEffect(() => {
        if(moduleName != undefined){
            initCanisters()
        }
    }, [moduleName, page])

    const columns = [
        {
            title: '容器ID',
            dataIndex: 'cid',
            key:'cid',
        },
        {
            title: '版本',
            dataIndex:'version',
            key:'version',
        },
        {
            title:'Action',
            key:'action',
            render:(_,record)=>{
                return (
                            <Space size="middle">
                                <Button type='primary' onClick={()=>{handleOpen(record)}}>upgrade</Button>
                                {/* <Button type='warning' >recycle</Button> */}
                            </Space>
                        )
            }
        },
    ]

    return (
        <div className="mt-10">
        <Button className="float-right" type='primary' onClick={()=>{showAddDrawer()}}>add canister</Button>
        <Button className="float-right" type='primary' onClick={()=>{handleOpen(record)}}>upgrade all</Button>
        <Button className="float-right" type='primary' onClick={()=>{pullCanisters()}}>init canisters</Button>

        <Table  
            columns={columns} 
            dataSource={list}
            pagination={false}
        >
        </Table>
        <Pagination className="float-right mt-5"
            total={total}
            current= {page}
            pageSize= {size}
            showTotal={(total) => `Total ${total} items`}
            onChange= {onPageChange}
        />
        <Drawer title="Add Canister" onClose={closeAddDrawer} open={openAdd}>
            <Space direction="vertical" size="middle">
                <Space.Compact>
                    <Input addonAfter="Module" value={moduleName} disabled/>
                </Space.Compact>
                <Space.Compact style={{ width: '100%' }}>
                    <Input value={canisterId} onChange={e => { setCanisterId(e.target.value)}} placeholder="input canister id" />
                    <Button type="primary" onClick={addCanister}>Submit</Button>
                </Space.Compact>
            </Space>
        </Drawer>
        </div>
    )

}

export default Canisters