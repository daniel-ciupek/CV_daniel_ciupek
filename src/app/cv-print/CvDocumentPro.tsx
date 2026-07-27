/**
 * CvDocumentPro — designerski, dwukolumnowy dokument CV dla /cv-print/pro (PL) i /cv-print/pro/en (EN).
 *
 * - Osobny namespace `.cv2-*` — nie koliduje z ATS-owym `.cv-*` ani jego resetami @media print.
 * - Treść z src/config/data.ts (jedyne źródło prawdy). Myślniki „—/–" zamieniane na „-".
 * - Wariant jasny (light sidebar) — bezpieczny w druku; kolory wymuszane `print-color-adjust: exact`.
 */
import Image from "next/image";
import data from "@/config/data";
import type { Certificate, Project } from "@/types";

type Lang = "pl" | "en";

/** Myślniki długie → pojedynczy łącznik (preferencja druku). */
const dash = (s: string) => s.replace(/[—–]/g, "-");

const T: Record<Lang, Record<string, string>> = {
  pl: {
    experience: "Doświadczenie",
    projects: "Projekty",
    certificates: "Certyfikaty",
    contact: "Kontakt",
    links: "Linki",
    stack: "Stack",
    ai: "AI & narzędzia",
    languages: "Języki",
    available: "Dostępny · otwarty na propozycje",
    tProjects: "Projektów",
    tCerts: "Certyfikatów",
    tHours: "Godzin szkoleń",
    tProd: "Wdrożenie produkcyjne",
    deployed: "Wdrożony produkcyjnie",
    courses: "kursów",
  },
  en: {
    experience: "Experience",
    projects: "Projects",
    certificates: "Certifications",
    contact: "Contact",
    links: "Links",
    stack: "Stack",
    ai: "AI & tools",
    languages: "Languages",
    available: "Available · open to opportunities",
    tProjects: "Projects",
    tCerts: "Certificates",
    tHours: "Training hours",
    tProd: "Production deployment",
    deployed: "Deployed to production",
    courses: "courses",
  },
};

const ROLE_TAGS: Record<Lang, string[]> = {
  pl: ["Full Stack Developer", "Ekosystem Laravel", "DevOps / CI-CD"],
  en: ["Full Stack Developer", "Laravel Ecosystem", "DevOps / CI-CD"],
};

const CAT_EN: Record<string, string> = {
  Backend: "Backend",
  Frontend: "Frontend",
  "Bazy danych": "Databases",
  "DevOps & Narzędzia": "DevOps & Tools",
  "AI & Narzędzia": "AI & Tools",
};
const LANG_EN: Record<string, string> = { Polski: "Polish", Angielski: "English" };

/** Tematyczne grupowanie certów (klucze z data.ts) — czytelna mapa kompetencji zamiast ściany 14 pozycji. */
const CERT_GROUPS: { pl: string; en: string; keys: string[] }[] = [
  { pl: "Backend & języki", en: "Backend & languages", keys: ["cert_python", "cert_js", "cert_php"] },
  { pl: "Full-stack", en: "Full-stack", keys: ["cert_laravel"] },
  { pl: "Bazy danych", en: "Databases", keys: ["cert_postgres", "cert_mysql"] },
  { pl: "DevOps & Cloud", en: "DevOps & Cloud", keys: ["cert_gitlab", "cert_aws", "cert_postman", "cert_docker"] },
  { pl: "AI & angielski", en: "AI & English", keys: ["cert_ai_coding", "cert_english", "cert_ai", "cert_claude"] },
];

const FEATURED_TITLES = ["QR-Master", "Workflow Management", "PrepMind", "AI Subscription & Expense Auditor"];
const COMPACT_TITLES = ["Product Manager", "To Do List"];
const PRODUCTION = new Set(["Workflow Management"]);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
    <path d="m5 12 5 5 9-11" />
  </svg>
);

