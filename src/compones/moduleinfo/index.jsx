import { useEffect, useState } from "react"
import { Switch,Form,Input,Select,Button } from 'antd';
import { useAuth } from "../../provider/auth";


// name,desc,parentmodule,ischild
const ModuleInfo = ({currentModule, modules,createing, reset}) => {
    const [info, setInfo] = useState({})
    const [parents, setParents] = useState({})
    const [defaultParent, setDefaultParent] = useState('')

    const [form] = Form.useForm()
    
    const [isChild, setIsChild] = useState(false)

    const [updateing, setUpdateing] = useState(false)
    const [submiting, setSubmiting] = useState(false)

    const {mainActor} = useAuth()

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
        // console.log(currentModule)
        if(!createing && modules.length > 0){
            console.log("init update module info")
            setIsChild(currentModule.isChild)
            setInfo(currentModule)
        }

        let parentSelects = modules.map(item =>{
            return {
                value: item.name,
                label: item.name,
            }
        })
        setParents(parentSelects)

    },[])

    useEffect(()=>{
        // console.log(isChild)
        form.setFieldsValue({
            name: info.name,
            desc: info.desc,
            isChild: info.isChild || false,
            parentModule: info.parentModule || ''
        })
        if (info.parentModule != ""){
            setDefaultParent({value:info.parentModule, label:info.parentModule})
        }
    }, [info])

    const handleUpdate = () =>{
        setUpdateing(!updateing)
        console.log(form)
        if(updateing){
            form.setFieldsValue({
                name: info.name,
                desc: info.desc,
                isChild: info.isChild,
                parentModule: info.parentModule
            })
            setIsChild(info.isChild)
        }
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
    const onFinish = async (values) => {
        console.log(values);
        if (values.parentModule == undefined || values.isChild == false){
            values.parentModule = ""
        }
        await mainActor.addOrUpdateModule(values)
        await reset()
        setSubmiting(false)
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
                {createing || updateing?<Input />:<Input disabled />}
            </Form.Item>
            <Form.Item 
            label="decription" name="desc" resules={[{required:true,message:"module description"}]}>
                {createing || updateing?<Input.TextArea/>:<Input.TextArea disabled/>}
            </Form.Item>
            <Form.Item label="isChild" name="isChild" valuePropName="checked" initialValue={isChild}>
                {createing || updateing ? 
                    <Switch value={isChild} onClick={handleChildSwitch}/>
                    :
                    <Switch value={isChild} onClick={handleChildSwitch} disabled/>}
            </Form.Item>
            {isChild ? 
                <Form.Item
                label="parentModule" name="parentModule" resules={[{required:false}]} initialValue={defaultParent}>
                    {createing || updateing?
                        <Select onChange={handleSelect} options={parents}></Select>
                        :
                        <Select onChange={handleSelect} options={parents} disabled></Select>
                    }
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
                {createing || updateing?
                    <Button type="primary" onClick={handleSubmit} loading={submiting} htmlType="submit">
                        Submit
                    </Button>
                    :
                    <Button type="primary" onClick={handleSubmit} loading={submiting} htmlType="submit" disabled>
                        Submit
                    </Button>
                }
            </Form.Item>
        </Form>
        </>
    )

}

export default ModuleInfo