export class Post{
    constructor(
        public post_id : number,
        public title : string,
        public message : string,
        public type : string,
        public date : string
    ) {
        this.post_id = post_id;
        this.title = title;
        this.message = message;
        this.type = type;
        this.date = date;
    }
}