(()=>{
if(window.__HANGEORUM_V952_PROMOTION__)return;window.__HANGEORUM_V952_PROMOTION__=1;
window.HANGEORUM_VERSION='9.5.2';
state.v952PromotionQuestions=state.v952PromotionQuestions||[];
state.v952PromotionTarget=state.v952PromotionTarget||Math.min(10,(Number(state.currentLevel)||1)+1);

const beforeExamView=examView;
const beforeRender=render;

function targetLevel(){return Math.min(10,(Number(state.currentLevel)||1)+1)}
function promotionIntro(){
  const t=targetLevel();
  if(state.currentLevel>=10)return '<section class="card hero"><span class="pill">LEVEL UP EXAM</span><h2>Level 10 到達済み</h2><p>現在が最高Levelです。通常テストで各分野を復習できます。</p></section>';
  return `<section class="card hero"><span class="pill">LEVEL UP EXAM · LEVEL ${t}</span><h2>Level ${t} 昇格試験</h2><p>Level ${t}で必要になる<b>単語・文法・Listening</b>を、通常テストと同じ問題形式で総合確認します。10問中8問以上（80点以上）で合格するとLevel ${t}へ昇格します。</p><div class="examStats"><span class="examStat">10 QUESTIONS</span><span class="examStat">PASS 80+</span><span class="examStat">TARGET LEVEL ${t}</span></div><div class="heroActions"><button class="primary" id="v952StartPromotion">Level ${t} 昇格試験を始める →</button></div></section>`;
}
function promotionView(){
  const t=state.v952PromotionTarget||targetLevel(),qs=state.v952PromotionQuestions||[];
  if(!state.examStarted)return promotionIntro();
  if(!qs.length)return '<section class="card"><h2>問題を準備しています…</h2></section>';
  if(state.examResult)return reviewPage(qs,state.answers,state.examResult,`Level ${t} 昇格試験`,'LEVEL UP EXAM');
  return quizPage(qs,state.qIndex,state.answers,'exam');
}
examView=function(){
  if(state.v90TestMode==='promotion')return `<div class="v90TestSub"><button class="v90Back" id="v90BackTestsTop">← テスト一覧</button><b>Level ${targetLevel()} 昇格試験</b></div>${promotionView()}`;
  return beforeExamView();
};

async function buildPromotion(){
  const t=targetLevel(); if(state.currentLevel>=10)return;
  const saved={mode:state.v90TestMode,active:state.miniActive,result:state.miniResult,questions:state.miniQuestions,answers:state.miniAnswers,index:state.miniIndex,type:state.miniType,level:state.miniLevel,view:state.view};
  const parts=[];
  for(const [type,count] of [['vocab',4],['grammar',3],['listening',3]]){
    await startMini(type,t,'all');
    const q=(state.miniQuestions||[]).slice(0,count).map(x=>({...x}));
    parts.push(...q);
  }
  Object.assign(state,{miniActive:saved.active,miniResult:saved.result,miniQuestions:saved.questions,miniAnswers:saved.answers,miniIndex:saved.index,miniType:saved.type,miniLevel:saved.level,view:'exam',v90TestMode:'promotion'});
  state.v952PromotionTarget=t;
  state.v952PromotionQuestions=parts.slice(0,10).map((q,i)=>({...q,id:i+1}));
  state.examStarted=true;state.examResult=null;state.answers={};state.qIndex=0;
  render();
}

render=function(){
  beforeRender();
  if(state.view!=='exam'||state.v90TestMode!=='promotion')return;
  const start=document.getElementById('v952StartPromotion');if(start)start.onclick=buildPromotion;
  const back=document.getElementById('v90BackTestsTop');if(back)back.onclick=()=>{state.examStarted=false;state.examResult=null;state.answers={};state.qIndex=0;state.v952PromotionQuestions=[];state.v90TestMode='hub';render();window.scrollTo({top:0,behavior:'smooth'})};
  if(state.examStarted&&!state.examResult&&state.v952PromotionQuestions.length){
    const qs=state.v952PromotionQuestions;
    bindQuiz('exam',qs,()=>state.qIndex,v=>state.qIndex=v,state.answers,v=>{
      state.examResult=v;
      recordTest('昇格',state.v952PromotionTarget,v,qs);
      if(v.score>=80&&state.currentLevel<state.v952PromotionTarget){
        state.currentLevel=state.v952PromotionTarget;
        localStorage.setItem('korean-current-level',String(state.currentLevel));
      }
    });
  }
  if(state.examResult){
    const rr=document.getElementById('reviewRestart');if(rr)rr.onclick=()=>{state.examStarted=false;state.examResult=null;state.answers={};state.qIndex=0;state.v952PromotionQuestions=[];render()};
    const hero=document.querySelector('#content .hero');
    if(hero&&state.examResult.score>=80){
      const h=hero.querySelector('h2');if(h)h.textContent=`合格。Level ${state.currentLevel} に昇格しました。`;
    }
  }
  document.querySelectorAll('.v82version').forEach(e=>e.textContent='v9.5.2');
};
render();
})();