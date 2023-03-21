import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tecnic-create",
  templateUrl: "./tecnic-create.component.html",
  styleUrls: ["./tecnic-create.component.css"],
})
export class TecnicCreateComponent implements OnInit {
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor() {}

  ngOnInit(): void {}

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
