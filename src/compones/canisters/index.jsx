import { Table,Button } from "antd"
import { useEffect, useState } from "react"

// 展示当前模块的所有canisters, 由前端拉取canisters的版本号。
// 可以点击按钮更新所有canister到指定版本
// 可以选择某个canister升级到指定版本
const Canisters = ({moduleNam}) => {
    const [list, setList] = useState([])
    

    useEffect(() => {
        const datasource = []
        setList(datasource)
    }, [])

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
            title: 'owner',
            dataIndex: 'pid',
            key: 'pid',
        },
        {
            title:'Action',
            key:'action',
            render:(_,record)=>(
                <Space size="middle">
                    <Button type='primary' onClick={()=>{handleOpen(record)}}>upgrade</Button>
                    <Button type='warning' >recycle</Button>
                </Space>
            )
        }
    ]

    return (
        <div className="mt-10">
        <Button className="float-right" type='primary' onClick={()=>{handleOpen(record)}}>upgrade all</Button>
        <Table  columns={columns} dataSource={list}>
        </Table>
        </div>
    )

}

export default Canisters