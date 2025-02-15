/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createState, getRegistry, getStore, withProps } from '@ngneat/elf';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ClientMessagesRepository,
  createMessageStore,
  MeecoMessagesItem,
  MeecoMessagesItemProps
} from '../stores/messages.repository';
import API_ENDPOINTS from './api-endpoints';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public clientMessageStoreProvider: {
    provide: typeof ClientMessagesRepository;
    useFactory(): ClientMessagesRepository;
  };
  public store: ClientMessagesRepository;
  messageSubscription: any;
  tempMessageData: MeecoMessagesItemProps = {
    id: null,
    meccoItems: {
      next_page_after: null,
      items: []
    }
  };
  showLoading = false;
  createdMessageStore: any;
  messageDetails$ = new BehaviorSubject({ next_page_after: null, items: [] } as MeecoMessagesItem);
  selectedClientId: string;
  errorData: {
    status: boolean;
    message: string;
  };
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private utilityService: UtilityService) {}

  getMessagesByClientId({ clientId }: { clientId: string }) {
    const url = API_ENDPOINTS.getClientMessage.replace('{clientId}', clientId);
    return this.http.get(`${this.baseUrl}${url}1`);
  }

  getClientMessagesById(clientId: string): Observable<any> {
    const url = API_ENDPOINTS.getMessages.replace('{clientId}', clientId);
    return this.http.get(`${this.baseUrl}${url}`);
  }

  getClientMessageData(clientId: string) {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.messageSubscription = this.getClientMessagesById(clientId).subscribe({
      next: (clientMessageData: MeecoMessagesItem) => {
        this.tempMessageData.meccoItems = clientMessageData;
      },
      error: (err) => {
        console.log('log API received error', err);
        this.errorData = {
          status: true,
          message: err?.error?.message
            ? err?.error.message
            : err?.message
            ? err?.message
            : 'An error occurred whilst processing your request, please try again or contact your administrator.'
          };
          this.displaySnapshotData(clientId);
        },
        complete: () => {
          console.log('this.selectedClient.id;', this.createdMessageStore, clientId);
          this.tempMessageData.id = clientId;
          if (!this.createdMessageStore) {
            this.createMessageClientStore(clientId);
          } else {
            this.updateMessageClientStoreData(this.tempMessageData);
          }
      }
    });
  }

  getClientStore(clientId: string) {
    this.createdMessageStore = getStore(clientId);
    // if (this.createdMessageStore) {
    //   this.displaySnapshotData(clientId);
    // }
  }

  createMessageClientStore(clientId) {
    if (this.tempMessageData?.meccoItems?.items?.length > 0) {
      const { state, config } = createState(
        withProps<{ messageData: MeecoMessagesItemProps }>({
          messageData: {
            id: clientId,
            meccoItems: {
              next_page_after: this.tempMessageData.meccoItems.next_page_after,
              items: this.tempMessageData.meccoItems.items
            }
          }
        })
      );
      this.clientMessageStoreProvider = createMessageStore(clientId, state, config);
      this.store = this.clientMessageStoreProvider.useFactory();
      this.displaySnapshotData(clientId);
    } else {
      this.displaySnapshotData(clientId);
    }
  }

  updateMessageClientStoreData(messageData: MeecoMessagesItemProps) {
    const store = getStore(messageData.id);
    console.log('log currentUpdatingStore', store);
    console.log('log store id inserting', messageData.id);
    console.log('log updateMessageClientStoreData updating', messageData);
    store?.update(() => ({
      messageData
    }));
    this.displaySnapshotData(messageData.id);
  }

  displaySnapshotData(clientId) {
    const storeSnapData = getRegistry();
    console.log('storeSnapData', storeSnapData);
    const id = this.selectedClientId ? this.selectedClientId : clientId;
    if (storeSnapData && storeSnapData.get(id)?.getValue()?.messageData?.meccoItems) {
      this.messageDetails$.next(storeSnapData.get(id)?.getValue()?.messageData?.meccoItems);
    }else {
      this.messageDetails$.next({ next_page_after: null, items: [] });
    }

    this.showLoading = false;
    this.utilityService.hideLoader();
  }

  sendMessage(clientId: string, message: any) {
    const url = API_ENDPOINTS.sendMessages.replace('{clientId}', clientId);
    return this.http.post(`${this.baseUrl}${url}`, { msg: message });
  }

  loadMoreMessages(clientId: string, nextPage: string) {
    const url = API_ENDPOINTS.getMessagesByPage
      .replace('{clientId}', clientId)
      .replace('{next_page_after}', nextPage);
    return this.http.get(`${this.baseUrl}${url}`);
  }

  getEncryptedMessage(clientId: string, shareId: string) {
    const url = API_ENDPOINTS.receivedMessages.replace('{clientId}', clientId).replace('{shareId}', shareId);
    return this.http.get(`${this.baseUrl}${url}`);
  }
}
