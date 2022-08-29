import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Layout, Input, Avatar } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
// import "../assets/base.css";
import styles from "./index.module.css";

export default function Myheader() {
  const navigate = useNavigate();
  const { Search } = Input;
  const { Header } = Layout;
  const onSearch = (value) => console.log(value); //搜索框内容

  const userstr = localStorage.getItem("userdata");
  let user = JSON.parse(userstr); //从localstorage获得user对象
  if (userstr) {
    user = JSON.parse(userstr); //从localstorage获得user对象
  } else {
  }
  const newuserstr = localStorage.getItem("newuserdata");
  let newuser = JSON.parse(newuserstr);
  if (newuserstr) {
    user.nickname = newuser.nickname;
  }

  const menu = (
    <Menu
      items={[
        {
          label: <a href="/personal">个人中心</a>,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: (
            <a
              href="/"
              onClick={() => {
                window.localStorage.clear();
              }}
            >
              退出登录
            </a>
          ),
          key: "1",
        },
      ]}
    />
  ); //下拉列表
  function refreshpage() {
    window.location.reload();
  }
  function topersonal() {
    navigate("/personal");
  }
  return (
    <Header className={styles.header}>
      <img
        src="../icon.png"
        alt=""
        className={styles.icon}
        onClick={refreshpage}
      ></img>
      <div className={styles["search-wrapper"]}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className={styles.search}
        />
      </div>
      {user ? (
        <div className={styles.headerR}>
          <Avatar
            className={styles.avatar}
            size={60}
            src={user.imgurl}
            onClick={topersonal}
          />
          <Dropdown overlay={menu} className={styles.menu}>
            <Space className={styles.userdrop}>
              {user.nickname}
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      ) : (
        <div className={styles.right}>
          <a href="/login">登录</a>|<a href="/signup">注册</a>
          {/* <button>登录</button>|<button>注册</button> */}
        </div>
      )}
    </Header>
  );
}
