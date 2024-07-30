import { Form,Input,Button } from "antd"
import { useEffect,useState } from "react"
import { useAuth } from "../../provider/auth"


const AddUser = ({close}) => {

    const [form] = Form.useForm()
    const [submiting, setSubmiting] = useState(false)
    const {pid, mainActor} = useAuth()

    const formItemLayout = {
        labelCol: {
            xs: {
                span:24,
            },
            sm:{
                span:6,
            },
        },
        wrapperCol:{
            xs:{
                span:24,
            },
            sm:{
                span:14,
            },
        },
    }

    const handleSubmit = (value) =>{
        setSubmiting(true)
    }

    const handleFinish = async (values) => {
        await mainActor.addAdmins(values.name, values.pid)
        setSubmiting(false)
        
        close()
    }

    return (
    <div>
        <Form 
        {...formItemLayout}
        form={form}
        style={{maxWidth:600,}}
        onFinish={handleFinish}
        >
            <Form.Item label="成员名" name="name" resules={[{required:true}]}>
                <Input />
            </Form.Item>
            <Form.Item label="principal" name="pid" resules={[{required:true}]}>
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
            }}>
                <Button type="primary" onClick={handleSubmit} loading={submiting} htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
    )
}

export default AddUser