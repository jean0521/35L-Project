import React, { useContext } from "react";
import { Button, message, Form, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./style.css";
import { Link,useNavigate } from "react-router-dom";
import ChatContext from "../../context/index";
import bruinImage from "./bruin-image.png"

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
        <img src={bruinImage} id="bruin-logo" alt="Bruin logo" />
        <br></br>
        <br></br>
        <br></br>
        <h2>Sign in</h2>
        <br></br>
        <p>to continue to Bruin Talk!</p>
        <h1></h1>
        <Form
          name="basic"
          wrapperCol={{
            span: 24,
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
            name="username"
            rules={[
              {
                required: true,
                message: "Enter your username",
              },
            ]}
          >
            <Input
              placeholder="Your username here"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Forget ur username? Think about it!">
                  <InfoCircleOutlined
                    style={{
                      color: 'rgba(0,0,0,.45)',
                    }}
                  />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Enter your password",
              },
            ]}
          >
            <Input.Password 
              placeholder="Your password here"
            />
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
            <Link to={"/user/register"} className="link"> Sign up now</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
