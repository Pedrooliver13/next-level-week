import express from 'express';
import path from 'path';
import cors from 'cors';

import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// passamos a rota primeiro , e onde ela ta localizada;
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
// __dirname --> diretorio atual(no caso estamos no arquivo server e temos que chegar ate o uploads);


app.listen(1313, ()=> console.log('server is running'));



// falta tipagem;
// npm install @types/express -D;

// mas o node não entende o typescript, para ele entender, instalaremos o 
// npx install ts-node -D


// agora para configurar o typescript;
// npx tsc --init




// app.get('/user', (req, res)=> {
//   return res.json([
//     'Pedro',
//     'Julio',
//     'Luís',
//     'César',
//     'Carlos César'
//   ]);
// });