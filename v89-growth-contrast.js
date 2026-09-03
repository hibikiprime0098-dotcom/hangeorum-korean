(()=>{
if(window.__HANGEORUM_V89_GROWTH_CONTRAST__)return;window.__HANGEORUM_V89_GROWTH_CONTRAST__=true;
window.HANGEORUM_VERSION='8.9';document.title='한걸음 | 韓国語学習 v8.9';
const style=document.createElement('style');
style.id='v89-growth-contrast';
style.textContent=`
.growthHero .heroActions .primary{background:#fff!important;color:#111!important;border-color:#fff!important;}
.growthHero .heroActions .ghost{background:rgba(255,255,255,.035)!important;color:#fff!important;border-color:#bfc1c5!important;}
.growthHero .heroActions .ghost:hover{background:rgba(255,255,255,.09)!important;color:#fff!important;border-color:#fff!important;}
.growthHero .heroActions button{font-weight:850!important;white-space:nowrap;}
.growthHero .pill{background:#f3f3f1!important;color:#4c4c4c!important;border-color:#ededeb!important;}
`;
document.head.appendChild(style);
const prevRender89=render;
render=function(){prevRender89();document.querySelectorAll('.v82version').forEach(e=>e.textContent='v8.9')};
render();
})();
