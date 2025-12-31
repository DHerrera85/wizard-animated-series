# 🚀 Wizard Animated Series - Project Roadmap & Action Plan

**Última Actualización:** 31 de Diciembre, 2025  
**Versión del Proyecto:** 1.1 (Post Hamburger Menu)

---

## 📋 Resumen Ejecutivo

Sitio web galería de personajes de comics y series animadas. **Objetivo principal:** crear una galería profesional escalable (no streaming, no pirata) que permita agregar videos, links a comics y expandir funcionalidades.

**Estado Actual:** 
- ✅ Estructura base sólida
- ✅ Hamburger menu mobile implementado
- ⏳ Optimizaciones y features pendientes

---

## ✅ Lo que YA SE IMPLEMENTÓ

### Sprint 1: Hamburger Menu (Completado ✓)
- [x] Reemplazar Flickity carousel mobile nav con hamburger button
- [x] Crear mobile drawer que se abre/cierra fluidamente
- [x] Animación del icono hamburguesa (3 líneas → X)
- [x] Layout vertical correcto de items
- [x] Click-to-close en links y overlay
- [x] Scroll-spy para enlace activo
- [x] Accesibilidad (ARIA labels)
- [x] Commit & Push a GitHub

---

## 🎯 PLAN DE ACCIÓN - FASE 2 (Corto Plazo)

### FASE 2A: Optimización de Rendimiento & Data Structure (2-3 días)

#### Task 1: Lazy Loading de Imágenes
**Prioridad:** ALTA  
**Descripción:** Implementar lazy loading para mejorar performance

```javascript
// Ejemplo:
<img src="placeholder.jpg" data-src="actual.jpg" alt="Show" loading="lazy">
```

**Beneficios:**
- Carga más rápida de página
- Menor uso de datos en móvil
- SEO mejorado

**Archivos a modificar:**
- `index.html` - Agregar `loading="lazy"` a todas las imágenes
- `style.css` - Styles para blur-up effect (opcional)
- `script.js` - Intersectionobserver para custom lazy load (opcional)

---

#### Task 2: Estructura JSON de Datos (3-4 días)
**Prioridad:** ALTA  
**Descripción:** Desacoplar contenido del HTML

**Problema actual:**
- Datos hardcodeados en HTML (difícil de mantener)
- Agregar un nuevo show = editar HTML manualmente
- No escalable

**Solución propuesta:**
```
/data/
├── shows.json          # Todos los shows
├── platforms.json      # Plataformas (Disney+, Netflix, etc)
└── genres.json         # Géneros/Categorías
```

**Estructura JSON ejemplo:**
```json
{
  "shows": [
    {
      "id": "marvel-zombies",
      "title": "Marvel Zombies",
      "year": 2025,
      "episodes": 4,
      "seasons": 1,
      "description": "Survivors battle a zombie-plagued Marvel universe.",
      "category": "adult",
      "platform": "disney-plus",
      "images": {
        "hero": "img/hero/marvel-zombies-1280x720.png",
        "card": "img/latest-adult/marvel-zombies-280x420.png",
        "thumb": "img/thumbs/marvel-zombies-150x225.png"
      },
      "links": {
        "watch": "https://disneyplus.com/...",
        "imdb": "https://imdb.com/...",
        "myanimelist": null
      },
      "tags": ["marvel", "adult", "action"],
      "rating": 8.5,
      "status": "active"
    }
    // ... más shows
  ]
}
```

**Beneficios:**
- Fácil agregar/editar/eliminar shows
- Reutilizable para API futura
- Base para búsqueda y filtros

---

### FASE 2B: Búsqueda & Filtros (2-3 días)

#### Task 3: Search Bar Funcional
**Prioridad:** MEDIA  
**Descripción:** Agregar búsqueda en tiempo real

**Ubicación:** Header (visible en desktop y mobile drawer)

**Funcionalidad:**
- Buscar por título de show
- Buscar por año
- Buscar por plataforma
- Resultados en tiempo real mientras escribes

```html
<input type="search" id="searchBox" placeholder="🔍 Buscar shows..." />
```

**Script ejemplo:**
```javascript
const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const results = shows.filter(show => 
    show.title.toLowerCase().includes(query) ||
    show.tags.some(tag => tag.includes(query))
  );
  displayResults(results);
});
```

---

