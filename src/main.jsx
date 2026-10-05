import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createClient } from '@supabase/supabase-js'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  LogIn,
  LogOut,
  Menu,
  Plus,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import './styles.css'

const supabase = createClient(
  'https://vmrqlvihrwivyufwiltr.supabase.co',
  'sb_publishable_vAPsUIh5M9GCMRSvugeO7Q_tO-QiJg8',
  { auth: { persistSession: true, autoRefreshToken: true } },
)

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function routeFromHash() {
  const h = window.location.hash.replace('#', '')
  if (h.startsWith('/admin')) return 'admin'
  if (h.startsWith('/agendar')) return 'booking'
  return 'home'
}

function App() {
  const [route, setRoute] = useState(routeFromHash())
  useEffect(() => {
    const fn = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', fn)
    return () => window.removeEventListener('hashchange', fn)
  }, [])

  if (route === 'admin') return <AdminApp />
  if (route === 'booking') return <BookingPage />
  return <Home />
}

function Brand({ compact = false }) {
  return (
    <a href="#/" className={`brand ${compact ? 'compact' : ''}`} aria-label="Companhia Fitness">
      <span className="brand-mark"><Dumbbell size={22} strokeWidth={2.6} /></span>
      <span><strong>COMPANHIA</strong><em>FITNESS</em></span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand />
        <nav className={open ? 'open' : ''}>
          <a href="#estrutura" onClick={() => setOpen(false)}>Estrutura</a>
          <a href="#beneficios" onClick={() => setOpen(false)}>Benefícios</a>
          <a href="#planos" onClick={() => setOpen(false)}>Planos</a>
          <a href="#/agendar" className="nav-cta" onClick={() => setOpen(false)}>Agendar avaliação</a>
          <a href="#/admin" className="admin-link" onClick={() => setOpen(false)}>Admin</a>
        </nav>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Home() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-noise" />
          <div className="hero-orb orb-a" />
          <div className="hero-orb orb-b" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><Sparkles size={16} /> Treine forte. Evolua de verdade.</div>
              <h1>Seu próximo nível começa <span>aqui.</span></h1>
              <p>Treino, acompanhamento e energia para você construir resultados consistentes na Companhia Fitness.</p>
              <div className="hero-actions">
                <a href="#/agendar" className="btn btn-primary">Agendar avaliação <ArrowRight size={18} /></a>
                <a href="#estrutura" className="btn btn-ghost">Conhecer a academia</a>
              </div>
              <div className="hero-stats">
                <div><strong>R$ 120</strong><span>Plano mensal</span></div>
                <div><strong>Todos os dias</strong><span>Treino liberado</span></div>
                <div><strong>R$ 50</strong><span>Avaliação física</span></div>
              </div>
            </div>
            <div className="hero-visual reveal delay-1">
              <div className="hero-card main-photo">
                <div className="photo-overlay" />
                <div className="floating-tag tag-top"><span className="pulse-dot" /> Academia em Marabá</div>
                <div className="floating-card">
                  <div className="mini-icon"><ShieldCheck size={20} /></div>
                  <div><strong>Acompanhamento de perto</strong><span>Instrutores para orientar seu treino</span></div>
                </div>
              </div>
              <div className="ring ring-one" />
              <div className="ring ring-two" />
            </div>
          </div>
          <div className="ticker" aria-hidden="true">
            <div>COMPANHIA FITNESS • FORÇA • FOCO • EVOLUÇÃO • DISCIPLINA • RESULTADO • COMPANHIA FITNESS • FORÇA • FOCO • EVOLUÇÃO •</div>
          </div>
        </section>

        <section id="estrutura" className="section dark-section">
          <div className="container">
            <div className="section-head">
              <div><span className="kicker">ESTRUTURA</span><h2>Feita para quem quer <span>evoluir.</span></h2></div>
              <p>Um ambiente direto ao ponto: equipamentos, suporte e rotina de treino para você manter constância.</p>
            </div>
            <div className="feature-grid">
              {[
                ['01', 'Treino todos os dias', 'Seu plano mensal permite treinar todos os dias durante a vigência.'],
                ['02', 'Instrutores presentes', 'Orientação para execução e montagem de treino conforme seu objetivo.'],
                ['03', 'Avaliação física', 'Acompanhamento inicial e periódico para entender sua evolução.'],
              ].map(([n,t,d]) => <div className="feature-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ChevronRight /></div>)}
            </div>
          </div>
        </section>

        <section id="beneficios" className="section benefits">
          <div className="container benefits-grid">
            <div className="benefit-visual">
              <div className="benefit-panel panel-a"><span>01</span><strong>Consistência</strong></div>
              <div className="benefit-panel panel-b"><span>02</span><strong>Orientação</strong></div>
              <div className="benefit-panel panel-c"><span>03</span><strong>Progresso</strong></div>
            </div>
            <div className="benefit-copy">
              <span className="kicker">MAIS QUE TREINO</span>
              <h2>Uma rotina que trabalha a seu favor.</h2>
              <p>Você não precisa complicar. Precisa de um lugar bom, acompanhamento e uma rotina que consiga manter.</p>
              <ul>
                <li><Check /> Plano mensal com acesso diário</li>
                <li><Check /> Treino montado conforme objetivo</li>
                <li><Check /> Avaliação física com horário agendado</li>
                <li><Check /> Ambiente forte e motivador</li>
              </ul>
              <a href="#/agendar" className="text-link">Quero começar <ArrowRight size={18} /></a>
            </div>
          </div>
        </section>

        <section id="planos" className="section pricing-section">
          <div className="container">
            <div className="section-head light-head">
              <div><span className="kicker">PLANOS</span><h2>Simples, direto e sem enrolação.</h2></div>
            </div>
            <div className="pricing-grid">
              <div className="price-card featured">
                <div className="popular">MAIS ESCOLHIDO</div>
                <p>PLANO MENSAL</p>
                <div className="price"><small>R$</small>120<span>/mês</span></div>
                <ul><li><Check /> Acesso todos os dias</li><li><Check /> Orientação dos instrutores</li><li><Check /> Treino conforme objetivo</li></ul>
                <a href="#/agendar" className="btn btn-dark">Começar agora <ArrowRight size={18} /></a>
              </div>
              <div className="price-card">
                <p>AVALIAÇÃO FÍSICA</p>
                <div className="price"><small>R$</small>50<span>/avaliação</span></div>
                <ul><li><Check /> Horário reservado</li><li><Check /> Atendimento individual</li><li><Check /> Dados para acompanhar evolução</li></ul>
                <a href="#/agendar" className="btn btn-outline-dark">Agendar avaliação</a>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div><span className="kicker">COMPANHIA FITNESS</span><h2>Seu treino pode começar amanhã.</h2></div>
            <a href="#/agendar" className="btn btn-light">Ver horários disponíveis <CalendarDays size={18} /></a>
          </div>
        </section>
      </main>
      <footer><div className="container footer-inner"><Brand compact /><span>Companhia Fitness • Marabá - PA</span><a href="#/admin">Área administrativa</a></div></footer>
    </div>
  )
}

function BookingPage() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', notes: '' })
  const [message, setMessage] = useState(null)

  async function loadSlots() {
    setLoading(true)
    const { data, error } = await supabase
      .from('evaluation_slots')
      .select('id, starts_at, is_booked')
      .eq('is_active', true)
      .eq('is_booked', false)
      .gt('starts_at', new Date().toISOString())
      .order('starts_at')
    if (!error) setSlots(data || [])
    setLoading(false)
  }
  useEffect(() => { loadSlots() }, [])

  const grouped = useMemo(() => slots.reduce((acc, slot) => {
    const d = new Date(slot.starts_at)
    const key = d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', timeZone: 'America/Belem' })
    ;(acc[key] ||= []).push(slot)
    return acc
  }, {}), [slots])

  async function submit(e) {
    e.preventDefault()
    setMessage(null)
    if (!selected) return setMessage({ type: 'error', text: 'Escolha um horário disponível.' })
    const payload = { slot_id: selected, full_name: form.full_name.trim(), phone: form.phone.trim(), email: form.email.trim() || null, notes: form.notes.trim() || null }
    const { error } = await supabase.from('evaluation_appointments').insert(payload)
    if (error) {
      await loadSlots()
      return setMessage({ type: 'error', text: 'Esse horário pode ter acabado de ser ocupado. Escolha outro e tente novamente.' })
    }
    setMessage({ type: 'success', text: 'Avaliação agendada com sucesso! Seu horário ficou reservado.' })
    setForm({ full_name: '', phone: '', email: '', notes: '' })
    setSelected('')
    loadSlots()
  }

  return (
    <div className="booking-shell">
      <div className="booking-top"><div className="container booking-nav"><Brand /><a href="#/">Voltar ao site</a></div></div>
      <div className="container booking-grid">
        <div className="booking-intro">
          <span className="kicker">AVALIAÇÃO FÍSICA</span>
          <h1>Escolha o melhor horário para você.</h1>
          <p>Selecione um horário livre. Assim que confirmar, ele fica automaticamente indisponível para novos agendamentos.</p>
          <div className="info-card"><Clock3 /><div><strong>Atendimento com hora marcada</strong><span>Chegue com alguns minutos de antecedência para fazermos tudo com tranquilidade.</span></div></div>
        </div>
        <form className="booking-card" onSubmit={submit}>
          <h2>Agendar avaliação</h2>
          <div className="field-row"><label>Nome completo<input required value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} placeholder="Seu nome" /></label><label>WhatsApp<input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(94) 99999-9999" /></label></div>
          <label>E-mail <span className="optional">opcional</span><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="voce@email.com" /></label>
          <div className="slot-title"><span>Horários disponíveis</span><small>{slots.length} opções</small></div>
          {loading ? <div className="loading-box">Carregando horários...</div> : slots.length === 0 ? <div className="empty-box">Não há horários livres no momento. Novos horários serão liberados em breve.</div> : (
            <div className="days-list">
              {Object.entries(grouped).map(([date, daySlots]) => <div className="day-group" key={date}><h4>{date}</h4><div className="slot-grid">{daySlots.map(slot => {
                const time = new Date(slot.starts_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Belem' })
                return <button type="button" key={slot.id} className={selected === slot.id ? 'slot selected' : 'slot'} onClick={() => setSelected(slot.id)}>{time}</button>
              })}</div></div>)}
            </div>
          )}
          <label>Observação <span className="optional">opcional</span><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Alguma informação importante?" /></label>
          {message && <div className={`form-message ${message.type}`}>{message.type === 'success' ? <Check /> : <X />}{message.text}</div>}
          <button className="btn btn-primary full" type="submit">Confirmar agendamento <ArrowRight size={18} /></button>
        </form>
      </div>
    </div>
  )
}

function AdminApp() {
  const [session, setSession] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, current) => setSession(current))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    async function checkAdmin() {
      if (!session?.user) { setAdmin(null); setChecking(false); return }
      setChecking(true)
      const { data } = await supabase.from('admin_users').select('*').eq('user_id', session.user.id).maybeSingle()
      setAdmin(data || null)
      setChecking(false)
    }
    checkAdmin()
  }, [session])

  if (checking) return <div className="center-screen">Carregando painel...</div>
  if (!session) return <AdminLogin />
  if (!admin) return <FirstAdminSetup user={session.user} onDone={() => location.reload()} />
  return <Dashboard admin={admin} />
}

