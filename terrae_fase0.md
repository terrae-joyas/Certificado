# TERRAE — Fase 0: Diseño y Arquitectura de Sistema
### *"Lo que la tierra esconde, Terrae lo revela"*

**Documento preparado por el equipo multidisciplinario Terrae:**
CTO · Arquitecto de Software Enterprise · Ingeniero Full Stack Senior · Diseñador UX/UI de Lujo · Especialista Blockchain · Ingeniero DevOps · Ingeniero en Ciberseguridad · CEO

**Fecha:** Julio 2026 · **Versión:** 1.0 · **Clasificación:** Confidencial — Uso interno EmJoy SAS

---

## 0.1 Resumen Ejecutivo

Terrae es la marca de alta joyería del ecosistema EmeraldChain (bajo EmJoy SAS), enfocada en esmeraldas y plata en el segmento de lujo accesible, con fuerte identidad cultural colombiana. Este documento constituye la **Fase 0** obligatoria antes de cualquier línea de código: arquitectura de sistema, diagramas C4, diagramas de secuencia, modelo de datos, estructura de API, modelo de permisos, convenciones de código y roadmap técnico.

**Principio rector de diseño:** *Lujo Silencioso (Quiet Luxury)*. La plataforma digital de Terrae debe sentirse como una boutique atendida por un maestro joyero, no como una tienda online genérica ni como un producto "tech". Cada pixel, transición y espacio en blanco comunica artesanía, herencia y exclusividad — nunca frialdad minimalista ni estética de startup.

---

## 0.2 Paleta de Colores — Extraída del Logotipo Terrae

La paleta fue extraída directamente de los 4 logotipos oficiales suministrados (versión fondo negro, fondo blanco, línea negra, línea dorada). Se documentan los valores HEX de producción con sus roles semánticos y variables de diseño (design tokens).

| Rol | Nombre | HEX | RGB | Uso |
|---|---|---|---|---|
| Primario | **Verde Terrae** | `#0E3B2E` | 14, 59, 46 | Fondos de marca, headers, botones primarios, iconografía estructural |
| Secundario | **Oro Satinado** | `#B8935A` | 184, 147, 90 | Tipografía de marca, bordes, acentos, hover states, líneas divisorias |
| Fondo | **Nogal** | `#1A1410` | 26, 20, 16 | Fondo base de la interfaz (modo lujo/noche), profundidad de superficies |
| Texto | **Marfil** | `#F3EDE0` | 243, 237, 224 | Texto principal sobre fondo Nogal, tarjetas, certificados |
| Resaltado | **Esmeralda** | `#0F9D63` | 15, 157, 99 | CTAs críticos, estados de éxito, sello de autenticidad, badge blockchain verificado |

**Tokens derivados (uso funcional, no decorativo):**

```css
:root {
  /* Marca — núcleo */
  --terrae-verde-950: #0E3B2E;
  --terrae-verde-800: #164F3D;
  --terrae-oro-500:   #B8935A;
  --terrae-oro-300:   #D4B685;
  --terrae-nogal-950: #1A1410;
  --terrae-nogal-900: #241C16;
  --terrae-marfil-100:#F3EDE0;
  --terrae-marfil-050:#FAF7F0;
  --terrae-esmeralda-500: #0F9D63;
  --terrae-esmeralda-300: #3DBE85;

  /* Estados funcionales (nunca colores "tech" tipo azul/rojo puro) */
  --estado-exito:     var(--terrae-esmeralda-500);
  --estado-alerta:    #B8763A; /* ámbar tierra, no amarillo semáforo */
  --estado-error:     #7A2E2E; /* rojo óxido, no rojo saturado */
  --estado-info:      var(--terrae-oro-500);

  /* Superficies con profundidad artesanal (nunca sombras genéricas Material) */
  --sombra-suave: 0 4px 24px rgba(14, 59, 46, 0.18);
  --sombra-relieve-oro: inset 0 1px 0 rgba(212, 182, 133, 0.15);
}
```

**Regla de gobierno de marca:** ningún azul, rojo saturado, morado o gris frío entra al sistema de diseño. Toda variación cromática debe derivarse por tinte/sombra de estos 5 colores base — nunca introducir colores externos a la paleta extraída del logotipo.

---

## 0.3 Tipografía Oficial (única, sin excepciones)

