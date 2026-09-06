// Content + accent theme for the Premium Coffee Experience case study.

export const premiumContent = {
  id: 'premium',

  accent: {
    a1: '#8B5CF6', // accent purple
    a2: '#F59E0B', // accent amber
    a3: '#38BDF8', // accent blue
    a4: '#6D28D9', // deep purple
    a5: '#06B6D4', // accent cyan
  },

  hero: {
    kicker: 'CASE STUDY: 03',
    name: 'PREMIUM',
    subtitle: 'Coffee Experience — E-Commerce & Order System',
    tagline: 'Brewed for you.',
    lead: 'We bridge physical counter operations and digital delivery logistics under one synchronized system.',
    description:
      'A Full-Stack E-Commerce & Unified Order Management System engineered for modern specialty coffee retailers, unifying walk-in counter sales with home delivery dispatch under a single database and runtime.',
    status: 'PRODUCTION ARCHITECTURE · 100% COMPLETE',
  },

  metaCards: [
    {
      icon: 'terminal',
      label: 'Platform Stack',
      value: 'React + Node.js',
      lines: ['Express REST & MySQL'],
    },
    {
      icon: 'shield_person',
      label: 'Access Roles',
      value: 'Customer & Ops',
      lines: ['Role-Gated JWT Guard'],
    },
    {
      icon: 'local_shipping',
      label: 'Fulfillment',
      value: 'Dual Logistics',
      lines: ['Store Pick-up vs Delivery'],
    },
    {
      icon: 'forum',
      label: 'Realtime Module',
      value: 'Client Support',
      lines: ['Live Chat Inboxes'],
    },
  ],

  techStack: [
    'React', 'Node.js', 'Express', 'MySQL', 'JWT Auth', 'REST API',
  ],

  ctas: [
    { label: 'Explore Architecture', href: '#architecture', icon: 'arrow_forward', primary: true },
    { label: 'View Storefront UI', href: '#core-modules', icon: 'devices' },
    { label: 'Admin Control Plane', href: '#core-modules', icon: 'terminal' },
  ],

  problem: {
    title: 'Disconnected Counter & Delivery Operations',
    body: 'High-end artisanal specialty coffee businesses frequently struggle because walk-in counter operations run completely disconnected from online deliveries, causing broken queues, conflicting inventories, and disjointed client support.',
    painPoints: [
      'Separate workflows for counter takeaways and online deliveries.',
      'Fragmented customer profiles across interfaces.',
      'Inventory discrepancies between physical and digital channels.',
      'Confused kitchen/barista order tickets from mismatched systems.',
    ],
    goalsIntro: 'Deliver an integrated architecture pairing a warm, artisanal storefront for consumers with a high-contrast operational dashboard for shop managers and baristas.',
    goals: [
      { icon: 'storefront', title: 'Editorial Storefront', body: 'Category query filtering (Espresso, Latte, Tea, All) with persistent header controls and rapid search.' },
      { icon: 'shopping_cart', title: 'Dual Checkout Paths', body: 'Persistent multi-item cart flow versus instantaneous single-item "Buy Now" checkout.' },
      { icon: 'alt_route', title: 'Dual Pipeline Engine', body: 'Distinct state machines for physical counter pick-ups vs home delivery couriers.' },
      { icon: 'support_agent', title: 'Admin Mission Suite', body: 'Live order tracking board, CRUD catalog management, and threaded customer support chat.' },
    ],
  },

  architecture: {
    title: 'Full-Stack Three-Tier Architecture',
    lead: 'An ultra-responsive decoupled architecture: a React SPA communicating through tokenized REST routes to an Express backend, backed by a normalized MySQL schema.',
    tiers: [
      { num: '01', icon: 'devices', title: 'Client Layer', body: 'React SPA handling storefront browsing, dual checkout, and live support chat widget.', stack: ['Store & Products Module', 'Dual Checkout (Cart + Buy Now)', 'Real-time Support Chat Widget', '/admin/* Role-Guarded Routes'], hosted: 'Static SPA Deployment' },
      { num: '02', icon: 'memory', title: 'Middleware & API', body: 'Express REST layer enforcing JWT auth, RBAC, and order state transitions.', stack: ['JWT Auth Guard (/api/auth)', 'Role-Based Access Control', 'Order State Dispatcher (/api/orders)', 'Live Chat Handlers (/api/messages)'], hosted: 'Node.js Container' },
      { num: '03', icon: 'database', title: 'Persistence Tier', body: 'Relational MySQL schema with a unified orders table indexing both counter and delivery records.', stack: ['users, products, orders', 'order_items, support_threads', 'Indexed FKs on user_id/product_id'], hosted: 'MySQL Relational Cluster' },
    ],
    pipeline: ['JWT Verification', 'Role Check (Customer/Admin)', 'Order State Dispatch', 'Persistence Write'],
    realtime: {
      title: 'Live Support Chat Channel',
      body: 'The customer-facing floating widget streams directly into an administrative support center, organized into per-user threaded conversations.',
      events: [
        "socket.emit('support-message', { userId, text })",
        "socket.to('admin-inbox').emit('new-thread', { userId })",
      ],
      footnote: 'Guarantees baristas and support staff see new inquiries instantly.',
    },
  },

  dataModel: {
    title: 'Dual Fulfillment State Machine',
    lead: 'A unified database schema tracking two distinct operational lifecycles — counter and delivery — without introducing schema bloat.',
    domains: [
      { num: '01', icon: 'storefront', title: 'Store / Counter Pipeline', body: 'In-person orders move through a 4-stage lifecycle from payment to hand-off.', facts: ['1. Pending Payment — Initial State', '2. Preparing — Barista Queue', '3. Ready for Pick-up — On Counter', '4. Completed — Handed to Guest'], rule: 'Terminal exception state: Voided' },
      { num: '02', icon: 'local_shipping', title: 'Online / Delivery Pipeline', body: 'Delivery orders move through a courier-based 4-stage lifecycle.', facts: ['1. Pending Payment — Gateway Auth', '2. Preparing — Brewing & Pack', '3. Delivering — Courier Transit', '4. Shipped / Received — Delivered & Signed'], rule: 'Terminal exception states: Cancelled or Voided' },
    ],
  },

  modules: {
    title: 'Storefront & Admin Feature Suite',
    lead: 'Complete feature set spanning the consumer storefront and the internal operations console.',
    items: [
      { icon: 'home', num: '3.1', title: 'Storefront & Homepage', body: 'Immersive hero visual, "Brewed For You" tagline, and persistent category navigation with search and cart badge.', tag: 'STATUS: 200 OK' },
      { icon: 'filter_list', num: '3.2', title: 'Catalog & Category Filtering', body: 'Responsive product cards with ₱-formatted pricing, filtered via shareable URL query params like /products?cat=tea.', tag: 'QUERY: ?cat=tea' },
      { icon: 'shopping_bag', num: '3.3', title: 'Product Detail & Dual Checkout', body: 'Custom instructions field, live quantity stepper, and dual "Add to Cart" / "Buy Now" purchase paths.', tag: 'ACTIONS: CART | BUY_NOW', featured: true },
      { icon: 'remove_shopping_cart', num: '3.4', title: 'Cart Empty States & Tracking', body: 'Graceful empty-cart states with high-contrast "Browse Products" redirects back into the funnel.', tag: 'STATE: CART_EMPTY' },
      { icon: 'assignment', num: '4.1', title: 'Dual Fulfillment Orders Board', body: 'Order processing strictly partitioned by channel with distinct lifecycle tabs for counter vs delivery.', tag: 'TABLE: orders', featured: true },
      { icon: 'inventory_2', num: '4.2', title: 'Product Inventory & Catalog Mgmt', body: 'Admin table for thumbnails, pricing, categories, and availability tags with instant modal editing.', tag: 'CRUD: /api/products' },
      { icon: 'manage_accounts', num: '4.3', title: 'Role-Aware User Administration', body: 'Customer and staff profile management with locked deletion controls on primary admin accounts.', tag: 'SECURITY: LOCKED_ADMIN' },
      { icon: 'support_agent', num: '4.4', title: 'Real-Time Support Inbox', body: 'Per-customer threaded conversations with live timestamping and reply actions for support staff.', tag: 'FEED: /api/messages' },
    ],
  },

  security: {
    title: 'Access Control & Account Safeguards',
    lead: 'Role-gated architecture protecting administrative actions and preventing accidental system lockouts.',
    items: [
      { icon: 'token', label: 'JWT Auth Guard', body: 'Token verification on all administrative and financial endpoints' },
      { icon: 'shield_person', label: 'Role-Based Access', body: 'Strict separation between Customer and Admin/Ops routes' },
      { icon: 'lock_person', label: 'Locked Admin Accounts', body: 'is_locked_admin flag rejects delete operations on foundational accounts' },
      { icon: 'verified_user', label: 'Route Guards', body: '/admin/* protected via higher-order JWT validation components' },
    ],
  },

  sprints: {
    title: 'Architectural & UX Decisions',
    lead: 'Four key design decisions that shaped the system, in place of a traditional sprint log for this project.',
    totalTickets: 4,
    items: [
      { name: 'Decision 01: Dual Checkout Dispatch', desc: 'Support both Add-to-Cart and Buy Now — regular customers get a zero-friction express flow, groups use the full cart.', dates: '—', tickets: 1 },
      { name: 'Decision 02: URL Query-Param Routing', desc: 'Category selection updates /products?cat= without full re-renders, enabling shareable marketing deep links.', dates: '—', tickets: 1 },
      { name: 'Decision 03: Unified Monorepo Runtime', desc: 'Single codebase for consumer and admin, gated by JWT role guards instead of separate deployments.', dates: '—', tickets: 1 },
      { name: 'Decision 04: Warm Roast to Dark Cosmic Bridge', desc: 'Storefront uses warm latte gradients for appetite appeal; admin console shifts to high-contrast obsidian panels.', dates: '—', tickets: 1 },
    ],
  },

  postMortem: {
    title: 'Technical Challenges & Key Learnings',
    lead: 'Real issues surfaced during development and how they were permanently resolved.',
    incidents: [
      {
        num: '01', icon: 'sync_problem', title: 'State Enum Synchronicity',
        symptom: 'Customer-facing order view attempted to render intermediate barista statuses inconsistently.',
        cause: 'No shared enum contract existed between frontend display states and backend MySQL constraint checks.',
        fix: 'Introduced strict shared TypeScript-style enum maps kept in sync with backend constraints.',
        resolved: 'Resolved — order status now renders consistently across all views',
      },
      {
        num: '02', icon: 'admin_panel_settings', title: 'Protecting Super Admin Access',
        symptom: 'An admin account could inadvertently invoke its own deletion endpoint during stress testing.',
        cause: 'No safeguard existed against a foundational admin account triggering self-deletion.',
        fix: 'Backend middleware reinforced with an immutable is_locked_admin check that rejects delete ops on foundational accounts.',
        resolved: 'Resolved — security fix verified in production',
      },
      {
        num: '03', icon: 'smartphone', title: 'Mobile Stepper Layout Inversions',
        symptom: 'Dual CTA buttons ("Add to Cart" / "Buy Now") wrapped awkwardly below instruction textareas on small viewports.',
        cause: 'Flex layout did not account for compact mobile widths combined with free-text instruction fields.',
        fix: 'Implemented mobile flex-col layout with sticky bottom action bars to keep checkout triggers in thumb reach.',
        resolved: 'Resolved — UX refactor shipped',
      },
    ],
  },

  outcome: {
    tag: 'DELIVERY OUTCOME',
    title: 'Production Verdict: Unified Commerce Ecosystem',
    body: 'The Premium Coffee Experience system exemplifies how full-stack craftsmanship can unify divergent physical and digital retail requirements. By aligning customer ergonomics with rapid barista fulfillment controls, the platform operates as a resilient, self-contained commerce ecosystem.',
    checks: ['REST + JWT Audit Pass', 'Live Container Deployment', 'Dual Pipeline Verified'],
    statLabel: 'RELEASE STAMP',
    statValue: 'v1.4.2',
    statSub: 'CORE · AUDITED & DEPLOYED',
  },

  next: {
    label: 'NEXT CASE STUDY',
    title: 'Intervue: AI Mock Coach',
    href: '/projects/intervue',
  },
}