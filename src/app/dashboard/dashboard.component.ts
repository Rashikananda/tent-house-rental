import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: {key: string, header: string}[] = [{key:'product_id', header: 'Product Id'}, 
  {key:'quantity_total', header: 'Quantity Total'}, 
  {key:'product_title', header: 'Product Title'}, 
  {key:'quantity_booked', header: 'Quantity Booked'}, 
  {key:'price', header: 'Price'}];
  dataSource!: MatTableDataSource<Product>;
  columnNames    = this.displayedColumns.map( col => col.key);
  constructor(private apiService: ApiService) {
    this.apiService.getProductList().subscribe( productList  =>
          { this.dataSource = new MatTableDataSource(productList)
            this.dataSource.sort = this.sort;
          });
  }
  ngOnInit() {

  }
  ngAfterViewInit(){
   
  }

  onFilterChnage(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}