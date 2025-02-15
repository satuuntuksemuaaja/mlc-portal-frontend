import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mlc-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() text = '';
  @Input() minHeight = 400;

  constructor() {}

  ngOnInit() {}
}
