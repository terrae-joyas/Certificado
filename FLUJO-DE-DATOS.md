# Terrae — Manual del Administrador (Centro de Operaciones)

## 1. Acceso

Ingresa por `login.html` con tu correo corporativo. Al autenticarte, el sistema te redirige a `admin.html` — el Centro de Operaciones. Tu nombre y rol aparecen siempre visibles en la esquina inferior de la barra lateral.

> **Nota de esta fase:** hoy el Centro de Operaciones guarda los datos en el almacenamiento local de tu navegador (localStorage), simulando una base de datos real, para que toda la experiencia sea funcional sin backend. Cuando se conecte FastAPI (ver `docs/GUIA-INTEGRACION-API.md`), los datos pasarán a ser compartidos entre todos los usuarios y persistentes en PostgreSQL — la interfaz no cambia.

## 2. Navegación

La barra lateral agrupa los módulos en 5 categorías:

- **General:** Dashboard Ejecutivo.
- **Inventario:** Joyas, Esmeraldas, Multimedia.
- **Certificación:** Blockchain.
- **Ciclo de vida:** Propietarios, Garantías, Mantenimientos.
- **Administración:** Usuarios y Roles, Auditoría, Configuración.

El buscador superior busca por ID o nombre de pieza y te lleva directo al módulo de Joyas con el filtro aplicado.

## 3. Flujo típico: registrar y certificar una pieza nueva

1. **Gestión de Esmeraldas** → "Registrar esmeralda": documenta la gema antes de engastarla (mina, origen, quilates, color, claridad, inclusiones).
2. **Gestión de Joyas** → "Registrar nueva pieza": completa los datos de la joya y asocia la esmeralda ya registrada. Al guardar, el sistema:
   - Genera automáticamente el **ID único** (ej. `TR-2026-00843`), validando que no exista duplicado.
   - Genera automáticamente el **código QR** (PNG, SVG y alta resolución) apuntando al Pasaporte Digital público de esa pieza.
3. Cuando la evaluación gemológica esté lista, vuelve a **Gestión de Joyas** y pulsa **"Aprobar certificado"** (✓) en la fila de la pieza: se genera el certificado con hash y firma digital.
4. Opcionalmente, en **Blockchain**, registra manualmente el anclaje (hash, wallet, smart contract) — el estado queda en "pendiente" hasta que exista la conexión real a Polygon.
5. Cuando se venda, usa **Propietarios** para registrar la titularidad (esto marca la pieza como "vendida" automáticamente) y **Garantías** para activar su cobertura.
6. Cualquier servicio posterior se documenta en **Mantenimientos**.

Cada uno de estos pasos queda registrado automáticamente en **Auditoría**, sin acción adicional de tu parte.

## 4. Roles y qué puede hacer cada uno

Ver la matriz completa en el módulo **Usuarios y Roles**. Resumen:

| Rol | Puede |
|---|---|
| Super Administrador | Todo, incluida la Configuración del sistema |
| Administrador | Gestión operativa completa, salvo Configuración |
| Gemólogo | Registrar esmeraldas y aprobar certificados |
| Operador | Registrar y editar joyas, registrar propietarios |
| Auditor | Aprobar certificados y consultar Auditoría (solo lectura fuera de eso) |
| Diseñador / Consultor | Acceso de solo lectura / reportes |

**Regla de separación de funciones:** en el backend real (Fase 1), un operador nunca puede aprobar el certificado de una pieza que él mismo registró — esta regla ya está codificada en el caso de uso `AprobarCertificadoUseCase` del backend, y el Back Office la respetará en cuanto se conecte.

## 5. Buenas prácticas

- Usa siempre el buscador y los filtros antes de crear un registro nuevo, para evitar duplicados.
- El módulo **Propietarios** contiene información personal — nunca la copies fuera del sistema ni la incluyas en campos de texto libre de otros módulos (como "Observaciones" de una joya).
- Los cambios de configuración (numeración, plantillas de certificado) afectan a **todas las piezas futuras**, no a las ya emitidas.

## 6. Resolución de problemas comunes

| Situación | Qué hacer |
|---|---|
| "Ya existe un registro con este valor" al crear | El código/correo ya está en uso; verifica el listado con el buscador |
| El QR no se generó | Ocurre solo si la creación de la pieza falló a mitad de camino; vuelve a intentar el registro |
| Cambié un rol y no veo el efecto | Los permisos del Back Office se aplicarán completamente cuando el backend con JWT esté conectado (Fase 5); hoy la matriz es informativa |
