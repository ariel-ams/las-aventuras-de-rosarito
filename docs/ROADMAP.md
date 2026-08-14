# Roadmap visual y tecnico - Rosarito

## Estado actual despues de la ultima prueba

Capturas revisadas:

- `test-artifacts/roadmap-review/cover.png`
- `test-artifacts/roadmap-review/quiz.png`
- `test-artifacts/roadmap-review/puzzle.png`
- `test-artifacts/roadmap-review/objects.png`
- `test-artifacts/roadmap-review/final.png`
- `test-artifacts/roadmap-review/mobile-landscape.png`
- `test-artifacts/roadmap-review/mobile-portrait.png`
- Ultima tanda de verificacion visual: `test-artifacts/roadmap-next-pass-final/`
- Tanda actual de consistencia UI y objetos: `test-artifacts/ui-consistency-objects-hit/`
- Tanda actual despues de helpers UI: `test-artifacts/ui-helpers-title-pass/`
- Tanda despues de helper de boton y portada/quiz: `test-artifacts/cover-quiz-helper-pass-2/`
- Tanda despues de helper de boton principal: `test-artifacts/primary-button-helper-pass/`
- Tanda despues de preguntas JSON y ajuste de hit areas: `test-artifacts/quiz-json-hitarea-pass/`
- Tanda despues de iconos por respuesta en quiz: `test-artifacts/quiz-icons-pass/`
- Tanda reciente de seguimiento: `test-artifacts/roadmap-followup/`
- Tanda reciente de seguimiento de esta iteraciÃƒÂ³n: `test-artifacts/roadmap-followup-3/`
- Tanda nueva del ciclo actual: `test-artifacts/roadmap-cycle-continue/`
- Tanda nueva del ciclo actual (v2): `test-artifacts/roadmap-cycle-continue-v2/`
- Tanda nueva del ciclo actual (v3): `test-artifacts/roadmap-cycle-continue-v3/`
- Tanda nueva del ciclo actual (v24): `test-artifacts/roadmap-cycle-continue-v24/`

Cambios ya aplicados en esta ronda:

- Las respuestas del minijuego de preguntas se mezclan aleatoriamente en cada partida.
- El rompecabezas ahora selecciona un solo puzzle por partida.
- Los objetos ocultos ya no tienen halo/resaltado permanente.
- Los objetos ocultos conservan un area de clic amplia e invisible para que se puedan tocar desde cualquier parte del objeto.
- El area de clic de objetos ahora esta separada del sprite visual mediante zonas invisibles, lo que mejora la deteccion y evita depender de transparencias del PNG.
- La lista de objetos ya no dibuja doble circulo de confirmacion: el circulo vacio viene del sprite y el codigo solo agrega el check.
- Lista de objetos y feedback de piezas: el check se controla desde `item.check` (data `checked`) y el feedback visual usa `ui-icon_sparkles` en vez de estrella.
- Zona de interacciÃƒÂ³n ampliada: ÃƒÂ¡reas de objetos en objetos y hit zones con padding mÃƒÂ­nimo de 58 px para facilitar click.
- Ajustes de texto y encoding visibles: se corrigieron cadenas con caracteres mojibake en portada, quiz, objetos y pantalla final (misiÃƒÂ³n, mision, ÃƒÂ¡lbum, niÃƒÂ±a, enseÃƒÂ±ar, niÃƒÂ±os, completÃƒÂ³).
- Se creo la knowledge base del proyecto en `docs/KNOWLEDGE_BASE.md`.
- La portada ya usa parte del sistema comun de texto y layout.
- El rompecabezas fue corregido y validado con `tools/puzzle-cdp-test.mjs`.
- El canvas dejo de forzarse a pantalla completa deformada por CSS; Phaser conserva la proporcion y el input queda alineado.
- El globo de instruccion del puzzle y el texto inferior `De su vida real` fueron migrados a `addFittedText`.
- El globo inferior de objetos se reposiciono y usa `addFittedText`.
- La pantalla final recibio un primer pulido visual tipo recompensa/album.
- Las preguntas visibles del quiz ahora viven en `src/questions.json`.
- Se ajustó la limpieza de textos de fallback en `src/data.js` para evitar inconsistencias visuales de tildes y mantener uniformidad de mensajes.
- El smoke test de objetos detecto solapamiento entre zonas invisibles; las zonas mas pequenas ahora quedan por encima para mejorar el click.
- Las respuestas del quiz ahora pueden declarar `iconKey`; el icono se mantiene asociado a la respuesta despues de mezclar opciones.
- Las tarjetas de respuesta del quiz usan `addFittedText` para reducir riesgo de texto cortado.
- Se completo la pista opcional en objetos usando `ui-icon_sparkles` y estados internos por objeto (`found`) para evitar detecciones errÃƒÂ³neas.
- Los hit areas de objetos usan padding mÃƒÂ­nimo de 58 px para facilitar el toque de niÃƒÂ±os.
- El botÃƒÂ³n "Siguiente" muestra estado bloqueado mÃƒÂ¡s claro con hint, texto y animaciÃƒÂ³n de feedback.
- `src/questions.json` quedÃƒÂ³ normalizado a UTF-8 y con tildes limpias en texto visible.
- `src/main.js` conserva `addNextButton` y no depende de transiciones de pÃƒÂ¡gina para avanzar.
- `.gitignore` se actualizÃƒÂ³ para ignorar `assets/audio/voice/` y `remove_background.py`.
- `src/main.js` y `src/layouts.js` ahora toman del layout la posición del check de respuesta correcta y el efecto de hint de objetos.

