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
  const [collapsed, setCollapsed] = useState(false);
  const handleClick = (e) => {
    navigate("/" + e.key);
  };
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <div
      style={{
        width: 200,
        boxShadow: "2px 2px 5px grey",
        // marginLeft:"100px",
        marginTop:'40px',
        marginBottom:"10px",
        backgroundColor:'#fff'
      }}
    >
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          margin: "0px 0px 50px 0px",
        }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: "20px" }} />
        )}
      </Button> */}
      <Menu
        className={styles.sidermenu}
        onClick={handleClick}
        defaultSelectedKeys={[""]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        // inlineCollapsed={collapsed}
        // items={items}

        style={{
          fontSize: "20px",
          textAlign: "center",
          flex: 1,
          display: "flex",
          flexFlow: "column",
          // padding: "20px",
          // justifyContent: "space-between",
        }}
      >
        <Menu.Item
          key="courses/videolesson"
          icon={
            <PieChartOutlined
              style={{
                fontSize: "20px",
                textAlign: "center",
              }}
            />
          }
          style={{ margin: "30px 0px" }}
        >
          课程
        </Menu.Item>
        <Menu.Item
          key="forum"
          icon={
            <DesktopOutlined
              style={{ fontSize: "20px", textAlign: "center" }}
            />
          }
          style={{ margin: "30px 0px" }}
        >
          论坛
        </Menu.Item>
        <Menu.Item
          key="training"
          icon={
            <ContainerOutlined
              style={{ fontSize: "20px", textAlign: "center" }}
            />
          }
          style={{ margin: "30px 0px" }}
        >
          训练营
        </Menu.Item>
      </Menu>
    </div>
  );
}
