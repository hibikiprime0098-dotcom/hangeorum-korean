(()=>{
if(window.__HANGEORUM_V953_PROMOTION__)return;window.__HANGEORUM_V953_PROMOTION__=1;
window.HANGEORUM_VERSION='9.5.3';
const PROMOTION_TEMPLATE=[
{id:1,cat:'文字',q:'ㅏ の音として最も近いものは？',o:['ア','オ','ウ','イ'],a:0,e:'ㅏ は「ア」に近い基本母音です。'},
{id:2,cat:'文字',q:'ㅓ の音として最も近い説明は？',o:['ア','日本語に完全一致しないオ系の音','イ','エ'],a:1,e:'ㅓ は日本語に完全一致しないため、耳で区別する練習が必要です。'},
{id:3,cat:'文字',q:'ㅗ として正しいものは？',o:['ㅜ','ㅗ','ㅡ','ㅣ'],a:1,e:'ㅗ は縦線の上に短い横線がつく母音です。'},
{id:4,cat:'文字',q:'가 の読みとして最も近いものは？',o:['カ／ガ','ナ','タ／ダ','マ'],a:0,e:'ㄱ＋ㅏ＝가。'},
{id:5,cat:'文字',q:'나 の読みとして最も近いものは？',o:['ラ','ナ','サ','ハ'],a:1,e:'ㄴ＋ㅏ＝나。'},
{id:6,cat:'文字',q:'마 の最初の子音はどれ？',o:['ㄱ','ㄴ','ㅁ','ㅎ'],a:2,e:'마 は ㅁ＋ㅏ です。'},
{id:7,cat:'語彙',q:'안녕하세요 の意味は？',text:'안녕하세요',o:['こんにちは','ありがとうございます','ください','大丈夫です'],a:0,e:'丁寧な基本挨拶です。'},
{id:8,cat:'語彙',q:'감사합니다 の意味は？',text:'감사합니다',o:['ごめんなさい','ありがとうございます','はい','いいえ'],a:1,e:'丁寧なお礼です。'},
{id:9,cat:'語彙',q:'죄송합니다 の意味は？',text:'죄송합니다',o:['すみません／申し訳ありません','こんにちは','大丈夫です','ください'],a:0,e:'丁寧な謝罪表現です。'},
{id:10,cat:'語彙',q:'네 の基本的な意味は？',text:'네',o:['はい','いいえ','どこ','何'],a:0,e:'基本的には「はい」です。'},
{id:11,cat:'語彙',q:'아니요 の意味は？',text:'아니요',o:['ありがとう','こんにちは','いいえ','大丈夫'],a:2,e:'丁寧な「いいえ」です。'},
{id:12,cat:'語彙',q:'괜찮아요 の意味として最も近いものは？',text:'괜찮아요',o:['大丈夫です','分かりません','高いです','おいしいです'],a:0,e:'大丈夫です／結構です、など文脈で広く使います。'},
{id:13,cat:'語彙',q:'한국 の意味は？',text:'한국',o:['日本','韓国','人','家'],a:1,e:'한국＝韓国。'},
{id:14,cat:'語彙',q:'사람 の意味は？',text:'사람',o:['人','水','ご飯','名前'],a:0,e:'사람＝人。'},
{id:15,cat:'語彙',q:'화장실 の意味は？',text:'화장실',o:['トイレ','駅','ホテル','メニュー'],a:0,e:'旅行で非常に重要な語彙です。'},
{id:16,cat:'語彙',q:'역 の意味は？',text:'역',o:['駅','家','水','人'],a:0,e:'역＝駅。'},
{id:17,cat:'Reading',q:'한국 사람 の意味として最も近いものは？',text:'한국 사람',o:['韓国の家','韓国人','日本人','韓国の水'],a:1,e:'韓国＋人＝韓国人です。'},
{id:18,cat:'Reading',q:'물 주세요 の意味は？',text:'물 주세요',o:['水をください','ご飯をください','家に行きます','大丈夫です'],a:0,e:'주세요 は「ください」。'},
{id:19,cat:'Reading',q:'화장실 어디예요? の意味は？',text:'화장실 어디예요?',o:['トイレはどこですか？','駅はどこですか？','これは何ですか？','名前は何ですか？'],a:0,e:'어디예요?＝どこですか。'},
{id:20,cat:'Reading',q:'메뉴 뭐예요? に最も近い意味は？',text:'메뉴 뭐예요?',o:['メニューは何ですか？','ホテルはどこ？','水をください','名前は何？'],a:0,e:'뭐예요?＝何ですか。'},
{id:21,cat:'Reading',q:'저는 일본 사람이에요. の意味は？',text:'저는 일본 사람이에요.',o:['私は韓国人です','私は日本人です','私は学生ではありません','私は水が欲しいです'],a:1,e:'저는＝私は、일본 사람＝日本人。'},
{id:22,cat:'Reading',q:'이름이 뭐예요? の意味は？',text:'이름이 뭐예요?',o:['どこですか？','何を食べますか？','お名前は何ですか？','大丈夫ですか？'],a:2,e:'自己紹介で頻出する質問です。'},
{id:23,cat:'Reading',q:'저는 학생이에요. から分かることは？',text:'저는 학생이에요.',o:['話者は学生','話者は店員','話者は日本人','話者はホテルにいる'],a:0,e:'학생＝学生。'},
{id:24,cat:'Reading',q:'카페예요. の意味は？',text:'카페예요.',o:['カフェです','ホテルです','駅です','家です'],a:0,e:'名詞＋예요 の定型を意味として理解します。'},
{id:25,cat:'Listening',q:'音声を聞いて意味を選んでください。',audio:'안녕하세요',o:['こんにちは','ありがとうございます','水をください','いいえ'],a:0,e:'文字を見ず音だけから認識します。'},
{id:26,cat:'Listening',q:'音声を聞いて意味を選んでください。',audio:'감사합니다',o:['大丈夫です','ありがとうございます','こんにちは','ください'],a:1,e:'音のまとまりとして認識します。'},
{id:27,cat:'Listening',q:'音声を聞いて相手が求めているものを選んでください。',audio:'물 주세요',o:['水','食事','家','名前'],a:0,e:'물＋주세요。'},
{id:28,cat:'Listening',q:'音声を聞いて、尋ねている場所を選んでください。',audio:'화장실 어디예요?',o:['駅','カフェ','トイレ','ホテル'],a:2,e:'화장실 を聞き取ります。'},
{id:29,cat:'Listening',q:'音声の意味として最も近いものは？',audio:'네, 괜찮아요',o:['はい、大丈夫です','いいえ、ください','こんにちは、ありがとう','水がありません'],a:0,e:'短い返答を一まとまりで理解します。'},
{id:30,cat:'Listening',q:'音声を聞き、数字を選んでください。',audio:'셋',o:['1','2','3','5'],a:2,e:'셋＝3。'},
{id:31,cat:'会話Listening',q:'A/Bの会話を聞き、何をしているか選んでください。',lines:['안녕하세요.','안녕하세요.'],o:['挨拶','注文','謝罪','場所確認'],a:0,e:'同じ挨拶を返しています。'},
{id:32,cat:'会話Listening',q:'A/Bの会話から正しいものを選んでください。',lines:['물 주세요.','네.'],o:['Aが水を頼みBが了承','Aが水を断る','Bが名前を聞く','Aが謝る'],a:0,e:'依頼→了承の1ラリーです。'},
{id:33,cat:'会話Listening',q:'Aは何を尋ね、Bは何と答えていますか？',lines:['이름이 뭐예요?','저는 유나예요.'],o:['国籍→日本人','名前→ユナ','場所→駅','注文→水'],a:1,e:'名前を尋ね、名前を答えています。'},
{id:34,cat:'会話Listening',q:'会話から分かることは？',lines:['뭐예요?','메뉴예요.'],o:['Bは「メニューです」と答える','Bは水を頼む','Aは謝る','Aはホテルを探す'],a:0,e:'뭐예요?＝何ですか、메뉴예요＝メニューです。'},
{id:35,cat:'会話Listening',q:'会話の状況として最も近いものは？',lines:['화장실 어디예요?','저기예요.'],o:['トイレの場所を尋ねている','水を注文','名前を聞く','挨拶'],a:0,e:'Level 1では 저기예요 を「向こうです」という場面表現として認識します。'},
{id:36,cat:'スピーチListening',q:'短い自己紹介を聞き、正しい内容を選んでください。',audio:'안녕하세요. 저는 유나예요. 일본 사람이에요. 감사합니다.',o:['ユナという日本人','ユナという韓国人','学生のミンス','水を注文している'],a:0,e:'名前・国籍を短いスピーチから拾います。'},
{id:37,cat:'スピーチListening',q:'話者について分かることは？',audio:'안녕하세요. 저는 학생이에요. 이름은 민수예요. 감사합니다.',o:['学生で名前はミンス','日本人で名前はユナ','ホテルの店員','カフェにいる'],a:0,e:'학생 と 민수 を聞き取ります。'},
{id:38,cat:'スピーチListening',q:'状況として最も近いものは？',audio:'카페예요. 메뉴예요. 물 주세요. 감사합니다.',o:['カフェで水を頼む流れ','駅で道を聞く','ホテルで自己紹介','家で謝る'],a:0,e:'複数の既習語から場面を推論します。'},
{id:39,cat:'実践理解',q:'店員から何かを勧められ、必要ないので丁寧に断りたい。最も使いやすい表現は？',o:['감사합니다','괜찮아요','주세요','안녕하세요'],a:1,e:'괜찮아요 は「結構です」の意味でも使えます。'},
{id:40,cat:'実践理解',q:'自分の名前を尋ねられたときの返答として最も近い形は？',o:['저는 ○○예요.','물 주세요.','화장실 어디예요?','아니요.'],a:0,e:'Level 1では自己紹介の定型パターンを認識します。'}];;
const beforeExamView=examView;
const beforeRender=render;
function fromLevel(){return Math.max(1,Math.min(10,Number(state.currentLevel)||1))}
function targetLevel(){return Math.min(10,fromLevel()+1)}
function levelText(s){const f=fromLevel(),t=targetLevel();return String(s)
 .replace(/L1 → L2/g,`L${f} → L${t}`)
 .replace(/Level 1 昇格試験/g,`Level ${t} 昇格試験`)
 .replace(/Level 1の12単元/g,`Level ${f}までの学習範囲`);}
function promotionIntro(){
 if(fromLevel()>=10)return '<section class="card hero"><span class="pill">LEVEL UP EXAM</span><h2>Level 10 到達済み</h2><p>現在が最高Levelです。</p></section>';
 return levelText(examIntro());
}
function promotionQuestions(){return PROMOTION_TEMPLATE.map(q=>({...q,o:[...(q.o||[])],_promotionTarget:targetLevel()}))}
function promotionView(){
 const qs=state.v953PromotionQuestions||[];
 if(!state.examStarted)return promotionIntro();
 if(state.examResult)return reviewPage(qs,state.answers,state.examResult,`Level ${state.v953PromotionTarget} 昇格試験`,'LEVEL UP EXAM');
 return levelText(quizPage(qs,state.qIndex,state.answers,'exam'));
}
examView=function(){
 if(state.v90TestMode==='promotion')return `<div class="v90TestSub"><button class="v90Back" id="v90BackTestsTop">← テスト一覧</button><b>Level ${targetLevel()} 昇格試験</b></div>${promotionView()}`;
 return beforeExamView();
};
render=function(){
 beforeRender();
 if(state.view!=='exam'||state.v90TestMode!=='promotion')return;
 const start=document.getElementById('startExam');
 if(start)start.onclick=()=>{state.v953PromotionTarget=targetLevel();state.v953PromotionQuestions=promotionQuestions();state.examStarted=true;state.qIndex=0;state.answers={};state.examResult=null;render()};
 const back=document.getElementById('v90BackTestsTop');if(back)back.onclick=()=>{state.examStarted=false;state.examResult=null;state.answers={};state.qIndex=0;state.v953PromotionQuestions=[];state.v90TestMode='hub';render();window.scrollTo({top:0,behavior:'smooth'})};
 if(state.examStarted&&!state.examResult&&(state.v953PromotionQuestions||[]).length){
  const qs=state.v953PromotionQuestions;
  bindQuiz('exam',qs,()=>state.qIndex,v=>state.qIndex=v,state.answers,v=>{state.examResult=v;recordTest('昇格',state.v953PromotionTarget,v,qs);if(v.score>=80&&state.currentLevel<state.v953PromotionTarget){state.currentLevel=state.v953PromotionTarget;localStorage.setItem('korean-current-level',String(state.currentLevel))}});
 }
 if(state.examResult){const rr=document.getElementById('reviewRestart');if(rr)rr.onclick=()=>{state.examStarted=false;state.examResult=null;state.answers={};state.qIndex=0;state.v953PromotionQuestions=[];render()};if(state.examResult.score>=80){const h=document.querySelector('#content .hero h2');if(h)h.textContent=`合格。Level ${state.currentLevel} に昇格しました。`}}
 document.querySelectorAll('.v82version').forEach(e=>e.textContent='v9.5.3');
};
render();
})();