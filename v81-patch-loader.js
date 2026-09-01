(async()=>{
  if(window.__HANGEORUM_V81_PATCH__||window.__HANGEORUM_V81_LOADING__)return;
  window.__HANGEORUM_V81_LOADING__=true;
  const VERSION='815';
  const rawBase='https://raw.githubusercontent.com/hibikiprime0098-dotcom/hangeorum-korean/main/';
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  async function fetchPart(i){
    const local=`./v81p${i}.txt?v=${VERSION}`;
    const raw=`${rawBase}v81p${i}.txt?v=${VERSION}`;
    let last;
    for(const url of [local,raw]){
      for(let attempt=0;attempt<2;attempt++){
        try{
          const r=await fetch(url,{cache:'no-store'});
          if(!r.ok)throw new Error(`HTTP ${r.status}`);
          const t=(await r.text()).trim();
          if(!t)throw new Error('empty response');
          return t;
        }catch(e){last=e;await sleep(180)}
      }
    }
    throw new Error(`v81p${i}.txt 取得失敗: ${last?.message||last}`);
  }
  async function readTextStream(stream){
    const reader=stream.getReader();
    const decoder=new TextDecoder('utf-8');
    let out='';
    while(true){
      const {value,done}=await reader.read();
      if(done)break;
      out+=decoder.decode(value,{stream:true});
    }
    out+=decoder.decode();
    return out;
  }
  function gzipPayloadRange(bin){
    if(bin.length<18||bin[0]!==0x1f||bin[1]!==0x8b||bin[2]!==8)throw new Error('gzip header invalid');
    const flg=bin[3];
    let p=10;
    if(flg&4){
      if(p+2>bin.length)throw new Error('gzip extra header invalid');
      const xlen=bin[p]|(bin[p+1]<<8);p+=2+xlen;
    }
    if(flg&8){while(p<bin.length&&bin[p]!==0)p++;p++}
    if(flg&16){while(p<bin.length&&bin[p]!==0)p++;p++}
    if(flg&2)p+=2;
    const end=bin.length-8;
    if(p>=end)throw new Error('gzip payload missing');
    return [p,end];
  }
  async function gunzipText(bin){
    if(typeof DecompressionStream!=='function')throw new Error('このブラウザはDecompressionStreamに対応していません');
    let gzipErr=null;
    try{
      const ds=new DecompressionStream('gzip');
      const out=await readTextStream(new Blob([bin]).stream().pipeThrough(ds));
      if(!out)throw new Error('解凍後データが空です');
      return out;
    }catch(e){gzipErr=e}
    try{
      const [start,end]=gzipPayloadRange(bin);
      const raw=bin.slice(start,end);
      const ds=new DecompressionStream('deflate-raw');
      const out=await readTextStream(new Blob([raw]).stream().pipeThrough(ds));
      if(!out)throw new Error('raw deflate解凍後データが空です');
      console.warn('한걸음: gzip CRC check failed, recovered with raw deflate',gzipErr);
      return out;
    }catch(rawErr){
      throw new Error(`解凍失敗: gzip=${gzipErr?.message||gzipErr} / raw=${rawErr?.message||rawErr}`);
    }
  }
  try{
    const parts=await Promise.all(Array.from({length:8},(_,i)=>fetchPart(i+1)));
    const b64=parts.join('').replace(/\s+/g,'');
    let bin;
    try{bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0))}
    catch(e){throw new Error(`データ復号失敗: ${e.message}`)}
    const code=await gunzipText(bin);
    if(!code||code.length<1000)throw new Error('更新コードが不完全です');
    const s=document.createElement('script');
    s.textContent=code+'\n//# sourceURL=hangeorum-v8.1-patch.js';
    document.documentElement.appendChild(s);
    s.remove();
    window.__HANGEORUM_V81_PATCH__=true;
    document.getElementById('v81LoadError')?.remove();
  }catch(e){
    console.error('한걸음 v8.1 patch load failed',e);
    document.getElementById('v81LoadError')?.remove();
    const n=document.createElement('div');
    n.id='v81LoadError';
    n.style.cssText='position:fixed;left:12px;right:12px;bottom:82px;z-index:99999;background:#111;color:#fff;padding:14px;border-radius:14px;font:12px/1.55 system-ui;box-shadow:0 8px 30px #0005';
    n.innerHTML=`<b>最新版の読み込みに失敗しました</b><br><span style="color:#bbb">${String(e.message||e)}</span><br><button id="v81Retry" style="margin-top:9px;border:0;border-radius:9px;padding:9px 13px;font-weight:800">再試行</button>`;
    document.body.appendChild(n);
    document.getElementById('v81Retry').onclick=()=>{n.remove();window.__HANGEORUM_V81_LOADING__=false;location.reload()};
  }finally{window.__HANGEORUM_V81_LOADING__=false}
})();
