import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { interval, Subject, takeUntil } from 'rxjs';
import { AddClientPage } from 'src/app/modules/clients/add-client/add-client.page';
import { ActivityService } from 'src/app/services/activity.service';
import { SideBarService } from 'src/app/services/side-bar.service';
import { ActivityRepository } from 'src/app/stores/activity.repository';
import { ActivityNotificationComponent } from '../activity-notification/activity-notification.component';
import { OfflinePopoverComponent } from './offline/offline-popover.component';

@Component({
  selector: 'mlc-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() title: string = null;
  @Input() hideMenuButton = false;
  @Input() isOffline = false;
  public unreadNotifications = 0;
  private destroy$: Subject<any> = new Subject();
  constructor(
    private sidebarService: SideBarService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private activityService: ActivityService,
    private activityRepo: ActivityRepository
  ) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('toggle').click();
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    interval(2000 * 60)
      .pipe(takeUntil(this.destroy$.asObservable()))
      .subscribe(() => {
        // this.refreshActivity();
      });
    this.activityRepo.activity$.pipe(takeUntil(this.destroy$.asObservable())).subscribe((data) => {
      data = data.slice(0, 5);
      this.unreadNotifications = data.filter((act) => !act.read)?.length;
    });
  }

  toggleMenu() {
    this.sidebarService.toggle();
  }

  async addClient() {
    const modal = await this.modalCtrl.create({
      component: AddClientPage,
      backdropDismiss: true,
      cssClass: 'add-client-modal',
      showBackdrop: true
    });

    await modal.present();
  }

  async openNotificationPopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: ActivityNotificationComponent,
      event: ev,
      cssClass: 'notification-popover',
      arrow: true,
      translucent: true
    });

    await popover.present();
  }


  async openOfflinePopover(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: OfflinePopoverComponent,
      event: ev,
      cssClass: 'notification-popover',
      arrow: true,
      translucent: true
    });

    await popover.present();
  }  

  // private refreshActivity() {
  //   this.activityService.getActivities(true).subscribe({
  //     next: () => {
  //       this.activityRepo.setLoading(false);
  //     },
  //     error: () => {
  //       this.activityRepo.setLoading(false);
  //     }
  //   });
  // }
}
