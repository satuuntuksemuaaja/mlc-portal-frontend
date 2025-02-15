import { EventEmitter, Injectable } from '@angular/core';

export interface Popup {
  title: string;
  confirm: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popupUpdated = new EventEmitter();
  popup: Popup;

  constructor() {}

  setPopup(popUp: Popup) {
    this.popup = popUp;
    this.popupUpdated.emit(this.popup);
  }

  getPopup() {
    return this.popup;
  }
}
