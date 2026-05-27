const express = require("express");
const { v4: uuidv4 } = require("uuid");

const interviewRoutes = (db) => {
  const router = express.Router();

  // SCHEDULE INTERVIEW WITH CONFLICT CHECKING AND MEETING LINK GENERATION

  router.post("/", async (request, response) => {
    try {
      const {
        panelist_id,
        candidate_email,
        date,
        start_time,
        end_time,
        round,
      } = request.body;

      // CHECK PANELIST CONFLICT

      const panelistConflictQuery = `
        SELECT * FROM interviews
        WHERE panelist_id = ? 
        AND date = ?
        AND (
          start_time < ?
          AND end_time > ?
        )
      `;

      const existingPanelistInterview = await db.get(panelistConflictQuery, [
        panelist_id,
        date,
        end_time,
        start_time,
      ]);

      if (existingPanelistInterview) {
        return response.status(400).send({
          error: "Panelist already booked for this slot",
        });
      }

      // CHECK CANDIDATE CONFLICT

      const candidateConflictQuery = `
        SELECT * FROM interviews
        WHERE candidate_email = ?
        AND date = ?
        AND (
          start_time < ?
          AND end_time > ?
        )
      `;

      const existingCandidateInterview = await db.get(candidateConflictQuery, [
        candidate_email,
        date,
        end_time,
        start_time,
      ]);

      if (existingCandidateInterview) {
        return response.status(400).send({
          error: "Candidate already booked for this slot",
        });
      }

      // GENERATE MEETING LINK

      const meeting_link = `https://meet.google.com/${uuidv4()}`;

      // INSERT INTERVIEW

      const insertQuery = `
        INSERT INTO interviews
        (
          panelist_id,
          candidate_email,
          date,
          start_time,
          end_time,
          round,
          meeting_link,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.run(insertQuery, [
        panelist_id,
        candidate_email,
        date,
        start_time,
        end_time,
        round,
        meeting_link,
        "Scheduled",
      ]);

      response.status(201).send({
        message: "Interview scheduled successfully",
        meeting_link,
      });
    } catch (error) {
      response.status(500).send({
        error: error.message,
      });
    }
  });

  // GET UPCOMING INTERVIEWS

  router.get("/upcoming", async (request, response) => {
    try {
      const query = `
      SELECT * FROM interviews
      ORDER BY date ASC, start_time ASC
    `;

      const interviews = await db.all(query);

      response.send(interviews);
    } catch (error) {
      response.status(500).send({
        error: error.message,
      });
    }
  });

  // UPDATE INTERVIEW STATUS

  router.put("/:id/status", async (request, response) => {
    try {
      const { id } = request.params;

      const { status } = request.body;

      // VALID STATUSES

      const validStatuses = [
        "Scheduled",
        "Completed",
        "No Show",
        "Rescheduled",
        "Cancelled",
      ];

      if (!validStatuses.includes(status)) {
        return response.status(400).send({
          error: "Invalid status",
        });
      }

      // GET EXISTING INTERVIEW

      const existingInterviewQuery = `
      SELECT * FROM interviews
      WHERE id = ?
    `;

      const existingInterview = await db.get(existingInterviewQuery, [id]);

      if (!existingInterview) {
        return response.status(404).send({
          error: "Interview not found",
        });
      }

      const oldStatus = existingInterview.status;

      // UPDATE STATUS

      const updateQuery = `
      UPDATE interviews
      SET status = ?
      WHERE id = ?
    `;

      await db.run(updateQuery, [status, id]);

      // INSERT STATUS LOG

      const logQuery = `
      INSERT INTO interview_status_logs
      (
        interview_id,
        old_status,
        new_status,
        changed_at
      )
      VALUES (?, ?, ?, ?)
    `;

      await db.run(logQuery, [id, oldStatus, status, new Date().toISOString()]);

      response.send({
        message: "Interview status updated successfully",
      });
    } catch (error) {
      response.status(500).send({
        error: error.message,
      });
    }
  });

  return router;
};

module.exports = interviewRoutes;
