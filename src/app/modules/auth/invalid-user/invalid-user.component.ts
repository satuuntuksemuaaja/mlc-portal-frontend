import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'mlc-invalid-user',
  templateUrl: './invalid-user.component.html',
  styleUrls: ['./invalid-user.component.scss'],
})
export class InvalidUserComponent implements OnInit {

  constructor(private navService: NavigationService) { }

  ngOnInit() {}

  close(){
    this.navService.navigateForward('/', true);
  }
}
