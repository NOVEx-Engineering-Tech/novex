// Content + accent theme for the StockKernel case study.

export const stockkernelContent = {
  id: 'stockkernel',

  accent: {
    a1: '#d0bcff', // primary lavender
    a2: '#4cd7f6', // secondary cyan
    a3: '#7bd0ff', // tertiary sky
    a4: '#6d3bd7', // deep primary
    a5: '#03b5d3', // secondary container
  },

  hero: {
    kicker: 'CASE STUDY: 02',
    name: 'STOCKKERNEL',
    subtitle: 'Inventory & POS System',
    tagline: 'One system. Every sale, every stock move, tracked.',
    lead: 'A centralized, web-based Point of Sale and Inventory Management System built for small-to-medium retail businesses.',
    description:
      'Secure role-based access to product and inventory management, stock tracking, order processing with QR/barcode scanning, real-time stock updates, payment handling, reporting, and a complete audit trail — architected as a three-tier client-server system.',
    status: 'PRODUCTION ARCHITECTURE · COMPLETE',
  },

  metaCards: [
    {
      icon: 'group',
      label: 'Target Users',
      value: '20+ Business Types',
      lines: ['Sari-sari stores, groceries, pharmacies', 'Hardware, cafés, boutiques & more'],
    },
    {
      icon: 'shield_person',
      label: 'User Roles (RBAC)',
      value: '4 Permission Tiers',
      tags: ['Super Admin', 'Admin', 'Manager', 'Cashier'],
    },
    {
      icon: 'devices',
      label: 'Device Support',
      value: 'Fully Responsive',
      lines: ['Mobile, Tablet, Laptop, Desktop'],
    },
    {
      icon: 'dns',
      label: 'Production Hosting',
      value: 'Vercel + Railway/Render',
      lines: ['PostgreSQL via Supabase + Redis'],
    },
  ],

  techStack: [
    'React', 'TypeScript', 'Next.js', 'Zustand', 'TanStack Query',
    'Node.js', 'Express', 'Prisma ORM', 'PostgreSQL (Supabase)',
    'Redis', 'Socket.IO', 'jsQR', 'Twilio', 'Resend',
  ],

  ctas: [
    { label: 'Explore Architecture', href: '#architecture', icon: 'arrow_forward', primary: true },
    { label: 'View Repository Code', href: 'https://github.com/NOVEx-Engineering-Tech', icon: 'terminal' },
    { label: 'View Module Docs', href: '#core-modules', icon: 'menu_book' },
  ],

  problem: {
    title: 'Fragmented Tools Across Diverse Retail Verticals',
    body: 'Small and medium businesses — sari-sari stores, mini-groceries, pharmacies, hardware stores, cafés, boutiques, and local wholesalers — need one system that adapts to very different inventory shapes without needing separate software per vertical.',
    painPoints: [
      'No single system spans camera-scanned barcodes, weighed goods, and bulk hardware parts alike.',
      'Disconnected POS, inventory, and reporting tools across devices.',
      'No audit trail for stock adjustments, voids, or account changes.',
      'Manual processes don\'t scale across mobile, tablet, and desktop use in the same shop.',
    ],
    goalsIntro: 'Build one centralized Inventory POS accessible from any device, with strict role-based access and a full accounting of every action taken in the system.',
    goals: [
      { icon: 'qr_code_scanner', title: 'Camera-Based QR/Barcode Checkout', body: 'Contactless product scanning via jsQR on any device camera, with manual barcode entry as a fallback.' },
      { icon: 'sync_alt', title: 'Real-Time Stock & Sales Visibility', body: 'Socket.IO-driven stock-update and low-stock-alert events pushed live to admins, managers, and cashiers.' },
      { icon: 'verified_user', title: '12-Month Tamper-Proof Audit Trail', body: 'Every CREATE, UPDATE, DELETE, LOGIN, VOID, and ADJUST action logged with old/new values and actor snapshots.' },
      { icon: 'devices', title: 'Cross-Device Responsive Design', body: 'One responsive web app spanning mobile, tablet, laptop, and desktop — no native app required.' },
    ],
  },

  architecture: {
    title: 'Three-Tier Client-Server Topology',
    lead: 'Built to the NOVEx Developer Documentation Standard — a strict module structure (utils/lib/components/module) layered over a classic three-tier architecture.',
    tiers: [
      { num: '01', icon: 'devices', title: 'Client Layer', body: 'Next.js + React + TypeScript SPA following the NOVEx-aligned frontend module structure.', stack: ['React + TypeScript + Next.js', 'Zustand (state)', 'TanStack Query (server state)', 'Axios HTTP Client', 'Socket.IO Client'], hosted: 'Vercel' },
      { num: '02', icon: 'memory', title: 'Application Layer', body: 'Node.js + Express services covering Auth, Products, Inventory, Stock, Orders, Payments, Reports, and Audit.', stack: ['JWT + bcrypt Auth', 'RBAC Middleware', 'Zod Validation', 'Rate Limiting', 'Audit Logging Dispatcher'], hosted: 'Railway / Render' },
      { num: '03', icon: 'database', title: 'Data Layer', body: 'PostgreSQL via Prisma ORM, with Redis handling session cache, refresh tokens, and notification queues.', stack: ['PostgreSQL (Supabase)', 'Prisma ORM', 'Redis Session Cache', 'Refresh Token Blacklist', 'Notification Queue'], hosted: 'Supabase Managed PG' },
      { num: '04', icon: 'hub', title: 'External Services', body: 'Third-party notification gateways dispatching SMS and email alerts on low-stock and account events.', stack: ['Twilio (SMS)', 'Resend (Email)', 'jsQR (Client-side scanning)'], hosted: 'REST Webhooks' },
    ],
    pipeline: ['JWT Verification', 'RBAC Authorization', 'Zod Validation', 'Rate Limiting', 'Audit Logging'],
    realtime: {
      title: 'Socket.IO JWT Handshake',
      body: 'Connections authenticate via JWT on socket handshake. Stock changes and low-stock thresholds broadcast live to connected admins, managers, and cashiers.',
      events: [
        "stock-update → Live stock badge updates",
        "low-stock-alert → Toast notification + SMS/Email dispatch",
      ],
      footnote: 'Consumed on the frontend by lib/ws (LIB-WS), rendered via components/feedback and components/chart.',
    },
  },

  dataModel: {
    title: 'PostgreSQL via Prisma: Core Relational Domains',
    lead: 'Schema spans Auth & RBAC, Inventory, Stock Movements, Sales, and a fully denormalized Audit Log — read directly from schema.prisma as the authoritative source.',
    domains: [
      { num: '01', icon: 'key', title: 'Auth & Access Control', body: 'User, Role, Permission, and join tables enforcing a strict 1:1 User↔Role mapping with many-to-many Role↔Permission grants.', facts: ['User ↔ UserRole (1:1)', 'RolePermission (many-to-many)', 'Roles: SUPER_ADMIN, ADMIN, MANAGER, CASHIER'], rule: 'Every endpoint gated by permission_name (e.g. "product:create")' },
      { num: '02', icon: 'inventory_2', title: 'Inventory Core', body: 'Category, Supplier, and Product tables with unique SKU/barcode indexing and a 1:1 StockLevel per product.', facts: ['Product 1:1 StockLevel', 'Configurable low/high thresholds', 'Unique SKU & barcode indexing'], rule: 'Supplier deletion sets product.supplier_id to null (SetNull)' },
      { num: '03', icon: 'swap_vert', title: 'Stock Movements', body: 'Immutable ledger of every stock change, tagged by movement type and linked to the acting user.', facts: ['Enum: STOCK_IN | STOCK_OUT | ADJUSTMENT', 'Linked to product_id and user_id', 'Optional reason field for adjustments'], rule: 'Indexed by created_at for fast movement-history queries' },
      { num: '04', icon: 'point_of_sale', title: 'Sales & Transactions', body: 'Order and OrderItem tables capture itemized carts; Transaction holds a strict 1:1 link to each completed Order.', facts: ['Order 1:1 Transaction (Restrict on delete)', 'OrderItem stores historical unit_price', 'PaymentMethod: CASH, CARD, GCASH, MAYA'], rule: 'Transaction cannot be deleted while its Order still exists' },
      { num: '05', icon: 'history_edu', title: 'Monitoring & Denormalized Audit', body: 'AuditLog denormalizes username and user_role at write-time so historical records stay accurate even if a user account is later changed or removed.', facts: ['AuditAction: CREATE, UPDATE, DELETE, LOGIN, LOGOUT, EXPORT, VOID, ADJUST, FAILED', 'old_value / new_value stored as text', 'Minimum 12-month retention, read-only'], rule: 'Passwords are never written to audit logs', wide: true },
    ],
  },

  modules: {
    title: 'Core Feature Modules',
    lead: 'Eight functional modules spanning authentication, inventory, stock, POS, payments, reporting, dashboards, and audit — each mapped to a NOVEx frontend module scope.',
    items: [
      { icon: 'admin_panel_settings', num: '1', title: 'Auth & RBAC', body: 'JWT-based login/logout, password reset, and full role/permission management across 4 tiers.', tag: 'lib/auth · LIB-AUTH' },
      { icon: 'inventory_2', num: '2', title: 'Product & Category Management', body: 'Add/edit/deactivate products, assign barcodes/QR, and manage categories and suppliers.', tag: 'lib/api · CMP-TBL, CMP-FRM' },
      { icon: 'warehouse', num: '3', title: 'Stock Management', body: 'Stock-in, stock-out, manual adjustments, movement history, and low-stock alerting.', tag: 'lib/api + lib/ws real-time', featured: true },
      { icon: 'point_of_sale', num: '4', title: 'POS / Order Management', body: 'Create orders, scan products via camera, apply discounts, and calculate totals in real time.', tag: 'lib/api · CMP-FRM, CMP-TBL' },
      { icon: 'qr_code_scanner', num: '5', title: 'Camera / QR Scanner', body: 'jsQR-powered camera scanning with manual barcode fallback and scan-failure alerts.', tag: 'lib/scanner (jsQR wrapper)', featured: true },
      { icon: 'payments', num: '6', title: 'Payment & Transactions', body: 'Cash payment recording with change computation, receipt generation, and daily sales summaries.', tag: 'lib/payment · LIB-PAY' },
      { icon: 'query_stats', num: '7', title: 'Reports & Analytics', body: 'Daily/weekly/monthly sales, best-sellers, inventory movement, and CSV/PDF export.', tag: 'components/chart + lib/api' },
      { icon: 'policy', num: '8', title: 'Audit Trail', body: '12-month read-only compliance log with filters by date, user, module, action type, and status.', tag: 'Read-only · Super Admin export' },
    ],
  },

  security: {
    title: 'Security Architecture',
    lead: 'Layered protections spanning authentication, authorization, validation, and a system-wide audit trail — with clearly documented limitations rather than overclaiming coverage.',
    items: [
      { icon: 'token', label: 'JWT Auth', body: 'Access & refresh tokens with rotation' },
      { icon: 'lock', label: 'bcrypt Hashing', body: 'Password encryption at rest' },
      { icon: 'verified_user', label: 'RBAC Middleware', body: '4-tier role/permission enforcement per endpoint' },
      { icon: 'checklist', label: 'Zod Validation', body: 'Request schema validation on all endpoints' },
      { icon: 'speed', label: 'Rate Limiting', body: 'Applied on authentication routes' },
      { icon: 'history', label: 'Audit Trail', body: 'CREATE/UPDATE/DELETE/LOGIN/VOID/ADJUST, 12-month retention' },
      { icon: 'https', label: 'HTTPS Enforced', body: 'Across frontend and backend, no secrets in source control' },
    ],
  },

  sprints: {
    title: 'Documentation & Module Standard',
    lead: 'Rather than a sprint log, StockKernel follows the NOVEx Developer Documentation Standard — every module ships with these four required artifacts.',
    totalTickets: 4,
    items: [
      { name: 'README.md', desc: 'Information, Description, When to Use, How to Use, Exported APIs (Function Name / UUID / DependsOn), Notes.', dates: 'Per module', tickets: 1 },
      { name: 'types.ts', desc: 'All shared interfaces/types/enums for the module — never exported from index.ts/tsx.', dates: 'Per module', tickets: 1 },
      { name: 'Global Module Header', desc: '@uuid, @author, @time, @dependsOn, @description, @whereToUse, @whenToUse at the top of every index file.', dates: 'Per file', tickets: 1 },
      { name: 'Function Header + JSDoc', desc: '@uuid as first tag on every exported function in utils/lib, kept in sync with README Exported APIs.', dates: 'Per function', tickets: 1 },
    ],
  },

  postMortem: {
    title: 'Architectural Decisions & Trade-offs',
    lead: 'Key structural choices made while translating a common prototype layout into the NOVEx-compliant module structure.',
    incidents: [
      {
        num: '01', icon: 'folder_open', title: 'Ad-hoc Folders → NOVEx Modules',
        symptom: 'Typical prototypes scatter code across assets/, hooks/, services/, and stores/ with no consistent documentation.',
        cause: 'Flat, undocumented folders make it hard to trace ownership, dependencies, or side effects across a growing codebase.',
        fix: 'Mapped every prototype folder to a NOVEx location — hooks/ with side effects moved to lib/<module>, services/ became lib/api, and stores/ became per-domain lib modules (lib/session, lib/cart).',
        resolved: 'Standardized across the full frontend tree',
      },
      {
        num: '02', icon: 'schema', title: 'Single vs Denormalized Audit Table',
        symptom: 'A naive AuditLog referencing only user_id would break historical accuracy once a user account is edited or removed.',
        cause: 'Foreign-key-only references lose the actor\'s name and role as they existed at the time of the action.',
        fix: 'Denormalized username and user_role directly into each AuditLog row at write time, independent of the live User table.',
        resolved: 'Historical logs remain accurate regardless of later account changes',
      },
      {
        num: '03', icon: 'cloud_off', title: 'Offline & Camera Scanning Limits',
        symptom: 'Full offline POS operation and guaranteed camera scanning across all devices were initially assumed as in-scope.',
        cause: 'Camera access depends on device hardware, browser permissions, and lighting; the system also requires constant connectivity to the hosted backend.',
        fix: 'Explicitly scoped these as documented limitations — manual barcode/SKU entry remains available as a fallback, and offline-first operation was moved to Future Enhancements.',
        resolved: 'Scope boundaries documented rather than silently unmet',
      },
    ],
  },

  outcome: {
    tag: 'DELIVERY OUTCOME',
    title: 'Production-Ready, Standard-Compliant Inventory POS',
    body: 'StockKernel delivers a complete Inventory & POS system spanning mobile, tablet, laptop, and desktop, with strict RBAC, real-time stock sync, and a 12-month tamper-proof audit trail — built to the NOVEx Developer Documentation Standard for long-term maintainability.',
    checks: ['4 RBAC Tiers', 'Cross-Device Responsive', '12-Month Audit Retention'],
    statLabel: 'PROJECT STATUS',
    statValue: 'COMPLETE',
    statSub: 'PRODUCTION ARCHITECTURE · DEPLOYED',
  },

  next: {
    label: 'NEXT CASE STUDY',
    title: 'Intervue: AI Mock Coach',
    href: '/projects/intervue',
  },
}