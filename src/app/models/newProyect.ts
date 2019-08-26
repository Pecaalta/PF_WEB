export interface newProyect {
    id?: number,
    name?: string,
    rut?:string,
    description?:string,
    debts?:string,
    personal?:number,
    x?:number,
    y?:number,
    ods?:boolean[],
    sector:{id:number,status:boolean,img:string, name:string}[],
    active?:boolean,
}