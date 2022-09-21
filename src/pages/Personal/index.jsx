import { Avatar } from "antd";
import { Button, Form, Input, message, Select } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { PersonalApi } from "../../request/api";
import { getImgurl } from "../../utils/requests";

const tokenstr = localStorage.getItem("token");
// console.log(tokenstr);

export default function Personal() {
  const userstr = localStorage.getItem("userdata");
  const [user, setUser] = useState(JSON.parse(userstr));
  const navigate = useNavigate();
  const form = useRef();

  // const { Option } = Select;
  const init = () => {
    setUser(JSON.parse(userstr));
    form.current.setFieldValue(JSON.parse(userstr));
  };
  useEffect(() => {
    init();
  }, []);
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
  const onFinish = (values) => {
    PersonalApi({
      email: values.email,
      nickname: values.nickname,
      phonenumber: values.phonenumber,
      username: user.username,
    })
      .then(function (res) {
        // console.log(res);
        if (res.data.status === 0) {
          message.success("修改成功");
          console.log(res.data.message);
          localStorage.setItem("userdata", res.data.message);
          // localStorage.setItem("token", res.data.token);
          setTimeout(navigate("/"), 1500);
        }
        if (res.data.status === 1) {
          alert(res.data.message);
        }
      })
      .catch(function (err) {});

    // axios({
    //   method: "post",
    //   url: "http://10.2.13.116:8088/my/userinfo",
    //   headers: {
    //     authorization: tokenstr,
    //   },
    //   data: {
    //     email: values.email,
    //     nickname: values.nickname,
    //     phonenumber: values.phonenumber,
    //     username: user.username,
    //     // imgurl: user.imgurl,
    //   },
    // })
    //   .then(function (res) {
    //     // console.log(res);
    //     if (res.data.status === 0) {
    //       message.success("修改成功");
    //       console.log(res.data.message);
    //       localStorage.setItem("userdata", res.data.message);
    //       // localStorage.setItem("token", res.data.token);
    //       setTimeout(navigate("/"), 1500);
    //     }
    //     if (res.data.status === 1) {
    //       alert(res.data.message);
    //     }
    //   })
    //   .catch(function (err) {
    //     // console.log(err);
    //   });
  };
  return (
    <div>
      <div className={styles.perava}>
        <Avatar
          src={getImgurl(user.imgurl)}
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
        />
      </div>
      <div className={styles.perform}>
        <Form
          initialValues={user}
          {...formItemLayout}
          ref={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <h2 style={{ textAlign: "center" }}>用户名：{user.username}</h2>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "输入的邮箱格式不正确!",
              },
              {
                required: false,
                message: "请输入邮箱!",
              },
            ]}
          >
            <Input style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="昵称"
            tooltip="你想被怎样称呼?"
            rules={[
              {
                required: false,
                message: "请输入您的昵称!",
                whitespace: true,
              },
            ]}
          >
            <Input style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item
            name="phonenumber"
            label="电话"
            rules={[
              {
                required: false,
                message: "请输入您的电话号码!",
              },
            ]}
          >
            <Input style={{ width: "750px" }} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ textAlign: "center" }}
              className={styles.submit}
            >
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