function AdminLogin() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault(); setBusy(true); setMsg('')
    const action = mode === 'login'
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password })
    const { error, data } = await action
    if (error) setMsg(error.message)
    else if (mode === 'signup' && !data.session) setMsg('Conta criada. Confirme seu e-mail e depois faça login.')
    setBusy(false)
  }

  return <div className="admin-auth"><div className="auth-card"><Brand /><div className="auth-badge"><ShieldCheck size={16}/> Área administrativa</div><h1>{mode === 'login' ? 'Entrar no painel' : 'Criar acesso administrativo'}</h1><p>Gerencie alunos, horários e avaliações em um só lugar.</p><form onSubmit={submit}><label>E-mail<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></label><label>Senha<input type="password" minLength="6" required value={password} onChange={e=>setPassword(e.target.value)} /></label>{msg && <div className="auth-msg">{msg}</div>}<button className="btn btn-primary full" disabled={busy}>{busy ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}</button></form><button className="switch-auth" onClick={()=>{setMode(mode==='login'?'signup':'login');setMsg('')}}>{mode === 'login' ? 'Primeiro acesso? Criar conta' : 'Já tenho conta'}</button><a href="#/" className="back-site">← Voltar ao site</a></div></div>
}

function FirstAdminSetup({ user, onDone }) {
  const [name, setName] = useState('Administrador')
  const [msg, setMsg] = useState('')
  async function claim() {
    setMsg('')
    const { data, error } = await supabase.rpc('claim_first_admin', { p_display_name: name })
    if (error) return setMsg(error.message)
    if (!data) return setMsg('Já existe um administrador configurado. Peça acesso ao responsável.')
    onDone()
  }
  return <div className="admin-auth"><div className="auth-card"><Brand /><div className="auth-badge"><UserPlus size={16}/> Configuração inicial</div><h1>Defina o primeiro administrador</h1><p>Essa opção só funciona uma vez e ficará bloqueada depois que o primeiro administrador for criado.</p><label>Nome no painel<input value={name} onChange={e=>setName(e.target.value)} /></label><div className="setup-email">Conta: {user.email}</div>{msg && <div className="auth-msg">{msg}</div>}<button className="btn btn-primary full" onClick={claim}>Ativar painel</button><button className="switch-auth" onClick={()=>supabase.auth.signOut()}>Sair desta conta</button></div></div>
}

