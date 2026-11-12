import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, FileText, MessageSquare, Search, Sparkles } from "lucide-react";

type Props = { active: string; role: string; onRoleChange: (role: string) => void };

const careers = [
  { name: "Python Developer", group: "Software development", summary: "Build backend services, APIs and automation with Python.", skills: "Python · SQL · Django/Flask · REST APIs" },
  { name: "Data Analyst", group: "Data & analytics", summary: "Turn raw data into useful reports and business insights.", skills: "SQL · Excel · Python · Power BI" },
  { name: "Frontend Developer", group: "Software development", summary: "Create accessible, responsive interfaces for web applications.", skills: "HTML · CSS · JavaScript · React" },
  { name: "Software Engineer", group: "Software development", summary: "Design, build, test and maintain software systems.", skills: "Programming · DSA · Git · Testing" },
  { name: "QA Automation Engineer", group: "Quality engineering", summary: "Improve software quality through test design and automation.", skills: "Python/Java · Selenium · API testing · SQL" },
  { name: "Business Intelligence Analyst", group: "Data & analytics", summary: "Model business data and communicate trends through dashboards.", skills: "SQL · Power BI · Data modelling · Excel" }
];

const learningItems = [
  "Review Python fundamentals and write small programs",
  "Practise SQL joins, grouping and subqueries",
  "Build a REST API using Flask or Django",
  "Add validation and automated tests to a project",
  "Publish a project README with screenshots and setup steps"
];

const questions = [
  "Tell me about yourself as a fresher.",
  "Explain one project you built and your contribution.",
  "Why did you choose Python for backend development?",
  "How do you debug an error you have never seen before?"
];

export default function WorkspaceView({ active, role, onRoleChange }: Props) {
  const [query, setQuery] = useState("");
  const [done, setDone] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("Entry-level Python Full Stack Developer");
  const [skills, setSkills] = useState("Python, SQL, Django, Flask, React, REST APIs");

  const filtered = useMemo(() => careers.filter(c => (c.name + c.group + c.skills).toLowerCase().includes(query.toLowerCase())), [query]);
  const toggle = (item: string) => setDone(old => old.includes(item) ? old.filter(x => x !== item) : [...old, item]);

  if (active === "Career explorer") return <section className="workspace-view">
    <div className="workspace-hero"><div className="overline">EXPLORE YOUR OPTIONS</div><h1>Career explorer</h1><p>Compare career directions and understand the skills commonly used in each role.</p></div>
    <div className="workspace-toolbar"><label className="workspace-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search roles, skills or domains"/></label><span className="workspace-count">{filtered.length} roles</span></div>
    <div className="workspace-cards">{filtered.map(c => <article className="workspace-card" key={c.name}><span className="feature-icon"><BriefcaseBusiness size={17}/></span><small>{c.group}</small><h3>{c.name}</h3><p>{c.summary}</p><div className="workspace-skills">{c.skills}</div><button onClick={() => onRoleChange(c.name)}>Set as target role <ArrowRight size={14}/></button></article>)}</div>
    {filtered.length === 0 && <p className="workspace-empty">No matching roles. Try another keyword.</p>}
    <p className="workspace-disclaimer">Role descriptions are general guidance, not a live job-market feed or a prediction.</p>
  </section>;

  if (active === "Skill development") return <section className="workspace-view">
    <div className="workspace-hero"><div className="overline">BUILD SKILLS WITH PURPOSE</div><h1>Your learning plan</h1><p>Target role: <strong>{role}</strong>. Tick each milestone as you complete it.</p></div>
    <div className="progress-panel"><div><strong>{done.length} of {learningItems.length} milestones complete</strong><span>{Math.round(done.length / learningItems.length * 100)}%</span></div><div className="workspace-progress"><i style={{width: (done.length / learningItems.length * 100) + "%"}}/></div></div>
    <div className="milestone-list">{learningItems.map((item,i) => <label className="milestone" key={item}><input type="checkbox" checked={done.includes(item)} onChange={() => toggle(item)}/><span><small>MILESTONE {String(i+1).padStart(2,"0")}</small>{item}</span>{done.includes(item) && <CheckCircle2 size={18}/>}</label>)}</div>
    <p className="workspace-disclaimer">This is an editable starter checklist. It is not generated from a validated skill-gap assessment yet.</p>
  </section>;

  if (active === "Interview studio") return <section className="workspace-view">
    <div className="workspace-hero"><div className="overline">PRACTISE YOUR ANSWERS</div><h1>Interview studio</h1><p>Write an answer, review the structure tip, and move to the next practice question.</p></div>
    <article className="practice-panel"><div className="practice-top"><span>QUESTION {questionIndex+1} OF {questions.length}</span><button onClick={() => {setQuestionIndex((questionIndex+1)%questions.length);setAnswer("");setShowTip(false);}}>Next question <ArrowRight size={14}/></button></div><h2>{questions[questionIndex]}</h2><textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Write your answer here. Try to keep it clear and specific..." rows={7}/><div className="practice-actions"><span>{answer.trim().length} characters</span><button onClick={() => setShowTip(v => !v)}><Sparkles size={14}/>{showTip ? "Hide structure tip" : "Show answer structure"}</button></div>{showTip && <div className="answer-tip"><strong>Try this structure</strong><p>Start with a direct answer, add one specific example, explain your own contribution, and finish with what you learned.</p></div>}</article>
    <p className="workspace-disclaimer">Practice workspace only. Your answers are not sent to an AI evaluator or saved to an account.</p>
  </section>;

  if (active === "Resume workspace") return <section className="workspace-view">
    <div className="workspace-hero"><div className="overline">YOUR PROFILE TOOLKIT</div><h1>Resume workspace</h1><p>Draft a simple profile summary and skills section. You can edit the content before using it.</p></div>
    <div className="resume-grid"><article className="practice-panel"><label className="field-label">YOUR NAME<input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your name"/></label><label className="field-label">TARGET HEADLINE<input value={headline} onChange={e => setHeadline(e.target.value)}/></label><label className="field-label">SKILLS<input value={skills} onChange={e => setSkills(e.target.value)}/></label></article><article className="resume-preview"><div className="overline">LIVE PREVIEW</div><h2>{fullName || "Your Name"}</h2><h3>{headline}</h3><hr/><strong>Skills</strong><p>{skills || "Add your verified skills here."}</p><small>Only include skills and experience you can confidently explain.</small></article></div>
    <p className="workspace-disclaimer">This preview is local to this browser session. It does not yet export a PDF or save a profile.</p>
  </section>;

  return <section className="workspace-view"><div className="workspace-hero"><div className="overline">CAREERCOMPASS AI</div><h1>{active}</h1><p>Choose a workspace from the left navigation to get started.</p></div></section>;
}
