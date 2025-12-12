import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RezultatiNova2() {
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
    return <div style={{ padding: "20px", textAlign: "center" }}>Učitavanje...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>{error}</div>;
  }

  return (
    <>
      <style jsx>{`
        .match-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          overflow: hidden;
          height: 100%;
        }

        .match-header {
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          background: #f9fafb;
        }

        .match-title {
          font-weight: 700;
          font-size: 14px;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .match-list {
          border-top: 1px solid #f1f5f9;
        }

        .match-item {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s ease;
        }

        .match-item:hover {
          background: #f9fafb;
        }

        .match-item:last-child {
          border-bottom: none;
        }

        .match-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .match-date {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .match-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .team-container {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .team-container.away {
          justify-content: flex-end;
        }

        .team-name {
          font-size: 14px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .team-name.winner {
          color: #0f172a;
        }

        .team-name.loser {
          color: #64748b;
        }

        .team-logo {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          background: #f1f5f9;
          flex-shrink: 0;
        }

        .score-container {
          padding: 0 12px;
          min-width: 60px;
          text-align: center;
        }

        .score-badge {
          padding: 4px 8px;
          background: #f1f5f9;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
        }

        .empty-state {
          padding: 32px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .team-name {
            font-size: 12px;
          }
          .match-item {
            padding: 12px;
          }
        }
      `}</style>

      <div className="match-card">
        <div className="match-header">
          <h3 className="match-title">Rezultati</h3>
        </div>
        <div className="match-list">
          {matchesData.map((match, index) => {
            const scores = match.score ? match.score.split('-').map(s => s.trim()) : ['', ''];
            const homeScore = scores[0];
            const awayScore = scores[1];
            const isHomeWin = homeScore && awayScore && parseInt(homeScore) > parseInt(awayScore);
            const isAwayWin = homeScore && awayScore && parseInt(awayScore) > parseInt(homeScore);

            return (
              <div key={index} className="match-item">
                <div className="match-meta">
                  <span className="match-date">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {match.dateTime}
                  </span>
                </div>

                <div className="match-content">
                  {/* Home Team */}
                  <div className="team-container">
                    <span className={`team-name ${isHomeWin ? 'winner' : 'loser'}`}>
                      {match.homeTeam}
                    </span>
                    {match.homeLogo && (
                      <img
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        className="team-logo"
                      />
                    )}
                  </div>

                  {/* Score */}
                  <div className="score-container">
                    <span className="score-badge">
                      {homeScore} - {awayScore}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="team-container away">
                    {match.awayLogo && (
                      <img
                        src={match.awayLogo}
                        alt={match.awayTeam}
                        className="team-logo"
                      />
                    )}
                    <span className={`team-name ${isAwayWin ? 'winner' : 'loser'}`}>
                      {match.awayTeam}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {matchesData.length === 0 && (
            <div className="empty-state">
              Nema rezultata.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
