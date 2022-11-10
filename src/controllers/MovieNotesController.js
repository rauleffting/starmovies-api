const knex = require("../database/knex")

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;
    
    const note_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const movieNote = await knex("movie_notes").where({ id }).first();
    // const tags = await knex("tags").where({user_id: id}).orderBy("name");

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
    const { title, user_id, tags } = request.query;

    let movie_notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

    movie_notes = await knex("tags")
    .select([
      "movie_notes.id",
      "movie_notes.title",
      "movie_notes.user_id"
    ])
    .where("movie_notes.user_id", user_id)
    .whereLike("movie_notes.title", `%${title}%`)
    .whereIn("name", filterTags)
    .innerJoin("movie_notes", "movie_notes.id", "tags.note_id")
    .orderBy("movie_notes.title")
  } else {
    movie_notes = await knex("movie_notes")
    .where({ user_id })
    .whereLike("title", `%${title}%`) // para encontrar pelo título ou trechos deste
    .orderBy("title");
  }

  const userTags = await knex("tags").where({ user_id });
  const notesWithTags = movie_notes.map(note => {
    const noteTags = userTags.filter(tag => tag.note_id === note.id);

    return {
      ...note,
      tags: noteTags
    }
  })

  return response.json(notesWithTags);
  } 
}

module.exports = MovieNotesController;