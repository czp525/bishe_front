import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Lessonheader() {
  const navigate = useNavigate();
  const tofirst = () => {
    navigate("/");
  };
  const toforum = () => {
    navigate("/forum");
  };
  const totraining = () => {
    navigate("/training");
  };
  return (
    <div className="lessonheader">
      <img src="../icon.png" className="icon"></img>
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
          训练营
        </Button>
      </div>
    </div>
  );
}