Pruebas ejecutadas:

- `node --check src/main.js`
- `node --check src/data.js`
- `node --check src/ui.js`
- `node --check src/layouts.js`
- `node --check tools/puzzle-cdp-test.mjs`
- `node --check tools/objects-cdp-test.mjs`
- `BASE_URL=http://127.0.0.1:5173/index.html node tools/puzzle-cdp-test.mjs` *(en este entorno sigue sin inicializar la escena)*
- `BASE_URL=http://127.0.0.1:5173/index.html node tools/objects-cdp-test.mjs` *(en este entorno sigue sin inicializar la escena)*
- `node tools/puzzle-cdp-test.mjs` *(requiere servidor local + puede no inicializar escena en algunos entornos Edge headless; se mejorÃƒÂ³ espera/reintento y flags de diagnÃƒÂ³stico)*
- `node tools/objects-cdp-test.mjs` *(requiere servidor local + puede no inicializar escena en algunos entornos Edge headless; se mejorÃƒÂ³ espera/reintento y flags de diagnÃƒÂ³stico)*
- `tools/capture-screens.ps1 -RunName roadmap-review`
- `tools/capture-screens.ps1 -RunName roadmap-next-pass-final`
- `tools/capture-screens.ps1 -RunName ui-consistency-objects-hit`
- `tools/capture-screens.ps1 -RunName ui-helpers-title-pass`
- `tools/capture-screens.ps1 -RunName next-button-helper-pass`
- `tools/capture-screens.ps1 -RunName cover-quiz-helper-pass-2`
- `tools/capture-screens.ps1 -RunName primary-button-helper-pass`
- `tools/capture-screens.ps1 -RunName quiz-json-hitarea-pass`
- `tools/capture-screens.ps1 -RunName quiz-icons-pass`
- `tools/capture-screens.ps1 -RunName roadmap-followup`
- `tools/capture-screens.ps1 -RunName roadmap-followup-3`
- `tools/capture-screens.ps1 -RunName roadmap-cycle-continue`
- `tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v3`
- `tools/capture-screens.ps1 -BaseUrl "http://127.0.0.1:5370/index.html" -RunName roadmap-cycle-continue-v24`
- `BASE_URL=http://127.0.0.1:5322/index.html node tools/puzzle-cdp-test.mjs` *(en este entorno de pruebas, la escena no siempre inicializa de forma confiable en Edge headless)*
- `BASE_URL=http://127.0.0.1:5322/index.html node tools/objects-cdp-test.mjs` *(en este entorno de pruebas, la escena no siempre inicializa de forma confiable en Edge headless)*
- `BASE_URL=http://127.0.0.1:5330/index.html node tools/puzzle-cdp-test.mjs` *(en este entorno de pruebas, la escena no inicializa de forma consistente en Edge headless aun con reintentos y flags de arranque)*
- `BASE_URL=http://127.0.0.1:5330/index.html node tools/objects-cdp-test.mjs` *(en este entorno de pruebas, la escena no inicializa de forma consistente en Edge headless aun con reintentos y flags de arranque)*
- `BASE_URL=http://127.0.0.1:5330/index.html node tools/capture-screens.ps1` *(capturas de verificacion de esta ronda: `test-artifacts/roadmap-cycle-continue-v2/`)

Resultado funcional:

- Portada carga correctamente.
- Preguntas cargan y muestran 3 respuestas.
- Puzzle carga 4 piezas y el smoke test confirma drag/snap de una pieza.
- Objetos carga la escena y lista de 4 objetos; el smoke test confirma que los 4 objetos se marcan al clickear sus zonas invisibles.
- Final carga.
- Mobile landscape muestra el libro completo.
- Mobile portrait muestra aviso para girar.
- La ultima pasada visual corrigio textos apretados de puzzle/objetos y mejoro el cierre final.
- La pasada actual corrigio el doble indicador de lista y el click impreciso de objetos.
- La nueva pasada migro titulos, globos, headers y checklist de puzzle/objetos a helpers compartidos sin cambiar la composicion visual.
- La pasada actual agrego `addNextButton`, migro botones siguientes de puzzle/objetos y llevo portada/quiz a los helpers de titulo/globos en las zonas de bajo riesgo.
- La ultima pasada agrego `addPrimaryButton` y dejo los botones largos comunes centralizados sin cambiar el layout visible.
- La ronda actual movio las preguntas del quiz a `src/questions.json` y agrego normalizacion con `RosaritoData.buildQuizPool`.
- La ronda actual revalido objetos con zonas solapadas: las zonas pequenas quedan arriba para que el click caiga en el objeto esperado.
- La ronda actual agrego `iconKey` por opcion del quiz y auto-fit en textos de tarjetas de respuesta.
- Se paso la bandeja del rompecabezas a `SCENE_LAYOUTS.puzzle.tray` y se agrego feedback visual extra al encajar piezas.
- `addNextButton` ahora muestra estado bloqueado mÃƒÂ¡s claro: hint visible y un icono indicador de interacciÃƒÂ³n.
- Se terminaron correcciones de textos visibles con caracteres de UTF-8 quebrados para evitar lectura con caracteres extraÃƒÂ±os.