| Familia | Uso | Pesos |
|---|---|---|
| **Cormorant Garamond** | Titulares, nombres de piezas, certificados, momentos "hero" | 300 (Light), 500 (Medium), 600 (SemiBold) — itálica para citas/storytelling |
| **Jost** | UI funcional: navegación, botones, formularios, cuerpo de texto de producto | 300, 400, 500 |
| **JetBrains Mono** | Datos técnicos: hash SHA256, IDs de certificado, direcciones blockchain, códigos QR, timestamps | 400, 500 |

**Regla estricta:** ninguna otra tipografía (ni del sistema operativo, ni de librerías por defecto como Arial/Roboto/Inter) puede aparecer en ninguna superficie de la plataforma, incluidos correos transaccionales, PDFs de certificado y páginas de error 404.

```css
--font-display: 'Cormorant Garamond', serif;
--font-ui: 'Jost', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

---

## 0.4 Dirección de Moodboard — "Lujo Silencioso"

No se reproducen imágenes de las casas de referencia (derechos de autor), pero se documenta la dirección de diseño que un diseñador de UX de lujo extraería de ellas, aplicada exclusivamente con la paleta y tipografía de Terrae:

- **De Cartier:** simetría ceremonial, uso de la caja/marco (como el marco dorado del logo Terrae) como elemento recurrente de composición — nunca tarjetas con `border-radius` genérico de 8px estilo SaaS.
- **De Patek Philippe:** ritmo pausado — micro-interacciones lentas (400–600ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`), fotografía de producto a pantalla completa, cero "gamificación" visual.
- **De Hermès:** artesanía tangible — texturas sutiles de papel/tela en fondos (no flat design puro), iconografía dibujada a mano vectorizada, no íconos de librerías (Material/Feather).
- **De Bvlgari:** contraste alto entre Nogal y Oro Satinado para momentos de producto; el verde y el oro nunca compiten, el oro siempre enmarca al verde (como en el logotipo).

**Prohibiciones explícitas de diseño:**
- ❌ Glassmorphism, gradientes neón, sombras Material Design por defecto.
- ❌ Iconografía "flat" genérica de librerías gratuitas sin curaduría.
- ❌ Animaciones rápidas tipo app consumer (<150ms) — todo debe sentirse deliberado.
- ❌ Layouts de grid denso tipo dashboard SaaS para las superficies de cliente final.

---

## 1. Documento de Arquitectura del Sistema

### 1.1 Visión arquitectónica

Terrae se construye como un **monorepo modular** siguiendo **Clean Architecture** con separación estricta en 4 capas concéntricas (Domain → Application → Infrastructure → Presentation), permitiendo que la lógica de negocio (autenticación de gemas, emisión de certificados, trazabilidad) sea independiente de frameworks, bases de datos y proveedores blockchain.

**Decisiones arquitectónicas clave (ADR resumido):**

| Decisión | Elección | Justificación |
|---|---|---|
| Estilo arquitectónico | Clean Architecture + Modular Monolith (no microservicios day-1) | Equipo pequeño, dominio acoplado (joya↔certificado↔blockchain); microservicios prematuros generan sobrecarga operativa sin beneficio en esta escala |
| Backend | Node.js (NestJS) + TypeScript | DI nativa, decoradores para Clean Architecture, tipado fuerte compartido con frontend |
| Frontend cliente | Next.js 14 (App Router) + TypeScript | SSR para SEO de páginas de producto/certificado público, ISR para catálogo |
| Base de datos transaccional | PostgreSQL 16 | Integridad relacional para inventario, certificados, roles |
| Almacenamiento de activos | S3-compatible (Cloudflare R2) + IPFS (Pinata) | R2 para imágenes optimizadas de UI; IPFS para el hash inmutable del certificado |
| Blockchain | Polygon (mainnet) vía Web3.py/ethers.js + Solidity | Ya validado en EmeraldChain; costos de gas bajos, compatibilidad EVM |
| Cache/colas | Redis + BullMQ | Generación asíncrona de PDF/QR y minteo blockchain sin bloquear al usuario |
| Autenticación | OAuth2/OIDC + JWT de rotación corta + refresh rotativo | Estándar de seguridad enterprise, soporta SSO futuro con partners (GIA, IGI) |
| Infraestructura | Railway (workloads actuales) con ruta de migración a AWS/GCP en Fase 3 | Continuidad con el stack ya usado en EmeraldChain |
| Observabilidad | OpenTelemetry + Grafana/Loki | Trazabilidad end-to-end de transacciones críticas (emisión de certificado) |

