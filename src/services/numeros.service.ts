import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumerosService {
  private historialKey = 'numeroHistorial';
  private readonly posiblesNumeros: number[]; // Todos los números pares posibles

  constructor() {
    // Generar array de números pares del 2 al 100
    this.posiblesNumeros = Array.from({ length: 50 }, (_, i) => (i + 1) * 2);
  }

  // Generar número par único que no haya sido generado antes
  generarNumeroPar(): number | null {
    const historial = this.getHistorial();
    const numerosUsados = new Set(historial.map((item) => item.numero));

    // Filtrar números disponibles
    const disponibles = this.posiblesNumeros.filter(
      (num) => !numerosUsados.has(num)
    );

    if (disponibles.length === 0) return null;

    // Seleccionar aleatorio de los disponibles
    const randomIndex = Math.floor(Math.random() * disponibles.length);
    return disponibles[randomIndex];
  }

  // Obtener historial desde localStorage
  getHistorial(): any[] {
    const historial = localStorage.getItem(this.historialKey);
    return historial ? JSON.parse(historial) : [];
  }

  // Guardar nuevo número en el historial
  guardarEnHistorial(numero: number): void {
    const historial = this.getHistorial();
    historial.push({
      numero,
      fecha: new Date().toISOString(),
    });
    localStorage.setItem(this.historialKey, JSON.stringify(historial));
  }

  // Calcular suma total
  calcularSumaTotal(): number {
    return this.getHistorial().reduce((sum, item) => sum + item.numero, 0);
  }

  // Exportar copia de seguridad
  exportarBackup(): void {
    const data = JSON.stringify(this.getHistorial());
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-numeros-${new Date().toISOString()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Importar copia de seguridad con validación mejorada
  importarBackup(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = JSON.parse(e.target.result);

        // Validación 1: Debe ser un array
        if (!Array.isArray(data)) throw new Error('Formato inválido');

        // Validación 2: Cada elemento debe tener número y fecha
        const isValidStructure = data.every(
          (item) =>
            typeof item.numero === 'number' && typeof item.fecha === 'string'
        );
        if (!isValidStructure) throw new Error('Estructura inválida');

        // Validación 3: Números únicos y dentro del rango permitido
        const numeros = data.map((item) => item.numero);
        const numerosUnicos = new Set(numeros);
        if (numeros.length !== numerosUnicos.size)
          throw new Error('Números duplicados');

        const numerosValidos = numeros.every(
          (num) => num >= 2 && num <= 100 && num % 2 === 0
        );
        if (!numerosValidos)
          throw new Error('Números fuera de rango o no pares');

        localStorage.setItem(this.historialKey, JSON.stringify(data));
        window.location.reload();
      } catch (error) {
        let errorMessage = 'Failed to do something exceptional';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    };
    reader.readAsText(file);
  }

  // Limpiar todo el historial
  limpiarHistorial(): void {
    localStorage.removeItem(this.historialKey);
  }
}
