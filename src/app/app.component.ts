import { Component } from '@angular/core';
import { NumerosService } from 'src/services/numeros.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ultimoNumero: number | null = null;
  mostrarHistorial = false;
  allNumbersUsed = false; // Controla si se han agotado los números

  mostrarManual = false; // Añadir esta nueva propiedad

  constructor(private numerosService: NumerosService) { }

  generarNumero(): void {
    const nuevoNumero = this.numerosService.generarNumeroPar();
    
    if (nuevoNumero === null) {
      this.allNumbersUsed = true;
      return;
    }
    
    this.ultimoNumero = nuevoNumero;
    this.numerosService.guardarEnHistorial(nuevoNumero);
    this.allNumbersUsed = false;
  }

  limpiarTodo(): void {
    if (confirm('¿Estás seguro de querer borrar todo el historial?')) {
      this.numerosService.limpiarHistorial();
      this.ultimoNumero = null;
      this.mostrarHistorial = false;
      this.allNumbersUsed = false;
      window.location.reload();
    }
  }

  toggleHistorial(): void {
    this.mostrarHistorial = !this.mostrarHistorial;
  }

  exportarBackup(): void {
    this.numerosService.exportarBackup();
  }

  importarBackup(event: any): void {
    this.numerosService.importarBackup(event);
  }

  // Getters para la vista
  get historial() {
    return this.numerosService.getHistorial();
  }

  get sumaTotal() {
    return this.numerosService.calcularSumaTotal();
  }

  
}