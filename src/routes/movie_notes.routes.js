const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/:user_id", movieNotesController.create)
movieNotesRoutes.get("/:id", movieNotesController.show)
movieNotesRoutes.get("/:user_id", movieNotesController.index)
movieNotesRoutes.delete("/:id", movieNotesController.delete)

module.exports = movieNotesRoutes;