function Dashboard({ admin }) {
  const [tab, setTab] = useState('overview')
  const [students, setStudents] = useState([])
  const [appointments, setAppointments] = useState([])
  const [slots, setSlots] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  async function loadAll() {
    setRefreshing(true)
    const [s,a,sl] = await Promise.all([
      supabase.from('students').select('*').order('created_at', { ascending: false }),
      supabase.from('evaluation_appointments').select('*, evaluation_slots(starts_at)').order('created_at', { ascending: false }),
      supabase.from('evaluation_slots').select('*').order('starts_at'),
    ])
    setStudents(s.data || []); setAppointments(a.data || []); setSlots(sl.data || []); setRefreshing(false)
  }
  useEffect(()=>{ loadAll() },[])

  const futureSlots = slots.filter(s => new Date(s.starts_at) > new Date() && s.is_active)
  const bookedFuture = futureSlots.filter(s => s.is_booked).length

  return <div className="dashboard-shell">
    <aside className="sidebar"><Brand compact /><div className="side-nav"><button className={tab==='overview'?'active':''} onClick={()=>setTab('overview')}><Sparkles/> Visão geral</button><button className={tab==='appointments'?'active':''} onClick={()=>setTab('appointments')}><CalendarDays/> Avaliações</button><button className={tab==='students'?'active':''} onClick={()=>setTab('students')}><Users/> Alunos</button><button className={tab==='slots'?'active':''} onClick={()=>setTab('slots')}><Clock3/> Horários</button></div><div className="side-bottom"><div><strong>{admin.display_name || 'Administrador'}</strong><span>Painel Companhia Fitness</span></div><button onClick={()=>supabase.auth.signOut()} title="Sair"><LogOut/></button></div></aside>
    <main className="dashboard-main"><div className="dash-top"><div><p>COMPANHIA FITNESS</p><h1>{tab==='overview'?'Visão geral':tab==='appointments'?'Avaliações agendadas':tab==='students'?'Cadastro de alunos':'Horários disponíveis'}</h1></div><button className="refresh-btn" onClick={loadAll}>{refreshing?'Atualizando...':'Atualizar dados'}</button></div>
      {tab==='overview' && <Overview students={students} appointments={appointments} futureSlots={futureSlots} bookedFuture={bookedFuture} />}
      {tab==='appointments' && <Appointments appointments={appointments} reload={loadAll} />}
      {tab==='students' && <Students students={students} reload={loadAll} />}
      {tab==='slots' && <Slots slots={slots} reload={loadAll} />}
    </main>
  </div>
}

