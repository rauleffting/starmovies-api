const knex = require("../database/knex")

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.params;
    
    const note_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const movieNote = await knex("movie_notes").where({ id }).first();
    // const tags = await knex("movie_tags").where({user_id: id}).orderBy("name");

    return response.json({
      ...movieNote,
    //  tags
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movie_notes").where({ id }).delete();
  
    return response.json();
  }

  async index(request, response) {

  }
}

module.exports = MovieNotesController;