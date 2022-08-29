import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.css";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("课程管理", "sub1", <MailOutlined />, [
    getItem("文章课程管理", "articlemanage"),
    getItem("视频课程管理", "videomanage"),
  ]),
  getItem("训练营管理", "trainingmanage", <PieChartOutlined />),
];
export default function Msider() {
  const [defaultkey, setdefaultkey] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let path = location.pathname;
    let key = path.split("/")[1];
    setdefaultkey(key);
  }, []);
  const handleClick = (e) => {
    navigate("/manage/" + e.key);
    setdefaultkey(e.key);
  };
  return (
    <Sider style={{ backgroundColor: "#fff" }}>
      <img src="../icon.png" className={styles.icon}></img>
      <div
        style={{
          width: 200,
        }}
      >
        <Menu
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
          selectedKeys={[defaultkey]}
          mode="inline"
          theme="lihgt"
          // inlineCollapsed={collapsed}
          items={items}
          onClick={handleClick}
          className={styles.menu}
        />
      </div>
    </Sider>
  );
}
