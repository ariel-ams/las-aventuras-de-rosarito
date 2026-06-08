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

Cambios ya aplicados en esta ronda:

- Las respuestas del minijuego de preguntas se mezclan aleatoriamente en cada partida.
- El rompecabezas ahora selecciona un solo puzzle por partida.
- Los objetos ocultos ya no tienen halo/resaltado permanente.
- Los objetos ocultos conservan un area de clic amplia e invisible para que se puedan tocar desde cualquier parte del objeto.
- El area de clic de objetos ahora esta separada del sprite visual mediante zonas invisibles, lo que mejora la deteccion y evita depender de transparencias del PNG.
- La lista de objetos ya no dibuja doble circulo de confirmacion: el circulo vacio viene del sprite y el codigo solo agrega el check.
- Se creo la knowledge base del proyecto en `docs/KNOWLEDGE_BASE.md`.
- La portada ya usa parte del sistema comun de texto y layout.
- El rompecabezas fue corregido y validado con `tools/puzzle-cdp-test.mjs`.
- El canvas dejo de forzarse a pantalla completa deformada por CSS; Phaser conserva la proporcion y el input queda alineado.
- El globo de instruccion del puzzle y el texto inferior `De su vida real` fueron migrados a `addFittedText`.
- El globo inferior de objetos se reposiciono y usa `addFittedText`.
- La pantalla final recibio un primer pulido visual tipo recompensa/album.

Pruebas ejecutadas:

- `node --check src/main.js`
- `node --check src/data.js`
- `node --check src/ui.js`
- `node --check src/layouts.js`
- `node --check tools/puzzle-cdp-test.mjs`
- `node --check tools/objects-cdp-test.mjs`
- `node tools/puzzle-cdp-test.mjs`
- `node tools/objects-cdp-test.mjs`
- `tools/capture-screens.ps1 -RunName roadmap-review`
- `tools/capture-screens.ps1 -RunName roadmap-next-pass-final`
- `tools/capture-screens.ps1 -RunName ui-consistency-objects-hit`
- `tools/capture-screens.ps1 -RunName ui-helpers-title-pass`
- `tools/capture-screens.ps1 -RunName next-button-helper-pass`
- `tools/capture-screens.ps1 -RunName cover-quiz-helper-pass-2`
- `tools/capture-screens.ps1 -RunName primary-button-helper-pass`

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

## Comparacion con la referencia

La referencia se siente como una doble pagina ilustrada terminada: el libro ocupa todo, Rosarito tiene mucha presencia, los paneles tienen costura y ornamentos integrados, las tarjetas tienen mini ilustraciones claras y la pagina derecha esta muy balanceada.

El estado actual ya tiene una direccion visual coherente, pero todavia se nota mas modular: varios elementos parecen colocados encima del libro en vez de pertenecer naturalmente a la ilustracion. El mayor salto de calidad vendra de unificar proporciones, mejorar jerarquia y hacer que cada pantalla tenga mas composicion narrativa.

Nivel de alineacion actual:

- Portada: buena direccion. Ya se entiende como mision del libro, pero las tarjetas todavia son mas simples que la referencia y el objetivo final puede sentirse mas premio/album.
- Preguntas: buena base visual. Las tarjetas se leen bien; faltan iconos especificos por respuesta y feedback narrativo mas rico.
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
- Pendiente migrar los textos problemáticos de puzzle y objetos.

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
