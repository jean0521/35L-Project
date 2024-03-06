import React from 'react'
import { Button, Checkbox,message, Form, Input } from 'antd';
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
          content: 'register successful',   // 注册成功!
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
        <h2>Register Here</h2>
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
            label="username"      // 用户名
            name="username"
            rules={[
              {
                required: true,
                message: 'please enter username',   // 请输入用户名
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password"     // 密码
            name="password"
            rules={[
              {
                required: true,
                message: 'please enter password',    // 请输入密码
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
              Register
            </Button>
          </Form.Item>
          <Form.Item
            style={{ margin: "0px!important" }}
            wrapperCol={{
              offset: 20,
              span: 4,
            }}
          >
            <Link to={"/user/login"}>LoginPage</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
