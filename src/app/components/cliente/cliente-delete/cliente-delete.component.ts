import { Cliente } from "src/app/models/cliente";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-cliente-delete",
  templateUrl: "./cliente-delete.component.html",
  styleUrls: ["./cliente-delete.component.css"],
})
export class ClienteDeleteComponent implements OnInit {
  item!: Cliente;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data;
  }

  ngOnInit(): void {}
}