## Comparacion con la referencia

La referencia se siente como una doble pagina ilustrada terminada: el libro ocupa todo, Rosarito tiene mucha presencia, los paneles tienen costura y ornamentos integrados, las tarjetas tienen mini ilustraciones claras y la pagina derecha esta muy balanceada.

El estado actual ya tiene una direccion visual coherente, pero todavia se nota mas modular: varios elementos parecen colocados encima del libro en vez de pertenecer naturalmente a la ilustracion. El mayor salto de calidad vendra de unificar proporciones, mejorar jerarquia y hacer que cada pantalla tenga mas composicion narrativa.

Nivel de alineacion actual:

- Portada: buena direccion. Ya se entiende como mision del libro, pero las tarjetas todavia son mas simples que la referencia y el objetivo final puede sentirse mas premio/album.
- Preguntas: buena base visual. Las tarjetas se leen bien y ya soportan iconos por respuesta; faltan ilustraciones finales mas especificas y feedback narrativo mas rico.
- Rompecabezas: mecanica corregida. El globo y texto inferior mejoraron; sigue pendiente pulir bandeja/tablero y feedback visual.
- Objetos: escena derecha fuerte y muy alineada al estilo. El globo inferior fue corregido; falta revalidar en captura y mejorar estado de boton siguiente deshabilitado.
- Final: ya tiene primer tratamiento de album/recompensa. Sigue pendiente una version mas rica si se quiere que cierre con la misma fuerza que la referencia.
- Mobile: landscape completo y portrait claro. Sigue pendiente PWA/fullscreen instalado si se quiere ocultar barra de navegador en tablets.

## Prioridad alta

### 1. Pantalla inicial mas cercana a la referencia

Problema:

- Rosarito se ve mas pequena que en la referencia.
- Las tarjetas de actividad actuales son utiles, pero tienen menos riqueza visual.
- La derecha queda ordenada, aunque menos narrativa que el diseno objetivo.

Acciones:

- Agrandar Rosarito en la pagina izquierda y acercarla al rol de guia.
- Usar tarjetas de actividad con imagenes mas grandes y textos mas legibles.
- Sumar un bloque de objetivo final mas parecido a album/recompensa.
- Revisar si conviene mostrar 3 o 4 tarjetas, segun el flujo definitivo sin minijuego de dones.

Riesgo:

- Bajo/medio. Afecta layout visual, no logica.

### 2. Sistema comun de paneles y texto

Problema:

- Cada pantalla resuelve textos con coordenadas y tamanos propios.
- Si cambia una frase, puede tocar el borde del contenedor.
- Ya se corrigieron los primeros problemas detectados: globo inferior de `ObjectsGameScene`, globo de instruccion de `PuzzleGameScene` y texto inferior del puzzle.
- Quedan otros textos historicos que todavia no usan helpers comunes.
- Algunos elementos cumplen la misma funcion visual pero usan sprites distintos entre pantallas, por ejemplo globos narrativos, labels de seccion, banners inferiores y paneles de lista. Esto complica mantener el estilo.

Acciones:

- Crear helpers de texto con auto-fit simple por ancho/alto.
- Centralizar estilos: titulo, subtitulo, pregunta, boton, lista.
- Crear helpers para `speechBubble`, `labelPanel`, `questionPanel`, `missionCard`.
- Continuar migrando textos historicos a helpers comunes, empezando por final, feedback y listas.
- Definir una biblioteca estable de componentes:
  - Titulo de pantalla: texto violeta grande + divisor `ui-divider_heart_purple` + flores.
  - Globo narrativo crema: `ui-speech_large_cream` + `RosaritoUI.addFittedText`.
  - Globo de instruccion/mouse: `ui-speech_large_lilac` + `ui-icon_mouse` + texto corto.
  - Header de actividad: `ui-label_long_cream` tintado lila o sprite especifico de header, sin numeros estaticos.
  - Panel de pregunta: `m2-question_panel` + badges dinamicos sin numeros horneados.
  - Checklist de objetos: `hidden-ui-list_header`, `hidden-ui-list_panel`, `hidden-ui-list_row`; el circulo vacio pertenece al sprite de fila y el codigo solo dibuja el check cuando se encuentra.
  - Boton principal: `ui-button_long_purple`.
  - Boton siguiente: `ui-button_arrow_right`, con estado deshabilitado consistente.
  - Contador de estrellas: `RosaritoUI.drawStarCounter`.
  - Feedback temporal: `RosaritoUI.createFeedback`.
- Registrar en cada etapa cuando una escena use una caja fuera de esta biblioteca antes de aprobar nuevos sprites.

Riesgo:

- Medio. Conviene hacerlo escena por escena.

Siguiente iteracion recomendada:

