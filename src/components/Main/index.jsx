import React from "react";
import { Button } from "antd";
import styles from "./index.module.css";

export default function Main() {
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.lesson}>
        <div>
          <Button type="link" style={{ fontSize: "25px" }}>
            课程{">"}
          </Button>
        </div>
        <div></div>
      </div>
      <div className="charts">
        <p style={{ fontSize: "25px", color: "coral" }}>排行榜</p>
      </div>
    </div>
  );
}
