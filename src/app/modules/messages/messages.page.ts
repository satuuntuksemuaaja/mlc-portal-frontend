import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
import { Client } from 'src/app/interfaces/clients.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ClientsProps, ClientsRepository } from 'src/app/stores/clients.repository';
import { Organisation, OrgRepository } from 'src/app/stores/org.repository';

@Component({
  selector: 'mlc-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
  // animations: [fadeInAnimation],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property, @typescript-eslint/naming-convention
  // host: { '[@fadeInAnimation]': '' }
})
export class MessagesPage implements OnInit, AfterViewInit {
  @ViewChild('content') content: IonContent;
  public filteredClients: ClientsProps = null;
  public selectedClient: Client = null;
  public clientList: ClientsProps = null;
  public isArchive = false;
  public loading = false;
  public isFirstCall = true;
  organization: Organisation;

  prevViewMode: string;

  constructor(
    private menu: MenuController,
    private clientsRepo: ClientsRepository,
    private clientsService: ClientsService,
    public messageService: MessagesService,
    private orgRepo: OrgRepository,
    private utilityService: UtilityService
  ) {
    this.menu.enable(true, 'mymessages');
  }

  ngOnInit() {
    this.orgRepo.org$.subscribe({
      next: (org) => {
        this.organization = { ...org };
      }
    });

    this.clientsRepo.clients$.subscribe((res) => {
      this.clientList = res;
      this.filteredClients = { ...this.clientList };

      if (this.selectedClient?.id) {
        let selectedClient = this.clientList.active?.find((c) => c.id === this.selectedClient.id);
        if (!selectedClient) {
          selectedClient = this.clientList.archived?.find((c) => c.id === this.selectedClient.id);
        }
        if (!selectedClient) {
          selectedClient = this.clientList.cancelled?.find((c) => c.id === this.selectedClient.id);
        }
        if (!selectedClient) {
          selectedClient = this.clientList.pending?.find((c) => c.id === this.selectedClient.id);
        }
        this.selectedClient = selectedClient ? selectedClient : this.clientList.active[0];
      } else {
        this.selectedClient = this.clientList.active[0];
      }

      if (this.isFirstCall && this.selectedClient?.id) {
        this.onSelectClient(this.selectedClient);
        this.isFirstCall = false;
      }
    });

    this.clientsRepo.loading$.subscribe({
      next: (loading) => {
        this.loading = loading;
      }
    });
    this.clientsService.loadActiveClients();
  }

  ngAfterViewInit(): void {}

  onSelectClient(_event) {
    console.log('call onSelectClient');

    if (_event?.id) {
      this.selectedClient = _event;
      this.messageService.errorData = {
        status: false,
        message: null
      };
      this.messageService.showLoading = true;
      this.messageService.createdMessageStore = null;
      this.messageService.selectedClientId = this.selectedClient.id;
      this.messageService.getClientStore(this.selectedClient.id);
      this.messageService.getClientMessageData(this.selectedClient.id);
    }
  }

  setArchive(archive) {
    this.isArchive = archive;
    this.refresh();
  }

  refresh() {
    if (this.isArchive) {
      this.clientsService.loadAllClients();
    } else {
      this.clientsService.loadActiveClients();
    }
  }

  filter(ev) {
    const searchTerm: string = ev.detail.value ? ev.detail.value.toLowerCase() : '';
    if (searchTerm && searchTerm !== '') {
      this.filteredClients.active = this.clientList?.active?.filter(
        (client) => client.name.toLowerCase().indexOf(searchTerm) > -1
      );
      this.filteredClients.pending = this.clientList?.pending?.filter(
        (client) => client.name.toLowerCase().indexOf(searchTerm) > -1
      );
      this.filteredClients.archived = this.clientList?.archived?.filter(
        (client) => client.name.toLowerCase().indexOf(searchTerm) > -1
      );
      this.filteredClients.cancelled = this.clientList?.cancelled?.filter(
        (client) => client.name.toLowerCase().indexOf(searchTerm) > -1
      );
    } else {
      this.filteredClients = { ...this.clientList };
    }
  }

  clearFilter() {
    this.filteredClients = { ...this.clientList };
  }
}
