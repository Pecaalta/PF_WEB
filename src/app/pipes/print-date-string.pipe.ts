import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printDateString'
})
export class PrintDateStringPipe implements PipeTransform {

  transform(date: Date): any {
    if (date == null) return 'Error';
    var options = {  month: 'long', day: 'numeric' };
    let d = new Date(date);
    return d.toLocaleDateString("es-UY", options);
  }

}
