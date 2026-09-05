(()=>{
if(window.__HANGEORUM_SHARED_V90__)return;window.__HANGEORUM_SHARED_V90__=true;
const css=`
:root{--ux-bg:#f6f6f3;--ux-ink:#111;--ux-muted:#747474;--ux-line:#e8e8e3;--ux-surface:#fff;--ux-pink:#f2a6c4;--ux-blue:#9bc8f5;--ux-shadow:0 10px 32px rgba(0,0,0,.055)}
body{background:var(--ux-bg)!important}.main{padding-top:24px!important}.wrap{max-width:1080px!important}
.topbar{position:sticky;top:0;z-index:40;padding:12px 0;margin-bottom:18px;background:linear-gradient(to bottom,var(--ux-bg) 80%,rgba(246,246,243,0));backdrop-filter:blur(10px)}
.topbar h1{font-size:30px!important;letter-spacing:-.05em}.card{border-radius:22px!important;border-color:var(--ux-line)!important;box-shadow:var(--ux-shadow)}
.hero,.growthHero,.vocabHero,.grammarHero{border-radius:27px!important;box-shadow:0 18px 48px rgba(0,0,0,.11)!important}
.hero h2,.growthHero h2{letter-spacing:-.055em!important;line-height:1.25!important}.pill{padding:7px 11px!important}
.primary,.secondary,.ghost{min-height:46px!important;border-radius:14px!important;padding:11px 16px!important;font-weight:850!important}
.growthHero .primary{background:#fff!important;color:#111!important;border-color:#fff!important}.growthHero .ghost{color:#fff!important;border-color:#5b5b5b!important;background:rgba(255,255,255,.04)!important}
.sectionTitle{margin-top:30px!important}.sectionTitle h2{font-size:20px!important}.metric,.miniLaunch,.roadLevel,.lesson,.skill,.grammarCard,.vocabRow{box-shadow:none!important}
.lesson,.roadLevel,.vocabRow{border-radius:18px!important}.grammarCard{border-radius:21px!important}.grammarUsage,.grammarExample,.grammarNote{border-radius:15px!important}
.option{border-radius:15px!important;padding:15px!important;min-height:52px}.feedback{border-radius:15px!important}.progressTrack{height:7px!important}
.v90Welcome{margin:0 0 16px;padding:18px;border:1px solid #ebeae6;border-radius:21px;background:linear-gradient(135deg,#fff7fb,#f3f9ff);display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center}
.v90Welcome b{display:block;font-size:15px;margin-bottom:5px}.v90Welcome p{margin:0;color:#6f6f6f;font-size:11px;line-height:1.7}.v90Welcome .meter{min-width:78px;background:#fff;border:1px solid #ecebe7;border-radius:16px;padding:10px 12px;text-align:center}.v90Welcome .meter strong{display:block;font-size:22px}.v90Welcome .meter small{color:#8b8b8b;font-size:9px}
.v90Today{margin:12px 0 0;display:flex;gap:8px;flex-wrap:wrap}.v90Today span{display:inline-flex;padding:7px 10px;border-radius:999px;background:#fff;border:1px solid #ecebe7;color:#555;font-size:9px;font-weight:800}
.bottomNav{background:rgba(14,14,14,.94)!important;backdrop-filter:blur(16px)}
@media(max-width:760px){.main{padding:18px 14px 82px!important}.topbar{padding-top:7px!important}.topbar h1{font-size:27px!important}.card{border-radius:20px!important}.hero,.growthHero,.vocabHero,.grammarHero{border-radius:23px!important;padding:25px 22px!important}.hero h2,.growthHero h2{font-size:26px!important}.heroActions>*{flex:1 1 140px}.growthHero .heroActions{display:grid!important;grid-template-columns:1fr!important}.growthHero .heroActions button{width:100%!important}.v90Welcome{padding:15px}.roadLevel{grid-template-columns:58px 1fr!important}.roadLevel .goal{grid-column:1/-1}}
@media(max-width:420px){.v90Welcome{grid-template-columns:1fr}.v90Welcome .meter{text-align:left;display:flex;gap:8px;align-items:baseline}.v90Welcome .meter strong{display:inline}}
`;
const st=document.createElement('style');st.id='shared-v90-style';st.textContent=css;document.head.appendChild(st);
const oldRender=window.render;
if(typeof oldRender==='function'){
window.render=function(){oldRender();setTimeout(()=>{const c=document.getElementById('content');if(!c)return;if(state?.view==='home'&&!c.querySelector('.v90Welcome')){const vg=Object.values(state.vocabDone||{}).filter(Boolean).length;const gg=Object.values(state.grammarDone||{}).filter(Boolean).length;const lv=Math.max(1,state.currentLevel||1);const target=(typeof VOCAB_TARGETS!=='undefined'&&VOCAB_TARGETS[lv-1])||300;const pct=Math.min(100,Math.round(vg/Math.max(1,target)*100));const el=document.createElement('section');el.className='v90Welcome';el.innerHTML=`<div><b>今日も、ひとつだけ前へ。</b><p>Level ${lv} · 単語 ${vg}語 / 文法 ${gg}項目を習得済み。長時間やるより、短い1セットを何度も思い出す方を優先します。</p><div class="v90Today"><span>まず5〜10分</span><span>間違いを歓迎</span><span>音→意味を優先</span></div></div><div class="meter"><strong>${pct}%</strong><small>LEVEL語彙進捗</small></div>`;c.insertBefore(el,c.firstChild)}},0)};window.render()}
})();
