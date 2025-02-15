import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/interfaces/clients.interface';

type ClientViewType = 'files' | 'messages' | 'consent' | 'profile';

@Component({
  selector: 'mlc-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {
  @Output() viewChange: EventEmitter<ClientViewType> = new EventEmitter();
  @Input() viewMode: ClientViewType = 'consent';
  @Input() client: Client = null;
  @Input() displayTabs = true;
  constructor() {}

  ngOnInit() {}

  changeView(view: ClientViewType) {
    this.viewMode = view;
    this.viewChange.emit(view);
  }
}
