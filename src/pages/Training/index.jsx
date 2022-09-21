import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Trainingheader from "../../components/Trainingheader";
import { Pagination, List, Tag, Button } from "antd";
import { GetexamApi, GetquestionApi } from "../../request/api";
import { useNavigate } from "react-router-dom";

export default function Training() {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  const getData = (c) => {
    GetexamApi({ current: c })
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData(1);
  }, []);

  const handleclick = (e) => {
    GetquestionApi({ exam_id: e.exam_id })
      .then((res) => {
        // console.log(res.data.data);
        navigate("/question", {
          state: { data: res.data.data, exam_id: e.exam_id },
        });
        // navigate("/question", { state: { exam_id: e.exam_id } });
      })
      .catch((err) => {});
  };
  return (
    <div id={styles.page}>
      <Trainingheader />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<img src={item.article_pic} alt="" />}
              title={
                <Button
                  type="link"
                  onClick={() => {
                    handleclick(item);
                  }}
                  style={{ fontSize: "16px" }}
                >
                  {item.exam_name}
                </Button>
              }
            />
            <div>
              <Tag color="#55acee">{item.exam_type}</Tag> <br />
              <Tag color="#55acee" style={{ marginTop: "5px" }}>
                {item.exam_type_classify}
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
