# Terrae — Documentación de Componentes

Cada componente vive en `css/style.css` (base) salvo que se indique otra hoja. El nombrado de clases sigue una convención BEM ligera en español: `.bloque__elemento--modificador`.

---

## Navbar

**Clases:** `.navbar`, `.navbar__inner`, `.navbar__logo`, `.navbar__links`, `.navbar__menu-toggle`
**JS:** `app.js → inicializarNavbar()`

```html
<header class="navbar">
  <div class="navbar__inner">
    <a class="navbar__logo" href="index.html">…</a>
    <nav><ul class="navbar__links" id="navbar-links">…</ul></nav>
    <button class="navbar__menu-toggle" aria-expanded="false" aria-controls="navbar-links">…</button>
  </div>
</header>
```

Se vuelve sólido (`.navbar--solida`) automáticamente al hacer scroll >40px. En mobile, `.navbar__links` se convierte en panel lateral controlado por `.esta-abierto`.

---

## Botones

**Clases:** `.boton`, con variante `.boton--primario | --secundario | --esmeralda`, y tamaño `.boton--pequeno`.

```html
<button class="boton boton--primario">Registrar pieza</button>
<a class="boton boton--secundario" href="#">Ver certificado</a>
```

Nunca usar `<button>` sin una de las clases de variante — el estilo base sin variante es intencionalmente incompleto (falta color de relleno) para forzar una decisión consciente de jerarquía visual.

---

## Cards

**Clase base:** `.card` (fondo Nogal, borde oro sutil, hover con borde intensificado).
Extendida por `.pieza-card` (landing.css) y `.servicio-card` (passport.css).

---

## Modales

**Clases:** `.modal-overlay`, `.modal`, `.modal__cerrar`
**JS:** `app.js → inicializarModales()`

```html
<button data-modal-abrir="modal-ejemplo">Abrir</button>

<div class="modal-overlay" id="modal-ejemplo" aria-hidden="true">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-ejemplo-titulo">
    <button class="modal__cerrar" data-modal-cerrar aria-label="Cerrar">✕</button>
    <h2 id="modal-ejemplo-titulo">Título</h2>
    <p>Contenido…</p>
  </div>
</div>
```

Se cierra con click fuera, botón `[data-modal-cerrar]` o tecla `Escape`. El foco se mueve automáticamente al primer elemento interactivo al abrir.

---

## Tabs

**Clases:** `.tabs`, `.tabs__boton`, `.tabs__panel`
**JS:** `app.js → inicializarTabs()`

```html
<div class="tabs" role="tablist">
  <button class="tabs__boton" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Uno</button>
  <button class="tabs__boton" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">Dos</button>
</div>
<div class="tabs__panel" id="panel-1" role="tabpanel">…</div>
<div class="tabs__panel" id="panel-2" role="tabpanel" hidden>…</div>
```

Navegación con flechas izquierda/derecha entre pestañas (patrón ARIA `tablist`).

---

## Tablas

**Clase:** `.tabla`. Encabezados en Oro Satinado sobre fondo Nogal, filas con separador sutil. En mobile se envuelve en un `<div style="overflow-x:auto">` (ver `admin.html`) para no romper el layout.

---

## Badges / Etiquetas / Estados

| Componente | Uso |
|---|---|
| `.badge.badge--verificado` | Certificación confirmada (verde Esmeralda) |
| `.badge.badge--pendiente` | En proceso (Oro Satinado) |
| `.badge.badge--revocado` | Certificado revocado (rojo óxido) |
| `.etiqueta` | Micro-texto de categoría, sin fondo |
| `.estado.estado--exito \| --alerta \| --error` | Mensajes de sistema/formulario |

---

## Timeline

**Clase:** `.timeline` (contenedor `<ol>`), `.timeline__item[data-tipo]`
**JS:** `timeline.js`
**Tipos válidos de `data-tipo`:** `certificacion`, `blockchain` (punto Esmeralda) · `propietario`, `mantenimiento` (punto Oro).

---

## Galería + Lightbox

**Clases:** `.galeria`, `.galeria__item[data-tipo]` (`foto`, `video`, `microscopia`), `.lightbox`
**JS:** `gallery.js`

El primer ítem de la galería ocupa 2×2 celdas (`.galeria__item:first-child`) para dar jerarquía a la imagen principal — patrón editorial, no grilla uniforme.

