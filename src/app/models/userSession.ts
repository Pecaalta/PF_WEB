export interface userSession {
    id?: number,
    name?: string,
    email?:string,
    img?:string,
    url_img?:string,
    role_name?:string,
    admin?:string,
    active?:boolean,
    remember_token?:string,
}