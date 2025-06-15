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
        public id : number,
        public title : string,
        public type : string,
        public message : string,
        public publish_date : string,
        public author_id : number | null = null,
        public files : string | null = null,
        public sort_order : number | null = null,
    ) {
        this.id = id;
        this.author_id = author_id;
        this.title = title;
        this.type = type;
        this.message = message;
        this.publish_date = publish_date;
        this.type = type;
        this.files = files;
        this.sort_order = sort_order;
    }
}