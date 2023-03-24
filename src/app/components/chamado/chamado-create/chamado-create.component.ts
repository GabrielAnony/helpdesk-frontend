import { Router } from "@angular/router";
import { ChamadoService } from "./../../../services/chamado.service";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "src/app/models/tecnico";
import { Cliente } from "src/app/models/cliente";
import { TecnicoService } from "src/app/services/tecnico.service";
import { ClienteService } from "src/app/services/cliente.service";
import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Chamado } from "src/app/models/chamados";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
  titulo: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  prioridade: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
    dataAbertura: "",
    dataFechamamento: "",
  };

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private chamadoService: ChamadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  validaCampos(): boolean {
    return (
      this.titulo.valid &&
      this.status.valid &&
      this.prioridade.valid &&
      this.observacoes.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    );
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe((x) => {
      this.clientes = x;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((x) => {
      this.tecnicos = x;
    });
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(
      (resposta) => {
        this.toastService.success("Chamado criado com sucesso", "Novo chamado");
        this.router.navigate(["chamados"]);
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }
}
