import { Button, Form, Input, message, Select, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterApi } from "../../request/api";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [path, setPath] = useState();

  const onFinish = (values) => {
    RegisterApi({
      username: values.username,
      email: values.email,
      password: values.password,
      nickname: values.nickname,
      phone: values.phone,
      imgurl: path,
    })
      .then(function (res) {
        if (res.data.status === 0) {
          message.success("注册成功");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
        if (res.data.status === 1) {
          alert(res.data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const props = {
    name: "file",
    action: "http://10.2.13.136:8088/uploadFile",
    onChange(info) {
      // console.log(info);
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
        console.log(info.file.response);
        setPath(info.file.response.filename);
        // console.log(path);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    headers: {
      authorization: "managertokenstr",
    },
    showUploadList: "false",
    accept:
      ".bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp,.avif,.apng ",
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          backgroundImage: `url(../../../../../topbg.jpg)`,
          backgroundPositionX: "center",
          color: "white",
          height: "260px",
          marginLeft: "-30px",
          marginRight: "-30px",
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
        }}
      >
        用户注册
      </h2>
      <div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="用户名"
            // labelAlign="left"
            rules={[
              {
                type: "string",
                message: "输入的用户名格式不正确!",
              },
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "输入的邮箱格式不正确!",
              },
              {
                required: true,
                message: "请输入邮箱!",
              },
            ]}
          >
            <Input style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
            hasFeedback
          >
            <Input.Password style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item
            name="请再次确认密码"
            label="请再次确认密码"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请确认密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("两次输入的密码不匹配!"));
                },
              }),
            ]}
          >
            <Input.Password style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="昵称"
            tooltip="你想被怎样称呼?"
            rules={[
              {
                required: true,
                message: "请输入您的昵称!",
                whitespace: true,
              },
            ]}
          >
            <Input style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="电话"
            rules={[
              {
                required: true,
                message: "请输入您的电话号码!",
              },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "750px" }} />
          </Form.Item>
          <Form.Item name={"video"} label="头像">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>点击上传头像</Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ textAlign: "center" }}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
