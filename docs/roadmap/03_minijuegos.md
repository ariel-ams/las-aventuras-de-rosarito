# Etapa 3 - Minijuegos

## Objetivo

Hacer que cada minijuego se sienta como una pagina ilustrada del mismo libro, con mecanicas simples, feedback claro y poco texto.

## Minijuego 1 - Preguntas de Rosario

### Estado actual

- Selecciona 3 preguntas por partida.
- Mezcla las respuestas.
- Recalcula la respuesta correcta despues de mezclar.
- Al completar las 3 preguntas avanza al rompecabezas.
- Captura actual: `test-artifacts/roadmap-review/quiz.png`.
- No se observan textos cortados en la pregunta ni en las respuestas de la captura actual.
- Mejora aplicada: tarjetas de respuesta más compactas y con más separación (`cardWidth` y `answerGap` ajustados).

### Mejoras propuestas

- Preguntas y opciones ya viven en `src/questions.json`.
- Asociar cada respuesta con iconos especificos, no genericos.
- Agregar feedback corto por pregunta correcta.
- Revisar textos con tildes y encoding limpio.
- Mantener preguntas en una linea o dos como maximo, usando `addFittedText`.
- Campo `iconKey` por opcion agregado al JSON; queda pendiente reemplazar iconos genericos por ilustraciones finales cuando existan.
- Mejora aplicada en esta iteración: tarjetas menos anchas y distancia horizontal mayor para reducir sensación de “pegadas”.
- Mejora aplicada en esta iteración: textos de preguntas/etiquetas corregidos a UTF-8 para eliminar caracteres mojibake.

### Criterios de aceptacion

- Las respuestas aparecen en posiciones distintas entre partidas.
- Los iconos se mantienen asociados a su respuesta aunque se mezclen las opciones.
- El texto de pregunta no toca bordes.
- Cada opcion se entiende visualmente.
- Las tarjetas no deben quedar demasiado anchas ni pegadas entre si.
- Los iconos deben representar la respuesta, no solo decorar.

## Minijuego 2 - Rompecabezas

### Estado actual

- Selecciona 1 puzzle por partida.
- Usa 4 piezas.
- Permite drag desde area rectangular de la pieza.
- Hace snap si la pieza esta cerca de su destino.
- Carga los assets de todos los puzzles normalizados durante `BootScene`, para que los accesos directos de test y `resetRun()` no puedan elegir un puzzle sin texturas cargadas.
- El canvas ya no se fuerza por CSS a `100vw x 100vh`; Phaser conserva la proporcion del juego y el input queda alineado.
- Captura actual: `test-artifacts/roadmap-review/puzzle.png`.
- Avance posterior aplicado: el globo de instruccion se simplifico y usa `addFittedText`.
- Avance posterior aplicado: el panel inferior `De su vida real` usa el titulo corto del puzzle para evitar desbordes.
- Captura de revalidacion: `test-artifacts/roadmap-next-pass-final/puzzle.png`.

### Mejoras propuestas

- Pulir bandeja inferior para que parezca parte del libro.
- Agregar brillo breve al colocar pieza correcta.
- Agregar mensaje final suave dentro de la misma pantalla.
- Mantener solo un puzzle por partida para no volverlo repetitivo.
- Revisar si los source nuevos deben regenerar piezas antes de cada entrega.
- Seguir puliendo bandeja y tablero con sprites mas integrados.
- Revisar la opacidad de la guia: se ve bien como ayuda, pero en algunos retratos puede competir con las piezas.

### Criterios de aceptacion

- Se puede arrastrar desde cualquier parte de la pieza.
- El snap es generoso.
- La guia no compite con las piezas.
- Al completar, avanza sin pantalla intermedia.
- El globo de instruccion no pisa el icono de mouse ni decoraciones.
- La bandeja permite distinguir las 4 piezas sin que se superpongan visualmente con el boton siguiente.

### Validacion aplicada

- `node --check src/main.js`
- `node --check tools/puzzle-cdp-test.mjs`
- `node tools/puzzle-cdp-test.mjs`
- Captura: `test-artifacts/puzzle-fix-stage3/puzzle.png`
- Captura adicional de esta ronda: `test-artifacts/roadmap-cycle-continue-v5/quiz.png` (verifica ajuste de anchos/espacios en juego de preguntas).
- Validación textual de esta ronda: corrección de strings visibles a UTF-8 en `src/main.js` y `src/questions.json` para evitar lecturas confusas.

Resultado del test:

```json
{
  "ok": true,
  "pieces": 4,
  "lockedCount": 1,
  "done": 1,
  "missingTextures": []
}
```

Notas:

- El navegador integrado de Codex fallo por sandbox de Windows, por eso la validacion interactiva se hizo con Edge headless via CDP.
- El test arrastra una pieza sobre el canvas y confirma que se bloquea en el tablero.
- Mantener `tools/puzzle-cdp-test.mjs` como smoke test cuando se cambie CSS, drag/drop, piezas o layout del rompecabezas.

## Minijuego 3 - Objetos de Rosario

### Estado actual

