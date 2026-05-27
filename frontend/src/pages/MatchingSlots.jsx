import { useEffect, useState } from "react";
import axios from "axios";

function MatchingSlots() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await axios.get("https://hiresync-0lnu.onrender.com/api/matches");

        setMatches(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };

    getMatches();
  }, []);

  return (
    <div className="card p-4 shadow">
      <h2 className="mb-4">Matching Slots</h2>

      {/* LOADING */}

      {loading && <p>Loading...</p>}

      {/* NO MATCHES */}

      {!loading && matches.length === 0 && (
        <div className="alert alert-warning">No matching slots found</div>
      )}

      {/* MATCHES TABLE */}

      {!loading && matches.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Panelist ID</th>
                <th>Candidate</th>
                <th>Email</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Interview Type</th>
              </tr>
            </thead>

            <tbody>
              {matches.map((match, index) => (
                <tr key={index}>
                  <td>{match.panelist_id}</td>
                  <td>{match.candidate_name}</td>
                  <td>{match.candidate_email}</td>
                  <td>{match.date}</td>
                  <td>{match.start_time}</td>
                  <td>{match.end_time}</td>
                  <td>{match.interview_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MatchingSlots;
