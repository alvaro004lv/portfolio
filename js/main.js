/* =========================================================
   Alvaro Lacasa Vela — portfolio
   Vanilla JS, no dependencies.
   ========================================================= */
(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
  };

  /* ---------------- Data (from CV) ---------------- */
  const SKILLS = {
    'Security Testing': ['BurpSuite Professional', 'OWASP WSTG', 'OWASP MSTG', 'MITRE ATT&CK', 'DAST / SAST', 'Web testing', 'API testing', 'Mobile testing', 'Security report writing', 'Risk communication'],
    'Offensive': ['Kali Linux', 'Penetration testing', 'Red Team methodologies', 'Vulnerability assessment', 'Exploitation'],
    'AI & Automation': ['Claude API', 'OpenAI API', 'N8n', 'Power Automate', 'Automated security pipelines', 'AI-assisted triage'],
    'Tool Dev': ['Python', 'Bash', 'Git', 'Custom security tools', 'Automated testing scripts', 'REST API integration'],
    'Infra & Cloud': ['AWS EC2', 'AWS S3', 'Terraform', 'Active Directory (GPO/OU)', 'Exchange Server', 'VMware ESXi', 'Hyper-V', 'Firewall configuration'],
    'Frameworks': ['OWASP Top 10', 'PTES', 'CVSS', 'Agile / Scrum', 'Jira']
  };

  const JOBS = [
    {
      role: 'Security Test Engineer', org: 'Zurich Insurance', place: 'Barcelona, Spain', when: 'Nov 2024 — Present', current: true,
      tags: ['OWASP WSTG', 'MSTG', 'CVSS', 'Python', 'Claude', 'OpenAI', 'N8n', 'AWS', 'Terraform', 'Jira'],
      points: [
        'Performed OWASP WSTG and MSTG-compliant assessments on web applications and REST APIs, covering the full test lifecycle from scoping and execution through to professional security reporting and CVSS risk rating.',
        'Developed custom security tools and automation workflows in Python using Claude, OpenAI and N8n to automate vulnerability triage, pentest report writing, finding classification and Jira ticket creation.',
        'Built AI-assisted testing pipelines to reduce manual effort in repetitive assessment tasks and extend coverage across large application surfaces.',
        'Managed AWS cloud infrastructure including EC2 and S3 provisioning, backup configuration and infrastructure-as-code deployments using Terraform.',
        'Coordinated test programmes with engineering and compliance teams, managing timelines, scope agreements and final deliverables across multiple concurrent engagements.'
      ]
    },
    {
      role: 'IT Technician', org: 'Laboratori DAU', place: 'Barcelona, Spain', when: 'Oct 2023 — Jun 2024',
      tags: ['Networking', 'PHP / Laravel', 'Active Directory', 'Exchange', 'VMware ESXi', 'Hyper-V'],
      points: [
        'Planned and executed a full network migration, redesigning the topology and replacing legacy infrastructure.',
        'Developed internal business applications using PHP/Laravel and other web frameworks to support company operations.',
        'Carried out internal security audits, assessing systems and processes against company security policies and flagging vulnerabilities.',
        'Reviewed firewall configuration, deployed endpoint protection and ran internal vulnerability scans covering misconfigurations and unpatched systems.',
        'Managed Active Directory (accounts, GPOs, OUs) and Exchange Server; maintained VMware ESXi and Hyper-V infrastructure including VM provisioning and hardware migration.'
      ]
    },
    {
      role: 'IT Intern', org: 'Greentube Malta', place: 'Birkirkara, Malta', when: 'May 2023 — Jul 2023',
      tags: ['IT Support', 'Asset management'],
      points: [
        'Handled IT support for the Malta office, resolving hardware, OS and software issues for staff across the building.',
        'Maintained the hardware asset inventory, tracking equipment from procurement through to disposal.'
      ]
    }
  ];

  const EDUCATION = [
    { year: '2025', title: "Master's in Cybersecurity", place: 'La Salle, Barcelona' },
    { year: '2024', title: 'Higher Technician — Network Systems Administration & Cybersecurity', place: 'STUCOM, Barcelona' },
    { year: '2022', title: 'High School Diploma', place: 'Angeleta Ferrer, Sant Cugat' },
    { year: '2020', title: 'Exchange Year — High School', place: 'Spencer County HS, Taylorsville KY, USA' }
  ];

  /* ---------------- Icons ---------------- */
  const ICONS = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3M7 15h10"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3M12 15h6"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>',
    code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
    contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
    link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>'
  };
  const icon = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>`;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- Toast ---------------- */
  const toastEl = $('#toast');
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }
  async function copy(text, msg = 'Copied to clipboard') {
    try { await navigator.clipboard.writeText(text); toast(msg); }
    catch { toast('Could not access clipboard'); }
  }

  /* ---------------- Theme ---------------- */
  const root = document.documentElement;
  const savedTheme = store.get('theme');
  root.dataset.theme = savedTheme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  function toggleTheme() {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    store.set('theme', root.dataset.theme);
  }
  $('#themeBtn').addEventListener('click', toggleTheme);

  /* ---------------- Pointer: glow, specular, tilt ---------------- */
  const glow = $('.cursor-glow');
  const finePointer = matchMedia('(pointer: fine)').matches;
  if (finePointer) {
    addEventListener('pointermove', e => {
      glow.style.setProperty('--cx', e.clientX + 'px');
      glow.style.setProperty('--cy', e.clientY + 'px');
    }, { passive: true });
  }
  /* ---------------- Reveal on scroll + counters ---------------- */
  function countUp(el) {
    let target = +el.dataset.count;
    if (el.hasAttribute('data-years')) {
      const start = new Date(2023, 4, 1); // May 2023 — first IT role
      target = Math.max(1, Math.floor((Date.now() - start) / 3.15576e10));
    }
    if (reduceMotion) { el.textContent = target; return; }
    const from = target > 1000 ? target - 25 : 0;
    const t0 = performance.now();
    const step = t => {
      const p = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      $$('[data-count]', en.target).forEach(countUp);
      $$('.ring', en.target).forEach(r => r.classList.add('in'));
      io.unobserve(en.target);
    });
  }, { threshold: .12 });
  const observeReveals = () => $$('.reveal:not(.in)').forEach(el => io.observe(el));

  /* ---------------- Hero rotator ---------------- */
  const phrases = ['AI-powered tooling', 'automated pentest reports', 'security pipelines', 'N8n workflows', 'custom Python tools'];
  const rot = $('#rotator');
  if (!reduceMotion) {
    let pi = 0, ci = phrases[0].length, deleting = true;
    const tick = () => {
      const word = phrases[pi];
      ci += deleting ? -1 : 1;
      rot.textContent = word.slice(0, ci);
      let delay = deleting ? 35 : 70;
      if (!deleting && ci === word.length) { deleting = true; delay = 2200; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 300; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2600);
  }

  /* ---------------- Clock ---------------- */
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, weekday: 'short' });
  function updateClock() {
    const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value]));
    const h = +parts.hour % 24, m = +parts.minute, s = +parts.second;
    $('#hH').style.transform = `rotate(${(h % 12) * 30 + m * .5}deg)`;
    $('#hM').style.transform = `rotate(${m * 6 + s * .1}deg)`;
    $('#hS').style.transform = `rotate(${s * 6}deg)`;
    $('#clockDigital').textContent = `${parts.hour}:${parts.minute}`;
    const weekend = parts.weekday === 'Sat' || parts.weekday === 'Sun';
    let status;
    if (h >= 0 && h < 7) status = ['Probably asleep', '#8e8e93'];
    else if (weekend) status = ['Weekend mode', '#64d2ff'];
    else if (h >= 9 && h < 18) status = ['Testing something', '#30d158'];
    else status = ['Building side projects', '#ff9f0a'];
    $('#clockStatus').innerHTML = `<span class="st-dot" style="--c:${status[1]}"></span>${status[0]}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------------- Skills ---------------- */
  const tabs = $('#skillTabs'), chips = $('#skillChips');
  const cats = ['All', ...Object.keys(SKILLS)];
  tabs.innerHTML = cats.map((c, i) => `<button role="tab" class="${i ? '' : 'on'}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  function renderSkills(cat) {
    const list = cat === 'All'
      ? Object.entries(SKILLS).flatMap(([k, v]) => v.map(s => [s, k]))
      : SKILLS[cat].map(s => [s, cat]);
    chips.innerHTML = list.map(([s, k], i) =>
      `<span class="chip glass" style="--i:${i}">${esc(s)}${cat === 'All' ? `<span class="cat">${esc(k)}</span>` : ''}</span>`).join('');
  }
  tabs.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', tabs).forEach(x => x.classList.toggle('on', x === b));
    renderSkills(b.dataset.cat);
  });
  renderSkills('All');

  /* ---------------- Timeline ---------------- */
  $('#timeline').innerHTML = JOBS.map((j, i) => `
    <article class="card glass job reveal ${j.current ? 'current open' : ''}" style="--d:${i * .08}s" tabindex="0" aria-expanded="${!!j.current}">
      <div class="job-head">
        <div><h3>${esc(j.role)}</h3><div class="org">${esc(j.org)} · ${esc(j.place)}</div></div>
        <span class="when ${j.current ? 'now' : ''}">${j.current ? '● ' : ''}${esc(j.when)}</span>
      </div>
      <div class="job-tags">${j.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="job-body"><div><ul>${j.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div></div>
      <span class="toggle">${j.current ? 'Show less' : 'Show details'}</span>
    </article>`).join('');
  $$('.job').forEach(job => {
    const toggle = () => {
      const open = job.classList.toggle('open');
      job.setAttribute('aria-expanded', open);
      $('.toggle', job).textContent = open ? 'Show less' : 'Show details';
    };
    job.addEventListener('click', toggle);
    job.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
  $('#eduGrid').innerHTML = EDUCATION.map((e, i) => `
    <div class="card glass tilt edu reveal" style="--d:${i * .06}s">
      <div class="year">${e.year}</div><h4>${esc(e.title)}</h4><p>${esc(e.place)}</p>
    </div>`).join('');

  /* ---------------- Terminal ---------------- */
  const out = $('#termOut'), tin = $('#termIn'), term = $('#terminal');
  const history = []; let hIdx = 0;
  const print = (html = '') => { const d = document.createElement('div'); d.className = 'line'; d.innerHTML = html; out.appendChild(d); term.scrollTop = term.scrollHeight; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const COMMANDS = {
    help: () => [
      '<span class="t-yel">Available commands</span>',
      '  <span class="t-acc">whoami</span>      who is this guy?',
      '  <span class="t-acc">skills</span>      list the toolkit',
      '  <span class="t-acc">experience</span>  work history',
      '  <span class="t-acc">education</span>   degrees & studies',
      '  <span class="t-acc">contact</span>     how to reach me',
      '  <span class="t-acc">nmap</span>        scan this portfolio',
      '  <span class="t-acc">theme</span>       toggle light / dark',
      '  <span class="t-acc">goto</span> &lt;x&gt;   jump to a section',
      '  <span class="t-acc">clear</span>       clean the screen',
      '<span class="t-dim">  …and a few hidden ones. Try sudo.</span>'
    ],
    whoami: () => [
      '<span class="t-grn">Alvaro Lacasa Vela</span> — Security Test Engineer @ Zurich Insurance',
      'Web/API security testing · OWASP WSTG/MSTG · CVSS · AI automation',
      'Barcelona, Spain'
    ],
    skills: () => Object.entries(SKILLS).map(([k, v]) => `<span class="t-mag">${esc(k).padEnd(17)}</span>${esc(v.join(', '))}`),
    experience: () => JOBS.map(j => `<span class="t-acc">${esc(j.when).padEnd(20)}</span>${esc(j.role)} <span class="t-dim">@ ${esc(j.org)}</span>`),
    education: () => EDUCATION.map(e => `<span class="t-acc">${e.year}</span>  ${esc(e.title)} <span class="t-dim">— ${esc(e.place)}</span>`),
    contact: () => [
      'email     use the <span class="t-acc">Copy email</span> button in the contact section',
      'linkedin  <a class="t-acc" href="https://www.linkedin.com/in/alvaro-lacasa-vela-363557210" target="_blank" rel="noopener">/in/alvaro-lacasa-vela</a>',
      'github    <a class="t-acc" href="https://github.com/alvaro004lv" target="_blank" rel="noopener">@alvaro004lv</a>'
    ],
    theme: () => { toggleTheme(); return [`Theme set to <span class="t-yel">${root.dataset.theme}</span>`]; },
    date: () => [new Date().toString()],
    ls: () => ['<span class="t-acc">about/</span>  <span class="t-acc">skills/</span>  <span class="t-acc">experience/</span>  <span class="t-acc">lab/</span>  <span class="t-acc">contact/</span>  cv.pdf  <span class="t-dim">.secrets</span>'],
    'cat .secrets': () => ['<span class="t-red">Permission denied.</span> Nice try though.'],
    'cat cv.pdf': () => ['<span class="t-dim">%PDF-1.7 ������ … binary garbage. Try</span> <span class="t-acc">experience</span> <span class="t-dim">instead.</span>'],
    sudo: () => ['<span class="t-red">alvaro is not in the sudoers file.</span> This incident will be reported.'],
    'sudo hire-me': () => ['<span class="t-grn">[sudo] access granted.</span>', 'Opening contact channel…'],
    'rm -rf /': () => ['<span class="t-red">Blocked by EDR.</span> Defense in depth, my friend.'],
    exit: () => ['There is no escape. Type <span class="t-acc">help</span>.'],
    hack: () => ['I only hack with written authorisation and a signed scope.']
  };

  async function nmap() {
    const lines = [
      '<span class="t-dim">Starting Nmap 7.95 ( https://nmap.org )</span>',
      'Nmap scan report for <span class="t-acc">alvaro.portfolio</span> (127.0.0.1)',
      'Host is up (0.0013s latency).',
      '',
      'PORT     STATE  SERVICE',
      '22/tcp   <span class="t-grn">open</span>   ssh-curiosity',
      '80/tcp   <span class="t-grn">open</span>   web-app-testing',
      '443/tcp  <span class="t-grn">open</span>   api-security',
      '1337/tcp <span class="t-grn">open</span>   ai-automation',
      '3389/tcp <span class="t-red">closed</span> bad-habits',
      '',
      '<span class="t-yel">Service Info:</span> OS: Kali Linux; Device: coffee-powered',
      '<span class="t-dim">Nmap done: 1 IP address (1 host up) scanned in 1.37 seconds</span>'
    ];
    for (const l of lines) { print(l); await sleep(reduceMotion ? 0 : 110); }
  }

  async function run(raw) {
    const cmd = raw.trim().replace(/\s+/g, ' ');
    print(`<span class="prompt">alvaro@kali:~$</span> ${esc(cmd)}`);
    if (!cmd) return;
    history.push(cmd); hIdx = history.length;
    const lc = cmd.toLowerCase();
    if (lc === 'clear') { out.innerHTML = ''; return; }
    if (lc.startsWith('nmap')) return nmap();
    if (lc.startsWith('echo ')) return print(esc(cmd.slice(5)));
    if (lc.startsWith('goto') || lc.startsWith('cd ')) {
      const target = lc.split(' ')[1] || '';
      const sec = ['home', 'about', 'skills', 'experience', 'lab', 'contact'].find(s => s.startsWith(target.replace(/\/$/, '')) && target);
      if (sec) { document.getElementById(sec).scrollIntoView({ behavior: 'smooth' }); return print(`→ /${sec}`); }
      return print('<span class="t-red">usage:</span> goto about|skills|experience|lab|contact');
    }
    const fn = Object.hasOwn(COMMANDS, lc) ? COMMANDS[lc] : null;
    if (fn) { fn().forEach(l => print(l)); if (lc === 'sudo hire-me') setTimeout(() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }), 900); return; }
    print(`<span class="t-red">command not found:</span> ${esc(cmd.split(' ')[0])} — type <span class="t-acc">help</span>`);
  }

  tin.addEventListener('keydown', e => {
    if (e.key === 'Enter') { run(tin.value); tin.value = ''; }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (hIdx > 0) tin.value = history[--hIdx]; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); hIdx = Math.min(history.length, hIdx + 1); tin.value = history[hIdx] || ''; }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const all = [...Object.keys(COMMANDS), 'clear', 'nmap', 'goto', 'echo'];
      const m = all.filter(c => c.startsWith(tin.value.toLowerCase()));
      if (m.length === 1) tin.value = m[0];
      else if (m.length > 1) print(`<span class="t-dim">${m.join('  ')}</span>`);
    } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
  });
  term.addEventListener('click', () => { if (!getSelection().toString()) tin.focus({ preventScroll: true }); });

  (async () => {
    const boot = [
      '<span class="t-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>',
      '<span class="t-grn">Welcome!</span> This terminal is real — try typing <span class="t-acc">help</span>.',
      ''
    ];
    for (const l of boot) { print(l); await sleep(reduceMotion ? 0 : 250); }
  })();

  /* ---------------- Encoder / decoder ---------------- */
  let encMode = 'url', encDir = 'enc';
  const encIn = $('#encIn'), encOut = $('#encOut');
  const utf8 = new TextEncoder(), fromUtf8 = new TextDecoder('utf-8', { fatal: true });
  const bytesToBin = bytes => { let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return s; };
  const CODEC = {
    url: {
      enc: s => encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase()),
      dec: s => decodeURIComponent(s.replace(/\+/g, ' '))
    },
    b64: {
      enc: s => btoa(bytesToBin(utf8.encode(s))),
      dec: s => fromUtf8.decode(Uint8Array.from(atob(s.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)))
    },
    html: {
      enc: s => s.replace(/[&<>"'\/`=]/g, c => '&#x' + c.charCodeAt(0).toString(16) + ';'),
      // DOMParser builds an inert document: nothing in it is rendered or executed
      dec: s => new DOMParser().parseFromString(`<!doctype html><body><textarea>${s.replace(/<\/textarea/gi, '&lt;/textarea')}</textarea>`, 'text/html').querySelector('textarea').value
    },
    hex: {
      enc: s => [...utf8.encode(s)].map(b => '\\x' + b.toString(16).padStart(2, '0')).join(''),
      dec: s => {
        const clean = s.replace(/\\x|0x|%|\s|,/gi, '');
        if (!/^(?:[0-9a-f]{2})*$/i.test(clean)) throw new Error('bad hex');
        return fromUtf8.decode(Uint8Array.from(clean.match(/../g) || [], h => parseInt(h, 16)));
      }
    }
  };
  function doEnc() {
    try {
      encOut.classList.remove('err');
      encOut.textContent = encIn.value ? CODEC[encMode][encDir](encIn.value) : '…';
    } catch {
      encOut.classList.add('err');
      encOut.textContent = `Input is not valid ${$(`#encMode [data-m="${encMode}"]`).textContent}`;
    }
  }
  function bindSegment(group, attr, set) {
    const btns = $$('button', group);
    const select = b => {
      btns.forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; });
      set(b.dataset[attr]);
      doEnc();
    };
    group.addEventListener('click', e => { const b = e.target.closest('button'); if (b && group.contains(b)) select(b); });
    group.addEventListener('keydown', e => {
      const i = btns.indexOf(document.activeElement);
      if (i < 0 || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const n = btns[(i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length];
      n.focus(); select(n);
    });
  }
  bindSegment($('#encMode'), 'm', v => { encMode = v; });
  bindSegment($('#encDir'), 'd', v => { encDir = v; });
  encIn.addEventListener('input', doEnc);
  $('#encSwap').addEventListener('click', () => {
    if (encOut.classList.contains('err') || encOut.textContent === '…') return;
    encIn.value = encOut.textContent;
    $(`#encDir [data-d="${encDir === 'enc' ? 'dec' : 'enc'}"]`).click();
  });
  encOut.addEventListener('click', () => { if (!encOut.classList.contains('err')) copy(encOut.textContent, 'Output copied'); });
  doEnc();

  /* ---------------- OWASP Top 10 (2021) quiz ---------------- */
  const CATS = {
    A01: 'A01 Broken Access Control',
    A02: 'A02 Cryptographic Failures',
    A03: 'A03 Injection',
    A04: 'A04 Insecure Design',
    A05: 'A05 Security Misconfiguration',
    A06: 'A06 Vulnerable & Outdated Components',
    A07: 'A07 Identification & Auth Failures',
    A08: 'A08 Software & Data Integrity Failures',
    A09: 'A09 Logging & Monitoring Failures',
    A10: 'A10 Server-Side Request Forgery'
  };
  const POOL = [
    ['Changing /api/orders/1001 to /api/orders/1002 shows another customer\'s order.', 'A01'],
    ['A regular user opens /admin/dashboard just by typing the URL.', 'A01'],
    ['A download endpoint returns /etc/passwd when given ?file=../../../etc/passwd.', 'A01'],
    ['A malicious site makes a logged-in victim\'s browser submit a money transfer — the form has no anti-CSRF token.', 'A01'],
    ['Any user can delete other people\'s comments by sending DELETE /comments/{id}.', 'A01'],
    ['Passwords are stored as unsalted MD5 hashes.', 'A02'],
    ['The login page is served over plain HTTP.', 'A02'],
    ['Card numbers are stored in the database in plaintext.', 'A02'],
    ['Sensitive records are encrypted with DES in ECB mode.', 'A02'],
    ['The AES key used to encrypt user data is hard-coded in the mobile app.', 'A02'],
    ['Entering \' OR 1=1-- in the login form returns every user record.', 'A03'],
    ['A comment containing <script> runs in every visitor\'s browser.', 'A03'],
    ['A "ping a host" field runs ; cat /etc/passwd on the server.', 'A03'],
    ['Submitting {{7*7}} in a profile field renders 49 on the page.', 'A03'],
    ['A group-booking discount has no seat limit, so one attacker reserves an entire cinema.', 'A04'],
    ['Checkout trusts the price sent in the request body by the client.', 'A04'],
    ['A referral programme lets one person create unlimited accounts to farm rewards.', 'A04'],
    ['Bots buy every limited-edition GPU in seconds because the flow was never designed against scalpers.', 'A04'],
    ['Production shows full stack traces, and admin:admin still works.', 'A05'],
    ['A cloud storage bucket with customer exports is publicly listable.', 'A05'],
    ['The XML parser resolves external entities, leaking local files (XXE).', 'A05'],
    ['Directory listing is enabled and exposes backup.zip with the source code.', 'A05'],
    ['Unused sample apps and debug consoles are left enabled on the production server.', 'A05'],
    ['The app still ships a Log4j version vulnerable to Log4Shell.', 'A06'],
    ['WordPress plugins haven\'t been updated in years and have public CVEs.', 'A06'],
    ['The frontend loads jQuery 1.x with known XSS vulnerabilities.', 'A06'],
    ['A public server runs an OS that stopped receiving security patches years ago.', 'A06'],
    ['Attackers replay leaked username/password pairs and the app allows unlimited attempts.', 'A07'],
    ['Session IDs are not invalidated after logout.', 'A07'],
    ['The session ID is placed in the URL and leaks through the Referer header.', 'A07'],
    ['Users can sign up with "Password1" and there is no MFA option.', 'A07'],
    ['An auto-updater installs unsigned packages from an untrusted mirror.', 'A08'],
    ['A cookie holds a serialised Java object that the server deserialises blindly.', 'A08'],
    ['Anyone with repo access can push straight to production — no review, no signed builds.', 'A08'],
    ['A third-party script is loaded from a CDN without Subresource Integrity.', 'A08'],
    ['A brute-force attack ran for days and nobody got an alert.', 'A09'],
    ['Failed logins and high-value transactions are never logged.', 'A09'],
    ['Logs live only on the web server and rotate every few hours, so the breach can\'t be investigated.', 'A09'],
    ['WAF alerts are sent to a mailbox nobody reads.', 'A09'],
    ['The app fetches any URL a user submits — including http://169.254.169.254/.', 'A10'],
    ['A PDF generator renders user HTML that loads http://localhost:8080/admin.', 'A10'],
    ['A webhook "test URL" feature lets attackers scan internal ports.', 'A10'],
    ['"Import image from URL" returns the server\'s internal metadata endpoint response.', 'A10']
  ];
  const QUIZ_LEN = 10;
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const qEls = { q: $('#quizQ'), opts: $('#quizOpts'), fb: $('#quizFeedback'), next: $('#quizNext'), score: $('#quizScore'), prog: $('#quizProg'), res: $('#quizResult'), body: $('#quizBody') };
  let seen = new Set(), round = [], qi = 0, right = 0, missed = [];

  function newTest() {
    // Prefer questions not seen yet; reset once the pool is exhausted
    let fresh = POOL.map((_, i) => i).filter(i => !seen.has(i));
    if (fresh.length < QUIZ_LEN) { seen = new Set(); fresh = POOL.map((_, i) => i); }
    round = shuffle(fresh).slice(0, QUIZ_LEN);
    round.forEach(i => seen.add(i));
    qi = 0; right = 0; missed = [];
    qEls.res.hidden = true; qEls.body.hidden = false;
    showQ();
  }
  function showQ() {
    const [q, code] = POOL[round[qi]];
    const wrong = shuffle(Object.keys(CATS).filter(c => c !== code)).slice(0, 3);
    qEls.q.textContent = q;
    qEls.fb.className = '';
    qEls.fb.textContent = 'Which OWASP 2021 category?';
    qEls.opts.innerHTML = shuffle([code, ...wrong]).map(c => `<button data-c="${c}">${esc(CATS[c])}</button>`).join('');
    qEls.next.hidden = true;
    qEls.next.textContent = qi === QUIZ_LEN - 1 ? 'See results' : 'Next →';
    qEls.prog.style.width = (qi / QUIZ_LEN) * 100 + '%';
    qEls.score.textContent = `Question ${qi + 1} / ${QUIZ_LEN}`;
  }
  qEls.opts.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    const [q, code] = POOL[round[qi]];
    const ok = b.dataset.c === code;
    if (ok) right++; else missed.push([q, code]);
    $$('button', qEls.opts).forEach(x => { x.disabled = true; if (x.dataset.c === code) x.classList.add('right'); });
    if (!ok) b.classList.add('wrong');
    qEls.fb.className = ok ? 'ok' : 'bad';
    qEls.fb.textContent = ok ? 'Correct!' : 'Not quite';
    qEls.prog.style.width = ((qi + 1) / QUIZ_LEN) * 100 + '%';
    qEls.next.hidden = false;
    qEls.next.focus({ preventScroll: true });
  });
  qEls.next.addEventListener('click', () => {
    if (++qi < QUIZ_LEN) return showQ();
    const pct = Math.round((right / QUIZ_LEN) * 100);
    const verdict = pct === 100 ? 'Flawless. Ready for the next engagement.'
      : pct >= 80 ? 'Great work — you know your Top 10.'
      : pct >= 50 ? 'Solid base. A bit more reading and you\'ve got it.'
      : 'Good start — check the OWASP Top 10 and try again.';
    qEls.body.hidden = true; qEls.res.hidden = false;
    qEls.score.textContent = 'Finished';
    $('#quizFinal').textContent = `${right} / ${QUIZ_LEN}`;
    $('#quizPct').textContent = pct + '%';
    $('#quizVerdict').textContent = verdict;
    $('#quizRing').style.setProperty('--p', pct);
    $('#quizMissed').innerHTML = missed.length
      ? '<p class="miss-title">Review these:</p>' + missed.map(([q, c]) => `<li><b>${esc(CATS[c])}</b>${esc(q)}</li>`).join('')
      : '';
  });
  $('#quizRestart').addEventListener('click', newTest);
  $('#quizNew').addEventListener('click', newTest);
  newTest();

  /* ---------------- Copy email ----------------
     The address is never present as text in the HTML or JS; it is
     rebuilt from an obfuscated byte array only when the button is clicked. */
  const EM = [59, 120, 15, 88, 47, 22, 23, 42, 117, 29, 125, 45, 66, 89, 85, 86, 15, 97, 18, 163, 187, 225, 132, 225, 199, 150, 202, 167];
  const EK = [0x5A, 0x13, 0x77, 0x2C, 0x41];
  const contactAddress = () => String.fromCharCode(...EM.map((b, i) => b ^ EK[i % EK.length] ^ (i * 7 & 0xff)));
  async function copyEmail() {
    const addr = contactAddress();
    try { await navigator.clipboard.writeText(addr); toast('Email copied'); }
    catch { toast(addr); }
  }
  $('#copyEmail').addEventListener('click', copyEmail);

  /* ---------------- Dock magnification + active section ---------------- */
  const dock = $('#dock');
  const dockItems = $$('a, button', dock);
  const baseSize = () => (innerWidth <= 560 ? 38 : 48);
  if (finePointer && !reduceMotion) {
    dock.addEventListener('pointermove', e => {
      const base = baseSize();
      dockItems.forEach(it => {
        const r = it.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const scale = 1 + Math.max(0, 1 - d / 140) * .55;
        it.style.width = it.style.height = base * scale + 'px';
      });
    });
    dock.addEventListener('pointerleave', () => dockItems.forEach(it => { it.style.width = it.style.height = ''; }));
  }
  $('#dockTerm').addEventListener('click', () => {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => tin.focus({ preventScroll: true }), 500);
  });
  const navLinks = [...$$('.toplinks a'), ...$$('a', dock)];
  const secIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section').forEach(s => secIO.observe(s));

  /* ---------------- Spotlight (Ctrl/⌘ K) ---------------- */
  const sp = $('#spotlight'), spIn = $('#spIn'), spList = $('#spList');
  const ITEMS = [
    { icon: 'home', t: 'Home', s: 'Section', go: '#home' },
    { icon: 'user', t: 'About me', s: 'Section', go: '#about' },
    { icon: 'layers', t: 'Skills', s: 'Section', go: '#skills' },
    { icon: 'briefcase', t: 'Experience', s: 'Section', go: '#experience' },
    { icon: 'cap', t: 'Education', s: 'Section', go: '#eduGrid' },
    { icon: 'flask', t: 'Lab', s: 'Section', go: '#lab' },
    { icon: 'help', t: 'OWASP Top 10 Quiz', s: 'Widget', go: '#quizQ' },
    { icon: 'code', t: 'Payload Encoder / Decoder', s: 'Widget', go: '#encIn' },
    { icon: 'terminal', t: 'Open terminal', s: 'Action', act: () => $('#dockTerm').click() },
    { icon: 'contrast', t: 'Toggle theme', s: 'Action', act: toggleTheme },
    { icon: 'mail', t: 'Copy email', s: 'Action', act: () => copyEmail() },
    { icon: 'link', t: 'LinkedIn', s: 'Link', url: 'https://www.linkedin.com/in/alvaro-lacasa-vela-363557210' },
    { icon: 'link', t: 'GitHub', s: 'Link', url: 'https://github.com/alvaro004lv' },
    ...JOBS.map(j => ({ icon: 'building', t: `${j.role} — ${j.org}`, s: 'Experience', go: '#timeline' })),
    ...Object.values(SKILLS).flat().map(k => ({ icon: 'tag', t: k, s: 'Skill', go: '#skills' }))
  ];
  let spSel = 0, spResults = [];
  function renderSp() {
    const q = spIn.value.trim().toLowerCase();
    spResults = (q ? ITEMS.filter(i => i.t.toLowerCase().includes(q) || i.s.toLowerCase().includes(q)) : ITEMS.slice(0, 8)).slice(0, 9);
    spSel = Math.min(spSel, Math.max(0, spResults.length - 1));
    spList.innerHTML = spResults.map((r, i) => `<li class="${i === spSel ? 'sel' : ''}" data-i="${i}">${icon(r.icon)}${esc(r.t)}<small>${r.s}</small></li>`).join('');
  }
  function openSp() { sp.hidden = false; spIn.value = ''; spSel = 0; renderSp(); setTimeout(() => spIn.focus(), 10); }
  function closeSp() { sp.hidden = true; }
  function pick(r) {
    if (!r) return;
    closeSp();
    if (r.act) r.act();
    else if (r.url) window.open(r.url, '_blank', 'noopener');
    else { const el = $(r.go); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (/INPUT|TEXTAREA/.test(el.tagName)) setTimeout(() => el.focus({ preventScroll: true }), 500); }
  }
  $('#spotlightBtn').addEventListener('click', openSp);
  spIn.addEventListener('input', () => { spSel = 0; renderSp(); });
  spIn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); spSel = (spSel + 1) % (spResults.length || 1); renderSp(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); spSel = (spSel - 1 + spResults.length) % (spResults.length || 1); renderSp(); }
    else if (e.key === 'Enter') pick(spResults[spSel]);
  });
  spList.addEventListener('click', e => { const li = e.target.closest('li'); if (li) pick(spResults[+li.dataset.i]); });
  sp.addEventListener('click', e => { if (e.target === sp) closeSp(); });
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); sp.hidden ? openSp() : closeSp(); }
    else if (e.key === 'Escape' && !sp.hidden) closeSp();
  });

  function bindPointer() {
  $$('.glass').forEach(el => {
    if (el._hl) return; el._hl = 1;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  });
  if (finePointer && !reduceMotion) {
    $$('.tilt').forEach(el => {
      if (el._tl) return; el._tl = 1;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        const k = el.classList.contains('terminal-card') ? 3 : 7;
        el.style.transform = `perspective(900px) rotateX(${-y * k}deg) rotateY(${x * k}deg) translateY(-3px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
  }

  /* ---------------- Misc ---------------- */
  $('#year').textContent = new Date().getFullYear();
  observeReveals();
  bindPointer();

  console.log('%cHey, curious one!', 'font-size:18px;font-weight:700');
  console.log('%cLike poking around DevTools? So do I.', 'color:#0a84ff');
})();
