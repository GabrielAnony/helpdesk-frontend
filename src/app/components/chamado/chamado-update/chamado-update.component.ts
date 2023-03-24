import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamados";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-update",
  templateUrl: "./chamado-update.component.html",
  styleUrls: ["./chamado-update.component.css"],
})
export class ChamadoUpdateComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(
      (resposta) => {
        this.chamado = resposta;
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
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

  update(): void {
    this.chamadoService.update(this.chamado).subscribe(
      (resposta) => {
        this.toastService.success(
          "Chamado atualizado com sucesso",
          "Atualizar chamado"
        );
        this.router.navigate(["chamados"]);
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
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
