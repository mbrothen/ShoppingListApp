import {Component, Inject, Injectable} from  '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material';

@Component({
templateUrl:  'popup.component.html'
})
export  class  PopupComponent {
    constructor(private  dialogRef:  MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
    }
    public  closeDialog() {
        this.dialogRef.close();
    }
}