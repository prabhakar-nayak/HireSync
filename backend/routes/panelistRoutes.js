const express = require("express");

const panelistRoutes = (db) => {
  const router = express.Router(); //creates a new router object to define routes related to panelists

  // CREATE PANELIST AVAILABILITY
  router.post("/availability", async (request, response) => {
    try {
      const {
        panelist_id,
        date,
        start_time,
        end_time,
        interview_type,
        max_interviews,
      } = request.body;

      const query = `
        INSERT INTO panelist_availability
        (
          panelist_id,
          date,
          start_time,
          end_time,
          interview_type,
          max_interviews
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      await db.run(query, [
        panelist_id,
        date,
        start_time,
        end_time,
        interview_type,
        max_interviews,
      ]);

      response.status(201).send({
        message: "Panelist availability added successfully",
      });
    } catch (error) {
      response.status(500).send({
        error: error.message,
      });
    }
  });

  router.get("/availability", async (request, response) => {
    try {
      const query = `
        SELECT * FROM panelist_availability
        ORDER BY id DESC
        `;
      const data = await db.all(query);
      response.send(data);
    } catch (error) {
      response.status(500).send({
        error: error.message,
      });
    }
  });
  
  return router;
};

module.exports = panelistRoutes;
