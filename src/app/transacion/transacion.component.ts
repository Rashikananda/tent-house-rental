import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { ApiService } from '../api.service';
import { AddTranscComponent } from '../shared/add-transc/add-transc.component';

@Component({
  selector: 'app-transacion',
  templateUrl: './transacion.component.html',
  styleUrls: ['./transacion.component.scss']
})
export class TransacionComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  transation_id! : string;
  transation_date_time! : Date;
  customer_id! : string;
  product_id! : string;
  transation_type! : "OUT" | "IN";
  quantity! : number;
  transation_id_parent! : string;
  transactionsColumns: {key: string, header: string, colType?: string}[] = [{key:'transation_id', header: 'Transation Id'}, 
  {key:'timeStamp', header: 'Time', colType : 'date'}, 
  {key:'transation_type', header: 'transation_type'}, 
  {key:'quantity', header: 'Quantity'}];
  dataSource!: MatTableDataSource<Object>;
  columnNames    = this.transactionsColumns.map( col => col.key);
  constructor(private apiService: ApiService, public dialog: MatDialog) {
      this.updateTrasnc()

  }
  ngOnInit() {

  }

  updateTrasnc() {
    this.apiService.getTranscationList().subscribe( productList  =>
      { this.dataSource = new MatTableDataSource(productList)
        this.dataSource.sort = this.sort;
      });
  }

  onFilterChnage(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addTransc() {
    forkJoin(({customerList: this.apiService.getCustomerDetails(),
      summaryReport: this.apiService.getInventorySummmartReport()
    })).subscribe( list => {
      let dialogRef =  this.dialog.open(AddTranscComponent, {
        data: {
         ...list
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`); // Pizza!
        console.log(result)
        this.apiService.addTransaction(result).subscribe(s => this.updateTrasnc());
        
      });
      
    });

  }

}