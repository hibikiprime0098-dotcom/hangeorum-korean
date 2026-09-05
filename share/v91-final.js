(()=>{
if(window.__HANGEORUM_SHARED_V91__)return;window.__HANGEORUM_SHARED_V91__=true;
window.HANGEORUM_SHARED_EDITION=true;
window.HANGEORUM_PUBLIC_URL=location.origin+location.pathname.replace(/index\.html$/,'');
document.title='한걸음｜韓国語学習';
const ensureMeta=(name,content,property=false)=>{let m=document.head.querySelector(`meta[${property?'property':'name'}="${name}"]`);if(!m){m=document.createElement('meta');m.setAttribute(property?'property':'name',name);document.head.appendChild(m)}m.setAttribute('content',content)};
ensureMeta('description','聞いてわかる韓国語を、少しずつ。旅行・日常会話・自然な韓国語コンテンツの理解を目指す学習アプリ。');
ensureMeta('og:title','한걸음｜韓国語学習',true);
ensureMeta('og:description','聞いてわかる韓国語を、少しずつ。',true);
ensureMeta('og:type','website',true);
const css=`
body{letter-spacing:-.01em}
.topbar .eyebrow{letter-spacing:.2em}
.v90Welcome{box-shadow:0 10px 30px rgba(0,0,0,.035)}
.v90Welcome b{font-size:16px;letter-spacing:-.035em}
.v90Welcome .meter strong{letter-spacing:-.05em}
.card,.miniLaunch,.roadLevel,.lesson,.grammarCard,.vocabRow{transition:box-shadow .18s ease,transform .18s ease,border-color .18s ease}
@media(hover:hover){.miniLaunch:hover,.lesson:hover,.roadLevel:hover{transform:translateY(-1px);border-color:#dcdcd7}}
.v88modal{border-radius:26px!important;padding:26px!important}.v88choice{border-radius:18px!important;padding:17px!important}.v88choice b{font-size:15px!important}.v88warn{border-radius:14px!important}
.sharedTrust{margin:14px 0 0;color:#777;font-size:9.5px;line-height:1.6;display:flex;gap:7px;align-items:flex-start}.sharedTrust:before{content:'●';color:#89bff2;font-size:8px;margin-top:2px}
`;
const st=document.createElement('style');st.id='shared-v91-style';st.textContent=css;document.head.appendChild(st);
function polish(){
 document.querySelectorAll('.v82version').forEach(e=>e.style.display='none');
 const welcome=document.querySelector('.v90Welcome');
 if(welcome&&!welcome.querySelector('.sharedTrust'))welcome.insertAdjacentHTML('beforeend','<div class="sharedTrust" style="grid-column:1/-1">学習履歴はこの端末のブラウザ内に保存されます。友達への通常共有には、あなたの進捗は含まれません。</div>');
 const modal=document.getElementById('v88ShareModal');
 if(modal&&!modal.dataset.v91){modal.dataset.v91='1';const choices=modal.querySelectorAll('.v88choice');if(choices[0]){const b=choices[0].querySelector('b'),s=choices[0].querySelector('span');if(b)b.textContent='友達に送る';if(s)s.textContent='学習履歴を付けずに共有します。初めて使う端末ではLevel 1・未学習の状態から始まります。'}if(choices[1]){const b=choices[1].querySelector('b'),s=choices[1].querySelector('span');if(b)b.textContent='自分の別端末へ引き継ぐ';if(s)s.textContent='機種変更・タブレット・PCへの移行用。Level、習得済み、昇格・テスト履歴をまとめて移します。'}const h=modal.querySelector('h2');if(h)h.textContent='共有する内容を選ぶ'}
}
const mo=new MutationObserver(polish);mo.observe(document.documentElement,{childList:true,subtree:true});
const oldRender=window.render;if(typeof oldRender==='function'){window.render=function(){oldRender();setTimeout(polish,0)};window.render()}else polish();
})();
