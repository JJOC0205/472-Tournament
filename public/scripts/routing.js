var handleHash = function(){
  document.body.innerHTML = document.querySelector(location.hash).innerHTML;
};
window.addEventListener("hashchange", handleHash);
window.addEventListener("load", handleHash);