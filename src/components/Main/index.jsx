import React, { useEffect, useState } from "react";
import { Button, List } from "antd";
import styles from "./index.module.css";
import {
  GetrandarticleApi,
  GetrandvideoApi,
  GetalApi,
  GetvlApi,
} from "../../request/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export default function Main() {
  const navigate = useNavigate();
  const [articlesrc, setArticleSrc] = useState([]);
  const [videosrc, setVideoSrc] = useState([]);
  const [articledata, setArticledata] = useState([]);
  const [videodata, setVideodata] = useState([]);

  const articleinit = () => {
    GetrandarticleApi().then((res) => {
        // console.log(res);
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
      setArticledata(res.data.data);
    });
    GetvlApi().then((res) => {
      setVideodata(res.data.data);
    });
  };
  useEffect(() => {
    articleinit();
    videoinit();
    listinit();
  }, []);
  const toVideolesson = () =>{
    navigate("/courses/videolesson");
  }
    const toArticlelesson = () => {
      navigate("/courses/articlelesson");
    };

      const articleclick = (e) => {
        const e_id = e.article_id;
        axios({
          method: "get",
          url: `http://10.2.13.136:8088/my/article/changearticle/${e_id}`,
          data: {
            article_id: e_id,
          },
          // headers: {
          //   authorization: managertokenstr,
          // },
        })
          .then((res) => {
            console.log(res.data.data);
            navigate("/lesson1", { state: res.data.data });
          })
          .catch((err) => {});
      };
      const videoclick = (e) => {
        const e_id = e.video_id;
        axios({
          method: "get",
          url: `http://10.2.13.136:8088/my/video/changevideo1/${e_id}`,
          data: {
            video_id: e_id,
          },
          // headers: {
          //   authorization: managertokenstr,
          // },
        })
          .then((res) => {
            console.log(res.data.data);
            navigate("/lesson2", { state: res.data.data });
          })
          .catch((err) => {});
      };
  return (
    <div id={styles.page}>
      <div className={styles.box} style={{ display: "flex" }}>
        <div className={styles.lesson}>
          <div>
            <Button
              type="link"
              style={{ fontSize: "25px", marginBottom: "30px" }}
              onClick={toArticlelesson}
            >
              文章课程{" >"}
            </Button>
          </div>
          {/* {articlesrc.length > 0 && (
            <div className={styles.classimg}>
              <img src={articlesrc[0].article_pic} alt="" />
              <img src={articlesrc[1].article_pic} alt="" />
              <img src={articlesrc[2].article_pic} alt="" />
              <img src={articlesrc[3].article_pic} alt="" />
            </div>
          )} */}
          <div className={styles.classimg}>
            {articlesrc.map((item, index) => {
              // console.log(item);
              return (
                <img
                  src={item.article_pic}
                  alt=""
                  key={index}
                  onClick={() => {
                    articleclick(item);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="charts">
          <p
            style={{
              fontSize: "20px",
              color: "coral",
              marginLeft: "15px",
              marginBottom: "20px",
            }}
          >
            文章课程排行榜
          </p>
          <List
            bordered
            dataSource={articledata}
            renderItem={(item) => (
              <List.Item>
                <Button
                  type="link"
                  onClick={() => {
                    articleclick(item);
                  }}
                >
                  {item.title}
                </Button>
              </List.Item>
            )}
            style={{ marginLeft: "15px" }}
          />
        </div>
      </div>
      <div className={styles.box} style={{ display: "flex" }}>
        <div className={styles.lesson}>
          <div>
            <Button
              type="link"
              style={{ fontSize: "25px ", marginBottom: "30px" }}
              onClick={toVideolesson}
            >
              视频课程{" >"}
            </Button>
          </div>
          <div className={styles.classimg}>
            {videosrc.map((item, index) => {
              // console.log(item);
              return (
                <img
                  src={item.video_pic}
                  alt=""
                  key={index}
                  onClick={() => {
                    videoclick(item);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="charts">
          <p
            style={{
              fontSize: "20px",
              color: "coral",
              marginLeft: "15px",
              marginBottom: "20px",
            }}
          >
            视频课程排行榜
          </p>
          <List
            bordered
            dataSource={videodata}
            renderItem={(item) => (
              <List.Item>
                <Button
                  type="link"
                  onClick={() => {
                    videoclick(item);
                  }}
                >
                  {item.title}
                </Button>
              </List.Item>
            )}
            style={{ marginLeft: "15px" }}
          />
        </div>
      </div>
    </div>
  );
}
