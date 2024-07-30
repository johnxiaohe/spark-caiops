import { Button, Drawer, Table,Space } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import AddUser from "../../compones/adduser"
import { useAuth } from "../../provider/auth"
import { timeFormat } from "../../utils/dataFormat"


const AdminManage = () => {
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([])
    const {pid, mainActor} = useAuth()

    const columns = [
        {
            title: '成员名',
            dataIndex: 'name',
            key:'name',
        },
        {
            title: '成员Pid',
            dataIndex:'pid',
            key:'pid',
        },
        {
            title: '添加人Pid',
            dataIndex: 'cPid',
            key: 'cPid',
        },
        {
            title: '添加时间',
            dataIndex: 'createTime',
            key: 'createTime',
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

    const initUsers = async () =>{
        const members = await mainActor.adminList()
        members.forEach(element => {
            element.key = element.pid
            element.createTime = timeFormat(element.cTime)
        });
        console.log(members)
        setUsers(members)
    }

    useEffect(()=>{
        initUsers()
    },[])

    const onClose = () =>{
        setOpen(false)
        initUsers()
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
                    <AddUser close={onClose}></AddUser>
                </Drawer>
            </div>
        </div>
    )
}

export default AdminManage