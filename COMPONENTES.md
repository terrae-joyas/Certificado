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
