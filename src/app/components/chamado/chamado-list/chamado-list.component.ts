import { ChamadoDetailsComponent } from "./../chamado-details/chamado-details.component";
import { ChamadoService } from "./../../../services/chamado.service";
import { Chamado } from "./../../../models/chamados";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-chamado-list",
  templateUrl: "./chamado-list.component.html",
  styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {
  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = [
    "id",
    "titulo",
    "dataAbertura",
    "prioridade",
    "status",
    "cliente",
    "tecnico",
    "acoes",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private serviceChamado: ChamadoService,
    public dialog: MatDialog
  ) {}

  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.serviceChamado.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach((x) => {
      if (x.status == status) {
        list.push(x);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(chamado: Chamado): void {
    const dialogRef = this.dialog.open(ChamadoDetailsComponent, {
      width: "700px",
      data: chamado,
    });
  }
}
