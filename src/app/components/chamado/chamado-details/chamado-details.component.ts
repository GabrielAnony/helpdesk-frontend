import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Chamado } from "src/app/models/chamados";

@Component({
  selector: "app-chamado-details",
  templateUrl: "./chamado-details.component.html",
  styleUrls: ["./chamado-details.component.css"],
})
export class ChamadoDetailsComponent implements OnInit {
  item!: Chamado;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data;
  }
  ngOnInit(): void {}

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ADAMENTO";
    } else {
      return "ENCERRADO";
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == "0") {
      return "BAIXA";
    } else if (prioridade == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }
}
