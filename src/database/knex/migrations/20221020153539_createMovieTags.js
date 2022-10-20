exports.up = knex => knex.schema.createTable("movie_tags", table => {
  table.increments("id");
  table.text("name").notNullable();
  // a nota vai ter um id que faz referência ao id de um usuário da tabela users
  table.integer("user_id").references("id").inTable("users");
  table.integer("note_id").references("id").inTable("movie_notes");
})

exports.down = knex => knex.schema.dropTable("movie_notes");