import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'mlc-invalid-organisation',
  templateUrl: './invalid-organisation.page.html',
  styleUrls: ['./invalid-organisation.page.scss']
})
export class InvalidOrganisationPage implements OnInit {
  constructor(private navService: NavigationService) {}

  ngOnInit() {}

  close() {
    this.navService.navigateBack('/');
  }
}
