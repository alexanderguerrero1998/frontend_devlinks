# DevLinks PWA

Hub personal para centralizar todos tus recursos de aprendizaje.

## Estructura de archivos

```
my-links-pwa/
├── index.html       ← App principal + admin panel
├── manifest.json    ← Hace la app instalable (PWA)
├── sw.js            ← Service worker (cache offline)
├── icons/
│   ├── icon-192.png ← Ícono de la app (192x192 px)
│   └── icon-512.png ← Ícono de la app (512x512 px)
└── README.md
```

## Cómo subir a GitHub Pages

1. Crea un repo en GitHub: `devlinks` (o el nombre que quieras)
2. Sube todos estos archivos al repo
3. Ve a **Settings → Pages → Source → Deploy from branch → main**
4. Tu PWA estará en: `https://TU-USUARIO.github.io/devlinks/`

## Íconos

Necesitas crear 2 íconos PNG en la carpeta `icons/`:
- `icon-192.png` → 192x192 px
- `icon-512.png` → 512x512 px

Puedes generarlos gratis en: https://realfavicongenerator.net

## Instalar la PWA

### En PC (Chrome / Edge)
1. Abre tu GitHub Pages URL
2. Busca el ícono de instalar en la barra de direcciones (⊞ o ⬇)
3. Click en "Instalar DevLinks"

### En Android (Chrome)
1. Abre la URL en Chrome
2. Toca el menú (⋮) → "Agregar a pantalla de inicio"

### En iPhone (Safari)
1. Abre la URL en Safari
2. Toca el botón compartir → "Agregar a pantalla de inicio"

## Funcionalidades

- ✅ Agregar / editar / eliminar links
- ✅ Categorías personalizables
- ✅ Búsqueda en tiempo real
- ✅ Filtro por categoría
- ✅ Funciona offline (service worker)
- ✅ Instalable en PC y celular
- ✅ Los datos se guardan en localStorage (no necesitas backend)

## Notas importantes

- Los datos se guardan en `localStorage` del navegador
- Si limpias los datos del navegador, perderás tus links
- Para hacer backup: abre DevTools → Application → Local Storage → copia el contenido
