const knex = require("../database/knex")

class MovieTagsController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id, note_id } = request.params;
    
    const tag_id = await knex("movie_tags").insert({
      title,
      user_id,
      note_id
    });

    response.json();
  }
}

module.exports = MovieTagsController;