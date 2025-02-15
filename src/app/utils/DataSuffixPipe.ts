import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateSuffix' })
export class DateSuffixPipe implements PipeTransform {
  transform(date: string): string {
    let suffix = 'th';
    const day: string = date.substring(0, 2);
    const monthYear: string = date.substring(2, 15);

    if (day === '01' || day === '21' || day === '31') {
      suffix = 'st';
    }
    if (day === '02' || day === '22') {
      suffix = 'nd';
    }
    if (day === '03' || day === '23') {
      suffix = 'rd';
    }
    const fullDate: string = ((day[0]==="0") ? day[1] : day) + suffix + ' ' + monthYear;
    return fullDate;
  } // transform ()
}
