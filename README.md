# Terrae — Frontend Premium

### *"Lo que la tierra esconde, Terrae lo revela"*

Frontend estático (HTML5 + CSS3 + JavaScript ES6+, **sin frameworks**) del ecosistema digital Terrae. Implementa la identidad visual "lujo silencioso" definida en la Fase 0, y queda preparado para conectarse con el backend FastAPI de la Fase 1 sin necesidad de reestructurar el proyecto.

---

## 1. Estructura del proyecto

```
frontend/
├── index.html          Landing premium (hero, historia, colecciones, filosofía)
├── pieza.html           Pasaporte Digital de una joya
├── admin.html           Panel del taller (registro, certificación, inventario)
├── login.html            Acceso al panel
│
├── css/
│   ├── style.css          Base: reset, design tokens, tipografía, componentes comunes
│   ├── landing.css        Hero, storytelling, colecciones, filosofía
│   ├── passport.css       Layout del Pasaporte Digital
│   ├── certificate.css    Vista del certificado + sello blockchain
│   ├── timeline.css       Línea de tiempo de trazabilidad
│   ├── gallery.css        Galería de multimedia + lightbox
│   ├── admin.css          Panel administrativo y login
│   └── responsive.css     Breakpoints (laptop/tablet/mobile), se carga al final
│
├── js/
│   ├── app.js             Configuración global, mocks, navbar, scroll reveal, modales, tabs
│   ├── api.js              Único cliente de integración con el backend (TerraeAPI)
│   ├── passport.js        Orquesta la carga del Pasaporte Digital
│   ├── gallery.js          Catálogo dinámico + galería + lightbox
│   ├── timeline.js         Renderiza la trazabilidad
│   ├── blockchain.js      Sello de verificación on-chain + visibilidad NFT
│   ├── owner.js            Registro de propietario
│   └── admin.js            Login, registro de joyas, aprobación de certificados
│
├── assets/
│   ├── logo/               Logotipos oficiales (4 variantes provistas)
│   ├── icons/               Favicon SVG, ícono QR de ejemplo
│   ├── img/                 Imágenes placeholder (reemplazar por fotografía real)
│   ├── video/                Preparado para el video de fondo del hero (ver LEEME.txt)
│   └── fonts/                 Preparado para auto-hospedar tipografías (ver LEEME.txt)
│
├── docs/
│   ├── COMPONENTES.md       Documentación de cada componente reutilizable
│   └── GUIA-DE-ESTILOS.md    Guía de estilos (color, tipografía, espaciado)
│
├── manifest.json
└── README.md               Este archivo
```

---

## 2. Despliegue en GitHub Pages

1. Sube el contenido de `frontend/` a la raíz de un repositorio de GitHub (o a una carpeta `/docs` o rama `gh-pages`, según prefieras).
2. En el repositorio: **Settings → Pages → Source** → selecciona la rama y carpeta donde quedó `index.html`.
3. GitHub Pages publicará el sitio en `https://<usuario>.github.io/<repositorio>/`.
4. No se requiere build step: es HTML/CSS/JS puro, sin bundler ni `node_modules`.
5. Actualiza `og:url` y `canonical` en cada HTML con el dominio final antes de publicar en producción (hoy apuntan a `https://terrae.com/` como placeholder).

### Dominio propio (opcional)
Si Terrae usa un dominio propio, añade un archivo `CNAME` en la raíz con el dominio (ej. `terrae.com`) y configura el DNS del proveedor apuntando a GitHub Pages.

---

## 3. Cómo correrlo en local

No requiere instalación de dependencias. Basta con servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
cd frontend
python3 -m http.server 8080
# abrir http://localhost:8080
```

(Abrir `index.html` directamente con doble clic también funciona, salvo por restricciones de `fetch` en `file://` en algunos navegadores — se recomienda el servidor local de arriba.)

---

## 4. Puntos de integración con el backend (Fase 3+)

**Todo el tráfico hacia el backend pasa exclusivamente por `js/api.js` (objeto `TerraeAPI`).** Ningún otro archivo hace `fetch()` directo. Para conectar el backend FastAPI real:

1. En `js/app.js`, dentro de `window.TERRAE_CONFIG`:
   ```js
   apiBaseUrl: 'https://tu-api-en-railway.up.railway.app/api/v1',
   useMock: false,
   ```
2. Cada método de `TerraeAPI` ya tiene la llamada real comentada junto al mock (buscar `// MOCK —` en `api.js`).
3. Endpoints que este frontend espera del backend (ver Documento de Arquitectura, Fase 1, sección 7):
   - `GET /catalogo`
   - `GET /pasaporte/{codigo}`
   - `GET /pasaporte/{codigo}/verificar-blockchain`
   - `POST /auth/login`
   - `POST /joyas` (multipart)
   - `POST /certificados/{joyaId}/aprobar`
   - `POST /joyas/{joyaId}/propietarios`
   - `POST /joyas/{joyaId}/mantenimiento`
4. Autenticación: el JWT se guarda solo en memoria (`TerraeAPI.setAccessToken`), nunca en `localStorage`, para reducir superficie de ataque XSS. Esto significa que la sesión se pierde al recargar — implementar refresh-token silencioso vía `POST /auth/refresh` es el siguiente paso natural en Fase 3.
5. La sección NFT de `pieza.html` permanece con `hidden` hasta que `TERRAE_CONFIG.nftHabilitado = true` (Fase 6) — no requiere cambios de HTML para activarse.
6. La integración con SIEGEM LAB no tiene un componente visual propio todavía; el campo `informe_siegem_id` del modelo de datos (Fase 1) se reflejará como un dato adicional en el bloque de certificado cuando se confirme la integración.

---

## 5. Calidad y estándares aplicados

- **Accesibilidad (WCAG 2.1 AA):** navegación por teclado completa, foco visible (`:focus-visible`), etiquetas ARIA en navbar/tabs/modales, `prefers-reduced-motion` respetado, contraste verificado entre Marfil/Nogal y Verde Terrae/Marfil.
- **SEO:** meta tags, Open Graph, Twitter Cards, Schema.org (Organization en landing, Product en pasaporte), favicon, manifest, `canonical`.
- **Performance:** `preconnect` a Google Fonts, `preload` del poster del hero, `loading="lazy"` en imágenes de catálogo/galería, sin frameworks ni dependencias pesadas.
- **Responsive:** 4 breakpoints (desktop por defecto, laptop ≤1240px, tablet ≤1024px, mobile ≤640px) — ver `css/responsive.css`.
- **Código:** comentado, modular por responsabilidad, nomenclatura en español para el dominio de negocio (coherente con el backend de la Fase 1).

Ver `docs/COMPONENTES.md` y `docs/GUIA-DE-ESTILOS.md` para el detalle de cada componente y del sistema de diseño.