export default function CvDocumentPro({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const t = T[lang];
  const p = data.personal;

  const summary = dash(
    (en ? p.cvSummary_en ?? p.cvSummary ?? p.bio_en ?? p.bio : p.cvSummary ?? p.bio) ?? ""
  );
  const location = en ? p.location_en ?? p.location : p.location;
  const gdpr = en ? p.gdpr_en ?? p.gdpr : p.gdpr;

  const byTitle = (title: string): Project | undefined => data.projects.find((x) => x.title === title);
  const certByKey = (key: string): Certificate | undefined => data.certificates.find((c) => c.key === key);
  const projDesc = (x: Project) => dash((en ? x.description_en ?? x.description : x.description) ?? "");
  const catLabel = (c: string) => (en ? CAT_EN[c] ?? c : c);
  const shortRepo = (url: string) => url.replace(/^https?:\/\//, "");
  // Krótki zapis repo w projektach (bez „github.com/") — mieści się w jednej linii
  const repoShort = (url: string) => url.replace(/^https?:\/\/(www\.)?github\.com\//, "");
  const fmtH = (n: number) => (en ? String(n) : String(n).replace(".", ","));

  const featured = FEATURED_TITLES.map(byTitle).filter((x): x is Project => Boolean(x));
  const compact = COMPACT_TITLES.map(byTitle).filter((x): x is Project => Boolean(x));

  const stackGroups = data.skills.filter((g) => !g.category.startsWith("AI"));
  const aiGroup = data.skills.find((g) => g.category.startsWith("AI"));

  const totalHours = data.certificates.reduce((a, c) => a + c.hours, 0);
  const hoursLabel = `${Math.floor(totalHours / 50) * 50}+`;
  const certMeta = `${data.certificates.length} ${t.courses} · ${hoursLabel} h · Udemy`;

  const langPct = (level: string) => (/ojczyst|native/i.test(level) ? 100 : 60);
  const langLevelText = (name: string) =>
    name === "Polski" ? (en ? "native" : "ojczysty") : en ? "B1/B2 · technical" : "B1/B2 · techniczny";

  return (
    <main className="cv2-page" lang={lang}>
      {/* ══ SIDEBAR ══ */}
      <aside className="cv2-aside">
        <div className="cv2-photo-wrap">
          <Image
            className="cv2-photo-img"
            src={p.avatarPro}
            alt={p.name}
            width={118}
            height={118}
            priority
          />
          <span className="cv2-avail">
            <span className="cv2-dot" aria-hidden />
            {t.available}
          </span>
        </div>

        <section className="cv2-sb-sect">
          <div className="cv2-sb-label">{t.contact}</div>
          <div className="cv2-krow cv2-mono">{p.email}</div>
          <div className="cv2-krow cv2-mono">{p.phone}</div>
          <div className="cv2-krow">{location}</div>
        </section>

        <section className="cv2-sb-sect">
          <div className="cv2-sb-label">{t.links}</div>
          <div className="cv2-krow cv2-mono">{shortRepo(p.github)}</div>
          <div className="cv2-krow cv2-mono">{shortRepo(p.linkedin)}</div>
          {p.website && <div className="cv2-krow cv2-mono">{shortRepo(p.website)}</div>}
        </section>

        <section className="cv2-sb-sect cv2-sb-stack">
          <div className="cv2-sb-label">{t.stack}</div>
          {stackGroups.map((g) => (
            <div key={g.category} className="cv2-catgroup">
              <div className="cv2-cat">{catLabel(g.category)}</div>
              <div className="cv2-chips">
                {g.items.map((it) => (
                  <span key={it} className="cv2-chip">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {aiGroup && (
          <section className="cv2-sb-sect">
            <div className="cv2-sb-label">{t.ai}</div>
            <div className="cv2-chips">
              {aiGroup.items.map((it) => (
                <span key={it} className="cv2-chip">
                  {it}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="cv2-sb-sect">
          <div className="cv2-sb-label">{t.languages}</div>
          {p.languages.map((l) => (
            <div key={l.name} className="cv2-lang">
              <div className="cv2-lang-top">
                <span className="cv2-lang-nm">{en ? LANG_EN[l.name] ?? l.name : l.name}</span>
                <span className="cv2-lang-lv">{langLevelText(l.name)}</span>
              </div>
              <div className="cv2-bar-track">
                <div className="cv2-bar-fill" style={{ width: `${langPct(l.level)}%` }} />
              </div>
            </div>
          ))}
        </section>

        {gdpr && <p className="cv2-gdpr">{gdpr}</p>}
      </aside>

      {/* ══ MAIN ══ */}
      <div className="cv2-main">
        <header className="cv2-headhead">
          <h1 className="cv2-name">{p.name}</h1>
          <div className="cv2-aurora" aria-hidden />
          <div className="cv2-roletags">
            {ROLE_TAGS[lang].map((r) => (
              <span key={r} className="cv2-rtag">
                {r}
              </span>
            ))}
          </div>
          <p className="cv2-summary">{summary}</p>
        </header>

        <div className="cv2-stats">
          <div className="cv2-tile">
            <div className="cv2-n">{data.certificates.length}</div>
            <div className="cv2-c">{t.tCerts}</div>
          </div>
          <div className="cv2-tile">
            <div className="cv2-n">{hoursLabel}</div>
            <div className="cv2-c">{t.tHours}</div>
          </div>
          <div className="cv2-tile">
            <div className="cv2-n">{data.projects.length}</div>
            <div className="cv2-c">{t.tProjects}</div>
          </div>
          <div className="cv2-tile">
            <div className="cv2-n">1</div>
            <div className="cv2-c">{t.tProd}</div>
          </div>
        </div>

        {data.experience?.length > 0 && (
          <section className="cv2-sect">
            <div className="cv2-sect-h">
              <h2>{t.experience}</h2>
              <div className="cv2-rule" />
            </div>
            {data.experience.map((e, i) => (
              <div key={i} className="cv2-exp">
                <div className="cv2-exp-row">
                  <span className="cv2-exp-role">{dash(en ? e.role_en ?? e.role : e.role)}</span>
                  {e.period && <span className="cv2-exp-period">{e.period}</span>}
                </div>
                <p className="cv2-exp-desc">{dash(en ? e.description_en ?? e.description : e.description)}</p>
                {(en ? e.highlights_en ?? e.highlights : e.highlights)?.length ? (
                  <ul className="cv2-xlist">
                    {(en ? e.highlights_en ?? e.highlights : e.highlights)!.map((h) => (
                      <li key={h}>{dash(h)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </section>
        )}

        <section className="cv2-sect">
          <div className="cv2-sect-h">
            <h2>{t.projects}</h2>
            <div className="cv2-rule" />
          </div>
          {featured.map((x) => (
            <div key={x.title} className="cv2-proj">
              <div className="cv2-proj-row">
                <span className="cv2-proj-ttl">
                  {dash(x.title)}
                  {PRODUCTION.has(x.title) && <span className="cv2-badge">{t.deployed}</span>}
                </span>
                {x.github && <span className="cv2-proj-link">{repoShort(x.github)} ↗</span>}
              </div>
              <p className="cv2-proj-imp">{projDesc(x)}</p>
              <div className="cv2-proj-stack">{x.stack.slice(0, 6).join(" · ")}</div>
            </div>
          ))}
          {compact.map((x) => (
            <div key={x.title} className="cv2-proj cv2-proj-compact">
              <div className="cv2-proj-row">
                <span className="cv2-proj-ttl">{dash(x.title)}</span>
                {x.github && <span className="cv2-proj-link">{repoShort(x.github)} ↗</span>}
              </div>
              <p className="cv2-proj-imp">{projDesc(x)}</p>
              <div className="cv2-proj-stack">{x.stack.slice(0, 6).join(" · ")}</div>
            </div>
          ))}
        </section>

        <section className="cv2-sect">
          <div className="cv2-sect-h">
            <h2>{t.certificates}</h2>
            <div className="cv2-rule" />
            <span className="cv2-sect-meta">{certMeta}</span>
          </div>
          <div className="cv2-certgrid">
            {CERT_GROUPS.map((grp) => {
              const certs = grp.keys.map(certByKey).filter((c): c is Certificate => Boolean(c));
              const sum = certs.reduce((a, c) => a + c.hours, 0);
              return (
                <div key={grp.pl} className="cv2-cgroup">
                  <div className="cv2-glabel">
                    {(en ? grp.en : grp.pl)} · {fmtH(sum)} h
                  </div>
                  {certs.map((c) => (
                    <div key={c.key} className="cv2-cert">
                      <CheckIcon />
                      <span>
                        {en ? c.title_en ?? c.title : c.title} <span className="cv2-h">· {fmtH(c.hours)}h</span>
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
