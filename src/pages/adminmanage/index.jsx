import { Button, Drawer, Table } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import AddUser from "../../compones/adduser"


const AdminManage = () => {
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([])

    const columns = [
        {
            title: '成员名',
            dataIndex: 'name',
            key:'name',
        },
        {
            title: 'princpal',
            dataIndex:'princpal',
            key:'princpal',
        },
        {
            title: '添加人',
            dataIndex: 'cName',
            key: 'cName',
        },
        {
            title: '添加人Id',
            dataIndex: 'cUid',
            key: 'cUid',
        },
        {
            title: '添加时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '更新人',
            dataIndex: 'uName',
            key:'uName',
        },
        {
            title: '更新人Id',
            dataIndex: 'uUid',
            key: 'uUid',
        },
        {
            title: '更新时间',
            dataIndex: 'utime',
            key: 'utime',
        },
        {
            title:'Action',
            key:'action',
            render:(_,record)=>(
                <Space size="middle">
                    <Button type='primary' >update</Button>
                    <Button type='primary' danger>remove</Button>
                </Space>
            )
        }
    ]

    const initUsers = () =>{
        setUsers([])
    }

    useEffect(()=>{
        initUsers()
    },[])

    const onClose = () =>{
        setOpen(false)
    }

    const handleOpen = () =>{
        setOpen(true)
        // console.log(record)
    }

    return (
        <div className=''>
            <h1>成员管理</h1>
            <hr></hr>
            <div className="mt-10">
                <Button className='float-right' type="primary" onClick={handleOpen}>add user</Button>
                <Table columns={columns} dataSource={users}></Table>
                <Drawer title="添加管理员" onClose={onClose} open={open}>
                    <AddUser></AddUser>
                </Drawer>
            </div>
        </div>
    )
}

export default AdminManage