import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TabelaNova2() {
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
    return <div style={{ padding: "20px", textAlign: "center" }}>Učitavanje...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>{error}</div>;
  }

  return (
    <>
      <style jsx>{`
        .table-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          overflow: hidden;
          height: 100%;
        }

        .table-header {
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          background: #f9fafb;
        }

        .table-title {
          font-weight: 700;
          font-size: 14px;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .standings-table {
          width: 100%;
          border-collapse: collapse;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
        }

        .standings-table thead tr {
          background: #f9fafb;
          border-bottom: 1px solid #f1f5f9;
        }

        .standings-table th {
          padding: 12px 8px;
          text-align: center;
          color: #64748b;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .standings-table th.team-header {
          text-align: left;
          padding-left: 12px;
        }

        .standings-table tbody tr {
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s ease;
        }

        .standings-table tbody tr:hover {
          background: #f9fafb;
        }

        .standings-table tbody tr:last-child {
          border-bottom: none;
        }

        .standings-table td {
          padding: 12px 8px;
          text-align: center;
          font-size: 14px;
          color: #0f172a;
        }

        .standings-table td.team-cell {
          text-align: left;
          font-weight: 500;
          padding-left: 12px;
        }

        .team-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .team-logo {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          background: #f1f5f9;
          flex-shrink: 0;
        }

        .position-cell {
          font-weight: 600;
          color: #64748b;
        }

        .points-cell {
          font-weight: 700;
          color: #0f172a;
          font-size: 15px;
        }

        .form-cell {
          font-size: 12px;
        }

        .empty-state {
          padding: 32px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .standings-table {
            font-size: 12px;
          }
          .standings-table th,
          .standings-table td {
            padding: 8px 4px;
          }
          .standings-table th.form-header,
          .standings-table td.form-cell {
            display: none;
          }
          .team-logo {
            width: 24px;
            height: 24px;
          }
        }

        @media (max-width: 480px) {
          .standings-table th.draws-header,
          .standings-table td.draws-cell,
          .standings-table th.losses-header,
          .standings-table td.losses-cell {
            display: none;
          }
        }
      `}</style>

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">Tabela</h3>
        </div>
        <div className="table-wrapper">
          <table className="standings-table">
            <thead>
              <tr>
                <th>Poz</th>
                <th className="team-header">Tim</th>
                <th>Utak</th>
                <th>Pob</th>
                <th className="draws-header">Ner</th>
                <th className="losses-header">Por</th>
                <th>DG</th>
                <th>PG</th>
                <th>GR</th>
                <th className="form-header">Forma</th>
                <th>Bod</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((team, index) => (
                <tr key={index}>
                  <td className="position-cell">{team.position}</td>
                  <td className="team-cell">
                    <div className="team-info">
                      {team.logo && (
                        <img
                          className="team-logo"
                          src={team.logo}
                          alt={team.team}
                        />
                      )}
                      <span>{team.team}</span>
                    </div>
                  </td>
                  <td>{team.played}</td>
                  <td>{team.wins}</td>
                  <td className="draws-cell">{team.draws}</td>
                  <td className="losses-cell">{team.losses}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <td className="form-cell">{team.form}</td>
                  <td className="points-cell">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {tableData.length === 0 && (
            <div className="empty-state">
              Nema podataka o tabeli.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
