import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemtitle' })
export class ItemTitlePipe implements PipeTransform {
  transform(title: string): string {
    switch (title) {
      case 'PPGenericItem':
        return 'Shared Item';
    }
    return title;
  }
}
