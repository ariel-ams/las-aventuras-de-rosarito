# Etapa 5 - Mantenimiento y expansion

## Objetivo

Definir reglas para que el proyecto pueda crecer: mas preguntas, mas puzzles, mas objetos, mejores assets y eventualmente nuevos minijuegos.

## Agregar preguntas

Estado ideal:

- Las preguntas ya viven en `src/questions.json`.
- `src/data.js` las normaliza con `buildQuizPool()` antes de armar la partida.

Formato sugerido:

```json
{
  "id": "nacimiento_lugar",
  "question": "En donde nacio Rosario Vera Penaloza?",
  "options": [
    { "label": "La Rioja", "correct": true, "iconKey": "ui-icon_home" },
    { "label": "Buenos Aires", "correct": false, "iconKey": "ui-icon_blackboard" },
    { "label": "Mendoza", "correct": false, "iconKey": "ui-icon_flower" }
  ],
  "voiceKey": "voice.quiz.nacimiento_lugar"
}
```

Reglas:

- Mantener 3 opciones por pregunta.
- Marcar una sola correcta.
- Usar textos cortos.
- Agregar `iconKey` especifico cuando sea posible.
- El icono viaja con su respuesta aunque el juego mezcle opciones.
- Probar `?scene=quiz` despues de agregar o editar preguntas.

## Agregar puzzles

Pasos:

1. Agregar imagen fuente en `assets/puzzles/source/`.
2. Generar piezas en `assets/puzzles/generated/<id>/`.
3. Actualizar `assets/puzzles/puzzles.json`.
4. Probar `?scene=puzzle`.

Reglas:

- Cada puzzle tiene 4 piezas.
- Mantener preview y piezas con escala consistente.
- Revisar que las piezas no queden demasiado pequenas en la bandeja.

## Agregar objetos ocultos

Pasos:

1. Crear icono en `assets/hiddenObjects/icons/`.
2. Crear sprite clickeable en `assets/hiddenObjects/sprites/`.
3. Agregar entrada en `assets/hiddenObjects/objects.json`.
4. Ajustar ratios sobre la escena.
5. Probar click en toda el area.

Formato:

```json
{
  "id": "lentes",
  "label": "Lentes",
  "required": true,
  "xRatio": 0.55,
  "yRatio": 0.34,
  "widthRatio": 0.125,
  "heightRatio": 0.06,
  "hitPadding": 20,
  "iconKey": "hidden-icon-lentes",
  "spriteKey": "hidden-sprite-lentes",
  "icon": "assets/hiddenObjects/icons/lentes.png",
  "sprite": "assets/hiddenObjects/sprites/lentes.png"
}
```

Reglas:

- `xRatio` y `yRatio` se calculan dentro del fondo de busqueda, no de toda la pantalla.
- El sprite debe coincidir con el objeto del fondo.
- El hit area puede ser mas grande que el objeto.
- No usar halo permanente.

## Agregar assets UI

Reglas:

- No usar sprites con texto si ese texto debe cambiar.
- Evitar sprites con numeros estaticos.
- Revisar que no esten recortados.
- Si se genera un asset corregido, guardarlo en `assets/ui/generated/` y documentar por que existe.

## Agregar una nueva escena

Pasos:

1. Crear clase nueva extendiendo `BaseScene`.
2. Agregarla al array `scene` de Phaser.
3. Agregar acceso por URL en `directSceneFromUrl`.
4. Agregar estado si necesita progreso.
5. Agregar capturas de prueba.
6. Documentar la escena en `docs/KNOWLEDGE_BASE.md`.

## Antes de cada entrega

Checklist:

- `node --check src/main.js`
- `node --check src/data.js`
- `node --check src/ui.js`
- `node --check src/layouts.js`
- Capturas desktop.
- Capturas mobile.
- Probar accesos directos por `?scene=`.
- Revisar `git status --short` para distinguir cambios propios de assets del usuario.

## Convenciones de documentacion

- `docs/KNOWLEDGE_BASE.md`: como funciona hoy.
- `docs/ROADMAP.md`: vision resumida.
- `docs/roadmap/`: plan detallado por etapa.
- `docs/audio.md`: reglas de audio y grabaciones.
- `docs/sprite_selection.md`: seleccion y criterios de sprites.
