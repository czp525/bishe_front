import React, { useEffect, useState } from "react";
import { Button, List } from "antd";

import styles from "./index.module.css";
import {
  GetrandarticleApi,
  GetrandvideoApi,
  GetalApi,
  GetvlApi,
} from "../../request/api";

// const data = [
//   "Racing car sprays burning fuel into crowd.",
//   "Japanese princess to wed commoner.",
//   "Australian walks 100km after outback crash.",
//   "Man charged over missing wedding girl.",
//   "Los Angeles battles huge wildfires.",
// ];

export default function Main() {
  const [articlesrc, setArticleSrc] = useState([]);
  const [videosrc, setVideoSrc] = useState([]);
  const [articledata, setArticledata] = useState([]);
  const [videodata, setVideodata] = useState([]);

  const articleinit = () => {
    GetrandarticleApi().then((res) => {
      setArticleSrc(res.data.data);
    });
  };
  const videoinit = () => {
    GetrandvideoApi().then((res) => {
      setVideoSrc(res.data.data);
    });
  };
  const listinit = () => {
    GetalApi().then((res) => {
      res.data.data.map((item) => {
        setArticledata(item.title);
      });
    });
    GetvlApi().then((res) => {
      res.data.data.map((item) => {
        setVideodata(item.title);
      });
      console.log(videodata);
      // setVideodata(res.data.data);
    });
  };
  useEffect(() => {
    articleinit();
    videoinit();
    listinit();
  }, []);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className={styles.lesson}>
          <div>
            <Button type="link" style={{ fontSize: "25px" }}>
              文章课程{" >"}
            </Button>
          </div>
          {articlesrc > 0 && (
            <div className={styles.classimg}>
              <img src={articlesrc[0].article_pic} alt="" />
              <img src={articlesrc[1].article_pic} alt="" />
              <img src={articlesrc[2].article_pic} alt="" />
              <img src={articlesrc[3].article_pic} alt="" />
            </div>
          )}
        </div>
        <div className="charts">
          <p style={{ fontSize: "20px", color: "coral", marginLeft: "10px" }}>
            文章课程排行榜
          </p>
          <List
            bordered
            dataSource={articledata}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.lesson}>
          <div>
            <Button type="link" style={{ fontSize: "25px" }}>
              视频课程{" >"}
            </Button>
          </div>
          {videosrc > 0 && (
            <div className={styles.classimg}>
              <img src={videosrc[0].video_pic} alt="" />
              <img src={videosrc[1].video_pic} alt="" />
              <img src={videosrc[2].video_pic} alt="" />
              <img src={videosrc[3].video_pic} alt="" />
            </div>
          )}
        </div>
        <div className="charts">
          <p style={{ fontSize: "20px", color: "coral", marginLeft: "10px" }}>
            视频课程排行榜
          </p>
          <List
            bordered
            dataSource={videodata}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>
    </div>
  );
}
