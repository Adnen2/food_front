import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodsService } from '../foods.service';
import { Foods } from '../foods';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(public foodsService: FoodsService) { }
  foods: any;
  columns: string[] = ['image', 'name', 'price', 'tags', 'favorite', 'stars', 'origins', 'cookTime','_id'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngOnInit(): void {
    this.foodsService.getAll().subscribe((data: Foods[]) => {
      this.foods = new MatTableDataSource<any>(data);
      this.foods.paginator = this.paginator;
      this.foods.sort = this.sort;
      console.log(this.foods);
    })
  }
  deleteFood(_id: object) {
    this.foodsService.delete(_id).subscribe(res => {
      this.foods = this.foods.filter((item: { _id: object }) => item._id !== _id);
      console.log('Post deleted successfully');
    })
  }
  filter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.foods.filter = filter.trim().toLowerCase();
  }
}
