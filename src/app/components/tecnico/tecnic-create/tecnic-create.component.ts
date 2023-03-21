import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "./../../../models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";
import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tecnic-create",
  templateUrl: "./tecnic-create.component.html",
  styleUrls: ["./tecnic-create.component.css"],
})
export class TecnicCreateComponent implements OnInit {
  tec: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.tec).subscribe(
      (response) => {
        this.toastr.success("Técnico cadastrado com sucesso", "Cadastro");
        this.router.navigate(["tecnicos"]);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toastr.error(element.message, "Campo Inválido");
          });
        } else {
          this.toastr.error(ex.error.message, "Campo Inválido");
        }
      }
    );
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }

  addPerfil(perfil: any): void {
    if (this.tec.perfis.includes(perfil)) {
      this.tec.perfis.splice(this.tec.perfis.indexOf(perfil), 1);
    } else {
      this.tec.perfis.push(perfil);
    }
  }
}
