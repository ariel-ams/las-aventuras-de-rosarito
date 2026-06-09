# Knowledge Base - La aventura de Rosarito

## Proposito del proyecto

Juego web en Phaser para ninos de 3 a 5 anos inspirado en Rosario Vera Penaloza. La experiencia se presenta como un libro ilustrado interactivo: una pantalla inicial de mision, tres minijuegos y una pantalla final de logro.

El objetivo principal es que el juego sea visual, narrativo y amable para lectores iniciales. Por eso las pantallas priorizan ilustraciones, botones grandes, texto breve, audio opcional y feedback suave.

## Stack

- Runtime: navegador.
- Engine: Phaser 3.80.1 desde CDN.
- Entrada principal: `index.html`.
- Estilos de pagina: `src/styles.css`.
- Escenas y gameplay: `src/main.js`.
- Layouts compartidos: `src/layouts.js`.
- Helpers de datos: `src/data.js`.
- Helpers de audio: `src/audio.js`.
- Helpers de UI: `src/ui.js`.

## Mapa rapido de archivos

```text
index.html
src/
  layouts.js      Constantes de resolucion, colores y posiciones compartidas.
  audio.js        Efectos cortos, voces y helpers de reproduccion.
  data.js         Pools de contenido, normalizacion, seleccion aleatoria y carga de assets dinamicos.
  ui.js           Componentes UI reutilizables: progreso, contador de estrellas y feedback.
  main.js         Escenas Phaser y logica principal de cada minijuego.
  styles.css      Ajustes de pagina, canvas, mobile y orientacion.
assets/
  book/           Fondo del libro.
  characters/     Sprite sheet de Rosarito.
  ui/             Paneles, botones, flores, tarjetas, estrellas.
  puzzles/        Fuentes, previews y piezas de puzzle.
  hiddenObjects/  Fondo de aula, iconos, sprites y UI del minijuego de objetos.
docs/
  KNOWLEDGE_BASE.md
  ROADMAP.md
  roadmap/
```

## Arranque del juego

El HTML carga los scripts en este orden:

1. `src/layouts.js`
2. `src/audio.js`
3. `src/data.js`
4. `src/ui.js`
5. `src/main.js`

Ese orden importa porque `main.js` lee objetos globales creados por los archivos anteriores:

- `window.RosaritoLayouts`
- `window.RosaritoAudio`
- `window.RosaritoData`
- `window.RosaritoUI`

Phaser se inicializa al final de `src/main.js` con un `config` que registra las escenas activas.

## Estado global

El estado de partida vive en `gameState` dentro de `src/main.js`.

Campos principales:

- `achievements`: progreso de las tres actividades activas.
- `quizPool`: preguntas normalizadas desde `src/questions.json`.
- `quizSet`: preguntas elegidas para la partida actual.
- `quizIndex`: pregunta actual.
- `puzzlePool`: lista total de puzzles normalizados.
- `puzzleSet`: puzzle elegido para esta partida.
- `puzzleIndex`: indice del puzzle actual.
- `hiddenObjectPool`: lista total de objetos.
- `hiddenObjectSet`: cuatro objetos elegidos para la partida.

`resetRunState(gameState)` en `src/data.js` define una nueva partida:

- limpia `achievements`;
- elige 3 preguntas;
- mezcla respuestas de cada pregunta;
- elige 1 puzzle;
- elige 4 objetos ocultos.

La pantalla de dones fue removida del flujo activo. Todavia puede existir codigo historico de prototipo, pero no forma parte de las escenas activas del juego actual.

## Flujo actual

1. `BootScene`
   - Carga libro, UI, personajes, datos JSON, puzzles y objetos ocultos.
   - Normaliza datos y reinicia una partida.

2. `CoverScene`
   - Pantalla inicial con Rosarito, tarjetas de actividades, objetivo final y boton `Comenzar`.
   - Permite entrar directo a minijuegos con las tarjetas para testeo.

3. `QuizGameScene`
   - Minijuego de preguntas sobre Rosario/Rosarito.
   - Selecciona 3 preguntas por partida.
   - Mezcla las respuestas cada vez que se crea la ronda.

4. `PuzzleGameScene`
   - Minijuego de rompecabezas de 4 piezas.
   - Selecciona 1 rompecabezas por partida.
   - Las piezas se arrastran desde la bandeja y encajan con snap generoso.

