/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { select, Store } from '@ngneat/elf';

export interface MeecoAttachment {
  id: string;
  name: string;
  mime: string;
  itemId: string;
  shareId: string;
  own: string;
  isDownloading: boolean | true;
}

export interface MeecoItemValue {
  k: string;
  v: string;
}

export interface MeecoItem {
  clientName?: string;
  // classification types
  classifications: string[];

  // the label identifier for the type.
  label: string;

  // the meeco item id
  id: string;

  // the share identifier
  shareId?: string;
  ownerId: string;

  // is mine
  own: boolean;

  // the date the item was created
  created: Date;

  // the date the item was last modified
  modified: Date;

  // the values assigned
  values: MeecoItemValue[];

  // linked attachments
  attachments: MeecoAttachment[];
}

export interface MeecoItemProps {
  id: string;
  meccoItems: {
    meccoSentItems?: MeecoItem[];
    meccoReceivedItems?: MeecoItem[];
  };
}
// const { state, config } = createState(
//   withProps<{ client: MeecoItemProps }>({ client: {id: null, meccoItems: { meccoReceivedItems: null, meccoSentItems: null}} })
// );

@Injectable({ providedIn: 'root' })
export class FilesRepository {
  client$ = this.store.pipe(select(({ client }) => client));
  constructor(private store: Store) {}
}

export const createFileStore = (clientId: string, stateValue, stateConfig) => {
  const clientFileProvider = {
    provide: FilesRepository,
    useFactory() {
      return new FilesRepository(
        new Store({
          name: `${clientId}`,
          state: stateValue,
          config: stateConfig
        })
      );
    }
  };
  return clientFileProvider;
};
