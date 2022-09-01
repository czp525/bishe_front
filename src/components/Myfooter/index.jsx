import React from "react";
import styles from "./index.module.css";

export default function Myfooter() {
  return (
    <div className={styles.footer}>
      <div>
        <img src="../../icon.png" alt="" className={styles.footericon} />
      </div>
      <div style={{ marginLeft: "50px" }}>
        <div style={{ marginLeft: "20px" }}> 关注我们</div>
        <img
          src="https://img.zcool.cn/community/0127ca554bbecc000001bf722acd55.jpg@1280w_1l_2o_100sh.jpg"
          alt=""
          style={{ width: "100px", height: "120px" }}
        />
      </div>
      <div style={{ marginLeft: "50px" }}>
        <div>联系方式</div>
        <div>xxx-xxxxxxx</div>
      </div>
    </div>
  );
}
