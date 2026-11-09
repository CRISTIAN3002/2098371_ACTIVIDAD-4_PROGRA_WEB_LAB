# Actividad 4: Miniaplicación Web consumiendo una API REST

**Universidad Autónoma de Nuevo León (UANL)**
**Facultad de Ingeniería Mecánica y Eléctrica (FIME)**
**Laboratorio de Programación Web**
* Alumno: Cristian Alejandro Martínez Sánchez
* Matrícula: 2098371

## Descripción de la API
Para este proyecto se seleccionó **TVMaze API** (https://www.tvmaze.com/api), una base de datos pública, rápida y sin requerimiento de llaves de autenticación que provee información detallada sobre series de televisión a nivel global.

* **Endpoint utilizado:** `GET https://api.tvmaze.com/search/shows?q={query}`
* **Formato de respuesta:** JSON
* **Parámetros:** Nombre de la serie a buscar en la URL.

## Instrucciones de Uso
1. Abrir el archivo `index.html` en el navegador.
2. En la barra de búsqueda, ingresar el nombre de una serie (ej. "Breaking Bad", "Suits", "The Office").
3. Hacer clic en "Buscar" o presionar la tecla Enter.
4. La aplicación mostrará un grid de tarjetas generadas dinámicamente con la portada, idioma, calificación promedio y género de las coincidencias.

## Reflexión Técnica
La integración del método `fetch()` con la sintaxis `async/await` simplifica drásticamente el manejo de operaciones asíncronas en JavaScript. En este proyecto se utilizó un bloque `try/catch` para manejar errores de red y se implementó lógica de validación condicional en la respuesta JSON (comprobando si el arreglo `data.length === 0`) para poder manipular el DOM y mostrar retroalimentación útil al usuario (estados de carga y estados vacíos). Además, se aplicó encadenamiento opcional (`?.`) al extraer los datos para evitar que la aplicación se rompa si a la API le falta una imagen o calificación.