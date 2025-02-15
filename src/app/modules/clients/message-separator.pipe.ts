import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'messageSeparator' })
export class MessageSeparatorPipe implements PipeTransform {
  transform(data: any[], key: string): string {
    if (data?.length > 0) {
      const rep = data.find((d) => d.k === key);
      if (rep?.v) {
        return rep.v;
      }
    }
    return null;
  }
}