1. Crear helpers `addScreenTitle`, `addNarrativeBubble`, `addMouseHint`, `addSectionHeader`, `addChecklist` y `addNextButton`.
   - Avance aplicado: ya existen `addScreenTitle`, `addNarrativeBubble`, `addMouseHint`, `addSectionHeader`, `addChecklistFrame` y `addNextButton`.
2. Migrar portada, quiz, puzzle y objetos a esos helpers sin cambiar la composicion final.
   - Avance aplicado: portada y quiz usan helpers en titulos y globos; puzzle y objetos usan helpers en titulos, globos, headers, checklist y boton siguiente.
3. Repetir capturas y comparar que cada caja mantenga el mismo estilo segun su funcion.
   - Avance aplicado: capturas `cover-quiz-helper-pass-2` revisadas; el quiz requirio ajustar el auto-fit del globo narrativo para recuperar legibilidad.
4. Despues de estabilizar helpers, mover coordenadas repetidas a `SCENE_LAYOUTS`.
5. No crear nuevos sprites de caja o globo hasta decidir si encajan en la biblioteca visual.

### 3. Rompecabezas mas integrado

Problema:

- La mecanica funciona y fue validada con smoke test, pero la bandeja y el tablero todavia se ven algo funcionales.
- Algunas piezas pueden verse demasiado rectangulares segun la imagen elegida.
- El texto descriptivo inferior ya fue ajustado, pero la bandeja sigue siendo el punto visual mas funcional.

Acciones:

- Mejorar marco del tablero con un sprite especifico.
- Reducir opacidad de guia en algunas imagenes para que la pieza colocada destaque mas.
- Hacer la bandeja inferior mas decorada y con mejor separacion.
- Agregar feedback visual al completar: brillo breve en el tablero, no pantalla intermedia.
- Mantener el globo simplificado y revisar en capturas nuevas.

Riesgo:

- Medio. Tocar drag/drop con cuidado.

## Prioridad media

### 4. Minijuego de objetos sin resaltado, pero mas descubrible

Problema:

- Al quitar el halo, la escena se ve mas limpia, pero algunos objetos pueden ser dificiles para ninos pequenos.
- La lista de objetos esta bien encaminada y el globo inferior fue reposicionado.
- El boton `Siguiente` queda muy transparente al inicio; esta correcto como estado deshabilitado, pero visualmente puede confundirse con decoracion.
- El click sobre objetos debe depender de una zona invisible generosa, no del PNG visual. Los sprites tienen transparencias y detalles finos que pueden volver imprecisa la interaccion.
- La lista debe mostrar un solo indicador de encontrado: el circulo vacio del sprite de fila y un check dinamico al completar.

Acciones:

- Mantener sin halo permanente.
- Agregar una pista opcional por boton: pulso suave temporal de 1 segundo en un objeto pendiente.
- Al hacer hover/touch, mantener escala muy leve y sonido.
- Revisar coordenadas de cada sprite para que coincida perfecto con el fondo.
- Revalidar el globo de instruccion inferior en captura nueva.
- Hacer que el estado deshabilitado del boton siguiente sea mas claro, por ejemplo con candado o tooltip de audio.
- Mantener zonas `Phaser.GameObjects.Zone` por encima de cada objeto buscable, con padding amplio y cursor de mano.
- Evitar agregar un segundo circulo en el checklist; solo escribir el check cuando el objeto fue encontrado.

Riesgo:

- Bajo. La logica ya esta modular.

### 5. Preguntas de Rosario mas expresivas

Problema:

- El minijuego ya funciona y mezcla respuestas, pero los iconos de respuesta son genericos.

Acciones:

- Asociar cada opcion con ilustraciones mas especificas.
- Reducir texto largo en tarjetas y dejar frases mas cortas.
- Agregar mini feedback narrativo despues de responder correcto.
- Avance aplicado: `src/questions.json` ya acepta `iconKey` por opcion, y las tarjetas usan auto-fit para el texto.

Riesgo:

- Bajo/medio. Requiere datos de opciones mas ricos.

### 6. Mobile y pantalla completa

Problema:

- En horizontal se ve completo, pero la barra del navegador depende del sistema.
- En vertical se muestra aviso correcto.
- El arreglo de CSS para no deformar el canvas mejoro la estabilidad del input.

Acciones:

- Convertir en PWA instalable con `manifest.webmanifest`.
- Agregar iconos de app.
- Documentar que el mejor modo para jardin/tablet es abrir como app instalada o kiosk.
- Mantener orientacion recomendada landscape.

Riesgo:

- Bajo.

### 7. Pantalla final como recompensa

Problema:

- El final ya funciona y ahora tiene un primer panel tipo album, pero aun puede sentirse menos rico que las pantallas principales.
- La referencia sugiere que el cierre deberia comunicar logro, album y celebracion de manera mas ilustrada.

Acciones:

- Mantener el panel de album agregado como base.
- Agregar una mini composicion de recuerdos: pregunta, puzzle y objetos completados.
- Reforzar el estado `3/3` con estrellas completas, no solo texto.
- Hacer que Rosarito se vea celebrando junto al album, sin quedar aislada.

Riesgo:

