import React from "react";
import { Layout } from "antd";
import styles from "./index.module.css";
const { Header } = Layout;
export default function Mheader() {
  return (
    <Header
      className={styles.header}
      style={{
        // backgroundImage: `url(../../../../../topbg.jpg)`,
        backgroundColor: "#e6f7ff",
        backgroundPositionX: "center",
        color: "white",
        backgroundSize: "100%",
        // width: "100%",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src="../icon.png" className={styles.icon}></img>
    </Header>
  );
}
