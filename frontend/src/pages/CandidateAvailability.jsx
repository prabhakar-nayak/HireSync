import { useState } from "react";
import axios from "axios";

function CandidateAvailability() {
  const [formData, setFormData] = useState({
    candidate_name: "",
    candidate_email: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  const [message, setMessage] = useState("");

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

    try {
      const response = await axios.post(
        "https://hiresync-0lnu.onrender.com/api/candidates/availability",
        formData
      );

      setMessage(response.data.message);

      // CLEAR FORM

      setFormData({
        candidate_name: "",
        candidate_email: "",
        date: "",
        start_time: "",
        end_time: "",
      });
    } catch (error) {
      console.log(error);

      setMessage("Something went wrong");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="mb-4">Candidate Availability</h2>

      <form onSubmit={handleSubmit}>
        {/* CANDIDATE NAME */}

        <div className="mb-3">
          <label className="form-label">
            Candidate Name
          </label>

          <input
            type="text"
            name="candidate_name"
            className="form-control"
            value={formData.candidate_name}
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

        {/* SUBMIT BUTTON */}

        <button type="submit" className="btn btn-success">
          Add Availability
        </button>
      </form>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="alert alert-success mt-3">
          {message}
        </div>
      )}
    </div>
  );
}

export default CandidateAvailability;