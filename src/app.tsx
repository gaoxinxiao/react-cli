import * as React from 'react'
import { Form, Input } from 'antd'

export default Form.create()(
    class App extends React.Component<any, any>{
        render() {
            const {
                getFieldDecorator,
                setFieldsValue
            } = this.props.form;
            return <div>
                <Form>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [
                                { "required": true, },
                                { "max": 5, "message": "最大输入5" }],
                            initialValue: "123"
                        })(
                            <Input placeholder="Username" onChange={(e)=>{
                                console.log(e.target.value)
                            }}/>
                        )}
                    </Form.Item>
                </Form>
            </div>
        }
    }
)