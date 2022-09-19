import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function Forumheader() {
  const navigate = useNavigate();
  const tofirst = () => {
    navigate("/");
  };
  const toforum = () => {
    navigate("/courses/videolesson");
  };
  const totraining = () => {
    navigate("/training");
  };
  return (
    <div className={styles.lessonheader}>
      <div className={styles.iconbox}>
        <img src="../icon.png" className={styles.icon} alt=""></img>
      </div>
      <div>
        <Button
          type="link"
          onClick={tofirst}
          style={{ fontSize: "20px", margin: "20px" }}
        >
          首页
        </Button>
        <Button
          type="link"
          onClick={toforum}
          style={{ fontSize: "20px", margin: "20px" }}
        >
          课程
        </Button>
        <Button
          type="link"
          onClick={totraining}
          style={{ fontSize: "20px", margin: "20px" }}
        >
          训练营
        </Button>
      </div>
    </div>
  );
}
