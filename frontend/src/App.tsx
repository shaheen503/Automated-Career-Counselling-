import { useMemo, useState } from "react";
import WorkspaceView from "./WorkspaceView";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Award, BookOpen,
  BriefcaseBusiness, Check, ChevronDown, ChevronRight, CircleHelp,
  Compass, FileText, GraduationCap, LayoutDashboard, Menu, MessageSquare,
  Search, Settings2, ShieldCheck, Sparkles, Target, TrendingUp, X, Globe2
} from "lucide-react";

const roles = ["Python Developer", "Data Analyst", "Frontend Developer", "Software Engineer"];
const skillRows = [
  { name: "Python & programming", value: 82, level: "Strong" },
  { name: "SQL & databases", value: 68, level: "Building" },
  { name: "Problem solving", value: 56, level: "Building" },
  { name: "Communication", value: 44, level: "Focus area" }
];
const navItems = [
  { label: "Command center", icon: LayoutDashboard },
  { label: "Career explorer", icon: Compass },
  { label: "Skill development", icon: Target },
  { label: "Interview studio", icon: MessageSquare },
  { label: "Resume workspace", icon: FileText }
];

function App() {
  const [active, setActive] = useState("Command center");
  const [role, setRole] = useState(roles[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const filteredNav = useMemo(
    () => navItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="career-app">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-symbol"><Compass size={21}/></div>
          <div className="brand-name">Career<span>Compass</span><small>CAREER INTELLIGENCE</small></div>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={18}/></button>
        </div>
        <div className="side-caption">YOUR WORKSPACE</div>
        <label className="side-search"><Search size={15}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a workspace"/></label>
        <nav className="side-nav">
          {filteredNav.map(({label, icon: Icon}) => (
            <button key={label} className={active === label ? "side-link selected" : "side-link"} onClick={() => {setActive(label); setMenuOpen(false);}}>
              <Icon size={17}/><span>{label}</span>{active === label && <span className="active-marker"/>}
            </button>
          ))}
          {filteredNav.length === 0 && <p className="nav-empty">No sections found.</p>}
        </nav>
        <div className="sidebar-spacer"/>
        <div className="side-support">
          <div className="support-icon"><CircleHelp size={17}/></div>
          <strong>Need a little direction?</strong>
          <p>Start with one small step. Your career plan can evolve as you do.</p>
          <button onClick={() => setShowHelp(v => !v)}> {showHelp ? "Hide tips" : "View quick tips"} <ArrowUpRight size={14}/></button>
          {showHelp && <div className="quick-tip">Choose a target role, review its skills, then create a small project to practise.</div>}
        </div>
        <div className="profile-row"><div className="profile-avatar">S</div><div className="profile-copy"><strong>My workspace</strong><span>Career explorer</span></div><button className="icon-button" aria-label="Workspace settings"><Settings2 size={16}/></button></div>
      </aside>

      {menuOpen && <button className="mobile-scrim" onClick={() => setMenuOpen(false)} aria-label="Close menu"/>}
      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={19}/></button>
            <div className="crumb">Workspace <ChevronRight size={14}/><strong>{active}</strong></div>
          </div>
          <div className="topbar-right">
            <span className="workspace-status"><span/> PERSONAL WORKSPACE</span>
            <button className="icon-button notification" aria-label="Notifications"><Activity size={17}/><i/></button>
            <div className="mini-avatar">S</div>
          </div>
        </header>

        <div className="dashboard-content">
          {active !== "Command center" ? <WorkspaceView active={active} role={role} onRoleChange={setRole} /> : <>
          <section className="hero-heading">
            <div>
              <div className="overline"><span className="overline-mark"/> YOUR CAREER, WITH CLARITY</div>
              <h1>Career Intelligence <span>Command Center</span></h1>
              <p>A thoughtful space to explore career options, understand your skills, and plan your next move.</p>
            </div>
            <div className="hero-date"><span className="live-dot"/> YOUR JOURNEY STARTS HERE</div>
          </section>

          <section className="overview-grid">
            <article className="goal-card">
              <div className="card-kicker"><span className="tile-icon"><Target size={16}/></span> CAREER GOAL <span className="card-menu">•••</span></div>
              <div className="goal-label">YOUR TARGET ROLE</div>
              <h2>{role}</h2>
              <p>Choose a direction to shape your skills and learning plan.</p>
              <label className="role-select"><BriefcaseBusiness size={14}/><select value={role} onChange={e => setRole(e.target.value)}>{roles.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label>
            </article>

            <article className="match-card">
              <div className="card-kicker">CAREER READINESS <span className="card-menu">•••</span></div>
              <div className="score-ring"><div className="score-inner"><strong>—</strong><span>Not assessed</span></div></div>
              <div className="score-note"><Activity size={13}/> Complete your assessment to see your result</div>
            </article>

            <article className="skills-card">
              <div className="card-kicker">SKILL GAP OVERVIEW <span className="card-menu">•••</span></div>
              <p className="muted-intro">Illustrative skill profile — update after assessment</p>
              <div className="skill-bars">{skillRows.map((item, index) => <div className="skill-row" key={item.name}><div className="skill-meta"><span>{item.name}</span><span>{item.level}</span></div><div className="bar-track"><span className={`bar-fill bar-${index}`} style={{width: item.value + "%"}}/></div></div>)}</div>
              <div className="legend"><span><i className="legend-strong"/> Strong</span><span><i className="legend-grow"/> Building</span><span><i className="legend-focus"/> Focus area</span></div>
            </article>
          </section>

          <section className="middle-grid">
            <article className="timeline-card">
              <div className="section-title"><div><div className="overline">PLAN WITH PURPOSE</div><h2>Career path timeline</h2></div><span className="subtle-tag">SUGGESTED JOURNEY</span></div>
              <div className="timeline">
                <div className="timeline-step done"><span className="timeline-icon"><GraduationCap size={17}/></span><strong>Learn</strong><small>Build foundations</small></div>
                <div className="timeline-connector"/>
                <div className="timeline-step current"><span className="timeline-icon"><Activity size={17}/></span><strong>Practise</strong><small>Apply your skills</small></div>
                <div className="timeline-connector"/>
                <div className="timeline-step"><span className="timeline-icon"><BriefcaseBusiness size={17}/></span><strong>Showcase</strong><small>Build a portfolio</small></div>
                <div className="timeline-connector"/>
                <div className="timeline-step"><span className="timeline-icon"><Award size={17}/></span><strong>Apply</strong><small>Prepare for roles</small></div>
              </div>
            </article>
            <article className="feature-card job-card"><div className="feature-head"><span className="feature-icon"><BriefcaseBusiness size={17}/></span><span className="subtle-tag">CAREER EXPLORATION</span></div><h3>Role discovery</h3><p>Compare career paths and understand what each role involves.</p><button onClick={() => setActive("Career explorer")}>Explore roles <ArrowUpRight size={15}/></button></article>
            <article className="feature-card interview-card"><div className="feature-head"><span className="feature-icon"><MessageSquare size={17}/></span><span className="subtle-tag">PRACTICE SPACE</span></div><h3>Interview studio</h3><p>Prepare answers and practise explaining your projects clearly.</p><button onClick={() => setActive("Interview studio")}>Prepare now <ArrowUpRight size={15}/></button></article>
          </section>

          <section className="bottom-grid">
            <article className="feature-card resume-card"><div className="feature-head"><span className="feature-icon"><FileText size={17}/></span><span className="subtle-tag">PROFILE TOOLKIT</span></div><h3>Resume workspace</h3><p>Organise your projects, skills and achievements for your next application.</p><button onClick={() => setActive("Resume workspace")}>Open workspace <ArrowUpRight size={15}/></button></article>
            <article className="feature-card learning-card"><div className="feature-head"><span className="feature-icon"><BookOpen size={17}/></span><span className="subtle-tag">SKILL DEVELOPMENT</span></div><h3>Learning path</h3><p>Turn skill gaps into a manageable learning plan with practical milestones.</p><button onClick={() => setActive("Skill development")}>Build learning plan <ArrowUpRight size={15}/></button></article>
            <article className="region-card"><div className="region-copy"><div className="feature-head"><span className="feature-icon"><Globe2 size={17}/></span><span className="subtle-tag">LOCATION CONTEXT</span></div><h3>Explore your job market</h3><p>Research roles, industries and opportunities in the regions you choose.</p><button onClick={() => setActive("Career explorer")}>View career explorer <ArrowUpRight size={14}/></button></div><div className="map-art" aria-hidden="true"><div className="map-grid"/><span className="map-pin pin-a"/><span className="map-pin pin-b"/><span className="map-pin pin-c"/><span className="map-pin pin-d"/></div></article>
          </section>

          <footer className="dashboard-footer"><span><ShieldCheck size={14}/> Your journey. Your decisions. Your future.</span><span>CareerCompass AI <i/> Career guidance for exploration and learning</span></footer>
          </>}
        </div>
      </main>
    </div>
  );
}

export default App;
