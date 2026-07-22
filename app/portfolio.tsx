"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { BlackSiteGallery, FireflyGallery, HamsterballinGallery, KillTheMakersGallery } from "./black-site-gallery";
import { useLanguage } from "./i18n";
import { LanguageSwitcher } from "./language-switcher";
import { MobileHeader } from "./mobile-header";
import { projects } from "./projects-data";

export { projects } from "./projects-data";

const detailAssets: Record<string, string[]> = {
  hamsterballin: ["/hamsterballin-details/image1.png", "/hamsterballin-details/image2.png", "/hamsterballin-details/image3.jpeg", "/hamsterballin-details/image4.png", "/hamsterballin-details/image5.png"],
  firefly: ["/firefly-details/image1.jpeg", "/firefly-details/image2.jpeg", "/firefly-details/image3.jpeg", "/firefly-details/image4.jpeg", "/firefly-details/image5.jpeg", "/firefly-details/image6.jpeg"],
  blacksite: ["/black-site-details/image1.jpeg", "/black-site-details/image2.jpeg", "/black-site-details/image3.jpeg", "/black-site-details/image4.jpeg", "/black-site-details/image5.jpeg", "/black-site-details/image6.jpeg", "/black-site-details/image7.jpeg"],
  "kill-the-makers": ["/kill-the-makers-detail/image1.jpeg", "/kill-the-makers-detail/image2.jpeg", "/kill-the-makers-detail/image3.jpeg", "/kill-the-makers-detail/image4.jpeg", "/kill-the-makers-detail/image5.jpeg", "/kill-the-makers-detail/image6.jpeg", "/kill-the-makers-detail/image7.jpeg"]
};

const heroAssets: Record<string, string> = {
  hamsterballin: "/hamsterballin-hero.png",
  firefly: projects[1].image,
  blacksite: projects[2].image,
  "kill-the-makers": "/kill-the-makers-hero-wide.png"
};

function DocumentMetadata({ activePath }: { activePath: string }) {
  const { dictionary } = useLanguage();
  const content = dictionary as any;
  const slug = activePath.startsWith("/projects/") ? activePath.split("/").pop() : "";
  const source = slug ? content.projects[slug] : activePath === "/about" ? content.about : activePath === "/resume" ? content.resume : activePath === "/contact" ? content.contact : activePath === "/projects" ? content.projectsIndex : content.home;
  useEffect(() => {
    document.title = source.metaTitle || content.site.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", source.metaDescription || content.site.description);
  }, [content, source]);
  return null;
}

