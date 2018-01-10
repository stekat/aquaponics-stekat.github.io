var loadMoreButton;

var wassertemperaturWert;

var instaFeed = new Instafeed({
    get: 'user',
      limit: 12,
      userId: 6222370876,
      accessToken: '6222370876.b2bd864.911c2ac30350450cae68101d17bf4cd5',
      resolution: 'thumbnail',
      template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
      after: function() {
        if (!this.hasNext()) {
            loadMoreButton.style.display = 'none';
        }
      },
});

function onMessageEvent(messageEvent)
{
    var message = JSON.parse(messageEvent.data);

    wassertemperaturWert.textContent = message.Wert + ' °C';
}

window.onload = function() {
    wassertemperaturWert = document.getElementById('wassertemperaturWert');

    loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', function() {
        instaFeed.next();
    });

    instaFeed.run();

    const socket = new WebSocket('ws://127.0.0.1:8100');
    socket.addEventListener('message', function(event) {onMessageEvent(event)});
};