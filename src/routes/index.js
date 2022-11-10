const { Router } = require("express");

const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movie_notes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/movie_notes", movieNotesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;