import { Form,Input,Button,Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useEffect,useState } from "react"
import { useAuth } from "../../provider/auth";

const NewVersion = ({moduleName, update, versionInfo, callback}) => {

    const [form] = Form.useForm()
    const [file, setFile] = useState([]);
    const [wasmData, setWasmData] = useState([]);
    const [submiting, setSubmiting] = useState(false)
    const [currentFile, setCurrentFile] = useState({})

    const { mainActor } = useAuth()

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

    const uploadProps = {
        onRemove: (file) => {
          setFile({})
        },
        beforeUpload: (file) => {
            setCurrentFile(file)
            let reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = function() {
                const bytes = new Uint8Array(reader.result)
                const bytesArray = []
                for (let i = 0; i < bytes.length; i++) {
                    bytesArray.push(bytes[i])
                }
                setWasmData(bytesArray)
            }
          return false
        },
        file,
    };

    useEffect(() => {
        if(update){
            form.setFieldsValue({
                name: versionInfo.name,
                desc: versionInfo.desc,
                wasm: []
            })
        }else{
            form.setFieldsValue({
                name: '',
                desc: '',
                wasm: []
            })
        }
    }, [versionInfo])

    const onFinish = async (values) => {
        
        if(update){
            let wasm = versionInfo.wasm
            if (wasmData.length > 0){
                wasm = wasmData
            }
            // console.log(wasm)
            const result = await mainActor.updateVersion(moduleName, versionInfo.id, values.name, values.desc, wasm)
            if (result != ""){
                alert("更新失败" + result)
            }
        }else{
            if (wasmData.length < 1){
                alert("must upload wasm file ")

            }else{
                await mainActor.addVersion(moduleName, values.name, values.desc, wasmData)
            }
        }
        setSubmiting(false)
        callback()
    }

    const handleSubmit = () =>{
        setSubmiting(true)
    }

    return (
        <Form
        {...formItemLayout}
        form={form}
        style={{maxWidth:600,}}
        onFinish={onFinish}
        >
            <Form.Item 
            label="name" name="name" resules={[{required:true}]}>
                <Input />
            </Form.Item>
            <Form.Item 
            label="desc" name="desc" resules={[{required:true}]}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item 
            label="wasm" name="wasm" resules={[{required:true}]}>
                <Upload {...uploadProps} maxCount={1} accept=".jsx">
                    <Button icon={<UploadOutlined />}>Upgrade</Button>
                </Upload>
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
    )
}

export default NewVersion