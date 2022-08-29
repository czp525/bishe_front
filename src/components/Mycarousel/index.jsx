import React from "react";
import { Carousel } from "antd";
import styles from "./index.module.css";
// const contentStyle = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

export default function Mycarousel() {
  return (
    <div className={styles.carouselcontainer}>
      <Carousel autoplay className={styles.carousel}>
        <div>
          <img src="../../5.jpg" style={{ height: "500px", width: "800px" }} />
        </div>
        <div>
          <img src="../../6.jpeg" style={{ height: "500px", width: "800px" }} />
        </div>
        <div>
          <img src="../../3.jpeg" style={{ height: "500px", width: "800px" }} />
        </div>
        <div>
          <img src="../../4.jpeg" style={{ height: "500px", width: "800px" }} />
        </div>
      </Carousel>
    </div>
  );
}
