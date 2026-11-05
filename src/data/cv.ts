// Single source for the site. Mirrors CV v2.1 (vault: personal/datos-laborales/cv-staff-tech-lead-2026-10).
// Vault rules carried over: no "Staff" title, no PR or commit counts, no framework comparisons,
// no scholarship, English B2.
// Site rule (2026-10-29): talk about development skills, not about what happens inside each job.
// Conomi may be featured publicly, explicitly authorized by Daniel in this session.
// Other private product names and employer implementation details stay out.
// Copy rule: no hyphens inside sentences.

export const person = {
  name: 'Daniel Mora',
  fullName: 'Luis Daniel Mora Carbajal',
  // One wording for the role everywhere: titles, hero, résumé, JSON-LD
  role: 'Senior full stack engineer & tech lead',
  pitch: 'Web apps, APIs, iOS and Android apps, and the infrastructure AI agents run on. 11+ years in production, today mostly in TypeScript and Python.',
  setup: 'Available for a new role. Full time or contract, two weeks notice. Open to remote and relocation',
  hours: 'UTC−6 · overlaps US business hours',
  terms: 'Full time or contract · 2 weeks notice',
  city: 'Guadalajara',
  timeZone: 'America/Mexico_City',
  // Plain in the HTML on purpose: recruiters without JS (or reading the page as text) must still reach it
  email: 'daniel.k310a@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/dany-mc/',
    github: 'https://github.com/danimc',
  },
};

export const mailto = `mailto:${person.email}?subject=${encodeURIComponent('Engineering role for Daniel Mora')}`;

// About: two lines for the recruiter, one more paragraph for the hiring manager
export const about = {
  short: 'I build software that holds up in production. Full stack in TypeScript and Python, mobile with React Native, and lately the platforms LLM agents run on. For four years I was tech lead of a computer vision product and its cross functional team.',
  long: 'I plan for the failure first, then write the feature. Big changes ship in small reversible steps, decisions get written down as ADRs, and I review code as much as I write it. I am doing a part time Ph.D. on agentic AI, and I work in English every day with a US team.',
};

export type Job = {
  title: string;
  company: string;
  place: string;
  from: string;
  to: string;
  scope: string;
  proof?: string;
  period?: string;
  details?: { label: string; text: string }[];
  // Résumé bullets, taken from CV v2.1
  highlights?: string[];
  stack?: string;
  // A break before this job (jobs are listed newest first), shown as an unnumbered line under it
  gapAfter?: { from: string; to: string; what: string };
};

