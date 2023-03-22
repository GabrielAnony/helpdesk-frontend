import { ClienteCreateComponent } from "./components/cliente/cliente-create/cliente-create.component";
import { ClienteListComponent } from "./components/cliente/cliente-list/cliente-list.component";
import { TecnicoUpdateComponent } from "./components/tecnico/tecnico-update/tecnico-update.component";
import { TecnicCreateComponent } from "./components/tecnico/tecnic-create/tecnic-create.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { TecnicoListComponent } from "./components/tecnico/tecnico-list/tecnico-list.component";
import { HomeComponent } from "./components/home/home.component";
import { NavComponent } from "./components/nav/nav.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteUpdateComponent } from "./components/cliente/cliente-update/cliente-update.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "tecnicos", component: TecnicoListComponent },
      { path: "tecnicos/create", component: TecnicCreateComponent },
      { path: "tecnicos/update/:id", component: TecnicoUpdateComponent },

      { path: "clientes", component: ClienteListComponent },
      { path: "clientes/create", component: ClienteCreateComponent },
      { path: "clientes/update/:id", component: ClienteUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
