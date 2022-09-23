import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";
import Lessonheader from "../../components/Lessonheader";
import { Divider } from "antd";
import {
  AddarticlecommentApi,
  GetarticlecommentApi,
  ArticleprogressApi,
} from "../../request/api";
import { Button, Form, Input, message, List, Comment } from "antd";
import {
  DeleteOutlined,
  EnterOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
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

export default function Lesson1() {
  const [cur, setCur] = useState();
  const [data, setData] = useState([]);
  const [reply, setReply] = useState();
  const location = useLocation();
  const { state } = location;
  const userstr = localStorage.getItem("userdata");
  let user = JSON.parse(userstr);

  const doreply = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const [form] = Form.useForm();
  const replyto = (nickname) => {
    form.resetFields();
    form.setFieldsValue({ article_comment: `@${nickname}` });
    // setReply({ article_comment: `@${nickname}` });
    if (formlist) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  // const removeItem = (index) => {
  //   comment.removeChild(comment.childNodes[index]);
  // };
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
  const init = () => {
    GetarticlecommentApi({ article_id: state.article_id })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        // console.log(data);
        form.resetFields();
        setReply();
      })
      .catch((err) => {});
  };
  useEffect(() => {
    init();
  }, [JSON.stringify(data)]);
  const formlist = useRef();

  const onFinish = (values) => {
    console.log(values);
    AddarticlecommentApi({
      ...values,
      article_id: state.article_id,
      username: user.username,
    })
      .then((res) => {
        // console.log(res);
        formlist.current.resetFields();
        message.success("评论发布成功");
        init();
      })
      .catch((err) => {});
    // console.log(values);
  };

  useEffect(() => {
    const a = setInterval(() => {
      const a = document.documentElement.scrollTop;
      setCur(a);
      // console.log(cur);
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, [cur]);
  useEffect(() => {
    const p = document.body.scrollHeight;
    return () => {
      ArticleprogressApi({
        username: user.username,
        process: p,
        curprocess: cur,
        article_id: state.article_id,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    };
  }, [cur]);

  return (
    <div id={styles.page}>
      <Lessonheader></Lessonheader>
      <div id={styles.page1}>
        <h2>{state.title}</h2>
        <h4 style={{ color: "grey" }}>{state.author}</h4>
        <Divider />
        <div
          dangerouslySetInnerHTML={{ __html: state.article_html }}
          // onScroll={logscroll}
        ></div>

        <Divider />
        <Button type="primary" onClick={doreply}>
          <HighlightOutlined />
          点击评论
        </Button>
        <List
          className="comment-list"
          header={`共${data.length} 条评论`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <li>
              <Comment
                actions={actions(index, item.nickname)}
                author={item.nickname}
                avatar={getImgurl(item.imgurl)}
                content={item.article_comment}
                datetime={dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}
              />
              <Divider />
            </li>
          )}
        />
        <Divider />
        <Form
          {...layout}
          name="nest-messages"
          ref={formlist}
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={reply}
          form={form}
        >
          <Form.Item name={["article_comment"]} label="评论">
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
