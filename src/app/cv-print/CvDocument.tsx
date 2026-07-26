/**
 * CvDocument — wspólny dokument CV dla /cv-print (PL) i /cv-print/en (EN).
 *
 * i18n:
 * - Treść (bio, doświadczenie, opisy projektów, lokalizacja) → pola `_en` w data.ts (fallback do PL).
 * - Etykiety strukturalne (nagłówki, kategorie, języki) → słowniki poniżej.
 * - Certyfikaty (nazwy kursów) i stack technologii → bez tłumaczenia (uniwersalne / nazwy własne).
 */
import type { ReactNode } from "react";
import data from "@/config/data";
import type { Experience, Project } from "@/types";

type Lang = "pl" | "en";

const T: Record<Lang, Record<string, string>> = {
  pl: {
    about: "O mnie",
    experience: "Doświadczenie",
    skills: "Umiejętności",
    projects: "Projekty",
    certificates: "Certyfikaty",
    languages: "Języki",
  },
  en: {
    about: "Summary",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    certificates: "Certifications",
    languages: "Languages",
  },
};

const CAT_EN: Record<string, string> = {
  Backend: "Backend",
  Frontend: "Frontend",
  "Bazy danych": "Databases",
  "DevOps & Narzędzia": "DevOps & Tools",
  "AI & Narzędzia": "AI & Tools",
};
const LANG_EN: Record<string, string> = { Polski: "Polish", Angielski: "English" };
const LEVEL_EN: Record<string, string> = {
  "język ojczysty": "native",
  "komunikatywny (B1/B2)": "professional working proficiency (B1/B2)",
};

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="cv-section-heading">{children}</h2>;
}
function Divider() {
  return <hr className="cv-divider" />;
}

export default function CvDocument({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const t = T[lang];
  const p = data.personal;

  const location = en ? p.location_en ?? p.location : p.location;
  const bio = en ? p.bio_en ?? p.bio : p.bio;

  const primary = data.skills.slice(0, 3);
  const secondary = data.skills.slice(3);

  const catLabel = (c: string) => (en ? CAT_EN[c] ?? c : c);
  const projDesc = (proj: Project) => (en ? proj.description_en ?? proj.description : proj.description);
  const expRole = (e: Experience) => (en ? e.role_en ?? e.role : e.role);
  const expDesc = (e: Experience) => (en ? e.description_en ?? e.description : e.description);
  const expHighlights = (e: Experience) => (en ? e.highlights_en ?? e.highlights : e.highlights);
  const langName = (n: string) => (en ? LANG_EN[n] ?? n : n);
  const langLevel = (l: string) => (en ? LEVEL_EN[l] ?? l : l);

  return (
    <main className="cv-page" lang={lang}>
      {/* Nagłówek — imię i kontakt */}
      <header className="cv-header">
        <h1 className="cv-name">{p.name}</h1>
        <p className="cv-title">{p.title}</p>
        <div className="cv-contact-row">
          <span>{location}</span>
          <span className="cv-sep">·</span>
          <a href={`mailto:${p.email}`}>{p.email}</a>
          <span className="cv-sep">·</span>
          <a href={`tel:${p.phone}`}>{p.phone}</a>
          <span className="cv-sep">·</span>
          <a href={p.github} target="_blank" rel="noopener noreferrer">
            {p.github.replace("https://", "")}
          </a>
          <span className="cv-sep">·</span>
          <a href={p.linkedin} target="_blank" rel="noopener noreferrer">
            {p.linkedin.replace("http://", "").replace("https://", "")}
          </a>
          {p.website && (
            <>
              <span className="cv-sep">·</span>
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: 700, color: "#1a56a0" }}
              >
                {p.website.replace("https://", "")}
              </a>
            </>
          )}
        </div>
      </header>

      {/* O mnie / Summary */}
      {bio && (
        <section>
          <SectionHeading>{t.about}</SectionHeading>
          <Divider />
          <p className="cv-bio">{bio}</p>
        </section>
      )}

      {/* Doświadczenie / Experience */}
      {data.experience?.length > 0 && (
        <section>
          <SectionHeading>{t.experience}</SectionHeading>
          <Divider />
          <div className="cv-experience">
            {data.experience.map((exp, i) => {
              const highlights = expHighlights(exp);
              return (
                <div key={i} className="cv-exp-item">
                  <div className="cv-exp-header">
                    <span className="cv-exp-role">{expRole(exp)}</span>
                    {exp.org && <span className="cv-exp-org">{exp.org}</span>}
                    {exp.period && <span className="cv-exp-period">{exp.period}</span>}
                  </div>
                  {expDesc(exp) && <p className="cv-exp-desc">{expDesc(exp)}</p>}
                  {highlights?.length ? (
                    <ul className="cv-exp-list">
                      {highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Umiejętności / Skills */}
      <section>
        <SectionHeading>{t.skills}</SectionHeading>
        <Divider />
        <div className="cv-skills-grid">
          {primary.map((group) => (
            <div key={group.category}>
              <p className="cv-skill-category">{catLabel(group.category)}</p>
              <ul className="cv-skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="cv-skills-grid cv-skills-secondary">
          {secondary.map((group) => (
            <div key={group.category}>
              <p className="cv-skill-category">{catLabel(group.category)}</p>
              <ul className="cv-skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projekty / Projects */}
      <section className="cv-section-break-before">
        <SectionHeading>{t.projects}</SectionHeading>
        <Divider />
        <div className="cv-projects">
          {data.projects.map((project) => (
            <div key={project.title} className="cv-project">
              <div className="cv-project-header">
                <span className="cv-project-title">{project.title}</span>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-project-link"
                  >
                    {project.github.replace("https://github.com/", "github.com/")}
                  </a>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-project-link"
                  >
                    {project.url.replace("https://", "")}
                  </a>
                )}
              </div>
              <p className="cv-project-desc">{projDesc(project)}</p>
              <p className="cv-project-stack">{project.stack.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certyfikaty / Certifications — nazwy kursów bez tłumaczenia */}
      <section className="cv-section-break-before">
        <SectionHeading>{t.certificates}</SectionHeading>
        <Divider />
        <ul className="cv-cert-list">
          {data.certificates.map((cert) => (
            <li key={cert.key}>
              <span className="cv-cert-title">{en ? cert.title_en ?? cert.title : cert.title}</span>
              <span className="cv-cert-meta">
                {" — "}
                {cert.platform}
                {cert.date ? ` — ${cert.date}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Języki / Languages */}
      {p.languages?.length > 0 && (
        <section>
          <SectionHeading>{t.languages}</SectionHeading>
          <Divider />
          <ul className="cv-lang-list">
            {p.languages.map((l) => (
              <li key={l.name}>
                <span className="cv-lang-name">{langName(l.name)}</span> — {langLevel(l.level)}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