export const jobs: Job[] = [
  {
    title: 'Senior Full Stack Engineer',
    company: 'HeyDonto AI',
    place: 'Remote',
    from: 'Jun 2025',
    to: 'Present',
    scope: 'Full stack on an AI agent platform: React frontends, Python APIs and the Kubernetes runtime underneath.',
    stack: 'React · Next.js · FastAPI · Claude Agent SDK · GCP',
    highlights: [
      'Co own the product layer of an internal developer platform where AI agents take a ticket to a tested, reviewed pull request (React, FastAPI, Claude Agent SDK on GCP and Kubernetes).',
      'Made AI agent runs reliable: each run gets its own isolated environment, and deploys no longer interrupt work in progress.',
      'Moved a core data mapping engine (about 50,000 lines) into a single package without changing its behavior or the data contracts other teams depend on.',
      'Drive framework and architecture decisions for the product layer and document them as ADRs, including a frontend migration to Next.js.',
    ],
    details: [
      { label: 'Product engineering', text: 'React interfaces and Python APIs for an internal developer platform built around AI agent tasks.' },
      { label: 'Runtime', text: 'Task isolation and deployment behavior around active agent work, using Kubernetes on GCP.' },
      { label: 'Architecture', text: 'Documented technical choices as ADRs and worked across frontend, API and execution boundaries.' },
    ],
  },
  {
    title: 'Principal Software Engineer, Tech Lead',
    company: 'Algotive',
    place: 'Guadalajara',
    from: 'Jun 2021',
    to: 'Jun 2025',
    scope: 'Led a cross functional team of about 15 and owned a computer vision product end to end.',
    proof: '64 concurrent video streams on one GPU.',
    stack: 'Python · NVIDIA Triton · React · Electron',
    highlights: [
      'Tech lead of an on premise video analytics product for public safety operations. Led a cross functional team of about 15 (backend, frontend, ML and data science, DevOps and product) and ended up owning the product end to end.',
      'Put forensic vehicle search and multi camera re identification into production, with all AI processing on the customer’s own servers.',
      'Scaled GPU inference (NVIDIA Triton) to 64 concurrent video streams on a single GPU.',
      'Added 2FA, role based access control (RBAC) and audit logging for government deployments.',
    ],
    details: [
      { label: 'Technical leadership', text: 'A cross functional team covering backend, frontend, ML, DevOps and product, with end to end product ownership.' },
      { label: 'Inference', text: 'Video inference pipelines using NVIDIA Triton. The reported result was 64 concurrent video streams on a single GPU.' },
      { label: 'Delivery surface', text: 'Python services together with React and Electron product interfaces.' },
    ],
  },
  {
    title: 'Senior Full Stack Developer',
    company: 'Jalisco State Prosecutor’s Office',
    place: 'Guadalajara',
    from: 'Jan 2018',
    to: 'Jun 2021',
    scope: 'Web systems that replaced paper processes for more than 1,000 people.',
    gapAfter: { from: 'Aug 2017', to: 'Jan 2018', what: 'Finished my B.S. in Computer Systems Engineering' },
    stack: 'PHP · JavaScript · SQL · REST APIs',
    highlights: ['Built web systems used by more than 1,000 staff and replaced paper based processes, working with the people who used them every day.'],
    details: [{ label: 'Users and delivery', text: 'Web systems for more than 1,000 staff, replacing paper processes and gathering requirements directly from the people using them.' }],
  },
  {
    title: 'Full Stack Developer',
    company: 'Guadalajara Municipal Police',
    place: 'Guadalajara',
    from: 'Jul 2014',
    to: 'Aug 2017',
    scope: 'Internal platforms, dashboards and APIs, with requirements straight from the people using them.',
    highlights: ['Built internal platforms, dashboards and APIs for public safety operations. Gathered requirements from end users myself.'],
    details: [{ label: 'Foundation', text: 'Full stack delivery across internal platforms, dashboards and APIs, starting from direct conversations with end users.' }],
  },
];

// Skills table, filterable by the kind of role. Tags: web, mobile, ai, lead.
export const filters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Full stack web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI and agents' },
  { id: 'lead', label: 'Leadership' },
];

export const skills = [
  // Go, Rust and C#/.NET added on Daniel's call (2026-10-30). Kafka, Temporal, Terraform, gRPC and YOLO confirmed by Daniel (2026-11-04)
  { name: 'Languages', tags: 'web ai mobile', what: 'TypeScript and Python day to day, JavaScript and PHP from years of web systems, and Go, Rust or C# with .NET when a service calls for them.', stack: 'TypeScript · Python · JavaScript · PHP · Go · Rust · C# / .NET' },
  { name: 'Agent platforms', tags: 'ai web', what: 'Isolated runs per task, deploys that drain active work before replacement, review before merge.', stack: 'Claude Agent SDK · FastAPI · Kubernetes' },
  { name: 'Web apps', tags: 'web', what: 'React and Next.js frontends on typed APIs, built to be read by the next person.', stack: 'React · Next.js · Node.js · NestJS' },
  { name: 'Refactors at scale', tags: 'web', what: 'Large codebase migrations in small steps, with frozen contracts. A 50,000 line engine moved into one package with no behavior change.', stack: 'Python · TypeScript · contract tests' },
  { name: 'Data', tags: 'web', what: 'Schemas, queues and staged migrations with explicit recovery plans.', stack: 'PostgreSQL · Redis · Kafka · Temporal' },
  { name: 'Mobile apps', tags: 'mobile', what: 'iOS and Android from one TypeScript codebase, offline first, shipped to both stores.', stack: 'React Native · Expo · Supabase' },
  { name: 'GPU inference', tags: 'ai', what: 'Video inference pipelines on NVIDIA Triton, scaled to 64 concurrent streams on one GPU.', stack: 'NVIDIA Triton · YOLO · gRPC' },
  { name: 'Team leadership', tags: 'lead', what: 'Four years as tech lead of a cross functional team: architecture decisions as ADRs, code review as the quality gate, and end to end product ownership.', stack: 'ADRs · code review · RBAC and security reviews' },
  { name: 'Cloud and delivery', tags: 'web lead', what: 'CI/CD, containers and infrastructure as code on GCP and AWS.', stack: 'Docker · Terraform · GitHub Actions' },
];

