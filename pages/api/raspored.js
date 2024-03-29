import { currentSeason } from "../../utils/currentSeason";

const cheerio = require("cheerio");
const axios = require("axios");

export default (req, res) => {
  const url = `https://sportdc.net/embed/results-next/${currentSeason}`;

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      res.status(200).json($("html").html());
    })
    .catch((err) => {
      console.log(err);
    });
};
