export interface msg {
    id_User: number,
    text?:string,
    id_img?:string,
    data_create:Date,

    //Datos de noticias
    id_noticia?:string,
    img_noticia?:string,
    text_noticia?:string,
    title_noticia?:string,
}