#### Task 4: Sistema de Filtros
**Prioridad:** MEDIA  
**Descripción:** Filtrar shows por categorías

**Filtros propuestos:**
- Por tipo: Adult / Family / All
- Por año: 2010's, 2000's, 90's, 2020's
- Por plataforma: Disney+, Netflix, HBO Max, etc
- Por estado: Active, Upcoming, Completed

---

## 📊 PLAN DE ACCIÓN - FASE 3 (Mediano Plazo)

### FASE 3A: Interactividad (3-4 días)

#### Task 5: Modal/Card Expandible de Detalles
**Prioridad:** MEDIA  
**Descripción:** Mostrar más información al clickear un show

**Información a mostrar:**
- Imagen grande
- Sinopsis completa
- Géneros/Tags
- Rating (si aplica)
- Link a plataforma
- Botón "Ver en..." (Disney+, Netflix, etc)
- Información del creador/estudio

```html
<div class="show-modal" id="showModal">
  <div class="modal-content">
    <button class="close-modal">✕</button>
    <img src="..." alt="..." />
    <h2>Título</h2>
    <p class="synopsis">...</p>
    <div class="show-details">
      <span>Año: 2025</span>
      <span>Plataforma: Disney+</span>
      <span>Rating: 8.5/10</span>
    </div>
    <a href="#" class="cta-button">Ver en Disney+</a>
  </div>
</div>
```

---

#### Task 6: Sistema de Favoritos
**Prioridad:** BAJA  
**Descripción:** Guardar shows favoritos en localStorage

**Funcionalidad:**
- Botón corazón en cada card
- Click para agregar/remover favoritos
- Página "Mis Favoritos" con lista persistente
- Badge contador de favoritos

```javascript
// Guardar favorito
localStorage.setItem('favorites', JSON.stringify(favoriteIds));

// Recuperar al cargar página
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
```

---

### FASE 3B: Escalabilidad Backend (1 semana)

#### Task 7: Sistema de Comentarios/Ratings
**Prioridad:** BAJA  
**Descripción:** Usuarios pueden comentar y valorar shows

**Opciones:**
- Firebase Realtime Database (fácil)
- Supabase (PostgreSQL open-source)
- Backend propio con Node.js

**Funcionalidad:**
- Comentarios anónimos o registrados
- Rating 1-10 estrellas
- Moderación básica

---

#### Task 8: API REST Propia (Opcional)
**Prioridad:** BAJA  
**Descripción:** Backend para datos dinámicos

**Stack sugerido:**
- Node.js + Express
- MongoDB o PostgreSQL
- Autenticación JWT (si necesita admin)

**Endpoints:**
```
GET  /api/shows           # Listar todos
GET  /api/shows/:id       # Detalle
POST /api/shows/:id/comment # Nuevo comentario
GET  /api/shows?filter=... # Con filtros
```

---

## 🎬 PLAN DE ACCIÓN - FASE 4 (Largo Plazo)

### FASE 4A: Integración de Contenido (2+ semanas)

#### Task 9: Integración de Trailers/Videos
**Descripción:** Embeber videos de YouTube o similar

```html
<!-- Modal con video -->
<div class="video-modal">
  <iframe src="https://www.youtube.com/embed/..." title="Trailer"></iframe>
</div>
```

**Archivos a modificar:**
- `shows.json` - Agregar campo `videoUrl`
- `index.html` - Componente video modal
- `script.js` - Lógica play/pause

---

#### Task 10: Links a Comics & Recursos
**Descripción:** Agregar links a comics, libros, merchandise

```json
"links": {
  "watch": "https://...",
  "comics": [
    {"title": "Series A", "url": "https://..."},
    {"title": "Series B", "url": "https://..."}
  ],
  "merchandise": "https://..."
}
```

---

#### Task 11: Integración con MyAnimeList (si aplica)
**Descripción:** Para shows de anime, mostrar datos de MAL

```
API: https://api.myanimelist.net/v2/anime?query=...
Datos: Rating, Users, Episodes, etc
```

---

### FASE 4B: Analytics & SEO (1 semana)

#### Task 12: Google Analytics
- Tracking de páginas vistas
- Comportamiento de usuarios
- Filtros más usados
- Shows más visitados

---

#### Task 13: SEO Optimization
- Meta tags dinámicos por show
- Open Graph para redes sociales
- Schema.org markup
- Sitemap dinámico

---

## 📱 Mejoras Adicionales Sugeridas

