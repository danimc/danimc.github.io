// Single source for the site. Mirrors CV v2.1 (vault: personal/datos-laborales/cv-staff-tech-lead-2026-10).
// Vault rules carried over: no "Staff" title, no PR or commit counts, no framework comparisons,
// no scholarship, English B2.
// Site rule (2026-10-29): talk about development skills, not about what happens inside each job.
// No product names (Conomi included); mobile shows up as a skill only.
// Copy rule: no hyphens inside sentences.

export const person = {
  name: 'Daniel Mora',
  fullName: 'Luis Daniel Mora Carbajal',
  role: 'Senior full stack engineer',
  pitch: 'Web apps, APIs, iOS and Android apps, and the infrastructure AI agents run on. Eleven years of full stack work, today mostly in TypeScript and Python.',
  setup: 'Open to remote and relocation',
  city: 'Guadalajara',
  timeZone: 'America/Mexico_City',
  // Plain in the HTML on purpose: recruiters without JS (or reading the page as text) must still reach it
  email: 'daniel.k310a@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/dany-mc/',
    github: 'https://github.com/danimc',
  },
};

// About: two lines for the recruiter, one more paragraph for the hiring manager
export const about = {
  short: 'I build software that holds up in production. Full stack in TypeScript and Python, mobile with React Native, and lately the platforms LLM agents run on. For four years I also led a cross functional team of about 15.',
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
  },
  {
    title: 'Full Stack Developer',
    company: 'Guadalajara Municipal Police',
    place: 'Guadalajara',
    from: 'Jul 2014',
    to: 'Aug 2017',
    scope: 'Internal platforms, dashboards and APIs, with requirements straight from the people using them.',
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
  // Go, Rust and C#/.NET added on Daniel's call (2026-10-30); they go beyond CV v2.1, align the PDF next
  { name: 'Languages', tags: 'web ai mobile', what: 'TypeScript and Python day to day, JavaScript and PHP from years of web systems, and Go, Rust or C# with .NET when a service calls for them.', stack: 'TypeScript · Python · JavaScript · PHP · Go · Rust · C# / .NET' },
  { name: 'Agent platforms', tags: 'ai web', what: 'Isolated runs per task, deploys that never cut work in progress, review before merge.', stack: 'Claude Agent SDK · FastAPI · Kubernetes' },
  { name: 'Web apps', tags: 'web', what: 'React and Next.js frontends on typed APIs, built to be read by the next person.', stack: 'React · Next.js · Node.js · NestJS' },
  { name: 'Refactors at scale', tags: 'web', what: 'About 50,000 lines moved with frozen contracts and no change downstream.', stack: 'Python · TypeScript · contract tests' },
  { name: 'Data', tags: 'web', what: 'Schemas, queues and migrations that can always roll back.', stack: 'PostgreSQL · Redis · Kafka · Temporal' },
  { name: 'Mobile apps', tags: 'mobile', what: 'iOS and Android from one TypeScript codebase, offline first, shipped to both stores.', stack: 'React Native · Expo · Supabase' },
  { name: 'GPU inference', tags: 'ai', what: 'Vision pipelines tuned until the hardware is the limit: 64 streams on one GPU.', stack: 'NVIDIA Triton · YOLO · gRPC' },
  { name: 'Team leadership', tags: 'lead', what: 'Four years leading about 15 people across backend, frontend, ML, DevOps and product.', stack: 'ADRs · code review' },
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
  { q: 'Do you still write code?', a: 'Yes. Writing and reviewing production code is most of my week. The bigger decisions go into ADRs.' },
  { q: 'Do you build mobile apps?', a: 'Yes. React Native and Expo for iOS and Android, from the first screen to store release.' },
  { q: 'How is your English?', a: 'B2. I work in English every day with a US team: standups, design reviews and written ADRs.' },
  { q: 'Can I see code?', a: 'Most of my work lives in private repositories. Happy to walk through architecture and decisions on a call.' },
];