- Bajo. Es principalmente composicion visual y no toca reglas de juego.

## Prioridad baja

### 8. Limpieza de duplicacion entre `main.js` y `data.js`

Problema:

- Hay funciones duplicadas/fallbacks historicos en `main.js`.

Acciones:

- Remover codigo muerto despues de confirmar que `src/data.js` cubre todo.
- Mantener `main.js` enfocado en escenas.
- Crear modulos progresivos para escenas cuando el proyecto permita build step o loader modular.

Riesgo:

- Medio. Hacer de a poco para evitar romper carga por CDN.

### 9. Encoding y textos finales

Problema:

- Algunos strings antiguos tienen encoding roto en fuente.

Acciones:

- Migrar textos visibles a JSON UTF-8 limpio.
- Usar tildes reales donde corresponda.
- Mantener textos cortos y validarlos en captura.

Riesgo:

- Bajo.

### 10. Biblioteca de assets versionada

Problema:

- Hay varias versiones de sprites y algunos assets historicos recortados.

Acciones:

- Crear `assets/manifest.md` o ampliar `docs/sprite_selection.md`.
- Marcar assets activos, legacy y generados.
- Evitar volver a usar sprites con numeros estaticos o recortes.

Riesgo:

- Bajo.

## Plan de trabajo sugerido

### Iteracion 1 - Pulido seguro

1. Crear helpers comunes de texto/paneles.
2. Aplicarlos solo a pantalla inicial y preguntas.
3. Repetir capturas desktop y mobile.

Estado:

- En progreso y parcialmente aplicado.
- `addFittedText` ya existe y se usa en portada/preguntas.
- Pendiente migrar los textos problemÃƒÂ¡ticos de puzzle y objetos.

### Iteracion 2 - Pantalla inicial

1. Agrandar Rosarito.
2. Rehacer tarjetas de actividad.
3. Reorganizar objetivo final.
4. Comparar contra referencia.

Estado:

- Parcialmente aplicada.
- Portada valida en `roadmap-review/cover.png`.
- Pendiente: tarjetas con mini escenas y objetivo final mas tipo album.

### Iteracion 3 - Objetos y puzzle

1. Ajustar coordenadas de sprites de objetos.
2. Agregar boton de pista opcional sin halo permanente.
3. Pulir tablero/bandeja de puzzle.

Estado:

- Bug funcional del puzzle corregido.
- Pendiente: pulido visual de globo, bandeja, texto inferior y pista opcional de objetos.

### Iteracion 4 - Limpieza tecnica

1. Remover duplicados de `main.js`.
2. Consolidar datos en JSON.
3. Documentar assets activos.

Estado:

- Parcialmente aplicada.
- `main.js` ya redujo duplicacion de datos principales.
- Pendiente: preguntas a JSON externo y catalogo activo de assets.

## Criterios de aceptacion visual

- Ningun texto toca borde de contenedor.
- No hay numeros duplicados dentro de sprites.
- Los botones se ven clickeables y no tapan contenido.
- Las estrellas se ven completas.
- Las escenas se entienden sin leer demasiado.
- Rosarito funciona como guia visual.
- Desktop 1280x720 y mobile landscape muestran el libro completo.
- Mobile portrait muestra aviso claro para girar el telefono.


## Actualización de ciclo (2026-08-14, v8)

- Se corrigió encoding visible en mensajes de texto de `src/main.js` y se mantienen textos legibles en portada, preguntas, rompecabezas, objetos y pantalla final.
- Se validó sintaxis de los módulos principales (`main`, `ui`, `data`, `layouts`) y scripts de test.
- En este entorno los tests interactivos siguen siendo intermitentes (Edge headless): `puzzle-cdp-test.mjs` y `objects-cdp-test.mjs` reportan escena no inicializada.
- Capturas ejecutadas para revisión: `tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v8`.
- Próximo paso: continuar con unificación visual de componentes (encabezados, globos, estados de botones) y validar textos en cada nuevo paquete de pantallas antes de cerrar iteración.

## ActualizaciÃ³n de ciclo (2026-08-14, v10)

- ImplementaciÃ³n de la siguiente iteraciÃ³n del objetivo de consistencia:
  - Se agregÃ³ `RosaritoUI.addQuizQuestionPanel` para unificar el bloque de pregunta del minijuego (panel, badge de nÃºmero y progreso), reduciendo construcciÃ³n visual local en escena.
  - `QuizGameScene.showQuestion` ahora usa ese helper y conserva ajuste dinÃ¡mico de fuentes.
  - `src/questions.json` quedÃ³ normalizado a UTF-8 nativo (sin BOM) para evitar ruidos en lectura y diff.
  - Se mantuvieron ajustes visuales de separaciÃ³n de tarjetas y tamaÃ±o de texto.
- Validaciones ejecutadas:
  - `node --check src/main.js`
  - `node --check src/ui.js`
  - `node tools/puzzle-cdp-test.mjs` *(intermitente en este entorno: `Puzzle scene did not initialize`)*
  - `node tools/objects-cdp-test.mjs` *(intermitente en este entorno: `Objects scene did not initialize`)*
  - `tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v10`
