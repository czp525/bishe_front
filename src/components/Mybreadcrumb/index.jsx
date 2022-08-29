import React, { useState, useEffect } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
export default function Mybreadcrumb() {
  const { pathname } = useLocation();
  const [bread, setbread] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    switch (pathname) {
      case "/manage/articlemanage":
        setbread("文章课程管理");
        break;
      case "/manage/videomanage":
        setbread("视频课程管理");
        break;
      case "/manage/trainingmanage":
        setbread("训练营管理");
        break;

      default:
        break;
    }
  }, [pathname]);
  const handleclick = () => {
    // console.log(pathname);
    // navigate("`{ pathname }`");
  };
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item onClick={handleclick}>{bread}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
