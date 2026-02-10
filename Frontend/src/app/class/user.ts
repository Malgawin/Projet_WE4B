export class User {
  id: number;
  name: string;
  familyName: string;
  mail: string;

  constructor(id: number, name: string, familyName: string, mail: string) {
    this.id = id;
    this.name = name;
    this.familyName = familyName;
    this.mail = mail;
  }

  static getNameById(users: User[], id: number): string {
    return users.find(user => user.id === id)?.name || '';
  } 

}