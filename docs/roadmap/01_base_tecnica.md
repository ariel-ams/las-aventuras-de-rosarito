# Etapa 1 - Base tecnica y arquitectura

## Objetivo

Reducir el riesgo de errores al seguir agregando contenido. El juego ya funciona, pero todavia mezcla responsabilidades en `src/main.js`. Esta etapa busca ordenar la base sin cambiar la experiencia jugable.

## Problemas actuales

- `src/main.js` contiene escenas, datos fallback, wrappers y logica historica.
- `src/data.js` ya concentra parte de la normalizacion, pero aun hay duplicacion en `main.js`.
- Varias escenas usan coordenadas absolutas.
- Los textos se ajustan manualmente en cada pantalla.
- El testing visual depende de capturas manuales/headless.

## Resultado esperado

- `src/main.js` queda mas enfocado en escenas.
- La seleccion y normalizacion de datos vive en `src/data.js`.
- Los estilos de texto y paneles se reutilizan desde helpers.
- Los layouts se documentan por escena.
- El flujo de pruebas queda repetible.

## Implementacion inicial realizada

Esta etapa comenzo con cambios de bajo riesgo:

- `src/main.js` dejo de contener pools duplicados de preguntas/dones y helpers fallback inalcanzables.
- Los wrappers en `src/main.js` ahora delegan de forma limpia a:
  - `RosaritoData`
  - `RosaritoAudio`
- `src/ui.js` ahora expone estilos de texto compartidos y `addFittedText`.
- La pregunta del quiz ya usa `addFittedText`, de modo que baja el tamano de fuente si el texto no entra en el panel.
- `src/layouts.js` ahora expone `PAGE_AREAS` con pagina izquierda, derecha, lomo y safe area.
- Se agrego `tools/capture-screens.ps1` para generar capturas repetibles.

## Principios de refactor para esta etapa

- No cambiar reglas de juego mientras se limpia arquitectura.
- Mantener nombres de helpers usados por escenas para evitar refactors de alto riesgo.
- Migrar una pantalla por vez a helpers comunes.
- Correr validacion sintactica y capturas despues de cada bloque.
- No remover codigo historico de escenas inactivas hasta confirmar que no se quiere conservar como referencia.

## Tareas propuestas

### 1. Eliminar codigo muerto gradual

Acciones:

- Identificar funciones en `main.js` que solo delegan a `RosaritoData`.
- Confirmar que `src/data.js` se carga antes de `src/main.js`.
- Remover bloques inalcanzables despues de `return RosaritoData...`.
- Hacerlo en cambios pequenos y probar cada escena.

Criterio de aceptacion:

- `rg "return RosaritoData" src/main.js` no muestra wrappers con codigo muerto debajo.
- El juego carga igual.

Estado:

- Hecho para los wrappers principales de datos.
- Pendiente: evaluar si `PrepGameScene` debe conservarse como referencia historica o removerse por completo.

### 2. Consolidar estilos de texto

Acciones:

- Crear helpers para:
  - titulo grande;
  - subtitulo;
  - texto narrativo;
  - pregunta;
  - etiqueta de boton;
  - lista/checklist.
- Agregar una funcion de auto-ajuste por longitud.

Criterio de aceptacion:

- Cambiar una fuente/tamano base no requiere editar tres escenas.
- Las preguntas largas no salen del panel.

Estado:

- Base creada en `src/ui.js`.
- Primera aplicacion hecha en `QuizGameScene.showQuestion`.
- Pendiente: migrar botones, feedback, checklist de objetos y textos narrativos.

### 3. Layout relativo al libro

Acciones:

- Mantener `WIDTH` y `HEIGHT` base.
- Agregar definiciones de `leftPage`, `rightPage`, `safeArea`.
- Migrar una escena por vez.

Criterio de aceptacion:

- Las coordenadas clave se expresan como proporcion del libro o pagina.
- Capturas desktop y mobile mantienen composicion.

