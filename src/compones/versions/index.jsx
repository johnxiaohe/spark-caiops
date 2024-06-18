import { Button, Table, Space,Drawer } from "antd"
import { useEffect, useState } from "react"
import NewVersion from "./newversion"

// 版本列表（名称、描述、更新人、上传wasm人、时间）
// 更新版本信息
// 新增版本
const Versions = ({moduleName}) => {
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false);
    const [currentUpdateInfo, setCurrentUpdateInfo] = useState({})

    useEffect(()=>{
        let list = [{
            key:1,
            name:moduleName,
            desc:moduleName,
            updateUser:"reuben",
            updateUid:'1',
            utime:"123",
            size:123,
            ctime: '123',
            createUid:1,
        }]
        setList(list)
    },[])

    const onClose = () => {
        setOpen(false)
        setCurrentUpdateInfo({})
    }

    const handleOpen = (record) =>{
        setOpen(true)
        setCurrentUpdateInfo(record)
        // console.log(record)
    }


    const columns = [
        {
            title: '版本名',
            dataIndex: 'name',
            key:'name',
        },
        {
            title: '描述',
            dataIndex:'desc',
            key:'desc',
        },
        {
            title: '创建时间',
            dataIndex: 'ctime',
            key: 'ctime',
        },
        {
            title: '创建人',
            dataIndex: 'createUser',
            key: 'createUid',
        },
        {
            title: '更新人',
            dataIndex: 'updateUser',
            key:'updateUid',
        },
        {
            title: '更新时间',
            dataIndex: 'utime',
            key: 'utime',
        },
        {
            title:'wasm-size',
            dataIndex:'size',
            key:'size'
        },
        {
            title:'Action',
            key:'action',
            render:(_,record)=>(
                <Space size="middle">
                    <Button type='primary' onClick={()=>{handleOpen(record)}}>update</Button>
                </Space>
            )
        }
    ]
    return (
        <div className="mt-10">
            <Table columns={columns} dataSource={list}></Table>
            <Drawer title="更新版本" onClose={onClose} open={open}>
                <NewVersion moduleName={moduleName} update={true} versionInfo={currentUpdateInfo}></NewVersion>
            </Drawer>
        </div>
    )
}

export default Versions