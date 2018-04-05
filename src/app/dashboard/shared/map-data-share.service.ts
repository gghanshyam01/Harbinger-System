import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MapDataShareService {

  item = new Subject<string>();

  constructor() { }

  itemSelected(newItem: string) {
    this.item.next(newItem);
  }

}
