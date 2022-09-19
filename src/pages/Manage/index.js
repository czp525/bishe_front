import React, { useEffect } from "react";
import { Layout } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import Msider from "../../components/Msider";
import Mybreadcrumb from "../../components/Mybreadcrumb";
import styles from "./index.module.css";
const { Content } = Layout;

export default function Manage() {
  const navigate = useNavigate();
  const managertokenstr = localStorage.getItem("managertoken");
  useEffect(() => {
    if (!managertokenstr) {
      navigate("/managerlogin");
    }
  }, []);
  return (
    <Layout className={styles.manage}>
      <Layout className={styles.mcontainer}>
        <Msider></Msider>
        <Content>
          <Mybreadcrumb></Mybreadcrumb>
          <div className={styles.mcontainer_box}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
