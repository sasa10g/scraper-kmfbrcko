// /api/sve_rezultati.js
const cheerio = require("cheerio");
const axios = require("axios");

const BASE = "https://sportdc.net/league/6148-prva-liga-rs";
const TOTAL_ROUNDS = 18; // Može i dinamički, ali ovo je najjednostavnije i stabilno

// Map team names to local logo files
const teamLogoMap = {
  "Tango": "/clubs/tango.png",
  "Gradiška": "/clubs/gradiska.png",
  "Radnik MD Šop": "/clubs/radnik.png",
  "Nevesinje": "/clubs/nevesinje.png",
  "Zahumlje": "/clubs/zahumlje.png",
  "Jahorina": "/clubs/jahorina.png",
  "Kotor Varoš": "/clubs/kotor_varos.png",
  "Željeznica": "/clubs/zeljeznica.png",
  "Derventa": "/clubs/derventa.png",
  "Brčko Zdravlje": "/clubs/brcko_zdravlje.png",
};

// (opciono) prosta cache-a da ne gađaš 18 zahteva svake posete
let cache = { data: null, ts: 0 };
const CACHE_TTL_MS = 5 * 60 * 1000;

export default async (req, res) => {
  try {
    if (cache.data && Date.now() - cache.ts < CACHE_TTL_MS) {
      return res.status(200).json(cache.data);
    }

    // ograniči paralelizam da ne throttluju (npr. batch po 4)
    const rounds = [];
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept-Language": "sr-RS,sr;q=0.9,en;q=0.8",
    };

    const fetchRound = async (roundNo) => {
      const url = `${BASE}/round/${roundNo}`;
      const { data: html } = await axios.get(url, { headers });
      const $ = cheerio.load(html);

      const matches = [];
      // ✅ only parse the first table on the page
      const table = $("table").first();
      table.find("tr").each((_, el) => {
        const cells = $(el).find("td");
        if (cells.length >= 5) {
          const dateTime = $(cells[1]).text().trim().replace(/\s+/g, " ");
          const homeTeam = $(cells[2]).text().trim();
          const score = $(cells[3]).text().trim();
          const awayTeam = $(cells[4]).text().trim();

          if (homeTeam && awayTeam) {
            matches.push({
              dateTime,
              homeTeam,
              homeLogo: teamLogoMap[homeTeam] || null,
              score: score || ":",
              awayTeam,
              awayLogo: teamLogoMap[awayTeam] || null,
            });
          }
        }
      });

      return {
        roundNumber: roundNo,
        matches,
      };
    };


    // batchevi po 4 da bude kulturno
    const concurrency = 4;
    for (let start = 1; start <= TOTAL_ROUNDS; start += concurrency) {
      const batch = [];
      for (let r = start; r < start + concurrency && r <= TOTAL_ROUNDS; r++) {
        batch.push(fetchRound(r));
      }
      const results = await Promise.all(batch);
      rounds.push(...results);
    }

    // ukloni prazna kola (ako ih ima)
    const nonEmpty = rounds
      .filter((r) => r.matches.length > 0)
      .sort((a, b) => a.roundNumber - b.roundNumber);

    cache = { data: nonEmpty, ts: Date.now() };
    res.status(200).json(nonEmpty);
  } catch (err) {
    console.error("Error fetching all results:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch all results data", details: err.message });
  }
};
