import express, { Response, Request } from 'express';

const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (_: Request, res: Response) => {
  res.render('index.ejs', {
    message: 'I was rendered by express & ejs!',
  });
});

app.listen(8080);
