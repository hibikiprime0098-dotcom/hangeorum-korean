(()=>{
if(window.__HANGEORUM_V87_FIX__)return;window.__HANGEORUM_V87_FIX__=true;
window.HANGEORUM_VERSION='8.7';document.title='한걸음 | 韓国語学習 v8.7';
function v87AllGrammar(lv){return typeof grammarItemsUpTo==='function'?grammarItemsUpTo(lv):Object.entries(grammarCurriculum).filter(([n])=>+n<=lv).flatMap(([,g])=>g.items)}
function v87Pool(lv){const items=grammarCurriculum[lv]?.items||[],p=state.grammarPriority||'must',n=items.length,must=Math.min(n,Math.max(1,Math.ceil(n*.30))),important=Math.min(n,Math.max(must,Math.ceil(n*.70))),limit=p==='all'?n:p==='important'?important:must;return items.slice(0,limit)}
function v87Label(){return state.grammarPriority==='all'?'全て':state.grammarPriority==='important'?'重要まで':'まずこれだけ'}
function v87Options(z){const o=[...(z.o||[])];let u=o.findIndex(x=>String(x).trim()==='わからない');if(u<0){o.push('わからない');u=o.length-1}return {o,unknown:u}}
function v87Question(d,entry,item){
  if(entry.fixedQ)return entry.fixedQ;
  const all=v87AllGrammar(d.lv);let z,q;
  if(entry.phase===0){
    z=optionSet(item.n,all.map(x=>x.n));
    q={prompt:`${item.p} の意味として最も近いものは？`,text:item.p,audio:'',explain:`${item.p} は「${item.n}」。${item.d}`,a:z.a,...v87Options(z)};
  }else{
    const ex=item.ex?.[0]||['',''],examples=all.flatMap(x=>(x.ex||[]).map(e=>e[1])).filter(Boolean);
    z=optionSet(ex[1],examples);
    q={prompt:'例文の意味として最も近いものは？',text:ex[0],audio:ex[0],explain:`${ex[0]} ＝ ${ex[1]}。中心文法は ${item.p}（${item.n}）です。`,a:z.a,...v87Options(z)};
  }
  entry.fixedQ=q;
  return q;
}
function v87Item(d,entry){return (grammarCurriculum[d.lv]?.items||[]).find(x=>x.id===entry?.id)}
function v87Start(lv){
  lv=Math.max(1,Math.min(10,+lv||1));const pool=v87Pool(lv),unlearned=pool.filter(x=>!state.grammarDone[x.id]),learned=pool.filter(x=>state.grammarDone[x.id]),targets=[...unlearned,...learned].slice(0,Math.min(6,pool.length));
  if(!targets.length){alert('この範囲に文法項目がありません。');return}
  const queue=[];targets.forEach(x=>{queue.push({id:x.id,phase:0,fixedQ:null});queue.push({id:x.id,phase:1,fixedQ:null})});
  const initialDone={};targets.forEach(x=>initialDone[x.id]=!!state.grammarDone[x.id]);
  state.grammarDrill={lv,priority:state.grammarPriority||'must',targetIds:targets.map(x=>x.id),queue,pos:0,selected:null,checked:false,correct:{},wrong:{},initialDone,newly:[],finished:false};
  state.grammarDrillActive=true;render();
}
function v87View(){
  const d=state.grammarDrill;if(!d)return '<div class="notice">文法学習を開始できませんでした。</div>';
  if(d.finished){const mastered=d.targetIds.filter(id=>(d.correct[id]||0)>=2).length,newly=d.newly.length;return `<section class="card hero"><span class="pill">SMART GRAMMAR · COMPLETE</span><h2>${mastered} / ${d.targetIds.length}項目を定着確認。</h2><p>同じ文法を形を変えて思い出し、2回正解した項目を習得済みにしました。今回新しく習得になったのは <b>${newly}項目</b> です。この学習結果は成長グラフには加算しません。</p><div class="heroActions"><button class="primary" id="v87GrammarNextSet">次の6項目へ →</button><button class="ghost" id="v87GrammarExit">文法一覧へ戻る</button></div></section>`}
  const entry=d.queue[d.pos],item=v87Item(d,entry);if(!item){d.finished=true;return v87View()}
  const q=v87Question(d,entry,item),sel=d.selected,ok=d.checked&&sel!==q.unknown&&sel===q.a,usage=window.v82GrammarUsage?v82GrammarUsage(item):[item.d],master=(d.correct[item.id]||0)>=2;
  return `<section class="card v86drill"><div class="examHeader"><div><span class="pill">SMART GRAMMAR · ${v87Label()}</span><h2>問題で覚える · Level ${d.lv}</h2></div><div class="examStats"><span class="examStat">${Math.min(d.pos+1,d.queue.length)} / ${d.queue.length}</span><span class="examStat">この文法 ${d.correct[item.id]||0}/2</span></div></div><div class="v86master"><b>${item.p}</b><span>${master?'✓ 習得':'2回正解で習得'}</span></div><div class="examQ"><h3>${q.prompt}</h3>${q.audio?`<button class="secondary speak" data-audio="${String(q.audio).replace(/"/g,'&quot;')}">▶ 例文を聞く</button>`:''}<div class="korean v86qtext">${q.text||''}</div><div class="options">${q.o.map((x,i)=>`<button class="option v87GOpt ${x==='わからない'?'unknownOption':''} ${sel===i?'selected':''} ${d.checked&&i===q.a?'correct':''} ${d.checked&&sel===i&&i!==q.a?'wrong':''}" data-i="${i}" ${d.checked?'disabled':''}>${String.fromCharCode(65+i)}. ${x}</button>`).join('')}</div>${!d.checked?`<button class="primary" id="v87GrammarCheck" ${sel==null?'disabled':''}>回答する</button>`:`<div class="feedback ${ok?'ok':'ng'}"><b>${ok?'正解。記憶を1回確認しました。':sel===q.unknown?'「わからない」→ 不正解。後でもう一度出題します。':'不正解。後でもう一度出題します。'}</b><br>${q.explain}</div><div class="grammarUsage"><b>🔎 使い方・使い分け</b><ul>${usage.map(s=>`<li>${s}</li>`).join('')}</ul></div><button class="primary" id="v87GrammarNext">次へ →</button>`}</div><button class="ghost v86exitMini" id="v87GrammarExit">途中で一覧へ戻る</button></section>`;
}
const oldGrammarCourse87=grammarCourse;grammarCourse=function(){return state.grammarDrillActive?v87View():oldGrammarCourse87()};
const oldRender87=render;render=function(){
  oldRender87();document.querySelectorAll('.v82version').forEach(e=>e.textContent='v8.7');
  if(state.view!=='learn'||state.learnTab!=='grammar')return;
  if(!state.grammarDrillActive){const s=document.getElementById('v86GrammarDrillStart');if(s)s.onclick=()=>v87Start(state.grammarLevel);return}
  const d=state.grammarDrill;
  document.querySelectorAll('.v87GOpt').forEach(b=>b.onclick=()=>{if(!d.checked){d.selected=+b.dataset.i;render()}});
  const check=document.getElementById('v87GrammarCheck');if(check)check.onclick=()=>{
    const entry=d.queue[d.pos],item=v87Item(d,entry),q=v87Question(d,entry,item),ok=d.selected!==q.unknown&&d.selected===q.a;
    d.checked=true;
    if(ok){
      d.correct[item.id]=(d.correct[item.id]||0)+1;
      if(d.correct[item.id]>=2&&!state.grammarDone[item.id]){state.grammarDone[item.id]=true;localStorage.setItem('korean-grammar-done',JSON.stringify(state.grammarDone));if(!d.initialDone[item.id]&&!d.newly.includes(item.id))d.newly.push(item.id)}
    }else{
      d.wrong[item.id]=(d.wrong[item.id]||0)+1;
      if((d.correct[item.id]||0)<2)d.queue.push({id:item.id,phase:entry.phase===0?1:0,fixedQ:null});
    }
    render();
  };
  const next=document.getElementById('v87GrammarNext');if(next)next.onclick=()=>{d.pos++;while(d.pos<d.queue.length&&(d.correct[d.queue[d.pos].id]||0)>=2)d.pos++;d.selected=null;d.checked=false;if(d.pos>=d.queue.length)d.finished=true;render()};
  document.querySelectorAll('#v87GrammarExit').forEach(b=>b.onclick=()=>{state.grammarDrillActive=false;state.grammarDrill=null;render()});
  const nextSet=document.getElementById('v87GrammarNextSet');if(nextSet)nextSet.onclick=()=>{state.grammarDrillActive=false;state.grammarDrill=null;v87Start(state.grammarLevel)};
};
render();
})();
