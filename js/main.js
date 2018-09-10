var loadMoreButton;

var wassertemperaturWert;

var instaFeed = new Instafeed({
    get: 'user',
      limit: 5,
      userId: 6222370876,
      accessToken: '6222370876.dffef3af091d4b278d03b1dd96c44ab5',
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

    // const socket = new WebSocket('ws://127.0.0.1:8100');
    // socket.addEventListener('message', function(event) {onMessageEvent(event)});
};