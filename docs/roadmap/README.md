# Roadmap profundo - La aventura de Rosarito

Esta carpeta divide el roadmap en etapas trabajables. La idea es que cada etapa tenga objetivos claros, alcance, riesgos, criterios de aceptacion y notas de implementacion.

## Orden sugerido

1. `01_base_tecnica.md`
   - Ordenar helpers, datos, layouts y testing.

2. `02_pantalla_inicial.md`
   - Acercar la portada al diseno de referencia.

3. `03_minijuegos.md`
   - Pulir preguntas, rompecabezas y objetos ocultos.

4. `04_audio_mobile_accesibilidad.md`
   - Mejorar experiencia para ninos pequenos, tablets y uso sin lectura fluida.

5. `05_mantenimiento_expansion.md`
   - Dejar reglas para agregar contenido, assets y escenas sin romper el juego.

## Como usar esta carpeta

- Antes de implementar una mejora grande, leer la etapa correspondiente.
- Agregar decisiones nuevas al archivo de etapa, no solo al codigo.
- Al terminar una tarea, actualizar criterios de aceptacion y riesgos si cambiaron.
- Mantener `docs/KNOWLEDGE_BASE.md` como fuente de verdad de como funciona el juego hoy.
- Mantener esta carpeta como plan de hacia donde va el juego.

## Estado actual del flujo

El juego activo tiene tres actividades:

1. Preguntas de Rosario.
2. Rompecabezas.
3. Objetos de Rosario.

La pantalla de dones fue removida del flujo activo. Puede quedar como referencia historica de prototipo, pero no debe tratarse como minijuego activo salvo que se decida reincorporarla.

## Estado por etapa despues de `roadmap-review`

### Etapa 1 - Base tecnica

Estado: avanzada.

- Helpers de datos, UI, audio y layout ya existen.
- Hay capturas headless repetibles.
- Hay smoke test del puzzle.
- Los helpers visuales principales ya cubren titulos, globos, headers, checklist y boton siguiente.
- Pendiente: migrar boton principal largo y empezar a mover coordenadas repetidas a `SCENE_LAYOUTS`.

### Etapa 2 - Pantalla inicial

Estado: parcialmente alineada con referencia.

- La portada se ve estable y clara.
- Rosarito, tarjetas y objetivo final ya funcionan.
- Portada ya usa helpers comunes en titulos y globos.
- Pendiente: tarjetas mas ilustradas, boton principal compartido y objetivo final mas rico.

### Etapa 3 - Minijuegos

Estado: funcional, con pulido visual en curso.

- Preguntas funciona y no muestra cortes en la captura actual.
- Preguntas ya usa helpers comunes en titulo y globos.
- Puzzle funciona y el drag/snap esta validado.
- Puzzle recibio ajuste de globo y texto inferior.
- Objetos tiene buena escena y el globo inferior fue reposicionado.
- Pendiente: feedback visual breve y pulido de bandeja/tablero.

### Etapa 4 - Audio, mobile y accesibilidad

Estado: base correcta.

- Mobile landscape muestra el libro completo.
- Mobile portrait pide girar.
- Audio reproduce solo grabaciones existentes.
- Pendiente: PWA/fullscreen instalado y completar grabaciones.

### Etapa 5 - Mantenimiento y expansion

Estado: iniciado.

- Knowledge base y roadmap existen.
- `.gitignore` evita capturas y temporales.
- El cierre/final recibio un primer tratamiento visual tipo album/recompensa.
- Pendiente: preguntas a JSON externo y catalogo de assets activos.

## Definicion de listo para cualquier etapa

- Corre sin errores de sintaxis.
- Se puede abrir desde `http://127.0.0.1:5322/index.html`.
- Las escenas directas siguen funcionando:
  - `?scene=quiz`
  - `?scene=puzzle`
  - `?scene=objects`
  - `?scene=final`
- Hay capturas desktop 1280x720.
- Hay captura mobile landscape.
- No hay texto cortado ni superpuesto.
- No aparecen sprites con numeros estaticos duplicados.

## Ultima evidencia de prueba

- Carpeta: `test-artifacts/cover-quiz-helper-pass-2/`
- Smoke test: `node tools/puzzle-cdp-test.mjs`
- Resultado esperado del puzzle: `ok: true`, `pieces: 4`, `lockedCount >= 1`, `missingTextures: []`.
- Smoke test de objetos: `node tools/objects-cdp-test.mjs`, resultado esperado `ok: true`, `found: 4`.
