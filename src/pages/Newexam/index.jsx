import React, { useState } from "react";

import Mheader from "../../components/Mheader/index";
import { Button, Form, Input, Select, Space, Radio } from "antd";
import styles from "./index.module.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

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

const typeData = ["前端", "后端", "大数据", "计算机网络"];
const classifyData = {
  前端: ["HTML", "JavaScript", "CSS", "Vue", "React", "nodeJS", "Typescript"],
  后端: ["JAVA", "python", "go", "C", "C++"],
  大数据: ["数据分析", "AI算法", "机器学习"],
  计算机网络: ["HTTP", "TCP", "路由器"],
};
const { Option } = Select;

export default function Newexam() {
  const [type, setType] = useState(classifyData[typeData[0]]);
  const [firsttype, setFirstType] = useState(typeData[0]);
  const [secondtype, setSecondType] = useState(classifyData[typeData[0]][0]);
  const handleTypeChange = (value) => {
    setFirstType(value);
    setType(classifyData[value]);
    setSecondType(classifyData[value][0]);
  };
  const onSecondTypeChange = (value) => {
    setSecondType(value);
  };
  const onFinish = (values) => {
    console.log(values);
    // NewarticleApi({
    //   title: values.title,
    //   article_type: firsttype,
    //   article_type_classify: secondtype,
    //   author: values.author,
    //   article_introduce: values.intro,
    //   article_text: text,
    //   article_html: html,
    // })
    //   .then((res) => {
    //     message.success("创建课程成功！！");
    //     setTimeout(() => {
    //       navigate("/manage/articlemanage");
    //     }, 1000);
    //   })
    //   .catch((err) => {});
  };

  return (
    <div>
      <Mheader />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{
          marginTop: "20px",
        }}
      >
        <Form.Item name="title" label="试题名">
          <Input style={{ width: "750px" }} />
        </Form.Item>
        <Form.Item name="title" label="类型">
          <Select
            defaultValue={typeData[0]}
            style={{
              width: 200,
              marginRight: "15px",
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

        {/* aa */}
        <Form.List name="exam">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: 8,
                    // justifyContent: "space-between",
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "question"]}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "请输入题目",
                    //   },
                    // ]}
                    label="题目"
                  >
                    <Input.TextArea
                      placeholder="请输入题目"
                      style={{ width: "750px" }}
                    />
                    <Radio.Group>
                      <Radio value="A">
                        <Form.Item name="A">
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="B">
                        <Form.Item name="B">
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="C">
                        <Form.Item name="C">
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="D">
                        <Form.Item name="D">
                          <Input />
                        </Form.Item>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                  {/* <Form.Item name="A" style={{ width: "300px" }}>
                    <Radio.Group>
                      <Radio value="A">
                        <Form.Item name="A">
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="B">
                        <Form.Item name="B">
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="C">
                        <Form.Item name="C">
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="D">
                        <Form.Item name="D">
                          <Input />
                        </Form.Item>
                      </Radio>
                    </Radio.Group>
                  </Form.Item> */}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加试题
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
