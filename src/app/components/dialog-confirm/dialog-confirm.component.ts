import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface KeyValue {
  key: string;
  value: string;
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  dialogTitle: string
  dialogText: string
  displayedColumns: string[] = ['key', 'value'];
  dataSource: any;

  constructor(
    public dialogRef:MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.dialogTitle = data.title
    this.dialogText = data.text
  }

  ngOnInit(): void {
  }

}