### 1.2 Principios no negociables

1. **Repository Pattern** en toda la capa de infraestructura: el dominio nunca importa un ORM directamente.
2. **Dependency Injection** vía contenedor de NestJS; cero instanciación manual de servicios en controladores.
3. **SOLID** aplicado estrictamente — en particular Inversion of Control para el conector blockchain (permite cambiar de Polygon a otra red EVM sin tocar el dominio).
4. **Seguridad por diseño**: ningún secreto en código, cifrado en reposo para PII, firma digital de certificados antes de anclaje blockchain, rate limiting y WAF en el borde.
5. **Idempotencia**: toda operación de minteo blockchain y generación de certificado debe ser idempotente (uso de claves de idempotencia) para tolerar reintentos sin duplicar activos digitales.

---

## 2. Diagramas C4

### 2.1 Nivel 1 — Contexto

```mermaid
C4Context
    title Terrae — Diagrama de Contexto del Sistema

    Person(cliente, "Cliente Final", "Compra piezas, verifica autenticidad de su joya")
    Person(joyero, "Maestro Joyero / Operador EmJoy", "Registra piezas, sube fotografías, gestiona inventario")
    Person(auditor, "Auditor / Gemólogo COPNIA", "Valida certificación gemológica")
    Person(publico, "Verificador Público", "Escanea QR para validar autenticidad sin login")

    System(terrae, "Plataforma Terrae", "E-commerce de lujo + certificación de trazabilidad de joyas")

    System_Ext(emeraldchain, "EmeraldChain Core", "Motor de IA de análisis gemológico y clasificación de origen")
    System_Ext(polygon, "Red Polygon", "Blockchain donde se ancla el hash del certificado")
    System_Ext(ipfs, "IPFS / Pinata", "Almacenamiento inmutable de metadata del certificado")
    System_Ext(pagos, "Pasarela de Pagos", "Procesamiento de pagos (PCI-DSS)")
    System_Ext(envio, "Logística/Envíos Asegurados", "Transporte asegurado de alta joyería")
    System_Ext(email, "Proveedor de Email Transaccional", "Notificaciones y certificados por correo")

    Rel(cliente, terrae, "Compra, consulta certificados", "HTTPS")
    Rel(joyero, terrae, "Registra piezas e inventario", "HTTPS/Admin")
    Rel(auditor, terrae, "Revisa y aprueba certificación", "HTTPS/Admin")
    Rel(publico, terrae, "Escanea QR, verifica autenticidad", "HTTPS público")

    Rel(terrae, emeraldchain, "Solicita análisis IA de la gema", "REST API")
    Rel(terrae, polygon, "Ancla hash del certificado", "Web3/RPC")
    Rel(terrae, ipfs, "Almacena metadata inmutable", "IPFS API")
    Rel(terrae, pagos, "Procesa transacciones", "REST API")
    Rel(terrae, envio, "Genera guías de envío asegurado", "REST API")
    Rel(terrae, email, "Envía certificados y confirmaciones", "SMTP/API")
```

### 2.2 Nivel 2 — Contenedores

