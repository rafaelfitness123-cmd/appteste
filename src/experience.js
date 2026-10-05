const TODAY_KEY = 'cf_intro_day_v2'
const HOME_MARK = 'data-cf-experience'

const teamCards = [
  {
    index: '01',
    eyebrow: 'TREINO DE FORÇA',
    title: 'Orientação que acompanha o seu ritmo.',
    text: 'Instrutores no salão para orientar execução, ajustar exercícios e manter seu treino seguro e objetivo.',
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=88',
  },
  {
    index: '02',
    eyebrow: 'AVALIAÇÃO FÍSICA',
    title: 'Evolução começa com um ponto de partida.',
    text: 'Avaliação individual e horário reservado para acompanhar medidas, objetivos e evolução com mais clareza.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=88',
  },
  {
    index: '03',
    eyebrow: 'ACOMPANHAMENTO',
    title: 'Você treina. A equipe presta atenção.',
    text: 'Suporte durante a rotina para você não ficar perdido entre aparelhos, séries e progressões.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=88',
  },
  {
    index: '04',
    eyebrow: 'ATENDIMENTO',
    title: 'Do agendamento ao treino, tudo mais simples.',
    text: 'Uma experiência organizada desde a recepção, com agenda digital e informações fáceis de acessar.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=88',
  },
]

function todayKey() {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Belem' }).format(new Date())
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

function finishIntro() {
  const intro = document.querySelector('#cf-intro')
  if (!intro) return

  if (!document.documentElement.classList.contains('cf-show-intro')) {
    intro.remove()
    return
  }

  requestAnimationFrame(() => intro.classList.add('is-running'))
  window.setTimeout(() => intro.classList.add('is-leaving'), 1450)
  window.setTimeout(() => {
    intro.remove()
    document.documentElement.classList.remove('cf-show-intro')
  }, 2100)
}

function teamSection() {
  const cards = [...teamCards, ...teamCards]
    .map(card => `
      <article class="cf-team-card" style="--team-photo:url('${card.image}')">
        <div class="cf-team-card-photo"></div>
        <div class="cf-team-card-shade"></div>
        <div class="cf-team-card-index">${card.index}</div>
        <div class="cf-team-card-copy">
          <span>${card.eyebrow}</span>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </div>
      </article>
    `)
    .join('')

  const section = document.createElement('section')
  section.id = 'profissionais'
  section.className = 'cf-team-section cf-reveal-section'
  section.innerHTML = `
    <div class="container cf-team-heading">
      <div>
        <span class="cf-kicker">NOSSO JEITO DE ACOMPANHAR</span>
        <h2>Profissionais presentes.<br><em>Treino com direção.</em></h2>
      </div>
      <p>Uma equipe que aparece no momento certo: para orientar, corrigir, avaliar e deixar sua rotina mais simples.</p>
    </div>
    <div class="cf-team-viewport" aria-label="Áreas de acompanhamento profissional">
      <div class="cf-team-track">${cards}</div>
    </div>
    <div class="container cf-team-foot">
      <span>Arraste no celular</span>
      <span class="cf-moving-line"><i></i></span>
      <span>Equipe Companhia Fitness</span>
    </div>
  `
  return section
}

function powerBanner() {
  const section = document.createElement('section')
  section.className = 'cf-power-section cf-reveal-section'
  section.innerHTML = `
    <div class="container">
      <div class="cf-power-banner" data-cf-parallax="0.035">
        <div class="cf-power-bg"></div>
        <div class="cf-power-scan"></div>
        <div class="cf-power-copy">
          <span>COMPANHIA FITNESS / MARABÁ</span>
          <h2>Não espere motivação.<br><em>Construa ritmo.</em></h2>
          <p>Comece com uma avaliação e transforme treino em rotina.</p>
          <a href="#/agendar" class="cf-power-button">AGENDAR AVALIAÇÃO <b>↗</b></a>
        </div>
        <div class="cf-power-number">CF</div>
      </div>
    </div>
  `
  return section
}

function mobileDock() {
  const dock = document.createElement('div')
  dock.className = 'cf-mobile-dock'
  dock.innerHTML = `
    <a href="#estrutura" class="cf-dock-ghost">Explorar</a>
    <a href="#/agendar" class="cf-dock-main">Agendar <span>↗</span></a>
  `
  return dock
}

function observeReveals(root = document) {
  const nodes = [...root.querySelectorAll('.section-head, .feature-card, .benefit-copy, .benefit-visual, .price-card, .cf-reveal-section, .final-cta-inner')]
  nodes.forEach((node, index) => {
    if (node.dataset.cfReveal) return
    node.dataset.cfReveal = '1'
    node.style.setProperty('--cf-delay', `${Math.min(index % 4, 3) * 70}ms`)
  })

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(node => node.classList.add('cf-visible'))
    return
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cf-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

  nodes.forEach(node => observer.observe(node))
}

function installParallax(shell) {
  if (shell.dataset.cfParallax === '1') return
  shell.dataset.cfParallax = '1'

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  const hero = shell.querySelector('.hero')
  if (hero) {
    const scene = hero.querySelector('.hero-visual')
    hero.addEventListener('pointermove', event => {
      if (window.innerWidth < 900 || !scene) return
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      hero.style.setProperty('--hero-rx', `${y * -4}deg`)
      hero.style.setProperty('--hero-ry', `${x * 5}deg`)
      hero.style.setProperty('--hero-x', `${x * 16}px`)
      hero.style.setProperty('--hero-y', `${y * 12}px`)
    })
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--hero-rx', '0deg')
      hero.style.setProperty('--hero-ry', '0deg')
      hero.style.setProperty('--hero-x', '0px')
      hero.style.setProperty('--hero-y', '0px')
    })
  }

  let ticking = false
  const run = () => {
    ticking = false
    if (window.innerWidth < 760) return
    document.querySelectorAll('[data-cf-parallax]').forEach(el => {
      const rect = el.getBoundingClientRect()
      const factor = Number(el.dataset.cfParallax || 0.04)
      const offset = (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) * factor
      el.style.setProperty('--cf-parallax-y', `${Math.max(-34, Math.min(34, offset))}px`)
    })
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(run)
    }
  }, { passive: true })
  run()
}