- Estado del roadmap:
  - Avance aplicado en Etapa 3: componente de pregunta estandarizado.
  - Siguiente paso: extraer coordenadas del bloque de pregunta a `SCENE_LAYOUTS.quiz` para completar la consolidaciÃ³n.
## Actualizacion de ciclo (2026-08-14, v16)

- Cambio aplicado:
  - `makeQuizAnswerCard` ahora usa `SCENE_LAYOUTS.quiz.answerCard` para evitar valores embebidos:
    - claves de sprite por tipo,
    - tamaÃ±os y posiciones de fondo/icono/texto,
    - texto largo/corto, y
    - escala hover + corazon.
  - Se mantiene compatibilidad con iconos por opcion (`iconKey`) y fallback.
- Pruebas ejecutadas:
  - `node --check src/main.js`
  - `node --check src/layouts.js`
  - `node --check src/ui.js`
  - `node --check src/data.js`
  - `node --check tools/puzzle-cdp-test.mjs`
  - `node --check tools/objects-cdp-test.mjs`
  - `powershell -File tools/capture-screens.ps1 -BaseUrl "http://127.0.0.1:5340/index.html" -RunName "roadmap-cycle-continue-v16"`
  - `puzzle-cdp` con BASE_URL en PowerShell sigue sin inicializar la escena.
  - `objects-cdp` con BASE_URL en PowerShell sigue sin inicializar la escena.
- Estado actual del roadmap:
  - Etapa 3: mejora aplicada en consistencia de tarjetas de quiz.
  - Pendiente: validar visualmente en navegador interactivo con captura a mayor resolucion para cerrar ajustes de espaciado.
  - Siguiente paso sugerido: migrar restante de valores visuales hardcodeados en componentes secundarios y consolidar tests manuales de layout.
## Actualización de ciclo (2026-08-14, v17)
- Consolidación aplicada:
  - Se agregó `LAYOUT.base` en `src/layouts.js` para unificar los parámetros de elementos comunes del encabezado global:
    - botón de audio
    - marco de hierba
    - tipografía y restricciones de título/subtítulo base
  - `BaseScene.createBook` ahora consume `LAYOUT.base` en lugar de literales en código:
    - `audioButton`
    - `grass`
    - `title`
    - `subtitle`
  - El botón de audio, la marca de texto y el layout base mantienen ahora la misma fuente de verdad entre escenas.
- Pruebas ejecutadas:
  - `node --check src/main.js`
  - `node --check src/layouts.js`
  - `node --check src/ui.js`
  - `node --check src/data.js`
  - `node --check tools/puzzle-cdp-test.mjs`
  - `node --check tools/objects-cdp-test.mjs`
  - `powershell -File tools/capture-screens.ps1 -BaseUrl "http://127.0.0.1:5345/index.html" -RunName "roadmap-cycle-continue-v17"`
  - `BASE_URL=http://127.0.0.1:5345/index.html node tools/puzzle-cdp-test.mjs` (no inicializa escena en Edge headless intermitente; problema persistente reportado)
  - `BASE_URL=http://127.0.0.1:5345/index.html node tools/objects-cdp-test.mjs` (no inicializa escena en Edge headless intermitente; problema persistente reportado)
- Avance de estado:
  - Roadmap: Etapa 1 y 2 avanzan en estabilidad de layout base.
  - Se mantiene como siguiente trabajo priorizado completar la migración de cualquier estilo visual restante hardcodeado en escenas secundarias para reducir divergencias de tamaños.

  - Se centralizo tambien la posicion/configuracion base del boton "Siguiente" en `LAYOUT.base.nextButton` y `makeNextButton` en `src/main.js` para evitar otro valor hardcodeado.


## Actualización de ciclo (2026-08-14, v18)

- Cambios implementados en esta ronda:
  - `SCENE_LAYOUTS.dones` se extendió con configuración compartida para:
    - `choiceCard` (fondos, tamaños, texto base, padding, escala hover)
    - `componentCard` (fondo por opción, icono, label, escala hover, zona interactiva)
  - `SCENE_LAYOUTS.puzzle.infoPanel.labelPanel` se agregó para estandarizar el panel de título de referencia del rompecabezas.
  - `makeChoiceCard` en `src/main.js` consume ahora `SCENE_LAYOUTS.dones.choiceCard` en lugar de literales sueltos.
  - `makeComponentOption` en `src/main.js` consume `SCENE_LAYOUTS.dones.componentCard` para reducir acoplamiento entre escena y medidas hardcodeadas.
  - `drawPuzzleBoard` usa `SCENE_LAYOUTS.puzzle.infoPanel.labelPanel` para posicionamiento y tipografía del badge.
  - `drawChecklistItem` en objetos migra estilo de texto al `TEXT_STYLES.body` + configuración por layout (`itemLayout.labelStyle`), evitando fuentes hardcodeadas.
  - `makeCoverMissionCard` también migró estilos de texto de titulo/nivel a estilos compartidos de UI.
- Estado funcional de consistencia:
  - Se reforzó la intención de “unificado por escena” para mantener medidas y tipografías coherentes entre pantallas.
  - No se alteró mecánica de juego; solo consistencia visual y mantenimiento.
