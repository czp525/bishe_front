import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ManagerLoginApi } from "../../request/api";

export default function Managerlogin() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    ManagerLoginApi(values)
      .then(function (res) {
        if (res.data.status === 0) {
          localStorage.setItem("managerdata", res.data.message);
          localStorage.setItem("managertoken", res.data.token);
          setTimeout(() => {
            navigate("/manage/articlemanage");
          }, 1000);
        }
        if (res.data.status === 1) {
          alert("密码错误,请重试");
        }
      })
      .catch(function (err) {});
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("../../../bg.jpg")`,
        backgroundPosition: "0px 0px",
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "400px",
          height: "300px",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "35px", color: "black" }}>
          管理员登录
        </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="admin_name"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="admin_password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
