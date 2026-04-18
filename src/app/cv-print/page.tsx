/**
 * /cv-print — Wersja ATS/PDF dla rekruterów
 *
 * ZASADY EDYCJI:
 * - Wszystkie treści pochodzą z src/config/data.ts — edytuj TYLKO tam
 * - Bio ("O mnie") uzupełnij w data.personal.bio
 * - Strona dostosowana do druku: Ctrl+P → "Zapisz jako PDF"
 * - Nie dodawaj tu animacji, kolorowych teł ani efektów — czysty dokument
 */

import data from "@/config/data";
import PrintButton from "./PrintButton";

/* ─── Małe komponenty pomocnicze ───────────────────────────────────────────
   Dzięki nim każda sekcja jest niezależna i łatwa do przestawienia/edycji.
─────────────────────────────────────────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cv-section-heading">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="cv-divider" />;
}

/* ─── Sekcje ────────────────────────────────────────────────────────────── */

function Header() {
  const { name, title, email, phone, github, linkedin } = data.personal;
  return (
    <header className="cv-header">
      <h1 className="cv-name">{name}</h1>
      <p className="cv-title">{title}</p>
      <div className="cv-contact-row">
        <a href={`mailto:${email}`}>{email}</a>
        <span className="cv-sep">·</span>
        <a href={`tel:${phone}`}>{phone}</a>
        <span className="cv-sep">·</span>
        <a href={github} target="_blank" rel="noopener noreferrer">{github.replace("https://", "")}</a>
        <span className="cv-sep">·</span>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin.replace("http://", "").replace("https://", "")}</a>
      </div>
    </header>
  );
}

function About() {
  const bio = data.personal.bio;
  if (!bio) return null;
  return (
    <section>
      <SectionHeading>O mnie</SectionHeading>
      <Divider />
      <p className="cv-bio">{bio}</p>
    </section>
  );
}

function Skills() {
  const primary = data.skills.slice(0, 3);
  const secondary = data.skills.slice(3);
  return (
    <section>
      <SectionHeading>Umiejętności</SectionHeading>
      <Divider />
      <div className="cv-skills-grid">
        {primary.map(group => (
          <div key={group.category}>
            <p className="cv-skill-category">{group.category}</p>
            <ul className="cv-skill-list">
              {group.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="cv-skills-grid cv-skills-secondary">
        {secondary.map(group => (
          <div key={group.category}>
            <p className="cv-skill-category">{group.category}</p>
            <ul className="cv-skill-list">
              {group.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section>
      <SectionHeading>Projekty</SectionHeading>
      <Divider />
      <div className="cv-projects">
        {data.projects.map(project => (
          <div key={project.title} className="cv-project">
            <div className="cv-project-header">
              <span className="cv-project-title">{project.title}</span>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="cv-project-link">
                  {project.github.replace("https://github.com/", "github.com/")}
                </a>
              )}
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="cv-project-link">
                  {project.url.replace("https://", "")}
                </a>
              )}
            </div>
            <p className="cv-project-desc">{project.description}</p>
            <p className="cv-project-stack">{project.stack.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Certificates() {
  return (
    <section>
      <SectionHeading>Certyfikaty</SectionHeading>
      <Divider />
      <ul className="cv-cert-list">
        {data.certificates.map(cert => (
          <li key={cert.key}>
            <span className="cv-cert-title">{cert.title}</span>
            <span className="cv-cert-meta"> — {cert.platform} — {cert.date} — {cert.hours}h</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─── Strona główna ─────────────────────────────────────────────────────── */

export default function CvPrint() {
  return (
    <>
      {/* Print button — widoczny tylko w przeglądarce, niewidoczny w druku */}
      <PrintButton />

      <main className="cv-page">
        {/*
          KOLEJNOŚĆ SEKCJI — przestaw bloki poniżej, aby zmienić układ CV.
          Każda sekcja jest niezależna i czyta dane z data.ts automatycznie.
        */}
        <Header />
        <About />       {/* pojawi się gdy data.personal.bio jest uzupełnione */}
        <Skills />
        <Projects />
        <Certificates />
      </main>
    </>
  );
}
