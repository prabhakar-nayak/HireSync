import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../services/api.js";


function UpcomingInterviews() {
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH INTERVIEWS

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/interviews/upcoming`
      );

      setInterviews(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  // LOAD DATA

  useEffect(() => {
    const loadData = async () => {
      await fetchInterviews();
    }
    loadData();
  }, []);

  // UPDATE STATUS

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/api/interviews/${id}/status`,
        {
          status,
        }
      );

      fetchInterviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="mb-4">Upcoming Interviews</h2>

      {/* LOADING */}

      {loading && <p>Loading...</p>}

      {/* EMPTY */}

      {!loading && interviews.length === 0 && (
        <div className="alert alert-warning">
          No interviews scheduled
        </div>
      )}

      {/* TABLE */}

      {!loading && interviews.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Panelist</th>
                <th>Candidate</th>
                <th>Date</th>
                <th>Time</th>
                <th>Round</th>
                <th>Status</th>
                <th>Meeting</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>{interview.id}</td>

                  <td>{interview.panelist_id}</td>

                  <td>{interview.candidate_email}</td>

                  <td>{interview.date}</td>

                  <td>
                    {interview.start_time} -{" "}
                    {interview.end_time}
                  </td>

                  <td>{interview.round}</td>

                  {/* STATUS */}

                  <td>
                    <span className="badge bg-primary">
                      {interview.status}
                    </span>
                  </td>

                  {/* MEETING LINK */}

                  <td>
                    <a
                      href={interview.meeting_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join
                    </a>
                  </td>

                  {/* STATUS UPDATE */}

                  <td>
                    <select
                      className="form-select"
                      value={interview.status}
                      onChange={(event) =>
                        updateStatus(
                          interview.id,
                          event.target.value
                        )
                      }
                    >
                      <option value="Scheduled">
                        Scheduled
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="No Show">
                        No Show
                      </option>

                      <option value="Rescheduled">
                        Rescheduled
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UpcomingInterviews;