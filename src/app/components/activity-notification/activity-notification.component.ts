import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Activity, ActivityRepository } from 'src/app/stores/activity.repository';

@Component({
  selector: 'mlc-activity-notification',
  templateUrl: './activity-notification.component.html',
  styleUrls: ['./activity-notification.component.scss']
})
export class ActivityNotificationComponent implements OnInit {
  public activities: Activity[] = [];
  public loading = true;

  private destroy$: Subject<any> = new Subject();
  constructor(
    private navService: NavigationService,
    private popoverCtrl: PopoverController,
    private activityRepo: ActivityRepository,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    // this.loadActivity();

    this.activityRepo.activity$.pipe(takeUntil(this.destroy$.asObservable())).subscribe({
      next: (activities: Activity[]) => {
        this.activities = activities.splice(0, 5);
      }
    });
    this.activityRepo.loading$.pipe(takeUntil(this.destroy$.asObservable())).subscribe({
      next: (loadingStatus) => {
        this.loading = loadingStatus;
      }
    });
  }

  async openRelativePage(activity: Activity) {
    await this.popoverCtrl.dismiss();
    if (activity.section === 'files') {
      this.navService.navigateForwardWithQueryParams('/clients', {
        section: 'files'
      });
    } else if (activity.section === 'messages') {
      this.navService.navigateForwardWithQueryParams('/clients', {
        section: 'messages'
      });
    } else if (activity.section === 'client') {
      this.navService.navigateForward('/clients');
    }
  }

  async viewAll() {
    await this.popoverCtrl.dismiss();
    this.navService.navigateForward('/dashboard');
  }

  private loadActivity() {
    this.activityService.getActivities(true).subscribe({
      next: () => {
        this.activityRepo.setLoading(false);
      },
      error: () => {
        this.activityRepo.setLoading(false);
      }
    });
  }
}
