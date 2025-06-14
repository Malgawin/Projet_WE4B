export class ActivityLog {
  constructor(
    public type: string,
    public date: string,
    public postId?: string,
    public forumId?: string,
    public messageId?: string,
    public devoirId?: string
  ) {}
}

export class CourseLog {
  constructor(
    public courseId: number,
    public lastViewed?: string,
    public viewsCount?: number,
    public progressCount?: number,
    public forumMsgCount?: number,
    public activity?: ActivityLog[]
  ) {}
}

export class UserLog {
  constructor(
    public userId: number,
    public _id?: string,
    public lastLogin?: string,
    public lastLogout?: string,
    public loginCount?: number,
    public courses?: CourseLog[]
  ) {}
}
