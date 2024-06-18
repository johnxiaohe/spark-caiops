import { Form,Input,Button } from "antd"
import { useEffect,useState } from "react"


const AddUser = () => {

    const [form] = Form.useForm()
    const [submiting, setSubmiting] = useState(false)

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

    const handleSubmit = () =>{
        setSubmiting(true)
        console.log(currentFile)
    }

    return (
    <div>
        <Form 
        {...formItemLayout}
        form={form}
        style={{maxWidth:600,}}
        >
            <Form.Item 
            label="成员名" name="name" resules={[{required:true}]}>
                <Input />
            </Form.Item>
            <Form.Item
            label="principal" name="principal" resules={[{required:true}]}>
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