export function SiteShell({ children, activePath = "/" }: { children: ReactNode; activePath?: string }) {
  const { dictionary } = useLanguage();
  const content = dictionary as any;
  const active = (path: string) => activePath === path ? "active" : "";
  const visibleProjects = projects.filter((project) => !project.underConstruction).map((project) => ({ slug: project.slug, number: project.number, title: content.projects[project.slug].title }));
  const projectGroups = [
    { label: content.nav.teamProjects, projects: visibleProjects.filter((project) => project.slug === "kill-the-makers" || project.slug === "hamsterballin") },
    { label: content.nav.individualProjects, projects: visibleProjects.filter((project) => project.slug === "firefly" || project.slug === "blacksite") }
  ];
  const groupActive = (group: (typeof projectGroups)[number]) => group.projects.some((project) => activePath === `/projects/${project.slug}`) ? "active" : "";
  return <div className="site-shell">
    <DocumentMetadata activePath={activePath} />
    <header className="site-header desktop-header">
      <nav className="main-nav" aria-label={content.nav.home}>
        <Link className={active("/")} href="/">{content.nav.home}</Link>
        {projectGroups.map((group) => <div className="project-nav" key={group.label}><span className={`project-trigger ${groupActive(group)}`}>{group.label}</span><div className="project-menu">{group.projects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`}><small>{project.number}</small>{project.title}</Link>)}</div></div>)}
        <Link className={active("/about")} href="/about">{content.nav.about}</Link><Link className={active("/resume")} href="/resume">{content.nav.resume}</Link><Link className={active("/contact")} href="/contact">{content.nav.contact}</Link>
      </nav>
      <Link className="brand" href="/" aria-label={content.site.name}><span>RUICHI LI</span></Link>
      <div className="header-socials" aria-label={content.nav.contact}><LanguageSwitcher /><a href="mailto:ruichil1030@gmail.com" aria-label={content.actions.email}>✉</a><a href="https://www.linkedin.com/in/ruichi-li-9903372b1/" target="_blank" rel="noreferrer" aria-label={content.actions.linkedin}>in</a></div>
    </header>
    <MobileHeader activePath={activePath} projectGroups={projectGroups} />
    <main>{children}</main>
    <footer className="site-footer"><div className="footer-links"><Link href="/">{content.footer.home}</Link><Link href="/contact">{content.footer.contact}</Link><Link href="/about">{content.footer.about}</Link></div></footer>
  </div>;
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const { dictionary } = useLanguage();
  const content = (dictionary as any).projects[project.slug];
  const card = <><img src={project.image} alt={content.coverAlt} /><div className="project-card-shade" />{project.underConstruction && <div className="construction-label">{(dictionary as any).labels.underConstruction}</div>}<div className="project-top"><span>{project.number}</span><span>{content.engine}</span></div><div className="project-bottom"><p>{content.role}</p><h3>{content.title}</h3>{!project.underConstruction && <span className="card-arrow">↗</span>}</div></>;
  return project.underConstruction ? <div className="project-card project-card-disabled">{card}</div> : <Link className="project-card" href={`/projects/${project.slug}`}>{card}</Link>;
}

export function HomePage() { return <SiteShell activePath="/"><HomeContent /></SiteShell>; }
function HomeContent() { const { dictionary } = useLanguage(); return <><section className="home-intro"><p className="eyebrow">{(dictionary as any).home.eyebrow}</p></section><section className="work-section" id="work"><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section></>; }

export function ProjectsPage() { const { dictionary } = useLanguage(); const content = dictionary as any; return <SiteShell activePath="/projects"><section className="page-intro"><span className="eyebrow">{content.projectsIndex.eyebrow}</span><h1>{content.projectsIndex.headline}<br /><em>{content.projectsIndex.headlineEmphasis}</em></h1><p>{content.projectsIndex.description}</p></section><section className="project-index">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</section></SiteShell>; }

export function ProjectPage({ project }: { project: (typeof projects)[number] }) { return <SiteShell activePath={`/projects/${project.slug}`}><ProjectDetail slug={project.slug} /></SiteShell>; }

function ProjectDetail({ slug }: { slug: string }) {
  const { dictionary } = useLanguage();
  const content = dictionary as any;
  const project = content.projects[slug];
  if (!project?.description) return null;
  const media = slug === "firefly" ? <img className="blacksite-about-video" src="/firefly-video-placeholder.png" alt={project.mediaAlt} /> : <video className="blacksite-about-video" controls playsInline preload="metadata" poster={slug === "blacksite" ? "/LiR_HL2_DesignGoals-poster.jpg" : slug === "kill-the-makers" ? "/kill-the-makers-main-capsule.png" : "/hamsterballin-trailer-poster.png"}><source src={slug === "blacksite" ? "/LiR_HL2_DesignGoals.mp4" : slug === "kill-the-makers" ? "/kill-the-makers-trailer.mp4" : "/hamsterballin-gameplay-trailer.mp4"} type="video/mp4" />{content.labels.browserVideoUnsupported}</video>;
  const infoLabels = [content.labels.positions, content.labels.engine, content.labels.platform, content.labels.development];
  let imageIndex = 0;
  return <><section className="project-hero blacksite-hero"><img src={heroAssets[slug]} alt={project.coverAlt} /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">{project.number} / {project.engine}</span><h1>{project.title}</h1><p>{project.heroDescription}</p></div></section><div className={`blacksite-page ${slug}-page`}>
    <section className="blacksite-overview"><div className="blacksite-about-media">{media}</div><dl>{project.info.map((values: string[], index: number) => <div key={infoLabels[index]}><dt>{infoLabels[index]}</dt><dd>{values.map((value) => <span key={value}>{value}<br /></span>)}</dd></div>)}</dl></section>
    <section className="blacksite-section"><span className="eyebrow">{content.labels.description}</span><p className="blacksite-lead">{project.description.lead}</p>{project.description.paragraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}</section>
    <section className="blacksite-section"><span className="eyebrow">{content.labels.designGoals}</span><div className="blacksite-goals">{project.goals.map((goal: any, index: number) => <article key={goal.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{goal.title}</h3><p>{goal.body}</p></article>)}</div></section>
    <section className="blacksite-section"><span className="eyebrow">{content.labels.designDetails}</span><div className="blacksite-detail-copy">{project.details.map((item: any, index: number) => { if (item.type === "heading") return <h3 key={`${item.text}-${index}`}>{item.text}</h3>; if (item.type === "image") { const src = detailAssets[slug][imageIndex++]; return <img key={`${item.alt}-${index}`} className={slug === "kill-the-makers" ? "kill-makers-detail-image" : "blacksite-detail-image"} src={src} alt={item.alt} />; } return <p key={`${item.text}-${index}`}>{item.text}</p>; })}</div></section>
    <section className="blacksite-section blacksite-postmortem"><span className="eyebrow">{content.labels.postmortem}</span><div className="postmortem-grid">{project.postmortem.map((card: any) => <article key={card.title}><h3>{card.title}</h3><ul>{card.items.map((item: string) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">{content.labels.gallery}</span><ProjectGallery slug={slug} /></section>
  </div></>;
}

function ProjectGallery({ slug }: { slug: string }) { if (slug === "blacksite") return <BlackSiteGallery />; if (slug === "kill-the-makers") return <KillTheMakersGallery />; if (slug === "hamsterballin") return <HamsterballinGallery />; return <FireflyGallery />; }

export function AboutPage() { return <SiteShell activePath="/about"><AboutContent /></SiteShell>; }
function AboutContent() { const { dictionary } = useLanguage(); const content = (dictionary as any).about; const actions = (dictionary as any).actions; return <><section className="about-custom-hero"><div><span className="eyebrow">{content.eyebrow}</span><h1>{content.headline}</h1></div><img src="/about-richard.jpg" alt={content.portraitAlt} /></section><section className="about-custom-story"><div className="about-custom-copy"><span className="eyebrow">{content.playerEyebrow}</span>{content.paragraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}<h2>{content.statement}<br /><em>{content.statementEmphasis}</em></h2></div><figure><img src="/about-handhelds.jpg" alt={content.handheldAlt} /><figcaption>{content.caption}</figcaption></figure></section><section className="about-custom-interests"><article><span className="eyebrow">{content.racingEyebrow}</span><h2>{content.racingTitle}<br /><em>{content.racingEmphasis}</em></h2><p>{content.racingText}</p></article><article><span className="eyebrow">{content.esportsEyebrow}</span><h2>{content.esportsTitle}<br /><em>{content.esportsEmphasis}</em></h2><p>{content.esportsText}</p></article></section><section className="about-custom-close"><span className="eyebrow">{content.closeEyebrow}</span><p>{content.closeText}</p><a className="text-link" href="mailto:ruichil1030@gmail.com">{actions.getInTouch} <span>↗</span></a></section></>; }

export function ResumePage() { return <SiteShell activePath="/resume"><ResumeContent /></SiteShell>; }
function ResumeContent() { const { dictionary } = useLanguage(); const content = (dictionary as any).resume; const actions = (dictionary as any).actions; return <section className="resume-page"><header className="resume-header"><div className="resume-identity"><img src="/pfp2.png" alt={content.name} /><div className="resume-name"><h1>{content.name}</h1></div><a className="resume-download" href="/Ruichi-Li-Resume.pdf" download>{actions.downloadResume} <span>↓</span></a></div><p>{content.role}</p><p>{content.contact} <a href="mailto:ruichil1030@gmail.com">ruichil1030@gmail.com</a> | <a href="https://www.linkedin.com/in/ruichi-li-9903372b1/" target="_blank" rel="noreferrer">LinkedIn</a></p></header>{content.sections.map((section: any) => <section className="resume-section" key={section.title}><h2>{section.title}</h2>{section.entries.map((entry: any) => <article className="resume-entry" key={entry.title}><div className="resume-entry-title"><h3>{entry.title}</h3><span>{entry.tag}</span></div>{entry.strong && <strong>{entry.strong}{entry.date && <i>{entry.date}</i>}</strong>}{entry.paragraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}</article>)}</section>)}<section className="resume-section"><h2>{content.skillsTitle}</h2><div className="resume-skills-copy">{content.skills.map(([label, value]: [string, string]) => <p key={label}><strong>{label}</strong> {value}</p>)}</div></section></section>; }

export function ContactPage() { return <SiteShell activePath="/contact"><ContactContent /></SiteShell>; }
function ContactContent() { const { dictionary } = useLanguage(); const content = (dictionary as any).contact; const actions = (dictionary as any).actions; return <section className="contact-page"><div className="contact-content"><h1>{content.title}</h1><p>{content.description}</p><a className="contact-email" href="mailto:ruichil1030@gmail.com">ruichil1030@gmail.com</a><a className="contact-phone" href={content.phoneHref}>{content.phone}</a><div className="contact-meta"><a href="mailto:ruichil1030@gmail.com" aria-label={actions.email}>✉</a><a href="https://www.linkedin.com/in/ruichi-li-9903372b1/" target="_blank" rel="noreferrer" aria-label={actions.linkedin}>in</a></div></div></section>; }