### UI/UX Enhancements

| Feature | Prioridad | Descripción |
|---------|-----------|-------------|
| Dark Mode Toggle | BAJA | Tema claro/oscuro switcheable |
| Carrusel de "Trending" | MEDIA | Shows más populares en hero |
| Breadcrumbs | BAJA | Navegación: Home > Category > Show |
| Pagination | BAJA | Si base de datos crece |
| Infinite Scroll | BAJA | Auto-load más shows al scroll |
| Notificaciones | BAJA | "Nuevo show agregado" |

### Performance

| Task | Prioridad | Descripción |
|------|-----------|-------------|
| Image Optimization | ALTA | Convertir a WebP, comprimir |
| CSS/JS Minification | ALTA | Reducir tamaño |
| CDN | MEDIA | Para servir imágenes rápido |
| Service Worker | BAJA | PWA offline mode |
| Caching | MEDIA | Browser caching de assets |

---

## 📈 Métricas de Éxito

- **Velocidad:** < 2s en mobile (3G)
- **Performance Score:** > 90 (Lighthouse)
- **SEO Score:** > 95
- **Accesibilidad:** > 95 (WCAG AA)
- **Funcionalidad:** 100% de features sin bugs

---

## 🔄 Workflow Sugerido

### Para cada Task:
1. **Crear rama:** `git checkout -b feature/nombre`
2. **Desarrollo:** Hacer cambios
3. **Testing:** Probar en mobile & desktop
4. **Commit:** Con mensaje descriptivo
5. **Push:** `git push origin feature/nombre`
6. **Pull Request:** Merge a main
7. **Deploy:** A producción

### Herramientas Recomendadas:
- **Staging:** Netlify (already using?)
- **Logs:** GitHub Issues para tracking
- **Design:** Figma para mockups
- **Testing:** Jest para unit tests

---

## 🎓 Recursos & Referencias

### Documentación:
- MDN Web Docs: https://developer.mozilla.org/
- Can I Use: https://caniuse.com/
- Web.dev: https://web.dev/

### Librerías Útiles:
- **Search:** Lunr.js o Fuse.js
- **Modals:** A11y Dialog
- **Lazy Load:** lazysizes.js
- **Analytics:** Plausible o Fathom

### Inspiración:
- IMDb.com (estructura de datos)
- MyAnimeList.net (UI anime shows)
- Letterboxd.com (reviews & ratings)

---

## 📅 Timeline Estimado

```
Fase 2 (Rendimiento): 1-2 semanas
├─ Task 1-2: 5-7 días
├─ Task 3-4: 4-5 días
└─ Testing: 2-3 días

Fase 3 (Interactividad): 2-3 semanas
├─ Task 5-6: 5-7 días
├─ Task 7-8: 7-10 días
└─ Testing: 3-5 días

Fase 4 (Escalabilidad): 4-6 semanas
├─ Task 9-11: 10-14 días
├─ Task 12-13: 7-10 días
└─ Optimización: 3-5 días

TOTAL: ~3 meses para full implementation
```

---

## 🚨 Próximos Pasos Inmediatos

**Semana 1:**
- [ ] Implementar lazy loading (Task 1)
- [ ] Crear estructura JSON de shows (Task 2)
- [ ] Validar datos con algunos shows

**Semana 2:**
- [ ] Agregar search bar (Task 3)
- [ ] Implementar filtros (Task 4)
- [ ] Testing en mobile

**Semana 3:**
- [ ] Modal de detalles (Task 5)
- [ ] Sistema de favoritos (Task 6)
- [ ] Pulir UX/animaciones

---

## 📝 Notas Importantes

1. **No romper funcionalidad existente:** Cada cambio debe ser backward compatible
2. **Mobile-first:** Diseñar para mobile primero, luego desktop
3. **Testing:** Probar en dispositivos reales antes de commit
4. **Documentación:** Mantener README.md actualizado
5. **Accesibilidad:** WCAG 2.1 AA como mínimo
6. **Performance:** Lighthouse score > 90 antes de deploy

---

## 👤 Información de Contacto/Responsable

**Proyecto:** Wizard Animated Series Gallery  
**Propietario:** Herre  
**Última Revisión:** 31 Dic 2025  
**Próxima Revisión:** 15 Ene 2026  

---

**Este documento es vivo y debe actualizarse conforme se avance en el proyecto.**
