/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent, AgentRepository } from '../stores/agent.repository';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private agentRepo: AgentRepository) {}

  getAllAgents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/agents`);
  }

  getActiveAgents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/agents?archived=false`);
  }

  getArchiveAgents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/agents?archived=true`);
  }

  addAgent(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/adm/agent`, body);
  }

  updateAgent(body: Agent) {
    const { id, name, roleId, phone } = body;
    return this.http.put(`${this.baseUrl}/api/adm/agent`, { id, name, roleId, phone });
  }

  archiveAgent(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/adm/agent/archive`, { id });
  }

  restoreAgent(agentId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/adm/agent/restore`, { id: agentId });
  }

  getClient(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/agent/${id}/clients?archived=false`);
  }

  getAuditHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/agent/1/audit?page=0`);
  }

  getAuditHistoryByAgentId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/adm/agent/${id}/audit`);
  }

  getAgentImageById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/agent/${id}/thumb`);
  }

  updateAgentImg(body): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/adm/agent/thumb`, body);
  }

  removeClient(clientId: string, agentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/adm/client/${clientId}/agent/${agentId}`);
  }

  assignClient(clientId: string, agentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/adm/client/${clientId}/agent/${agentId}`, {});
  }
}
