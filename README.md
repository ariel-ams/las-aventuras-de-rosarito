# Rosarito y sus pizarras magicas

Prototipo web en Phaser 3 basado en el documento de diseno del juego.

## Recomendacion de engine

Use Phaser 3 para este prototipo porque el juego es un libro interactivo 2D con escenas, botones grandes, drag-and-drop, puzzles simples y feedback visual. Phaser resuelve esas interacciones directamente en navegador sin obligar a exportar desde un motor mas pesado.

## Ejecutar

Opcion rapida: abrir `index.html` en el navegador.

Opcion con servidor local desde la carpeta del proyecto:

```powershell
& "C:\Users\ariel\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 5173
```

Luego abrir:

```text
http://localhost:5173
```

## Contenido del prototipo

- Portada con resumen de las cuatro actividades y accesos directos de prueba.
- Fondo del libro cargado como sprite reemplazable en `assets/book/background.png`.
- Transicion de pagina con frames PNG en `assets/page_turn/`.
- Capa de audio preparada para narraciones, feedback y sonidos de interfaz. Ver `docs/audio.md`.
- Sprites visuales extraidos e integrados desde `assets/sprites/`. Ver `docs/sprite_selection.md`.
- Personaje Rosarito preparado como spritesheet horizontal en `assets/characters/rosarito_festejando.png`.
- Juego 1: tres dones elegidos al azar de una lista de siete; el jugador selecciona los objetos correctos.
- Juego 2: tres preguntas elegidas al azar desde un banco ampliable.
- Juego 3: rompecabezas de cuatro piezas generado desde imagenes listadas en `assets/puzzles/puzzles.json`, con fuentes en `assets/puzzles/source/` y piezas en `assets/puzzles/generated/`.
- Juego 4: buscar cuatro objetos seleccionados desde `assets/hiddenObjects/objects.json`; `Lentes` aparece siempre y los otros tres se eligen al azar.
- Pantalla final con cuatro logros completos.

Las imagenes historicas y audios quedan como contenido cargable para la siguiente iteracion.

## Agregar imagenes de rompecabezas

1. Guarda la imagen completa en `assets/puzzles/source/`.
2. Genera cuatro piezas PNG transparentes dentro de `assets/puzzles/generated/<id>/`.
3. Agrega una entrada en `assets/puzzles/puzzles.json` con `previewKey`, `preview` y las cuatro piezas.
4. Cada pieza necesita `centerX` y `centerY`, que indican donde queda su centro dentro de la imagen fuente de 512 x 512.

## Agregar objetos buscables

1. Guarda el fondo de aula en `assets/hiddenObjects/backgrounds/`.
2. Guarda cada icono en `assets/hiddenObjects/icons/` y cada sprite clickeable en `assets/hiddenObjects/sprites/`. Los actuales salen de `assets/sprites/minigame4_objects.png`.
3. Agrega el objeto a `assets/hiddenObjects/objects.json` con `id`, `label`, `iconKey`, `spriteKey`, rutas, ratios relativos a la escena y `hitPadding`.
4. Marca `required: true` para objetos que deben aparecer siempre en la partida.

## Probar niveles

Desde la portada:

- `Comenzar` inicia directamente el primer minijuego de dones.
- Las tarjetas de actividad abren directamente cada minijuego para testearlo.
- Teclas `1`, `2`, `3`, `4`: abren Dones, Preguntas, Rompecabezas y Objetos.

Tambien se puede abrir una escena directa con query string:

```text
http://localhost:5173/index.html?scene=dones
http://localhost:5173/index.html?scene=quiz
http://localhost:5173/index.html?scene=puzzle
http://localhost:5173/index.html?scene=objects
```
