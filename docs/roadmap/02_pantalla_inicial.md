# Etapa 2 - Pantalla inicial

## Objetivo

Acercar la portada al diseno de referencia: una doble pagina de libro rica, clara y narrativa, donde Rosarito guie al jugador y las actividades se entiendan visualmente.

## Estado actual

La pantalla inicial ya funciona:

- muestra titulo;
- muestra Rosarito;
- muestra tres tarjetas de actividad;
- permite testear minijuegos tocando tarjetas;
- tiene objetivo final y boton comenzar.

Todavia se ve mas modular que la referencia. Rosarito es mas pequena, las tarjetas tienen menos detalle y la composicion de la pagina derecha puede ganar jerarquia.

## Direccion visual

- Pagina izquierda:
  - Rosarito grande como guia.
  - Titulo muy protagonista.
  - Globo narrativo breve.
  - Globo de mouse.

- Pagina derecha:
  - Header `Tu mision`.
  - Texto corto.
  - Tarjetas de actividades con icono grande.
  - Objetivo final tipo album.
  - Boton principal integrado al borde inferior.

## Tareas propuestas

### 1. Rosarito guia

Acciones:

- Aumentar escala de Rosarito.
- Ubicarla mas abajo/izquierda, evitando tapar texto.
- Agregar sombra suave si el sprite no la trae.
- Evaluar una pose alternativa si se agrega un sprite nuevo.

Criterio de aceptacion:

- Rosarito es un foco visual principal, no un adorno.

Estado:

- Avance inicial aplicado: Rosarito usa una escala mayor y se posiciona desde `PAGE_AREAS.left`.
- La sombra se ajusto junto con la posicion para mantenerla integrada al piso del libro.
- Pendiente: probar una pose de guia si se agrega un sprite nuevo con brazo extendido.

### 2. Tarjetas de actividad

Acciones:

- Mantener tres tarjetas activas: Infancia, Puzzle, Objetos.
- Mejorar iconos o usar mini escenas.
- Subir y centrar textos dentro de cada tarjeta.
- Evitar numeros duplicados en sprites.

Criterio de aceptacion:

- Cada actividad se entiende sin leer demasiado.
- Las tarjetas se ven separadas y clickeables.

Estado:

- Avance inicial aplicado: las tres tarjetas activas se hicieron un poco mas grandes y separadas.
- El texto de cada tarjeta se movio hacia arriba para no quedar pegado al borde inferior.
- Los numeros siguen siendo texto dinamico sobre un sprite sin numero estatico.
- Pendiente: reemplazar iconos por mini escenas mas expresivas cuando existan assets especificos.

### 3. Objetivo final

Acciones:

- Convertir el bloque inferior en recompensa visual.
- Usar album/libro abierto, estrella completa y texto breve.
- Evitar que el boton `Comenzar` tape flores o borde.

Criterio de aceptacion:

- El jugador entiende que completar actividades llena el album/logro.

Estado:

- Avance inicial aplicado: el texto del objetivo final usa `addFittedText` para no exceder el panel.
- Pendiente: pulir el panel como album/recompensa con un asset mas rico.

### 4. Comparacion con referencia

Acciones:

- Capturar portada 1280x720.
- Comparar con imagen referencia:
  - densidad visual;
  - jerarquia;
  - posicion de Rosarito;
  - tarjetas;
  - objetivo final.

Criterio de aceptacion:

- La portada se siente como una pagina terminada, no como mockup funcional.

Estado:

- Validado con capturas `test-artifacts/etapa2-cover/cover.png` y `test-artifacts/etapa2-cover/mobile-landscape.png`.
- Revalidado con `test-artifacts/roadmap-review/cover.png` y `test-artifacts/roadmap-review/mobile-landscape.png`.
- No se observaron textos nuevos fuera de contenedor en portada.
- La portada mantiene acceso directo a las tres escenas activas.
- La portada ya esta mas cerca del diseno de referencia en jerarquia y composicion general.
- Sigue faltando riqueza ilustrada en tarjetas y objetivo final.

## Cambios tecnicos aplicados en esta etapa

- La portada empezo a usar `PAGE_AREAS` para posiciones clave.
- Los globos narrativos de portada usan `RosaritoUI.addFittedText`.
- El texto del objetivo final tambien usa `addFittedText`.
- `makeCoverMissionCard` se ajusto para tarjetas mas grandes, textos mas altos y mejor hit area.

## Checklist de etapa 2

- [x] Agrandar Rosarito en portada.
- [x] Posicionar Rosarito con referencia a `PAGE_AREAS.left`.
- [x] Subir texto de tarjetas de minijuegos.
- [x] Separar un poco mas las tarjetas.
- [x] Migrar globos principales de portada a `addFittedText`.
- [x] Capturar portada nueva y comparar con referencia.
- [ ] Evaluar mini escenas para tarjetas.
- [ ] Pulir objetivo final con asset de album/recompensa.

## Observaciones desde `roadmap-review`

- La pagina izquierda esta clara: titulo, Rosarito, globo narrativo y globo de mouse funcionan sin cortes.
- La pagina derecha se entiende, pero las tarjetas aun se ven mas como botones de menu que como mini misiones ilustradas.
- El boton `Comenzar` esta bien integrado y visible.
- El contador `0/3` se ve completo y no duplica numeros estaticos.

## Proximo pulido recomendado

1. Reemplazar iconos de tarjetas por mini ilustraciones mas narrativas.
2. Convertir `Gran objetivo` en un bloque mas parecido a album final/recompensa.
3. Agregar micro feedback visual al tocar una tarjeta de testeo, sin cambiar el flujo principal.

## Riesgos

- Bajo/medio: principalmente visual.
- Cuidar que los accesos directos a minijuegos sigan funcionando.
