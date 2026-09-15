(()=>{
if(window.__HANGEORUM_V951_TEST_COUNT__)return;window.__HANGEORUM_V951_TEST_COUNT__=1;
window.HANGEORUM_VERSION='9.5.1';

const previousStartMini=startMini;
const previousExamView=examView;
const previousLearn=learn;

startMini=async function(type,lv=state.miniLevel,source='all'){
  if(type!=='listening'&&type!=='reading')return previousStartMini(type,lv,source);
  await previousStartMini(type,lv,source);
  if(state.miniActive&&Array.isArray(state.miniQuestions)&&state.miniQuestions.length>10){
    state.miniQuestions=state.miniQuestions.slice(0,10).map((q,i)=>({...q,id:i+1}));
    state.miniIndex=0;
    state.miniAnswers={};
    state.miniResult=null;
    render();
  }
};

examView=function(){
  const h=previousExamView();
  return String(h)
    .replace(/25 QUESTIONS \/ 100 BANK/g,'10 QUESTIONS / 100 BANK')
    .replace(/毎回25問/g,'毎回10問')
    .replace(/25問スタート/g,'10問スタート');
};

learn=function(){
  return String(previousLearn())
    .replace(/毎回25問/g,'毎回10問');
};

render();
})();