function Overview({ students, appointments, futureSlots, bookedFuture }) {
  const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Belem' })
  const todayAppointments = appointments.filter(a => a.evaluation_slots?.starts_at && new Date(a.evaluation_slots.starts_at).toLocaleDateString('pt-BR', { timeZone: 'America/Belem' }) === today && a.status==='scheduled')
  return <><div className="metric-grid"><Metric icon={<Users/>} label="Alunos cadastrados" value={students.length} /><Metric icon={<CalendarDays/>} label="Avaliações hoje" value={todayAppointments.length} /><Metric icon={<Clock3/>} label="Próximos horários" value={futureSlots.length} /><Metric icon={<Check/>} label="Horários ocupados" value={bookedFuture} /></div><div className="dash-card"><div className="card-title"><div><p>AGENDA DE HOJE</p><h3>Próximas avaliações</h3></div></div>{todayAppointments.length===0?<div className="dash-empty">Nenhuma avaliação marcada para hoje.</div>:<div className="appointment-list">{todayAppointments.map(a=><AppointmentRow key={a.id} appointment={a}/>)}</div>}</div></>
}
function Metric({ icon,label,value }) { return <div className="metric-card"><div className="metric-icon">{icon}</div><span>{label}</span><strong>{String(value).padStart(2,'0')}</strong></div> }

function AppointmentRow({ appointment, controls, onStatus }) {
  const start = appointment.evaluation_slots?.starts_at
  const d = start ? new Date(start) : null
  return <div className="appointment-row"><div className="appointment-time"><strong>{d?d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Belem'}):'--:--'}</strong><span>{d?d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short',timeZone:'America/Belem'}):''}</span></div><div className="appointment-person"><strong>{appointment.full_name}</strong><span>{appointment.phone}{appointment.email?` • ${appointment.email}`:''}</span></div><div className={`status-pill ${appointment.status}`}>{appointment.status==='scheduled'?'Agendada':appointment.status==='completed'?'Concluída':appointment.status==='cancelled'?'Cancelada':'Faltou'}</div>{controls&&<select value={appointment.status} onChange={e=>onStatus(appointment.id,e.target.value)}><option value="scheduled">Agendada</option><option value="completed">Concluída</option><option value="cancelled">Cancelada</option><option value="no_show">Faltou</option></select>}</div>
}

function Appointments({ appointments, reload }) {
  async function changeStatus(id,status){ await supabase.from('evaluation_appointments').update({status}).eq('id',id); reload() }
  const ordered=[...appointments].sort((a,b)=>new Date(a.evaluation_slots?.starts_at||0)-new Date(b.evaluation_slots?.starts_at||0))
  return <div className="dash-card"><div className="card-title"><div><p>AGENDA</p><h3>{appointments.length} agendamentos</h3></div></div>{ordered.length===0?<div className="dash-empty">Nenhum agendamento ainda.</div>:<div className="appointment-list">{ordered.map(a=><AppointmentRow key={a.id} appointment={a} controls onStatus={changeStatus}/>)}</div>}</div>
}

