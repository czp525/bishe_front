import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import styles from "./index.module.css";
import { GetrandimgApi } from "../../request/api";
// const contentStyle = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

export default function Mycarousel() {
  const [src, setSrc] = useState([]);
  const init = () => {
    GetrandimgApi().then((res) => {
      // console.log(res);
      // console.log(res.data.data);
      setSrc(res.data.data);
      // console.log(src);
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className={styles.carouselcontainer}>
      {src.length > 0 && (
        <Carousel autoplay className={styles.carousel}>
          <div>
            <img
              src={src[0][0].article_pic}
              alt=""
              style={{ height: "500px", width: "800px" }}
            />
          </div>
          <div>
            <img
              src={src[0][1].article_pic}
              alt=""
              style={{ height: "500px", width: "800px" }}
            />
          </div>
          <div>
            <img
              src={src[1][0].video_pic}
              alt=""
              style={{ height: "500px", width: "800px" }}
            />
          </div>
          <div>
            <img
              src={src[1][1].video_pic}
              alt=""
              style={{ height: "500px", width: "800px" }}
            />
          </div>
        </Carousel>
      )}
    </div>
  );
}
