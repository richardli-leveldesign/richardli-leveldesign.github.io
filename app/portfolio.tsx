import Link from "next/link";
import type { ReactNode } from "react";
import { MobileHeader } from "./mobile-header";
import { BlackSiteGallery, FireflyGallery, HamsterballinGallery, KillTheMakersGallery } from "./black-site-gallery";

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
  const visibleProjects = projects.filter((project) => !project.underConstruction).map(({ slug, title, number }) => ({ slug, title, number }));
  const projectGroups = [
    { label: "Team Projects", projects: visibleProjects.filter((project) => project.slug === "kill-the-makers" || project.slug === "hamsterballin") },
    { label: "Individual Projects", projects: visibleProjects.filter((project) => project.slug === "firefly" || project.slug === "blacksite") },
  ];
  const groupActive = (group: (typeof projectGroups)[number]) => group.projects.some((project) => activePath === `/projects/${project.slug}`) ? "active" : "";
  return (
    <div className="site-shell">
      <header className="site-header desktop-header">
        <nav className="main-nav" aria-label="Primary navigation">
          <Link className={active("/")} href="/">Home</Link>
          {projectGroups.map((group) => <div className="project-nav" key={group.label}>
            <span className={`project-trigger ${groupActive(group)}`}>{group.label}</span>
            <div className="project-menu">{group.projects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`}><small>{project.number}</small>{project.title}</Link>)}</div>
          </div>)}
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
      <MobileHeader activePath={activePath} projectGroups={projectGroups} />
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
  if (project.slug === "hamsterballin") return <HamsterballinPage project={project} />;
  if (project.slug === "firefly") return <FireflyPage project={project} />;
  return <SiteShell activePath={`/projects/${project.slug}`}><section className="project-hero blacksite-hero"><img src={project.image} alt={`${project.title} project cover`} /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">{project.number} / {project.engine}</span><h1>{project.title}</h1></div></section><div className="blacksite-page generic-project-page">
    <section className="blacksite-overview"><div className="generic-about-placeholder"><span className="eyebrow">ABOUT</span><div className="blacksite-empty" /></div><dl><div><dt>POSITIONS</dt><dd /></div><div><dt>ENGINE</dt><dd /></div><div><dt>PLATFORM</dt><dd /></div><div><dt>DEVELOPMENT</dt><dd /></div></dl></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">DESCRIPTION</span></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">DESIGN GOALS</span></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">DESIGN DETAILS</span></section>
    <section className="blacksite-section blacksite-empty"><span className="eyebrow">POSTMORTEM</span></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span>{project.slug === "kill-the-makers" ? <KillTheMakersGallery /> : null}</section>
  </div></SiteShell>;
}

function FireflyPage({ project }: { project: (typeof projects)[number] }) {
  return <SiteShell activePath={`/projects/${project.slug}`}><section className="project-hero blacksite-hero"><img src={project.image} alt="Starfield: Firefly" /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">02 / CREATION KIT</span><h1>Starfield: Firefly</h1><p>A standalone Starfield quest where a delivery mission becomes a rescue operation inside a hospital under attack.</p></div></section><div className="blacksite-page firefly-page">
    <section className="blacksite-overview"><div className="blacksite-about-media"><img className="blacksite-about-video" src="/firefly-video-placeholder.png" alt="Starfield: Firefly video placeholder" /></div><dl><div><dt>POSITIONS</dt><dd>Level Designer<br />Narrative Designer</dd></div><div><dt>ENGINE</dt><dd>Starfield: Creation Kit</dd></div><div><dt>PLATFORM</dt><dd>PC</dd></div><div><dt>DEVELOPMENT</dt><dd>250+ hours<br />Finished May 2026</dd></div></dl></section>
    <section className="blacksite-section"><span className="eyebrow">DESCRIPTION</span><p className="blacksite-lead"><em>Firefly</em> is a standalone single-player quest for Starfield, designed for players around levels 13–17.</p><p>What begins as a delivery mission to Doctor Anderson quickly turns into a rescue mission when the hospital comes under attack. After securing the lab, players uncover the truth behind the experiments and must choose between sacrificing lives for a potential cure or shutting the project down.</p><p>The quest blends combat and storytelling across six combat zones, from an outdoor plaza to an indoor medical lab. Guided by the concept of circular flow, the level encourages players to adapt their tactics while narrative moments provide pacing and deepen immersion.</p></section>
    <section className="blacksite-section"><span className="eyebrow">DESIGN GOALS</span><div className="blacksite-goals"><article><span>01</span><h3>Circular Combat Flow</h3><p>Design combat spaces with multiple routes and no dead ends, encouraging constant movement and giving players more tactical options.</p></article><article><span>02</span><h3>Landmark Design</h3><p>Use distinct visual landmarks to help players understand their location and navigate the level with less confusion.</p></article><article><span>03</span><h3>Hybrid Narrative</h3><p>Deliver the main story through quest dialogue while using terminals, notes, and scene composition to reward exploration and reveal additional story elements.</p></article></div></section>
    <section className="blacksite-section firefly-details"><span className="eyebrow">DESIGN DETAILS</span><div className="blacksite-detail-copy"><h3>Circular Combat Flow</h3><p>For the exterior, I used catwalks and high ground to divide the space into distinct functions: the main combat area, the main walkway, and an alternate path. I established the intended gameplay function for each space, then placed cover to support the utility of those zones.</p><img className="blacksite-detail-image" src="/firefly-details/image1.jpeg" alt="Firefly exterior combat flow diagram" /><p>I first created the catwalk, which separates the area into three parts: the paths on both sides and the central area. Because the middle was too wide, I divided it into two paths and then placed cover to fill the combat zone. To complete the circular flow, I added a secondary staircase at the rear of the catwalks and joined the catwalks in the center, eliminating dead ends and supporting continuous player movement.</p><p>For the interior, emphasizing verticality expanded traversal choices and introduced greater complexity to NPC pathing and AI behavior. Multiple staircases create a vertical loop between two levels, allowing players to retreat to high ground for a tactical advantage or drop down to flank.</p><img className="blacksite-detail-image" src="/firefly-details/image2.jpeg" alt="Firefly interior vertical combat flow" /><h3>Landmark Design</h3><p>In the exterior, I used soft visual guidance. The architectural skyline creates leading lines that draw the eye toward the main objective, ensuring that the mission-critical building remains the focal point of the environment.</p><img className="blacksite-detail-image" src="/firefly-details/image3.jpeg" alt="Firefly exterior landmark and leading lines" /><p>Inside the quest, I used the Center Hall as a landmark. It sits at the heart of the interior structure and players visit it multiple times, so I reinforced its visual identity with unique assets and a specialized color scheme.</p><img className="blacksite-detail-image" src="/firefly-details/image4.jpeg" alt="Firefly Center Hall landmark" /><h3>Hybrid Narrative</h3><p>I expanded the background through branching dialogue outside the main questline, clarifying the origins of the conflict and giving players deeper context.</p><img className="blacksite-detail-image" src="/firefly-details/image5.jpeg" alt="Firefly dialogue narrative detail" /><p>As the mission moves indoors, Doctor Anderson is the only character available for dialogue. I used terminals and data slates to offer alternative perspectives on the events, increasing the number of narrative beats throughout the level.</p><img className="blacksite-detail-image" src="/firefly-details/image6.jpeg" alt="Firefly environmental storytelling terminal" /></div></section>
    <section className="blacksite-section blacksite-postmortem"><span className="eyebrow">POSTMORTEM</span><div className="postmortem-grid"><article><h3>What Went Well</h3><ul><li>The level has a clear story structure and a plot twist that supports the overall player experience.</li><li>Feedback helped clarify how spatial layout affects combat. Circular combat flow made encounters more dynamic and engaging.</li><li>Sub-goals, clear sightlines, and early bottleneck identification created intuitive navigation and consistent player direction.</li></ul></article><article><h3>What Went Wrong</h3><ul><li>Limited experience with 3D spatial design and Starfield&apos;s metrics led to several large-scale layout revisions.</li><li>Repeated wall assets and color variations made the environment visually repetitive and weakened narrative support.</li><li>Too much time spent refining layout left insufficient time for NPC sandboxing, AI navigation, and overall polish.</li></ul></article><article><h3>What I Learned</h3><ul><li>How dialogue and environmental storytelling can create narrative beats and control pacing.</li><li>How feedback exposes major layout problems and improves sightlines, navigation, and player flow through iteration.</li><li>How to learn a new engine quickly through documentation, wikis, and AI tools.</li></ul></article></div></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span><FireflyGallery /></section>
  </div></SiteShell>;
}

function HamsterballinPage({ project }: { project: (typeof projects)[number] }) {
  return <SiteShell activePath={`/projects/${project.slug}`}><section className="project-hero blacksite-hero"><img src="/hamsterballin-hero.png" alt="Hamsterballin' project cover" /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">01 / UNREAL ENGINE 5</span><h1>Hamsterballin&apos;</h1><p>Roll and bounce around as a cute hamster racing through imaginative tracks in this competitive arcade racer.</p></div></section><div className="blacksite-page hamsterballin-page">
    <section className="blacksite-overview"><div className="blacksite-about-media"><video className="blacksite-about-video" controls playsInline preload="metadata" poster="/hamsterballin-trailer-poster.png"><source src="/hamsterballin-gameplay-trailer.mp4" type="video/mp4" />Your browser does not support the video player.</video></div><dl><div><dt>POSITIONS</dt><dd>Level Designer</dd></div><div><dt>ENGINE</dt><dd>Unreal Engine 5</dd></div><div><dt>PLATFORM</dt><dd>PC</dd></div><div><dt>DEVELOPMENT</dt><dd>42 developers<br />Finished May 2026<br />Launched TBD</dd></div></dl></section>
    <section className="blacksite-section"><span className="eyebrow">DESCRIPTION</span><p className="blacksite-lead">Roll and bounce around as a cute hamster racing through imaginative tracks in this competitive arcade racer!</p><p>Master the control of your hamsterball to disrupt other players and find new, creative shortcuts and paths.</p></section>
    <section className="blacksite-section"><span className="eyebrow">DESIGN GOALS</span><div className="blacksite-goals"><article><span>01</span><h3>Easy to Pick Up</h3><p>Use clear track layouts, readable lane transitions, and forgiving safety nets so players can quickly understand the movement system and feel comfortable experimenting with it.</p></article><article><span>02</span><h3>Fit the Gameplay</h3><p>Design the track around the game&apos;s fast-paced racing experience, using elevation changes, tilted surfaces, and tunnels to make movement feel dynamic while supporting the overall gameplay flow.</p></article><article><span>03</span><h3>Reward Skillful Play</h3><p>Provide multiple routes and opportunities for precise lane switching, allowing experienced players to maintain momentum, take risks, and gain an advantage through better timing and control.</p></article></div></section>
    <section className="blacksite-section hamsterballin-details"><span className="eyebrow">DESIGN DETAILS</span><div className="blacksite-detail-copy"><p>My initial idea was to let players switch lanes while running through the track, so I designed each lane at a different height.</p><img className="blacksite-detail-image" src="/hamsterballin-details/image1.png" alt="Hamsterballin' early multi-height lane design" /><p>However, during playtesting, I realized that switching lanes was too risky. Players often fell off the track, which discouraged them from experimenting with different routes.</p><p>To address this, I added a safety net beneath the track, allowing players to continue the race even after making a mistake.</p><img className="blacksite-detail-image" src="/hamsterballin-details/image2.png" alt="Hamsterballin' safety net iteration" /><p>Inspired by Counter-Strike&apos;s Surf mode, I further refined the track design by tilting the surface and transforming the platform beneath it into a tunnel. This made the movement feel more dynamic while fitting the game&apos;s overall theme better.</p><img className="blacksite-detail-image" src="/hamsterballin-details/image3.jpeg" alt="Hamsterballin' tilted tunnel design" /><p>After many rounds of refinement, here is the final result.</p><div className="hamsterballin-final-images"><img className="blacksite-detail-image" src="/hamsterballin-details/image4.png" alt="Hamsterballin' final track design" /><img className="blacksite-detail-image" src="/hamsterballin-details/image5.png" alt="Hamsterballin' final track gameplay view" /></div></div></section>
    <section className="blacksite-section blacksite-postmortem"><span className="eyebrow">POSTMORTEM</span><div className="postmortem-grid"><article><h3>What Went Well</h3><ul><li>The project developed through continuous iteration, with each playtest helping us improve the gameplay experience.</li><li>Early playtesting helped us identify major issues and make meaningful changes before finalizing the design.</li></ul></article><article><h3>What Went Wrong</h3><ul><li>Some mechanics were initially designed based on assumptions rather than enough player testing.</li><li>The project scope and time limitations made it difficult to polish every aspect of the game equally.</li></ul></article><article><h3>What I Learned</h3><ul><li>Playtesting should happen early and repeatedly throughout the development process.</li><li>Design decisions should be based on both creative goals and actual player behavior.</li></ul></article></div></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span><HamsterballinGallery /></section>
  </div></SiteShell>;
}

function KillTheMakersPage({ project }: { project: (typeof projects)[number] }) {
  return <SiteShell activePath={`/projects/${project.slug}`}><section className="project-hero blacksite-hero"><img src="/kill-the-makers-header-capsule.png" alt="Kill the Makers Header Capsule" /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">04 / UNITY</span><h1>Kill the Makers</h1><p>A 2D puzzle-platformer about movement, combat, resource management, and mastering environmental interactions.</p></div></section><div className="blacksite-page kill-makers-page">
    <section className="blacksite-overview"><div className="blacksite-about-media"><video className="blacksite-about-video" controls playsInline preload="metadata" poster="/kill-the-makers-main-capsule.png"><source src="/kill-the-makers-trailer.mp4" type="video/mp4" />Your browser does not support the video player.</video></div><dl><div><dt>POSITIONS</dt><dd>Level Designer<br />Game Designer<br />Audio Designer</dd></div><div><dt>ENGINE</dt><dd>Unity</dd></div><div><dt>PLATFORM</dt><dd>PC</dd></div><div><dt>DEVELOPMENT</dt><dd>4 developers<br />3 months<br />Finished December 2025</dd></div></dl></section>
    <section className="blacksite-section"><span className="eyebrow">DESCRIPTION</span><p className="blacksite-lead">Play as Skidmark the robot and escape from the evil lab.</p><p>As you proceed through the levels, you need to kill the scientists and guards to regain your energy lost over time. With a precise hit of a switch, you decide whether a laser gate is an impassable barrier or your next steppingstone.</p></section>
    <section className="blacksite-section"><span className="eyebrow">DESIGN GOALS</span><div className="blacksite-goals"><article><span>01</span><h3>Progressive Tutorialization</h3><p>Gradually introduce jumping, double jumping, dashing, and combat so players can learn each mechanic clearly before using them together in more challenging situations.</p></article><article><span>02</span><h3>Combat &amp; Resource Management</h3><p>Teach players that combat is connected to survival by introducing enemies with different levels of aggression and showing that defeating enemies allows players to recover lost energy.</p></article><article><span>03</span><h3>Environmental Interaction &amp; Mastery</h3><p>Introduce switches, laser gates, and environmental hazards through clear visual communication, then progressively combine these elements to build a sense of mastery.</p></article></div></section>
    <section className="blacksite-section kill-makers-details"><span className="eyebrow">DESIGN DETAILS</span><div className="blacksite-detail-copy"><h3>Level 1</h3><p>In the first level of the game, I follow Nintendo&apos;s 4-step level design philosophy: Introduction, Development, Twist, and Conclusion.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image1.jpeg" alt="Kill the Makers Level 1 introduction" /><p>First, I placed the camera center-left of the main character to lead the player&apos;s movement. I also designed a small stair to encourage the player to press A and jump onto it.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image2.jpeg" alt="Kill the Makers Level 1 movement tutorial" /><p>The first enemy is the Scientist. Scientists run away when the player approaches, but they cannot harm the player. This creates a safe target for teaching how to defeat enemies and recharge the battery. I used a wall to stop the enemy from running away and make it easier for the player to kill it.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image3.jpeg" alt="Kill the Makers Scientist encounter" /><p>After players become familiar with the normal jump, I introduce the double jump to make learning feel more rewarding and give them a sense of progress.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image4.jpeg" alt="Kill the Makers double jump tutorial" /><p>This is the first time acid is introduced. It is relatively safe because the gap only requires one jump to cross, while the double jump gives players enough distance to recover if needed.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image5.jpeg" alt="Kill the Makers acid hazard" /><p>At the end of the level, I teach the dash. The final gap combines basic movement, double jump, and dash as a test of the player&apos;s skills.</p><h3>Level 2</h3><p>In the second level, I introduce a new interaction and a new enemy.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image6.jpeg" alt="Kill the Makers Level 2 introduction" /><p>At the beginning of the level, I teach players how to interact with switches. To communicate the goal, I place a sign on the wall and position the switch directly in front of the gate. In the following section, players gradually master how to use switches.</p><img className="kill-makers-detail-image" src="/kill-the-makers-detail/image7.jpeg" alt="Kill the Makers switch and laser gate" /><p>This level also introduces a more aggressive enemy. The Guard chases and attacks the player, causing them to lose energy. This reinforces the skill of defeating enemies while adding pressure to the resource-management loop.</p></div></section>
    <section className="blacksite-section blacksite-postmortem"><span className="eyebrow">POSTMORTEM</span><div className="postmortem-grid"><article><h3>What Went Well</h3><ul><li>Teamwork was strong. After brief conversations, everyone understood what they needed to do next.</li><li>The outcome was successful from both gameplay and art perspectives, and players enjoyed the game.</li><li>Playtesting after every sprint helped the team identify what to change and how to improve.</li></ul></article><article><h3>What Went Wrong</h3><ul><li>File management became disorganized during the later stages of development because of time pressure.</li><li>Time management was inconsistent: some tasks were underestimated while others were overestimated.</li><li>The Scrum board did not always include every necessary task, which caused critical work to be missed.</li></ul></article><article><h3>What I Learned</h3><ul><li>How to communicate effectively with artists, programmers, and other level designers on a small team.</li><li>How to turn level-design knowledge into playable spaces through practice and iteration.</li><li>How to evaluate tester feedback by understanding the reason behind advice before applying it.</li></ul></article></div></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span><KillTheMakersGallery /></section>
  </div></SiteShell>;
}

function BlackSitePage({ project }: { project: (typeof projects)[number] }) {
  return <SiteShell activePath={`/projects/${project.slug}`}><section className="project-hero blacksite-hero"><img src={project.image} alt="Half-Life 2: Black Site" /><div className="project-hero-shade" /><div className="project-hero-copy"><span className="eyebrow">03 / HAMMER</span><h1>Half-Life 2:<br className="blacksite-mobile-break" /> Black Site</h1><p>A single-player escape level focused on cover-based combat, environmental puzzles, and a gradual transition from the Citadel to City 17.</p></div></section><div className="blacksite-page">
    <section className="blacksite-overview"><div className="blacksite-about-media"><video className="blacksite-about-video" controls playsInline preload="metadata" poster="/LiR_HL2_DesignGoals-poster.jpg"><source src="/LiR_HL2_DesignGoals.mp4" type="video/mp4" />Your browser does not support the video player.</video></div><dl><div><dt>POSITIONS</dt><dd>Level Designer<br />Puzzle Designer<br />Combat Designer</dd></div><div><dt>ENGINE</dt><dd>Hammer</dd></div><div><dt>PLATFORM</dt><dd>PC</dd></div><div><dt>DEVELOPMENT</dt><dd>2 months<br />Finished December 2025</dd></div></dl></section>
    <section className="blacksite-section"><span className="eyebrow">DESCRIPTION</span><p className="blacksite-lead">Half-Life 2: Black Site is a single-player escape level set between <em>Direct Intervention</em> and <em>Lowlife</em> in Half-Life 2: Episode One.</p><p>Captured by the Combine after the Citadel train accident, Gordon Freeman and Alyx Vance must escape a hidden facility by fighting through Combine forces and solving battery-based environmental puzzles. The level focuses on cover-based combat, progressive puzzle teaching, resource management, and a gradual visual transition from Citadel architecture to the streets of City 17.</p></section>
    <section className="blacksite-section"><span className="eyebrow">DESIGN GOALS</span><div className="blacksite-goals"><article><span>01</span><h3>Combat Design</h3><p>Create balanced combat encounters through cover placement, enemy composition, and resource distribution. Combat intensity increases gradually while giving players multiple strategic options.</p></article><article><span>02</span><h3>Puzzle Progression</h3><p>Introduce the battery and one-way fence mechanics through clear, step-by-step teaching, then reinforce learning through repetition, variation, and combination.</p></article><article><span>03</span><h3>Narrative &amp; Environment</h3><p>Guide the player through an escape narrative while using level progression to create direction and accomplishment. The visual style transitions from the industrial Citadel to City 17.</p></article></div></section>
    <section className="blacksite-section blacksite-details"><span className="eyebrow">DESIGN DETAILS</span><div className="blacksite-detail-copy"><h3>Good Combat Flow</h3><p><strong>Cover Placement:</strong> Covers in the level are carefully designed. Players can use these covers to break complicated combats into a series of one-on-one battles. This makes encounters easier for players to tackle and gives designers more control over the flow.</p><img className="blacksite-detail-image" src="/black-site-details/image1.jpeg" alt="Black Site combat encounter with cover placement" /><p><strong>Verticality Combat Design:</strong> Some combat encounters take place across different heights, giving players varied combat experiences and changing how they read the space.</p><img className="blacksite-detail-image" src="/black-site-details/image2.jpeg" alt="Black Site verticality combat encounter" /><h3>Battery Reuse Puzzle</h3><p><strong>Battery:</strong> Batteries are used to unlock doors. I put significant effort into the interaction between batteries and slots so that the action feels clear and satisfying.</p><img className="blacksite-detail-image" src="/black-site-details/image3.jpeg" alt="Black Site battery slot puzzle" /><p><strong>Expanding the Depth:</strong> Some windows can be opened from the other side, allowing players to reuse batteries from a previous room. These connections must be carefully designed so the puzzles remain fun to play without becoming breakable.</p><img className="blacksite-detail-image" src="/black-site-details/image4.jpeg" alt="Black Site battery reuse puzzle" /><h3>Lighting and Guideline Aid</h3><p><strong>Lighting:</strong> Important supplies and interactive items are highlighted. Lighting attracts the player&apos;s attention and helps them locate and collect what they need.</p><img className="blacksite-detail-image" src="/black-site-details/image5.jpeg" alt="Black Site lighting guidance" /><p><strong>Wires:</strong> All locked doors are connected to the battery slot and indicator lights with wires. This makes it easier for players to identify the correct unlock point.</p><img className="blacksite-detail-image" src="/black-site-details/image6.jpeg" alt="Black Site wires connecting a door to its battery slot" /><img className="blacksite-detail-image" src="/black-site-details/image7.jpeg" alt="Black Site locked door and battery indicator" /></div></section>
    <section className="blacksite-section blacksite-postmortem"><span className="eyebrow">POSTMORTEM</span><div className="postmortem-grid"><article><h3>What went well</h3><ul><li>Milestones were completed on time and maintained a high level of quality.</li><li>Feedback from C34 students led to useful iterations and improvements.</li><li>The cover-based combat was fun, readable, and balanced.</li></ul></article><article><h3>What went wrong</h3><ul><li>The 3D skybox was locked in an early phase and became difficult to revise.</li><li>Alyx occasionally lost track of the player and stopped moving.</li></ul></article><article><h3>What I would improve</h3><ul><li>Build a more robust companion-following system.</li><li>Improve the battery slot before the prison gate.</li><li>Rebuild the 3D skybox with stronger visual composition.</li><li>Fix minor potential soft-lock situations.</li></ul></article></div></section>
    <section className="blacksite-section blacksite-gallery-section"><span className="eyebrow">GALLERY</span><BlackSiteGallery /></section>
  </div></SiteShell>;
}

export function AboutPage() {
  return <SiteShell activePath="/about"><section className="about-custom-hero"><div><span className="eyebrow">ABOUT / RUICHI LI</span><h1>Hi! I&apos;m Ruichi Li.</h1></div><img src="/about-richard.jpg" alt="Ruichi Li in New York" /></section><section className="about-custom-story"><div className="about-custom-copy"><span className="eyebrow">A PLAYER AT HEART</span><p>I&apos;m currently studying at SMU Guildhall for a master&apos;s degree, specializing in Level Design. As a student who studies video games, I love playing games.</p><p>I like to play games on different devices, including arcade machines, VR, and especially all kinds of handhelds.</p><h2>Games are<br /><em>everywhere.</em></h2></div><figure><img src="/about-handhelds.jpg" alt="Ruichi Li&apos;s collection of handheld game devices" /><figcaption>Arcade, VR, and handhelds — every platform offers a different way to play.</figcaption></figure></section><section className="about-custom-interests"><article><span className="eyebrow">FORMULA 1 / RACING</span><h2>Forza<br /><em>Ferrari.</em></h2><p>I&apos;m a Formula 1 fan, and my favorite team is Ferrari. Forza Ferrari! I also love all kinds of racing games, from Need for Speed to Assetto Corsa. Actually, the first game in my life was Need for Speed: Hot Pursuit 2.</p></article><article><span className="eyebrow">ESPORTS</span><h2>Always<br /><em>watching.</em></h2><p>Esports is another major hobby of mine. I enjoy watching various esports tournaments, especially Counter-Strike and Valorant. I play both games myself, though my rank isn&apos;t particularly high.</p></article></section><section className="about-custom-close"><span className="eyebrow">THANKS FOR VISITING</span><p>If you are interested in me, please contact me via email. I would be happy to hear from you.</p><a className="text-link" href="mailto:ruichil1030@gmail.com">Get in touch <span>↗</span></a></section></SiteShell>;
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
