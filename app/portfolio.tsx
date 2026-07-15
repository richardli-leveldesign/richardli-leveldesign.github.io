import Link from "next/link";
import type { ReactNode } from "react";
import { MobileHeader } from "./mobile-header";
import { BlackSiteGallery, KillTheMakersGallery } from "./black-site-gallery";

export const projects = [
  {
    slug: "hamsterballin",
    number: "01",
    title: "Hamsterballin’",
    engine: "Unreal Engine 5",
    role: "Level Designer",
    subtitle: "Roulette Runway · Tunnel owner",
    image:
      "https://images.squarespace-cdn.com/content/v1/6a414942f5d99e4efb38d03f/c5b05051-f547-44f9-a913-0e437a223893/hamsterballin11.png?format=1000w",
    description:
      "A high-speed racing level built around readable risk, visual momentum, and confident player flow.",
  },
  {
    slug: "firefly",
    number: "02",
    title: "Starfield: Firefly",
    engine: "Creation Kit",
    role: "Level Designer",
    subtitle: "Modular medical lab",
    image:
      "https://images.squarespace-cdn.com/content/v1/6a414942f5d99e4efb38d03f/1f3ecdd8-9c18-4e34-a1ac-df43a87c85c3/%E5%B7%B2%E7%94%9F%E6%88%90%E5%9B%BE%E5%83%8F+1.png?format=1000w",
    description:
      "A circular combat space that guides exploration through story, light, and deliberate encounter rhythm.",
  },
  {
    slug: "blacksite",
    number: "03",
    title: "Half-Life 2: Black Site",
    engine: "Hammer",
    role: "Level Designer",
    subtitle: "Lock-and-key progression",
    image:
      "https://images.squarespace-cdn.com/content/v1/6a414942f5d99e4efb38d03f/292e3098-f9bc-4539-a5a8-60efb704bc50/%E5%B7%B2%E7%94%9F%E6%88%90%E5%9B%BE%E5%83%8F+1+%282%29.png?format=1000w",
    description:
      "A tightly paced security facility where routing, backtracking, and tactical pressure work as one system.",
  },
  {
    slug: "kill-the-makers",
    number: "04",
    title: "Kill the Makers",
    engine: "Unity",
    role: "Game, Level & Audio Designer",
    subtitle: "2D puzzle-platformer",
    image:
      "https://images.squarespace-cdn.com/content/v1/6a414942f5d99e4efb38d03f/075beb49-c28f-4286-befa-6a8c11191fb2/%E5%B7%B2%E7%94%9F%E6%88%90%E5%9B%BE%E5%83%8F+1+%281%29.png?format=1000w",
    description:
      "A puzzle-platformer that teaches its rules through spatial composition, sound cues, and iteration.",
  },
  {
    slug: "pit-stop",
    number: "05",
    title: "Half-Life 2: Pit Stop",
    engine: "Hammer",
    role: "Level Designer",
    subtitle: "Encounter design",
    image:
      "https://images.squarespace-cdn.com/content/v1/6a414942f5d99e4efb38d03f/71b4cc97-458a-4a6c-a80d-43c4550e7c69/%E5%B7%B2%E7%94%9F%E6%88%90%E5%9B%BE%E5%83%8F+1+%283%29.png?format=1000w",
    description:
      "A compact action level focused on encounter staging, readable cover, and purposeful movement.",
    underConstruction: true,
  },
];

