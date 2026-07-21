# Terrae — Guía de Estilos

Sistema de diseño derivado exclusivamente del logotipo oficial Terrae. Ningún color o tipografía ajenos a lo aquí documentado debe introducirse en ninguna página o componente.

---

## 1. Principio rector: Lujo Silencioso

La interfaz de Terrae nunca debe sentirse como un producto "tech". Cada decisión visual se evalúa contra estas cuatro preguntas:

1. ¿Un maestro joyero reconocería esto como parte de su oficio?
2. ¿Hay espacio en blanco suficiente para que la pieza (o el dato) respire?
3. ¿La animación tiene un propósito narrativo, o es decoración repetida?
4. ¿Esto se vería igual de bien impreso en un certificado físico?

Si la respuesta a alguna es "no", se revisa el componente.

---

## 2. Color

| Token | Hex | Rol |
|---|---|---|
| `--terrae-verde-950` | `#0E3B2E` | Primario — fondos de marca, botones primarios |
| `--terrae-oro-500` | `#B8935A` | Secundario — bordes, acentos, tipografía de marca |
| `--terrae-nogal-950` | `#1A1410` | Fondo base de toda la interfaz |
| `--terrae-marfil-100` | `#F3EDE0` | Texto principal sobre fondo oscuro |
| `--terrae-esmeralda-500` | `#0F9D63` | Resaltado — verificación, éxito, CTAs críticos |

**Reglas:**
- El certificado (`.certificado`) es la única superficie que invierte fondo/texto (Marfil sobre el que se lee en Nogal) — replica el papel físico.
- Nunca usar azul, rojo saturado, morado o gris frío. Los estados de error usan rojo óxido (`#7A2E2E`), nunca rojo semáforo.
- El Oro Satinado nunca compite visualmente con el Verde Terrae: el oro enmarca, el verde ancla.

---

## 3. Tipografía

| Familia | Rol | Peso típico |
|---|---|---|
| Cormorant Garamond | Titulares, storytelling, certificado | 300–600, itálica para acentos narrativos |
| Jost | UI funcional, cuerpo de texto, botones | 300–500 |
| JetBrains Mono | Datos técnicos: hash, tx_hash, SKU, fechas de sistema | 400–500 |

**Escala** (variables en `style.css`): `--text-display-xl` (64px aprox.) → `--text-mono` (13px). Todos los tamaños usan `clamp()` donde aplica para fluidez entre breakpoints sin medias queries adicionales.

**Regla de contraste tipográfico deliberado:** cualquier dato verificable (hash, número de certificado, timestamp) se presenta siempre en JetBrains Mono, incluso dentro de un párrafo en Jost — la fuente monoespaciada es la señal visual de "esto es un dato, no prosa de marca".

---

## 4. Espaciado

Escala de 8px: `--space-1` (8px) a `--space-8` (128px). El mínimo aceptable de aire alrededor de un bloque de contenido de marca es `--space-3` (24px) — nunca menos, incluso en mobile.

---

## 5. Bordes, sombras y radios

- Radio máximo: `--radius-md` (4px). Nunca `border-radius` grande tipo "pill" salvo en `.badge` (círculo/píldora, por convención de indicador de estado, no de botón).
- Borde de marca estándar: `1px solid rgba(184, 147, 90, 0.35)` (`--borde-oro`), se intensifica a opaco en hover/focus.
- Sombras: siempre suaves y tibias (`--sombra-suave`, con tinte verde, no negro puro) — nunca `box-shadow` gris de Material Design.

---

## 6. Movimiento

- Duración estándar: 400–600ms (`--duracion-estandar`), easing `cubic-bezier(0.4, 0, 0.2, 1)`.
- Transiciones de color/borde en hover, nunca `scale()` en botones.
- Scroll reveal: fade + traslado vertical de 24px, una sola vez por elemento.
- El único momento de animación con significado narrativo explícito es el "revelado" del sello de verificación blockchain — todo lo demás es sutil y funcional, no espectáculo.
- `prefers-reduced-motion: reduce` se respeta globalmente (ver `style.css`, sección 7).

---

## 7. Iconografía

SVG lineales de 1.2–1.5px de grosor de trazo, sin relleno sólido salvo puntos de estado. No se usan librerías de íconos genéricas (Feather, Material Icons) — cada ícono se dibuja a medida para mantener coherencia con el trazo del logotipo.

---

## 8. Fotografía

- Editorial, luz natural, nunca fondo blanco de e-commerce genérico.
- Las imágenes placeholder incluidas en `assets/img/` marcan explícitamente su carácter temporal ("Placeholder — reemplazar por fotografía editorial de marca") y deben sustituirse antes de producción.

---

## 9. Voz y tono del contenido (copy)

- Verbos en modo activo e imperativo cortés: "Registra tu titularidad", no "Puede registrar su titularidad si lo desea".
- Los errores nunca se disculpan ni son vagos: "No fue posible registrar la pieza. Intenta de nuevo." — nunca "Oops, algo salió mal 😅".
- Los datos técnicos (hash, tx_hash) nunca se traducen ni se paran-frasean — se muestran tal cual, en `--font-mono`.
- El slogan de marca ("Lo que la tierra esconde, Terrae lo revela") se usa como cierre narrativo, no como relleno repetido en cada sección.
