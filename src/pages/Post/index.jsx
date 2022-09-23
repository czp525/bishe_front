import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import Forumheader from "../../components/Forumheader";
import {
  Button,
  List,
  Comment,
  Divider,
  Form,
  message,
  Input,
  Pagination,
} from "antd";
import {
  DeleteOutlined,
  EnterOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { GetforumcommentApi, AddforumcommentApi } from "../../request/api";
import dayjs from "dayjs";
import { getImgurl } from "../../utils/requests";

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
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

export default function Post() {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState([]);
  const [reply, setReply] = useState();
  const [form] = Form.useForm();
  const formlist = useRef();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const userstr = localStorage.getItem("userdata");
  let user = JSON.parse(userstr);
  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  const getData = (c) =>
    GetforumcommentApi({ forum_id: state.forum_id, current: c })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setTotal(res.data.total);
        form.resetFields();
        setReply();
      })
      .catch((err) => {});

  useEffect(() => {
    getData(1);
  }, []);
  // const init = () => {
  //   GetforumcommentApi({ forum_id: state.forum_id })
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data.data);
  //       form.resetFields();
  //       setReply();
  //     })
  //     .catch((err) => {});
  // };
  // useEffect(() => {
  //   init();
  // }, [JSON.stringify(data)]);
  const replyto = (nickname) => {
    form.resetFields();
    form.setFieldsValue({ forum_comment: `@${nickname}` });
    // setReply({ article_comment: `@${nickname}` });
    if (formlist) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  let actions = (index, nickname) => [
    <Button
      type="link"
      size={"small"}
      onClick={() => {
        replyto(nickname);
      }}
    >
      <EnterOutlined />
      回复
    </Button>,
    <span
      onClick={() => {
        // removeItem(index);
      }}
    >
      <DeleteOutlined /> 删除
    </span>,
  ];
  const doreply = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const onFinish = (values) => {
    console.log(values);
    AddforumcommentApi({
      ...values,
      forum_id: state.forum_id,
      username: user.username,
    })
      .then((res) => {
        // console.log(res);
        formlist.current.resetFields();
        message.success("评论发布成功");
        getData(1);
      })
      .catch((err) => {});
  };
  return (
    <div id={styles.page}>
      <Forumheader />
      <div id={styles.page1}>
        <h2 className={styles.title}>{state.forum_title}</h2>
        <Divider />
        <Comment
          // actions={actions(index, item.forum_writer)}
          author={state.nickname}
          avatar={getImgurl(state.imgurl)}
          content={state.forum_body}
          datetime={dayjs(state.date).format("YYYY-MM-DD HH:mm:ss")}
          className={styles.comment}
        />

        <Button type="primary" onClick={doreply}>
          <HighlightOutlined />
          点击评论
        </Button>
        <List
          className="comment-list"
          header={`共${total} 条回复`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <li>
              <Comment
                actions={actions(index, item.nickname)}
                author={item.nickname}
                avatar={getImgurl(item.imgurl)}
                content={item.forum_comment}
                datetime={dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}
              />
              <Divider />
            </li>
          )}
        />
        <Divider />
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
          showTotal={(total) => `共 ${total} 条回复`}
          className={styles.pagination}
        />
        <Form
          {...layout}
          name="nest-messages"
          ref={formlist}
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={reply}
          form={form}
        >
          <Form.Item name={["forum_comment"]} label="评论">
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
