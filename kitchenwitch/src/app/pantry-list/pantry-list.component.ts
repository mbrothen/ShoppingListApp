import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatSnackBar} from '@angular/material';
import { PantryList } from '../pantry-list';
//import { matButtonModule } from '@angular/material';
import { RestCallService } from '../rest-call.service';

@Component({
  selector: 'app-pantry-list',
  templateUrl: './pantry-list.component.html',
  styleUrls: ['./pantry-list.component.css']
})
export class PantryListComponent implements OnInit {
  pantryList: any = [];
  loading = true;
  dataSource: any;
  displayedColumns = ['item', 'itemDescription', 'pantryListQty', 'operations'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  constructor(
    public restCall: RestCallService
  ) { }

  ngAfterViewInit() {

  }
  ngOnInit() {
    this.loadPantryList();
    console.log('DataSource: ', this.dataSource);
  }

  loadPantryList(){
    return this.restCall.getPantryList().subscribe((data: {})=>{
      this.loading=false;
      this.pantryList = data;
      this.pantryList = this.pantryList.body;
      this.dataSource = new MatTableDataSource<PantryList>(this.pantryList);
      console.log('data: ', this.pantryList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  listQtyChange(itemId: string, changeQty: number) {
    return this.restCall.updateListQty(itemId, 'pantryListQty', changeQty)
      .subscribe((data: {})=>{
        this.loadPantryList();
      })
  }

}
