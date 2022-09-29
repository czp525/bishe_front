import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";



export default function Mysider() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/" + e.key);
  };

  return (
    <div className={styles["side-wrapper"]}>
      <Menu
        className={styles.sidermenu}
        onClick={handleClick}
        defaultSelectedKeys={[""]}
        mode="inline"
        theme="light"
      >
        <Menu.Item
          className={styles.item}
          key="courses/videolesson"
          icon={
            <PieChartOutlined
              style={{
                fontSize: "20px",
                textAlign: "center",
              }}
            />
          }
        >
          课程
        </Menu.Item>
        <Menu.Item
          className={styles.item}
          key="forum"
          icon={
            <DesktopOutlined
              style={{ fontSize: "20px", textAlign: "center" }}
            />
          }
        >
          论坛
        </Menu.Item>
        <Menu.Item
          className={styles.item}
          key="training"
          icon={
            <ContainerOutlined
              style={{ fontSize: "20px", textAlign: "center" }}
            />
          }
        >
          训练营
        </Menu.Item>
      </Menu>
    </div>
  );
}
