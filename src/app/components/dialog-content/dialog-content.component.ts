import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface KeyValue {
  key: string;
  value: string;
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  dialogTitle: string = "Detail data"
  displayedColumns: string[] = ['key', 'value'];
  dataSource: any;

  constructor(
    public dialogRef:MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    console.log(data)
    this.dataSource = data
  }

  ngOnInit(): void {
  }

}
