const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthentication);

notesRoutes.post("/", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.get("/", notesController.index)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes;