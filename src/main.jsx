import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Check, Code2, Layers3, Menu, Plus, ShieldCheck, Sparkles, Trash2, X } from 'lucide-react';
import './styles.css';

const DEFAULT_PROJECTS = [
  { id: 'garantpro', name: 'GarantPro', type: 'B2B SaaS', description: 'Kafolat va savdo jarayonlarini boshqarish uchun zamonaviy SaaS platforma.', tech: 'Next.js · PostgreSQL · Prisma', link: '#' },
  { id: 'yolchi', name: 'Yo‘lchi', type: 'Mobil platforma', description: 'Yo‘lovchi va haydovchilarni bir nuqtadan ikkinchisiga bog‘laydigan mobil mahsulot.', tech: 'React Native · API · Maps', link: '#' },
  { id: 'garantiya', name: 'Garantiya', type: 'Web platforma', description: 'Mahsulot kafolatlarini QR orqali tekshirish va boshqarish tizimi.', tech: 'React · PostgreSQL · QR', link: '#' }
];

function useProjects() {
  const [projects, setProjects] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fentoph_projects')) || DEFAULT_PROJECTS; } catch { return DEFAULT_PROJECTS; }
  });
  useEffect(() => localStorage.setItem('fentoph_projects', JSON.stringify(projects)), [projects]);
  return [projects, setProjects];
}

