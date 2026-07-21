# Terrae — Guía de Módulos del Centro de Operaciones

Cada módulo es un archivo independiente en `js/admin-modules/`, registrado en el router del shell (`js/admin-app.js`) vía `BO.registrarModulo(clave, { montar(contenedor) })`. La navegación es por hash (`#/dashboard`, `#/joyas`, etc.), lo que permite enlazar directamente a un módulo y mantiene el back office como una app de una sola página sin frameworks.

| # | Módulo | Archivo | Ruta |
|---|---|---|---|
| 1 | Dashboard Ejecutivo | `dashboard.js` | `#/dashboard` |
| 2 | Gestión de Joyas | `joyas.js` | `#/joyas` |
| 3 | Gestión de Esmeraldas | `esmeraldas.js` | `#/esmeraldas` |
| 4 | (Generación de ID) | integrado en `admin-api.js` | — |
| 5 | (Generador de QR) | integrado en `admin-api.js` + `joyas.js` | — |
| 6 | (Generador de Certificado PDF) | integrado en `admin-api.js` + `joyas.js` | — |
| 7 | Gestión Blockchain | `blockchain-admin.js` | `#/blockchain` |
| 8 | Gestión de Propietarios | `propietarios.js` | `#/propietarios` |
| 9 | Gestión de Garantías | `garantias.js` | `#/garantias` |
| 10 | Gestión de Mantenimientos | `mantenimientos.js` | `#/mantenimientos` |
| 11 | Gestión Multimedia | `multimedia.js` | `#/multimedia` |
| 12 | Usuarios y Roles | `usuarios.js` | `#/usuarios` |
| 13 | Auditoría | `auditoria.js` | `#/auditoria` |
| 14 | Configuración | `configuracion.js` | `#/configuracion` |

Los módulos 4, 5 y 6 del prompt original no son pantallas independientes: son **comportamientos automáticos** disparados desde el módulo Joyas (`AdminAPI.joyas.crear()` genera ID + QR; `AdminAPI.joyas.aprobarCertificado()` genera el certificado). Esto evita una pantalla vacía sin propósito propio y mantiene la generación donde el usuario la espera: en el flujo natural de registrar/aprobar una pieza.

---

## 1. Dashboard Ejecutivo

**Qué hace:** calcula 10 indicadores en tiempo real a partir de `AdminAPI.dashboard.obtenerIndicadores()` (total de joyas, disponibles, vendidas, certificados, QR, registros blockchain, garantías activas, mantenimientos, pendientes de certificación, valor de inventario) y una lista de actividad reciente tomada directamente del log de auditoría.

**Gráficos:** el bloque `.bo-grafico-barras` es SVG/CSS puro, sin librerías. Está diseñado para ser reemplazado por Chart.js, D3 o Recharts cuando el backend exponga una serie temporal real (`GET /dashboard/series`); el contenedor y el markup no necesitan cambiar.

## 2. Gestión de Joyas

**Qué hace:** CRUD completo con drawer lateral (crear/editar/consultar), tabla con búsqueda y filtro por estado, y dos acciones especiales: **Aprobar certificado** (✓) y **Archivar** (🗄). Los campos cubren todos los mínimos pedidos: ID, colección, nombre, descripción, tipo, metal, peso, dimensiones, esmeralda asociada, estado, precio, moneda, fotografías/videos (uploader), certificado, observaciones.

**Automatizaciones:** al crear, `AdminAPI.joyas.crear()` genera el ID único (módulo 4) y el QR (módulo 5) sin intervención del usuario. Al aprobar, `AdminAPI.joyas.aprobarCertificado()` genera el certificado con hash simulado (módulo 6).

## 3. Gestión de Esmeraldas

**Qué hace:** registro independiente de la gema, con todos los campos gemológicos (mina, municipio, departamento, país, peso, color, claridad, corte, tratamientos, inclusiones, fotos microscópicas, estado). El campo "Informe SIEGEM LAB" se muestra deshabilitado con la leyenda "No sincronizado — integración futura", preparado para recibir un ID real sin requerir cambios de esquema.

## 7. Gestión Blockchain

**Qué hace:** formulario para registrar manualmente hash, wallet, smart contract, bloque y gas por pieza, más un botón "Consultar estado" que hoy solo simula la respuesta. **Ningún registro pasa a "verificado" automáticamente** — esa es una regla de seguridad deliberada: solo la integración real con Polygon (Fase 5) puede confirmar un anclaje.

## 8. Gestión de Propietarios

**Qué hace:** selecciona una pieza y muestra su historial completo de titularidad (nombre, país, ciudad, tipo de adquisición, vigencia). Registrar una nueva transferencia cierra automáticamente el registro vigente anterior. **Esta información nunca debe copiarse a otros módulos ni exponerse públicamente** — ver la regla de privacidad en `docs/FLUJO-DE-DATOS.md` (Fase 3).

## 9. Gestión de Garantías

**Qué hace:** activación (cobertura + fecha de vencimiento), renovación, y cálculo de estado vigente/vencida comparando la fecha de vencimiento con la fecha actual del navegador.

## 10. Gestión de Mantenimientos

**Qué hace:** vista global (no por pieza) de todos los servicios realizados en el taller, con carga de fotografías antes/después y documentos. Complementa al historial que el cliente ve en su Pasaporte Digital (Fase 3): aquí el técnico/administrador registra, allá el cliente consulta.

## 11. Gestión Multimedia

**Qué hace:** panel de solo lectura que resume cuánto material tiene cada pieza (fotos, videos, certificado, QR). La carga real de archivos ocurre en el punto de uso (formularios de Joyas, Esmeraldas, Mantenimientos) para mantener la organización automática por ID de pieza — este módulo es el "índice", no un cajón desordenado de archivos sueltos.

## 12. Usuarios y Roles

**Qué hace:** listado de usuarios con cambio de rol en línea y activar/desactivar, más una matriz de permisos visual de los 7 roles del prompt (Super Admin, Admin, Gemólogo, Diseñador, Operador, Consultor, Auditor) contra las acciones críticas del sistema.

## 13. Auditoría

**Qué hace:** tabla de solo lectura, filtrable por entidad, de **todos** los eventos registrados automáticamente por `AdminAPI` (usuario, acción, entidad, fecha/hora). La columna IP muestra "Disponible con backend real" porque el cliente nunca puede capturar su propia IP de forma confiable — eso corresponde al servidor.

## 14. Configuración

**Qué hace:** numeración de joyas (prefijo, formato, secuencial), plantilla e idiomas de certificados, nota informativa de configuración QR, red blockchain predeterminada, idiomas/monedas/impuestos (solo lectura en esta fase), e identidad visual (siempre solo lectura — los tokens de marca de la Fase 0 no se editan desde el Back Office).
