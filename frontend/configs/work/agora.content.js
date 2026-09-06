// Content + accent theme for the AGORA case study.
// To add a new case study later: copy this file, rename it (e.g. intervue.content.js),
// swap the values, then register it in CaseStudy.jsx's CONTENT_MAP.

export const agoraContent = {
  id: 'agora',

  // ── Accent palette for this project only. Applied as scoped CSS vars
  // on the page wrapper — never touches your global --green1/2/3 vars. ──
  accent: {
    a1: '#4A7BC7', // galaxy blue
    a2: '#9F73AB', // lavender
    a3: '#A3C7D6', // sky blue
    a4: '#3F3B6C', // deep primary
    a5: '#624F82', // royal secondary
  },

  hero: {
    kicker: 'CASE STUDY: 01',
    name: 'AGORA',
    subtitle: 'Inventory & POS System',
    tagline: 'Every sale, tallied and tracked.',
    lead: 'We transform fragmented retail workflows into intelligent digital operations and sub-second checkouts.',
    description:
      'A Full-Stack Retail Operations Case Study engineered for small-to-medium retail businesses (sari-sari stores, groceries, pharmacies, hardware stores, and independent cafés).',
    status: 'PRODUCTION READY · 100% COMPLETE',
  },

  metaCards: [
    {
      icon: 'group',
      label: 'Team Structure',
      value: '2 Core Engineers',
      lines: ['Azhrock (Frontend Lead)', 'Rolf (Backend / DevOps / DB)'],
    },
    {
      icon: 'calendar_month',
      label: 'Delivery Timeline',
      value: '6 Sprints (Jun 19 – Jul 17, 2026)',
      lines: ['166 completed tickets with 100% test pass'],
    },
    {
      icon: 'dns',
      label: 'Production Hosting',
      value: 'Vercel + Railway/Render',
      lines: ['Supabase Managed PostgreSQL + Redis'],
    },
    {
      icon: 'shield_person',
      label: 'User Roles (RBAC)',
      value: '4 Permission Tiers',
      tags: ['Super Admin', 'Admin', 'Manager', 'Cashier'],
    },
  ],

  techStack: [
    'React 18', 'TypeScript', 'Vite', 'Zustand', 'TanStack Query',
    'Node.js', 'Express', 'PostgreSQL (Supabase)', 'Prisma ORM',
    'Redis', 'Socket.IO', 'Twilio', 'Resend',
  ],

  ctas: [
    { label: 'Request System Walkthrough', href: '#contact', icon: 'arrow_forward', primary: true },
    { label: 'View Repository Code', href: 'https://github.com/NOVEx-Engineering-Tech', icon: 'terminal' },
    { label: 'Launch POS Demo', href: '#', icon: 'open_in_new' },
  ],

  problem: {
    title: 'Fragmented Retail Operations Across Multi-Category Hubs',
    body: 'Small and medium retail businesses—including sari-sari storefronts, mini-groceries, neighborhood pharmacies, hardware stores, and independent cafés—consistently suffer from manual paper ledgers, unlinked calculator checkouts, and disconnected spreadsheet tools.',
    painPoints: [
      'Slow checkouts during rush hours cause line abandonment.',
      'Phantom stockouts and untracked inventory shrinkage.',
      'Zero audit trail on cashier voids, price overrides, and cash drawers.',
      'Rigid software failing across mixed products (weight, barcode, unit).',
    ],
    goalsIntro: 'AGORA replaced broken workflows with a unified, browser-native point of sale and real-time inventory management architecture.',
    goals: [
      { icon: 'qr_code_scanner', title: 'Fast Camera-Assisted Checkout', body: 'Zero-hardware camera QR/barcode scanner with keyboard F2 quick shortcut, live cart computation, and cash-change reckoning.' },
      { icon: 'sync_alt', title: 'Real-Time Stock & Sales Visibility', body: 'Sub-second inventory decrements across registers with automated low-stock warnings and live analytical dashboard widgets.' },
      { icon: 'verified_user', title: 'Super Admin Audit Trail', body: 'Tamper-proof append-only telemetry logging user IP, actor role snapshots, and precise old-value to new-value mutations.' },
      { icon: 'category', title: 'Universal Multi-Category Catalog', body: 'Flexible relational schema effortlessly supporting variable units, barcoded dry goods, bulk hardware parts, and café items.' },
    ],
  },

  architecture: {
    title: 'Three-Tier Client-Server Topology',
    lead: 'Engineered with strict separation of concerns, high throughput, and fault-tolerant data synchronization across distributed store registers.',
    tiers: [
      { num: '01', icon: 'devices', title: 'Client Layer', body: 'Lightweight, single-page application tuned for low-spec POS hardware and tablets with instant state transitions.', stack: ['React 18 + TypeScript', 'Vite Bundler Engine', 'Zustand (Cart & Auth)', 'TanStack Query v5', 'Socket.IO Client'], hosted: 'Vercel CDN Global Edge' },
      { num: '02', icon: 'memory', title: 'Application Layer', body: 'Node.js + Express + TypeScript modular domain services governing transactional boundaries and business constraints.', stack: ['Auth & RBAC Guard', 'Products & Catalog', 'Inventory & Stock Moves', 'Orders & Payments', 'Audit Trail Dispatcher'], hosted: 'Railway / Render Container' },
      { num: '03', icon: 'database', title: 'Data Layer', body: 'ACID-compliant relational persistence coupled with high-speed memory caching for transient keys and session auth.', stack: ['PostgreSQL (Supabase)', 'Prisma ORM Engine', 'Redis Session Cache', 'Refresh Token Blacklist', 'Notification Queuing'], hosted: 'Supabase Managed PG' },
      { num: '04', icon: 'hub', title: 'External Integrations', body: 'Third-party asynchronous telemetry and alert gateways notifying managers of mission-critical threshold events.', stack: ['Twilio (SMS Stock Alerts)', 'Resend (Transactional Email)', 'PDF Electronic Receipts', 'Daily Manager Summaries', 'Webhooks & Sockets'], hosted: 'TLS 1.3 / REST Webhooks' },
    ],
    pipeline: ['JWT Verification', 'RBAC Authorization', 'Zod Validation', 'Rate Limiting', 'Audit Logging'],
    realtime: {
      title: 'Socket.IO JWT Handshake',
      body: "WebSocket connections authenticate during initial handshake via bearer JWT. Upon successful POS checkout, events stream concurrently:",
      events: [
        "socket.broadcast.emit('stock-update', { sku, delta })",
        "socket.to('managers').emit('low-stock-alert', { item })",
      ],
      footnote: 'Guarantees zero cashier desynchronization across store terminals.',
    },
  },

  dataModel: {
    title: 'PostgreSQL via Prisma: 5 Core Relational Domains',
    lead: 'Normalized schema design balancing referential integrity with high-read cache performance and tamper-proof historical reporting.',
    domains: [
      { num: '01', icon: 'key', title: 'Auth & Access Control', body: 'Decoupled user entities with cryptographic bcrypt hashes and dynamic multi-tier authorization mapping.', facts: ['User <---> Role (1:N)', 'RolePermission Join Table', 'Granular Action Flags (pos:transact, audit:read)'], rule: 'Strict RBAC matrix enforced per API endpoint' },
      { num: '02', icon: 'inventory_2', title: 'Inventory Core', body: 'Hierarchical catalog linking Product, Category, and Supplier records with strict quantity tracking.', facts: ['Product 1:1 StockLevel', 'Configurable threshold limits', 'Unique SKU & EAN/UPC Barcode indexing'], rule: 'StockLevel isolation prevents table locks' },
      { num: '03', icon: 'swap_vert', title: 'Stock Movements', body: 'Immutable audit records of every single physical unit entering or departing store premises.', facts: ['Enum: STOCK_IN | STOCK_OUT | ADJUSTMENT', 'Associated user_id & supplier_id', 'Mandatory reason comment on write-offs'], rule: 'No deletions allowed; balance reconciled by delta' },
      { num: '04', icon: 'point_of_sale', title: 'Sales & Checkout', body: 'High-throughput order ledger handling itemized cart snapshots, taxes, discounts, and payments.', facts: ['Order 1:1 Transaction', 'Restrict-on-delete rule enforced', 'OrderItem captures historical purchase price'], rule: 'Price changes never alter prior sales records' },
      { num: '05', icon: 'history_edu', title: 'Monitoring, Reporting & Denormalized Audit', body: 'Architected with denormalized actor role snapshots and JSON diffs so historical investigations remain fully accurate even if an employee account is renamed or deleted.', facts: ['IP Address & UserAgent tracking', 'Old Value vs New Value JSON payloads', '12-Month Read-Only Retention policy', 'Daily Aggregated Summary Materialized Views'], rule: 'Denormalized AuditLog guarantees zero orphaned telemetry', wide: true },
    ],
  },

  modules: {
    title: 'Eight Core Operational Modules',
    lead: 'Complete feature suite powering daily retail workflows from morning register opening to night-time stock reconciliation.',
    items: [
      { icon: 'analytics', num: '5.1', title: 'Executive Dashboard', body: "Instant KPI summary: today's revenue, orders completed, low-stock count warning, catalog size, and 7-day sales trendline.", tag: 'Live polling + WebSocket sync' },
      { icon: 'barcode_scanner', num: '5.2', title: 'POS & Optical Scanner', body: 'F2 quick keyboard shortcut, responsive live cart calculations, real-time camera QR/barcode scanner with manual search fallback.', tag: 'Camera WASM + Sub-50ms render', featured: true },
      { icon: 'category', num: '5.3', title: 'Inventory Catalog', body: 'Tabbed management across Products, Categories, and Suppliers with dynamic SKU generation, barcodes, cost, price, and active states.', tag: 'Zod validation on product mutations' },
      { icon: 'inventory', num: '5.4', title: 'Stock Management', body: '4 unified views: Stock Levels, Stock In, Stock Out, and Movement History with an instant one-click "Low stock only" filter.', tag: 'Threshold auto-triggering' },
      { icon: 'payments', num: '5.5', title: 'Payments & Ledger', body: 'Accurate amount paid input, automated change calculation, multiple payment methods (Cash, Digital QR, Card), and daily drawer balancing.', tag: '1:1 Transaction to Order binding' },
      { icon: 'query_stats', num: '5.6', title: 'Reports & Analytics', body: 'Daily, weekly, and monthly views detailing average order value (AOV), top revenue products, and stock-in versus stock-out ratios.', tag: 'Exportable CSV & printable PDF' },
      { icon: 'admin_panel_settings', num: '5.7', title: 'User & RBAC Control', body: 'Fine-grained operational permissions across 4 tiers: Super Admin (system wide), Admin (store setup), Manager (inventory), and Cashier (POS only).', tag: 'Password hash rotation & lockouts' },
      { icon: 'policy', num: '5.8', title: 'Audit Trail', body: 'Read-only 12-month compliance log featuring permanent actor snapshots, origin IP geolocation, and JSON diffs of modified fields.', tag: 'Tamper-proof append-only', featured: true },
    ],
  },

  security: {
    title: 'Hardened Production Guardrails',
    lead: 'Zero-trust model protecting retail endpoints against inventory manipulation, credential theft, and unauthorized discount issuance.',
    items: [
      { icon: 'token', label: 'JWT Rotation', body: '15m access tokens + Redis refresh blacklist' },
      { icon: 'lock', label: 'bcrypt Salt', body: '12-round computational work factor' },
      { icon: 'verified_user', label: 'RBAC Middleware', body: 'Endpoint privilege gating' },
      { icon: 'checklist', label: 'Zod Validation', body: 'Strict schema stripping on all inputs' },
      { icon: 'speed', label: 'Rate Limiting', body: 'IP bucket rate limiting via Express' },
      { icon: 'history', label: 'Audit Trail', body: 'Read-only 12-month compliance record' },
      { icon: 'https', label: 'Strict HTTPS', body: 'HSTS with secure HTTP-only cookies' },
    ],
  },

  sprints: {
    title: 'Sprint Roadmap',
    lead: 'Fast-paced dual-engineer delivery cycle across 6 agile sprints from June 19 to July 17, 2026.',
    totalTickets: 166,
    items: [
      { name: 'Sprint 1: Foundation', desc: 'Vite setup, Prisma schema, base Auth JWT, DB migrations', dates: 'Jun 19', tickets: 35 },
      { name: 'Sprint 2: Core Business Logic', desc: 'Products, Categories, Suppliers, Stock In/Out & ledger', dates: 'Jun 20–26', tickets: 38 },
      { name: 'Sprint 3: Camera / QR + Real-Time', desc: 'Barcode camera feed, POS cart state, Socket.IO sync', dates: 'Jun 27–Jul 3', tickets: 22 },
      { name: 'Sprint 4: Reports & Notifications', desc: 'Daily/monthly analytics, Twilio SMS alerts, Resend emails', dates: 'Jul 4–10', tickets: 25 },
      { name: 'Sprint 5: Security & Deployment', desc: 'RBAC gates, rate limits, Vercel & Railway container configs', dates: 'Jul 11–14', tickets: 22 },
      { name: 'Sprint 6: Polish & Testing', desc: 'UAT, cart calculations, receipt PDF verification, cross-browser, ARIA', dates: 'Jul 15–17', tickets: 24 },
    ],
  },

  postMortem: {
    title: 'Root Cause Analysis: 3 Critical Incidents Resolved',
    lead: 'Transparent review of edge cases encountered during sprint execution and how permanent architectural fixes were deployed.',
    incidents: [
      {
        num: '01', icon: 'bug_report', title: 'Payment Change Miscalculation',
        symptom: 'Cash transactions intermittently returned $0.00 change on checkout payloads.',
        cause: 'Upstream Zod schema validation was configured with strict casing and stripped amount_paid and payment_method when payload keys had case differences.',
        fix: 'Updated Zod validation schema with case-insensitive property transform pre-processing and default fallback float coercion.',
        resolved: 'Fixed in Sprint 6 (100% Cart UAT)',
      },
      {
        num: '02', icon: 'cloud_off', title: 'Vercel CI: vite: not found',
        symptom: 'Vercel production deployment pipeline failed instantly during build step.',
        cause: 'Monorepo root directory configuration pointed at the repository root where package.json was missing Vite devDependencies.',
        fix: 'Configured Vercel build settings with Root Directory set explicitly to agora-frontend with scoped npm install flags.',
        resolved: 'Fixed in Sprint 5 (Vercel Edge Live)',
      },
      {
        num: '03', icon: 'folder_off', title: 'Missing Module AuditLogsPage',
        symptom: 'Dynamic route threw 404 module import error exclusively on remote staging.',
        cause: "Root .gitignore contained a blanket 'logs' entry that unintentionally matched src/pages/logs/ and prevented git commits.",
        fix: 'Scoped the ignore pattern to root logfiles (/logs & *.log), un-ignoring application source trees.',
        resolved: 'Fixed in Sprint 4 (Audit Complete)',
      },
    ],
  },

  outcome: {
    tag: 'DELIVERY OUTCOME',
    title: '100% Feature-Complete & Deployed in Production',
    body: 'All 166 tickets were delivered on schedule across 6 sprints. The AGORA platform now operates reliably on Vercel Edge + Railway containers with Supabase PostgreSQL, giving small-to-medium retailers enterprise-grade inventory intelligence without costly hardware.',
    checks: ['166 / 166 Tickets', '0 Critical Bugs', 'Full ARIA & POS Shortcut Support'],
    statLabel: 'PROJECT STATUS',
    statValue: '166 / 166',
    statSub: 'TICKETS COMPLETED · DONE',
  },

  next: {
    label: 'NEXT CASE STUDY',
    title: 'Intervue: AI Mock Coach',
    href: '/projects/intervue',
  },
  gallery: {
  title: 'Product Screenshots',
  lead: 'A closer look at the interface across dashboard, POS, inventory, and reporting views.',
  images: [
    { src: '/assets/work/agora/agora-dashboard.png', label: 'Executive Dashboard' },
    { src: '/assets/work/agora/agora-POS.png', label: 'POS & Camera Scanner' },
    { src: '/assets/work/agora/agora-inventory.png', label: 'Inventory Catalog' },
    { src: '/assets/work/agora/agora-payments.png', label: 'Payments & Ledger' },
    { src: '/assets/work/agora/agora-reports.png', label: 'Reports & Analytics' },
    { src: '/assets/work/agora/agora-admin-user-management.png', label: 'User & RBAC Control' },
    { src: '/assets/work/agora/agora-scanner.png', label: 'Camera Barcode Scanner' },
    { src: '/assets/work/agora/agora-stock-management.png', label: 'Stock Management' },
    { src: '/assets/work/agora/agora-login.png', label: 'Login' },
  ],
},
}
