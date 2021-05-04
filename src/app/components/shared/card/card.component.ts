import { Component, Input, OnInit } from '@angular/core'

import { TranslatePipe } from '../../../pipes/translation.pipe'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string
  @Input() icon: string
  cardName: string
  iconPath: string

  constructor(private translate: TranslatePipe) {}

  async ngOnInit() {
    this.cardName = await this.translate.transform(this.title)
    this.iconPath = this.icon;
  }

  setMyStyles() {
    return {
      height: this.icon === 'transfer' ? '40px' : '61px',
      'font-size': this.icon === 'transfer' ? '1.2rem' : '1.3rem',
    }
  }
}
