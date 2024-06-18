import { useEffect, useState } from "react"
import { Switch,Form,Input,Select,Button } from 'antd';


// name,desc,parentmodule,ischild
const ModuleInfo = ({moduleNam, modules,createing}) => {
    const [info, setInfo] = useState({})
    const [parents, setParents] = useState({})
    const [defaultParent, setDefaultParent] = useState('')

    const [form] = Form.useForm()
    
    const [isChild, setIsChild] = useState(false)

    const [updateing, setUpdateing] = useState(false)
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

    useEffect(() =>{
        let info = {
            name: "模块1",
            desc: "模块描述",
            isChild: false,
            parentModule: "模块1"
        }
        setIsChild(false)
        setInfo(info)

        let parentSelects = modules.map(name =>{
            return {
                value: name,
                label: name,
            }
        })
        setParents(parentSelects)

        if (info.parentModule != ""){
            setDefaultParent({value:info.parentModule, label:info.parentModule})
        }

        form.setFieldsValue({
            name: info.name,
            desc: info.desc,
            isChild: info.isChild,
            parentModule: info.parentModule
        })
    },[])

    useEffect(()=>{
        console.log(isChild)
    }, [isChild])

    const handleUpdate = () =>{
        setUpdateing(!updateing)
    }

    const handleSubmit = () =>{
        setSubmiting(true)
    }
    const handleChildSwitch = () =>{
        setIsChild(!isChild)
    }
    const handleSelect = (value)=>{
        console.log(value)
    }
    const onFinish = (values) => {
        console.log(values);
        if(createing){

        }else{
            
        }
    };

    return (
        <>
        <Form className="mt-10"
        {...formItemLayout}
        form={form}
        style={{maxWidth:600,}}
        onFinish={onFinish}
        >
            <Form.Item 
            label="name" name="name" resules={[{required:true,message:"module name"}]}>
                <Input />
            </Form.Item>
            <Form.Item 
            label="decription" name="desc" resules={[{required:true,message:"module description"}]}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item label="isChild" name="isChild" valuePropName="checked" initialValue={isChild}>
                <Switch value={isChild} onClick={handleChildSwitch}/>
            </Form.Item>
            {isChild ? 
                <Form.Item
                label="parentModule" name="parentModule" resules={[{required:false}]} initialValue={defaultParent}>
                    <Select onChange={handleSelect} options={parents}></Select>
                </Form.Item> 
                :
                <></>
            }
            <Form.Item      
                wrapperCol={{
                offset: 8,
                span: 16,
            }}>
                {!createing ? 
                    <Button className="mr-10" type="primary" onClick={handleUpdate}>
                        {updateing? "Cancel" : "Update"}
                    </Button>
                    :
                    <></>
                }
                <Button type="primary" onClick={handleSubmit} loading={submiting} htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    )

}

export default ModuleInfo