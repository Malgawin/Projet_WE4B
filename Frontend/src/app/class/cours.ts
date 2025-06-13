export class Cours {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  inscrits: Inscrit[];
  isPinned: boolean;
  nbPostsTotal?: number = -1 ;

  constructor(id: number, code: string, name: string, description: string, image: string, inscrits: Inscrit[] = [], ispinned: boolean = false) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.image = image;
    this.inscrits = inscrits;
    this.isPinned = ispinned;
  }
}

export interface Inscrit {
  id: number;
  name: string;
  familyName: string;
  mail: string;
  role : string;
}

export class Post{
    constructor(
        public post_id : number,
        public author_id : number,
        public title : string,
        public type : string,
        public message : string,
        public date : string,
        public file : string | null = null,
        public sort_order : number | null = null,
        public id_course : number
    ) {
        this.post_id = post_id;
        this.author_id = author_id;
        this.title = title;
        this.type = type;
        this.message = message;
        this.date = date;
        this.type = type;
        this.file = file;
        this.sort_order = sort_order;
        this.id_course = id_course;
    }
}