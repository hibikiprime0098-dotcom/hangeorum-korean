(()=>{
if(window.__HANGEORUM_V1001_CONTRAST__)return;
window.__HANGEORUM_V1001_CONTRAST__=1;
window.HANGEORUM_VERSION='10.0';
window.HANGEORUM_BUILD='1006';

const style=document.createElement('style');
style.id='v1001-contrast-hotfix';
style.textContent=`
/* v10.0 build 1006: final mobile contrast hotfix.
   Explicit selectors are intentionally loaded last so dark controls never inherit black text. */

/* SMART GRAMMAR priority selector */
#content .v86guide .v86tabs button[data-v86-gpri].active,
#content .v86guide .v86tabs button[data-v86-gpri].active *,
#content .v86guide .v86tabs button[data-v86-gpri].active b{
  background:#111!important;
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
  opacity:1!important;
}
#content .v86guide .v86tabs button[data-v86-gpri]:not(.active),
#content .v86guide .v86tabs button[data-v86-gpri]:not(.active) *{
  color:#111!important;
  -webkit-text-fill-color:#111!important;
  opacity:1!important;
}

/* Main dark CTA buttons on white cards */
#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) button.primary,
#content .card:not(.hero):not(.v90GrowthHero):not(.v90TestHero) button.primary *,
#content .v86guide .heroActions #v86GrammarDrillStart,
#content .v86guide .heroActions #v86GrammarDrillStart *{
  background:#111!important;
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
  opacity:1!important;
}

/* Dark selected controls used elsewhere in learning UI */
#content .grammarLevels button.active,
#content .grammarLevels button.active *,
#content .grammarDone.done,
#content .grammarDone.done *,
#content .listenTabs button.active,
#content .listenTabs button.active *{
  background:#111!important;
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
  opacity:1!important;
}

/* Dark hero cards: white text; their white primary buttons remain black text */
#content .hero,
#content .hero h1,#content .hero h2,#content .hero h3,#content .hero h4,
#content .hero p,#content .hero span,#content .hero small,#content .hero b,#content .hero strong,
#content .v90GrowthHero,#content .v90GrowthHero *,
#content .v90TestHero,#content .v90TestHero *{
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
}
#content .hero button.primary,
#content .hero button.primary *,
#content .v90GrowthHero button.primary,
#content .v90GrowthHero button.primary *,
#content .v90TestHero button.primary,
#content .v90TestHero button.primary *{
  background:#fff!important;
  color:#111!important;
  -webkit-text-fill-color:#111!important;
}
#content .hero button.ghost,
#content .hero button.ghost *{
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
}

/* Bottom navigation is intentionally dark on mobile; force visible labels/icons. */
body .mobileNav{
  background:rgba(10,10,10,.97)!important;
}
body .mobileNav button,
body .mobileNav button span{
  color:#b8b8b8!important;
  -webkit-text-fill-color:#b8b8b8!important;
  opacity:1!important;
}
body .mobileNav button.active,
body .mobileNav button.active span{
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
  opacity:1!important;
}

/* Defensive rule for white cards so ordinary text never becomes white-on-white. */
#content .v86guide,
#content .v86guide p,
#content .v86guide h3,
#content .v86guide .v86status,
#content .v86guide .v86status *,
#content .v86guide .v86steps span{
  color:#111!important;
  -webkit-text-fill-color:#111!important;
}
#content .v86guide p,
#content .v86guide .heroActions small{
  color:#5d5d5d!important;
  -webkit-text-fill-color:#5d5d5d!important;
}
`;
document.head.appendChild(style);

function applyContrastFix(){
  document.querySelectorAll('.v82version').forEach(e=>e.textContent='v10.0');

  document.querySelectorAll('#content .v86tabs button[data-v86-gpri].active').forEach(b=>{
    b.style.setProperty('color','#fff','important');
    b.style.setProperty('-webkit-text-fill-color','#fff','important');
    b.querySelectorAll('*').forEach(x=>{
      x.style.setProperty('color','#fff','important');
      x.style.setProperty('-webkit-text-fill-color','#fff','important');
    });
  });

  document.querySelectorAll('#content .v86guide #v86GrammarDrillStart').forEach(b=>{
    b.style.setProperty('color','#fff','important');
    b.style.setProperty('-webkit-text-fill-color','#fff','important');
    b.querySelectorAll('*').forEach(x=>{
      x.style.setProperty('color','#fff','important');
      x.style.setProperty('-webkit-text-fill-color','#fff','important');
    });
  });

  document.querySelectorAll('.mobileNav button').forEach(b=>{
    const active=b.classList.contains('active');
    const c=active?'#fff':'#b8b8b8';
    b.style.setProperty('color',c,'important');
    b.style.setProperty('-webkit-text-fill-color',c,'important');
    b.querySelectorAll('span').forEach(x=>{
      x.style.setProperty('color',c,'important');
      x.style.setProperty('-webkit-text-fill-color',c,'important');
    });
  });
}

try{
  const previousRender=render;
  render=function(){
    const out=previousRender.apply(this,arguments);
    requestAnimationFrame(applyContrastFix);
    return out;
  };
}catch(e){}

applyContrastFix();
requestAnimationFrame(applyContrastFix);
setTimeout(applyContrastFix,80);
setTimeout(applyContrastFix,400);
})();