5. `ObjectsGameScene`
   - Minijuego de objetos de Rosario.
   - Selecciona 4 objetos activos por partida.
   - `Lentes` siempre aparece.
   - El jugador toca los objetos en la escena y se marca la lista izquierda.

6. `FinalScene`
   - Pantalla de cierre con contador `3/3` y boton para jugar de nuevo.

## Detalle de escenas

### `BootScene`

Responsabilidad:

- Preload de assets estaticos.
- Carga de JSON.
- Carga diferida de puzzles y objetos ocultos.
- Creacion de animacion de Rosarito.
- Inicio de escena segun URL.

Notas:

- `directSceneFromUrl()` permite abrir escenas para test usando query params.
- Si se agregan assets dinamicos, deben cargarse aqui o desde helpers de `src/data.js`.

### `BaseScene`

Responsabilidad:

- Dibujar fondo de libro.
- Dibujar boton de audio.
- Crear botones comunes.
- Crear feedback.
- Crear contador/progreso mediante `RosaritoUI`.
- Exponer helpers usados por minijuegos.

Notas:

- Casi todas las escenas extienden `BaseScene`.
- Conviene mover aqui cualquier comportamiento realmente compartido.

### `CoverScene`

Responsabilidad:

- Portada del juego.
- Boton `Comenzar`.
- Tarjetas de acceso directo para testear minijuegos.
- Presentacion del objetivo final.

Mantenimiento:

- Al cambiar el numero de minijuegos activos, actualizar tarjetas y texto.
- No usar sprites con numeros fijos en tarjetas de progreso.

### `QuizGameScene`

Responsabilidad:

- Mostrar una pregunta.
- Mostrar tres respuestas.
- Validar respuesta correcta.
- Avanzar a la siguiente pregunta o al puzzle.

Reglas:

- La ronda usa 3 preguntas.
- Las respuestas se mezclan al iniciar partida.
- El indice `correct` se recalcula despues de mezclar.

### `PuzzleGameScene`

Responsabilidad:

- Mostrar guia de imagen.
- Mostrar 4 piezas mezcladas.
- Permitir drag/drop.
- Hacer snap al slot correcto.
- Completar al ubicar 4 piezas.

Reglas:

- La partida usa 1 puzzle elegido aleatoriamente.
- El snap debe ser generoso para edad 3-5.
- El jugador debe poder arrastrar desde cualquier parte de la pieza.
- La tarjeta inferior de referencia historica muestra el titulo corto del puzzle, no la descripcion completa, para evitar texto cortado.

### `ObjectsGameScene`

Responsabilidad:

- Mostrar lista de 4 objetos.
- Mostrar escena de aula.
- Superponer sprites clickeables sobre la escena.
- Marcar objetos encontrados.
- Completar al encontrar los 4.

Reglas:

- `Lentes` debe aparecer siempre.
- No hay halo permanente sobre objetos.
- El area clickeable es invisible y mas grande que el sprite.
- La lista izquierda debe mostrar exactamente los 4 objetos activos.

### `FinalScene`

Responsabilidad:

- Mostrar logro final.
- Mostrar estrella completa `3/3`.
- Mostrar un cierre tipo album/recompensa.
- Mostrar a Rosarito celebrando.
- Permitir jugar de nuevo.

Notas:

- El texto principal usa `addFittedText` para mantenerse dentro del panel.
- El bloque `Album de Rosarito` es la base visual para una recompensa mas rica en futuras iteraciones.
- Si se agregan mini recuerdos completados, deben ser sprites separados y textos dinamicos, no una imagen final con todo pegado.

## Estructura de assets

### Libro

- Fondo actual: `assets/book/background.png`.
- El libro debe ocupar casi todo el viewport y funcionar como superficie jugable.

### UI general

- Sprites seleccionados: `assets/ui/selected/`.
- Sprites nuevos del minijuego 1: `assets/ui/minigame1_update/`.
- Sprites del minijuego 2: `assets/ui/minigame2/`.
- Sprites generados localmente: `assets/ui/generated/`.

Asset importante:

- `assets/ui/generated/star_full.png`: estrella completa usada para contadores y cierre. Reemplaza `assets/ui/selected/icon_star.png`, que esta recortado en la punta inferior.

### Personaje

- Sprite sheet principal: `assets/characters/rosarito_festejando.png`.
- Key Phaser: `rosarito-festejando`.
- Se usa el frame 0 como pose estatica.
- Al completar minijuegos se reproduce la animacion `rosarito-celebrate`.