- Selecciona 4 objetos por partida.
- `Lentes` aparece siempre.
- Los objetos activos se superponen en la escena.
- No tienen halo permanente.
- El area de click es amplia e invisible, separada del sprite visual con `Phaser.GameObjects.Zone`.
- Captura actual: `test-artifacts/roadmap-review/objects.png`.
- La escena derecha esta muy alineada con la referencia: aula ilustrada, mesa rica y objetos integrados.
- La lista izquierda funciona y el globo inferior ya no usa la frase larga que se cortaba.
- Avance posterior aplicado: el globo inferior se subio y el texto `Haz clic cuando los veas` ahora usa `addFittedText`.
- Avance posterior aplicado: la instruccion se simplifico a `Toca los objetos`.
- Captura de revalidacion: `test-artifacts/roadmap-next-pass-final/objects.png`.
- Avance posterior aplicado: la lista ya no dibuja un segundo circulo sobre el sprite de fila; el sprite conserva el circulo vacio y Phaser solo agrega el check al encontrar el objeto.
- Avance posterior aplicado: se agrego `tools/objects-cdp-test.mjs` para validar que los 4 objetos se puedan encontrar haciendo click en el centro de sus zonas invisibles.

### Mejoras propuestas

- Agregar pista opcional con pulso temporal.
- Ajustar coordenadas de sprites para que coincidan mejor con la escena.
- Agregar feedback visual al encontrar objeto: sparkle corto o check.
- Mantener la escena limpia sin resaltar todo el tiempo.
- Revisar que objetos no activos no parezcan clickeables.
- Revisar en captura nueva que el globo `Haz clic cuando los veas` no quede cortado.
- Hacer mas clara la diferencia entre boton siguiente deshabilitado y decoracion.
- Unificar el checklist como componente reutilizable: header + panel + 4 filas, sin dibujar circulos extra por codigo.
- Mantener el hit area de cada objeto como `Zone` con padding minimo de 58 px mientras el publico objetivo sea de 3 a 5 anos.

### Criterios de aceptacion

- El objeto se marca aunque el nino toque cualquier parte visible o cercana.
- La lista izquierda se actualiza inmediatamente.
- La escena no queda contaminada con halos permanentes.
- El boton siguiente se activa solo al encontrar los 4.
- Ningun texto de la pagina izquierda queda cortado.
- La lista muestra exactamente 4 objetos y mantiene separacion clara entre filas.
- La lista no muestra doble circulo: al inicio solo se ve el circulo vacio del sprite; al encontrar, aparece un check dinamico.
- `node tools/objects-cdp-test.mjs` debe pasar cuando se cambien posiciones, sprites o hit areas.

### Validacion aplicada

- `node --check src/main.js`
- `node --check tools/objects-cdp-test.mjs`
- `node tools/objects-cdp-test.mjs`
- `node tools/puzzle-cdp-test.mjs`
- Capturas con `tools/capture-screens.ps1 -RunName ui-consistency-objects-hit`
- Capturas con `tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v5`

Resultado del test de objetos:

```json
{
  "ok": true,
  "activeCount": 4,
  "found": 4,
  "checkedRows": 4
}
```

Capturas:

- `test-artifacts/ui-consistency-objects-hit/objects.png`
- `test-artifacts/ui-consistency-objects-hit/quiz.png`
- `test-artifacts/ui-consistency-objects-hit/puzzle.png`
- `test-artifacts/ui-consistency-objects-hit/final.png`

Notas de revision:

- La lista de objetos ya no muestra doble circulo al inicio.
- El click real sobre las zonas invisibles marca los 4 objetos.
- La escena de objetos se mantiene limpia sin halos permanentes.
- El globo inferior de objetos ya entra, aunque conviene convertirlo luego al mismo helper visual que las instrucciones del quiz/puzzle.
- El header lila de objetos, quiz y portada todavia usa variantes visuales; queda como tarea de unificacion en la etapa de sistema UI.
- Avance posterior aplicado: puzzle y objetos migraron titulos, globos, headers y checklist a helpers visuales compartidos.
- Capturas posteriores: `test-artifacts/ui-helpers-title-pass/puzzle.png` y `test-artifacts/ui-helpers-title-pass/objects.png`.
- Avance posterior aplicado: portada y quiz migraron titulos/globos a helpers compartidos en las zonas de bajo riesgo.
- Avance posterior aplicado: puzzle y objetos migraron el boton `Siguiente` a `RosaritoUI.addNextButton`.
- Capturas posteriores: `test-artifacts/cover-quiz-helper-pass-2/cover.png` y `test-artifacts/cover-quiz-helper-pass-2/quiz.png`.

## Revision visual `roadmap-review`

Fortalezas:

- Los tres minijuegos ya comparten libro, paleta, flores, paneles y botones.
- Preguntas y objetos son visualmente claros.
- Puzzle ya es funcional y tiene smoke test automatizado.

Brechas:

