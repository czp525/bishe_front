import React, { useState, useEffect } from "react";
import Mheader from "../../components/Mheader/index";
import axios from "axios";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { Button, Form, Input, Select, message } from "antd";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { NewarticleApi } from "../../request/api";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const managertokenstr = localStorage.getItem("managertoken");
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
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
const typeData = ["前端", "后端", "大数据", "计算机网络"];
const classifyData = {
  前端: ["HTML", "JavaScript", "CSS", "Vue", "React", "nodeJS", "Typescript"],
  后端: ["JAVA", "python", "go", "C", "C++"],
  大数据: ["数据分析", "AI算法", "机器学习"],
  计算机网络: ["HTTP", "TCP", "路由器"],
};

export default function Test() {
  const navigate = useNavigate();
  const [type, setType] = useState(classifyData[typeData[0]]);
  const [secondtype, setSecondType] = useState(classifyData[typeData[0]][0]);
  const [firsttype, setFirstType] = useState(typeData[0]);
  const [html, setHtml] = useState();
  const [text, setText] = useState();
  const managertokenstr = localStorage.getItem("managertoken");
  // Finish!
  function handleEditorChange({ html, text }) {
    setHtml(html);
    setText(text);
  }

  const onFinish = (values) => {
    console.log(values);
    NewarticleApi({
      title: values.title,
      article_type: firsttype,
      article_type_classify: secondtype,
      author: values.author,
      article_introduce: values.intro,
      article_text: text,
      article_html: html,
    })
      // axios({
      //   method: "post",
      //   url: "http://10.2.13.116:8088/my/artcate/addcates",
      //   data: {
      //     title: values.title,
      //     article_type: firsttype,
      //     article_type_classify: secondtype,
      //     author: values.author,
      //     article_introduce: values.intro,
      //     article_text: text,
      //     article_html: html,
      //   },
      //   headers: {
      //     authorization: managertokenstr,
      //   },
      // })
      .then((res) => {
        message.success("创建课程成功！！");
        setTimeout(() => {
          navigate("/manage/articlemanage");
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
      <h2 style={{ textAlign: "center", fontSize: "30px" }}>创建文章</h2>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="title" label="标题">
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name="author" label="作者">
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name="intro" label="简介">
          <Input.TextArea style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name="title" label="类型">
          <Select
            defaultValue={typeData[0]}
            style={{
              width: 200,
            }}
            onChange={handleTypeChange}
            autoFocus
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

        <MdEditor
          style={{ height: "500px", width: "800px", margin: "auto" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            提交文章
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
