# Terrae — Guía de Integración de la API (Fase 4+)

## 1. Único interruptor

En `js/app.js`:

```js
window.TERRAE_CONFIG = {
  apiBaseUrl: 'https://tu-api-en-railway.up.railway.app/api/v1',
  useMock: false, // ← cambiar esto
  ...
};
```

Con `useMock: false`, cada método de `TerraeAPI` (en `js/api.js`) deja de leer `PIEZAS_DEMO`/`TerraeMocks` y empieza a llamar al backend real vía `fetch()`. Ningún otro archivo necesita cambios.

## 2. Endpoints que el backend debe exponer

| Método | Ruta | Usado por |
|---|---|---|
| GET | `/catalogo` | `index.html` (colecciones) |
| GET | `/pasaporte/{id}` | `pieza.html` (todo el contenido principal) |
| GET | `/pasaporte/{id}/verificar-blockchain` | Vista Cliente de blockchain |
| GET | `/pasaporte/{id}/blockchain-tecnico` | Vista Técnica de blockchain (bajo demanda) |
| GET | `/joyas/{id}/mantenimiento` | Tabla de historial de mantenimiento |
| POST | `/joyas/{id}/mantenimiento` | Modal "Registrar mantenimiento" |
| POST | `/joyas/{id}/propietarios` | Panel privado de titularidad |
| POST | `/auth/login` | `login.html` |
| POST | `/joyas` | `admin.html` (registro de pieza) |
| POST | `/certificados/{id}/aprobar` | `admin.html` (aprobación) |

## 3. Enrutamiento para `/pieza/{id}` (ruta "bonita")

GitHub Pages es hosting estático puro: no reescribe rutas por sí solo. Para que `https://terrae.com/pieza/TR-2026-00842` funcione sin backend, hay dos opciones:

**Opción A (recomendada, sin servidor propio):** usar solo `pieza.html?id=...` en todos los enlaces internos y QR generados — es lo que ya hace este frontend (`gallery.js`, formulario de verificación). Cero configuración adicional.

**Opción B (si el negocio insiste en la URL "bonita"):** servir el frontend desde un edge/CDN con reglas de reescritura (Cloudflare Pages, Netlify, o un proxy Nginx delante de Railway) que capture `/pieza/:id` y sirva `pieza.html` conservando el path. `TerraeAPI.resolverIdDesdeUrl()` ya sabe leer el segmento de path, así que no requiere cambios en el frontend — solo configuración de infraestructura.

## 4. Autenticación

- El JWT se guarda solo en memoria (`TerraeAPI.setAccessToken`), nunca en `localStorage` — se pierde al recargar por diseño (reduce superficie de ataque XSS).
- Implementar `POST /auth/refresh` y un interceptor en `api.js → solicitar()` que reintente una vez con el refresh token ante un 401 es el siguiente paso natural antes de producción.

## 5. Códigos de estado HTTP esperados por el frontend

- `200` — pasaporte encontrado, cuerpo según el contrato de `FLUJO-DE-DATOS.md`.
- `404` — no existe ningún certificado/pieza con ese `id` → pantalla "No encontrada".
- Cualquier otro código o timeout de red → pantalla "Error" genérica.
- El campo `estado` dentro del cuerpo 200 (no el código HTTP) es lo que decide "descontinuada" / "vendida" / "certificado_pendiente" — estas NO son respuestas de error, son respuestas 200 válidas con distinto contenido.

## 6. Privacidad del propietario (recordatorio de seguridad)

El backend **nunca** debe incluir nombre, país o cualquier dato personal del propietario en la respuesta pública de `GET /pasaporte/{id}`. El objeto `propietario` en esa respuesta debe limitarse a `{ registradoPublicamente: boolean }`. Los datos personales solo se transmiten en el flujo autenticado de `POST /joyas/{id}/propietarios`, protegido por JWT.

## 7. Puntos de integración explícitamente NO implementados en Fase 3

Según lo solicitado, estos quedan preparados en el frontend pero sin lógica real — activarlos es tarea de fases posteriores y no requiere cambiar la estructura del HTML:

