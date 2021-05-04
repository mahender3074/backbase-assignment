import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() transactions
  
  constructor() {
  }

  ngOnInit() {}
}
