import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rename'
})
export class RenamePipe implements PipeTransform {
  date(value){
    if (value == null) return '---';
    var options = {  month: 'long', day: 'numeric' };
    let d = new Date(value);
    return d.toLocaleDateString("es-UY", options);
  }
  boolean(value){
    if (value == null) return '---';
    return value == 1 ? 'Si' : 'No';
  }

  text(value){
    if (value == null) return '---';
    return value;
  }
  estado(value){
    if (value == 0) return 'Pendinte';
    else if (value == 1) return 'Aprvado';
    else return 'Rechasado';
  }

  transform(value: any, type:string): any {
    switch(value) {
      case 'title':
        return type != null ? this.text(type) : 'Titulo';
      case 'rut':
        return type != null ? this.text(type) : 'RUT';
      case 'id_user':
        return type != null ? this.text(type) : 'Id de usuario creador';
      case 'description':
        return type != null ? this.text(type) : 'Descripcion';
      case 'debts':
        return type != null ? this.text(type) : 'Deudas';
      case 'personal':
        return type != null ? this.text(type) : 'Tamaño de personal';
      case 'x':
        return type != null ? this.text(type) : 'Longitud';
      case 'y':
        return type != null ? this.text(type) : 'Latitud';
      case 'bps':
        return type != null ? this.text(type) : 'BPS';
      case 'addres':
        return type != null ? this.text(type) : 'Direccion';
      case 'phone':
        return type != null ? this.text(type) : 'Telefono';
      case 'email':
        return type != null ? this.text(type) : 'Email';
      case 'dateStart':
        return type != null ? this.date(type) : 'Fecha de cominzo';
      case 'active':
        return type != null ? this.boolean(type) : 'Activo';
      case 'apoyoOtro':
        return type != null ? this.boolean(type) : 'Apoyado por otra intitucion';
      case 'apoyoANR':
        return type != null ? this.boolean(type) : 'Apoyado por ANR';
      case 'apoyoANII':
        return type != null ? this.boolean(type) : 'Apoyado por ANII';
      case 'apoyoGoviernoDepartamental':
        return type != null ? this.boolean(type) : 'Apoyado por el govierno';
      case 'status':
        return type != null ? this.estado(type) : 'Estado';
      case 'date':
        return type != null ? this.date(type) : 'Fecha';
      case 'created_at':
        return type != null ? this.date(type) : 'Fecha de creado';
      case 'updated_at':
        return type != null ? this.date(type) : 'Fecha de actualizado';
      case 'bar':
        return type != null ? this.text(type) : 'Grafica de barra';
      case 'doughnut':
        return type != null ? this.text(type) : 'Grafica de circular';
      case 'polarArea':
        return type != null ? this.text(type) : 'Grafica de area circular';
      case 'id':
        return type != null ? this.text(type) : 'Id';
      default:
          return value;
    }
  }

}
