import React, { useState, useEffect } from "react";
import axios from "axios";
import { cleanupElements } from "../utils/helpers";

export default function Rezultat() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/rezultat");
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    cleanupElements();
  }, [data]);

  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
      <iframe
        src="https://sportdc.net/embed/results/4702"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="270"
      ></iframe>
    </>
  );
}
