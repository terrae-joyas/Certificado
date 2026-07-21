/* ==========================================================================
   TERRAE — microscopy.css
   Sección exclusiva "La Huella Digital de tu Esmeralda". Presenta
   fotografías microscópicas con inclusiones señaladas mediante puntos
   interactivos superpuestos (sin analizar automáticamente aún — solo
   se muestra lo que un gemólogo ya documentó manualmente).
   ========================================================================== */

.huella-digital {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: var(--space-5);
  align-items: center;
}

.huella-digital__visor {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: var(--borde-oro);
  background: #050403;
}
.huella-digital__visor img { width: 100%; height: 100%; object-fit: cover; }

/* Puntos de inclusión señalada — posicionados vía --x/--y (0-100%) desde JS */
.huella-digital__punto {
  position: absolute;
  top: var(--y, 50%);
  left: var(--x, 50%);
  width: 18px; height: 18px;
  transform: translate(-50%, -50%);
  border: 1.5px solid var(--terrae-esmeralda-500);
  border-radius: 50%;
  background: rgba(15, 157, 99, 0.15);
  cursor: pointer;
  transition: transform var(--duracion-rapida) var(--easing-terrae);
}
.huella-digital__punto::after {
  content: '';
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  background: var(--terrae-esmeralda-500);
}
.huella-digital__punto:hover,
.huella-digital__punto:focus-visible,
.huella-digital__punto[aria-expanded="true"] { transform: translate(-50%, -50%) scale(1.4); }

.huella-digital__tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--terrae-nogal-950);
  border: var(--borde-oro-fuerte);
  padding: var(--space-1) var(--space-2);
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duracion-rapida) var(--easing-terrae);
}
.huella-digital__punto[aria-expanded="true"] .huella-digital__tooltip { opacity: 1; }

.huella-digital__info { display: flex; flex-direction: column; gap: var(--space-2); }

.huella-digital__lista { list-style: none; margin: 0; padding: 0; }
.huella-digital__lista li {
  display: flex;
  justify-content: space-between;
  padding: var(--space-1) 0;
  border-bottom: 1px solid rgba(184, 147, 90, 0.12);
  font-size: var(--text-body-sm);
}
.huella-digital__lista span:first-child { color: rgba(243, 237, 224, 0.6); }

.huella-digital__ia-nota {
  border: 1px dashed rgba(184, 147, 90, 0.35);
  padding: var(--space-2);
  font-size: 0.75rem;
  color: rgba(243, 237, 224, 0.55);
}
