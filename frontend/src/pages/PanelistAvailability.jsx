import { useState } from "react";
import axios from "axios";

function PanelistAvailability() {
  const [formData, setFormData] = useState({
    panelist_id: "",
    date: "",
    start_time: "",
    end_time: "",
    interview_type: "",
    max_interviews: "",
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
        "http://localhost:5000/api/panelists/availability",
        formData
      );

      setMessage(response.data.message);

      // CLEAR FORM

      setFormData({
        panelist_id: "",
        date: "",
        start_time: "",
        end_time: "",
        interview_type: "",
        max_interviews: "",
      });
    } catch (error) {
      console.log(error);

      setMessage("Something went wrong");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h2 className="mb-4">Panelist Availability</h2>

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

        {/* INTERVIEW TYPE */}

        <div className="mb-3">
          <label className="form-label">
            Interview Type
          </label>

          <input
            type="text"
            name="interview_type"
            className="form-control"
            value={formData.interview_type}
            onChange={handleChange}
            required
          />
        </div>

        {/* MAX INTERVIEWS */}

        <div className="mb-3">
          <label className="form-label">
            Max Interviews
          </label>

          <input
            type="number"
            name="max_interviews"
            className="form-control"
            value={formData.max_interviews}
            onChange={handleChange}
            required
          />
        </div>

        {/* SUBMIT BUTTON */}

        <button type="submit" className="btn btn-primary">
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

export default PanelistAvailability;