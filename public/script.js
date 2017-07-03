var copyTextareaBtn = document.getElementById("copy-btn");

function clickOnCopy() {
  var copyTextarea = document.getElementById("url");
  copyTextarea.select();
  document.execCommand("copy");
}