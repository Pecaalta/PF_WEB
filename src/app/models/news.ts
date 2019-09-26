export interface news {
    id?: number,
    id_User: number,
    title:string,
    description?:string,
    html:string,
    Base64?:string,
    url_img?:string,
    id_img?:string,
    created_at?:Date,
    active?:boolean
}