```mermaid
C4Container
    title Terrae — Diagrama de Contenedores

    Person(cliente, "Cliente Final")
    Person(joyero, "Operador EmJoy")

    Container_Boundary(terrae_boundary, "Plataforma Terrae") {
        Container(web, "Terrae Web (Storefront)", "Next.js 14", "Catálogo de lujo, checkout, páginas públicas de certificado")
        Container(admin, "Terrae Admin", "Next.js 14 (panel protegido)", "Gestión de inventario, certificación, roles")
        Container(api, "Terrae API Gateway", "NestJS/TypeScript", "API REST/GraphQL, orquesta casos de uso, aplica Clean Architecture")
        Container(worker, "Terrae Worker", "NestJS + BullMQ", "Procesos asíncronos: minteo blockchain, generación PDF/QR, envío de emails")
        ContainerDb(db, "Base de Datos Transaccional", "PostgreSQL 16", "Piezas, certificados, usuarios, órdenes, roles")
        ContainerDb(cache, "Cache/Colas", "Redis", "Sesiones, rate limiting, colas de jobs")
        Container(blockchain_svc, "Blockchain Connector", "Web3.py/ethers.js + Solidity", "Abstracción del proveedor EVM (Polygon)")
    }

    System_Ext(emeraldchain, "EmeraldChain Core API")
    System_Ext(polygon, "Polygon Mainnet")
    System_Ext(ipfs, "IPFS/Pinata")
    System_Ext(pagos, "Pasarela de Pagos")
    System_Ext(cdn, "CDN / Object Storage (R2)")

    Rel(cliente, web, "Navega, compra, verifica", "HTTPS")
    Rel(joyero, admin, "Administra inventario", "HTTPS")
    Rel(web, api, "Consume", "REST/GraphQL sobre HTTPS")
    Rel(admin, api, "Consume", "REST/GraphQL sobre HTTPS")
    Rel(api, db, "Lee/escribe", "Prisma/TypeORM")
    Rel(api, cache, "Rate limit, sesión", "Redis Protocol")
    Rel(api, worker, "Encola jobs", "BullMQ/Redis")
    Rel(worker, blockchain_svc, "Solicita minteo/verificación", "Interno")
    Rel(worker, ipfs, "Sube metadata", "IPFS API")
    Rel(blockchain_svc, polygon, "Firma y envía transacción", "JSON-RPC")
    Rel(api, emeraldchain, "Solicita clasificación IA", "REST API")
    Rel(api, pagos, "Procesa pago", "REST API")
    Rel(web, cdn, "Sirve imágenes optimizadas", "HTTPS")
```

### 2.3 Nivel 3 — Componentes (API Gateway, Clean Architecture)

```mermaid
C4Component
    title Terrae API — Componentes internos (Clean Architecture)

    Container_Boundary(api_boundary, "Terrae API") {
        Component(controllers, "Controllers (Presentation)", "NestJS Controllers", "Validan DTOs, mapean HTTP a casos de uso")
        Component(usecases, "Use Cases (Application)", "Servicios de aplicación", "RegistrarPieza, EmitirCertificado, GenerarQR, AnclarBlockchain")
        Component(domain, "Domain Entities", "Clases de dominio puro", "Pieza, Certificado, Gema, Usuario — sin dependencias externas")
        Component(repos_interface, "Repository Interfaces (Domain)", "Interfaces TypeScript", "IPiezaRepository, ICertificadoRepository")
        Component(repos_impl, "Repository Implementations (Infra)", "Prisma/TypeORM", "Implementan las interfaces contra PostgreSQL")
        Component(blockchain_gateway, "Blockchain Gateway (Infra)", "Adapter", "Implementa IBlockchainService contra Polygon")
        Component(auth, "Auth Module", "Passport/JWT + RBAC Guard", "Autenticación y autorización por rol")
        Component(di, "DI Container", "NestJS Module System", "Inyecta implementaciones concretas en los casos de uso")
    }

    Rel(controllers, usecases, "Invoca")
    Rel(usecases, domain, "Opera sobre")
    Rel(usecases, repos_interface, "Depende de (abstracción)")
    Rel(repos_impl, repos_interface, "Implementa")
    Rel(usecases, blockchain_gateway, "Depende de IBlockchainService")
    Rel(controllers, auth, "Protegido por")
    Rel(di, repos_impl, "Inyecta")
    Rel(di, blockchain_gateway, "Inyecta")
```

---

## 3. Diagramas de Secuencia — Flujos Principales

### 3.1 Registro de Joya

```mermaid
sequenceDiagram
    actor Joyero
    participant Admin as Terrae Admin
    participant API as API Gateway
    participant UC as UseCase: RegistrarPieza
    participant EC as EmeraldChain Core
    participant DB as PostgreSQL
    participant R2 as Object Storage

    Joyero->>Admin: Sube fotos + datos físicos de la pieza
    Admin->>API: POST /piezas (multipart)
    API->>UC: ejecutar(datosPieza, fotos)
    UC->>R2: Almacena fotos originales
    R2-->>UC: URLs + SHA256
    UC->>EC: Solicita análisis IA (origen, color, inclusiones, tratamiento)
    EC-->>UC: Resultado clasificación + score de confianza
    UC->>DB: Guarda Pieza (estado: PENDIENTE_CERTIFICACION)
    DB-->>UC: Pieza creada (ID)
    UC-->>API: PiezaDTO
    API-->>Admin: 201 Created
    Admin-->>Joyero: Confirmación + siguiente paso: certificación
```

