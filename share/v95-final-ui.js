(()=>{
if(window.__HANGEORUM_SHARED_V95__)return;window.__HANGEORUM_SHARED_V95__=true;
window.HANGEORUM_SHARED_VERSION='9.5';

const css=`
/* HANGEORUM Shared Edition v9.5 — presentation/UX only */
:root{--share-bg:#f5f5f2;--share-card:#fff;--share-ink:#111;--share-muted:#727272;--share-line:#e7e7e2;--share-soft:#f0f0ec;--share-pink:#f4a3c2;--share-blue:#9ccaf7;--share-radius:22px}
body{background:var(--share-bg)!important;color:var(--share-ink)!important}
*{scrollbar-color:#d6d6d1 transparent}
button,a{touch-action:manipulation}
button{min-height:44px}
button:focus-visible,a:focus-visible{outline:3px solid rgba(80,150,235,.35)!important;outline-offset:3px!important}
.main{padding-bottom:96px!important}.wrap{max-width:1040px!important}
.topbar{min-height:66px!important}.topbar .eyebrow{color:#858585!important}.topbar h1{font-weight:900!important;letter-spacing:-.055em!important}
.profile{gap:8px!important}.profile .v82version{display:none!important}
.card{background:var(--share-card)!important;border-color:var(--share-line)!important;box-shadow:0 8px 28px rgba(0,0,0,.045)!important}
.hero,.growthHero,.vocabHero,.grammarHero,.audioStage{box-shadow:0 18px 44px rgba(0,0,0,.10)!important}
.sectionTitle{margin-top:32px!important}.sectionTitle p{font-size:10.5px!important}
.primary,.secondary,.ghost{letter-spacing:-.01em!important}.primary{box-shadow:none!important}
.option{font-weight:650!important;line-height:1.5!important;border-color:#e5e5e0!important}
.option:hover{border-color:#c9c9c2!important}.option.selected{box-shadow:inset 0 0 0 1px #aaa!important}
.grammarCard,.vocabRow,.lesson,.roadLevel,.miniLaunch{background:#fff!important;border-color:var(--share-line)!important}
.grammarUsage,.grammarExample,.grammarNote,.skill,.goal{background:#f8f8f6!important}
.bottomNav{border-top:1px solid rgba(255,255,255,.08)!important}.bottomNav button{min-height:56px!important}

/* calmer, more motivational home summary */
.v90Welcome{position:relative;overflow:hidden;background:linear-gradient(135deg,#fff7fb 0%,#fff 46%,#f1f8ff 100%)!important;border:1px solid #e9e7e3!important;box-shadow:0 8px 24px rgba(0,0,0,.04)!important}
.v90Welcome:after{content:"";position:absolute;width:160px;height:160px;border-radius:50%;right:-80px;top:-100px;background:radial-gradient(circle,rgba(156,202,247,.42),rgba(244,163,194,.16) 52%,transparent 72%);pointer-events:none}
.v90Welcome b{font-size:16px!important;letter-spacing:-.025em}.v90Welcome p{max-width:680px}
.v90Today span{background:rgba(255,255,255,.82)!important}
.v95principle{margin:-4px 0 16px;padding:0 3px;color:#8a8a8a;font-size:9.5px;line-height:1.65;letter-spacing:.01em}
.v95principle b{color:#555}

/* top actions: simple and recognizable */
.v95ShareHint{display:none;position:absolute;top:58px;right:0;z-index:80;width:260px;padding:12px 13px;border:1px solid #e5e5e0;border-radius:14px;background:#fff;box-shadow:0 16px 40px rgba(0,0,0,.12);font-size:10px;line-height:1.6;color:#666}
.v95ShareHint b{display:block;color:#111;margin-bottom:3px}

/* share modal: distinguish friend-sharing from device transfer */
.v88overlay{backdrop-filter:blur(7px)!important;background:rgba(0,0,0,.44)!important}
.v88modal{border-radius:26px!important;padding:26px!important;border:1px solid rgba(255,255,255,.6)!important}
.v88modal .eyebrow{color:#888!important}.v88choice{min-height:84px!important;padding:17px!important;transition:transform .15s ease,border-color .15s ease!important}
.v88choice:active{transform:scale(.99)}.v88choice b{font-size:15px!important}.v88choice span{font-size:10.5px!important}
.v88choice:first-of-type{background:#111!important;color:#fff!important;border-color:#111!important}.v88choice:first-of-type span{color:#c9c9c9!important}
.v88choice.transfer{background:linear-gradient(135deg,#fff3f8,#eef7ff)!important;color:#111!important}
.v88warn{font-size:10px!important}
.v95Safe{margin-top:10px;color:#838383;font-size:9.5px;line-height:1.65}

/* readability guard rails */
.roadLevel,.levelCurrentCard,.grammarCard,.vocabRow,.miniLaunch,.testShortcut{color:#111!important}
.roadLevel h3,.roadLevel b,.levelCurrentCard b,.grammarCard h3,.vocabRow b,.miniLaunch b{color:#111!important}
.card:not(.hero):not(.growthHero):not(.vocabHero):not(.grammarHero) .ghost{color:#111!important}
.hero .ghost,.growthHero .ghost,.vocabHero .ghost,.grammarHero .ghost{color:#fff!important}
.growthHero .primary{background:#fff!important;color:#111!important}.growthHero .ghost{border-color:#5b5b5b!important;background:rgba(255,255,255,.035)!important}

@media(max-width:760px){
 .main{padding:14px 14px 94px!important}.topbar{margin-bottom:14px!important}.topbar h1{font-size:28px!important}
 .profile{gap:6px!important}.profile button,.topbar button{min-width:48px!important}
 .hero,.growthHero,.vocabHero,.grammarHero{padding:24px 21px!important}
 .hero h2,.growthHero h2{font-size:25px!important;line-height:1.28!important}
 .v88modal{padding:23px 18px!important;border-radius:23px!important}
 .reviewAnswers{grid-template-columns:1fr!important}.metrics{grid-template-columns:repeat(2,1fr)!important}
 .v95principle{font-size:9px}
}
@media(max-width:420px){
 .topbar{gap:10px!important}.topbar h1{font-size:26px!important}
 .heroActions{display:grid!important;grid-template-columns:1fr!important}.heroActions button{width:100%!important}
 .metrics{grid-template-columns:1fr 1fr!important}
}
`;
const style=document.createElement('style');style.id='shared-v95-style';style.textContent=css;document.head.appendChild(style);

document.title='한걸음｜韓国語学習';
let desc=document.querySelector('meta[name="description"]');if(desc)desc.content='聞いてわかる韓国語を、少しずつ。旅行・日常会話・自然な韓国語のための学習アプリ。';

function polishShareModal(){
 const m=document.getElementById('v88ShareModal');if(!m||m.dataset.v95)return;m.dataset.v95='1';
 const eyebrow=m.querySelector('.eyebrow');if(eyebrow)eyebrow.textContent='SHARE / TRANSFER';
 const h=m.querySelector('h2');if(h)h.textContent='何のために共有しますか？';
 const lead=m.querySelector('.v88lead');if(lead)lead.textContent='友だちには0%から始める通常リンクを、自分の機種変更には学習状況付きリンクを使います。';
 const fresh=m.querySelector('#v88Fresh');if(fresh){const b=fresh.querySelector('b'),s=fresh.querySelector('span');if(b)b.textContent='友だちに送る · 0%から開始';if(s)s.textContent='あなたのLevel・習得状況・テスト履歴は含めません。初めて開く人はLevel 1から始まります。'}
 const tr=m.querySelector('#v88Transfer');if(tr){const b=tr.querySelector('b'),s=tr.querySelector('span');if(b)b.textContent='自分の別端末へ移す · 進捗を引き継ぐ';if(s)s.textContent='機種変更や自分の別端末用。Level・習得済み・昇格/テスト履歴をまとめて統合します。'}
 const warn=m.querySelector('.v88warn');if(warn)warn.innerHTML='<b>進捗付きリンクは自分専用</b>リンクを知っている人は学習状況を取り込めるため、友だちには上の「0%から開始」を使ってください。';
 const safe=document.createElement('div');safe.className='v95Safe';safe.textContent='通常共有では、あなたの端末内の学習履歴そのものは送信されません。';m.querySelector('.v88modal')?.appendChild(safe);
}

function polishPage(){
 const c=document.getElementById('content');if(!c)return;
 document.documentElement.dataset.hangeorumEdition='shared';
 if(state?.view==='home'&&!c.querySelector('.v95principle')){
   const p=document.createElement('div');p.className='v95principle';p.innerHTML='<b>今日の基準：</b> 長く勉強するより、短く思い出す。わからない問題を残すことも学習です。';
   const w=c.querySelector('.v90Welcome');if(w)w.insertAdjacentElement('afterend',p);else c.insertBefore(p,c.firstChild);
 }
 document.querySelectorAll('#shareBtn,#homeShare,#lineShareBtn,#homeLine').forEach(b=>{b.setAttribute('aria-label','共有・引き継ぎ');b.title='共有・引き継ぎ'});
 document.querySelectorAll('.v82version').forEach(x=>x.style.display='none');
}

const oldRender=window.render;
if(typeof oldRender==='function'){
 window.render=function(){oldRender();requestAnimationFrame(polishPage)};
 window.render();
}else setTimeout(polishPage,200);

const mo=new MutationObserver(()=>polishShareModal());mo.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(polishPage,250);
})();