Estado:

- `PAGE_AREAS` agregado en `src/layouts.js`.
- Pendiente: migrar escenas activas a estas areas de forma gradual.

### 4. Testing repetible

Acciones:

- Crear script local para capturas headless con Edge.
- Guardar capturas por ronda en `test-artifacts/<fecha>/`.
- Documentar pasos cuando el navegador integrado falle.

Criterio de aceptacion:

- Una sola orden genera capturas de portada, quiz, puzzle, objetos, final y mobile.

Estado:

- Script agregado: `tools/capture-screens.ps1`.
- El script ahora resuelve rutas absolutas para que Edge headless pueda escribir capturas aunque el proceso no use el mismo directorio de trabajo.
- Prueba `etapa1-base` generada correctamente en `test-artifacts/etapa1-base/`.

Uso:

```powershell
.\tools\capture-screens.ps1 -RunName etapa1
```

Requiere que el servidor local ya este corriendo en `http://127.0.0.1:5322/index.html`.

Capturas generadas en la validacion inicial:

- `test-artifacts/etapa1-base/cover.png`
- `test-artifacts/etapa1-base/quiz.png`
- `test-artifacts/etapa1-base/puzzle.png`
- `test-artifacts/etapa1-base/objects.png`
- `test-artifacts/etapa1-base/final.png`
- `test-artifacts/etapa1-base/mobile-landscape.png`
- `test-artifacts/etapa1-base/mobile-portrait.png`

Observaciones:

- La portada, preguntas, objetos y mobile landscape cargan sin errores visibles de escena.
- La pregunta del quiz ya entra mejor dentro del panel con el helper de autoajuste.
- Todavia conviene migrar textos de globos/listas para evitar futuros desbordes cuando cambie el contenido.
- La escena de objetos ya usa `addFittedText` en el globo inferior, pero el helper visual del globo todavia deberia unificarse con las otras pantallas.
- La lista de objetos ya evita doble indicador de estado: el circulo vacio vive en el sprite y el check se agrega por codigo.
- Los objetos buscables ya usan zonas invisibles amplias separadas del sprite visual.

## Checklist tecnico de etapa 1

- [x] Quitar pools duplicados de `src/main.js`.
- [x] Quitar ramas inalcanzables en wrappers de datos.
- [x] Quitar ramas inalcanzables en wrappers de audio de `main.js`.
- [x] Agregar helper de texto autoajustable.
- [x] Aplicar helper a la pregunta del quiz.
- [x] Agregar areas base de pagina en layout.
- [x] Agregar script de capturas.
- [x] Validar sintaxis de `main.js`, `data.js`, `ui.js` y `layouts.js`.
- [x] Generar capturas desktop/mobile de la ronda base.
- [x] Migrar textos criticos de portada a `addFittedText`.
- [x] Migrar checklist de objetos a una estructura consistente sin doble circulo.
- [x] Agregar smoke test CDP para clicks del minijuego de objetos.
- [x] Crear primera tanda de helpers de componente visual: titulo de pantalla, globo narrativo, globo de mouse, header y checklist.
- [x] Migrar puzzle y objetos a la primera tanda de helpers visuales.
- [x] Validar la migracion con `node --check`, smoke tests CDP y capturas `test-artifacts/ui-helpers-title-pass/`.
- [ ] Crear helpers restantes de componente visual: boton siguiente.
- [ ] Migrar portada y quiz a los helpers visuales comunes.
- [ ] Migrar botones comunes a estilos compartidos.
- [ ] Decidir destino de `PrepGameScene`.
- [ ] Separar datos de preguntas a JSON externo.

## Riesgos

- Medio: tocar arquitectura puede romper escenas si se hace todo junto.
- Bajo si se trabaja escena por escena y con capturas despues de cada cambio.

## No hacer en esta etapa

- Redisenar pantallas.
- Cambiar reglas de juego.
- Agregar minijuegos nuevos.
