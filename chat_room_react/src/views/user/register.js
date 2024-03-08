import React from 'react'
import { Button, Checkbox, message, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import './style.css'
import api from "../../http/api";


export default function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
  };
  const onFinish = async (values) => {
    try {
      openMessage();
      const result = await api.register(values);
      if(result.code === 0){
        messageApi.open({
          key,
          type: 'success',
          content: 'Register successfully!',
          duration: 1,
        });
      }else{
        console.log(result);
        messageApi.open({
          key,
          type: 'error',
          content: result.msg,
          duration: 2,
        });
      }
      console.log("Success:", values);
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className=' containerLogin'>
      {contextHolder}
      <div className='register box'>
        <h1>Create your account</h1>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Enter your username',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Enter your password',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            style={{ margin: "0px!important" }}
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" className="z_btn">
              <bold>CONTINUE</bold>
            </Button>
          </Form.Item>
          <Form.Item
          >Have an account?
            <Link to={"/user/login"}> Sign in</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}