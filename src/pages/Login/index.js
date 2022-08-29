import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { LoginApi } from "../../request/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    LoginApi(values)
      .then(function (res) {
        console.log(res);
        // console.log(res.data.token);
        if (res.data.status === 0) {
          localStorage.setItem("userdata", res.data.message);
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        if (res.data.status === 1) {
          alert("密码错误，请重试");
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
          DA_education
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
            name="username"
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
            name="password"
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
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href="/forgetpassword"
              style={{
                float: "right",
              }}
            >
              忘记密码
            </a>
          </Form.Item> */}

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
              style={
                {
                  // display: "block",
                }
              }
            >
              登录
            </Button>
            <a
              href="/signup"
              style={{
                fontSize: "16px",
                width: "320px",
                display: "inline-block",
                textAlign: "right",
              }}
            >
              还没账号？立即注册
            </a>
            <a
              href="/managerlogin"
              style={{
                fontSize: "16px",
                width: "320px",
                display: "inline-block",
                textAlign: "right",
              }}
            >
              管理员登录
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