function enhanceHome() {
  const shell = document.querySelector('.site-shell')
  if (!shell || shell.hasAttribute(HOME_MARK)) return
  shell.setAttribute(HOME_MARK, 'v2')
  document.body.classList.add('cf-premium')

  const heroVisual = shell.querySelector('.hero-visual')
  if (heroVisual) heroVisual.dataset.cfParallax = '0.022'

  const benefitVisual = shell.querySelector('.benefit-visual')
  if (benefitVisual) benefitVisual.dataset.cfParallax = '0.028'

  const structure = shell.querySelector('#estrutura')
  if (structure && !shell.querySelector('#profissionais')) structure.after(teamSection())

  const finalCta = shell.querySelector('.final-cta')
  if (finalCta && !shell.querySelector('.cf-power-section')) finalCta.before(powerBanner())

  if (!shell.querySelector('.cf-mobile-dock')) shell.appendChild(mobileDock())

  observeReveals(shell)
  installParallax(shell)
}

function watchApp() {
  enhanceHome()
  const observer = new MutationObserver(() => enhanceHome())
  observer.observe(document.querySelector('#root'), { childList: true, subtree: true })
}

finishIntro()
watchApp()

window.addEventListener('hashchange', () => {
  requestAnimationFrame(() => requestAnimationFrame(enhanceHome))
})

window.addEventListener('pageshow', () => {
  const key = todayKey()
  try {
    if (localStorage.getItem(TODAY_KEY) !== key) localStorage.setItem(TODAY_KEY, key)
  } catch {}
})
