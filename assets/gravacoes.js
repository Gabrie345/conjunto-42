/* Gravações dos trabalhos: tocam só na tela. Se o aparelho bloquear, aparece o botão. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const gravacoes = [...document.querySelectorAll('.gravacao')];
  const mostraBotao = v => { v.nextElementSibling.hidden = false; };

  gravacoes.forEach(v => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'tocar';
    botao.hidden = true;
    botao.setAttribute('aria-label', 'Tocar: ' + v.getAttribute('aria-label'));
    botao.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    botao.addEventListener('click', () => v.play().catch(() => {}));
    v.addEventListener('playing', () => { botao.hidden = true; });
    v.after(botao);
  });

  const obs = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (!e.isIntersecting) { v.pause(); return; }
    if (RM.matches) { mostraBotao(v); return; }
    v.play().catch(erro => { if (erro.name === 'NotAllowedError') mostraBotao(v); });
  }), { threshold: .25 });
  gravacoes.forEach(v => obs.observe(v));

  RM.addEventListener('change', e => {
    if (e.matches) gravacoes.forEach(v => { v.pause(); mostraBotao(v); });
  });
})();
