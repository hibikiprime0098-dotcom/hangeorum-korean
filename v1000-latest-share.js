(()=>{
if(window.__HANGEORUM_V1000__)return;window.__HANGEORUM_V1000__=1;
window.HANGEORUM_VERSION='10.0';document.title='한걸음 | 韓国語学習 v10.0';
const params=new URLSearchParams(location.search);
if(params.get('fresh')==='1'){
 const keys=['korean-current-level','korean-listen-level','korean-listen-scope','korean-grammar-level','korean-grammar-done','korean-grammar-priority','korean-vocab-level','korean-vocab-mode','korean-vocab-priority','korean-vocab-known','korean-mini-level','korean-test-history','korean-promotion-ledger-v3','korean-progress-backup-v3'];
 keys.forEach(k=>localStorage.removeItem(k));
 state.currentLevel=1;state.listenLevel=1;state.listenScope='level';state.grammarLevel=1;state.grammarDone={};state.vocabLevel=1;state.vocabKnown={};state.miniLevel=1;state.testHistory=[];state.view='learn';state.learnTab='course';state.v90TestMode='hub';
 history.replaceState(null,'',location.pathname);
}
const oldRender=render;render=function(){oldRender();document.querySelectorAll('.v82version').forEach(e=>e.textContent='v10.0')};render();
})();