- **Generador automático de QR / PDF:** el certificado ya tiene los contenedores (`certificado__qr`, botón "Descargar PDF"); solo falta que el backend devuelva URLs reales.
- **Polygon / IPFS reales:** `blockchainCliente` y `blockchainTecnico` ya tienen su forma final; hoy vienen de `PIEZAS_DEMO`.
- **NFT:** la sección permanece `hidden` hasta que `pasaporte.nft` no sea `null` — no se necesita ningún flag adicional de configuración, el dato mismo decide la visibilidad.
- **SIEGEM LAB:** no tiene componente visual propio todavía; se sugiere añadirlo como un campo adicional dentro del bloque de certificado (`certificado.informeSiegemUrl`, por ejemplo) cuando se confirme la integración.
- **IA de clasificación automática de inclusiones:** la sección de microscopía ya muestra la nota `.huella-digital__ia-nota` explicando que hoy es documentación manual — cuando EmeraldChain Core exponga el endpoint, solo hay que popular `microscopia.inclusiones` con las coordenadas que la IA detecte, sin tocar `microscopy.js`.

---

## 8. Integración del Back Office (Fase 4 → Fase 5)

El Centro de Operaciones (`admin.html` + `js/admin-api.js` + `js/admin-modules/*.js`) sigue exactamente el mismo patrón de abstracción que el resto del proyecto: **todo pasa por `AdminAPI`**, hoy respaldado por `localStorage`, mañana por `fetch()` contra FastAPI. Ningún módulo de `admin-modules/` debe cambiar cuando esto ocurra — solo `admin-api.js`.

### 8.1 Mapeo de métodos de `AdminAPI` a endpoints REST

| Método de `AdminAPI` | Endpoint FastAPI equivalente (Fase 1) |
|---|---|
| `joyas.listar(filtros)` | `GET /joyas?estado=&coleccion=&cursor=` |
| `joyas.obtener(id)` | `GET /joyas/{id}` |
| `joyas.crear(datos)` | `POST /joyas` (genera ID y QR server-side) |
| `joyas.actualizar(id, cambios)` | `PATCH /joyas/{id}` |
| `joyas.aprobarCertificado(id)` | `POST /certificados/{joyaId}/aprobar` |
| `esmeraldas.*` | `GET/POST/PATCH /esmeraldas` *(nuevo recurso a añadir al backend)* |
| `blockchain.registrar/consultarEstado` | `POST /blockchain/certificados/{id}/reintentar`, `GET /blockchain/certificados/{id}/estado` |
| `propietarios.registrar` | `POST /joyas/{id}/propietarios` |
| `garantias.activar/renovar` | `POST/PATCH /joyas/{id}/garantia` *(nuevo recurso)* |
| `mantenimientos.registrar/listarTodos` | `POST /joyas/{id}/mantenimiento`, `GET /mantenimientos` *(nuevo recurso de listado global)* |
| `usuarios.*` | `GET/POST/PATCH /usuarios` |
| `auditoria.listar` | `GET /auditoria` |
| `configuracion.obtener/actualizar` | `GET/PATCH /configuracion` |
| `dashboard.obtenerIndicadores` | `GET /dashboard/indicadores` *(nuevo endpoint agregador)* |

### 8.2 Reemplazo gradual, no un big-bang

Al conectar el backend real, `admin-api.js` puede migrarse **módulo por módulo**: por ejemplo, reemplazar solo `joyas.*` para que hable con FastAPI mientras `usuarios.*` sigue en localStorage, sin romper nada — cada bloque del objeto `AdminAPI` es independiente.

### 8.3 Seguridad pendiente de activar

- El Back Office hoy no exige login real (usuario de sesión simulado). Al conectar JWT, envolver cada método de `AdminAPI` con el `Authorization: Bearer` ya disponible en `TerraeAPI.getAccessToken()` (compartido entre `api.js` y `admin-api.js`).
- La matriz de permisos del módulo Usuarios es hoy informativa; su aplicación real depende de que el backend valide el rol en cada endpoint (`@Roles(...)`, ya especificado en la Fase 1) — el frontend no debe ser la única barrera de seguridad.
- Auditoría con IP real solo es posible desde el servidor (`request.client.host` en FastAPI) — nunca confiar en una IP reportada por el cliente.
