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

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    if (values) {
      AddanswerApi({
        exam_id: state.exam_id,
        username: user.username,
        values: values,
      })
        .then((res) => {
          GetgradeApi({ exam_id: state.exam_id, username: user.username })
            .then((res) => {
              console.log(res);
              setGrade(res.data.garde);
              setIsModalOpen(true);
              // Modal.confirm({
              //   title: "阅卷完成",
              //   icon: <ExclamationCircleOutlined />,
              //   content: `你的成绩是 ${res.data.garde} 分`,
              //   okText: "查看题目详情",
              //   cancelText: "取消",
              //   onOk: { getgrade },
              // });
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    }
  };

  // const confirm = () => {
  //   Modal.confirm({
  //     title: "Confirm",
  //     content: "Bla bla ...",
  //     okText: "确认",
  //     cancelText: "取消",
  //   });
  // };
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
            <div key={index}>
              <div>{`第${index + 1}题`}</div>
              <div style={{ marginLeft: "150px", marginBottom: "20px" }}>
                {item.question_body}
              </div>
              <Form.Item
                name={item.question_id}
                style={{ marginLeft: "150px" }}
                rules={[{ required: true, message: "请选择答案！" }]}
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
              提交
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="阅卷成功"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="查看试题详情"
          cancelText="取消"
        >
          <p> {`你的成绩是 ${grade} 分`}</p>
        </Modal>
      </div>
    </div>
  );
}
