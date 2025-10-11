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
    return <div style={containerStyle}>Učitavanje ...</div>;
  }

  if (error) {
    return <div style={{ ...containerStyle, color: "red" }}>{error}</div>;
  }

  return (
    <>
      <style jsx>{`
        .standings-table tbody tr {
          transition: all 0.2s ease;
        }

        .standings-table tbody tr:hover {
          background-color: #f8f9fa !important;
          transform: scale(1.01);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .highlighted-team {
          background-color: #fff9e6 !important;
          border-left: 4px solid #ffc107;
        }

        .highlighted-team:hover {
          background-color: #fff3cd !important;
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
                      backgroundColor: isBrcko ? "#fff9e6" : "#ffffff",
                      borderBottom: "1px solid #e9ecef",
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
                    <td style={{ ...tableCellStyle, fontWeight: "700", color: "#000", fontSize: "15px" }}>
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
  // padding: "10px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "20px",
  textAlign: "center",
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
  padding: "8px 8px",
  textAlign: "center",
  border: "none",
  fontSize: "14px",
  color: "#212529",
};
