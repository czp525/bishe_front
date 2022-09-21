import React, { useState } from "react";

import Mheader from "../../components/Mheader/index";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Radio,
  message,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { NewexamApi } from "../../request/api";


// const layout = {
  // labelCol: {
  //   span: 8,
  // },
  // wrapperCol: {
  //   span: 20,
  // },
// };
/* eslint-disable no-template-curly-in-string */

// const validateMessages = {
//   required: "${label} is required!",
//   types: {
//     email: "${label} is not a valid email!",
//     number: "${label} is not a valid number!",
//   },
//   number: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };

const typeData = ["前端", "后端", "大数据", "计算机网络"];
const classifyData = {
  前端: ["HTML", "JavaScript", "CSS", "Vue", "React", "nodeJS", "Typescript"],
  后端: ["JAVA", "python", "go", "C", "C++"],
  大数据: ["数据分析", "AI算法", "机器学习"],
  计算机网络: ["HTTP", "TCP", "路由器"],
};
const { Option } = Select;

export default function Newexam() {
  const navigate =useNavigate();
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
    NewexamApi({
      values,
      exam_type: firsttype,
      exam_type_classify: secondtype,
    })
      .then((res) => {
        console.log(res);
        message.success("新建试题成功！！");
        setTimeout(() => {
          navigate("/manage/trainingmanage");
        }, 1000);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Mheader />
      <Form
        // {...layout}
        name="nest-messages"
        onFinish={onFinish}
        // validateMessages={validateMessages}
        style={{
          marginTop: "20px",
          marginLeft: "450px",
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

        <Form.List name="exam">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <Divider/>
                  <Space
                    style={{
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "question"]}
                      rules={[
                        {
                          required: true,
                          message: "请输入题目",
                        },
                      ]}
                      label="题目"
                    >
                      <Input.TextArea
                        placeholder="请输入题目"
                        style={{ width: "750px" }}
                      />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                  <Form.Item
                    {...restField}
                    name={[name, "answer"]}
                    style={{}}
                    {...restField}
                    rules={[
                      {
                        required: true,
                        message: "请给出正确答案",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="A">
                        <Form.Item
                          {...restField}
                          name={[name, "A"]}
                          style={{}}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: "请给出正确答案",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="B">
                        <Form.Item
                          {...restField}
                          name={[name, "B"]}
                          style={{}}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: "请给出正确答案",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="C">
                        <Form.Item
                          {...restField}
                          name={[name, "C"]}
                          style={{}}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: "请给出正确答案",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Radio>
                      <Radio value="D">
                        <Form.Item
                          {...restField}
                          name={[name, "D"]}
                          style={{}}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: "请给出正确答案",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ width: "750px" }}
                >
                  添加试题
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
