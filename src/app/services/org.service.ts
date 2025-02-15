/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organisation, OrgRepository } from '../stores/org.repository';
import { Observable } from 'rxjs';
import API_ENDPOINTS from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private orgRepo: OrgRepository, private http: HttpClient) {}

  async getAllOrganisation() {
    const url = `${this.baseUrl}${API_ENDPOINTS.getOrganisation}`;
    return this.http.get(url).subscribe({
      next: (organisation: Organisation) => {
        this.orgRepo.setOrgInfo(organisation);
        return organisation;  
      },
      error: async(e) => {
        const org = await this.orgRepo.store.state.org?.org;
        this.getOrganisation(org.key);
        return org;
      }
    });
  }

  updateOrganisation(body): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/adm/organisation`, body);
  }

  getOrganisationImage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/organisation/logo.png`);
  }

  getOrganisation(orgKey: string) {
    const url = `${this.baseUrl}${API_ENDPOINTS.checkOrg}${orgKey}`;
    return lastValueFrom(
      this.http.get(url).pipe(
        map((data: { key: string; name: string }) => {
          const logoUrl = API_ENDPOINTS.orgLogo.replace('{key}', data?.key);
          const logo = `${this.baseUrl}${logoUrl}`;
          this.orgRepo.setOrgInfo({
            logo,
            org: {
              status: '',
              primaryDomain: '',
              websiteUrl: '',
              logoThumbnail: logo,
              id: '',
              key: data.key,
              name: data.name
            },
            security: null
          });

          return data;
        })
      )
    );
  }
}
