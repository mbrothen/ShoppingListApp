import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatSnackBar} from '@angular/material';
import { ShoppingList } from '../shopping-List';
//import {MatButtonModule} from '@angular/material';
import { RestCallService } from '../rest-call.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: any = [];
  loading = true;
  dataSource: any;
  displayedColumns = ['item', 'itemDescription', 'shoppingListQty', 'operations', 'purchased'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public restCall: RestCallService
  ) { }

  ngAfterViewInit() {
  }


  ngOnInit(): void {
    this.loadShoppingList();
    console.log('DataSource: ', this.dataSource);
  }
  loadShoppingList(){
    return this.restCall.getShoppingList().subscribe((data: {})=>{
      this.loading = false;
      this.shoppingList = data;
      this.shoppingList = this.shoppingList.body;  //This is being done stupidly
      this.dataSource = new MatTableDataSource<ShoppingList>(this.shoppingList);
      console.log('data: ', this.shoppingList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  listQtyChange(itemId: string, changeQty: number) {
    return this.restCall.updateListQty(itemId, 'shoppingListQty', changeQty)
      .subscribe((data: {})=>{
        this.loadShoppingList();
      })
  }

}