export function SiteShell({ children, activePath = "/" }: { children: ReactNode; activePath?: string }) {
  const active = (path: string) => activePath === path ? "active" : "";
  const projectsActive = activePath === "/projects" ? "active" : "";
  const mobileProjects = projects.filter((project) => !project.underConstruction).map(({ slug, title, number }) => ({ slug, title, number }));
  return (
    <div className="site-shell">
      <header className="site-header desktop-header">
        <nav className="main-nav" aria-label="Primary navigation">
          <Link className={active("/")} href="/">Home</Link>
          <div className="project-nav">
            <span className={`project-trigger ${projectsActive}`}>Projects <span>+</span></span>
            <div className="project-menu">
              {projects.filter((project) => !project.underConstruction).map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <small>{project.number}</small>{project.title}
                </Link>
              ))}
            </div>
          </div>
          <Link className={active("/about")} href="/about">About</Link>
          <Link className={active("/resume")} href="/resume">Resume</Link>
          <Link className={active("/contact")} href="/contact">Contact</Link>
        </nav>
        <Link className="brand" href="/" aria-label="Ruichi Li home"><span>RUICHI LI</span></Link>
        <div className="header-socials" aria-label="Contact links">
          <a href="mailto:ruichil1030@gmail.com" aria-label="Email Ruichi Li">✉</a>
          <a href="https://www.linkedin.com/in/ruichi-li-9903372b1/" target="_blank" rel="noreferrer" aria-label="Ruichi Li on LinkedIn">in</a>
        </div>
      </header>
      <MobileHeader activePath={activePath} projects={mobileProjects} />
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-links"><Link href="/">Home Page</Link><Link href="/contact">Contact</Link><Link href="/about">About Me</Link></div>
      </footer>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const card = (
    <>
      <img src={project.image} alt={`${project.title} project cover`} />
      <div className="project-card-shade" />
      {project.underConstruction && <div className="construction-label">UNDER CONSTRUCTION</div>}
      <div className="project-top"><span>{project.number}</span><span>{project.engine}</span></div>
      <div className="project-bottom"><p>{project.role}</p><h3>{project.title}</h3>{!project.underConstruction && <span className="card-arrow">↗</span>}</div>
    </>
  );
  return project.underConstruction ? <div className="project-card project-card-disabled">{card}</div> : <Link className="project-card" href={`/projects/${project.slug}`}>{card}</Link>;
}

export function HomePage() {
  return (
    <SiteShell activePath="/">
      <section className="home-intro"><p className="eyebrow">LEVEL DESIGNER &amp; GAMEPLAY DESIGNER</p></section>
      <section className="work-section" id="work">
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      </section>
    </SiteShell>
  );
}

export function ProjectsPage() {
  return <SiteShell activePath="/projects"><section className="page-intro"><span className="eyebrow">PROJECT INDEX / 05</span><h1>Playable spaces,<br /><em>built with intent.</em></h1><p>Level and gameplay work across racing, action, exploration, and puzzle-platforming.</p></section><section className="project-index">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</section></SiteShell>;
}

export function ProjectPage({ project }: { project: (typeof projects)[number] }) {
  if (project.slug === "blacksite") return <BlackSitePage project={project} />;
  if (project.slug === "kill-the-makers") return <KillTheMakersPage project={project} />;
  return <SiteShell activePath="/projects"><section className="project-hero blacksite-hero"><img src={project.image} alt={`${project.title} project cover`} /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">{project.number} / {project.engine}</span><h1>{project.title}</h1></div></section><div className="blacksite-page generic-project-page">
    <section className="blacksite-overview"><div className="generic-about-placeholder"><span className="eyebrow">ABOUT</span><div className="blacksite-empty" /></div><dl><div><dt>POSITIONS</dt><dd /></div><div><dt>ENGINE</dt><dd /></div><div><dt>PLATFORM</dt><dd /></div><div><dt>DEVELOPMENT</dt><dd /></div></dl></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">DESCRIPTION</span></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">DESIGN GOALS</span></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">DESIGN DETAILS</span></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">POSTMORTEM</span></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span>{project.slug === "kill-the-makers" ? <KillTheMakersGallery /> : null}</section>
  </div></SiteShell>;
}

