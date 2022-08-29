import React, { useState } from "react";
import Mheader from "../../components/Mheader/index";
import { Button, Form, Input, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */
//布局设置

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
//设置提示信息
const typeData = ["前端", "后端", "大数据", "计算机网络"];
const classifyData = {
  前端: ["HTML", "JavaScript", "CSS", "Vue", "React", "nodeJS", "Typescript"],
  后端: ["JAVA", "python", "go", "C", "C++"],
  大数据: ["数据分析", "AI算法", "机器学习"],
  计算机网络: ["HTTP", "TCP", "路由器"],
};
export default function Newvideo() {
  const navigate = useNavigate();
  const [type, setType] = useState(classifyData[typeData[0]]);
  const [secondtype, setSecondType] = useState(classifyData[typeData[0]][0]);
  const [firsttype, setFirstType] = useState(typeData[0]);
  const [path, setPath] = useState();
  const managertokenstr = localStorage.getItem("managertoken");

  const props = {
    name: "file",
    action: "http://10.2.13.116:8088/uploadFile",
    onChange(info) {
      // console.log(info);
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
        // console.log(info.file.response);
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
    accept: ".flv,.f4v,.mp4,.ogv,.webm,.mpeg,.mpg",
  };
  const onFinish = (values) => {
    console.log(values);
    console.log(firsttype);
    console.log(secondtype);
    axios({
      method: "post",
      url: "http://10.2.13.116:8088/my/addvideo",
      data: {
        title: values.title,
        video_type: firsttype,
        video_type_classify: secondtype,
        author: values.author,
        video_introduce: values.intro,
        video_url: path,
      },
      headers: {
        authorization: managertokenstr,
      },
    })
      .then((res) => {
        message.success("创建课程成功！！");
        setTimeout(() => {
          navigate("/manage/videomanage");
        }, 1000);
      })
      .catch((err) => {});
  };
  const handleTypeChange = (value) => {
    setFirstType(value);
    setType(classifyData[value]);
    setSecondType(classifyData[value][0]);
  };

  const onSecondTypeChange = (value) => {
    setSecondType(value);
  };
  return (
    <div>
      <Mheader></Mheader>
      <h2 style={{ textAlign: "center", fontSize: "30px" }}>创建视频课程</h2>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="title" label="标题">
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name={"author"} label="作者">
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name={"intro"} label="简介">
          <Input.TextArea style={{ width: "750px" }} />
        </Form.Item>

        <Form.Item name="title" label="类型">
          <Select
            defaultValue={typeData[0]}
            autoFocus
            style={{
              width: 200,
            }}
            onChange={handleTypeChange}
          >
            {typeData.map((type) => (
              <Option key={type}>{type}</Option>
            ))}
          </Select>
          <Select
            style={{
              width: 200,
            }}
            value={secondtype}
            onChange={onSecondTypeChange}
          >
            {type.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name={"video"} label="视频">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>点击上传文件</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
