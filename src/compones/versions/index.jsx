import { Button, Table, Space,Drawer } from "antd"
import { useEffect, useState } from "react"
import NewVersion from "./newversion"
import { useAuth } from "../../provider/auth"
import { timeFormat } from "../../utils/dataFormat"
import { Int } from "@dfinity/candid/lib/cjs/idl"

// 版本列表（名称、描述、更新人、上传wasm人、时间）
// 更新版本信息
// 新增版本
const Versions = ({currentModule, refresh}) => {
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false);
    const [currentUpdateInfo, setCurrentUpdateInfo] = useState({})
    const {mainActor}  = useAuth()

    const initVersions = async () => {
        const versions = await mainActor.versions(currentModule.name)
        // console.log(versions)
        versions.forEach(element => {
            element.key = element.id
            element.createTime = timeFormat(element.cTime)
            element.updateTime = timeFormat(element.uTime)
            element.size = element.wasm.length
        });
        setList(versions)
    }

    useEffect(()=>{
        initVersions()
    },[currentModule, refresh, open])

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
            title: '版本号',
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
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '创建人',
            dataIndex: 'cPid',
            key: 'cPid',
        },
        {
            title: '更新人',
            dataIndex: 'uPid',
            key:'uPid',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
        {
            title:'wasm-size',
            dataIndex:'size',
            key:'size',
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
                <NewVersion moduleName={currentModule.name} update={true} versionInfo={currentUpdateInfo} callback={onClose}></NewVersion>
            </Drawer>
        </div>
    )
}

export default Versions