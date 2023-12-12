import { Component, Input, OnInit } from '@angular/core';
import { Foods } from '../foods';
import { FoodsService } from '../foods.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() foodId!: object;
  foods: Foods = new Foods()
  display = "none";

  constructor(private foodserv: FoodsService) { }
  ngOnInit(): void {
    this.foodserv.find(this.foodId).subscribe((data: Foods) => {
      this.foods = data;
    });
  }
  openModal() {
    this.display = "block";
  }
  closeModal() {
    this.display = "none";
  }
}
