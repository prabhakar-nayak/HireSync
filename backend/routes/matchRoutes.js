const express = require("express");

const matchRoutes = (db) => {
  const router = express.Router();

  // GET MATCHING SLOTS

  router.get("/", async (request, response) => {
    try {
      // GET PANELIST DATA

      const panelistsQuery = `
        SELECT * FROM panelist_availability
      `;

      const panelists = await db.all(panelistsQuery);

      // GET CANDIDATE DATA

      const candidatesQuery = `
        SELECT * FROM candidate_availability
      `;

      const candidates = await db.all(candidatesQuery);

      const matches = [];

      // MATCHING LOGIC

      panelists.forEach((panelist) => {
        candidates.forEach((candidate) => {
          const isSameDate = panelist.date === candidate.date;

          const isTimeMatching =
            candidate.start_time >= panelist.start_time &&
            candidate.end_time <= panelist.end_time;

          if (isSameDate && isTimeMatching) {
            matches.push({
              panelist_id: panelist.panelist_id,
              candidate_name: candidate.candidate_name,
              candidate_email: candidate.candidate_email,
              date: panelist.date,
              start_time: candidate.start_time,
              end_time: candidate.end_time,
              interview_type: panelist.interview_type,
            });
          }
        });
      });

      response.send(matches);
    } catch (error) {
      response.status(500).send({
        error: error.message,
      });
    }
  });

  return router;
};

module.exports = matchRoutes;