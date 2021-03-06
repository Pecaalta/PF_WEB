export interface newProyect {
    id?: number,
    title?: string,
    rut?:string,
    bps:string,
    dateStart: Date,
    description?:string,
    debts?:string,
    personal?:string,
    x?:number,
    y?:number,
    addres?:string,
    email?:string,
    phone?:string,
    apoyoGoviernoDepartamental:boolean,
    apoyoANII:boolean,
    apoyoANR:boolean,
    apoyoOtro:boolean,
    role: any[]

    web?:string,
    facebook?:string,
    instagram?:string,
    twitter?:string,
    branchactivity?:string,
    
    startactivitytime:string,
    endactivitytime:string,


    status?:number,
    ods?:boolean[],
    sector:{id:number,status:boolean,img:string, name:string}[],
    active?:boolean,
}