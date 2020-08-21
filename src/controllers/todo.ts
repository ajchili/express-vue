import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

export interface Item {
  createdAt: string;
  title: string;
  updatedAt: string;
}

export default class Controller {
  private readonly filepath: string = path.join(__dirname, 'todo.json');
  private hasValidatedFileExists: boolean = false;
  private createFileIfNoneExists(): void {
    if (!this.hasValidatedFileExists && !fs.existsSync(this.filepath)) {
      fs.writeFileSync(this.filepath, '{}', { encoding: 'utf-8' });
      this.hasValidatedFileExists = true;
    }
  }
  private writeItemToFile(id: string, item: Item): void {
    const items = this.getItems();
    items[id] = item;
    fs.writeFileSync(this.filepath, JSON.stringify(items), {
      encoding: 'utf-8',
    });
  }
  createItem(title: string): { id: string; newItem: Item } {
    this.createFileIfNoneExists();
    const id: string = uuid();
    const newItem = {
      createdAt: new Date().toISOString(),
      title,
      updatedAt: new Date().toISOString(),
    };
    this.writeItemToFile(id, newItem);
    return { id, newItem };
  }
  deleteItem(id: string): void {
    const items = this.getItems();
    if (items[id] === undefined) {
      throw new Error('Unable to delete item, invalid id provided!');
    }
    delete items.id;
    fs.writeFileSync(this.filepath, JSON.stringify(items), {
      encoding: 'utf-8',
    });
  }
  getItems(): Record<string, Item> {
    this.createFileIfNoneExists();
    const itemsAsString = fs.readFileSync(this.filepath, { encoding: 'utf-8' });
    const items = JSON.parse(itemsAsString);
    return items;
  }
  updateItem(id: string, title: string): Item {
    const items = this.getItems();
    const updates = {
      title,
      updatedAt: new Date().toISOString(),
    };
    if (items[id] === undefined) {
      throw new Error('Unable to update item, invalid id provided!');
    }
    Object.assign(items[id], updates);
    this.writeItemToFile(id, items[id]);
    return items[id];
  }
}
