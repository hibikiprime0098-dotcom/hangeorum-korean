(()=>{
if(window.__HANGEORUM_V82_CORE__)return;window.__HANGEORUM_V82_CORE__=true;
window.V82_GRAMMAR_TARGETS=[20,22,24,24,24,26,26,24,20,20];
window.V82_LEVEL_META={
1:{jp:'ハングルの文字と音、挨拶、自己紹介、超基本表現が分かる入門段階。',topik:'TOPIK I 1級より前〜入口',hangul:'ハン検 入門級〜5級入口',can:'ハングルを読み、挨拶・名前・国籍・超基本的な質問を理解する。'},
2:{jp:'数字・時刻・場所・注文など、短い生活会話を定型表現中心に処理できる段階。',topik:'TOPIK I 1級入口',hangul:'ハン検 5級前後',can:'カフェ・買い物・移動で使う短い表現を聞いて反応できる。'},
3:{jp:'基本助詞・時制・否定・希望を使う短文を読み聞きし、簡単な会話を追える段階。',topik:'TOPIK I 1級目安',hangul:'ハン検 5級〜4級入口',can:'身近な話題の1〜3文を理解し、短い質問と返答を処理する。'},
4:{jp:'旅行の主要場面を韓国語で処理し、過去・未来・理由・条件を含む基本会話を理解する段階。',topik:'TOPIK I 2級目安',hangul:'ハン検 4級前後',can:'注文・交通・ホテル・許可・依頼をスマホに頼り切らず進める。'},
5:{jp:'経験・理由・計画・比較をつないで、10〜20秒程度の会話や案内の大意を取れる段階。',topik:'TOPIK II 3級入口',hangul:'ハン検 4級〜3級入口',can:'簡単な雑談を続け、短い説明や案内をまとまりで理解する。'},
6:{jp:'トラブル対応・変更依頼・聞き返しまで含め、一人旅をかなり自力で進められる実用段階。',topik:'TOPIK II 3級目安',hangul:'ハン検 3級前後',can:'自然速度の生活会話から要点を取り、旅行上の問題を韓国語で解決する。'},
7:{jp:'반말・相槌・感情・推測を理解し、韓国人との日常的な雑談が成立し始める段階。',topik:'TOPIK II 3〜4級目安',hangul:'ハン検 3級〜準2級入口',can:'友人同士の会話の意図や感情を取り、自分の意見も短く返す。'},
8:{jp:'縮約・省略・若者の口語に慣れ、字幕なし動画を大筋で理解できる中上級入口。',topik:'TOPIK II 4級目安',hangul:'ハン検 準2級前後',can:'30〜60秒の自然なトークで話題・結論・感情を追う。'},
9:{jp:'高速会話、話題転換、冗談、含みを文脈から推論し、配信をかなり追える段階。',topik:'TOPIK II 4〜5級目安',hangul:'ハン検 準2級〜2級の一部',can:'未知語があっても前後関係から意味を補い、長めの会話の流れを維持する。'},
10:{jp:'旅行・日常会話・動画／配信を統合し、逐語訳せず韓国語を意味として処理する実戦段階。',topik:'Listening / Readingは TOPIK II 5級前後を目標',hangul:'ハン検 準2級〜2級相当の受容力を目標',can:'スマホなし旅行＋自然な日常会話＋韓国語コンテンツの主要内容理解。'}
};
state.listenLevel=Math.max(1,Math.min(state.currentLevel,Number(localStorage.getItem('korean-listen-level')||state.currentLevel)));
state.listenScope=localStorage.getItem('korean-listen-scope')||'level';
window.v82LevelMeta=lv=>V82_LEVEL_META[lv]||V82_LEVEL_META[1];
window.v82Benchmark=lv=>{const m=v82LevelMeta(lv);return `<div class="levelBenchmark"><div><small>実際の韓国語力</small><b>${m.jp}</b></div><div><small>TOPIK目安</small><b>${m.topik}</b></div><div><small>ハングル検定目安</small><b>${m.hangul}</b></div></div>`};
window.v82CurrentSummary=(lv=state.currentLevel)=>{const m=v82LevelMeta(lv);return `<div class="levelCurrentCard"><b>Level ${lv} の実力目安</b><p>${m.jp}</p>${v82Benchmark(lv)}<p class="v82note">※ TOPIK・ハン検は技能構成が異なるため完全換算ではありません。TOPIK II 5級以上の正式合格にはWriting対策が別途必要です。</p></div>`};
const css=document.createElement('style');css.textContent=`.levelBenchmark{display:grid;grid-template-columns:1.35fr .8fr .8fr;gap:7px;margin-top:9px}.levelBenchmark>div{background:#f7f7f5;border:1px solid #ececea;border-radius:11px;padding:9px}.levelBenchmark small{display:block;color:#8a8a8a;font-size:8px;margin-bottom:4px}.levelBenchmark b{font-size:10px;line-height:1.55}.levelCurrentCard{margin:0 0 14px;padding:13px;border-radius:14px;background:linear-gradient(135deg,var(--pink-soft),var(--blue-soft));border:1px solid #e4e4e1}.levelCurrentCard>b{display:block;font-size:12px;margin-bottom:5px}.levelCurrentCard p{margin:0;font-size:10px;line-height:1.65;color:#555}.levelCurrentCard .v82note{margin-top:7px;color:#777}.listenLevelRow{display:flex;gap:6px;overflow:auto;padding:4px 0 10px;scrollbar-width:none}.listenLevelRow button{flex:0 0 auto;border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 11px;font-size:10px;font-weight:850}.listenLevelRow button.active{background:#111;color:#fff;border-color:#111}.listenScope{display:flex;gap:7px;margin-bottom:12px}.listenScope button{border:1px solid var(--line);background:#fff;border-radius:11px;padding:9px 12px;font-size:10px;font-weight:850}.listenScope button.active{background:#111;color:#fff}.grammarUsage{margin-top:10px;padding:12px 13px;border:1px solid var(--line);border-radius:12px;background:#fff;font-size:10.5px;line-height:1.75;color:#555}.grammarUsage b{color:#111}.grammarUsage ul{margin:7px 0 0;padding-left:18px}.grammarUsage li{margin:4px 0}.grammarExampleTop{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.grammarExampleTop .korean{flex:1}.exampleAudio{flex:0 0 auto;border:1px solid var(--line);background:#fff;border-radius:9px;padding:6px 8px;font-size:9px;min-height:30px}.grammarCount{display:inline-flex;margin-left:5px;padding:3px 6px;border-radius:999px;background:#f1f1ef;font-size:8px}.v82version{font-size:8px;color:#aaa;margin-left:6px}@media(max-width:700px){.levelBenchmark{grid-template-columns:1fr}}`;document.head.appendChild(css);
})();
