export type ClientStatus = 'active' | 'pending' | 'cancelled' | 'archived';

export interface Client {
  name: string;
  email: string;
  id: string;
  ref: string;
  notes: string;
  status: ClientStatus;
  created: Date;
}

export interface ActiveClients {
  clients: Client[];
}

export interface ClientSubscription {
  clientId: string;
  subscriptionhistory: SubscriptionHistory[];
}

export interface SubscriptionHistory {
  id: string;
  start: Date | string;
  end: Date| string;
  durationMonths: string;
  created: string;
  createdBy: string;
  status: string;
}

export interface ClientAgent {
  id: string;
  name: string;
  email: string;
}

export interface ClientsAgent {
  agents: ClientAgent[];
}
