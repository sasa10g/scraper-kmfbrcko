import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RezultatiNova() {
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("/api/rezultati");
        setMatchesData(result.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load matches data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={containerStyle}>Učitavanje...</div>;
  }

  if (error) {
    return <div style={{ ...containerStyle, color: "red" }}>{error}</div>;
  }

  return (
    <>
      <style jsx>{`
        .matches-table tbody tr {
          transition: all 0.2s ease;
        }

        .matches-table tbody tr:hover {
          background-color: #f8f9fa !important;
          transform: scale(1.01);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .highlighted-match {
          background-color: #fff9e6 !important;
          border-left: 4px solid #ffc107;
        }

        .highlighted-match:hover {
          background-color: #fff3cd !important;
        }

        @media (max-width: 768px) {
          .matches-table {
            font-size: 12px;
          }
          .matches-table th,
          .matches-table td {
            padding: 6px 4px !important;
          }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={tableWrapperStyle}>
          <table className="matches-table" style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Datum | Vreme</th>
                <th style={{ ...tableHeaderStyle, textAlign: "left" }}>Domaćin</th>
                <th style={tableHeaderStyle}>Rez</th>
                <th style={{ ...tableHeaderStyle, textAlign: "left" }}>Gost</th>
              </tr>
            </thead>
            <tbody>
              {matchesData.map((match, index) => {
                const isBrcko = match.homeTeam.includes("Brčko Zdravlje") || match.awayTeam.includes("Brčko Zdravlje");
                return (
                  <tr
                    key={index}
                    className={isBrcko ? "highlighted-match" : ""}
                    style={{
                      backgroundColor: isBrcko ? "#fff9e6" : "#ffffff",
                      borderBottom: "1px solid #e9ecef",
                    }}
                  >
                    <td style={tableCellStyle}>{match.dateTime}</td>
                    <td style={{ ...tableCellStyle, textAlign: "left", fontWeight: "500" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {match.homeLogo && (
                          <img
                            src={match.homeLogo}
                            alt={match.homeTeam}
                            style={{ width: "24px", height: "24px", objectFit: "contain", flexShrink: 0 }}
                          />
                        )}
                        <span>{match.homeTeam}</span>
                      </div>
                    </td>
                    <td style={{ ...tableCellStyle, fontWeight: "700", fontSize: "15px" }}>
                      {match.score}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "left", fontWeight: "500" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {match.awayLogo && (
                          <img
                            src={match.awayLogo}
                            alt={match.awayTeam}
                            style={{ width: "24px", height: "24px", objectFit: "contain", flexShrink: 0 }}
                          />
                        )}
                        <span>{match.awayTeam}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const containerStyle = {
  // padding: "10px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const tableWrapperStyle = {
  overflowX: "auto",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  borderRadius: "8px",
  border: "1px solid #e9ecef",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: "14px",
};

const tableHeaderStyle = {
  padding: "10px 8px",
  textAlign: "center",
  backgroundColor: "#f8f9fa",
  color: "#495057",
  fontWeight: "600",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  borderBottom: "2px solid #dee2e6",
};

const tableCellStyle = {
  padding: "10px 12px",
  textAlign: "center",
  border: "none",
  fontSize: "14px",
  color: "#212529",
};
