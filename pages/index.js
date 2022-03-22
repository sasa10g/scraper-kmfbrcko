import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/get-page");
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.getElementsByClassName("embed-table-link")[0]?.remove();
    document.getElementsByClassName("embed-table-header")[0]?.remove();
    document.getElementsByClassName("embed-table-tabs clearfix")[0]?.remove();
  }, [data]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}
