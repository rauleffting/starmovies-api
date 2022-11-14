exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title");
  table.integer("rating");
  table.text("comments")
  // a nota vai ter um id que faz referência ao id de um usuário da tabela users
  table.integer("user_id").references("id").inTable("users");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("notes");
