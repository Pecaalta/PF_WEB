import { filtro } from './filtro';

export interface difusion {
    id_User: number,
    text?:string,
    id_Noticia?:string,
    id_img?:string,
    data_create:string,
    filtro: filtro[]
}