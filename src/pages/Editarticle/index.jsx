import React, { useState } from "react";
import Mheader from "../../components/Mheader/index";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { Button, Form, Input, Select, message } from "antd";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { EditarticleApi } from "../../request/api";

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
  const location = useLocation();
  const { state } = location;
  const [html, setHtml] = useState(state.article_html);
  const [text, setText] = useState(state.article_text);
  const managertokenstr = localStorage.getItem("managertoken");
  // Finish!
  function handleEditorChange({ html, text }) {
    setHtml(html);
    setText(text);
  }

  const onFinish = (values) => {
    console.log(values);
    EditarticleApi({
      article_id: state.article_id,
      title: values.title,
      author: values.author,
      article_introduce: values.intro,
      article_text: text,
      article_html: html,
    })
      .then((res) => {
        message.success("编辑课程成功！！");
        setTimeout(() => {
          navigate("/manage/articlemanage");
        }, 1000);
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Mheader></Mheader>
      <h2 style={{ textAlign: "center", fontSize: "30px" }}>编辑文章</h2>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="title" label="标题" initialValue={state.title}>
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name="author" label="作者" initialValue={state.author}>
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item
          name="intro"
          label="简介"
          initialValue={state.article_introduce}
        >
          <Input.TextArea style={{ width: "750px" }} />
        </Form.Item>
        <MdEditor
          style={{ height: "500px", width: "800px", margin: "auto" }}
          renderHTML={(text) => mdParser.render(text)}
          placeholder="请输入内容："
          defaultValue={state.article_text}
          onChange={handleEditorChange}
        />

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "20px 0px" }}
          >
            提交文章修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