// Engineering practices, written as habits rather than stories from a specific job
export const practices = [
  { title: 'Ship the safe half first', how: 'Renames and migrations go out first; anything that deletes data waits for a sign off.' },
  { title: 'Refactors change shape, never behavior', how: 'Small steps, frozen contracts. If anyone downstream notices, I moved too fast.' },
  { title: 'Write the decision down', how: 'Every non obvious choice gets an ADR with the options I rejected. Teams argue once, then build.' },
];

export const education = [
  { when: 'In progress', what: 'Ph.D. in Information Technology, University of Guadalajara. Part time, research on agentic AI.' },
  { when: '2022', what: 'M.S. in Information Technology, University of Guadalajara' },
  { when: '2017', what: 'B.S. in Computer Systems Engineering, University of Guadalajara' },
];

export const faq = [
  { q: 'Do you still write code?', a: 'Yes. My work combines implementation, code review and architecture. I am looking for a hands on senior or technical leadership role.' },
  { q: 'Do you build mobile apps?', a: 'Yes. React Native and Expo for iOS and Android, from the first screen to store release.' },
  { q: 'How is your English?', a: 'B2. I work in English every day with a US team: standups, design reviews and written ADRs.' },
  { q: 'Can I see code?', a: 'Most of my code is private. Conomi is publicly released on iOS and Android, so you can inspect a product I designed, built and shipped. I can walk through architecture and decisions on a call.' },
];

// Public scope only. No private incident descriptions, product names or invented
// benchmarks. This is not a reproduction of an employer's internal architecture.
export const work = [
  {
    context: 'AI agent platforms · HeyDonto AI',
    title: 'The product layer around agent execution.',
    summary: 'React interfaces, Python APIs and the infrastructure behind agent tasks. Engineering across the product and runtime boundaries.',
    details: [
      { label: 'My contribution', text: 'Full stack implementation across React product interfaces, FastAPI services and the Kubernetes runtime on GCP.' },
      { label: 'Engineering decisions', text: 'Isolated task execution, deployment behavior around active work, and architecture decisions documented as ADRs.' },
      { label: 'Technical surface', text: 'React, Next.js, FastAPI, Claude Agent SDK, Kubernetes and GCP.' },
    ],
  },
  {
    context: 'Computer vision · Algotive',
    title: 'Video inference. End to end ownership.',
    summary: 'Four years as Principal Software Engineer and Tech Lead, across backend, frontend, ML, DevOps and product.',
    details: [
      { label: 'My contribution', text: 'Technical lead across backend, frontend, ML, DevOps and product, and owner of the computer vision product end to end.' },
      { label: 'In production', text: 'Forensic vehicle search and multi camera re identification, with all AI processing on the customer’s own servers.' },
      { label: 'Security', text: '2FA, role based access control and audit logging for government deployments.' },
    ],
  },
];

// Public product explicitly approved for this portfolio by Daniel.
export const portfolioProject = {
  name: 'Conomi',
  role: 'Creator · design & engineering',
  description: 'A personal finance app for credit cards, installment purchases and recurring payments in Mexico. React Native and Expo, live on iOS and Android since July 2026.',
  links: {
    website: 'https://conomi.app/',
    apple: 'https://apps.apple.com/mx/app/conomi/id6762391062',
    google: 'https://play.google.com/store/apps/details?id=com.ctings.conomiapp',
  },
};
