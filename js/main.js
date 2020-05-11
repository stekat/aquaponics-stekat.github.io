var wassertemperaturWert;
var aussentemperaturWert;
var innentemperaturWert;
var messwerteTimestamp;
var dweetThingId="aquaponics.sensors.489ec411-b663-4b05-9e6c-b841579d6dd2";

function onMessageEvent(messageEvent)
{
    let message = JSON.parse(messageEvent.data);

    wassertemperaturWert.textContent = message.Wert + ' °C';
}

function onDweetEvent(dweetMessage){
    
    let timestamp = dweetMessage.created;

    let weekday = new Intl.DateTimeFormat('de-DE', { weekday: 'long' }).format(timestamp);
    let date = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(timestamp);
    let time = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }).format(timestamp);

    messwerteTimestamp.textContent = `Letzte Aktualisierung am ${weekday} ${date} um ${time} Uhr`;
    
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

    let navigationMenuButton = document.getElementById('navigation-menu-button');
    let navigationBar = this.document.getElementById('navigation-bar');

    navigationMenuButton.addEventListener('click', function(){
        navigationBar.classList.toggle('is-active');
        navigationMenuButton.classList.toggle('is-active');
    });

    messwerteTimestamp = document.getElementById('messwerteTimestamp');
    innentemperaturWert = document.getElementById('innentemperaturWert');
    wassertemperaturWert = document.getElementById('wassertemperaturWert');
    aussentemperaturWert = document.getElementById('aussentemperaturWert');
       
    dweetio.get_latest_dweet_for(dweetThingId, function(err, dweet){
        onDweetEvent(dweet[0]);
    });

    dweetio.listen_for(dweetThingId, function(dweet){
        onDweetEvent(dweet);
    });

    // const socket = new WebSocket('ws://127.0.0.1:8100');
    // socket.addEventListener('message', function(event) {onMessageEvent(event)});
};