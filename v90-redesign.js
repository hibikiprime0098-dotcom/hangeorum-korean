(()=>{
if(window.__HANGEORUM_V90_REDESIGN__)return;window.__HANGEORUM_V90_REDESIGN__=true;
const css=`
:root{--ux-bg:#f6f6f3;--ux-ink:#111;--ux-muted:#767676;--ux-line:#e8e8e3;--ux-surface:#fff;--ux-accent:#111;--ux-pink:#f2a6c4;--ux-blue:#9bc8f5;--ux-radius:22px;--ux-shadow:0 10px 30px rgba(0,0,0,.055)}
body{background:var(--ux-bg)!important}
.main{padding-top:24px!important}.wrap{max-width:1080px!important}
.topbar{position:sticky;top:0;z-index:40;padding:14px 0 12px;margin-bottom:18px;background:linear-gradient(to bottom,var(--ux-bg) 78%,rgba(246,246,243,0));backdrop-filter:blur(8px)}
.topbar h1{font-size:30px!important;letter-spacing:-.05em}.eyebrow{letter-spacing:.18em!important}
.card{border-radius:var(--ux-radius)!important;box-shadow:var(--ux-shadow);border-color:var(--ux-line)!important}
.hero,.growthHero{border-radius:26px!important;box-shadow:0 18px 48px rgba(0,0,0,.11)!important}
.hero h2,.growthHero h2{letter-spacing:-.05em!important;line-height:1.25!important}
.pill{font-size:10px!important;padding:7px 11px!important}
.primary,.secondary,.ghost{border-radius:14px!important;min-height:46px!important;padding:11px 16px!important;font-weight:850!important}
.heroActions{gap:9px!important}
.sectionTitle{margin-top:30px!important}.sectionTitle h2{font-size:20px!important}
.metric,.miniLaunch,.roadLevel,.lesson,.skill,.grammarCard,.vocabRow{box-shadow:none!important}
.metric{border-radius:17px!important}.metric strong{font-size:25px!important}
.lesson{border-radius:18px!important;padding:15px!important}.lessonNum{border-radius:13px!important}
.roadLevel{border-radius:19px!important;padding:18px!important}
.option{border-radius:15px!important;padding:15px!important;min-height:52px}.option.selected{box-shadow:0 0 0 2px rgba(17,17,17,.08)}
.feedback{border-radius:15px!important}
.progressTrack{height:7px!important}
.vocabHero,.grammarHero{border-radius:26px!important}
.vocabRow{border-radius:17px!important}.vocabWord{letter-spacing:-.03em}
.grammarCard{border-radius:20px!important}.grammarUsage,.grammarExample,.grammarNote{border-radius:15px!important}
.growthHero .primary{background:#fff!important;color:#111!important;border-color:#fff!important}.growthHero .ghost{color:#fff!important;border-color:#5c5c5c!important;background:rgba(255,255,255,.04)!important}
.growthHero .ghost:hover{background:rgba(255,255,255,.09)!important}
.v90Motivation{margin:0 0 16px;padding:17px 18px;border-radius:20px;background:linear-gradient(135deg,#fff7fb,#f4f9ff);border:1px solid #ecebea;display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center}
.v90Motivation b{display:block;font-size:15px;margin-bottom:4px}.v90Motivation p{margin:0;color:#707070;font-size:11px;line-height:1.65}.v90Motivation .streak{min-width:72px;text-align:center;background:#fff;border:1px solid #ecebea;border-radius:16px;padding:10px}.v90Motivation .streak strong{font-size:21px;display:block}.v90Motivation .streak small{font-size:9px;color:#8b8b8b}
.v90ShareNote{font-size:10px;color:#858585;margin-top:7px;line-height:1.6}
.bottomNav{backdrop-filter:blur(16px);background:rgba(14,14,14,.94)!important}
@media(max-width:760px){.main{padding:18px 14px 82px!important}.topbar{padding-top:8px!important}.topbar h1{font-size:27px!important}.card{border-radius:20px!important}.hero,.growthHero,.vocabHero,.grammarHero{border-radius:23px!important;padding:25px 22px!important}.hero h2,.growthHero h2{font-size:26px!important}.v90Motivation{grid-template-columns:1fr auto;padding:15px}.roadLevel{grid-template-columns:58px 1fr!important}.roadLevel .goal{grid-column:1/-1}.heroActions>*{flex:1 1 135px}.growthHero .heroActions{display:grid!important;grid-template-columns:1fr!important}.growthHero .heroActions button{width:100%!important}.miniLaunchGrid{grid-template-columns:1fr!important}}
@media(max-width:420px){.topbar{gap:10px}.profile{gap:7px}.avatar{width:36px;height:36px}.v90Motivation{grid-template-columns:1fr}.v90Motivation .streak{text-align:left;display:flex;align-items:baseline;gap:8px}.v90Motivation .streak strong{display:inline}}
`;
const style=document.createElement('style');style.id='v90-redesign-style';style.textContent=css;document.head.appendChild(style);
const oldRender=window.render;
if(typeof oldRender==='function'){
  window.render=function(){oldRender();setTimeout(()=>{
    const content=document.getElementById('content');if(!content)return;
    if(state?.view==='home'&&!content.querySelector('.v90Motivation')){
      const learnedG=Object.values(state.grammarDone||{}).filter(Boolean).length;
      const learnedV=Object.values(state.vocabDone||{}).filter(Boolean).length;
      const target=Math.max(1,(typeof VOCAB_TARGETS!=='undefined'?VOCAB_TARGETS[(state.currentLevel||1)-1]:300));
      const pct=Math.min(100,Math.round((learnedV/target)*100));
      const card=document.createElement('section');card.className='v90Motivation';
      card.innerHTML=`<div><b>今日も、ひとつだけ前へ。</b><p>Level ${state.currentLevel||1} · 単語 ${learnedV}語 / 文法 ${learnedG}項目を習得済み。全部やろうとせず、まずは短い1セットで十分です。</p></div><div class="streak"><strong>${pct}%</strong><small>語彙進捗</small></div>`;
      content.insertBefore(card,content.firstChild);
    }
    document.querySelectorAll('[data-share-new],#lineShareBtn,.lineShareBtn').forEach(el=>{if(!el.dataset.v90Note){el.dataset.v90Note='1';el.setAttribute('aria-label','新規ユーザー向けに共有')}});
  },0)};
  window.render();
}
})();
