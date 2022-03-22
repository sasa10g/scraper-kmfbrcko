import React, { useState, useEffect } from "react";
import axios from "axios";
import { cleanupElements } from "../utils/helpers";

export default function Raspored() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/raspored");
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    cleanupElements();
  }, [data]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}
