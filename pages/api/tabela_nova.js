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

    const tableData = [];

    // Try multiple selectors to find the table
    let rows = $("table tbody tr");
    if (rows.length === 0) {
      rows = $(".league-table tbody tr");
    }
    if (rows.length === 0) {
      rows = $("table tr");
    }

    rows.each((index, element) => {
      const row = $(element);
      const cells = row.find("td");

      // Based on actual HTML structure:
      // Cell 0: Position, Cell 1: Empty, Cell 2: Team, Cell 3: Played, etc.
      // Total cells: 12 (0-11)
      if (cells.length === 12) {
        const position = $(cells[0]).text().trim();

        // Check if first cell is a number (position)
        if (/^\d+$/.test(position)) {
          const teamCell = $(cells[2]);
          const teamName = teamCell.text().trim();

          if (teamName) {
            tableData.push({
              position: position,
              team: teamName,
              logo: teamLogoMap[teamName] || null,
              played: $(cells[3]).text().trim(),
              wins: $(cells[4]).text().trim(),
              draws: $(cells[5]).text().trim(),
              losses: $(cells[6]).text().trim(),
              goalsFor: $(cells[7]).text().trim(),
              goalsAgainst: $(cells[8]).text().trim(),
              goalDifference: $(cells[9]).text().trim(),
              form: $(cells[10]).text().trim(),
              points: $(cells[11]).text().trim(),
            });
          }
        }
      }
    });

    res.status(200).json(tableData);
  } catch (err) {
    console.error("Error fetching table:", err.message);
    res.status(500).json({ error: "Failed to fetch table data", details: err.message });
  }
};
