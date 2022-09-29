import React from "react";
import styles from "./index.module.css";

export default function Myfooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.imgWrapper}>
        <img src="../../icon.png" alt="" className={styles.footericon} />
      </div>
      <div className={styles.qrCode}>
        <div className={styles.us}> 关注我们</div>
        <img
          src="https://img.zcool.cn/community/0127ca554bbecc000001bf722acd55.jpg@1280w_1l_2o_100sh.jpg"
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.connectWrapper}>
        <div className={styles.conect}>联系方式</div>
        <div className={styles.phone}>xxx-xxxxxxx</div>
        <div className={styles.phone}>xxx-xxxxxxx</div>
        <div className={styles.phone}>xxx-xxxxxxx</div>
      </div>
    </div>
  );
}
