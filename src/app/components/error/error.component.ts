import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mlc-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() header = 'Error';
  @Input() text = 'An Error Occured';
  constructor() {}

  ngOnInit() {}
}
