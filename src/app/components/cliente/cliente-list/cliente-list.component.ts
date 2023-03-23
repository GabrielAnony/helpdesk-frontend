import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ClienteDeleteComponent } from "../cliente-delete/cliente-delete.component";
import { Cliente } from "../../../models/cliente";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ClienteService } from "src/app/services/cliente.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-cliente-list",
  templateUrl: "./cliente-list.component.html",
  styleUrls: ["./cliente-list.component.css"],
})
export class ClienteListComponent implements OnInit {
  [x: string]: any;

  ELEMENT_DATA: Cliente[] = [];

  displayedColumns: string[] = ["id", "nome", "cpf", "email", "acoes"];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ClienteDeleteComponent, {
      width: "550px",
      data: cliente,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.delete(cliente.id).subscribe(() => {
          this.toastr.success("Cliente Excluido com Sucesso!", "Excluir");
          this.findAll();
        });
      }
    });
  }
}
