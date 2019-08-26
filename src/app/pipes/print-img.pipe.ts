import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printImg'
})
export class PrintImgPipe implements PipeTransform {

  transform(url: any): any {
    if (url == null) return null;
    else return url;
  }

}
