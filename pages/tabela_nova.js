import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TabelaNova() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("/api/tabela_nova");
        setTableData(result.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load table data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={containerStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={{ ...containerStyle, color: "red" }}>{error}</div>;
  }

  return (
    <>
      <style jsx>{`
        .standings-table tbody tr:hover {
          background-color: #e1eef7 !important;
          transition: background-color 0.3s ease;
        }

        .highlighted-team {
          background-color: #fff3cd !important;
          font-weight: 600;
        }

        .highlighted-team:hover {
          background-color: #ffe69c !important;
        }

        @media (max-width: 768px) {
          .standings-table {
            font-size: 12px;
          }
          .standings-table th,
          .standings-table td {
            padding: 4px 3px !important;
          }
          .standings-table th:nth-child(10),
          .standings-table td:nth-child(10) {
            display: none;
          }
          .team-logo {
            width: 20px !important;
            height: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .standings-table th:nth-child(5),
          .standings-table td:nth-child(5),
          .standings-table th:nth-child(6),
          .standings-table td:nth-child(6) {
            display: none;
          }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={tableWrapperStyle}>
          <table className="standings-table" style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Poz</th>
                <th style={{ ...tableHeaderStyle, textAlign: "left", paddingLeft: "12px" }}>
                  Tim
                </th>
                <th style={tableHeaderStyle}>Utak</th>
                <th style={tableHeaderStyle}>Pob</th>
                <th style={tableHeaderStyle}>Ner</th>
                <th style={tableHeaderStyle}>Por</th>
                <th style={tableHeaderStyle}>DG</th>
                <th style={tableHeaderStyle}>PG</th>
                <th style={tableHeaderStyle}>GR</th>
                <th style={tableHeaderStyle}>Forma</th>
                <th style={tableHeaderStyle}>Bod</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((team, index) => {
                const isBrcko = team.team === "Brčko Zdravlje";
                return (
                  <tr
                    key={index}
                    className={isBrcko ? "highlighted-team" : ""}
                    style={{
                      backgroundColor: isBrcko ? "#fff3cd" : (index % 2 === 0 ? "#ffffff" : "#f5f5f5"),
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <td style={tableCellStyle}>{team.position}</td>
                    <td style={{ ...tableCellStyle, textAlign: "left", fontWeight: "500", paddingLeft: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {team.logo && (
                          <img
                            className="team-logo"
                            src={team.logo}
                            alt={team.team}
                            style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 }}
                          />
                        )}
                        <span>{team.team}</span>
                      </div>
                    </td>
                    <td style={tableCellStyle}>{team.played}</td>
                    <td style={tableCellStyle}>{team.wins}</td>
                    <td style={tableCellStyle}>{team.draws}</td>
                    <td style={tableCellStyle}>{team.losses}</td>
                    <td style={tableCellStyle}>{team.goalsFor}</td>
                    <td style={tableCellStyle}>{team.goalsAgainst}</td>
                    <td style={tableCellStyle}>{team.goalDifference}</td>
                    <td style={tableCellStyle}>{team.form}</td>
                    <td style={{ ...tableCellStyle, fontWeight: "bold", color: "#014f63" }}>
                      {team.points}
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
  // padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#014f63",
  marginBottom: "20px",
  textAlign: "center",
};

const tableWrapperStyle = {
  overflowX: "auto",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  borderRadius: "4px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
};

const tableHeaderStyle = {
  padding: "8px 6px",
  textAlign: "center",
  backgroundColor: "#014f63",
  color: "#ffffff",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "12px",
  border: "1px solid #013a4a",
};

const tableCellStyle = {
  padding: "6px 6px",
  textAlign: "center",
  border: "1px solid #ddd",
  fontSize: "14px",
};
