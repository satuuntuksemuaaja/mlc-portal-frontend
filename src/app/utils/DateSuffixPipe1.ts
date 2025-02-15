import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateSuffix1' })
export class DateSuffixPipe1 implements PipeTransform {

   transform(date: string): string {

       let suffix = 'th';
       const today = new Date(date).toLocaleString('en-us', {weekday:'long'});
       const day: string = date.substring(8, 10);
       const monthYear: string = new Date(date).toLocaleString('en-us',{month:'short', year:'numeric'});


     if (day === '01' || day === '21' || day === '31') {
       suffix = 'st';
     }
     if (day === '02' || day === '22') {
       suffix = 'nd';
     }
     if (day === '03' || day === '23') {
       suffix = 'rd';
     }
       const fullDate: string =today +' - '+ ((day[0]==="0") ? day[1] : day) + suffix + ' ' + monthYear.substring(0, 3) + ' - ' + monthYear.substring(4, 8);
       return fullDate;
   } // transform ()
}
