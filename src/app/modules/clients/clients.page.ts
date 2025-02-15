/* eslint-disable guard-for-in */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, MenuController, ModalController } from '@ionic/angular';
import { FormDataType, InputType } from 'src/app/components/form-inputs/FormDataType';
import { Client } from 'src/app/interfaces/clients.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ClientsProps, ClientsRepository } from 'src/app/stores/clients.repository';
import { Organisation, OrgRepository } from 'src/app/stores/org.repository';
import { AddClientPage } from './add-client/add-client.page';

@Component({
  selector: 'mlc-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss']
  // animations: [fadeInAnimation],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property, @typescript-eslint/naming-convention
  // host: { '[@fadeInAnimation]': '' }
})
export class ClientsPage implements OnInit, AfterViewInit {
  @ViewChild('content') content: IonContent;
  public filteredClients: ClientsProps = null;
  public selectedClient: Client = null;
  public clientList: ClientsProps = null;
  public viewMode: 'files' | 'messages' | 'consent' | 'profile' = 'files';

  public profileTabFormOptions: FormDataType[] = [
    {
      name: 'Name',
      fieldName: 'name',
      type: InputType.text,
      order: 1,
      readOnly: false
    },
    {
      name: 'Email',
      fieldName: 'email',
      type: InputType.text,
      order: 1,
      readOnly: true,
      value: null
    },
    {
      name: 'Created',
      fieldName: 'created',
      type: InputType.text,
      order: 1,
      readOnly: true,
      value: null
    },
    {
      name: 'Client Ref',
      fieldName: 'clientref',
      type: InputType.text,
      order: 1,
      readOnly: false
    },
    {
      name: 'Notes',
      fieldName: 'notes',
      type: InputType.text,
      order: 1,
      readOnly: false
    }
  ];

  public isArchive = false;
  public loading = false;
  public isFirstCall = true;
  organization: Organisation;

  prevViewMode: string;
  private selectedClientId = null;

  constructor(
    private menu: MenuController,
    private clientsRepo: ClientsRepository,
    private clientsService: ClientsService,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    public messageService: MessagesService,
    private orgRepo: OrgRepository
  ) {
    this.menu.enable(true, 'clients');
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        if (queryParams?.section) {
          this.viewMode = queryParams.section;
        } else {
          this.viewMode = 'files';
        }
        if (queryParams?.clientId) {
          this.selectedClientId = queryParams.clientId;
        }
      }
    });

    this.orgRepo.org$.subscribe({
      next: (org) => {
        this.organization = { ...org };
      }
    });

    // setTimeout(() => {
    //   if (this.viewMode === 'messages') {
    //     this.content.scrollToBottom();
    //   }
    // }, 1500);

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
        this.initFormValues(this.selectedClient);
      } else {
        this.selectedClient = this.clientList.active[0];
        this.initFormValues(this.selectedClient);
      }

      if (this.selectedClientId) {
        this.setClientFromActivity();
      }

      if (this.isFirstCall && this.viewMode === 'messages' && this.selectedClient?.id) {
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

  async addClient() {
    const modal = await this.modalCtrl.create({
      component: AddClientPage,
      backdropDismiss: true,
      cssClass: 'add-client-modal',
      showBackdrop: true
    });
    await modal.present();
  }

  onSelectClient(_event) {
    console.log('call onSelectClient');

    if (_event?.id) {
      this.selectedClient = _event;
      this.initFormValues(_event);

      if (this.viewMode === 'messages') {
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
  }

  changeView(ev) {
    this.prevViewMode = this.viewMode;
    this.viewMode = ev;
    if (this.viewMode === 'messages') {
      this.messageService.errorData = {
        status: false,
        message: null
      };
      this.messageService.showLoading = true;
      this.messageService.createdMessageStore = null;
      this.messageService.selectedClientId = this.selectedClient.id;
      this.messageService.getClientStore(this.selectedClient.id);
      this.messageService.getClientMessageData(this.selectedClient.id);
      // this.messageService.loadMessages();
    }
  }

  setArchive(archive) {
    this.isArchive = archive;
    this.refresh();
  }

  getDate(dateStr: string) {
    return new Date(dateStr);
  }

  updateClient(event) {
    this.selectedClient = event;
    const activeIndex = this.clientList.active?.findIndex((c) => c.id === this.selectedClient.id);
    const archivedIndex = this.clientList.archived?.findIndex(
      (c) => c.id === this.selectedClient.id
    );
    const cancelledIndex = this.clientList.cancelled?.findIndex(
      (c) => c.id === this.selectedClient.id
    );
    const pendingIndex = this.clientList.pending?.findIndex((c) => c.id === this.selectedClient.id);
    if (activeIndex > -1) {
      this.clientList.active[activeIndex] = event;
    }
    if (archivedIndex > -1) {
      this.clientList.archived[archivedIndex] = event;
    }
    if (cancelledIndex > -1) {
      this.clientList.cancelled[cancelledIndex] = event;
    }
    if (pendingIndex > -1) {
      this.clientList.pending[pendingIndex] = event;
    }
    this.clientsRepo.setClients({
      active: this.clientList?.active,
      archived: this.clientList?.archived,
      cancelled: this.clientList?.cancelled,
      pending: this.clientList?.pending
    });
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

  initFormValues(client: Client) {
    this.profileTabFormOptions = [
      {
        name: 'Name',
        fieldName: 'name',
        type: InputType.text,
        order: 1,
        readOnly: false,
        value: client?.name
      },
      {
        name: 'Email',
        fieldName: 'email',
        type: InputType.text,
        order: 1,
        readOnly: true,
        value: client?.email
      },
      {
        name: 'Created',
        fieldName: 'created',
        type: InputType.text,
        order: 1,
        readOnly: true,
        value: client?.created
      },
      {
        name: 'Client Ref',
        fieldName: 'clientref',
        type: InputType.text,
        order: 1,
        value: client?.ref,
        readOnly: false
      },
      {
        name: 'Notes',
        fieldName: 'notes',
        type: InputType.text,
        order: 1,
        value: client?.notes,
        readOnly: false
      }
    ];
  }

  private setClientFromActivity() {
    for (const key in this.clientList) {
      if (Object.prototype.hasOwnProperty.call(this.clientList, key)) {
        const element = this.clientList[key];
        const data = element?.find((d) => d.id === this.selectedClientId);
        if (data?.id) {
          this.selectedClient = data;
          this.onSelectClient(data);
          this.selectedClientId = null;
          break;
        }
      }
    }
  }
}
