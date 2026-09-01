(async()=>{
  if(window.__HANGEORUM_V81_PATCH__||window.__HANGEORUM_V81_LOADING__)return;
  window.__HANGEORUM_V81_LOADING__=true;
  try{
    const names=Array.from({length:8},(_,i)=>`v81p${i+1}.txt?v=81`);
    const parts=await Promise.all(names.map(n=>fetch('./'+n,{cache:'no-store'}).then(r=>{
      if(!r.ok)throw new Error(n+' '+r.status);
      return r.text();
    })));
    const b64=parts.join('').trim();
    const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
    if(typeof DecompressionStream!=='function')throw new Error('DecompressionStream unsupported');
    const ds=new DecompressionStream('gzip');
    const code=await new Response(new Blob([bin]).stream().pipeThrough(ds)).text();
    const s=document.createElement('script');
    s.textContent=code;
    document.documentElement.appendChild(s);
    s.remove();
  }catch(e){
    console.error('한걸음 v8.1 patch load failed',e);
    const n=document.createElement('div');
    n.style.cssText='position:fixed;left:12px;right:12px;bottom:82px;z-index:9999;background:#111;color:#fff;padding:12px;border-radius:12px;font:12px system-ui';
    n.textContent='最新版の読み込みに失敗しました。ページを再読み込みしてください。';
    document.body.appendChild(n);
  }finally{window.__HANGEORUM_V81_LOADING__=false}
})();
