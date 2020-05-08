var loadMoreButton;

var wassertemperaturWert;
var aussentemperaturWert;
var innentemperaturWert;
var messwerteTimestamp;
var dweetThingId="aquaponics.sensors.489ec411-b663-4b05-9e6c-b841579d6dd2";

var instaFeed = new Instafeed({
    get: 'user',
      limit: 5,
      userId: 6222370876,
    //   clientId: 'b2bd864e6f19412da5d29dcfae7cd587',
      accessToken: '6222370876.2e9310474d6f4e93a2203de39f105615',
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

function onDweetEvent(dweetMessage){
    
    var timestamp = dweetMessage.created;

    var hour = '' + timestamp.getHours(); 
    var minutes = '' + timestamp.getMinutes();
    var seconds = '' + timestamp.getSeconds();
    
    if (hour.length === 1) { hour = "0" + hour; }
    if (minutes.length === 1) { minutes = "0" + minutes; }
    if (seconds.length === 1) { seconds = "0" + seconds; }

    messwerteTimestamp.textContent = 'Messwerte ' + hour + ':' + minutes + ':' + seconds;
    
    if (dweetMessage.content.id==="WaterTemperatureFishTank"){
        wassertemperaturWert.textContent = dweetMessage.content.value + ' °C';
    }

    if (dweetMessage.content.id==="AirTemperatureOutside"){
        aussentemperaturWert.textContent = dweetMessage.content.value + ' °C';
    }

    if (dweetMessage.content.id==="AirTemperatureInsideGreenhouse"){
        innentemperaturWert.textContent = dweetMessage.content.value + ' °C';
    }
}

window.onload = function() {
    messwerteTimestamp = document.getElementById('messwerteTimestamp');
    innentemperaturWert = document.getElementById('innentemperaturWert');
    wassertemperaturWert = document.getElementById('wassertemperaturWert');
    aussentemperaturWert = document.getElementById('aussentemperaturWert');
       
    // loadMoreButton = document.getElementById('load-more');
    // loadMoreButton.addEventListener('click', function() {
    //     instaFeed.next();
    // });

    // instaFeed.run();

    dweetio.get_latest_dweet_for(dweetThingId, function(err, dweet){
        onDweetEvent(dweet[0]);
    });

    dweetio.listen_for(dweetThingId, function(dweet){
        onDweetEvent(dweet);
    });

    // const socket = new WebSocket('ws://127.0.0.1:8100');
    // socket.addEventListener('message', function(event) {onMessageEvent(event)});
};