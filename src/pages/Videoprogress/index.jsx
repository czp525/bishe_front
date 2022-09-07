import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Divider, Table, Pagination } from "antd";
import { GetvideodurationApi } from "../../request/api";

const { Column } = Table;
export default function Videoprogress() {
  const [data, setdata] = useState([]);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const getData = (c) => {
    GetvideodurationApi({ current: c })
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
  const pageChange = (c) => {
    setCurrent(c);
    getData(c);
  };
  return (
    <div>
      <div className={styles.mcontent}>
        <Divider />
        <Table dataSource={data} pagination={false} rowKey={"username"}>
          <Column title="用户名" dataIndex="username" key="username" />
          <Column title="课程ID" dataIndex="video_id" key="video_id" />
          <Column title="当前进度" dataIndex="curprocess" key="curprocess" />
          <Column title="总进度" dataIndex="process" key="process" />
        </Table>
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
    </div>
  );
}
