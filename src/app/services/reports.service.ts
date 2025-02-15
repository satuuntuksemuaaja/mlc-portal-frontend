/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private readonly baseUrl = environment.baseUrl;
  private readonly token = this.authService.getToken();
  header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  report: any;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAgentsReport(from: string, to: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/rep/agents?dateFrom=${from}&dateTo=${to}`, {
      headers: this.header
    });
  }

  getClientsReport(from: string, to: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/rep/clients?dateFrom=${from}&dateTo=${to}`, {
      headers: this.header
    });
  }

  getClientAgents(from: string, to: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/rep/clientagents?dateFrom=${from}&dateTo=${to}`, {
      headers: this.header
    });
  }

  getAuitLogs(from: string, to: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/rep/audit?dateFrom=${from}&dateTo=${to}`, {
      headers: this.header
    });
  }

  getClientSubscriptions(from: string, to: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/api/adm/rep/subscriptions?dateFrom=${from}&dateTo=${to}`,
      { headers: this.header }
    );
  }
}
