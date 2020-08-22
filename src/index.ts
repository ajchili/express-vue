import bodyparser from 'body-parser';
import express, { Response, Request } from 'express';
import { TODORouter } from './routers/todos';
import { TODOController } from './controllers/todo';

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

const todoController = new TODOController();

app.get('/', (_: Request, res: Response) => {
  const items = todoController.getItems();
  res.render('index.ejs', { items });
});

const todoRouter = new TODORouter(todoController);

app.delete('/todo/:id', todoRouter.deleteItem);
app.get('/todo', todoRouter.getItems);
app.post('/todo', todoRouter.createItem);
app.put('/todo/:id', todoRouter.updateItem);

app.listen(8080);
