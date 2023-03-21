import { Tecnico } from "./../../../models/tecnico";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-tecnico-delete",
  templateUrl: "./tecnico-delete.component.html",
  styleUrls: ["./tecnico-delete.component.css"],
})
export class TecnicoDeleteComponent implements OnInit {
  item!: Tecnico;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data;
  }

  ngOnInit(): void {}
}
