import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivityList, ActivityRepository } from '../stores/activity.repository';
import API_ENDPOINTS from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private activityRepo: ActivityRepository) {}

  getActivities(silent = false, page?: number, records?: number) {
    if (!silent) {
      this.activityRepo.setLoading(true);
    }
    return this.http
      .get(`${this.baseUrl}${API_ENDPOINTS.getActivities}?page=${page}&records=${records}`)
      .pipe(
        map((response: ActivityList) => {
          if ((response?.activities.length > 0 && page, records)) {
            response.activities.map((act) => (act.created = new Date(act.created)));
            this.activityRepo.addActivity(response.activities);
          }
          if ((response?.activities.length > 0 && !page, !records)) {
            response.activities.map((act) => (act.created = new Date(act.created)));
            this.activityRepo.setActivity(response.activities);
          }
          return response;
        })
      );
  }
}
