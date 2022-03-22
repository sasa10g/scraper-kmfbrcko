import React, { useState, useEffect } from "react";
import axios from "axios";
import { cleanupElements } from "../utils/helpers";

export default function Tabela() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/tabela");
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    cleanupElements("tabela");
  }, [data]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}