### 3.2 Generación de Certificado (con validación gemológica)

```mermaid
sequenceDiagram
    actor Auditor as Auditor COPNIA
    participant Admin as Terrae Admin
    participant API as API Gateway
    participant UC as UseCase: EmitirCertificado
    participant DB as PostgreSQL
    participant Worker as Terrae Worker
    participant IPFS as IPFS/Pinata

    Auditor->>Admin: Revisa resultado IA + evidencia física
    Auditor->>Admin: Aprueba certificación
    Admin->>API: POST /certificados/{piezaId}/aprobar
    API->>UC: ejecutar(piezaId, auditorId)
    UC->>DB: Verifica rol AUDITOR + estado pieza
    UC->>DB: Crea Certificado (número único, firma digital)
    DB-->>UC: Certificado creado
    UC->>Worker: Encola job "generar-certificado-pdf-y-anclar"
    UC-->>API: CertificadoDTO (estado: EN_PROCESO)
    API-->>Admin: 202 Accepted
    Worker->>Worker: Genera PDF (ReportLab)
    Worker->>IPFS: Sube metadata + PDF (hash inmutable)
    IPFS-->>Worker: CID de IPFS
    Worker->>DB: Actualiza Certificado con CID
    Worker-->>Admin: Notificación (WebSocket/Email): certificado listo
```

### 3.3 Generación de Código QR

```mermaid
sequenceDiagram
    participant Worker as Terrae Worker
    participant UC as UseCase: GenerarQR
    participant DB as PostgreSQL
    participant R2 as Object Storage
    actor Publico as Verificador Público

    Worker->>UC: ejecutar(certificadoId)
    UC->>DB: Obtiene URL pública de verificación (/verificar/{codigo})
    UC->>UC: Genera QR (librería qrcode) con URL firmada
    UC->>R2: Almacena imagen QR
    R2-->>UC: URL QR
    UC->>DB: Asocia QR al Certificado
    DB-->>UC: OK
    Note over Publico,R2: --- Uso posterior del QR ---
    Publico->>R2: Escanea QR → navega a /verificar/{codigo}
    R2-->>Publico: Página pública con estado de autenticidad
```

### 3.4 Registro en Blockchain (anclaje)

```mermaid
sequenceDiagram
    participant Worker as Terrae Worker
    participant UC as UseCase: AnclarBlockchain
    participant BG as Blockchain Gateway
    participant SC as Smart Contract (Solidity)
    participant Polygon as Polygon Mainnet
    participant DB as PostgreSQL

    Worker->>UC: ejecutar(certificadoId, hashIPFS)
    UC->>DB: Verifica idempotencia (¿ya anclado?)
    alt Ya anclado
        DB-->>UC: txHash existente
        UC-->>Worker: Retorna sin duplicar
    else No anclado
        UC->>BG: anclar(hashCertificado, hashIPFS)
        BG->>SC: mintCertificate(piezaId, hash, cid)
        SC->>Polygon: Transacción firmada
        Polygon-->>SC: Confirmación (bloque minado)
        SC-->>BG: txHash + tokenId
        BG-->>UC: Resultado de anclaje
        UC->>DB: Actualiza Certificado (txHash, tokenId, estado: VERIFICADO)
        DB-->>UC: OK
    end
    UC-->>Worker: Certificado anclado en blockchain
```

---

## 4. Modelo de Datos (ERD)

