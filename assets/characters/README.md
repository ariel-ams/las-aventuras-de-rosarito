# Personaje Rosarito

El juego espera el spritesheet:

```text
assets/characters/rosarito_festejando.png
```

Formato actual esperado:

- PNG transparente.
- 6 frames horizontales.
- Cada frame: `362x724`.
- Canvas total: `2172x724`.
- Sin separacion entre frames.

El primer frame se usa como imagen estatica. Cuando un minijuego se completa correctamente, Phaser reproduce los frames con la animacion `rosarito-celebrate`.

Si el spritesheet final trae margen o separacion entre frames, ajustar en `src/main.js`:

```js
const ROSARITO_SPRITE = {
  frameWidth: 362,
  frameHeight: 724,
  margin: 0,
  spacing: 0,
};
```

Los PNG de esta carpeta ya tienen fondo transparente. Si se reemplazan por exports con cuadricula gris/blanca, hay que convertir esa cuadricula en alfa antes de usarlos en Phaser.
