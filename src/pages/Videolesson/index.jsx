import React, { useState, useEffect } from "react";
import { Pagination, List, Tag, Button } from "antd";
import styles from "./index.module.css";
import { GetvideoApi } from "../../request/api";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Videolesson() {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  const getData = (c) =>
    GetvideoApi({ current: c })
      .then((res) => {
        // console.log(res);
        setdata(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {});

  useEffect(() => {
    getData(1);
  }, []);
  const handleclick = (e) => {
    const e_id = e.video_id;
    axios({
      method: "get",
      url: `http://10.2.13.113:8088/my/video/changevideo1/${e_id}`,
      data: {
        video_id: e_id,
      },
      // headers: {
      //   authorization: managertokenstr,
      // },
    })
      .then((res) => {
        console.log(res.data.data);
        navigate("/lesson2", { state: res.data.data });
      })
      .catch((err) => {});
  };
  return (
    <div id={styles.page}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  src={item.video_pic}
                  alt=""
                  style={{ width: "200px", height: "120px" }}
                />
              }
              title={
                <Button
                  type="link"
                  onClick={() => {
                    handleclick(item);
                  }}
                  style={{ fontSize: "20px", marginLeft: "100px" }}
                >
                  {item.title}
                </Button>
              }
              description={
                <div style={{ fontSize: "16px", marginLeft: "120px" }}>
                  {item.video_introduce}
                </div>
              }
            />
            <div>
              <Tag color="#55acee" style={{ marginLeft: "120px" }}>
                {item.video_type}
              </Tag>
              <br />
              <Tag
                color="#55acee"
                style={{ marginLeft: "120px", marginTop: "5px" }}
              >
                {item.video_type_classify}
              </Tag>
            </div>

            {/* <div>
              {item.video_type} <br />
              {item.video_type_classify}
            </div> */}
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
