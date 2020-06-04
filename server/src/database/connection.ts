import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
})

// o connection tem que passar o file name --> que é ? --> onde e qual vai ser o arquivo ?

// quando vamos trabalhar com rotas sempre usamos a ferramenta do node chamada // * path
//  todo: path.resolve --> o resolve, ele uni os campos

// resolve --> // * uni os campos
// ? primeiro parâmetro: 
// * usamos uma classe global, ela pega o local do diretório de acordo com o sistema operacional   

// ? segundo parâmetro: 
// * nome do arquivo que vamos editar; 




export default connection;

