export interface userSession {
    id?: number,
    name?: string,
    email?:string,
    img?:string,
    admin?:boolean,
    active?:boolean,
    remember_token?:string,
}