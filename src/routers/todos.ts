import { Request, Response } from 'express';
import { TODOController } from '../controllers/todo';

export class TODORouter {
  private todoController: TODOController;
  constructor(todoController: TODOController) {
    this.todoController = todoController;
  }
  createItem = (req: Request, res: Response) => {
    const { title = '' } = req.body;
    if (title.length === 0 || typeof title !== 'string') {
      res
        .status(400)
        .send(
          'Invalid title provided! It must be a string with at least one character!'
        );
      return;
    }
    const newItem = this.todoController.createItem(title);
    res.status(200).json(newItem);
  };
  deleteItem = (req: Request, res: Response) => {
    const { id = '' } = req.params;
    if (id.length === 0 || typeof id !== 'string') {
      res.status(400).send('Unable to delete item, no id provided!');
      return;
    }
    try {
      this.todoController.deleteItem(id);
      res.status(200).send();
    } catch {
      res.status(404).send();
    }
  };
  getItems = (_: Request, res: Response) => {
    res.status(200).json(this.todoController.getItems());
  };
  updateItem = (req: Request, res: Response) => {
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
    const updatedItem = this.todoController.updateItem(id, title);
    res.status(200).json(updatedItem);
  };
}
