import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'mlc-system-down',
  templateUrl: './system-down.page.html',
  styleUrls: ['./system-down.page.scss']
})
export class SystemDownPage implements OnInit {
  constructor(private navService: NavigationService) {}

  ngOnInit() {}

  goBack() {
    // this.navService.back();
  }
}
