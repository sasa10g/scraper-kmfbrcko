import React, { useState, useEffect } from "react";
import axios from "axios";
import { cleanupElements } from "../utils/helpers";
import { currentSeason } from "../utils/currentSeason";

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
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
      <iframe
        src={`https://sportdc.net/embed/standings/${currentSeason}`}
        frameborder="0"
        scrolling="no"
        width="100%"
        height="414"
      ></iframe>
    </>
  );
}
