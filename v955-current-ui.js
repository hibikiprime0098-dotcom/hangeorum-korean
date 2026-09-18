(()=>{
if(window.__HANGEORUM_V955_CURRENT_UI__)return;window.__HANGEORUM_V955_CURRENT_UI__=1;
window.HANGEORUM_VERSION='9.5.5';
const oldProgress=progress;
progress=function(){
 let h=oldProgress();
 h=h.replace(/<section class="card chartCard"><div class="chartHead"><div><div class="eyebrow">SKILL BALANCE<\/div><h3>5角形バランス<\/h3><\/div><p>最新実績<\/p><\/div>[\s\S]*?<\/section><\/div><div class="sectionTitle"><h2>最近の成績/g,'</div><div class="sectionTitle"><h2>最近の成績');
 return h;
};
const s=document.createElement('style');s.textContent=`
/* Current UI is canonical on every fresh device. White surfaces = black text; black surfaces = white text. */
#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero),#content article:not(.hero),#content .metric,#content .chartCard,#content .v90HistoryCard,#content .v90TestCard,#content .v90PromotionCard{background-color:#fff;color:#111!important}
#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h1,#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h2,#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h3,#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) h4,#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) b,#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) strong,#content .metric strong,#content .chartCard h3,#content .v90HistoryCard strong,#content .v90TestCard h3,#content .v90PromotionCard h3{color:#111!important}
#content .v90GrowthHero,#content .v90TestHero,#content .hero{background:#111!important;color:#fff!important}
#content .v90GrowthHero h1,#content .v90GrowthHero h2,#content .v90GrowthHero h3,#content .v90GrowthHero b,#content .v90GrowthHero strong,#content .v90TestHero h1,#content .v90TestHero h2,#content .v90TestHero h3,#content .v90TestHero b,#content .v90TestHero strong,#content .hero h1,#content .hero h2,#content .hero h3,#content .hero b,#content .hero strong{color:#fff!important}
body[data-hangeorum-view="progress"] .growthGrid{grid-template-columns:1fr!important}
`;document.head.appendChild(s);
const oldRender=render;render=function(){oldRender();document.querySelectorAll('.v82version').forEach(e=>e.textContent='v9.5.5')};render();
})();