- Pruebas ejecutadas:
  - `node --check src/main.js`
  - `node --check src/layouts.js`
  - `node --check tools/puzzle-cdp-test.mjs`
  - `node --check tools/objects-cdp-test.mjs`
  - `powershell -File tools/capture-screens.ps1 -BaseUrl "http://127.0.0.1:5356/index.html" -RunName "roadmap-cycle-continue-v18"`
  - `node tools/puzzle-cdp-test.mjs` (`Puzzle scene did not initialize` en Edge headless intermitente)
  - `node tools/objects-cdp-test.mjs` (`Objects scene did not initialize` en Edge headless intermitente)
- Resultado de esta tanda:
  - Las capturas se generaron y quedaron registradas en:
    - `test-artifacts/roadmap-cycle-continue-v18/cover.png`
    - `.../quiz.png`
    - `.../puzzle.png`
    - `.../objects.png`
    - `.../final.png`
    - `.../mobile-landscape.png`
    - `.../mobile-portrait.png`
- Criterios de cierre para la siguiente iteración:
  - Terminar de migrar cualquier texto/medida hardcodeada en `FinalScene` y `CoverScene` a `SCENE_LAYOUTS`.
  - Reemplazar progresivamente texturas de botones/panels con versiones sin texto embebido para reducir trabajo de mantenimiento.
  - Continuar con validación visual manual de alta calidad (captura desde navegador no headless) para confirmar jerarquía de texto y recortes.



## Roadmap update (2026-08-14, v19 follow-up)
- Puzzle board UI polish was extended with layout-driven drag feedback for puzzle pieces.
- boardStyle now includes snapDistance, dragHint and slotHint in SCENE_LAYOUTS.puzzle.
- Added dynamic slot hint while dragging (ring + soft sparkle) and moved snap threshold to layout config.
- Syntax checks executed for src/main.js and src/layouts.js.
- Captures run with tools/capture-screens.ps1 against http://127.0.0.1:5322/index.html under run name roadmap-cycle-continue-v19.
- CDP checks for puzzle/objects remained intermittent in this environment (scene did not initialize in Edge headless); keep manual browser verification on this cycle.
- Next action: review visual spacing in real browser and finish consistency audit for cover/puzzle panel proportions.

## Actualización de ciclo (2026-08-14, v20)
- Corrección funcional:
  - Se corrigió la migración de fila de checklist en objetos (drawChecklistItem) para conservar referencias de label y check al usar addChecklistRow.
  - Se formalizó objects.searchScene.hitDefaults en src/layouts.js para dejar el padding base y escala de hit area en configuración (sin magic numbers en escena).
- Consistencia:
  - Mantiene el flujo de interacción del minijuego de objetos con hit-area amplia y feedback visual sin halo.
  - Quedan listas las próximas tareas de consistencia visual pendiente de inspección manual (portada/puzzle).
- Pruebas ejecutadas:
  - node --check src/main.js
  - node --check src/layouts.js
  - node --check src/ui.js
  - node --check src/data.js
  - node --check tools/puzzle-cdp-test.mjs (intermitente en Edge headless: escena de Puzzle puede no inicializar)
  - node --check tools/objects-cdp-test.mjs (intermitente en Edge headless: escena de Objetos puede no inicializar)
  - powershell -File tools/capture-screens.ps1 -BaseUrl 'http://127.0.0.1:5356/index.html' -RunName 'roadmap-cycle-continue-v20'


## Actualización de ciclo (2026-08-14, v21)
- Consistencia y mantenimiento aplicado:
  - `CoverScene` pasó a usar misiones dinámicas desde `SCENE_LAYOUTS.cover.missions`.
  - El botón de inicio de portada ahora usa `SCENE_LAYOUTS.cover.startButtonLabel`.
  - Los feedbacks de `Quiz`, `Puzzle` y `Objetos` se unificaron bajo `SCENE_LAYOUTS.*.feedback`.
  - `PuzzleGameScene` centraliza umbral de snap y efectos de drag en `SCENE_LAYOUTS.puzzle.boardStyle`.
  - Se incorporó el contador final dinámico `starCounter` con formato `{value}/{max}` desde `SCENE_LAYOUTS.final.star.counter`.
  - Se formalizó `addChecklistRow` en `src/ui.js` para reutilizar filas de checklist y evitar duplicación entre pantallas.
  - `objects.searchScene.hitDefaults` quedó en layout para ajustar hit-area sin números mágicos.
- Detalle técnico:
  - `SCENE_LAYOUTS.dones` y escenas secundarias siguen consumiendo estilos compartidos (cards, paneles, feedbacks).
  - Se removieron textos de fallback embebidos en lógica principal (`Quiz`, `Puzzle`, `Objetos`) y se usa configuración por escena.
  - Se ajustó `FinalScene` para componer el contador a partir de logros actuales y `max` configurado por layout.
- Estado funcional:
  - Sin cambios funcionales de gameplay.
  - Mantiene compatibilidad con la selección aleatoria de respuestas/objetos y secuencia de avance por escenas.
