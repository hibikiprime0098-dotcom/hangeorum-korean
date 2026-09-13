(()=>{
if(window.__HANGEORUM_SHARED_V92__)return;window.__HANGEORUM_SHARED_V92__=true;
window.HANGEORUM_SHARED_EDITION=true;
window.HANGEORUM_VERSION='9.2';

const SHARED_TARGETS=[100,300,650,1100,1700,2500,3400,4300,5200,6000];
const LEGACY_TARGETS=[...VOCAB_TARGETS];
const L1=`나 저 우리 너 이것 그것 저것 이거 그거 저거 여기 거기 저기 어디 뭐 무엇 누구 언제 왜 어떻게
네 아니요 안녕 감사 죄송 괜찮다 맞다
하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 열
일 이 삼 사 오 육 칠 팔 구 십
오늘 내일 어제 지금 아침 점심 저녁 밤 주말 주 월 화 수 목 금 토 일요일 월요일 화요일 수요일 목요일 금요일 토요일
시간 시 분 하루 이번 다음 지난
사람 친구 가족 엄마 아빠 어머니 아버지 이름 학생 선생님 남자 여자 아이
집 학교 회사 가게 식당 카페 호텔 역 공항 화장실 길 방 서울 한국 일본
물 밥 커피 차 우유 빵 고기 김치 라면 메뉴
돈 카드 가방 책 사진 표 문 전화 휴대폰
가다 오다 먹다 마시다 보다 듣다 말하다 하다 자다 사다 주다 받다 알다 모르다 좋아하다 싫어하다 기다리다 앉다 서다 찾다
있다 없다 좋다 나쁘다 크다 작다 많다 적다 맛있다 쉽다 어렵다 빠르다 느리다
위 아래 앞 뒤 안 밖 왼쪽 오른쪽 그리고 하지만 그래서 같이 정말 아주 조금 많이`.split(/\s+/);
const L2=`버스 지하철 택시 기차 비행기 자동차 자전거 정류장 터미널 출구 입구 티켓 좌석
직진 건너편 근처 멀다 가깝다 지도 주소 시장 백화점 편의점 마트 쇼핑 옷 신발 바지 치마 셔츠 사이즈 색 가격 얼마 할인 계산 영수증 현금
빨강 빨간색 파랑 파란색 검정 검은색 하양 흰색 노랑 초록
봄 여름 가을 겨울 날씨 비 눈 바람 구름 맑다 춥다 덥다 따뜻하다 시원하다
평일 오전 오후 새벽 매일 매주 다음주 이번주 지난주 일월 이월 삼월 사월 오월 유월 칠월 팔월 구월 시월 십일월 십이월
백 천 만 개 명 잔 병 장 번 층 살 원
아침식사 점심식사 저녁식사 음식 음료 맥주 소주 주스 콜라 과일 사과 바나나 딸기 채소 야채 생선 닭 소 소고기 돼지고기 닭고기 계란 국 찌개 면 냉면 불고기 떡볶이 비빔밥 맛 맵다 달다 짜다
병원 약국 약 의사 머리 얼굴 눈 코 입 귀 손 발 몸 배 아프다 건강
예약 체크인 체크아웃 여권 여행 관광 출발 도착 도착하다 출발하다
일하다 공부하다 배우다 읽다 쓰다 만나다 놀다 쉬다 운동하다 걷다 뛰다 타다 내리다 열다 닫다 시작하다 끝나다 만들다 사용하다 주문하다 고르다 바꾸다
말 질문 대답 한국어 일본어 영어 의미 발음 다시 천천히 사랑하다 재미있다 바쁘다 피곤하다 행복하다 슬프다 무섭다 예쁘다 귀엽다 멋있다 친절하다 깨끗하다 더럽다 비싸다 싸다 새롭다 오래되다
필요하다 원하다 가능하다 문제 도움 약속 계획 왜냐하면 그런데 또는 또 먼저 나중에 아직 이미 바로 항상 자주 가끔 거의 어느 어떤 모든 다른 같은`.split(/\s+/);
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function easyScore(x){
 const m=String(x.meaning||'');let s=0;
 if(/今日|明日|昨日|今|朝|昼|夜|曜日|週末|時間|人|家族|学校|会社|店|駅|空港|トイレ|水|ご飯|食|飲|行く|来る|見る|聞く|話す|大き|小さ|多い|少ない|上|下|前|後|左|右|どこ|何|誰/.test(m))s+=8;
 if(String(x.korean||'').length<=3)s+=2;if(m.length<=16)s+=2;
 if(/制度|傾向|関係|状況|性質|効果|程度|原因|結果|社会|政治|経済|研究|文化|機能|概念/.test(m))s-=8;return s;
}
function midScore(x){const m=String(x.meaning||'');let s=easyScore(x);if(/交通|買|服|色|天気|季節|病院|薬|体|旅行|予約|ホテル|料理|味|運動|勉強|仕事|質問|答え|感情/.test(m))s+=6;return s}
function levelForSharedRank(r){for(let i=0;i<SHARED_TARGETS.length;i++)if(r<=SHARED_TARGETS[i])return i+1;return 11}
function ensurePlan(){
 const data=state.vocabData;if(!Array.isArray(data)||!data.length||data.__sharedV92)return false;
 const core=data.filter(x=>!x.extension&&Number(x.rank)<=6000),ext=data.filter(x=>x.extension||Number(x.rank)>6000);
 core.forEach(x=>{if(x._sourceRank==null)x._sourceRank=Number(x.rank)||999999});
 const src=[...core].sort((a,b)=>a._sourceRank-b._sourceRank),used=new Set(),ordered=[];
 const pushWord=w=>{const x=src.find(y=>y.korean===w&&!used.has(y.korean));if(x){used.add(x.korean);ordered.push(x)}};
 L1.forEach(pushWord);
 [...src].filter(x=>!used.has(x.korean)).sort((a,b)=>midScore(b)-midScore(a)||a._sourceRank-b._sourceRank).forEach(x=>{if(ordered.length<100){used.add(x.korean);ordered.push(x)}});
 L2.forEach(pushWord);
 [...src].filter(x=>!used.has(x.korean)).sort((a,b)=>midScore(b)-midScore(a)||a._sourceRank-b._sourceRank).forEach(x=>{if(ordered.length<300){used.add(x.korean);ordered.push(x)}});
 src.forEach(x=>{if(!used.has(x.korean)){used.add(x.korean);ordered.push(x)}});
 const per={};SHARED_TARGETS.forEach((t,i)=>per[i+1]=t-(i?SHARED_TARGETS[i-1]:0));const seen={};
 ordered.slice(0,6000).forEach((x,i)=>{const sr=i+1,lv=levelForSharedRank(sr);seen[lv]=(seen[lv]||0)+1;const oldPrev=lv>1?LEGACY_TARGETS[lv-2]:0,oldInc=LEGACY_TARGETS[lv-1]-oldPrev,count=per[lv],pos=seen[lv];x._sharedRank=sr;x._sharedLevel=lv;x.level=lv;x.rank=oldPrev+((pos-.5)/count)*oldInc});
 ext.forEach((x,i)=>{x._sharedRank=6001+i;x._sharedLevel=11});state.vocabData.splice(0,state.vocabData.length,...ordered.slice(0,6000),...ext);Object.defineProperty(state.vocabData,'__sharedV92',{value:true,configurable:true});return true;
}
function sharedCounts(lv){const all=SHARED_TARGETS[lv-1]-(lv>1?SHARED_TARGETS[lv-2]:0);return {must:Math.ceil(all*.3),important:Math.ceil(all*.7),all}}
function replaceVocabNumbers(){
 if(state.view!=='learn'||state.learnTab!=='vocab'||!state.vocabData.length)return;const lv=Math.max(1,Math.min(10,state.vocabLevel||1)),c=sharedCounts(lv);
 document.querySelectorAll('.vocabLevels button').forEach((b,i)=>{const n=SHARED_TARGETS[i];b.textContent=`L${i+1} · ${n>=1000?(n/1000).toFixed(n%1000?1:0)+'k':n}`});
 const stats=document.querySelectorAll('.vocabHero .vocabStat b');if(stats[0])stats[0].textContent=SHARED_TARGETS[lv-1].toLocaleString()+'語';if(stats[1])stats[1].textContent=c.all.toLocaleString()+'語';
 const guide=document.querySelector('.v85guide');if(guide){const p=guide.querySelector('p');if(p)p.textContent=`難易度と使用場面を優先して、まず${c.must}語 → 重要${c.important}語まで → Level全${c.all}語へ広げます。Level 1は数字・時間・場所・身近な名詞/動詞を中心に100語から始めます。`;guide.querySelectorAll('.v85tabs button b').forEach((b,i)=>b.textContent=[c.must,c.important,c.all][i]+'語')}
 document.querySelectorAll('.vocabRow').forEach(row=>{const ko=row.querySelector('.vocabWord')?.textContent.trim(),x=state.vocabData.find(y=>y.korean===ko),rank=row.querySelector('.vocabRank');if(x&&rank){for(const n of rank.childNodes){if(n.nodeType===3){n.nodeValue='#'+(x._sharedRank||Math.round(x.rank))+'\n';break}}}});
 document.querySelectorAll('.notice').forEach(n=>{if(n.textContent.includes('既習語彙'))n.innerHTML=`Level ${lv} のListening・実力テストでは、原則として累積 <b>${SHARED_TARGETS[lv-1].toLocaleString()}語</b> を学習目安にします。Level 1は基礎語を優先し、短いから簡単という判定はしません。`});
}
const _makeVocabMini=makeVocabMini;
makeVocabMini=function(lv){ensurePlan();const pool=state.vocabData.filter(x=>x._sharedLevel===Number(lv)&&goodMeaning(x));if(pool.length<20)return _makeVocabMini(lv);const allowed=state.vocabData.filter(x=>(x._sharedLevel||99)<=Number(lv)&&goodMeaning(x)),targets=shuffle(pool).slice(0,20);return targets.map((x,i)=>{const m=window.v82CleanMeaning?v82CleanMeaning(x.meaning):String(x.meaning||'');let z,q,cat='単語';if(i%5===0){z=optionSet(m,allowed.map(y=>window.v82CleanMeaning?v82CleanMeaning(y.meaning):y.meaning));q={q:'音声だけを聞いて、最も近い日本語の意味を選んでください。',audio:x.reading||x.korean,cat:'単語Listening'}}else if(i%4===1){z=optionSet(x.korean,allowed.map(y=>y.korean));q={q:`日本語「${m}」に最も近い韓国語を選んでください。`,cat}}else{z=optionSet(m,allowed.map(y=>window.v82CleanMeaning?v82CleanMeaning(y.meaning):y.meaning));q={q:'次の韓国語の意味として最も近いものを選んでください。',text:x.korean,cat}}return {id:i+1,...q,o:z.o,a:z.a,e:`${x.korean}（${x.kana||''}）＝ ${x.meaning}。`}})};
function quickTestCard(type,lv){const cfg=type==='vocab'?['単語','20問テスト','vocab']:type==='grammar'?['文法','10問テスト','grammar']:['Listening','Listeningテスト','listening'];return `<section class="sharedQuickTest"><div><div class="eyebrow">QUICK CHECK · GROWTH SCORE</div><b>${cfg[0]}の実力を先に測る</b><p>一覧を最後までスクロールしなくても、ここからすぐ実力テストへ進めます。結果は成長画面に記録されます。</p></div><button class="primary sharedQuickStart" data-shared-test="${cfg[2]}" data-level="${lv}">${cfg[1]} →</button></section>`}
function addQuickTests(){const c=document.getElementById('content');if(!c)return;if(state.view==='learn'&&(state.learnTab==='vocab'||state.learnTab==='grammar')&&!c.querySelector('.sharedQuickTest')){const type=state.learnTab,lv=type==='vocab'?state.vocabLevel:state.grammarLevel;const tabs=c.querySelector('.studyTabs');if(tabs)tabs.insertAdjacentHTML('afterend',quickTestCard(type,lv))}if(state.view==='listen'&&!c.querySelector('.sharedQuickTest')){const anchor=c.querySelector('.levelCurrentCard')||c.firstElementChild;if(anchor)anchor.insertAdjacentHTML('afterend',quickTestCard('listening',state.listenLevel||state.currentLevel))}c.querySelectorAll('.sharedQuickStart').forEach(b=>b.onclick=()=>startMini(b.dataset.sharedTest,Number(b.dataset.level||state.currentLevel)))}
function trendSvg(items,color,label){const data=items.slice(-10),w=520,h=180,pL=34,pR=14,pT=18,pB=34,ph=h-pT-pB,pw=w-pL-pR;if(!data.length)return `<div class="sharedEmpty">まだ${label}の記録がありません。</div>`;const x=i=>pL+(data.length===1?pw/2:i*pw/(data.length-1)),y=v=>pT+(100-v)*ph/100;const grid=[0,50,100].map(v=>`<line x1="${pL}" y1="${y(v)}" x2="${w-pR}" y2="${y(v)}" stroke="#ecece8"/><text x="${pL-7}" y="${y(v)+3}" text-anchor="end" font-size="8" fill="#999">${v}</text>`).join(''),pts=data.map((d,i)=>`${x(i)},${y(d.score)}`).join(' '),dots=data.map((d,i)=>`<circle cx="${x(i)}" cy="${y(d.score)}" r="4" fill="${color}"/><text x="${x(i)}" y="${Math.max(10,y(d.score)-8)}" text-anchor="middle" font-size="8" font-weight="800" fill="#444">${d.score}</text><text x="${x(i)}" y="${h-12}" text-anchor="middle" font-size="7.5" fill="#999">${d.date||i+1}</text>`).join('');return `<svg viewBox="0 0 ${w} ${h}" class="sharedTrendSvg" role="img" aria-label="${esc(label)}の直近10回">${grid}<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`}
function growthPanel(){const h=state.testHistory||[],groups=[['単語',h.filter(x=>x.type==='単語'),'#e56d9d'],['文法',h.filter(x=>x.type==='文法'),'#6f8fe8'],['Listening',h.filter(x=>x.type==='Listening'),'#43a88f'],['総合・昇格',h.filter(x=>x.type==='総合'||x.type==='昇格'),'#202020']];return `<section class="sharedGrowthPanel"><div class="sharedGrowthHead"><div><div class="eyebrow">SCORE TREND · LAST 10 EACH</div><h3>テスト種類ごとの伸びを見る</h3><p>単語・文法・Listening・総合/昇格を混ぜず、それぞれ直近10回を表示します。</p></div><span>各系列 最大10回</span></div><div class="sharedTrendGrid">${groups.map(([name,data,color])=>`<article class="sharedTrendCard"><div class="sharedTrendTitle"><b>${name}</b><small>${data.length?`最新 ${data[data.length-1].score}点 · ${Math.min(10,data.length)}回表示`:'記録なし'}</small></div>${trendSvg(data,color,name)}</article>`).join('')}</div></section>`}
function addGrowthPanel(){if(state.view!=='progress'||state.miniActive)return;const c=document.getElementById('content');if(!c||c.querySelector('.sharedGrowthPanel'))return;const title=[...c.querySelectorAll('.sectionTitle')].find(x=>x.textContent.includes('成長推移'));if(title)title.insertAdjacentHTML('afterend',growthPanel());const old=c.querySelector('.growthGrid .chartCard');if(old)old.style.display='none';const gg=c.querySelector('.growthGrid');if(gg)gg.classList.add('sharedRadarOnly')}
function patchRoadmap(){if(state.view!=='roadmap')return;document.querySelectorAll('.roadLevel').forEach((row,i)=>{const b=row.querySelector('.benchmark');if(b)b.textContent=`語彙累積 ${SHARED_TARGETS[i].toLocaleString()}語 · 文法/口語 ${V82_GRAMMAR_TARGETS[i]}項目`})}
function patchHome(){if(state.view!=='home')return;const w=document.querySelector('.v90Welcome'),lv=Math.max(1,state.currentLevel||1);if(w){const vg=state.vocabData.length?state.vocabData.filter(x=>(x._sharedLevel||99)<=lv&&state.vocabKnown[x.korean]).length:Object.values(state.vocabKnown||{}).filter(Boolean).length;const meter=w.querySelector('.meter strong');if(meter)meter.textContent=Math.min(100,Math.round(vg/SHARED_TARGETS[lv-1]*100))+'%';const p=w.querySelector('p');if(p)p.textContent=`Level ${lv} · 単語 ${vg}語 / 文法 ${Object.values(state.grammarDone||{}).filter(Boolean).length}項目を習得済み。今日の目標は長時間ではなく、1セットを終えること。`}}
const css=`.sharedQuickTest{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:12px 0 16px;padding:17px 18px;border-radius:20px;background:#111;color:#fff;border:1px solid #111;box-shadow:0 12px 34px rgba(0,0,0,.08)}.sharedQuickTest b{display:block;font-size:15px;margin:5px 0}.sharedQuickTest p{margin:0;color:#aaa;font-size:10.5px;line-height:1.65}.sharedQuickTest .eyebrow{color:#aaa}.sharedQuickTest .primary{background:#fff!important;color:#111!important;white-space:nowrap}.sharedGrowthPanel{margin:14px 0 18px}.sharedGrowthHead{display:flex;justify-content:space-between;gap:16px;align-items:end;margin-bottom:10px}.sharedGrowthHead h3{font-size:18px;margin:5px 0 3px}.sharedGrowthHead p{margin:0;color:#777;font-size:10.5px}.sharedGrowthHead>span{font-size:9px;color:#888;background:#fff;border:1px solid #e9e9e5;border-radius:999px;padding:7px 9px}.sharedTrendGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.sharedTrendCard{background:#fff;border:1px solid #e8e8e4;border-radius:20px;padding:15px;overflow:hidden}.sharedTrendTitle{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.sharedTrendTitle b{font-size:13px}.sharedTrendTitle small{color:#888;font-size:8.5px}.sharedTrendSvg{width:100%;display:block;margin-top:6px}.sharedEmpty{min-height:150px;display:grid;place-items:center;color:#999;background:#fafaf8;border-radius:14px;margin-top:9px;font-size:10px}.growthGrid.sharedRadarOnly{grid-template-columns:1fr!important}.growthGrid.sharedRadarOnly>.chartCard:not([style*="display: none"]){max-width:620px}.vocabHero .vocabStats{margin-top:16px}.v85guide{border-color:#e1e1dc!important}.v85guide:before{content:'学習順を再設計';display:inline-flex;font-size:8px;font-weight:850;color:#315f52;background:#edf8f4;border:1px solid #d5ebe3;padding:5px 8px;border-radius:999px;margin-bottom:6px}@media(max-width:720px){.sharedQuickTest{align-items:flex-start;flex-direction:column}.sharedQuickTest .primary{width:100%}.sharedTrendGrid{grid-template-columns:1fr}.sharedGrowthHead{align-items:flex-start;flex-direction:column}.sharedTrendTitle{align-items:flex-start;flex-direction:column}}`;
const st=document.createElement('style');st.id='shared-v92-style';st.textContent=css;document.head.appendChild(st);
const oldRender=render;render=function(){ensurePlan();oldRender();ensurePlan();replaceVocabNumbers();addQuickTests();addGrowthPanel();patchRoadmap();patchHome();document.querySelectorAll('.v82version').forEach(e=>e.style.display='none')};render();
})();
