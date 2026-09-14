(()=>{
if(window.__HANGEORUM_SHARED_V96__)return;window.__HANGEORUM_SHARED_V96__=true;
window.HANGEORUM_SHARED_VERSION='9.6';

const css=`
/* Shared Edition v9.6 — final presentation layer only */
:root{--v96-bg:#f6f6f3;--v96-ink:#111;--v96-muted:#737373;--v96-line:#e5e5df;--v96-pink:#f3a7c3;--v96-blue:#9dcaf5;--v96-shadow:0 12px 34px rgba(0,0,0,.055)}
body{background:var(--v96-bg)!important}
.card{box-shadow:var(--v96-shadow)!important}
.topbar{border-bottom:1px solid rgba(0,0,0,.035)}
.topbar h1{font-weight:920!important}.topbar .eyebrow{letter-spacing:.18em!important}
.v96BrandNote{display:inline-flex;align-items:center;gap:6px;margin-top:5px;color:#8a8a8a;font-size:9px;font-weight:750;letter-spacing:.04em}
.v96BrandNote:before{content:"";width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,var(--v96-pink),var(--v96-blue))}
.v96Start{margin:0 0 16px;padding:18px;border:1px solid var(--v96-line);border-radius:22px;background:#111;color:#fff;box-shadow:0 18px 48px rgba(0,0,0,.10)}
.v96StartTop{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.v96Start .eyebrow{color:#969696}.v96Start h3{margin:5px 0 6px;font-size:20px;letter-spacing:-.045em}.v96Start p{margin:0;color:#aaa;font-size:10.5px;line-height:1.75}.v96StartActions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.v96StartActions button{border:1px solid #383838;background:#171717;color:#fff;border-radius:13px;padding:11px 10px;font-weight:850;min-height:48px}.v96StartActions button:first-child{background:#fff;color:#111;border-color:#fff}.v96StartActions button small{display:block;margin-top:3px;font-size:8px;color:#929292;font-weight:650}.v96StartActions button:first-child small{color:#777}.v96Dismiss{border:0;background:transparent;color:#8e8e8e;font-size:11px;padding:4px;min-height:auto}
.v96Trust{margin-top:10px;display:flex;gap:7px;flex-wrap:wrap}.v96Trust span{padding:5px 8px;border:1px solid #303030;border-radius:999px;color:#a5a5a5;font-size:8.5px;font-weight:760}
.v90Welcome{box-shadow:0 9px 28px rgba(0,0,0,.04)!important}.v90Welcome .meter strong{font-variant-numeric:tabular-nums}
.heroActions button,.testShortcut button,.miniLaunch button{font-weight:850!important}
.option{transition:border-color .15s ease,background .15s ease,transform .08s ease}.option:active{transform:scale(.995)}
.bottomNav button.active{color:#fff!important}.bottomNav button.active span{filter:none!important}
.v96Footer{margin:34px 0 8px;text-align:center;color:#999;font-size:9px;line-height:1.7}.v96Footer b{color:#666}.v96Footer .dot{display:inline-block;width:4px;height:4px;border-radius:50%;background:#bbb;margin:0 7px;vertical-align:middle}
@media(max-width:760px){.v96Start{padding:17px 15px;border-radius:20px}.v96StartActions{grid-template-columns:1fr}.v96StartActions button{text-align:left;padding:11px 13px}.v96StartTop{gap:8px}.v96Start h3{font-size:18px}.v96Footer{margin-bottom:4px}}
`;
const st=document.createElement('style');st.id='shared-v96-style';st.textContent=css;document.head.appendChild(st);

function clickNav(view){const b=document.querySelector(`[data-go="${view}"]`)||document.querySelector(`.bottomNav [data-view="${view}"]`)||[...document.querySelectorAll('.bottomNav button,.nav button')].find(x=>String(x.textContent||'').toLowerCase().includes(view==='learn'?'学習':view==='listen'?'listening':'成長'));if(b)b.click();else{try{state.view=view;render()}catch{}}}
function addBrand(){const top=document.querySelector('.topbar');if(!top||top.querySelector('.v96BrandNote'))return;const h=top.querySelector('h1');if(!h)return;const n=document.createElement('div');n.className='v96BrandNote';n.textContent='聞いてわかる韓国語を、少しずつ。';h.insertAdjacentElement('afterend',n)}
function addStart(c){if(state?.view!=='home'||c.querySelector('.v96Start')||sessionStorage.getItem('hangeorum-v96-hide-start')==='1')return;const lv=Math.max(1,Number(state.currentLevel)||1),vg=Object.values(state.vocabKnown||state.vocabDone||{}).filter(Boolean).length,gg=Object.values(state.grammarDone||{}).filter(Boolean).length;const el=document.createElement('section');el.className='v96Start';el.innerHTML=`<div class="v96StartTop"><div><div class="eyebrow">TODAY · LEVEL ${lv}</div><h3>${vg+gg>0?'続きから、5分だけ。':'最初の5分から始める。'}</h3><p>${vg+gg>0?`単語 ${vg}語・文法 ${gg}項目を習得済み。今日は1セットだけでも十分です。`:'まずは単語か文法を少量だけ。分からない問題は「わからない」で進めて構いません。'}</p></div><button class="v96Dismiss" aria-label="閉じる">×</button></div><div class="v96StartActions"><button data-v96-go="learn">学習を始める<small>単語・文法から</small></button><button data-v96-go="listen">Listening<small>音から意味を取る</small></button><button data-v96-go="progress">成長を見る<small>実力テストの推移</small></button></div><div class="v96Trust"><span>登録不要</span><span>追加料金なし</span><span>進捗は端末保存</span></div>`;const first=c.querySelector('.v90Welcome,.card');if(first)first.insertAdjacentElement('beforebegin',el);else c.prepend(el);el.querySelector('.v96Dismiss').onclick=()=>{sessionStorage.setItem('hangeorum-v96-hide-start','1');el.remove()};el.querySelectorAll('[data-v96-go]').forEach(b=>b.onclick=()=>clickNav(b.dataset.v96Go))}
function addFooter(c){if(c.querySelector('.v96Footer'))return;const f=document.createElement('div');f.className='v96Footer';f.innerHTML='<b>한걸음</b><span class="dot"></span>学習内容はそのまま、進捗はこの端末に保存されます。';c.appendChild(f)}
function setManifest(){let l=document.querySelector('link[rel="manifest"]');if(l)l.href='./share/manifest.webmanifest';}
function polish(){const c=document.getElementById('content');if(!c)return;addBrand();addStart(c);addFooter(c);setManifest();document.documentElement.dataset.hangeorumEdition='shared-final';document.querySelectorAll('.v82version').forEach(x=>x.style.display='none')}
const old=window.render;if(typeof old==='function'){window.render=function(){old();requestAnimationFrame(polish)};window.render()}else setTimeout(polish,250);
})();
