(()=>{
  if(window.__HANGEORUM_V91_NAV_VISIBILITY__) return;
  window.__HANGEORUM_V91_NAV_VISIBILITY__=true;
  window.HANGEORUM_VERSION='9.1';

  const NAV=[['learn','▤','学習'],['exam','✓','テスト'],['progress','◇','成長'],['roadmap','↗','ロードマップ']];

  function normalizeState(){
    try{
      if(typeof state==='object'&&state){
        if(state.view==='home'||state.view==='listen') state.view='learn';
        if(!['learn','exam','progress','roadmap'].includes(state.view)) state.view='learn';
      }
    }catch(e){}
  }

  // 4タブ構成を最終定義。ホームと独立Listeningを廃止する。
  try{
    navHTML=function(m=false){
      normalizeState();
      return NAV.map(n=>`<button type="button" class="${state.view===n[0]?'active':''}" data-go="${n[0]}" aria-label="${n[2]}へ移動" ${state.view===n[0]?'aria-current="page"':''}><span>${n[1]}</span>${m?'<br>':''}${n[2]}</button>`).join('');
    };
  }catch(e){}

  // 既存renderの前後で旧ビューを必ず学習へ寄せる。
  try{
    const oldRender=render;
    render=function(){
      normalizeState();
      const out=oldRender.apply(this,arguments);
      requestAnimationFrame(()=>{
        normalizeState();
        document.body.dataset.hangeorumView=state.view;
        enforceDom();
      });
      return out;
    };
  }catch(e){}

  function enforceDom(){
    // 万一古いナビHTMLが残っていても、4タブへ置換する。
    document.querySelectorAll('.mobileNav,.sideNav nav,.desktopNav').forEach(nav=>{
      const oldHome=nav.querySelector('[data-go="home"]');
      const oldListen=nav.querySelector('[data-go="listen"]');
      if(oldHome||oldListen){
        const mobile=nav.classList.contains('mobileNav');
        nav.innerHTML=typeof navHTML==='function'?navHTML(mobile):'';
      }
    });
  }

  const style=document.createElement('style');
  style.id='v91-nav-visibility-style';
  style.textContent=`
    /* ===== Bottom navigation: 4 destinations only ===== */
    .mobileNav{grid-template-columns:repeat(4,minmax(0,1fr))!important}
    .mobileNav [data-go="home"],.mobileNav [data-go="listen"]{display:none!important}
    @media(max-width:900px){
      .mobileNav button{min-width:0!important;font-size:10px!important;min-height:60px!important;padding:7px 2px calc(7px + env(safe-area-inset-bottom))!important}
      .mobileNav button span{font-size:17px!important;line-height:1.1!important}
    }

    /* ===== Readability repair =====
       スクリーンショットで白背景上の本文・説明・ボタン文字が薄くなっていたため、
       通常カードは十分なコントラストを固定する。 */
    #content{color:#111!important}
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero),
    #content article:not(.hero),
    #content .metric,
    #content .chartCard,
    #content .v90HistoryCard,
    #content .v90TestCard,
    #content .v90PromotionCard{
      color:#111!important;
    }
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h1,
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h2,
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h3,
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h4,
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) strong,
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) b,
    #content .v90TestCard h3,#content .v90PromotionCard h3,
    #content .sectionTitle h2,#content .sectionTitle h3{
      color:#111!important;opacity:1!important;
    }
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) p,
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) small,
    #content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) span:not(.pill):not(.scoreBadge),
    #content .sectionTitle p,
    #content .v90TestCard p,#content .v90PromotionCard p,
    #content .historyDate,#content .v90HistorySub{
      color:#5d5d5d!important;opacity:1!important;
    }
    #content button:not(.ghost):not(.v90Back),#content a{opacity:1!important}
    #content button.primary{background:#111!important;color:#fff!important}
    #content button.ghost,#content .v90Back{color:#111!important;background:#fff!important;border-color:#bdbdbd!important}

    /* Dark hero remains intentionally dark. */
    #content .v90GrowthHero,#content .v90TestHero{color:#fff!important}
    #content .v90GrowthHero h1,#content .v90GrowthHero h2,#content .v90GrowthHero h3,
    #content .v90TestHero h1,#content .v90TestHero h2,#content .v90TestHero h3,
    #content .v90GrowthHero strong,#content .v90TestHero strong{color:#fff!important}
    #content .v90GrowthHero p,#content .v90TestHero p{color:#d0d0d0!important;opacity:1!important}

    /* ページ固有：白背景カードの説明文を最低限読みやすくする */
    body[data-hangeorum-view="progress"] #content,
    body[data-hangeorum-view="exam"] #content,
    body[data-hangeorum-view="learn"] #content,
    body[data-hangeorum-view="roadmap"] #content{--muted:#616161!important}
  `;
  document.head.appendChild(style);

  normalizeState();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',enforceDom,{once:true});
  else enforceDom();
  setTimeout(enforceDom,100);
  setTimeout(enforceDom,500);
})();
