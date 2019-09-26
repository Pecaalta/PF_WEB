export interface role {
    id?: number,
    name?: string,
    key_add?:string,
    start?:Date,
    end?:Date,

    edit_info:boolean,
    delete_company:boolean,
    remove_user:boolean,
    edit_role:boolean,
    see_role:boolean,
    add_user:boolean,

    active?:boolean,
}