function Home({ projects }) {
  const [menu, setMenu] = useState(false);
  return <div className="site">
    <header className="nav">
      <a className="brand" href="/"><span className="brand-mark">F</span> FENTOPH</a>
      <nav className={menu ? 'nav-links open' : 'nav-links'}>
        <a href="#biz">Biz kimmiz</a><a href="#xizmatlar">Yo‘nalishlar</a><a href="#loyihalar">Loyihalar</a><a href="#aloqa">Aloqa</a>
      </nav>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Menyu">{menu ? <X/> : <Menu/>}</button>
    </header>
    <main>
      <section className="hero">
        <div className="eyebrow"><span className="pulse"></span> MUSTAQIL TEXNOLOGIYA KOMPANIYASI</div>
        <h1>Foydali g‘oyalarni<br/><em>real texnologiyaga</em> aylantiramiz.</h1>
        <p>Fentoph — dasturiy mahsulotlar, web platformalar va raqamli yechimlarni loyihalash, ishlab chiqish va rivojlantirishga ixtisoslashgan kompaniya.</p>
        <div className="hero-stats"><div><b>01</b><span>G‘oya → mahsulot</span></div><div><b>02</b><span>Texnologiya → natija</span></div><div><b>03</b><span>Natija → rivojlanish</span></div></div>
      </section>
      <section id="biz" className="section split">
        <div><div className="section-label">01 / BIZ KIMMIZ</div><h2>Muammoni tushunamiz.<br/>Yechimni quramiz.</h2></div>
        <div className="copy"><p>Bizning yondashuv oddiy: real muammoni topish, uni chuqur tushunish va foydalanuvchiga haqiqiy qiymat beradigan mahsulot yaratish.</p><p>Fentoph hozirda founder-led texnologiya kompaniyasi sifatida ishlaydi. Har bir mahsulotda arxitektura, UX, muhandislik va uzoq muddatli fikrlash birgalikda ko‘riladi.</p></div>
      </section>
      <section id="xizmatlar" className="section">
        <div className="section-label">02 / YO‘NALISHLAR</div>
        <div className="cards">
          {[
            ['Software engineering','Murakkab g‘oyalarni ishonchli va kengayadigan dasturiy tizimlarga aylantiramiz.',Code2],
            ['Digital products','Web va mobil mahsulotlarni foydalanuvchi ehtiyojidan boshlab ishlab chiqamiz.',Layers3],
            ['Automation & cloud','API, avtomatlashtirish va cloud infratuzilmasi bilan jarayonlarni tezlashtiramiz.',Sparkles]
          ].map(([title,text,Icon])=><article className="service" key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section id="loyihalar" className="section projects"><div className="section-label">03 / LOYIHALAR</div><div className="project-list">
        {projects.map((p,i)=><article className="project" key={p.id}><div className="project-num">0{i+1}</div><div><span>{p.type}</span><h3>{p.name}</h3><p>{p.description}</p><small>{p.tech}</small></div><a href={p.link || '#'} aria-label={p.name}><ArrowUpRight/></a></article>)}
      </div></section>
      <section id="aloqa" className="cta"><div className="section-label">04 / ALOQA</div><h2>Keyingi foydali mahsulot<br/><em>balki sizniki.</em></h2><a className="email" href="mailto:hello@fentoph.io">hello@fentoph.io <ArrowUpRight/></a></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Fentoph</span><span>Build useful technology. Solve real problems.</span></footer>
  </div>;
}

function Admin({ projects, setProjects }) {
  const [authed,setAuthed]=useState(null), [email,setEmail]=useState(''), [password,setPassword]=useState(''), [error,setError]=useState(''), [form,setForm]=useState({name:'',type:'',description:'',tech:'',link:''});
  useEffect(()=>{fetch('/api/admin/me').then(r=>setAuthed(r.ok)).catch(()=>setAuthed(false))},[]);
  async function login(e){e.preventDefault();setError('');const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(r.ok){setAuthed(true);setPassword('')}else setError(d.message||'Kirish amalga oshmadi.')}
  async function logout(){await fetch('/api/admin/login',{method:'DELETE'});setAuthed(false)}
  function add(e){e.preventDefault();if(!form.name||!form.type||!form.description)return;setProjects([...projects,{...form,id:crypto.randomUUID()}]);setForm({name:'',type:'',description:'',tech:'',link:''})}
  if(authed===null)return <div className="auth"><div className="auth-card"><div className="brand"><span className="brand-mark">F</span> FENTOPH</div><p>Tekshirilmoqda…</p></div></div>;
  if(!authed)return <div className="auth"><form className="auth-card" onSubmit={login}><div className="brand"><span className="brand-mark">F</span> FENTOPH</div><h1>Admin panel</h1><p>Portfolio loyihalarini boshqarish.</p><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Parol<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{error&&<div className="error">{error}</div>}<button className="primary" type="submit">Kirish <ArrowUpRight/></button></form></div>;
  return <div className="admin"><header className="admin-nav"><a className="brand" href="/"><span className="brand-mark">F</span> FENTOPH</a><button onClick={logout}>Chiqish</button></header><main className="admin-main"><div className="admin-head"><div><div className="section-label">ADMIN / LOYIHALAR</div><h1>Portfolio boshqaruvi</h1><p>Faqat loyiha qo‘shish va o‘chirish.</p></div></div><div className="admin-grid"><form className="panel" onSubmit={add}><h2>Yangi loyiha</h2>{[['name','Nomi'],['type','Turi'],['description','Tavsif'],['tech','Texnologiyalar'],['link','Havola']].map(([key,label])=><label key={key}>{label}{key==='description'?<textarea value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} required={key!=='link'}/>:<input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} required={key!=='link'}/>}</label>)}<button className="primary" type="submit"><Plus/> Loyiha qo‘shish</button></form><div className="panel"><h2>Mavjud loyihalar <span>{projects.length}</span></h2><div className="admin-projects">{projects.map(p=><div className="admin-project" key={p.id}><div><b>{p.name}</b><small>{p.type}</small></div><button className="danger" onClick={()=>setProjects(projects.filter(x=>x.id!==p.id))} aria-label="O‘chirish"><Trash2/></button></div>)}</div></div></div></main></div>;
}

function App(){const [projects,setProjects]=useProjects();return location.pathname==='/admins'?<Admin projects={projects} setProjects={setProjects}/>:<Home projects={projects}/>;}
createRoot(document.getElementById('root')).render(<App/>);