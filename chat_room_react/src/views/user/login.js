import React, { useContext } from "react";
import { Button, message, Form, Input } from "antd";
import "./style.css";
import { Link,useNavigate } from "react-router-dom";
import ChatContext from "../../context/index";

export default function UserLogin() {
  const { socket } = useContext(ChatContext);
  const navigate = useNavigate();
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
      socket.emit("login", values, (loginResult) => {
        console.log(loginResult)
        if (loginResult.code === 0) {
          window.localStorage.setItem("user", JSON.stringify(loginResult.data));
          window.localStorage.setItem("socketId", loginResult.socketId || '');
          messageApi.open({
            key,
            type: "success",
            content: "Logging successfully!",
            duration: 1,
            onClose() {
              navigate('/home')
            },
          });
        } else {
          messageApi.open({
            key,
            type: "error",
            content: loginResult.msg,
            duration: 2,
          });
        }
      });
      console.log("Success:", values);
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className=" containerLogin">
      {contextHolder}
      <div className="login box">
        <h1>Sign in</h1>
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
                message: "Enter your username",
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
                message: "Enter your password",
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
              CONTINUE
            </Button>
          </Form.Item>
          <Form.Item
            style={{ margin: "0px!important" }}
          >No account? 
            <Link to={"/user/register"}> Sign up</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
