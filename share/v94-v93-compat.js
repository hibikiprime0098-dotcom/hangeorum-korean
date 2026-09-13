(()=>{
if(window.__HANGEORUM_SHARED_V94_COMPAT__)return;window.__HANGEORUM_SHARED_V94_COMPAT__=true;
const oldRender=render;
render=function(){
  const data=state?.vocabData;
  if(Array.isArray(data)&&data.length&&!data.__sharedV92){
    try{Object.defineProperty(data,'__sharedV92',{value:true,configurable:true})}catch(e){data.__sharedV92=true}
  }
  oldRender();
};
render();
})();
