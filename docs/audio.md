# Guia de audio y narraciones

El juego ya tiene una capa de audio centralizada en `src/main.js`.

Mientras no existan archivos reales, el prototipo usa:

- tonos sintetizados para `click`, `hover`, `success`, `error` y `page`;
- solamente las grabaciones de voz que esten registradas y cargadas.

Cuando haya grabaciones finales, se agregan en `assets/audio/` y se registran en `AUDIO_FILES`.

## Carpetas

```text
assets/audio/
  sfx/
    click.mp3
    hover.mp3
    success.mp3
    error.mp3
    page_turn.mp3
  voice/
    screens/
      cover.mp3
      mission.mp3
      prep.mp3
      quiz.mp3
      puzzle.mp3
      objects.mp3
      confirm.mp3
      final.mp3
      transition.mp3
    feedback/
      success.mp3
      error.mp3
      complete.mp3
    objects/
      cubo.mp3
      esfera.mp3
      tiza.mp3
      pizarra.mp3
```

Usar preferentemente `.mp3` para compatibilidad general. Si se agregan `.ogg`, mantener el mismo nombre base.

## Como registrar un archivo

En `src/main.js`, buscar `AUDIO_FILES` y agregar entradas:

```js
const AUDIO_FILES = [
  { key: "voice.cover", path: "assets/audio/voice/screens/cover.mp3" },
  { key: "voice.prep", path: "assets/audio/voice/screens/prep.mp3" },
  { key: "voice.feedback.success", path: "assets/audio/voice/feedback/success.mp3" },
  { key: "voice.object.Esfera", path: "assets/audio/voice/objects/esfera.mp3" },
  { key: "sfx.click", path: "assets/audio/sfx/click.mp3" },
  { key: "sfx.hover", path: "assets/audio/sfx/hover.mp3" },
  { key: "sfx.success", path: "assets/audio/sfx/success.mp3" },
  { key: "sfx.error", path: "assets/audio/sfx/error.mp3" },
  { key: "sfx.page", path: "assets/audio/sfx/page_turn.mp3" },
];
```

La clave debe coincidir con la llamada que hace el juego. Si el archivo no esta registrado, no se reproduce voz para esa accion.

## Textos actuales de referencia

Pantallas:

- `voice.cover`: "Rosarito nos invita a jugar en su libro magico."
- `voice.mission`: "Vamos a completar cuatro actividades para encender todas las estrellas."
- `voice.prep`: "Hoy vamos a ayudar a Rosarito a prepararse con sus dones. Mira el don y elige los objetos correctos."
- `voice.quiz`: "Escucha la pregunta y elige una respuesta."
- `voice.puzzle`: "Arma la imagen colocando cada pieza en su lugar."
- `voice.objects`: "Busca los objetos de ensenanza en la mesa."
- `voice.confirm`: "Muy bien. Ganaste una estrella. Toca siguiente para pasar la pagina."
- `voice.final`: "Completaste todas las actividades. Las cuatro estrellas estan encendidas."
- `voice.transition`: "Pasemos la pagina."

Feedback:

- `voice.feedback.success`: "Muy bien."
- `voice.feedback.error`: "Intentalo nuevamente."
- `voice.feedback.complete`: "Actividad completa."

Objetos:

- `voice.object.Cubo`: "Esto es un cubo."
- `voice.object.Esfera`: "Esto es una esfera."
- `voice.object.Tiza`: "Esto es una tiza."
- `voice.object.Pizarra`: "Esto es una pizarra."
- `voice.object.Campana`: "Esto es una campana."
- `voice.object.Libro`: "Esto es un libro."

Se pueden sumar todos los objetos definidos en `AUDIO_SCRIPT.objects`.

## Recomendaciones de grabacion

- Voz clara, calida y lenta, pensada para ninos de 3 a 5 anos.
- Frases cortas, idealmente menores a 5 segundos.
- Evitar musica debajo de instrucciones para no competir con la voz.
- Normalizar volumen entre archivos.
- Dejar medio segundo de silencio maximo al inicio y final.

## Ajustar la animacion de pagina

La escala y posicion de la pagina animada se controla en `LAYOUT.pageTurn`:

```js
pageTurn: { x: WIDTH / 2 + 20, y: 352, scale: 1.72, frameDelay: 105 }
```

Cuando se reemplace `assets/book/book_background.png` por el fondo final, ajustar esos valores hasta que los frames encajen con el libro.
