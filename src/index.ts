import bodyparser from 'body-parser';
import express, { Response, Request } from 'express';
import { createItem, deleteItem, getItems, updateItem } from './todos';

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (_: Request, res: Response) => {
  res.render('index.ejs', {
    message: 'I was rendered by express & ejs!',
  });
});

app.delete('/todo/:id', deleteItem);
app.get('/todo', getItems);
app.post('/todo', createItem);
app.put('/todo/:id', updateItem);

app.listen(8080);
