import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { OverlayRef } from "@angular/cdk/overlay";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{provide:MatDialogConfig, useValue: {}}, {provide:OverlayRef, useValue: {}}]
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};

  constructor(private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("User: ", this.user);
    this.dialogRef.close();
  }
}
