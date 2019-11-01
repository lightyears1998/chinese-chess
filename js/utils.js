const messageTime = 1000;

function showDialog(message) {
  $('#dialog').fadeIn(500);
  $('#dialog').text(message);
  setTimeout(function() {
    $('#dialog').fadeOut(1000);
  }, messageTime)
}