- Puzzle todavia necesita una pasada de composicion en bandeja/tablero.
- Objetos ya fue revalidado con captura final; queda pendiente mejorar el estado del boton siguiente deshabilitado.
- Final recibio un primer pulido visual tipo album, pero todavia puede crecer como recompensa.
- Los globos y headers cumplen funciones similares, pero no todos usan el mismo componente base.

Prioridad inmediata dentro de etapa 3:

1. Agregar feedback visual breve al colocar piezas/encontrar objetos.
2. Pulir bandeja del puzzle.
3. Pulir estado visual del boton siguiente deshabilitado si todavia se confunde con decoracion.
4. Separar preguntas a JSON externo cuando el contenido final este mas estable.
5. Mover coordenadas repetidas de minijuegos a `SCENE_LAYOUTS` cuando el layout deje de moverse.

## Transiciones

Estado actual:

- No hay animacion de paso de pagina.
- Al completar un minijuego, se salta al siguiente.

Decision vigente:

- Mantener flujo directo hasta que los minijuegos esten visualmente estables.
- Reincorporar transicion de pagina solo cuando exista sprite final grande y alineado al libro.

## Riesgos

- Medio en puzzle por drag/drop.
- Bajo en quiz si solo se modifican datos y textos.
- Medio en objetos si se cambian coordenadas o hit areas.

## Actualización del ciclo (2026-08-14, v7)

- Cambios implementados:
  - Reforcé el estado visual del botón **Siguiente** bloqueado en `src/ui.js` (`addNextButton`) con backdrop/halo y lock explícito para mejorar la claridad entre decorado y control.
  - Ajusté distancia de respuestas de “Preguntas” (`SCENE_LAYOUTS.quiz.answerGap`).
  - Mantengo feedback visual breve de piezas (`glow` + corazón) y objetos (`sparkle` + corazón) al completar acciones correctas.
- Test ejecutados:
  - `node --check src/main.js`, `src/ui.js`, `src/data.js`, `src/layouts.js`
  - `node tools/puzzle-cdp-test.mjs` (intermitente: `Puzzle scene did not initialize` en este entorno)
  - `node tools/objects-cdp-test.mjs` (intermitente: `Objects scene did not initialize` en este entorno)
  - Capturas: `tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v7`
- Próximo paso sugerido:
  - Continuar con la unificación de encabezados/globos/estados entre pantallas para dejar la etapa con consistencia completa de UI.
## Actualización del ciclo (2026-08-14, v8)

- Cambios implementados:
  - Corregimos textos con codificación rota que seguían en pantallas de juego (`src/main.js`), incluyendo:
    - texto narrativo de preguntas,
    - mensaje de "Agrega imágenes..." en rompecabezas,
    - mensaje de instrucciones para objetos,
    - feedback de objetos encontrados,
    - mensaje de cierre en escena final.
  - Se mantuvo la mecánica base:
    - mezcla de opciones en preguntas,
    - un rompecabezas por juego,
    - hit areas amplias en objetos sin halo permanente,
    - estado bloqueado del botón Siguiente con fondo/lock.
- Pruebas ejecutadas:
  - `node --check src/main.js`
  - `node --check src/ui.js`
  - `node --check src/data.js`
  - `node --check src/layouts.js`
  - `node --check tools/puzzle-cdp-test.mjs`
  - `node --check tools/objects-cdp-test.mjs`
  - `BASE_URL=http://127.0.0.1:5330/index.html node tools/puzzle-cdp-test.mjs` *(intermitente: `Puzzle scene did not initialize` en este entorno)*
  - `BASE_URL=http://127.0.0.1:5330/index.html node tools/objects-cdp-test.mjs` *(intermitente: `Objects scene did not initialize` en este entorno)*
  - `tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v8`
- Observación:
  - En esta ejecución, las capturas se generaron pero con tamaño reducido; conviene validación manual adicional en navegador para confirmar contención visual.
- Próximo paso sugerido:
  - Completar la unificación visual de encabezados y globos entre escenas y cerrar la iteración de consistencia UI.
## ActualizaciÃ³n del ciclo (2026-08-14, v10)

- Minijuego 1 (Preguntas):
  - Se unificó el bloque de pregunta con el helper `RosaritoUI.addQuizQuestionPanel` (panel, nÃºmero y contador).
  - El panel mantiene el ajuste de texto automÃ¡tico y evita cÃ³digo especÃ­fico repetido en `showQuestion`.
- Estado:
  - Se dio seguimiento a la consistencia visual entre encabezados y paneles.
  - Se conservaron los cambios de separaciÃ³n de tarjetas y la semÃ¡ntica de pregunta.
- Test del ciclo:
  - `node --check src/main.js`
  - `node --check src/ui.js`
  - `node tools/puzzle-cdp-test.mjs` *(intermitente: `Puzzle scene did not initialize` en entorno local con Edge headless)*
  - `node tools/objects-cdp-test.mjs` *(intermitente: `Objects scene did not initialize` en entorno local con Edge headless)*
  - `tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v10`
- Ajuste de siguiente etapa sugerido:
  - Extraer coordenadas del bloque de pregunta a `SCENE_LAYOUTS.quiz` y terminar limpieza de constantes visuales para Etapa 3.
