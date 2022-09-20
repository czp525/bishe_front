import React, { useState, useEffect } from "react";
import { Pagination, List, Tag, Button } from "antd";
import styles from "./index.module.css";
import { GetarticleApi } from "../../request/api";
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
    GetarticleApi({ current: c })
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {});

  useEffect(() => {
    getData(1);
  }, []);
  const handleclick = (e) => {
    const e_id = e.article_id;
    axios({
      method: "get",
      url: `http://10.2.13.132:8088/my/article/changearticle/${e_id}`,
      data: {
        article_id: e_id,
      },
      // headers: {
      //   authorization: managertokenstr,
      // },
    })
      .then((res) => {
        console.log(res.data.data);
        navigate("/lesson1", { state: res.data.data });
      })
      .catch((err) => {});
  };
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.article_pic} alt="" />}
              title={
                <Button
                  type="link"
                  onClick={() => {
                    handleclick(item);
                  }}
                >
                  {item.title}
                </Button>
              }
              children={item.author}
              description={item.introduce}
            />
            <div>
              <Tag color="#55acee">{item.article_type}</Tag> <br />
              <Tag color="#55acee">{item.article_type_classify}</Tag>
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
