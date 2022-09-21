import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import "../../assets/base.css";
import Myheader from "../../components/Myheader/index";
import { Pagination, List } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchApi } from "../../request/api";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [data, setdata] = useState([]);

  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  const getData = (c) => {
    SearchApi({ value: state, current: c })
      .then((res) => {
        let a = [...res.data.data, ...res.data.data1];
        console.log(a);
        setdata(a);
        console.log(data);
        setTotal(res.data.total);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData(1);
  }, []);
  return (
    <div id="page">
      <Myheader></Myheader>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.video_pic} alt="" />}
              title={<a href=" ">{item.title}</a>}
              description={item.author}
            />
          </List.Item>
        )}
      />
      <Pagination
        current={current}
        style={{ marginTop: "20px" }}
        defaultCurrent={1}
        // pageSize={state.pageSize}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 15]}
        total={total}
        // showSizeChanger
        showQuickJumper
        onChange={pageChange}
        showTotal={(total) => `共 ${total} 条数据`}
      />
    </div>
  );
}
