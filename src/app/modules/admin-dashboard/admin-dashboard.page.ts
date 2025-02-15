import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/clients.interface';

@Component({
  selector: 'mlc-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss']
})
export class AdminDashboardPage implements OnInit {
  public list: Client[] = [];
  constructor() {}

  ngOnInit() {}
}
