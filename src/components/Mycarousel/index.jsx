import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import styles from "./index.module.css";
import { GetrandimgApi } from "../../request/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mycarousel() {
  const navigate = useNavigate();
  const [articlesrc, setArticleSrc] = useState([]);
  const [videosrc, setVideoSrc] = useState([]);

  const init = () => {
    GetrandimgApi().then((res) => {
      console.log(res);
      setArticleSrc(res.data.data[0]);
      setVideoSrc(res.data.data[1]);
      // console.log(...res.data.data[0]);
      // const a = [...res.data.data[0],...res.data.data[1]]
      // console.log(a);
      // setSrc(a)
      // setSrc(res.data.data || []);
    });
  };
  useEffect(() => {
    init();
  }, []);
  const handleclick = (e) => {
    if (e.article_id) {
      axios({
        method: "get",
        url: `http://10.2.13.113:8088/my/article/changearticle/${e.article_id}`,
        data: {
          article_id: e.article_id,
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
    } else {
      axios({
        method: "get",
        url: `http://10.2.13.113:8088/my/video/changevideo1/${e.video_id}`,
        data: {
          video_id: e.video_id,
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
    }
  };
  return (
    <div className={styles.carouselcontainer}>
      <Carousel autoplay className={styles.carousel}>
        {articlesrc.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.article_pic}
                alt=""
                className={styles.img}
                onClick={() => {
                  handleclick(item);
                }}
              />
            </div>
          );
        })}
        {videosrc.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.video_pic}
                alt=""
                className={styles.img}
                onClick={() => {
                  handleclick(item);
                }}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