---

## Certificado

**Clase:** `.certificado` — el único componente que invierte la paleta (fondo Marfil, texto Nogal) para imitar el papel del certificado físico. Contiene el bloque `.certificado__datos` siempre en `--font-mono`.

---

## Sello de verificación blockchain

**Clase:** `.sello-blockchain[data-estado]`
**Estados:** `verificando` (Oro) · `verificado` (Esmeralda, por defecto vía CSS) · `error` (rojo óxido)
**JS:** `blockchain.js → verificarYActualizarSello()`

---

## Formularios

**Clases:** `.campo`, `.campo__label`, `.campo__input | __select | __textarea`, `.campo__ayuda`, `.campo__error`

Estilo "editorial": borde inferior únicamente, sin caja ni sombra. El foco cambia el borde a Esmeralda. Todo input debe tener un `<label>` asociado — no se usan placeholders como sustituto de label en ningún formulario del proyecto.

---

## Footer

**Clases:** `.footer`, `.footer__grid`, `.footer__links`, `.footer__bottom`
Cuatro columnas (marca, redes, contacto, legal) que colapsan a 2 columnas en tablet y 1 en mobile.

---

## Scroll Reveal

**Clase:** `.revelar` (+ `.esta-visible` cuando entra en viewport)
**JS:** `app.js → inicializarScrollReveal()` (IntersectionObserver)

Aplicar a bloques de contenido narrativo (secciones de historia, intros). No aplicar a componentes funcionales críticos (formularios, navegación) para no retrasar su disponibilidad percibida. Si el usuario tiene `prefers-reduced-motion: reduce`, todos los elementos `.revelar` se muestran inmediatamente sin animación.

---

## Componentes de la Fase 3 (Pasaporte Digital Inteligente)

### Estados de pantalla

**Clase:** `.estado-pantalla[data-tipo]`, contenedores `[data-estado-pasaporte="cargando|error|no-encontrada|descontinuada|vendida|listo"]`
**JS:** `passport.js → mostrarEstado()`

Solo un estado está visible a la vez (clase `.esta-activo`). El estado `listo` envuelve todo el contenido principal del pasaporte.

### Loader

**Clase:** `.loader` — spinner circular discreto en Oro Satinado, sin texto "Cargando..." superpuesto (el contexto ya lo indica). Usado en el estado `cargando`, en la vista técnica de blockchain y en la tabla de mantenimiento mientras resuelven su propio `fetch()`.

### Alertas

**Clase:** `.estado.estado--exito | --alerta | --error` (ya documentada arriba) — reutilizada como sistema de alertas transitorias en formularios (`mostrarAlerta()` en `maintenance.js`, `mostrarMensajePanel()` en `owner.js`). No se usa `alert()` del navegador salvo como fallback de "copiar enlace" en `compartir-certificado`.

### Visor Premium (Galería)

**Clase:** `.visor-premium`, `.visor-premium__miniaturas`, `.visor-premium__principal`, `.visor-premium__modo-tabs`
**JS:** `gallery.js → inicializarVisorPremium()`

Miniaturas + imagen principal con zoom en clic + botón de pantalla completa (reutiliza `.lightbox`) + tabs de modo (Fotografía / 360° / Modelo 3D). Los modos 360°/3D están **preparados, no funcionales**: muestran un placeholder explícito y su botón permanece `disabled` si `modelo360Disponible`/`modelo3dDisponible` son `false` en los datos de la pieza.

### Huella Digital (Microscopía)

**Clase:** `.huella-digital`, `.huella-digital__punto[style="--x;--y"]`
**JS:** `microscopy.js`

Puntos interactivos posicionados por porcentaje sobre la fotografía microscópica; al enfocarlos/clicarlos muestran un tooltip con el tipo de inclusión. La lista completa de inclusiones se repite en texto plano debajo para accesibilidad (no todo el contenido depende de hover/posición).

### Blockchain — vista dual

**Clase:** `.blockchain-vistas`, paneles `[data-vista-blockchain="cliente|tecnica"]`
**JS:** `blockchain.js`

La vista Cliente es la que carga por defecto (sello simple). El botón "Ver información técnica" alterna a la vista Técnica, que hace una llamada adicional bajo demanda (`obtenerDetalleTecnicoBlockchain`) — no se carga hasta que el usuario la pide explícitamente.

