/* ==========================================================================
   TERRAE — responsive.css
   Se carga AL FINAL, después de todas las demás hojas, en cada página.
   Breakpoints: Desktop (>1240px, por defecto en las otras hojas),
   Laptop (≤1240px), Tablet (≤1024px), Mobile (≤640px).
   Mobile-first inverso deliberado: el diseño "de marca" es el de escritorio
   (como una vitrina), y aquí se adapta hacia abajo sin romper ningún
   componente ni perder jerarquía visual.
   ========================================================================== */

/* -------------------------------------------------------------------------
   LAPTOP — ≤ 1240px
   ------------------------------------------------------------------------- */
@media (max-width: 1240px) {
  .colecciones__grid { grid-template-columns: repeat(2, 1fr); }
  .filosofia__grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
  .admin-kpis { grid-template-columns: repeat(2, 1fr); }
}

/* -------------------------------------------------------------------------
   TABLET — ≤ 1024px
   ------------------------------------------------------------------------- */
@media (max-width: 1024px) {
  :root { --altura-navbar: 76px; }

  .navbar__links { gap: var(--space-2); }

  .pasaporte-hero {
    grid-template-columns: 1fr;
    padding-top: calc(var(--altura-navbar) + var(--space-4));
  }

  .acto { grid-template-columns: 64px 1fr; gap: var(--space-2); }
  .acto__numero { font-size: 2.5rem; }

  .garantia-card,
  .servicios-grid,
  .bloque-blockchain { grid-template-columns: 1fr; gap: var(--space-2); }

  .galeria {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
  }
  .galeria__item:first-child { grid-column: span 2; grid-row: span 1; }

  .footer__grid { grid-template-columns: 1fr 1fr; gap: var(--space-4) var(--space-3); }

  .admin-layout { grid-template-columns: 1fr; }
  .admin-sidebar {
    position: fixed;
    inset-block: 0;
    left: 0;
    width: 260px;
    z-index: 150;
    transform: translateX(-100%);
    transition: transform var(--duracion-estandar) var(--easing-terrae);
  }
  .admin-sidebar.esta-abierto { transform: translateX(0); }
}

/* -------------------------------------------------------------------------
   MOBILE — ≤ 640px
   ------------------------------------------------------------------------- */
@media (max-width: 640px) {
  .contenedor { padding-inline: var(--space-2); }
  .seccion { padding-block: var(--space-5); }

  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.65rem; }

  /* Navbar: colapsa a menú hamburguesa */
  .navbar__links {
    position: fixed;
    inset: var(--altura-navbar) 0 0 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-3);
    background: var(--terrae-nogal-950);
    transform: translateX(100%);
    transition: transform var(--duracion-estandar) var(--easing-terrae);
  }
  .navbar__links.esta-abierto { transform: translateX(0); }
  .navbar__menu-toggle { display: block; }

  .hero__acciones { flex-direction: column; width: 100%; }
  .hero__acciones .boton { width: 100%; }

  .colecciones__grid { grid-template-columns: 1fr; }
  .filosofia__grid { grid-template-columns: 1fr; }

  .acto { grid-template-columns: 1fr; }
  .acto__numero { font-size: 1.75rem; }
  .acto:nth-child(even) { direction: ltr; }

  .pasaporte-hero__esmeralda { flex-wrap: wrap; gap: var(--space-2); }
  .pasaporte-hero__acciones { flex-direction: column; }
  .pasaporte-hero__acciones .boton { width: 100%; }

  .certificado { padding: var(--space-3); }
  .certificado__cabecera,
  .certificado__pie { flex-direction: column; gap: var(--space-2); align-items: flex-start; }
  .certificado__datos { grid-template-columns: 1fr; }

  .galeria { grid-template-columns: 1fr; grid-auto-rows: 240px; }
  .galeria__item:first-child { grid-column: span 1; }

  .footer__grid { grid-template-columns: 1fr; gap: var(--space-3); }
  .footer__bottom { flex-direction: column; gap: var(--space-1); }

  .propietario-panel { grid-template-columns: 1fr; text-align: center; }

  .admin-main { padding: var(--space-2); }
  .admin-kpis { grid-template-columns: 1fr; }
  .admin-topbar { flex-direction: column; align-items: flex-start; gap: var(--space-2); }

  .tabla { display: block; overflow-x: auto; white-space: nowrap; }
}

/* -------------------------------------------------------------------------
   Pantallas muy pequeñas — ≤ 380px (evitar overflow de texto grande)
   ------------------------------------------------------------------------- */
@media (max-width: 380px) {
  .hero__marca { letter-spacing: 0.08em; }
  .login-caja { padding: var(--space-3); }
}
