import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";
import Lessonheader from "../../components/Lessonheader";
import { getVideoPath } from "../../utils/requests";
import {
  AddvideocommentApi,
  GetvideocommentApi,
  VideoprogressApi,
} from "../../request/api";

import { Comment, Divider, message } from "antd";

import { Button, Form, Input, List } from "antd";
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
let actions = [
  <Button type="link" size={"small"} onClick={() => {}}>
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
/* eslint-enable no-template-curly-in-string */

// const { TextArea } = Input;

// const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
//     itemLayout="horizontal"
//     renderItem={(props) => <Comment {...props} />}
//   />
// );

// const Editor = ({ onChange, onSubmit, submitting, value }) => (
//   <>
//     <Form.Item>
//       <TextArea rows={4} onChange={onChange} value={value} />
//     </Form.Item>
//     <Form.Item>
//       <Button
//         htmlType="submit"
//         loading={submitting}
//         onClick={onSubmit}
//         type="primary"
//       >
//         发布
//       </Button>
//     </Form.Item>
//   </>
// // );

// const data = [
//   {
//     actions: [<span key="comment-list-reply-to-0">Reply to</span>],
//     author: "替换用户",
//     avatar: "https://joeschmoe.io/api/v1/random",
//     content: <p>替换内容</p>,
//     datetime: (
//       <Tooltip
//         title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
//       >
//         <span>{moment().subtract(1, "days").fromNow()}</span>
//       </Tooltip>
//     ),
//   },
//   {
//     actions: [<span key="comment-list-reply-to-0">Reply to</span>],
//     author: "替换用户",
//     avatar: "https://joeschmoe.io/api/v1/random",
//     content: <p>替换内容</p>,
//     datetime: (
//       <Tooltip
//         title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
//       >
//         <span>{moment().subtract(2, "days").fromNow()}</span>
//       </Tooltip>
//     ),
//   },
// ];

export default function Lesson2() {
  const [data, setData] = useState([]);
  const [videomessage, setVideomessage] = useState({});
  const location = useLocation();
  const { state } = location;
  // const { pathname } = location;
  // console.log(state);

  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  // const [action, setAction] = useState(null);

  // const [comments, setComments] = useState([]);
  // const [submitting, setSubmitting] = useState(false);
  // const [value, setValue] = useState("");

  const userstr = localStorage.getItem("userdata");
  // console.log(userstr);
  let user = JSON.parse(userstr);
  // console.log(user);

  //获取评论
  const init = () => {
    GetvideocommentApi({ video_id: state.video_id })
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
        // console.log(data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    init();
  }, [JSON.stringify(data)]);
  // const like = () => {
  //   setLikes(1);
  //   setDislikes(0);
  //   setAction("liked");
  // };

  // const dislike = () => {
  //   setLikes(0);
  //   setDislikes(1);
  //   setAction("disliked");
  // };

  // const handleSubmit = () => {
  //   if (!value) return;
  //   setSubmitting(true);
  //   setTimeout(() => {
  //     setSubmitting(false);
  //     setValue("");
  //     setComments([
  //       ...comments,
  //       {
  //         author: "Han Solo",
  //         avatar: "https://joeschmoe.io/api/v1/random",
  //         content: <p>{value}</p>,
  //         datetime: moment().fromNow(),
  //       },
  //     ]);
  //   }, 1000);
  // };

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  // const actions = [
  //   <Tooltip key="comment-basic-like" title="Like">
  //     <span onClick={like}>
  //       {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
  //       <span className="comment-action">{likes}</span>
  //     </span>
  //   </Tooltip>,
  //   <Tooltip key="comment-basic-dislike" title="Dislike">
  //     <span onClick={dislike}>
  //       {React.createElement(
  //         action === "disliked" ? DislikeFilled : DislikeOutlined
  //       )}
  //       <span className="comment-action">{dislikes}</span>
  //     </span>
  //   </Tooltip>,
  //   <span key="comment-basic-reply-to">Reply to</span>,
  // ];

  //发布评论
  const formlist = useRef();
  const onFinish = (values) => {
    AddvideocommentApi({
      ...values,
      video_id: state.video_id,
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

  //保存进度
  // useEffect(() => {
  //   const a = document.getElementById("x");
  //   setNode(a);
  // });

  // const a = document.getElementById("x");
  // console.log(a);
  // console.log(video);
  // const canpaly = () => {
  //   setDuration(a.duration);
  //   console.log(duration);
  // };
  const video = useRef();
  const videoinfo = useRef();
  // setTimeout(() => {
  //   console.log(video.current.duration);
  // }, 5000);
  useEffect(() => {
    const a = setInterval(() => {
      const obj = {
        process: video.current?.duration,
        curprocess: video.current?.currentTime,
        video_id: state.video_id,
        username: user.username,
      };
      videoinfo.current = obj;
      setVideomessage(obj);
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, [videomessage]);
  useEffect(() => {
    return () => {
      VideoprogressApi(videoinfo.current)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    };
  }, []);

  return (
    <div id={styles.page}>
      <Lessonheader></Lessonheader>
      <h2>{state.title}</h2>
      <h4 style={{ color: "grey" }}>{state.author}</h4>
      <Divider />
      <div className={styles.video}>
        <video
          src={getVideoPath(state.video_url)}
          controls
          className={styles.controls}
          ref={video}
          // onCanPlay={canpaly}
          // id="x"
        ></video>
      </div>
      <Divider />
      <div>
        简介：
        <br />
        {state.video_introduce}
      </div>
      <Divider />
      {/* 
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </> */}

      <Form
        {...layout}
        name="nest-messages"
        ref={formlist}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name={["video_comment"]} label="评论">
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
        renderItem={(item) => (
          <li>
            <Comment
              actions={actions}
              author={item.nickname}
              avatar={item.imgurl}
              content={item.video_comment}
              // datetime={item.date}
              datetime={dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")}
            />
            <Divider />
          </li>
        )}
      />
    </div>
  );
}
