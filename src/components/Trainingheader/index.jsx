import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function Trainingheader() {
  const navigate = useNavigate();
  const tofirst = () => {
    navigate("/");
  };
  const toforum = () => {
    navigate("/forum");
  };
  const totraining = () => {
    navigate("/courses/videolesson");
  };
  const towrong = () => {
    navigate("/errorsets");
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
          论坛
        </Button>
        <Button
          type="link"
          onClick={totraining}
          style={{ fontSize: "20px", margin: "20px" }}
        >
          课程
        </Button>
        <Button
          type="link"
          onClick={towrong}
          style={{ fontSize: "20px", margin: "20px" }}
        >
          错题集
        </Button>
      </div>
    </div>
  );
}
