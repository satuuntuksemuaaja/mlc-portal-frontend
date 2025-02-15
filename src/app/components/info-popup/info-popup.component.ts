import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mlc-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {
  @Input() message: string = null;
  constructor() {}

  ngOnInit() {}
}