### NFT (condicional)

**Clase:** `.seccion-nft[hidden]`
**JS:** `nft.js`, activado por el evento `terrae:nft-detectado` que dispara `blockchain.js` solo si `pasaporte.nft` no es `null`.

### Historial de Mantenimiento

**Clase:** `.tabla` reutilizada, contenedor `[data-componente="tabla-mantenimiento"]`
**JS:** `maintenance.js`

Tabla poblada vía `fetch()` propio (no depende del evento central `terrae:pasaporte-cargado`, ya que es información "bajo demanda" del historial completo). El modal `#modal-mantenimiento` reutiliza el componente Modal genérico de `style.css`.

---

## Componentes del Centro de Operaciones (Fase 4 — `js/admin-app.js`, namespace `BO`)

Estos componentes son exclusivos del back office (`admin.html`) y viven en el objeto global `BO`. Ningún módulo de `admin-modules/` debe reimplementar tabla, drawer, toast o confirmación por su cuenta — siempre a través de `BO.*`.

### DataTable — `BO.renderizarTabla(contenedor, { columnas, filas, filaVacia, porPagina })`

Tabla con orden por columna (clic en encabezado, `aria-sort`), paginación simple y estado vacío configurable. Cada columna define `{ clave, titulo, ordenable?, render? }` — `render(fila)` permite insertar badges, botones de acción o formato de moneda sin acoplar la tabla a un tipo de dato específico.

### Drawer — `BO.abrirDrawer({ titulo, cuerpoHTML, alGuardar, textoGuardar })`

Panel lateral deslizante para formularios de creación/edición (`.bo-drawer`). Serializa el formulario con `FormData`, deshabilita el botón mientras guarda, y maneja errores mostrando un `BO.toast()`. Se usa en todos los módulos con CRUD (Joyas, Esmeraldas, Propietarios, Garantías, Mantenimientos, Usuarios).

### Toast — `BO.toast(mensaje, tipo)`

Notificación transitoria (4.5s) en la esquina inferior derecha. `tipo` es `'exito' | 'error' | 'alerta'`, reutilizando los mismos colores semánticos que `.estado` del sitio público.

### Confirm — `BO.confirmar({ titulo, texto, textoConfirmar, peligroso })`

Reemplaza el `confirm()` nativo del navegador por un modal de marca. Devuelve una `Promise<boolean>` — usar siempre `await BO.confirmar(...)` antes de acciones destructivas (archivar, desactivar usuario).

### Uploader — `BO.inicializarUploader(contenedor, { tiposPermitidos, maxMB, onCambio })`

Carga de archivos con arrastrar-y-soltar, validación de tipo MIME y tamaño máximo (usa `BO.validadores.tipoArchivoPermitido` / `tamanoMaximoMB`), y lista removible de archivos seleccionados. No sube nada a ningún servidor todavía — expone `obtenerArchivos()` para cuando el formulario que lo contiene se envíe a un backend real.

### Validadores — `BO.validadores.*` y `BO.validarFormulario(datos, reglas)`

Funciones puras reutilizables: `requerido`, `numeroPositivo`, `longitudMaxima(n)`, `email`, `sinDuplicado(valor, lista, campo)` (async, para chequear contra `AdminAPI` antes de guardar), `tipoArchivoPermitido`, `tamanoMaximoMB`. `validarFormulario` evalúa un mapa `{ campo: [validador1, validador2] }` y devuelve `{ esValido, errores }`.

### Sanitización — `BO.escapeHtml(valor)`

Obligatorio antes de insertar en `innerHTML` cualquier dato que provenga de un formulario o de `AdminAPI` (protección XSS). Todos los `render()` de columnas de tabla y todo el contenido de los drawers en `admin-modules/` pasan sus valores por esta función.

### Visor QR / Visor PDF

**Clases:** `.bo-visor-qr`, `.bo-visor-pdf` — muestran la imagen del QR generado (con botones de descarga PNG/SVG) y un placeholder para el certificado PDF hasta que exista el generador real (ReportLab en el backend).

### Matriz de permisos

**Clase:** `.bo-matriz-permisos` — tabla de solo lectura que cruza los 7 roles contra las acciones críticas del sistema (módulo Usuarios y Roles).
