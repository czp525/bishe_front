import React, { useState, useEffect } from "react";
import Trainingheader from "../../components/Trainingheader";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Radio, Form, Button, Divider, Modal, Space } from "antd";
import { AddanswerApi, GetgradeApi } from "../../request/api";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function Question() {
  const location = useLocation();
  const { state } = location;
  console.log(state.data);
  const a = state;
  const navigate = useNavigate();
  const userstr = localStorage.getItem("userdata");
  let user = JSON.parse(userstr);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [grade, setGrade] = useState();

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/testdetails", {
      state: { data: a },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    if (values) {
      const params = {
        exam_id: state.exam_id,
        username: user.username,
        values: values,
      };
      await AddanswerApi(params);
      const res = await GetgradeApi(params);
      setGrade(res.garde);
      setIsModalOpen(true);
    }
  };

  return (
    <div id={styles.page}>
      <Trainingheader />
      <div id={styles.page1}>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          style={{
            marginLeft: "150px",
            marginBottom: "20px",
            marginTop: "30px",
          }}
          // initialValues={{
          // "input-number": 3,
          // "checkbox-group": ["A", "B", "C", "D"],
          // rate: 3.5,
          // }}
        >
          {state.data.map((item, index) => (
            <div key={index} style={{backgroundColor:'#fff'}}>
              <div>{`???${index + 1}???`}</div>
              <div style={{ marginLeft: "150px", marginBottom: "20px" }}>
                {item.question_body}
              </div>
              <Form.Item
                name={item.question_id}
                style={{ marginLeft: "150px" }}
                rules={[{ required: true, message: "??????????????????" }]}
              >
                <Radio.Group>
                  <Radio value="A">{item.question_option_A}</Radio>
                  <Radio value="B">{item.question_option_B}</Radio>
                  <Radio value="C">{item.question_option_C}</Radio>
                  <Radio value="D">{item.question_option_D}</Radio>
                </Radio.Group>
              </Form.Item>
              <Divider />
            </div>
          ))}

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              ??????
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="????????????"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="??????????????????"
          cancelText="??????"
        >
          <p> {`??????????????? ${grade} ???`}</p>
        </Modal>
      </div>
    </div>
  );
}
