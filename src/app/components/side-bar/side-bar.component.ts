import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Client, ClientStatus } from 'src/app/interfaces/clients.interface';
import { Agent } from 'src/app/stores/agent.repository';
import { ClientsProps } from 'src/app/stores/clients.repository';

@Component({
  selector: 'mlc-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {
  @Input() title: string = null;
  @Input() list = [];
  @Input() clientList: ClientsProps = null;
  @Input() type: 'myclients' | 'messages' | 'myagents' | 'agent-clients' = null;
  @Input() showSearch = true;
  @Input() selectedClient: Client = null;
  @Input() selectedAgent: Agent = null;
  @Input() isArchive = false;
  @Input() showLoading = false;
  @Input() allowAdd = true;

  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  @Output() archiveChange: EventEmitter<any> = new EventEmitter();
  @Output() setIsArchive: EventEmitter<boolean> = new EventEmitter();
  @Output() searchTextChange: EventEmitter<Event> = new EventEmitter();
  @Output() clearSearch: EventEmitter<boolean> = new EventEmitter();

  buttonColor: string;
  selectedId: any;
  clientResults: any;
  myClientList: ClientsProps = null;
  query: any;

  constructor() {}

  ngOnInit() {
    if (this.type === 'myagents') {
      this.clientResults = this.list?.filter((data) => data.status === 'active');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.myClientList = {...this.clientList};
    this.clientResults = this.list;
    if (changes?.selectedAgent) {
      this.selectedId = this.selectedAgent.id;
    }
    if (changes?.selectedClient) {
      this.selectedId = this.selectedClient?.id;
    }
  }

  getStatus(status: ClientStatus) {
    if (status === 'pending') {
      return 'Pending';
    } else if (status === 'archived') {
      return 'Archived';
    } else {
      return 'Cancelled';
    }
  }

  setActive() {
    this.buttonColor = '#345465';
  }

  // selectItem(item) {
  //   this.selectedId = item;
  // }

  handleChange(event) {
    this.query = event.target.value.toString().toLowerCase();
    if (this.type === 'agent-clients') {
      let name;
      this.clientResults = this.list.filter((d) => {
        name = d.name.toString().toLowerCase();
        if (name.includes(this.query)) {
          return d;
        }
      });
    }
    else if(this.type === 'myclients') {
      this.myClientList = {...this.clientList};
      let name;
      if (this.isArchive) {
        this.myClientList.archived = this.clientList.archived.filter((d) => {
          name = d.name.toString().toLowerCase();
          if (name.includes(this.query)) {
            return d;
          }
        });
        this.myClientList.cancelled = this.clientList.cancelled.filter((d) => {
          name = d.name.toString().toLowerCase();
          if (name.includes(this.query)) {
            return d;
          }
        });
      }
      this.myClientList.active = this.clientList.active.filter((d) => {
        name = d.name.toString().toLowerCase();
        if (name.includes(this.query)) {
          return d;
        }
      });
      this.myClientList.pending = this.clientList.pending.filter((d) => {
        name = d.name.toString().toLowerCase();
        if (name.includes(this.query)) {
          return d;
        }
      });
    }
     else {
      let name;
      this.clientResults = this.list.filter((d) => {
        name = d.name.toString().toLowerCase();
        if (this.isArchive) {
          if (name.includes(this.query)) {
            return d;
          }
        } else {
          if (name.includes(this.query) && d.status === 'active') {
            return d;
          }
        }
      });
    }
  }

  archiveToggleChange() {
    this.archiveChange.emit(this.isArchive);
  }

  filter() {}
}
