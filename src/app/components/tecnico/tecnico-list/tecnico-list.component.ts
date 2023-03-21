import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TecnicoDeleteComponent } from "./../tecnico-delete/tecnico-delete.component";
import { Tecnico } from "./../../../models/tecnico";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { TecnicoService } from "src/app/services/tecnico.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-tecnico-list",
  templateUrl: "./tecnico-list.component.html",
  styleUrls: ["./tecnico-list.component.css"],
})
export class TecnicoListComponent implements OnInit {
  [x: string]: any;
  ELEMENT_DATA: Tecnico[] = [];

  displayedColumns: string[] = ["id", "nome", "cpf", "email", "acoes"];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(tecnico: Tecnico): void {
    const dialogRef = this.dialog.open(TecnicoDeleteComponent, {
      width: "550px",
      data: tecnico,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.delete(tecnico.id).subscribe(() => {
          this.toastr.success("Técnico Excluido com Sucesso!", "Excluir");
          this.findAll();
        });
      }
    });
  }
}
