export class Message {
  _id: string;
  content: string;
  createdAt: string;
  authorId: number;

  constructor(_id: string, content: string, createdAt: string, authorId: number) {
    this._id = _id;
    this.content = content;
    this.createdAt = createdAt;
    this.authorId = authorId;
  }
}

export class Forum {
  _id: string;
  coursId: number;
  title: string;
  createdAt: string;
  authorId: number;
  messages: Message[];

  constructor(
    _id: string,
    coursId: number,
    title: string,
    createdAt: string,
    authorId: number,
    messages: Message[]
  ) {
    this._id = _id;
    this.coursId = coursId;
    this.title = title;
    this.createdAt = createdAt;
    this.authorId = authorId;
    this.messages = messages;
  }
}