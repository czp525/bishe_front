import React, { useState, useEffect } from "react";
import Trainingheader from "../../components/Trainingheader";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Radio, Form, Button, Divider, Modal, Space } from "antd";
import { GettestdetailApi } from "../../request/api";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
export default function Testdetails() {
  const location = useLocation();
  const { state } = location;
  // console.log(state);
  const userstr = localStorage.getItem("userdata");
  let user = JSON.parse(userstr);
  const [test, setTest] = useState([]);
  const [index, setIndex] = useState(0);
  // const [color, setColor] = useState(green);

  useEffect(() => {
    GettestdetailApi({ exam_id: state.data.exam_id, username: user.username })
      .then((res) => {
        // console.log(res);
        setTest(res.data.data);
        setIndex(1);
        console.log(test);
      })
      .catch((err) => {});
  }, [index]);

  return (
    <div id={styles.page}>
      <Trainingheader />

      <Form
        name="validate_other"
        {...formItemLayout}
        // onFinish={onFinish}
        style={{ marginLeft: "150px", marginBottom: "20px", marginTop: "30px" }}
      >
        {test.map((item, index) => (
          <div key={index}>
            <div>{`第${index + 1}题`}</div>
            <div style={{ marginLeft: "150px", marginBottom: "20px" }}>
              {item.question_body}
            </div>
            <Form.Item name={item.question_id} style={{ marginLeft: "150px" }}>
              <Radio.Group defaultValue={item.question_answer}>
                <Radio value="A">{item.question_option_A}</Radio>
                <Radio value="B">{item.question_option_B}</Radio>
                <Radio value="C">{item.question_option_C}</Radio>
                <Radio value="D">{item.question_option_D}</Radio>
              </Radio.Group>
            </Form.Item>
            <div style={{ marginBottom: "5px" }}>
              您的答案为：
              <div
                style={{
                  display: "inline-block",
                  // color: { color },
                }}
              >
                {item.answer}
              </div>
            </div>
            <div>
              正确答案为:
              <div
                style={{
                  display: "inline-block",
                  color: "green",
                  marginLeft: "10px",
                }}
              >
                {item.question_answer}
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </Form>
    </div>
  );
}