function KillTheMakersPage({ project }: { project: (typeof projects)[number] }) {
  return <SiteShell activePath="/projects"><section className="project-hero blacksite-hero"><img src={project.image} alt="Kill the Makers project cover" /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">04 / UNITY</span><h1>Kill the Makers</h1><p>A 2D puzzle-platformer about movement, combat, resource management, and mastering environmental interactions.</p></div></section><div className="blacksite-page kill-makers-page">
    <section className="blacksite-overview"><div className="blacksite-about-media"><img className="blacksite-about-video" src={project.image} alt="Kill the Makers gameplay artwork" /></div><dl><div><dt>POSITIONS</dt><dd>Level Designer<br />Game Designer<br />Audio Designer</dd></div><div><dt>ENGINE</dt><dd>Unity</dd></div><div><dt>PLATFORM</dt><dd>PC</dd></div><div><dt>DEVELOPMENT</dt><dd>4 developers<br />3 months<br />Finished December 2025</dd></div></dl></section>
    <section className="blacksite-section"><span className="eyebrow">DESCRIPTION</span><p className="blacksite-lead">Play as Skidmark the robot and escape from the evil lab.</p><p>As you proceed through the levels, you need to kill the scientists and guards to regain your energy lost over time. With a precise hit of a switch, you decide whether a laser gate is an impassable barrier or your next steppingstone.</p></section>
    <section className="blacksite-section"><span className="eyebrow">DESIGN GOALS</span><div className="blacksite-goals"><article><span>01</span><h3>Progressive Tutorialization</h3><p>Gradually introduce jumping, double jumping, dashing, and combat so players can learn each mechanic clearly before using them together in more challenging situations.</p></article><article><span>02</span><h3>Combat &amp; Resource Management</h3><p>Teach players that combat is connected to survival by introducing enemies with different levels of aggression and showing that defeating enemies allows players to recover lost energy.</p></article><article><span>03</span><h3>Environmental Interaction &amp; Mastery</h3><p>Introduce switches, laser gates, and environmental hazards through clear visual communication, then progressively combine these elements to build a sense of mastery.</p></article></div></section>
    <section className="blacksite-section kill-makers-details"><span className="eyebrow">DESIGN DETAILS</span><div className="blacksite-detail-copy"><h3>Level 1</h3><p>In the first level of the game, I follow Nintendo&apos;s 4-step level design philosophy: Introduction, Development, Twist, and Conclusion.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image1.jpeg" alt="Kill the Makers Level 1 introduction" /><p>First, I placed the camera center-left of the main character to lead the player&apos;s movement. I also designed a small stair to encourage the player to press A and jump onto it.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image2.jpeg" alt="Kill the Makers Level 1 movement tutorial" /><p>The first enemy is the Scientist. Scientists run away when the player approaches, but they cannot harm the player. This creates a safe target for teaching how to defeat enemies and recharge the battery. I used a wall to stop the enemy from running away and make it easier for the player to kill it.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image3.jpeg" alt="Kill the Makers Scientist encounter" /><p>After players become familiar with the normal jump, I introduce the double jump to make learning feel more rewarding and give them a sense of progress.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image4.jpeg" alt="Kill the Makers double jump tutorial" /><p>This is the first time acid is introduced. It is relatively safe because the gap only requires one jump to cross, while the double jump gives players enough distance to recover if needed.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image5.jpeg" alt="Kill the Makers acid hazard" /><p>At the end of the level, I teach the dash. The final gap combines basic movement, double jump, and dash as a test of the player&apos;s skills.</p><h3>Level 2</h3><p>In the second level, I introduce a new interaction and a new enemy.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image6.jpeg" alt="Kill the Makers Level 2 introduction" /><p>At the beginning of the level, I teach players how to interact with switches. To communicate the goal, I place a sign on the wall and position the switch directly in front of the gate. In the following section, players gradually master how to use switches.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image7.jpeg" alt="Kill the Makers switch and laser gate" /><p>This level also introduces a more aggressive enemy. The Guard chases and attacks the player, causing them to lose energy. This reinforces the skill of defeating enemies while adding pressure to the resource-management loop.</p></div></section>
    <section className="blacksite-section blacksite-postmortem"><span className="eyebrow">POSTMORTEM</span><div className="postmortem-grid"><article><h3>What Went Well</h3><ul><li>Teamwork was strong. After brief conversations, everyone understood what they needed to do next.</li><li>The outcome was successful from both gameplay and art perspectives, and players enjoyed the game.</li><li>Playtesting after every sprint helped the team identify what to change and how to improve.</li></ul></article><article><h3>What Went Wrong</h3><ul><li>File management became disorganized during the later stages of development because of time pressure.</li><li>Time management was inconsistent: some tasks were underestimated while others were overestimated.</li><li>The Scrum board did not always include every necessary task, which caused critical work to be missed.</li></ul></article><article><h3>What I Learned</h3><ul><li>How to communicate effectively with artists, programmers, and other level designers on a small team.</li><li>How to turn level-design knowledge into playable spaces through practice and iteration.</li><li>How to evaluate tester feedback by understanding the reason behind advice before applying it.</li></ul></article></div></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span><KillTheMakersGallery /></section>
  </div></SiteShell>;
}

