const cheerio = require("cheerio");
const axios = require("axios");

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

export default async (req, res) => {
  const url = "https://sportdc.net/league/6148-prva-liga-rs";

  try {
    const response = await axios(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const matches = [];

    // Get the first table (results/next matches table)
    const firstTable = $("table").first();
    const rows = firstTable.find("tr");

    rows.each((index, element) => {
      const row = $(element);
      const cells = row.find("td");

      // Skip header rows
      if (cells.length >= 5) {
        const dateTime = $(cells[1]).text().trim();
        const homeTeam = $(cells[2]).text().trim();
        const score = $(cells[3]).text().trim();
        const awayTeam = $(cells[4]).text().trim();

        if (homeTeam && awayTeam) {
          matches.push({
            dateTime: dateTime.replace(/\s+/g, ' '),
            homeTeam: homeTeam,
            homeLogo: teamLogoMap[homeTeam] || null,
            score: score || ":",
            awayTeam: awayTeam,
            awayLogo: teamLogoMap[awayTeam] || null,
          });
        }
      }
    });

    res.status(200).json(matches);
  } catch (err) {
    console.error("Error fetching results:", err.message);
    res.status(500).json({ error: "Failed to fetch results data", details: err.message });
  }
};
