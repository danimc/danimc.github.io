import { person, about, jobs, skills, practices, education, faq, work, portfolioProject } from '../data/cv';
export function GET() {
  const body = [
    `# ${person.name}`, `${person.fullName}\n\n${person.role}. ${person.setup}.\n\n${person.city}, Mexico · UTC−6`,
    `${person.pitch}\n\n${about.short}\n\n${about.long}`,
    `## Contact\n\nEmail: ${person.email}\nLinkedIn: ${person.links.linkedin}\nGitHub: ${person.links.github}`,
    `## Public product: ${portfolioProject.name}\n\n${portfolioProject.role}\n\n${portfolioProject.description}\n\nWebsite: ${portfolioProject.links.website}\nApp Store: ${portfolioProject.links.apple}\nGoogle Play: ${portfolioProject.links.google}\nCase study: /work/conomi/`,
    `## Selected engineering work\n\n${work.map(w => `### ${w.title}\n\n${w.context}\n\n${w.summary}\n\n${w.details.map(d => `${d.label}: ${d.text}`).join('\n\n')}`).join('\n\n')}`,
    `## Experience\n\n${jobs.map(j => `### ${j.title} · ${j.company}\n\n${j.period ?? `${j.from} - ${j.to}`} · ${j.place}\n\n${j.scope}${j.proof ? '\n\n' + j.proof : ''}${j.stack ? '\n\nStack: ' + j.stack : ''}${j.gapAfter ? '\n\nCareer note: ' + j.gapAfter.from + ' - ' + j.gapAfter.to + ' · ' + j.gapAfter.what : ''}`).join('\n\n')}`,
    `## Skills\n\n${skills.map(s => `### ${s.name}\n\n${s.what}\n\n${s.stack}`).join('\n\n')}`,
    `## How I work\n\n${practices.map(p => `### ${p.title}\n\n${p.how}`).join('\n\n')}`,
    `## Education\n\n${education.map(e => `- ${e.when}: ${e.what}`).join('\n')}`,
    `## Questions\n\n${faq.map(f => `### ${f.q}\n\n${f.a}`).join('\n\n')}`,
  ].join('\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