function BlackSitePage({ project }: { project: (typeof projects)[number] }) {
  return <SiteShell activePath="/projects"><section className="project-hero blacksite-hero"><img src={project.image} alt="Half-Life 2: Black Site" /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">03 / HAMMER</span><h1>Half-Life 2:<br className="blacksite-mobile-break" /> Black Site</h1><p>A single-player escape level focused on cover-based combat, environmental puzzles, and a gradual transition from the Citadel to City 17.</p></div></section><div className="blacksite-page">
    <section className="blacksite-overview"><div className="blacksite-about-media"><video className="blacksite-about-video" controls playsInline preload="metadata" poster="/LiR_HL2_DesignGoals-poster.jpg"><source src="/LiR_HL2_DesignGoals.mp4" type="video/mp4" />Your browser does not support the video player.</video></div><dl><div><dt>POSITIONS</dt><dd>Level Designer<br />Puzzle Designer<br />Combat Designer</dd></div><div><dt>ENGINE</dt><dd>Hammer</dd></div><div><dt>PLATFORM</dt><dd>PC</dd></div><div><dt>DEVELOPMENT</dt><dd>2 months<br />Finished December 2025</dd></div></dl></section>
    <section className="blacksite-section"><span className="eyebrow">DESCRIPTION</span><p className="blacksite-lead">Half-Life 2: Black Site is a single-player escape level set between <em>Direct Intervention</em> and <em>Lowlife</em> in Half-Life 2: Episode One.</p><p>Captured by the Combine after the Citadel train accident, Gordon Freeman and Alyx Vance must escape a hidden facility by fighting through Combine forces and solving battery-based environmental puzzles. The level focuses on cover-based combat, progressive puzzle teaching, resource management, and a gradual visual transition from Citadel architecture to the streets of City 17.</p></section>
    <section className="blacksite-section"><span className="eyebrow">DESIGN GOALS</span><div className="blacksite-goals"><article><span>01</span><h3>Combat Design</h3><p>Create balanced combat encounters through cover placement, enemy composition, and resource distribution. Combat intensity increases gradually while giving players multiple strategic options.</p></article><article><span>02</span><h3>Puzzle Progression</h3><p>Introduce the battery and one-way fence mechanics through clear, step-by-step teaching, then reinforce learning through repetition, variation, and combination.</p></article><article><span>03</span><h3>Narrative &amp; Environment</h3><p>Guide the player through an escape narrative while using level progression to create direction and accomplishment. The visual style transitions from the industrial Citadel to City 17.</p></article></div></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">DESIGN DETAILS</span></section>
    <section className="blacksite-section blacksite-postmortem"><span className="eyebrow">POSTMORTEM</span><div className="postmortem-grid"><article><h3>What went well</h3><ul><li>Milestones were completed on time and maintained a high level of quality.</li><li>Feedback from C34 students led to useful iterations and improvements.</li><li>The cover-based combat was fun, readable, and balanced.</li></ul></article><article><h3>What went wrong</h3><ul><li>The 3D skybox was locked in an early phase and became difficult to revise.</li><li>Alyx occasionally lost track of the player and stopped moving.</li></ul></article><article><h3>What I would improve</h3><ul><li>Build a more robust companion-following system.</li><li>Improve the battery slot before the prison gate.</li><li>Rebuild the 3D skybox with stronger visual composition.</li><li>Fix minor potential soft-lock situations.</li></ul></article></div></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span><BlackSiteGallery /></section>
  </div></SiteShell>;
}

export function AboutPage() {
  return <SiteShell activePath="/about"><section className="page-intro about-intro"><span className="eyebrow">ABOUT / RUICHI LI</span><h1>I design the <em>feeling</em><br />of finding your way.</h1><p>Level Designer and Master of Interactive Technology candidate at SMU Guildhall, building environments where clear play and strong atmosphere reinforce each other.</p></section><section className="bio-grid"><div className="bio-panel"><span className="eyebrow">CURRENTLY</span><h2>Studying Level Design at SMU Guildhall.</h2><p>Expected graduation: May 2027</p></div><div className="bio-panel muted"><span className="eyebrow">BACKGROUND</span><h2>From Jiangsu, China to Dallas, Texas.</h2><p>Bachelor of Internet of Things, Hohai University · June 2024</p></div></section><section className="toolkit"><span className="eyebrow">TOOLKIT</span><div><h2>Unreal Engine 5 · Unity · Hammer · Creation Kit</h2><p>Whitebox-to-shipped pipelines, player flow, encounter pacing, environmental storytelling, Perforce, Jira, C#, C++, Python, 3ds Max, Illustrator.</p></div></section></SiteShell>;
}

