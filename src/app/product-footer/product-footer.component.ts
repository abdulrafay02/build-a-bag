import { Component, OnInit, Input } from '@angular/core';
import { ToggleService } from '../toggle.service';

@Component({
  selector: 'product-footer',
  templateUrl: './product-footer.component.html',
  styleUrls: ['./product-footer.component.css']
})
export class ProductFooterComponent implements OnInit {

  @Input() showFooter: boolean;
  @Input() subCatItems;
  showDetails: boolean;
  item: any[];
  modalImgUrl: string;

  constructor(private toggleService: ToggleService) { }

  ngOnInit() {
    this.toggleService.showDetailsState.subscribe(sd => this.showDetails = sd);
  }

  showProducts(item, category) {
    this.item = item;
    this.item['category'] = category;
    this.modalImgUrl = this.item['img_url_large'];
    this.toggleService.changeShowDetailsState(true);
  }

}
