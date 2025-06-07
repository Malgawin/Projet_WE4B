export class Cours {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  inscrits: Inscrit[];

  constructor(id: number, code: string, name: string, description: string, image: string, inscrits: Inscrit[] = []) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.image = image;
    this.inscrits = inscrits;
  }
}

export interface Inscrit {
  id: number;
  name: string;
  familyName: string;
  mail: string;
  role : string;
}