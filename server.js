const express = require("express");
const next = require("next");
const cheerio = require("cheerio");
const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/tabela-api", function (req, res) {
    const url = `https://sportdc.net/embed/standings/4286`;

    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        res.json($("html").html());
      })
      .catch((err) => {
        console.log(err);
      });
  });

  server.get("/raspored-api", function (req, res) {
    const url = `https://sportdc.net/embed/results-next/4286`;

    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        res.json($("html").html());
      })
      .catch((err) => {
        console.log(err);
      });
  });

  server.get("/rezultati-api", function (req, res) {
    const url = `https://sportdc.net/embed/results/4286`;

    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        res.json($("html").html());
      })
      .catch((err) => {
        console.log(err);
      });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