function Students({ students, reload }) {
  const [open,setOpen]=useState(false)
  const [form,setForm]=useState({full_name:'',phone:'',email:'',goal:'',status:'active'})
  const [msg,setMsg]=useState('')
  async function save(e){e.preventDefault();setMsg('');const {error}=await supabase.from('students').insert({...form,email:form.email||null,goal:form.goal||null});if(error)return setMsg(error.message);setForm({full_name:'',phone:'',email:'',goal:'',status:'active'});setOpen(false);reload()}
  return <><div className="toolbar"><button className="btn btn-primary" onClick={()=>setOpen(!open)}><Plus size={18}/> Novo aluno</button></div>{open&&<form className="dash-form" onSubmit={save}><div className="field-row"><label>Nome completo<input required value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/></label><label>WhatsApp<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label></div><div className="field-row"><label>E-mail<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Objetivo<input value={form.goal} onChange={e=>setForm({...form,goal:e.target.value})} placeholder="Ex.: hipertrofia, emagrecimento"/></label></div><div className="field-row"><label>Status<select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option value="active">Ativo</option><option value="inactive">Inativo</option><option value="lead">Interessado</option></select></label><div/></div>{msg&&<div className="auth-msg">{msg}</div>}<button className="btn btn-dark">Salvar aluno</button></form>}<div className="dash-card"><div className="card-title"><div><p>ALUNOS</p><h3>{students.length} cadastrados</h3></div></div><div className="table-wrap"><table><thead><tr><th>Aluno</th><th>Contato</th><th>Objetivo</th><th>Status</th></tr></thead><tbody>{students.map(s=><tr key={s.id}><td><strong>{s.full_name}</strong></td><td>{s.phone}<small>{s.email||''}</small></td><td>{s.goal||'—'}</td><td><span className={`status-pill ${s.status==='active'?'completed':s.status==='inactive'?'cancelled':'scheduled'}`}>{s.status==='active'?'Ativo':s.status==='inactive'?'Inativo':'Interessado'}</span></td></tr>)}</tbody></table>{students.length===0&&<div className="dash-empty">Cadastre o primeiro aluno.</div>}</div></div></>
}

function Slots({ slots, reload }) {
  const [form,setForm]=useState({date:'',time:'18:30',duration:45})
  const [msg,setMsg]=useState('')
  async function create(e){e.preventDefault();setMsg('');const local=`${form.date}T${form.time}:00-03:00`;const {error}=await supabase.from('evaluation_slots').insert({starts_at:new Date(local).toISOString(),duration_minutes:Number(form.duration)});if(error)return setMsg(error.message.includes('duplicate')?'Esse horário já existe.':error.message);setMsg('Horário criado.');reload()}
  async function toggle(slot){await supabase.from('evaluation_slots').update({is_active:!slot.is_active}).eq('id',slot.id);reload()}
  const future=slots.filter(s=>new Date(s.starts_at)>new Date()).sort((a,b)=>new Date(a.starts_at)-new Date(b.starts_at))
  return <><form className="dash-form compact-form" onSubmit={create}><div className="field-row three"><label>Data<input type="date" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label><label>Horário<input type="time" required value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></label><label>Duração<select value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})}><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option></select></label></div>{msg&&<div className="auth-msg">{msg}</div>}<button className="btn btn-primary"><Plus size={18}/> Adicionar horário</button></form><div className="dash-card"><div className="card-title"><div><p>DISPONIBILIDADE</p><h3>Próximos horários</h3></div></div><div className="slot-admin-grid">{future.map(slot=>{const d=new Date(slot.starts_at);return <div className={`slot-admin-card ${!slot.is_active?'disabled':''}`} key={slot.id}><div><strong>{d.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short',timeZone:'America/Belem'})}</strong><span>{d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Belem'})}</span></div><div className={`status-pill ${slot.is_booked?'scheduled':'completed'}`}>{slot.is_booked?'Ocupado':'Livre'}</div><button onClick={()=>toggle(slot)}>{slot.is_active?'Desativar':'Ativar'}</button></div>})}{future.length===0&&<div className="dash-empty">Nenhum horário futuro cadastrado.</div>}</div></div></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
