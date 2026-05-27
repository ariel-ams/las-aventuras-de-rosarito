# Seleccion de sprites

Se analizaron los archivos de `assets/sprites/` y se extrajeron sprites individuales a:

```text
assets/ui/selected/
```

Tambien se genero:

```text
assets/ui/selected/preview_selected.png
assets/ui/selected/manifest.json
```

## Archivos analizados

- `buttons.png`: botones circulares, botones largos, paneles de accion, marcador de estrella.
- `box_background.png`: marcos, libro abierto, tarjetas, clipboard y paneles.
- `textbox_background.png`: globos de dialogo, cajas de texto, etiquetas y banners.
- `icons.png`: iconos de mouse, audio, check, error, pregunta, puzzle, libro, bolso, tiza, pizarra, campana, flechas y estrellas.
- `flower_details.png`: flores, hojas, divisores, pasto y decoraciones.
- `sprite_6.png`: titulos ya renderizados con la tipografia visual de Rosarito.

## Sprites elegidos para integracion actual

Base visual:

- `book_open_frame`
- `grass_large`

Botones:

- `button_arrow_right`
- `button_audio`
- `button_long_purple`

Textos y paneles:

- `speech_large_cream`
- `speech_large_lilac`
- `label_long_cream`
- `panel_task_floral`
- `panel_floral_wide`
- `card_arch_filled`

Titulos:

- Los titulos se dibujan ahora como texto del juego para evitar fondos opacos de la lamina de referencia.

Iconos de juego:

- `icon_bag`
- `icon_question`
- `icon_puzzle`
- `icon_blackboard`
- `icon_book`
- `icon_chalk`
- `icon_bell`
- `icon_quill`
- `icon_ink`
- `icon_star`
- `icon_check`
- `icon_x`

## Notas tecnicas

Los sprite sheets tenian el patron de transparencia visible como pixeles opacos. Para poder usarlos en Phaser se recortaron las zonas utiles y se limpio ese fondo, generando PNGs con alpha real.

En la segunda pasada se conservaron solo los sprites que pasaron mejor la limpieza de transparencia y centrado. Los recortes que todavia arrastraban restos de cuadricula o partes de sprites vecinos quedaron fuera de `UI_ASSETS` hasta que se ajusten manualmente.

Si se reemplazan o mejoran los sprites fuente, conviene regenerar los recortes manteniendo los mismos nombres en `assets/ui/selected/` para no tocar el codigo.
