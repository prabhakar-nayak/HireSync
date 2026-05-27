import { useState } from "react";
import axios from "axios";

function InterviewScheduler() {
  const [formData, setFormData] = useState({
    panelist_id: "",
    candidate_email: "",
    date: "",
    start_time: "",
    end_time: "",
    round: "",
  });

  const [message, setMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // HANDLE INPUT CHANGE

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // HANDLE FORM SUBMIT

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setMeetingLink("");

    try {
      const response = await axios.post(
        "https://hiresync-0lnu.onrender.com/api/interviews",
        formData
      );

      setMessage(response.data.message);

      setMeetingLink(response.data.meeting_link);

      // CLEAR FORM

      setFormData({
        panelist_id: "",
        candidate_email: "",
        date: "",
        start_time: "",
        end_time: "",
        round: "",
      });
    } catch (error) {
      console.log(error);

      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="mb-4">Interview Scheduler</h2>

      <form onSubmit={handleSubmit}>
        {/* PANELIST ID */}

        <div className="mb-3">
          <label className="form-label">Panelist ID</label>

          <input
            type="number"
            name="panelist_id"
            className="form-control"
            value={formData.panelist_id}
            onChange={handleChange}
            required
          />
        </div>

        {/* CANDIDATE EMAIL */}

        <div className="mb-3">
          <label className="form-label">
            Candidate Email
          </label>

          <input
            type="email"
            name="candidate_email"
            className="form-control"
            value={formData.candidate_email}
            onChange={handleChange}
            required
          />
        </div>

        {/* DATE */}

        <div className="mb-3">
          <label className="form-label">Date</label>

          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* START TIME */}

        <div className="mb-3">
          <label className="form-label">Start Time</label>

          <input
            type="time"
            name="start_time"
            className="form-control"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        {/* END TIME */}

        <div className="mb-3">
          <label className="form-label">End Time</label>

          <input
            type="time"
            name="end_time"
            className="form-control"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </div>

        {/* ROUND */}

        <div className="mb-3">
          <label className="form-label">Round</label>

          <input
            type="text"
            name="round"
            className="form-control"
            value={formData.round}
            onChange={handleChange}
            required
          />
        </div>

        {/* SUBMIT */}

        <button type="submit" className="btn btn-info">
          Schedule Interview
        </button>
      </form>

      {/* SUCCESS */}

      {message && (
        <div className="alert alert-success mt-3">
          <p>{message}</p>

          <p>
            <strong>Meeting Link:</strong>
          </p>

          <a
            href={meetingLink}
            target="_blank"
            rel="noreferrer"
          >
            {meetingLink}
          </a>
        </div>
      )}

      {/* ERROR */}

      {errorMessage && (
        <div className="alert alert-danger mt-3">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default InterviewScheduler;