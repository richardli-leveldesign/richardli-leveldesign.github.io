"use client";

import Link from "next/link";
import { useState } from "react";

type ProjectLink = { slug: string; title: string; number: string };
type ProjectGroup = { label: string; projects: ProjectLink[] };

export function MobileHeader({ activePath, projectGroups }: { activePath: string; projectGroups: ProjectGroup[] }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const active = (path: string) => activePath === path ? "active" : "";
  const groupActive = (group: ProjectGroup) => group.projects.some((project) => activePath === `/projects/${project.slug}`) ? "active" : "";
  const close = () => { setOpen(false); setOpenGroup(null); };

  return (
    <header className={`mobile-header ${open ? "is-open" : ""}`}>
      <div className="mobile-header-bar">
        <Link className="mobile-brand" href="/" onClick={close}>Ruichi Li</Link>
        <button className="mobile-menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link className={active("/")} href="/" onClick={close}>Home</Link>
        {projectGroups.map((group) => <div className="mobile-projects" key={group.label}>
          <button className={`mobile-project-trigger ${groupActive(group)}`} type="button" onClick={() => setOpenGroup((current) => current === group.label ? null : group.label)} aria-expanded={openGroup === group.label}>{group.label} <span>+</span></button>
          {openGroup === group.label && <div className="mobile-project-menu">{group.projects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`} onClick={close}><small>{project.number}</small>{project.title}</Link>)}</div>}
        </div>)}
        <Link className={active("/about")} href="/about" onClick={close}>About</Link>
        <Link className={active("/resume")} href="/resume" onClick={close}>Resume</Link>
        <Link className={active("/contact")} href="/contact" onClick={close}>Contact</Link>
        <div className="mobile-socials"><a href="mailto:ruichil1030@gmail.com" onClick={close}>Email</a><a href="https://www.linkedin.com/in/ruichi-li-9903372b1/" target="_blank" rel="noreferrer">LinkedIn</a></div>
      </nav>}
    </header>
  );
}
