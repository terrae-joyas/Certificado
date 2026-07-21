# Terrae — Flujo de Datos del Pasaporte Digital Inteligente

## 1. Resolución del identificador

`pieza.html` acepta dos formas de URL, exigidas por la Fase 3:

- `pieza.html?id=TR-2026-00842`
- `/pieza/TR-2026-00842` (requiere reescritura de servidor, ver `GUIA-INTEGRACION-API.md`)

`TerraeAPI.resolverIdDesdeUrl()` (en `js/api.js`) es la única función que lee la URL. Si no encuentra `id`, intenta `codigo` (compatibilidad con la Fase 2) y finalmente el segmento de path después de `/pieza/`.

## 2. Secuencia de carga

```
1. passport.js → TerraeAPI.resolverIdDesdeUrl()
2. passport.js → mostrarEstado('cargando')
3. passport.js → TerraeAPI.obtenerPasaportePorId(id)
4. Según pasaporte.estado:
   - descontinuada        → mostrarEstado('descontinuada')  [fin]
   - vendida              → mostrarEstado('vendida')        [fin]
   - certificado_pendiente→ mostrarEstado('listo') + aviso no bloqueante
   - activa               → mostrarEstado('listo')
5. passport.js → renderizarContenido(pasaporte, id)
   → rellena Hero, Historia, Certificado, Garantía
   → dispara evento 'terrae:pasaporte-cargado' con el pasaporte completo
6. Todos los demás módulos escuchan ese evento y se renderizan en paralelo:
   - gallery.js      → Visor Premium (fotos/video/360°/3D preparados)
   - microscopy.js   → "La Huella Digital de tu Esmeralda"
   - timeline.js     → Trazabilidad interactiva
   - blockchain.js   → Vista Cliente (+ Vista Técnica bajo demanda)
                        → si pasaporte.nft existe, dispara 'terrae:nft-detectado'
   - maintenance.js  → Historial de mantenimiento (fetch propio, ver abajo)
   - owner.js        → Panel de titularidad privado
   - nft.js          → Solo se activa si escucha 'terrae:nft-detectado'
```

## 3. Por qué un solo evento central

`passport.js` es el ÚNICO módulo que llama a `TerraeAPI.obtenerPasaportePorId()`. Todos los demás escuchan `terrae:pasaporte-cargado` en vez de volver a pedir los mismos datos — evita llamadas duplicadas a la API y garantiza que toda la página se renderiza a partir de una sola fuente de verdad, incluso cuando el backend real (Fase 4+) tenga latencia variable.

Excepción: `maintenance.js` y la vista técnica de `blockchain.js` SÍ hacen una llamada adicional (`obtenerHistorialMantenimiento` / `obtenerDetalleTecnicoBlockchain`) porque son datos "bajo demanda" que no toda visita necesita cargar de inmediato (principio de carga diferida).

## 4. Contrato de datos esperado del backend (`GET /pasaporte/{id}`)

Ver `js/app.js → PIEZAS_DEMO` para el shape completo con datos de ejemplo. Campos obligatorios mínimos:

```
{
  id, sku, nombre, coleccion, tipoPieza, metal, pesoGramos,
  estado: "activa" | "descontinuada" | "vendida" | "certificado_pendiente",
  imagenPrincipal,
  esmeralda: { origenPredicho, confianzaIA, colorGrado, tratamiento, quilates },
  certificado: { numeroCertificado, hashSha256, urlPdf, estado, emitidoEn, fecha } | null,
  blockchainCliente: { registrado, integridadVerificada, fechaRegistro, red } | null,
  blockchainTecnico: { wallet, smartContract, hash, token, bloque, gas, transaccion, ipfs } | null,
  galeria: [{ tipo: "foto"|"video"|"microscopia", url }],
  modelo360Disponible: boolean,
  modelo3dDisponible: boolean,
  microscopia: { imagen, inclusiones: [{x,y,tipo,descripcion}], descripcionTecnica } | null,
  historia: [{ titulo, texto, media }],
  timeline: [{ tipo, fecha, lugar, responsable, hash, estado, titulo, detalle, media }],
  garantia: { fechaCompra, cobertura, vigencia, estado, fechaFin } | null,
  propietario: { registradoPublicamente: false },  // nunca datos personales aquí
  nft: { tokenId, imagen, red, marketplace, marketplaceUrl, wallet } | null,
}
```

**Regla de privacidad no negociable:** el campo `propietario` en la respuesta pública NUNCA debe incluir nombre, país o cualquier dato personal — solo un booleano de estado. Los datos personales del propietario solo viajan en endpoints autenticados (`POST /joyas/{id}/propietarios`), nunca en la respuesta pública del pasaporte.

## 5. Estados excepcionales y su origen

| Estado HTML | Disparado por | Causa típica |
|---|---|---|
| `cargando` | Inicio de `cargarPasaporte()` | Siempre, mientras la promesa está pendiente |
| `error` | `catch` genérico (no HTTP 404) | Backend caído, timeout, error 5xx |
| `no-encontrada` | Respuesta 404 o `id` ausente en la URL | ID inexistente o mal escrito |
| `descontinuada` | `pasaporte.estado === "descontinuada"` | Regla de negocio: pieza retirada del catálogo |
| `vendida` | `pasaporte.estado === "vendida"` | Regla de negocio: no se expone historia pública de otro propietario |
| `certificado_pendiente` | `pasaporte.estado === "certificado_pendiente"` | La pieza existe pero el auditor aún no aprueba el certificado |
