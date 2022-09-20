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
import { useNavigate,useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { NewexamApi } from "../../request/api";

// const typeData = ["前端", "后端", "大数据", "计算机网络"];
// const classifyData = {
//   前端: ["HTML", "JavaScript", "CSS", "Vue", "React", "nodeJS", "Typescript"],
//   后端: ["JAVA", "python", "go", "C", "C++"],
//   大数据: ["数据分析", "AI算法", "机器学习"],
//   计算机网络: ["HTTP", "TCP", "路由器"],
// };
// const { Option } = Select;

export default function Newexam() {
  const navigate = useNavigate();
  const location = useLocation();
  const {state}  = location;
  console.log(state);
  // const [type, setType] = useState(classifyData[typeData[0]]);
  // const [firsttype, setFirstType] = useState(typeData[0]);
  // const [secondtype, setSecondType] = useState(classifyData[typeData[0]][0]);
  // const handleTypeChange = (value) => {
  //   setFirstType(value);
  //   setType(classifyData[value]);
  //   setSecondType(classifyData[value][0]);
  // };
  // const onSecondTypeChange = (value) => {
  //   setSecondType(value);
  // };
  const onFinish = (values) => {
    console.log(values);
    // NewexamApi({
    //   values,
    //   exam_type: firsttype,
    //   exam_type_classify: secondtype,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     message.success("创建课程成功！！");
    //     setTimeout(() => {
    //       navigate("/manage/trainingmanage");
    //     }, 1000);
    //   })
    //   .catch((err) => {});
  };

  return (
    <div>
      <Mheader />
      <Form
        name="nest-messages"
        onFinish={onFinish}
        style={{
          marginTop: "20px",
          marginLeft: "450px",
        }}
      >
        <Form.Item
          name="header-title"
          label="试题名"
          initialValue={state.data[0].exam_name}
        >
          <Input style={{ width: "750px" }} />
        </Form.Item>
        {state.data.map((item, index) => {
          console.log(item);
          return (
            <div key={index}>
              <Divider />
              <Form.Item
                name={["exam", item.question_id, "name"]}
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
              <Form.Item
                name={["exam", item.question_id, "answer"]}
                rules={[
                  {
                    required: true,
                    message: "请给出正确答案",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="A">
                    <Form.Item name={["exam", item.question_id, "A"]}>
                      <Input />
                    </Form.Item>
                  </Radio>
                  <Radio value="B">
                    <Form.Item name={["exam", item.question_id, "B"]}>
                      <Input />
                    </Form.Item>
                  </Radio>
                  <Radio value="C">
                    <Form.Item name={["exam", item.question_id, "C"]}>
                      <Input />
                    </Form.Item>
                  </Radio>
                  <Radio value="D">
                    <Form.Item name={["exam", item.question_id, "D"]}>
                      <Input />
                    </Form.Item>
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          );})}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            完成编辑
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
