(()=>{
if(window.__HANGEORUM_V1002_MOBILE_POLISH__)return;
window.__HANGEORUM_V1002_MOBILE_POLISH__=1;
window.HANGEORUM_VERSION='10.0';
window.HANGEORUM_BUILD='1007';

const style=document.createElement('style');
style.id='v1002-mobile-polish';
style.textContent=`
/* v10.0 build 1007
   Final mobile contrast + fresh-share reliability polish. */

/* Android/WebKit can keep an old -webkit-text-fill-color even after color changes.
   Make every button label follow its computed text color. */
#content button,#content button *,
.mobileNav button,.mobileNav button *{
  -webkit-text-fill-color:currentColor!important;
}

/* Test hub: selected Level and black CTA buttons must always be readable. */
#content .v90TestLevels button.active,
#content .miniLevelRow button.active{
  background:#111!important;
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
  border-color:#111!important;
}
#content .v90TestLevels button:not(.active),
#content .miniLevelRow button:not(.active){
  color:#111!important;
  -webkit-text-fill-color:#111!important;
}
#content .v90TestCard .primary,
#content .v90TestCard .primary *,
#content .v90PromotionCard .primary,
#content .v90PromotionCard .primary *{
  background:#111!important;
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
  opacity:1!important;
}

/* Roadmap hero contains a deliberately light summary panel.
   Override the parent hero's white-text rule inside that panel. */
#content .hero .levelCurrentCard{
  color:#111!important;
  background:linear-gradient(135deg,#fff1f7,#eef7ff)!important;
  border-color:#e1e1de!important;
}
#content .hero .levelCurrentCard>b{
  color:#111!important;
  -webkit-text-fill-color:#111!important;
}
#content .hero .levelCurrentCard p{
  color:#4f4f4f!important;
  -webkit-text-fill-color:#4f4f4f!important;
}
#content .hero .levelCurrentCard .v82note{
  color:#666!important;
  -webkit-text-fill-color:#666!important;
}
#content .hero .levelCurrentCard .levelBenchmark>div{
  background:rgba(255,255,255,.92)!important;
  border-color:#e1e1de!important;
}
#content .hero .levelCurrentCard .levelBenchmark small{
  color:#666!important;
  -webkit-text-fill-color:#666!important;
}
#content .hero .levelCurrentCard .levelBenchmark b{
  color:#111!important;
  -webkit-text-fill-color:#111!important;
}

/* Keep content clear of the fixed bottom navigation on small phones. */
@media(max-width:900px){
  .main{padding-bottom:calc(116px + env(safe-area-inset-bottom))!important}
}
`;
document.head.appendChild(style);

function applyV1002(){
  document.querySelectorAll('.v82version').forEach(e=>e.textContent='v10.0');

  document.querySelectorAll('#content .v90TestLevels button.active,#content .miniLevelRow button.active').forEach(b=>{
    b.style.setProperty('color','#fff','important');
    b.style.setProperty('-webkit-text-fill-color','#fff','important');
  });

  document.querySelectorAll('#content .v90TestCard .primary,#content .v90PromotionCard .primary').forEach(b=>{
    b.style.setProperty('color','#fff','important');
    b.style.setProperty('-webkit-text-fill-color','#fff','important');
  });

  document.querySelectorAll('#content .hero .levelCurrentCard').forEach(card=>{
    card.style.setProperty('color','#111','important');
    card.querySelectorAll('b').forEach(x=>{
      x.style.setProperty('color','#111','important');
      x.style.setProperty('-webkit-text-fill-color','#111','important');
    });
    card.querySelectorAll('p').forEach(x=>{
      const c=x.classList.contains('v82note')?'#666':'#4f4f4f';
      x.style.setProperty('color',c,'important');
      x.style.setProperty('-webkit-text-fill-color',c,'important');
    });
    card.querySelectorAll('.levelBenchmark small').forEach(x=>{
      x.style.setProperty('color','#666','important');
      x.style.setProperty('-webkit-text-fill-color','#666','important');
    });
  });
}

try{
  const previousRender=render;
  render=function(){
    const out=previousRender.apply(this,arguments);
    requestAnimationFrame(applyV1002);
    return out;
  };
}catch(e){}

applyV1002();
requestAnimationFrame(applyV1002);
setTimeout(applyV1002,120);
setTimeout(applyV1002,500);
})();