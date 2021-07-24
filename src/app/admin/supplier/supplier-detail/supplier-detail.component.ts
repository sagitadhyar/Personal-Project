import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {
  dialogTitle: string
  dialogOkButton: string
  item: any
  dialogForm!: FormGroup

  constructor(
    public dialogRef:MatDialogRef<SupplierDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.dialogTitle = data ? "Ubah Data Supplier" : "Tambah Data Supplier"
    this.dialogOkButton = data ? "Ubah" : "Simpan"

    this.item = (data ? JSON.parse(JSON.stringify(data)) : {}) as any
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}