import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mlc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableConfigs: any;
  @Input() rowData: any;
  @Input() sort = false;
  constructor() {}

  ngOnInit() {}
}
