(() => {
  'use strict';
  const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  const body=document.body;
  const sidebar=qs('#sidebar'), menu=qs('#menuToggle'), backdrop=qs('#sidebarBackdrop');
  function setMenu(open){sidebar.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));backdrop.hidden=!open;}
  menu?.addEventListener('click',()=>setMenu(!sidebar.classList.contains('open'))); backdrop?.addEventListener('click',()=>setMenu(false));
  qsa('#toc a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<901)setMenu(false)}));

  const sections=qsa('main section[id]'), links=qsa('#toc a[href^="#"]');
  const io=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]; if(!visible)return; links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id));},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.25,.5]});
  sections.forEach(s=>io.observe(s));

  qs('#presentationToggle')?.addEventListener('click',()=>body.classList.toggle('presentation'));
  const motion=qs('#motionToggle');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){body.classList.add('no-motion'); motion.textContent='Animações: reduzidas'; motion.setAttribute('aria-pressed','false');}
  motion?.addEventListener('click',()=>{const paused=body.classList.toggle('motion-paused');motion.textContent=paused?'Animações: pausadas':'Animações: ativas';motion.setAttribute('aria-pressed',String(!paused));});

  const captions=[
    'Exemplo: “18” é apenas um registro até sabermos o que representa, em que unidade e em qual contexto.',
    '“18 estudantes entregaram a atividade” é informação: o registro ganhou significado em um contexto.',
    'A informação é comunicada à equipe ou à turma por um canal adequado, com linguagem e finalidade definidas.',
    'Ao combinar informação, experiência e explicação, o professor interpreta padrões e compreende a situação.',
    'A decisão pode ser ajustar prazo, oferecer apoio ou revisar a atividade — sempre justificando a ação.'
  ]; let flowIndex=0;
  qs('[data-flow-next]')?.addEventListener('click',()=>{const nodes=qsa('.flow-node'); flowIndex=(flowIndex+1)%nodes.length; nodes.forEach((n,i)=>n.classList.toggle('active',i===flowIndex)); qs('[data-flow-caption]').textContent=captions[flowIndex];});

  const comm={sync:'<strong>Exemplo síncrono</strong><p>Uma orientação de projeto com dúvidas encadeadas pode ganhar agilidade em encontro ao vivo. O custo é exigir presença simultânea e conexão estável.</p>',async:'<strong>Exemplo assíncrono</strong><p>Um fórum de análise permite que estudantes leiam, formulem argumentos e retornem em horários diferentes. O custo é exigir instruções claras, prazos e acompanhamento do fluxo de respostas.</p>'};
  qsa('[data-comm]').forEach(b=>b.addEventListener('click',()=>{qsa('[data-comm]').forEach(x=>x.classList.toggle('active',x===b));qs('[data-comm-panel]').innerHTML=comm[b.dataset.comm];}));

  function updateScore(){const vals=qsa('[data-score]').map(i=>Number(i.value));const score=Math.round(vals.reduce((a,b)=>a+b,0)/(vals.length*5)*100);qs('#scoreOutput').textContent=score+'/100';}
  qsa('[data-score]').forEach(i=>i.addEventListener('input',updateScore)); updateScore();

  const nodeText={conceito:'Conceito: ponto de referência para o estudante construir uma definição.',exemplo:'Exemplo: concretiza o conceito em uma situação reconhecível.',video:'Demonstração: mostra processo, mudança ou relação difícil de perceber apenas por texto.',pratica:'Prática: exige ação do estudante e produz uma evidência observável.',reflexao:'Reflexão: conecta experiência, limites e possibilidades de uso.'};
  qsa('[data-node]').forEach(b=>b.addEventListener('click',()=>{qsa('[data-node]').forEach(x=>x.classList.toggle('active',x===b));qs('[data-hyper-text]').textContent=nodeText[b.dataset.node];}));
  qs('[data-hyper-reset]')?.addEventListener('click',()=>{qsa('[data-node]').forEach(x=>x.classList.remove('active'));qs('[data-hyper-text]').textContent='Escolha um nó. A navegação deve ajudar o estudante a compreender relações, não apenas oferecer muitos caminhos.';});

  qsa('.copy-btn').forEach(btn=>btn.addEventListener('click',async()=>{const code=btn.closest('.example-cell').querySelector('code').innerText; try{await navigator.clipboard.writeText(code);btn.textContent='Copiado';setTimeout(()=>btn.textContent='Copiar',1400)}catch{btn.textContent='Selecione e copie';}}));

  const action=qs('#selectionAction'), dialog=qs('#focusDialog'), focusContent=qs('#focusContent'); let selected=''; let fontSize=Number(localStorage.getItem('tdicFocusFont')||32);
  function hideAction(){action.hidden=true;}
  document.addEventListener('selectionchange',()=>{const sel=getSelection(); if(!sel || sel.isCollapsed || dialog.open){hideAction();return;} const text=sel.toString().trim(); if(text.length<3){hideAction();return;} const range=sel.getRangeAt(0); const node=range.commonAncestorContainer.nodeType===1?range.commonAncestorContainer:range.commonAncestorContainer.parentElement; if(!qs('main')?.contains(node)){hideAction();return;} selected=text; const r=range.getBoundingClientRect(); action.style.left=Math.max(8,Math.min(innerWidth-180,r.left+r.width/2-75))+'px'; action.style.top=Math.max(76,r.bottom+8)+'px'; action.hidden=false;});
  document.addEventListener('mousedown',e=>{if(e.target!==action&&!action.contains(e.target))setTimeout(hideAction,0)});
  function applyFont(){focusContent.style.fontSize=fontSize+'px';qs('[data-font="reset"]').textContent=Math.round(fontSize/32*100)+'%';localStorage.setItem('tdicFocusFont',String(fontSize));}
  action?.addEventListener('click',()=>{focusContent.textContent=selected;applyFont();dialog.showModal();hideAction();getSelection()?.removeAllRanges();});
  qs('[data-close]')?.addEventListener('click',()=>dialog.close());
  qs('[data-font="up"]')?.addEventListener('click',()=>{fontSize=Math.min(72,fontSize+4);applyFont()});
  qs('[data-font="down"]')?.addEventListener('click',()=>{fontSize=Math.max(18,fontSize-4);applyFont()});
  qs('[data-font="reset"]')?.addEventListener('click',()=>{fontSize=32;applyFont()});
  qs('[data-fullscreen]')?.addEventListener('click',()=>{if(!document.fullscreenElement)dialog.requestFullscreen?.();else document.exitFullscreen?.();});
  document.addEventListener('keydown',e=>{if(!dialog.open)return; if(e.key==='+'||e.key==='='){e.preventDefault();fontSize=Math.min(72,fontSize+4);applyFont()} if(e.key==='-'){e.preventDefault();fontSize=Math.max(18,fontSize-4);applyFont()} if(e.key.toLowerCase()==='f'){e.preventDefault();if(!document.fullscreenElement)dialog.requestFullscreen?.();else document.exitFullscreen?.();}});

  const answerDialog=qs('#answerWarningDialog'), answerConfirm=qs('#answerConfirm');
  let pendingAnswerButton=null;

  function revealAnswer(btn){
    const targetId=btn?.dataset.answerTarget;
    const panel=targetId?document.getElementById(targetId):null;
    if(!panel)return;
    panel.hidden=false;
    btn.setAttribute('aria-expanded','true');
    btn.textContent='Ocultar resposta';
    requestAnimationFrame(()=>panel.focus({preventScroll:true}));
    panel.scrollIntoView({behavior:body.classList.contains('no-motion')||body.classList.contains('motion-paused')?'auto':'smooth',block:'nearest'});
  }

  function hideAnswer(btn){
    const targetId=btn?.dataset.answerTarget;
    const panel=targetId?document.getElementById(targetId):null;
    if(!panel)return;
    panel.hidden=true;
    btn.setAttribute('aria-expanded','false');
    btn.textContent='Ver resposta';
    btn.focus();
  }

  qsa('.answer-toggle').forEach(btn=>btn.addEventListener('click',()=>{
    const targetId=btn.dataset.answerTarget;
    const panel=targetId?document.getElementById(targetId):null;
    if(!panel)return;
    if(!panel.hidden){hideAnswer(btn);return;}
    pendingAnswerButton=btn;
    if(answerDialog?.showModal)answerDialog.showModal();
    else if(window.confirm('Faça primeiro a sua tentativa. Deseja consultar a resposta de referência mesmo assim?'))revealAnswer(btn);
  }));

  answerConfirm?.addEventListener('click',()=>{
    if(pendingAnswerButton)revealAnswer(pendingAnswerButton);
    pendingAnswerButton=null;
  });

  answerDialog?.addEventListener('close',()=>{
    if(answerDialog.returnValue!=='confirm')pendingAnswerButton=null;
  });

})();