# Etapa 4 - Audio, mobile y accesibilidad

## Objetivo

Hacer que el juego sea comodo para ninos que todavia no leen fluidamente y para uso en tablet/celular horizontal.

## Audio

### Estado actual

- Hay helpers en `src/audio.js`.
- Se reproducen efectos de click, hover, exito y error.
- La voz solo se reproduce si existe la grabacion.
- No se usa fallback hablado sintetico.

### Mejoras propuestas

- Completar grabaciones por pantalla:
  - portada;
  - preguntas;
  - puzzle;
  - objetos;
  - final.
- Completar grabaciones por interaccion:
  - respuesta correcta;
  - respuesta incorrecta;
  - objeto encontrado;
  - instruccion repetida.
- Agregar boton para repetir instruccion de pantalla.
- Evitar que varias voces se pisen: detener voz anterior antes de reproducir nueva.

### Criterios de aceptacion

- Un nino puede entender que hacer escuchando instrucciones.
- Si falta una grabacion, el juego no rompe ni inventa voz.

## Mobile

### Estado actual

- El juego se ve completo en landscape.
- En portrait aparece mensaje para girar.
- Se pide fullscreen/orientacion luego de un toque.
- Capturas actuales:
  - `test-artifacts/roadmap-review/mobile-landscape.png`
  - `test-artifacts/roadmap-review/mobile-portrait.png`
- El canvas conserva proporcion gracias a `Phaser.Scale.FIT` y CSS con `max-width`/`max-height`.

### Limitaciones reales

- El navegador no permite ocultar la barra de direccion automaticamente al cargar.
- En iOS, fullscreen/orientation lock puede estar limitado fuera de PWA.

### Mejoras propuestas

- Crear `manifest.webmanifest`.
- Agregar iconos de app.
- Documentar instalacion como PWA en tablets.
- Preparar modo kiosk si se usa en una muestra o aula.

### Criterios de aceptacion

- En mobile landscape se ve el libro completo.
- En portrait se muestra un mensaje claro.
- El primer toque intenta entrar en modo inmersivo.
- El canvas no debe deformarse para llenar ancho y alto a la vez.
- Los hit areas deben seguir coincidiendo con los sprites despues del escalado.

### Observaciones desde `roadmap-review`

- Mobile landscape muestra el libro completo y centrado.
- Mobile portrait muestra un mensaje simple y legible.
- La barra del navegador no puede ocultarse automaticamente desde web normal; para entorno de aula conviene PWA instalada o modo kiosk.
- Cualquier cambio a `src/styles.css` debe repetirse con `tools/puzzle-cdp-test.mjs`, porque el drag/drop del puzzle depende de que el input siga alineado.

## Accesibilidad para edad 3-5

Reglas de diseno:

- Textos breves.
- Botones grandes.
- Areas clickeables generosas.
- Feedback positivo claro.
- Errores suaves, sin castigo fuerte.
- No depender solo de lectura.

Mejoras propuestas:

- Aumentar areas de hit en todas las tarjetas.
- Usar audio para consignas.
- Usar iconos mas literales.
- Evitar botones o textos demasiado cerca de bordes.

## Testing

Capturas minimas:

- Desktop 1280x720.
- Mobile landscape 932x430.
- Mobile portrait 430x932.

Pruebas manuales:

- Tocar boton de audio.
- Tocar comenzar.
- Resolver una pregunta correcta e incorrecta.
- Arrastrar piezas desde distintas zonas.
- Tocar objetos en bordes y centro.

Pruebas automatizadas/semiautomatizadas:

- `tools/capture-screens.ps1 -RunName <nombre>`
- `node tools/puzzle-cdp-test.mjs`
