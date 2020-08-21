import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const itemsPath = path.join(__dirname, 'todo.json');

const createItemsFileIfNoneExists = () => {
  if (!fs.existsSync(itemsPath)) {
    fs.writeFileSync(itemsPath, '{}', { encoding: 'utf-8' });
  }
};

export const createItem = (req: Request, res: Response) => {
  const { title = '' } = req.body;
  if (title.length === 0 || typeof title !== 'string') {
    res
      .status(400)
      .send(
        'Invalid title provided! It must be a string with at least one character!'
      );
    return;
  }
  const newItem = {
    createdAt: new Date().toISOString(),
    title,
    updatedAt: new Date().toISOString(),
  };
  createItemsFileIfNoneExists();
  const itemsAsString = fs.readFileSync(itemsPath, { encoding: 'utf-8' });
  const items = JSON.parse(itemsAsString);
  const id = uuid();
  items[id] = newItem;
  fs.writeFileSync(itemsPath, JSON.stringify(items), { encoding: 'utf-8' });
  res.status(200).json({ id, item: newItem });
};

export const deleteItem = (req: Request, res: Response) => {
  const { id = '' } = req.params;
  if (id.length === 0 || typeof id !== 'string') {
    res.status(400).send('Unable to delete item, no id provided!');
    return;
  }
  createItemsFileIfNoneExists();
  const itemsAsString = fs.readFileSync(itemsPath, { encoding: 'utf-8' });
  const items = JSON.parse(itemsAsString);
  delete items[id];
  fs.writeFileSync(itemsPath, JSON.stringify(items), { encoding: 'utf-8' });
  res.status(200).send();
};

export const getItems = (_: Request, res: Response) => {
  createItemsFileIfNoneExists();
  const itemsAsString = fs.readFileSync(itemsPath, { encoding: 'utf-8' });
  const items = JSON.parse(itemsAsString);
  res.status(200).json(items);
};

export const updateItem = (req: Request, res: Response) => {
  const { id = '' } = req.params;
  const { title = '' } = req.body;
  if (id.length === 0 || typeof id !== 'string') {
    res.status(400).send('Unable to delete item, no id provided!');
    return;
  } else if (title.length === 0 || typeof title !== 'string') {
    res
      .status(400)
      .send(
        'Invalid title provided! It must be a string with at least one character!'
      );
    return;
  }
  createItemsFileIfNoneExists();
  const itemsAsString = fs.readFileSync(itemsPath, { encoding: 'utf-8' });
  const items = JSON.parse(itemsAsString);
  Object.assign(items[id], { title, updatedAt: new Date().toISOString() });
  fs.writeFileSync(itemsPath, JSON.stringify(items), { encoding: 'utf-8' });
  res.status(200).json(items[id]);
};
