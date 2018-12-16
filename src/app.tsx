import * as React from 'react'
import { Row, Col, Form, Input, Button } from 'antd'

const formItemLayout = {
    labelCol: {
        sm: {
            span:6,
            
        }
    },
    wrapperCol: {
        sm: {
            span:18,
        },
    }
};
const btntemLayout = {
    wrapperCol: {
        sm: {
            span:18,
        },
    }
};
export default Form.create()(
    class App extends React.Component<any, any>{
        state = { ...this.props.form }
        onReset() {
            this.state.resetFields()
        }
        onConfirm() {
            let res = this.state.getFieldsValue()
            console.log(res)
        }
        render() {
            const {
                getFieldDecorator
            } = this.props.form;
            return <Row gutter={8} type="flex" justify="start">
                <Col span={8}>
                    <Form.Item label="用户名" {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            rules: [
                                { "required": true, },
                                { "max": 12, "message": "最大输入11" },
                                { "pattern": /^1[3-578]\d{9}$/, "message": "手机号输入错误" }],
                            initialValue: ""
                        })(
                            <Input placeholder="username" onChange={(e) => {
                                console.log(e.target.value)
                            }} />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="密码" {...formItemLayout}>
                        {getFieldDecorator('pwd', {
                            rules: [
                                { "required": true, },
                                { "max": 5, "message": "最大输入5" }],
                            initialValue: ""
                        })(
                            <Input placeholder="pwd" onChange={(e) => {
                                console.log(e.target.value)
                            }} />
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Button onClick={this.onReset.bind(this)} >重置</Button>
                    <Button onClick={this.onConfirm.bind(this)}>确认</Button>
                </Col>
            </Row>
        }
    }
)