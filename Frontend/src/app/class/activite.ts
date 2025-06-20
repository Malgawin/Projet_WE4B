export class Activite {
  id: number;
  title: string;
  publish_date: string;
  ue_name: string;
  author_name: string;
  author_familyname: string;

  constructor(id: number, title: string, publish_date: string, ue_name: string, author_name: string, author_familyname: string) {
    this.id = id;
    this.title = title;
    this.publish_date = publish_date;
    this.ue_name = ue_name;
    this.author_name = author_name;
    this.author_familyname = author_familyname;
  }
}