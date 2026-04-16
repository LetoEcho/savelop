# Savelop

Aplicación web para gestionar un sistema de ahorro semanal basado en números aleatorios. Cada semana se genera un número par único entre el 2 y el 100, y ese número determina cuánto dinero se destina a inversiones esa semana.

## Concepto

El rango de números pares del 2 al 100 da exactamente **50 números posibles**, lo que cubre las 50 semanas útiles del año (sobrando 2). Cada semana la aplicación escoge uno al azar sin repetirlo. De esta forma, el dinero invertido no es una cantidad fija predefinida, sino que varía semana a semana según el número que salga, haciendo el ahorro más dinámico y sostenible.

Una vez se han generado los 50 números, el ciclo se completa y se puede reiniciar.

## Funcionalidades

- **Generador semanal** — obtiene un número par aleatorio disponible y lo guarda en el historial.
- **Historial en lista** — muestra todos los números generados ordenados del más reciente al más antiguo, con su fecha exacta.
- **Cuadrícula visual** — tabla con todos los números del 2 al 100 que indica de un vistazo cuáles ya han salido y cuáles quedan pendientes.
- **Suma total acumulada** — muestra la suma de todos los números generados hasta el momento (el total ahorrado/invertido en el ciclo).
- **Backup y restauración** — exporta el historial a un archivo JSON y permite importarlo desde otro dispositivo o navegador, con validación de integridad.
- **Limpieza** — reinicia el ciclo eliminando todo el historial para empezar de cero.

## Tecnologías

- [Angular 16](https://angular.io/) — framework principal
- TypeScript
- `localStorage` — persistencia de datos en el navegador (sin backend ni base de datos)
- Docker — para ejecutar la aplicación en cualquier entorno

## Estructura del proyecto

```
savelop/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Componente raíz e interfaz
│   │   ├── app.component.html
│   │   └── app.component.css
│   └── services/
│       └── numeros.service.ts     # Lógica de negocio y acceso a localStorage
├── Dockerfile
├── angular.json
└── package.json
```

## Cómo ejecutar

### Con Node.js

```bash
npm install
npm start
```

Abre el navegador en `http://localhost:4200`.

### Con Docker

```bash
docker build -t savelop .
docker run -p 4200:4200 savelop
```

Abre el navegador en `http://localhost:4200`.

## Formato de los datos

El historial se guarda en `localStorage` bajo la clave `numeroHistorial` con la siguiente estructura:

```json
[
  { "numero": 48, "fecha": "2026-04-16T10:30:00.000Z" },
  { "numero": 12, "fecha": "2026-04-09T10:15:00.000Z" }
]
```

El archivo de backup exportado sigue este mismo formato JSON, lo que permite migrarlo entre dispositivos o navegadores fácilmente.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Servidor de desarrollo en el puerto 4200 |
| `npm run build` | Build de producción optimizado |
| `npm test` | Ejecuta los tests con Karma y Jasmine |
| `npm run watch` | Build en modo watch para desarrollo |
