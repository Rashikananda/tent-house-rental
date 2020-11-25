import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  displayedSummaryColumns: {key: string, header: string}[] = [{key:'product_id', header: 'Product Id'}, 
  {key:'product_title', header: 'Product Title'}, 
  {key:'quantity_total', header: 'Quantity Total'}, 
  {key:'Available Quantity', header: 'Available Quantity'}, 
  {key:'price', header: 'Price'}];
  displayedDetailedColumns: {key: string, header: string, colType?: string}[] = [{key:'transation_id', header: 'Transation Id'}, 
  {key:'timeStamp', header: 'Time', colType : 'date'}, 
  {key:'transation_type', header: 'transation_type'}, 
  {key:'quantity', header: 'Quantity'} ,
  {key:'product_title', header: 'Product Title'}, 
  // {key:'Cost', header: 'Cost'}, 
  {key:'Available Quantity', header: 'Available Quantity'}, 
  {key:'price', header: 'Price'}];
  dataSource!: MatTableDataSource<Object>;
  summaryColumnNames    = this.displayedSummaryColumns.map( col => col.key);
  detailedDataSource!: MatTableDataSource<Object>;
  detailedColumnNames    = this.displayedDetailedColumns.map( col => col.key);
  constructor(private apiService: ApiService) {

  }
  selectedTabChange(tabIndex: any) {
    console.log(tabIndex)
    if(tabIndex.index === 1){
      this.updateDetailedReport();

    } else {
        this.updateSummaryReport();
    }
  }
  updateSummaryReport() {
    this.apiService.getInventorySummmartReport().subscribe( productList  =>
      { this.dataSource = new MatTableDataSource(productList)
        this.dataSource.sort = this.sort;
      });
  }
  updateDetailedReport() {
    this.apiService.getInventoryDetailReport().subscribe( transactionList  =>
      { this.detailedDataSource = new MatTableDataSource(transactionList)
        this.detailedDataSource.sort = this.sort;
      });
  }
  ngOnInit() {

  }

  onFilterChnage(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