### Puzzles

- Configuracion: `assets/puzzles/puzzles.json`.
- Fuentes: `assets/puzzles/source/`.
- Piezas generadas: `assets/puzzles/generated/<puzzle_id>/`.
- Cada puzzle usa:
  - `preview.png`
  - `piece_0.png`
  - `piece_1.png`
  - `piece_2.png`
  - `piece_3.png`

### Objetos ocultos

- Configuracion: `assets/hiddenObjects/objects.json`.
- Fondo de escena: `assets/hiddenObjects/backgrounds/classroom_scene.png`.
- Iconos de lista: `assets/hiddenObjects/icons/`.
- Sprites clickeables: `assets/hiddenObjects/sprites/`.
- UI de lista: `assets/hiddenObjects/ui/`.

Los sprites de objetos se colocan sobre la escena usando ratios relativos al contenedor. Esto permite que sigan alineados si cambia el escalado.

Interaccion:

- El sprite visual del objeto no debe ser el unico responsable del click.
- Cada objeto buscable usa una `Phaser.GameObjects.Zone` invisible por encima del sprite.
- La zona tiene padding amplio para que ninos pequenos puedan tocar cerca del objeto y aun asi encontrarlo.
- El hover y el feedback animan el contenedor visual, pero el input vive en la zona invisible.
- Al encontrar un objeto, la zona se desactiva y el sprite visual queda atenuado.

Checklist:

- `hidden-ui-list_row` ya trae el circulo vacio de estado.
- Phaser no debe dibujar otro circulo encima.
- El codigo solo agrega el check cuando el objeto fue encontrado.
- Si se cambia el sprite de fila, revisar que siga existiendo un unico lugar para el estado.

## Datos y seleccion aleatoria

### Preguntas

Las preguntas viven en `src/questions.json` y se normalizan con `buildQuizPool()` en `src/data.js`.

Forma actual:

```json
{
  "id": "nacimiento_lugar",
  "question": "¿Dónde nació Rosario Vera Peñaloza?",
  "options": [
    { "label": "La Rioja", "correct": true },
    { "label": "Buenos Aires", "correct": false },
    { "label": "Mendoza", "correct": false }
  ],
  "voiceKey": "voice.quiz.nacimiento_lugar"
}
```

Al iniciar una ronda:

- se eligen 3 preguntas;
- se mezclan las opciones de cada pregunta;
- se recalcula el indice `correct`.

Para agregar preguntas:

1. Editar `src/questions.json`.
2. Usar textos cortos.
3. Marcar una sola opcion con `correct: true`.
4. Agregar `voiceKey` si existe una grabacion.
5. Probar `?scene=quiz`.

### Puzzles

La ronda actual elige un solo puzzle:

```js
gameState.puzzleSet = sample(gameState.puzzlePool, 1);
```

Esto evita que el jugador tenga que hacer tres rompecabezas seguidos.

Para agregar un puzzle:

1. Agregar imagen fuente en `assets/puzzles/source/`.
2. Generar piezas y preview en `assets/puzzles/generated/<id>/`.
3. Agregar entrada en `assets/puzzles/puzzles.json`.
4. Confirmar que cada pieza tenga `key`, `path`, `centerX`, `centerY`.
5. Probar `?scene=puzzle`.

### Objetos ocultos

Reglas:

- La lista interna puede tener muchos objetos.
- En pantalla se muestran 4.
- Los objetos `required` aparecen siempre.
- `Lentes` debe mantenerse como requerido.
- Los restantes se eligen aleatoriamente.

Para agregar objetos:

1. Agregar icono en `assets/hiddenObjects/icons/`.
2. Agregar sprite en `assets/hiddenObjects/sprites/`.
3. Agregar entrada en `assets/hiddenObjects/objects.json`.
4. Ajustar `xRatio`, `yRatio`, `widthRatio`, `heightRatio`.
5. Probar que se pueda tocar desde cualquier parte visible.

Los ratios se calculan dentro del rectangulo de la escena de busqueda, no del canvas completo.

## Reglas de gameplay

### Dificultad

El juego apunta a ninos de 3 a 5 anos:

- consignas breves;
- pocas opciones por pantalla;
- feedback positivo;
- errores sin castigo;
- areas de click amplias;
- audio como apoyo de lectura.

### Progreso

El progreso se representa con tres logros:

1. Preguntas.
2. Puzzle.
3. Objetos.

Cada minijuego marca su logro correspondiente en `gameState.achievements`.

### Feedback

Tipos de feedback:

- Sonido corto de click/hover.
- Sonido o voz si existe grabacion.
- Panel visual temporal.
- Animacion de Rosarito al completar.
- Check o cambio visual en listas.

No se muestran pantallas intermedias al completar minijuegos. El flujo salta directo al siguiente.

## Audio

Los helpers viven en `src/audio.js`.

Regla actual:

- Si hay grabacion de voz cargada, se reproduce.
- No se inventa voz por fallback.
- Los efectos cortos se usan para hover/click/exito/error.

Documentacion especifica: `docs/audio.md`.

## Interaccion movil

`src/styles.css` y `index.html` incluyen ajustes para movil:

- viewport con `viewport-fit=cover`;
- `touch-action: none`;
- bloqueo visual en portrait con mensaje para girar el telefono;
- pedido de fullscreen y orientacion landscape despues de interaccion del usuario.

Regla importante:

- No forzar el `canvas` a `width: 100vw` y `height: 100vh` al mismo tiempo.
- Phaser usa `Scale.FIT`; si CSS deforma el canvas, los clicks y drag/drop pueden quedar desalineados respecto de los sprites.
- `src/styles.css` debe limitar con `max-width` y `max-height`, dejando que Phaser conserve la proporcion interna.

Limitacion importante:

Los navegadores moviles no permiten ocultar la barra de direccion automaticamente al cargar. Solo se puede pedir fullscreen luego de un gesto del usuario, y algunos navegadores iOS lo restringen a modo instalado/PWA.

## Testing manual recomendado

Servidor local:

```powershell
python -m http.server 5322
```

URL:

```text
http://127.0.0.1:5322/index.html
```

Escenas directas para test:

```text
?scene=quiz
?scene=puzzle
?scene=objects
?scene=final
```

Validacion rapida:

```powershell
node --check src/main.js
node --check src/data.js
node --check src/ui.js
node --check src/layouts.js
```

Capturas recomendadas:

```text
cover
quiz
puzzle
objects
final
mobile landscape
mobile portrait
```

Si el navegador integrado falla en Windows por sandbox, se puede usar Edge headless para generar capturas. Las capturas historicas se guardan en `test-artifacts/`.

Script de capturas:

```powershell
.\tools\capture-screens.ps1 -RunName etapa1-base
```

El script genera:

- portada;
- preguntas;
- puzzle;
- objetos;
- final;
- mobile landscape;
- mobile portrait.

La ronda `etapa1-base` fue usada para validar la primera limpieza tecnica: sintaxis correcta, carga de escenas principales y composicion mobile horizontal completa.

Smoke test interactivo del puzzle:

```powershell
node tools/puzzle-cdp-test.mjs
```

Este test abre Edge headless por CDP, entra en `?scene=puzzle`, verifica que no falten texturas y arrastra una pieza hasta su destino. Debe devolver `ok: true`, `pieces: 4` y al menos `lockedCount: 1`.

## Base tecnica actual

La primera etapa de refactor ya dejo estos puntos establecidos:

- `src/data.js` es la fuente para normalizacion, seleccion aleatoria y carga dinamica de pools.
- `src/main.js` conserva wrappers de compatibilidad, pero ya no contiene pools duplicados ni ramas inalcanzables en los wrappers principales.
- `src/audio.js` concentra la reproduccion real de audio y voces.
- `src/ui.js` concentra estilos compartidos y `addFittedText` para textos que deben entrar dentro de paneles.
- `src/ui.js` tambien concentra la primera biblioteca de componentes visuales: `addScreenTitle`, `addNarrativeBubble`, `addMouseHint`, `addSectionHeader` y `addChecklistFrame`.
- `src/layouts.js` expone `PAGE_AREAS` para empezar a migrar coordenadas absolutas a posiciones relativas del libro.
- `tools/capture-screens.ps1` permite verificar pantallas sin depender del navegador integrado.
- `tools/puzzle-cdp-test.mjs` permite probar drag/drop real del rompecabezas cuando se toca CSS, piezas o layout.
- `tools/objects-cdp-test.mjs` permite probar clicks reales sobre los objetos buscables y confirmar que la lista se marque sin doble indicador.

Regla de mantenimiento:

- Si se agrega una frase visible, usar un helper de texto compartido o documentar por que esa escena necesita un ajuste manual.
- Si un texto vive dentro de un globo, panel o boton, preferir `RosaritoUI.addFittedText`.
- Si se agrega un nuevo dato jugable, ponerlo en JSON o en `src/data.js`, no directamente en una escena.
- Si se agrega una coordenada visual importante, preferir una referencia a `PAGE_AREAS` o a `SCENE_LAYOUTS`.
- Si se toca una pantalla, generar al menos una captura de esa escena antes de dar el cambio por terminado.

### Biblioteca visual compartida

Para evitar que cada pantalla use cajas parecidas pero distintas, mantener esta convencion:

- Titulo de pantalla: texto violeta grande, decoracion floral y `ui-divider_heart_purple`.
  - Helper actual: `RosaritoUI.addScreenTitle`.
- Globo narrativo: `ui-speech_large_cream` con texto creado por `RosaritoUI.addFittedText`.
  - Helper actual: `RosaritoUI.addNarrativeBubble`.
- Globo de instruccion o mouse: `ui-speech_large_lilac`, `ui-icon_mouse` y una frase corta.
  - Helper actual: `RosaritoUI.addMouseHint`.
- Header de actividad: `ui-label_long_cream` o un header especifico sin numeros estaticos.
  - Helper actual: `RosaritoUI.addSectionHeader`.
- Panel de pregunta: `m2-question_panel` con badges dinamicos.
- Checklist de objetos: `hidden-ui-list_header`, `hidden-ui-list_panel`, `hidden-ui-list_row`.
  - Helper actual: `RosaritoUI.addChecklistFrame`.
- Boton principal: `ui-button_long_purple`.
  - Helper actual: `RosaritoUI.addPrimaryButton`.
- Boton siguiente: `ui-button_arrow_right`.
  - Helper actual: `RosaritoUI.addNextButton`.
- Contador de estrellas: `RosaritoUI.drawStarCounter`.
- Feedback temporal: `RosaritoUI.createFeedback`.

Antes de sumar un nuevo sprite de caja o globo, revisar si alguno de estos componentes ya resuelve la funcion. Si se necesita uno nuevo, documentar su uso esperado y en que escenas debe repetirse.

## Como mantener y expandir

### Antes de cambiar una pantalla

1. Abrir la escena directa con `?scene=...`.
2. Hacer captura del estado actual.
3. Cambiar layout o logica.
4. Correr `node --check`.
5. Hacer captura nueva.
6. Comparar texto, bordes, botones, contador y personaje.

### Al agregar un asset

- Revisar que tenga transparencia real.
- Revisar que no este recortado.
- Evitar texto o numeros dentro del sprite si deben ser dinamicos.
- Documentar assets importantes en `docs/sprite_selection.md` o en la etapa correspondiente del roadmap.

### Al agregar contenido

- Preferir JSON para datos nuevos.
- Mantener textos breves.
- Agregar claves de audio aunque la grabacion llegue despues.
- Probar con pantalla desktop y mobile.

### Al tocar interaccion

- Verificar cursor/hover.
- Verificar click/touch amplio.
- Verificar que no se pueda avanzar antes de completar.
- Verificar que completar un minijuego actualice `achievements`.

## Principios visuales del proyecto

- Libro ilustrado como escenario, no como interfaz plana.
- Textos breves, grandes y dentro de globos o paneles decorados.
- Rosarito debe sentirse como guia, no como sticker aislado.
- Botones grandes, con estilo violeta/dorado y feedback suave.
- Flores, hojas, corazones y costuras punteadas sostienen la identidad visual.
- Evitar texto que toque bordes, contenedores demasiado pequenos o sprites con numeros estaticos duplicados.

## Riesgos conocidos

- `src/main.js` conserva logica que tambien existe en `src/data.js`; conviene seguir reduciendo duplicacion.
- Algunos textos fuente todavia tienen problemas de encoding en strings antiguos.
- Varias pantallas usan coordenadas absolutas; mejorar con layouts relativos al libro reduciria regresiones.
- El navegador integrado puede fallar en Windows por sandbox; Edge headless ha sido la alternativa mas estable para capturas.

## Documentacion relacionada

- Roadmap resumido: `docs/ROADMAP.md`.
- Roadmap profundo: `docs/roadmap/README.md`.
- Audio: `docs/audio.md`.
- Seleccion de sprites: `docs/sprite_selection.md`.
