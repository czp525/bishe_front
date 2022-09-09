import React, { useState, useEffect, useRef } from "react";
import Myheader from "../../components/Myheader";
import styles from "./index.module.css";
import { Pagination, List, Button } from "antd";
import { GetforumApi } from "../../request/api";
import { Form, Input, Divider } from "antd";

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

  const getData = (c) => {
    GetforumApi({ current: c })
      .then((res) => {
        console.log(res);
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
    // AddarticlecommentApi({
    //   ...values,
    //   article_id: state.article_id,
    //   username: user.username,
    // })
    //   .then((res) => {
    //     // console.log(res);
    //     formlist.current.resetFields();
    //     message.success("评论发布成功");
    //     init();
    //   })
    //   .catch((err) => {});
  };

  // const handleclick = (e) => {
  //   const e_id = e.article_id;
  //   axios({
  //     method: "get",
  //     url: `https://b94a-123-185-222-223.jp.ngrok.io/my/article/changearticle/${e_id}`,
  //     data: {
  //       article_id: e_id,
  //     },
  //     // headers: {
  //     //   authorization: managertokenstr,
  //     // },
  //   })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       navigate("/lesson1", { state: res.data.data });
  //     })
  //     .catch((err) => {});
  // };
  return (
    <div id={styles.page}>
      <Myheader />
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
                    // handleclick(item);
                  }}
                >
                  {item.forum_title}
                </Button>
              }
              description={item.forum_body}
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
  );
}
