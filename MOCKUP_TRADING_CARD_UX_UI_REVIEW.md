# Mockup Trading Card UX/UI Review

Fecha: 2026-06-05

## Contexto

Este documento almacena la direccion visual del mockup adjunto en la conversacion del 2026-06-05 para la pagina Wizard Animated Series.

La propuesta cambia el enfoque actual de galeria tipo catalogo/carrusel por una experiencia inspirada en trading cards de comics con capas de gamificacion.

Nota: el mockup original fue compartido como imagen adjunta en el chat. En el repositorio queda almacenado este brief analitico y conceptual. Si se quiere conservar tambien la imagen fuente, habra que exportarla manualmente al workspace.

## Lectura del concepto

- Direccion visual: estetica oscura, dramatica y coleccionable.
- Marco mental: no parece un sitio para "ver series", sino para "armar una coleccion".
- Tono de producto: mezcla de archivo fandom + deck builder + catalogo premium.
- Cambio clave respecto al sitio actual: pasa de discovery lineal por categorias a exploracion por rareza, faccion, tipo de carta y progreso de coleccion.

## Puntos a favor

### 1. Identidad mucho mas diferenciada

El mockup tiene una voz visual clara. La pagina actual se acerca mas a una UI de streaming generalista; el mockup, en cambio, construye una identidad propia y mas memorable.

### 2. La metafora de trading card encaja bien con el contenido

Series animadas basadas en comics combinan muy bien con cartas, rarezas, facciones, badges y coleccion. No se siente un injerto artificial; la narrativa visual tiene coherencia con el tema.

### 3. Mejor potencial de engagement

Elementos como Collection, Deck, Build Your Deck, Compare Cards, Random Card y Collector Notes abren puertas a loops de retorno. Eso da mas valor que solo navegar posters.

### 4. Jerarquia visual mas fuerte

El mockup deja claro el orden de lectura:

1. Era o categoria principal.
2. Propuesta tematica del bloque.
3. Filtros de subcoleccion.
4. Grid de cartas destacadas.
5. Acciones secundarias y exploracion profunda.

Esa jerarquia es mas editorial y tambien mas producto.

### 5. Las cards son mas expresivas

Cada carta comunica mejor personalidad y status mediante color, borde, etiqueta, stats y subtitulos. Eso hace que el usuario pueda escanear y comparar mejor que con posters uniformes.

### 6. La gamificacion esta sugerida, no saturada

Hay suficientes cues de juego para generar curiosidad sin caer todavia en una interfaz tipo app movil llena de contadores, monedas o tareas diarias.

## Puntos en contra

### 1. Riesgo de sobreestilizacion

La interfaz tiene mucho impacto visual, pero tambien mucho ruido potencial: glow, bordes, colores por faccion, etiquetas, texturas y multiples CTA. Si se traslada tal cual, puede cansar visualmente en sesiones largas.

### 2. Puede degradar la claridad informativa

En el mockup, algunos datos compiten con el acabado grafico. Si el usuario quiere resolver preguntas concretas como ano, temporadas, disponibilidad o plataforma, el estilo puede pesar mas que la informacion.

### 3. Ambiguedad en el objetivo principal

No queda del todo claro si la accion principal es:

1. Explorar series.
2. Coleccionarlas.
3. Compararlas.
4. Construir un deck.

Como concepto es fuerte, pero como producto necesita una accion primaria mejor definida por pantalla.

### 4. Mayor complejidad de implementacion

Pasar de carruseles simples a cards con rareza, estados, filtros, coleccion y acciones persistentes implica mas estructura de datos, mas estados UI y probablemente localStorage o una capa de datos mejor modelada.

### 5. Riesgo de accesibilidad

El contraste en fondos con textura, textos pequenos sobre overlays y codigos de color por categoria puede afectar legibilidad. Tambien hay que cuidar focus states, navegacion por teclado y semantica si las cartas se vuelven interactivas.

### 6. Puede generar expectativas de features no implementadas

Etiquetas como Collection o Deck sugieren sistema real de progreso. Si el sitio solo simula esa capa pero no permite guardar mazos, favoritos o progreso, la interfaz puede prometer mas de lo que entrega.

## Lectura UX

### Lo que funciona muy bien

- Refuerza la motivacion de explorar y coleccionar.
- Hace que una misma serie parezca un item valioso, no solo una ficha informativa.
- Introduce categorias mas jugables: rareza, inspiracion, cult, pilot/lost.
- Tiene buen potencial para discovery tematico y comparativo.

### Lo que habria que aterrizar mejor

- Definir una tarea principal por vista.
- Separar mejor acciones globales de filtros.
- Reducir la cantidad de estimulos simultaneos en mobile.
- Garantizar que datos funcionales sigan siendo inmediatos.

## Lectura UI

### Lo mejor del mockup

- Excelente direccion de arte.
- Paleta coherente con el imaginario comic/card shop.
- Tarjetas con silueta y framing mas premium.
- Hero mas narrativo y menos generico.
- Navegacion superior mas enfocada en eras/colecciones.

### Riesgos de UI al implementarlo

- Demasiados bordes luminosos al mismo tiempo.
- Posible inconsistencia si cada categoria usa color fuerte sin sistema claro.
- Espaciado delicado: el layout puede romperse rapido en responsive.
- Las cards necesitan una version mobile simplificada para no verse como miniaturas saturadas.

## Recomendacion estrategica

La direccion es buena y vale la pena adoptarla, pero no como copia literal del mockup en toda la web.

La mejor ruta seria una implementacion por capas:

1. Mantener la base informativa del sitio actual.
2. Revestir la experiencia con la metafora de trading cards.
3. Introducir gamificacion real solo donde haya comportamiento que la sostenga.

## Que conservar del sitio actual

- La navegacion por grandes categorias temporales o tematicas.
- La claridad de catalogo y exploracion rapida.
- La facilidad para seguir agregando shows.

## Que incorporar del mockup

- Hero editorial con narrativa de coleccion.
- Cartas con identidad visual por tipo o rareza.
- Filtros tipo chips o tabs por subcoleccion.
- Acciones de coleccion como favoritos, deck o random card.
- Modulos secundarios tipo collector notes para enriquecer contenido.

## Recomendaciones practicas para una primera iteracion

### Prioridad alta

1. Redisenar una sola seccion, por ejemplo 90's, como vertical slice del nuevo lenguaje visual.
2. Convertir las cards actuales en trading cards ligeras con borde, badge, subtitulo y stats claras.
3. Agregar un CTA real de coleccion minima: favoritos o Build Your Deck usando localStorage.
4. Mantener los metadatos importantes siempre visibles: ano, temporadas, episodios, plataforma.

### Prioridad media

1. Introducir filtro por rareza o tipo de deck.
2. Crear una vista de detalle de carta con lore, trivia y relaciones.
3. Agregar comparacion entre cards o una accion Random Card.

### Evitar en la primera version

1. Exceso de brillo, blur y efectos simultaneos.
2. Multiplicar categorias visuales sin una taxonomia de datos clara.
3. Simular coleccion avanzada sin persistencia real.

## Decision recomendada

Si el objetivo es que la pagina deje de sentirse como un clon de plataforma de streaming y gane una identidad propia, este mockup va en la direccion correcta.

Si el objetivo prioritario fuera rapidez, mantenimiento simple y catalogacion neutra, el mockup seria demasiado ambicioso.

Conclusión: conviene usarlo como nueva direccion visual y de producto, pero aterrizado con una implementacion gradual, empezando por una sola era o coleccion y validando ahi el equilibrio entre estilo, legibilidad y utilidad.