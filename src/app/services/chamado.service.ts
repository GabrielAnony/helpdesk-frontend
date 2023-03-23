import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { Chamado } from "../models/chamados";

@Injectable({
  providedIn: "root",
})
export class ChamadoService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }
}
