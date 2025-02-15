import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mlc-auth-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.scss']
})
export class InvalidAuthComponent implements OnInit {
  @Input() type: 'user' | 'organization' = 'user';
  @Output() closeClick: EventEmitter<any> = new EventEmitter();
  constructor() {}

  get title() {
    if (this.type === 'user') {
      return 'Account Load Error';
    } else {
      return 'Invalid Organisation';
    }
  }

  get contentText() {
    if (this.type === 'user') {
      return 'Check your intenet connection and try again or Contact your My Life Capsule Administrator for assistance.';
    } else {
      return 'Contact your My Life Capsule support representative for assistance.';
    }
  }
  ngOnInit() {}
}
