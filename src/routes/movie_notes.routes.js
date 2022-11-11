const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.use(ensureAuthentication);

movieNotesRoutes.post("/:", movieNotesController.create)
movieNotesRoutes.get("/:id", movieNotesController.show)
movieNotesRoutes.get("/", movieNotesController.index)
movieNotesRoutes.delete("/:id", movieNotesController.delete)

module.exports = movieNotesRoutes;