export function ResumePage() {
  return <SiteShell activePath="/resume"><section className="resume-page">
    <header className="resume-header"><div className="resume-identity"><img src="/pfp2.png" alt="Ruichi Li" /><div className="resume-name"><h1>Ruichi Li</h1></div><a className="resume-download" href="/Ruichi-Li-Resume.pdf" download>Download Resume PDF <span>↓</span></a></div><p>Level Designer</p><p>Dallas, TX | 872-377-8884 | <a href="mailto:ruichil1030@gmail.com">ruichil1030@gmail.com</a> | <a href="https://www.linkedin.com/in/ruichi-li-9903372b1/" target="_blank" rel="noreferrer">LinkedIn</a></p></header>
    <section className="resume-section"><h2>SHIPPED TITLES</h2><article className="resume-entry"><div className="resume-entry-title"><h3>Hamsterballin&apos;</h3><span>Unreal Engine 5</span></div><strong>Level Designer <i>February 2026 - May 2026</i></strong><p>Level Designer, specifically owning the Tunnel in Roulette Runway.</p><p>Strategically placed and balanced all level pickups and interactive hazards, utilizing item placement to naturally guide player sightlines, reward high-risk maneuvers, and control the pacing of the race.</p><p>Executed rapid level iterations by analyzing playtest telemetry and user feedback. Collaborated within a cross-disciplinary team of artists and programmers under the Guildhall Development Methodology, utilizing Perforce (P4V) for asset pipeline management and Jira to track sprints and meet tight milestones.</p></article></section>
    <section className="resume-section"><h2>PROJECTS</h2><article className="resume-entry"><div className="resume-entry-title"><h3>Kill the Makers</h3><span>Unity</span></div><strong>Game Designer, Level Designer specifically owning Levels 1, 2 and 3, Audio Designer.</strong><p>Architected 2D puzzle-platformer layouts, strategically placing hazards and platforms to onboard players and teach core mechanics; integrated custom SFX via Adobe Audition to provide critical audio feedback for puzzles.</p><p>Collaborated to rapidly iterate on physics and jump metrics, utilizing playtest data to fine-tune character controls, platform spacing, and difficulty curves.</p></article><article className="resume-entry"><div className="resume-entry-title"><h3>Starfield custom level: Firefly</h3><span>Starfield: Creation Kit</span></div><p>Architected a modular medical lab environment within the Starfield Creation Kit, applying advanced 3D layout techniques to establish a circular combat flow and optimize player navigation.</p><p>Programmed scripted events, NPC behaviors, and narrative terminal entries, leveraging the engine&apos;s internal quest logic to deliver seamless environmental storytelling and immersive world-building.</p></article><article className="resume-entry"><div className="resume-entry-title"><h3>Half-Life 2 custom level: Black Site</h3><span>Hammer</span></div><p>Designed structured level routing and progression loops within the Hammer Editor, implementing lock-and-key gating puzzles that challenge players to navigate, backtrack, and unlock restricted sectors.</p><p>Programmed robust mission logic and encounter sequencing using Hammer&apos;s I/O entity system, scripting custom triggers, door/gate interactions, and Combine AI tactical spawns to match original pacing standards.</p></article></section>
    <section className="resume-section"><h2>EDUCATION</h2><article className="resume-entry"><div className="resume-entry-title"><h3>SMU Guildhall</h3><span>Dallas, TX</span></div><strong>Master of Interactive Technology, Specialization in Level Design</strong><p>Expected May 2027</p></article><article className="resume-entry"><div className="resume-entry-title"><h3>Hohai University</h3><span>Jiangsu, China</span></div><strong>Bachelor of Internet of Things</strong><p>June 2024</p></article></section>
    <section className="resume-section"><h2>SKILLS</h2><div className="resume-skills-copy"><p><strong>Software &amp; Engines:</strong> Unreal Engine 5, Starfield: Creation Kit, Source Engine: Hammer, Unity</p><p><strong>Methodologies &amp; Concepts:</strong> Whitebox-to-Shipped Level Pipeline, Spatial Composition &amp; Sightlines, Environmental Storytelling, Pacing &amp; Combat Encounters, Player Flow Design</p><p><strong>Languages &amp; Tools:</strong> C, C++, C#, Java, Python, 3dsMax, Illustrator, Miro, Canva, Perforce, Jira</p><p><strong>Professional:</strong> Native in Mandarin, Professionally Fluent in English, Rapid Prototyping &amp; Iteration, Avid player of tactical shooters and racing games</p></div></section>
  </section></SiteShell>;
}

export function ContactPage() {
  return <SiteShell activePath="/contact"><section className="contact-page"><div className="contact-content"><h1>Get in Touch!</h1><p>I’m always open to discussing new opportunities, creative projects, or interesting ideas. Feel free to use the form or connect with me on social media.</p><a className="contact-email" href="mailto:ruichil1030@gmail.com">ruichil1030@gmail.com</a><a className="contact-phone" href="tel:+18723778884">(872) 377-8884</a><div className="contact-meta"><a href="mailto:ruichil1030@gmail.com" aria-label="Email Ruichi Li">✉</a><a href="https://www.linkedin.com/in/ruichi-li-9903372b1/" target="_blank" rel="noreferrer" aria-label="Ruichi Li on LinkedIn">in</a></div></div></section></SiteShell>;
}
