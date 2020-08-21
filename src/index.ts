import express, { Response, Request } from 'express';

const app = express();

app.get('*', (_: Request, res: Response) => {
  res.status(200).send('Hello, World!');
});

app.listen(8080);
