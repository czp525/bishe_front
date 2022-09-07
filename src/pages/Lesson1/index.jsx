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
import { DeleteOutlined, EnterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

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
  const [videomessage, setVideomessage] = useState({});

  const [data, setData] = useState([]);
  const location = useLocation();
  const { state } = location;
  const userstr = localStorage.getItem("userdata");
  let user = JSON.parse(userstr);
  let actions = [
    <Button
      //styles={{marginLeft:'500px'}}
      type="link"
      size={"small"}
      // title="回复"
      // icon="form"
      // onClick={this.onClickReply}
    >
      <EnterOutlined />
      回复
    </Button>,
    <span
      onClick={() => {
        // this.props.removeItem(index);
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
      })
      .catch((err) => {});
  };
  useEffect(() => {
    init();
  }, [JSON.stringify(data)]);
  const formlist = useRef();

  const onFinish = (values) => {
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

  const logscroll = (e) => {
    console.log(e);
  };
  // const article = useRef();
  // console.log(article);
  // const logscroll = (e) => {
  //   console.log(e.target.scrollTop);
  // };
  // article.current.onscroll = logscroll;

  // .addEventListener(
  //   "scroll",
  //   () => {
  //     console.log("scroll ...");
  //   },
  //   true
  // );

  //  useEffect(() => {
  //    const a = setInterval(() => {
  //      const obj = {
  //        process: video.current?.duration,
  //        curprocess: video.current?.currentTime,
  //        video_id: state.video_id,
  //        username: user.username,
  //      };
  //      videoinfo.current = obj;
  //      setVideomessage(obj);
  //    }, 1000);
  //    return () => {
  //      clearInterval(a);
  //    };
  //  }, [videomessage]);
  //  useEffect(() => {
  //    return () => {
  //      ArticleprogressApi(videoinfo.current)
  //        .then((res) => {
  //          console.log(res);
  //        })
  //        .catch((err) => {});
  //    };
  //  }, []);

  return (
    <div id={styles.page}>
      <Lessonheader></Lessonheader>
      <h2>{state.title}</h2>
      <h4 style={{ color: "grey" }}>{state.author}</h4>
      <Divider />
      <div
        dangerouslySetInnerHTML={{ __html: state.article_html }}
        // ref={article}
        onScroll={logscroll}
      ></div>
      <Divider />
      <Form
        {...layout}
        name="nest-messages"
        ref={formlist}
        onFinish={onFinish}
        validateMessages={validateMessages}
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

      <Divider />
      <List
        className="comment-list"
        header={`共${data.length} 条评论`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <li>
            <Comment
              actions={actions}
              author={item.nickname}
              avatar={item.imgurl}
              content={item.article_comment}
              datetime={dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}
            />
            <Divider />
          </li>
        )}
      />
    </div>
  );
}
