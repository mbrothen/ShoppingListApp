import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RestCallService } from '../rest-call.service';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  itemName: string = "";
  itemDescription: string = "";
  itemCategory: string = "";
  shoppingListQty: number;
  pantryListQty: number;


  
constructor(private dialog: MatDialog, private router: Router, public restCall: RestCallService) { }

public  createItem(){
  /* logic to create a item from the form information*/
  //create JSON object to send to endpoint
  let item = new Item({
    itemName: this.itemName,
    itemDescription: this.itemDescription,
    itemCategory: this.itemCategory,
    shoppingListQty: this.shoppingListQty,
    pantryListQty: this.pantryListQty
  });
  if (item) {
    this.restCall.createItem(item).subscribe(
      () => {
        console.log('Item Created Successfully');
        this.dialog.open(PopupComponent, { data: {
          message:  "Item Created Successfully"
        }})
        
        //This is not good practice.  Need to create reactive form group.

        //          Crappy - Fix later

        //
        this.itemName = null;
        this.itemDescription = null;
        this.itemCategory = null;
        this.shoppingListQty = null;
        this.pantryListQty = null;
      }
    )
  }
}

ngOnInit() {
}

}
