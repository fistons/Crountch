var copyTextareaBtn = document.getElementById('copy-btn');

copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.getElementById('url');
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});