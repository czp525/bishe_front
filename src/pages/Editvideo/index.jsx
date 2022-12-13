import React, { useState } from "react";
import Mheader from "../../components/Mheader/index";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getVideoPath } from "../../utils/requests";
import { EditvideoApi } from "../../request/api";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
const managertokenstr = localStorage.getItem("managertoken");
export default function Editvideo() {
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const navigate = useNavigate();

  const [path, setPath] = useState(state.video_url);
  const onFinish = (values) => {
    EditvideoApi({
      video_id: state.video_id,
      title: values.title,
      author: values.author,
      video_introduce: values.intro,
      video_url: path,
    })
      .then((res) => {
        message.success("修改课程成功！！");
        setTimeout(() => {
          navigate("/manage/videomanage");
        }, 1000);
      })
      .catch((err) => {});
  };
  const props = {
    name: "file",
    action: "http://10.2.13.113:8088/uploadFile",
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        setPath(info.file.response.filename);
      } else if (info.file.status === "error") {
      }
    },
    headers: {
      authorization: "managertokenstr",
    },
    showUploadList: "false",
    accept: ".flv,.f4v,.mp4,.ogv,.webm,.mpeg,.mpg",
  };
  return (
    <div>
      <Mheader></Mheader>
      <h2 style={{ textAlign: "center", fontSize: "30px" }}>视频课程编辑</h2>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="title" label="标题" initialValue={state.title}>
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name={"author"} label="作者" initialValue={state.author}>
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item
          name={"intro"}
          label="简介"
          initialValue={state.video_introduce}
        >
          <Input.TextArea style={{ width: "750px" }} />
        </Form.Item>

        <Form.Item name={"videopre"} label="视频预览">
          <video
            src={getVideoPath(state.video_url)}
            controls
            style={{ width: "750px", height: "500px" }}
          ></video>
        </Form.Item>
        <Form.Item name={"video"} label="视频">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>点击上传新视频</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交编辑
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
