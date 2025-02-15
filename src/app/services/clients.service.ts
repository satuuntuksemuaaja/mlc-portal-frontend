/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/clients.interface';
import { ClientsRepository } from '../stores/clients.repository';
import API_ENDPOINTS from './api-endpoints';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

interface GetClientsResponse {
  error: any;
  active: Client[];
  archived: Client[];
  cancelled: Client[];
  pending: Client[];
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly baseUrl = environment.baseUrl;
  private readonly token = this.authService.getToken();
  header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  constructor(
    private http: HttpClient,
    private clientsRepo: ClientsRepository,
    private authService: AuthService
  ) {}

  loadActiveClients(isLoading: boolean = true) {
    this.clientsRepo.setLoading(isLoading);
    this.http.get(`${this.baseUrl}${API_ENDPOINTS.getActiveClients}`).subscribe({
      next: (data: GetClientsResponse) => {
        if (!data?.error) {
          this.clientsRepo.setActiveClients({ ...data });
        } else {
          // error occured
        }
        this.clientsRepo.setLoading(false);
      },
      error: (e) => {
        console.error(e);
        this.clientsRepo.setLoading(false);
      }
    });
  }

  loadAllClients(isLoading: boolean = true) {
    this.clientsRepo.setLoading(isLoading);
    this.http.get(`${this.baseUrl}${API_ENDPOINTS.getAllClients}`).subscribe({
      next: (data: GetClientsResponse) => {
        if (!data?.error) {
          this.clientsRepo.setClients({
            active: data?.active,
            archived: data?.archived,
            cancelled: data?.cancelled,
            pending: data?.pending
          });
        } else {
          // error ocuured
        }
        this.clientsRepo.setLoading(false);
      },
      error: (e) => {
        console.error(e);
        this.clientsRepo.setLoading(false);
      }
    });
  }

  addClient(client: { email: string; name: string; phone: string; ref: string }) {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.addClient}`, client).pipe(
      map((res: any) => {
        console.log(res);
        if (res?.id) {
          this.loadActiveClients();
        }
        return res;
      })
    );
  }

  reInviteClient(id: string) {
    const endpoint = API_ENDPOINTS.reinviteClient.replace('{id}', id);
    return this.http.post(`${this.baseUrl}${endpoint}`, null);
  }

  updateClient(client: { name: string; ref: string; notes: string; id: string }) {
    return this.http.put(`${this.baseUrl}${API_ENDPOINTS.updateClient}`, client);
  }

  archiveClient(id: string) {
    const endpoint = API_ENDPOINTS.archiveClient.replace('{id}', id);
    return this.http.put(`${this.baseUrl}${endpoint}`, null);
  }

  restoreClient(id: string) {
    const endpoint = API_ENDPOINTS.restoreClient.replace('{id}', id);
    return this.http.put(`${this.baseUrl}${endpoint}`, null);
  }

  cancelClientRequest(id: string) {
    const endpoint = API_ENDPOINTS.cancelClient.replace('{id}', id);
    return this.http.put(`${this.baseUrl}${endpoint}`, null);
  }

  getSubscription(clientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/client/${clientId}/subscriptionhistory`, {
      headers: this.header
    });
  }

  getAgents(clientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/client/${clientId}/agents`, {
      headers: this.header
    });
  }

  getActiveClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/clients/list/active`, { headers: this.header });
  }

  getActiveClientsOnly(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/clients/list/active?exclPending=true`, {
      headers: this.header
    });
  }

  getArchiveClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/clients/list`, { headers: this.header });
  }
}
