/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { select, Store } from '@ngneat/elf';

export interface Message {
  label?: string;
  id: string;
  shareId?: string | null;
  ownerId?: string | null;
  own?: boolean;
  created?: string;
  modified?: string;
  classifications?: string[];
  values?: {
    k: string;
    v: string;
  }[];
  attachments?: any[];
  new: boolean;
  showDate?: boolean;
}

export interface MessagesProps {
  loading: boolean;
}

export interface MeecoMessagesItemProps {
  id: string;
  meccoItems: MeecoMessagesItem;
}

export interface MeecoMessagesItem {
  next_page_after: any;
  items: Message[];
}

@Injectable({
  providedIn: 'root'
})
// export class MessagesRepository {
//   public messages$: Observable<Message[]>;
//   public loading$: Observable<boolean>;
//   private store: Store;

//   constructor() {
//     this.init();
//   }

//   setMessages(messages: Message[]) {
//     this.store.update(setEntities(messages));
//   }

//   addMessage(message: Message) {
//     this.store.update(addEntities(message));
//   }

//   updateMessage(id: Message['id'], message: Partial<Message>) {
//     this.store.update(updateEntities(id, message));
//   }

//   setLoading(status: boolean) {
//     this.store.update((state) => ({
//       ...state,
//       loading: status
//     }));
//   }

//   deleteMessage(id: Message['id']) {
//     this.store.update(deleteEntities(id));
//   }

//   private init() {
//     this.store = this.createStore();
//     this.messages$ = this.store.pipe(selectAllEntities());
//     this.loading$ = this.store.pipe(select((state) => state?.loading));
//   }

//   private createStore(): typeof store {
//     const store = createStore(
//       { name: 'messages' },
//       withProps<MessagesProps>({ loading: false }),
//       withEntities<Message, 'id'>({ idKey: 'id' })
//     );

//     return store;
//   }
// }

@Injectable({ providedIn: 'root' })
export class ClientMessagesRepository {
  messages$ = this.store.pipe(select(({ message }) => message));
  constructor(private store: Store) {}
}

export const createMessageStore = (clientId: string, stateValue, stateConfig) => {
  const clientMessageProvider = {
    provide: ClientMessagesRepository,
    useFactory() {
      return new ClientMessagesRepository(
        new Store({
          name: `${clientId}`,
          state: stateValue,
          config: stateConfig
        })
      );
    }
  };
  return clientMessageProvider;
};
