import { useMemo, useState } from "react";
import {
  ArrowUpRight, BookOpen, BriefcaseBusiness, ChartNoAxesCombined, Check,
  ChevronRight, Compass, GraduationCap, LayoutDashboard, Lightbulb,
  Menu, Search, Sparkles, Target, TrendingUp, X
} from "lucide-react";

type Career = { title: string; category: string; description: string; skills: string[]; fit: number; color: string };

const careers: Career[] = [
  { title: "Python Developer", category: "Software engineering", description: "Build backend services, APIs and automation using Python.", skills: ["Python", "SQL", "REST APIs", "Git"], fit: 92, color: "violet" },
  { title: "Data Analyst", category: "Data & analytics", description: "Turn business data into clear insights and useful reports.", skills: ["SQL", "Excel", "Power BI", "Statistics"], fit: 86, color: "blue" },
  { title: "Frontend Developer", category: "Software engineering", description: "Create accessible, responsive interfaces for web products.", skills: ["HTML", "CSS", "JavaScript", "React"], fit: 78, color: "amber" }
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Explore careers", icon: Compass },
  { label: "Skill roadmap", icon: Target },
  { label: "Learning library", icon: BookOpen }
];

function App() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("Python Developer");
  const filtered = useMemo(() => careers.filter((career) =>
    (career.title + career.category + career.skills.join(" ")).toLowerCase().includes(query.toLowerCase())
  ), [query]);
  const current = careers.find((career) => career.title === selected) ?? careers[0];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><span className="brand-mark"><Compass size={21}/></span><span>career<span className="brand-accent">compass</span><small>CAREER INTELLIGENCE</small></span><button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X/></button></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>{navigation.map(({label, icon: Icon}) => <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => {setActive(label); setMenuOpen(false);}}><Icon size={18}/>{label}{label === "Skill roadmap" && <span className="nav-dot"/>}</button>)}</nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Lightbulb size={18}/></div><strong>Not sure where to start?</strong><p>Explore career paths that match your interests.</p><button onClick={() => setActive("Explore careers")}>Explore paths <ArrowUpRight size={14}/></button></div><div className="profile"><div className="avatar">S</div><div><strong>Student workspace</strong><span>Career explorer</span></div><span className="online-dot"/></div></div>
      </aside>

      {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation"/>}
      <main className="main-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/> <strong>{active}</strong></div><div className="top-actions"><span className="status-pill"><span/> Career discovery</span><div className="avatar top-avatar">S</div></div></header>
        <div className="content">
          <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR NEXT CHAPTER STARTS HERE</div><h1>Find a career that <span>fits your potential.</span></h1><p className="welcome-copy">Explore possibilities, understand the skills that matter, and turn your goals into a practical plan.</p></div><div className="welcome-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-core"><Compass size={36}/></div><span className="art-star star-one">✳</span><span className="art-star star-two">✦</span></div></section>

          <section className="stats-grid">
            <article className="stat-card"><div className="stat-top"><span>Career paths to explore</span><span className="stat-icon purple"><BriefcaseBusiness size={18}/></span></div><strong>12<span>+</span></strong><small>Across growing industries</small></article>
            <article className="stat-card"><div className="stat-top"><span>Skills to build</span><span className="stat-icon cyan"><GraduationCap size={18}/></span></div><strong>24</strong><small>Practical learning topics</small></article>
            <article className="stat-card"><div className="stat-top"><span>Your planning progress</span><span className="stat-icon green"><TrendingUp size={18}/></span></div><strong>01 <em>step</em></strong><small>Start with career discovery</small></article>
          </section>

          <section className="section-heading"><div><div className="eyebrow">A PLACE TO BEGIN</div><h2>Explore career directions</h2><p>Sample career paths to help you get started. These are illustrative, not personal predictions.</p></div><div className="search-box"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles or skills..."/></div></section>
          <section className="career-grid">{filtered.map((career) => <article className="career-card" key={career.title}><div className="career-card-top"><span className={`career-symbol ${career.color}`}><BriefcaseBusiness size={19}/></span><span className="match-label">SAMPLE PATH</span></div><div className="career-category">{career.category}</div><h3>{career.title}</h3><p>{career.description}</p><div className="skill-list">{career.skills.map(skill => <span key={skill}>{skill}</span>)}</div><button className="card-link" onClick={() => {setSelected(career.title); setActive("Skill roadmap");}}>View skill roadmap <ArrowUpRight size={16}/></button></article>)}
            {filtered.length === 0 && <div className="empty-state">No sample paths match “{query}”. Try another role or skill.</div>}
          </section>

          <section className="bottom-grid"><article className="roadmap-panel"><div className="panel-heading"><div><div className="eyebrow">YOUR NEXT MOVE</div><h2>Build your learning roadmap</h2></div><span className="panel-icon"><Target size={20}/></span></div><p>Choose a career direction to see the foundational skills you can work on next.</p><div className="roadmap-select"><label htmlFor="career-select">Career direction</label><select id="career-select" value={selected} onChange={event => setSelected(event.target.value)}>{careers.map(c => <option key={c.title}>{c.title}</option>)}</select></div><div className="roadmap-skill"><span className="step-number">01</span><div><strong>Strengthen the foundations</strong><small>{current.skills.slice(0,2).join(" · ")}</small></div><span className="step-state"><Check size={14}/></span></div><div className="roadmap-skill"><span className="step-number">02</span><div><strong>Practice with a small project</strong><small>Build and document one practical project</small></div><ChevronRight size={17}/></div><div className="roadmap-skill"><span className="step-number">03</span><div><strong>Showcase your work</strong><small>Publish your project and explain your decisions</small></div><ChevronRight size={17}/></div></article>
            <article className="insight-panel"><div className="insight-glow"/><div className="eyebrow"><Sparkles size={13}/> A BETTER WAY FORWARD</div><h2>Your career is a journey, not a single prediction.</h2><p>Use career suggestions as a starting point. Your interests, experience, and willingness to learn matter just as much.</p><div className="insight-footer"><span><ChartNoAxesCombined size={16}/> Explore. Learn. Grow.</span><ArrowUpRight size={19}/></div></article></section>
          <footer>CareerCompass AI <span>·</span> Career guidance for exploration and learning <span className="footer-right">Recommendations are educational guidance, not guarantees.</span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;
