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
  numerosUsados = this.numerosService.numerosMarcados; // Conjunto de números ya generados

  mostrarManual = false; // Manual de uso
  mostrarTabla = false; // Tabla de números usados 

  private readonly cols = 10;
  rows: number[][] = [];
  private selectedSet = this.numerosUsados;

  constructor(private numerosService: NumerosService) {
    this.rows = this.chunk(this.numerosService.posiblesNumeros, this.cols);
   }

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

  isSelected(n: number): boolean {
    return this.selectedSet.has(n);
  }

  private chunk<T>(arr: T[], size: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  refrescarNumeros(): void {
    this.numerosUsados = this.numerosService.numerosMarcados;
    this.selectedSet = this.numerosUsados;
  }

  // Getters para la vista
  get historial() {
    return this.numerosService.getHistorial();
  }

  get sumaTotal() {
    return this.numerosService.calcularSumaTotal();
  }

  
}