```mermaid
erDiagram
    USUARIO ||--o{ PIEZA : registra
    USUARIO ||--o{ CERTIFICADO : audita
    USUARIO {
        uuid id PK
        string email UK
        string password_hash
        string nombre_completo
        string rol
        string copnia_id "nullable, solo auditores"
        boolean activo
        timestamp creado_en
    }

    PIEZA ||--o| CERTIFICADO : posee
    PIEZA ||--o{ FOTO_PIEZA : tiene
    PIEZA ||--o{ ORDEN_ITEM : incluida_en
    PIEZA {
        uuid id PK
        string sku UK
        string nombre
        string tipo_pieza "anillo, collar, aretes..."
        decimal peso_gramos
        string metal "plata 925, oro 18k"
        uuid gema_id FK
        string estado "PENDIENTE_CERTIFICACION, CERTIFICADA, VENDIDA"
        decimal precio
        uuid registrado_por FK
        timestamp creado_en
    }

    GEMA ||--o{ PIEZA : engastada_en
    GEMA {
        uuid id PK
        string tipo "esmeralda, rubi, zafiro"
        string origen_predicho "Muzo, Chivor, Otro"
        decimal confianza_ia
        string color_grado
        string tratamiento
        decimal quilates
        jsonb resultado_analisis_ia
        timestamp analizado_en
    }

    CERTIFICADO ||--o{ QR_CODE : genera
    CERTIFICADO {
        uuid id PK
        string numero_certificado UK
        uuid pieza_id FK
        uuid auditor_id FK
        string firma_digital
        string cid_ipfs
        string tx_hash_blockchain
        string token_id_blockchain
        string estado "EN_PROCESO, VERIFICADO, REVOCADO"
        string url_pdf
        timestamp emitido_en
        timestamp anclado_en
    }

    QR_CODE {
        uuid id PK
        uuid certificado_id FK
        string codigo_publico UK
        string url_imagen
        integer escaneos_totales
        timestamp creado_en
    }

    FOTO_PIEZA {
        uuid id PK
        uuid pieza_id FK
        string url
        string sha256_hash
        string tipo "campo, laboratorio, macro"
        timestamp subida_en
    }

    ORDEN ||--o{ ORDEN_ITEM : contiene
    ORDEN {
        uuid id PK
        uuid cliente_id FK
        string estado "PENDIENTE, PAGADA, ENVIADA, ENTREGADA"
        decimal total
        string direccion_envio
        timestamp creado_en
    }

    ORDEN_ITEM {
        uuid id PK
        uuid orden_id FK
        uuid pieza_id FK
        decimal precio_unitario
    }

    USUARIO ||--o{ ORDEN : realiza
```

---

## 5. Estructura de APIs

Convención: **REST** para operaciones de recurso estándar (CRUD, comandos); **GraphQL** opcional en Fase 2 solo para el catálogo público (consultas ricas del storefront). Versionado por URL (`/api/v1`).

### 5.1 Endpoints núcleo

```
Autenticación
  POST   /api/v1/auth/login
  POST   /api/v1/auth/refresh
  POST   /api/v1/auth/logout

Piezas (requiere rol OPERADOR o superior)
  POST   /api/v1/piezas                     Registrar nueva pieza
  GET    /api/v1/piezas                     Listar (filtros: estado, tipo, gema)
  GET    /api/v1/piezas/:id                 Detalle
  PATCH  /api/v1/piezas/:id                 Actualizar
  POST   /api/v1/piezas/:id/fotos           Subir fotografías

Certificados (requiere rol AUDITOR para aprobar)
  POST   /api/v1/certificados/:piezaId/solicitar
  POST   /api/v1/certificados/:piezaId/aprobar     [AUDITOR]
  GET    /api/v1/certificados/:id
  GET    /api/v1/certificados/:id/pdf
  POST   /api/v1/certificados/:id/revocar          [ADMIN]

Verificación pública (sin autenticación)
  GET    /api/v1/verificar/:codigoPublico

Blockchain
  GET    /api/v1/blockchain/certificados/:id/estado
  POST   /api/v1/blockchain/certificados/:id/reintentar  [ADMIN, uso interno]

Catálogo / Storefront
  GET    /api/v1/catalogo
  GET    /api/v1/catalogo/:sku

Órdenes
  POST   /api/v1/ordenes
  GET    /api/v1/ordenes/:id
  POST   /api/v1/ordenes/:id/pago

Administración
  GET    /api/v1/usuarios            [ADMIN]
  POST   /api/v1/usuarios            [ADMIN]
  PATCH  /api/v1/usuarios/:id/rol    [ADMIN]
```

### 5.2 Estándares de API

- Formato de error uniforme (RFC 7807 *Problem Details*).
- Todas las respuestas mutables devuelven el recurso actualizado completo (no solo el ID).
- Paginación por cursor en listados (`?cursor=&limit=`).
- Rate limiting diferenciado: 100 req/min autenticado, 20 req/min público (verificación de QR).
- Idempotency-Key obligatorio en `POST /certificados/:id/aprobar` y endpoints de blockchain.

---

## 6. Modelo de Permisos y Roles (RBAC)

