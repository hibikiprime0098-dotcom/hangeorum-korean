(async()=>{
  if(window.__HANGEORUM_V84__||window.__HANGEORUM_V84_LOADING__)return;
  window.__HANGEORUM_V84_LOADING__=true;
  const VERSION='840';
  const files=['v82-core.js','v82-g1.js','v82-g2.js','v82-g3.js','v82-g4.js','v82-g5.js','v82-l1.js','v82-l2.js','v82-le1.js','v82-le2.js','v82-listen-ui.js','v82-ui.js','v83-progress.js','v84-tests.js'];
  function load(file){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=`./${file}?v=${VERSION}`;s.async=false;s.onload=()=>{s.remove();resolve()};s.onerror=()=>{s.remove();reject(new Error(`${file} の読み込みに失敗しました`))};document.head.appendChild(s)})}
  try{
    for(const file of files)await load(file);
    window.__HANGEORUM_V84__=true;
    document.getElementById('v81LoadError')?.remove();
  }catch(e){
    console.error('한걸음 v8.4 load failed',e);
    document.getElementById('v81LoadError')?.remove();
    const n=document.createElement('div');n.id='v81LoadError';n.style.cssText='position:fixed;left:12px;right:12px;bottom:82px;z-index:99999;background:#111;color:#fff;padding:14px;border-radius:14px;font:12px/1.55 system-ui;box-shadow:0 8px 30px #0005';n.innerHTML=`<b>最新版の読み込みに失敗しました</b><br><span style="color:#bbb">${String(e.message||e)}</span><br><button id="v81Retry" style="margin-top:9px;border:0;border-radius:9px;padding:9px 13px;font-weight:800">再試行</button>`;document.body.appendChild(n);document.getElementById('v81Retry').onclick=()=>location.reload();
  }finally{window.__HANGEORUM_V84_LOADING__=false}
})();