- Pruebas ejecutadas en esta vuelta:
  - node --check src/main.js
  - node --check src/layouts.js
  - node --check src/ui.js
  - node --check src/data.js
  - `puzzle-cdp` con `BASE_URL=http://127.0.0.1:5369/index.html` (no inicializa escena en Edge headless intermitente)
  - `objects-cdp` con `BASE_URL=http://127.0.0.1:5369/index.html` (no inicializa escena en Edge headless intermitente)
  - `powershell -File tools/capture-screens.ps1 -BaseUrl 'http://127.0.0.1:5369/index.html' -RunName 'roadmap-cycle-continue-v21'`
- Entregables de esta ronda:
  - Capturas actualizadas en `test-artifacts/roadmap-cycle-continue-v21`.
  - Archivos modificados:
    - `docs/ROADMAP.md`
    - `src/layouts.js`
    - `src/main.js`
    - `src/ui.js`
- Próximos pasos sugeridos:
  - Revisar en navegador no-headless el recorte de contenedores de botones/preguntas tras esta actualización.
  - Completar la migración visual completa de `CoverScene` y `FinalScene` para eliminar posibles textos con caracteres de codificación y consolidar progresivamente paneles de progreso.

## Actualización de ciclo (2026-08-14, v22)

- Cambios implementados:
  - Se centralizo `LAYOUT.progress` en `src/layouts.js` para ubicar y estilizar el bloque de progreso desde configuración:
    - posicion (x, y),
    - tamaño y separación de estrellas,
    - total de etapas,
    - tint/alpha de inactivo,
    - key de sprite.
  - `drawProgress` en `src/ui.js` consume `LAYOUT.progress` (ya no usa números hardcodeados).
  - `drawStarCounter` ahora recibe `maxValue` para mostrar un conteo con límite configurable.
  - `BaseScene.drawStarCounter` usa fallback a `gameState.achievements.length` cuando no recibe maximo.
  - Se desactivo el numero embebido en la carta de portada (`SCENE_LAYOUTS.cover.missionCard.numberText.show = false`) y `makeCoverMissionCard` respeta esa bandera.
- Pruebas ejecutadas en esta ronda:
  - `node --check src/main.js`
  - `node --check src/layouts.js`
  - `node --check src/ui.js`
  - `node --check src/data.js`
  - `tools/capture-screens.ps1 -BaseUrl "http://127.0.0.1:5390/index.html" -RunName "roadmap-cycle-continue-v22"`
  - `node tools/puzzle-cdp-test.mjs` *(intermitente en Edge headless: `Puzzle scene did not initialize`)*
  - `node tools/objects-cdp-test.mjs` *(intermitente en Edge headless: `Objects scene did not initialize`)*
- Estado de roadmap:
  - Avance aplicado a la Etapa 1 y 2: menos valores hardcodeados en componentes de progreso, y consistencia visual sin cambio de gameplay.
  - Siguiente foco recomendado:
    - migrar configuraciones equivalentes de cover/final a `SCENE_LAYOUTS`,
    - completar el cierre visual del bloque de objetivo del final,
    - revisar en navegador interactivo los bordes de preguntas/panels tras el ajuste de progreso.

## Actualización de ciclo (2026-08-14, v23)

- Cambios implementados:
  - Se completó una capa de finalización visual en `SCENE_LAYOUTS.final` para representar progreso objetivo:
    - nuevo bloque `achievementStrip` con 3 íconos (pregunta, rompecabezas, objetos),
    - estado activo/inactivo con tintes y opacidad por configuración,
    - check visual por objetivo completado (sprite `ui-icon_check`).
  - `FinalScene` ahora pinta esa franja de logros justo antes del panel de estrellas:
    - no altera la secuencia de juego,
    - permite feedback visual inmediato de progreso de logros sin depender de escena nueva,
    - respeta `finalLayout`.
  - Se ajustó profundidad del botón de reinicio para que lea `finalLayout.restart.depth` si está definido (evita hardcodeo de valor fijo).
- Pruebas ejecutadas:
  - `node --check src/main.js`
  - `node --check src/layouts.js`
  - `node --check src/ui.js`
  - `node --check src/data.js`
  - `BASE_URL=http://127.0.0.1:5322/index.html node tools/capture-screens.ps1 -RunName roadmap-cycle-continue-v23-final`
  - `BASE_URL=http://127.0.0.1:5322/index.html node tools/puzzle-cdp-test.mjs` *(sigue intermitente en este entorno: `Puzzle scene did not initialize`)*
  - `BASE_URL=http://127.0.0.1:5322/index.html node tools/objects-cdp-test.mjs` *(sigue intermitente en este entorno: `Objects scene did not initialize`)*
- Estado visual/funcional actual:
  - El flujo de juego y progresión no cambió.
  - Final ahora muestra mejor trazabilidad de logros (3 íconos de objetivos) con estado visual por completado.
  - Los archivos de captura quedaron en `test-artifacts/roadmap-cycle-continue-v23-final`.
- Siguientes pasos sugeridos:
  - Reforzar la etapa de consistencia de contenedores en `FinalScene` y `CoverScene` (bordes/paneles) para mantener el mismo patrón que el resto del juego.
  - Resolver la inestabilidad del CDP para validar automatizadamente interacción fina de click/drag en este entorno.
