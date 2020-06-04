import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname,'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true, 
};

// aqui passamos os arquibos para coseguirmos excutar os arquivos do knex file

// aqui o __dirname vai ser diferente, ele pega sua localização no diretório;
// então o knexfile vai estar na raiz ,  então temos que fazer ele chegar no database;

// passamos tbm o migrations.
// e executamos // * npx knex migrate:latest --knexfile knexfile.ts;