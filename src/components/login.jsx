import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const LoginForm = ({loginUser}) => (
    <Form
        name="basic"
        wrapperCol={{
            span: 16,
        }}
        style={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"center",
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={loginUser}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="username"
            style={{width:"100%",display:"flex",justifyContent:"center"}}
            rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                // {
                //     pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                //     message: 'Please input correct email!',
                // },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            style={{width:"100%",display:"flex",justifyContent:"center"}}
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="remember"
            style={{width:"100%",display:"flex",justifyContent:"center"}}
            valuePropName="checked"
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            style={{width:"100%",display:"flex",justifyContent:"center"}}

        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);
export default LoginForm;