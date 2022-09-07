import React, { useState, useEffect } from "react";
import Lessonheader from "../../components/Lessonheader";
// import Myfooter from "../../components/Myfooter/index";
import { Tabs } from "antd";
import styles from "./index.module.css";
// import { GetarticleApi, GetvideoApi } from "../../request/api";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

export default function Courses() {
  const navigate = useNavigate();
  // const [key, setKey] = useState();

  // const onChange = (key) => {
  //   setKey(key);
  //   console.log(key);
  // };
  const onTabClick = (key) => {
    navigate("/courses/" + key);
  };
  return (
    <div id={styles.page}>
      <Lessonheader></Lessonheader>
      <Tabs
        defaultActiveKey="1"
        // onChange={onChange}
        onTabClick={onTabClick}
        style={{ marginTop: "20px" }}
      >
        <TabPane tab="视频课程" key="videolesson"></TabPane>
        <TabPane tab="文章课程" key="articlelesson"></TabPane>
      </Tabs>
      <Outlet />
    </div>
  );
}