| Rol | Descripción | Permisos clave |
|---|---|---|
| **SUPER_ADMIN** | CEO / CTO | Acceso total, gestión de roles, configuración de sistema |
| **ADMIN** | Gerencia EmJoy | Gestión de usuarios, revocar certificados, ver reportes financieros |
| **AUDITOR** | Gemólogo COPNIA | Aprobar/rechazar certificación, no puede editar precios ni inventario |
| **OPERADOR** | Joyero / Staff de taller | Registrar piezas, subir fotos, gestionar inventario propio |
| **CLIENTE** | Comprador registrado | Ver sus órdenes, sus certificados, historial de compra |
| **PUBLICO** (sin auth) | Cualquier visitante | Solo `GET /verificar/:codigo` y catálogo público |

**Reglas de gobernanza:**
- Separación de funciones: quien **registra** una pieza (OPERADOR) nunca puede **aprobar** su propio certificado (AUDITOR) — control de 4 ojos obligatorio a nivel de base de datos (constraint `registrado_por != auditor_id`).
- Los tokens JWT incluyen `rol` y `scope`; los Guards de NestJS validan en cada endpoint (`@Roles('AUDITOR')`).
- Auditoría inmutable: toda acción sobre `CERTIFICADO` se registra en tabla `audit_log` append-only, independiente del anclaje blockchain.

---

## 7. Convenciones de Código y Nomenclatura

```
Estructura de carpetas (monorepo, ejemplo backend):
apps/
  api/
    src/
      domain/              → Entidades y contratos puros (sin dependencias externas)
        entities/
        repositories/       → Interfaces (IPiezaRepository, etc.)
        value-objects/
      application/          → Casos de uso (orquestan el dominio)
        use-cases/
        dtos/
      infrastructure/       → Implementaciones concretas
        database/
          repositories/     → PrismaPiezaRepository implements IPiezaRepository
        blockchain/
          PolygonGateway.ts
        storage/
      presentation/
        controllers/
        guards/
        middlewares/
    test/
  worker/
  web/                      → Next.js storefront
  admin/                    → Next.js panel admin
packages/
  shared-types/             → DTOs y tipos compartidos frontend/backend
  design-system/            → Componentes UI con tokens Terrae
```

**Convenciones:**
- Idioma del dominio: **español** en nombres de entidades y casos de uso (Pieza, Certificado, RegistrarPieza) — coherente con el negocio; el código técnico de infraestructura puede usar inglés estándar (Repository, Gateway).
- Naming de archivos: `kebab-case`; clases: `PascalCase`; interfaces de dominio con prefijo `I` (`IPiezaRepository`).
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) + scope (`feat(certificados): ...`).
- Cobertura de tests mínima: 80% en `domain/` y `application/` (lógica crítica), 60% global.
- Todo caso de uso debe tener un test unitario que mockee sus repositorios vía interfaz — nunca contra la base de datos real.

---

## 8. Roadmap Técnico

| Fase | Duración | Alcance |
|---|---|---|
| **Fase 0** | Completada (este documento) | Arquitectura, diagramas, modelo de datos, identidad visual |
| **Fase 1 — MVP** | 8–10 semanas | Registro de piezas, certificación manual+IA, generación QR, anclaje Polygon testnet→mainnet, storefront básico, checkout |
| **Fase 2 — Escalamiento** | 3 meses | Panel admin completo, GraphQL para catálogo, reportes, integración logística asegurada, multi-idioma (ES/EN) |
| **Fase 3 — Enterprise** | 6 meses | Migración a AWS/GCP multi-región, SSO para partners (GIA/IGI), auditoría avanzada, SLA 99.9% |
| **Fase 4 — Expansión de catálogo** | Paralelo a roadmap EmeraldChain | Soporte para rubíes/zafiros/diamantes en el modelo de datos de `GEMA` |

---

## 9. Próximos Pasos Sugeridos

Este documento cierra la Fase 0. Los siguientes entregables de código (Fase 1) que puedo construir a continuación, ya con implementación completa y lista para producción:

1. **Smart contract Solidity** (`TerraeCertificate.sol`) con tests.
2. **Módulo NestJS completo** de `Piezas` y `Certificados` (domain + application + infrastructure + presentation) con Prisma schema.
3. **Design system** (`packages/design-system`) con los tokens de esta Fase 0 en React + Tailwind, componentes base (Button, Card, CertificadoViewer).
4. **Página pública de verificación** (`/verificar/[codigo]`) en Next.js, la superficie de marca más visible para el cliente final.

¿Con cuál de estos cuatro quieres que empecemos?
