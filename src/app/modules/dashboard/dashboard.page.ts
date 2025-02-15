import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Chart, registerables } from 'chart.js';
import { map } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Popup, PopupService } from 'src/app/services/popup.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Activity, ActivityRepository } from 'src/app/stores/activity.repository';
import { UserDetails, UserRepository } from 'src/app/stores/user.repository';
import { AddClientPage } from '../clients/add-client/add-client.page';
import { takeUntil, Subject } from 'rxjs';
Chart.register(...registerables);
@Component({
  selector: 'mlc-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, AfterViewInit, OnDestroy {
  public currentPage = 0;
  public records = 50;
  public isLoading = false;
  public useImages = null;
  public currentUser: UserDetails = null;
  public activityLoading = false;
  public activities: Activity[] = [];
  isReload: boolean;
  private readonly destroying$ = new Subject<void>();

  constructor(
    private utilityService: UtilityService,
    private navService: NavigationService,
    private userRepo: UserRepository,
    private activityRepo: ActivityRepository,
    private activityService: ActivityService,
    private modalCtrl: ModalController,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.activities = [];
    this.activityRepo.clear();
    this.activityRepoSubs();
    this.loadActivities(this.currentPage, this.records);
    this.getPopupDetails();
    this.userRepo.userDetails$.subscribe((data) => {
      this.currentUser = data;
    });
    this.userRepo.userImages$
      .pipe(
        map((res) => {
          this.useImages = this.utilityService.getSecureUrl(res?.photo);
          return res;
        })
      )
      .subscribe(() => {
        console.log('user image related data');
      });
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
  }

  loadActivities(page: number, records: number, isReload?: boolean) {
    this.isReload = isReload;
    if (isReload) {
      this.activityRepo.clear();
      this.activities = [];
    }
    this.activityService.getActivities(true, page, records).subscribe({
      next: () => {
        this.activityRepo.setLoading(false);
      },
      error: () => {
        this.activityRepo.setLoading(false);
      },
      complete: () => {
        this.currentPage = isReload ? page + 1 : (this.currentPage += 1);
        this.isReload = this.isReload ? !this.isReload : this.isReload;
      }
    });
    this.activityRepo.loading$.subscribe({
      next: (loadingStatus) => {
        this.activityLoading = loadingStatus;
      }
    });
  }

  activityRepoSubs() {
    this.activityRepo.activity$.subscribe({
      next: (activities: Activity[]) => {
        this.activities = activities;
      }
    });
  }

  onIonInfinite(infiniteScrollEvent: any) {
    setTimeout(() => {
      this.loadActivities(this.currentPage, this.records);
      infiniteScrollEvent.target.complete();
    }, 500);
  }

  getPopupDetails() {
    this.popupService.popupUpdated.pipe(takeUntil(this.destroying$)).subscribe((details: Popup) => {
      if (details.title) {
        if (details.confirm === true && details.title === 'Load Activity') {
          this.loadActivities(this.currentPage, this.records);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // this.loadClientChart();
  }

  learnMore() {
    console.log('learn more about terms and conditions');
  }

  openErrorPopup() {
    return this.utilityService.openAlert({
      title: 'Error in login!!',
      message: 'Unable to login please try again later',
      type: 'error'
    });
  }

  openSuccessPopup() {
    return this.utilityService.openAlert({
      title: 'Data Added',
      message: 'Data added successfulyy',
      type: 'success'
    });
  }

  async openAddClient() {
    const modal = await this.modalCtrl.create({
      component: AddClientPage,
      backdropDismiss: true,
      cssClass: 'add-client-modal',
      showBackdrop: true
    });

    await modal.present();
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  goToSystemDown() {
    this.navService.navigateForward('/system-down');
  }

  openRelativePage(activity: Activity) {
    if (activity.section === 'files') {
      this.navService.navigateForwardWithQueryParams('/clients', {
        section: 'files'
      });
    } else if (activity.section === 'messages') {
      this.navService.navigateForwardWithQueryParams('/clients', {
        section: 'messages'
      });
    } else if (activity.section === 'client') {
      this.navService.navigateForwardWithQueryParams('/clients', {
        clientId: activity?.clientId
      });
    }
  }

  // private loadClientChart() {
  //   const data = {
  //     labels: ['Archived', 'Active'],
  //     datasets: [
  //       {
  //         label: 'New client',
  //         data: [20, 80],
  //         backgroundColor: ['#50adbd', '#008383']
  //       }
  //     ]
  //   };
  //   const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
  //   new Chart(ctx, {
  //     type: 'doughnut',
  //     data,
  //     options: {
  //       rotation: 270,
  //       borderColor: 'transparent',
  //       cutout: '60%',
  //       plugins: {
  //         legend: {
  //           position: 'bottom',
  //           display: false
  //         },
  //         title: {
  //           display: false
  //         }
  //       }
  //     }
  //   });
  // }
}
