const express = require("express");

const candidateRoutes = (db) => {
  const router = express.Router();

  // CREATE CANDIDATE AVAILABILITY

  router.post("/availability", async (request, response) => {
    try {
      const {
        candidate_name,
        candidate_email,
        date,
        start_time,
        end_time,
      } = request.body;

      const query = `
        INSERT INTO candidate_availability
        (
          candidate_name,
          candidate_email,
          date,
          start_time,
          end_time
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      await db.run(query, [
        candidate_name,
        candidate_email,
        date,
        start_time,
        end_time,
      ]);

      response.status(201).send({
        message: "Candidate availability added successfully",
      });
    } catch (error) {
      response.status(500).send({
        error: error.message,
      });
    }
  });

  // GET ALL CANDIDATE AVAILABILITY

  router.get("/availability", async (request, response) => {
    try {
      const query = `
        SELECT * FROM candidate_availability
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

module.exports = candidateRoutes;