import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Forumheader from "../../components/Forumheader";
import styles from "./index.module.css";
import { Pagination, List, Button } from "antd";
import { GetforumApi, AddforumApi, GetforumlistApi } from "../../request/api";
import { Form, Input, Divider, message } from "antd";

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
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
export default function Forum() {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setdata] = useState([]);
  const formlist = useRef();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userstr = localStorage.getItem("userdata");
  let user = JSON.parse(userstr);
  console.log(user);
  const addforum = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const getData = (c) => {
    GetforumApi({ current: c })
      .then((res) => {
        // console.log(res);
        setdata(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData(1);
  }, []);
  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  const onFinish = (values) => {
    console.log(values);
    AddforumApi({
      forum_title: values.title,
      nickname: user.nickname,
      forum_body: values.forum,
      username:user.username
    })
      .then((res) => {
        message.success("发布成功");
        form.resetFields();
        getData(1);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
      .catch((err) => {});
  };
  const handleclick = (e) => {
    const e_id = e.forum_id;
    GetforumlistApi({ forum_id: e_id })
      .then((res) => {
        console.log(res);
        navigate("/post", { state: res.data.data });
      })
      .catch((err) => {});
  };
  return (
    <div id={styles.page}>
      <Forumheader />
      <div id={styles.page1}>
        {" "}
        <Button type="primary" onClick={addforum} style={{ margin: "20px 0" }}>
          发布新帖
        </Button>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                // avatar={}
                title={
                  <Button
                    type="link"
                    onClick={() => {
                      handleclick(item);
                    }}
                    style={{ fontSize: "16px" }}
                  >
                    {item.forum_title}
                  </Button>
                }
                description={
                  <div style={{ fontSize: "14px", marginLeft: "12px" }}>
                    {item.forum_body}
                  </div>
                }
              />
              <div>{item.date}</div>
            </List.Item>
          )}
        />
        <Pagination
          current={current}
          style={{ marginTop: "20px" }}
          defaultCurrent={1}
          // pageSize={state.pageSize}
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 15]}
          total={total}
          // showSizeChanger
          showQuickJumper
          onChange={pageChange}
          showTotal={(total) => `共 ${total} 条数据`}
        />
        <Divider />
        <Form
          {...layout}
          name="nest-messages"
          ref={formlist}
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
        >
          <Form.Item name={["title"]} label="标题">
            <Input />
          </Form.Item>
          <Form.Item name={["forum"]} label="内容">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
