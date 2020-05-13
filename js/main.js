var timestampMesswerte;
var valueLufttemperatur;
var valueWassertemperatur;
var valueSubstrattemperatur;
var dweetThingId="aquaponics.sensors.489ec411-b663-4b05-9e6c-b841579d6dd2";

function onMessageEvent(messageEvent)
{
    let message = JSON.parse(messageEvent.data);

    valueWassertemperatur.textContent = message.Wert + ' °C';
}

function onDweetEvent(dweetMessage){
    
    let timestamp = dweetMessage.created;

    let weekday = new Intl.DateTimeFormat('de-DE', { weekday: 'long' }).format(timestamp);
    let date = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(timestamp);
    let time = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }).format(timestamp);

    timestampMesswerte.textContent = `Letzte Aktualisierung am ${weekday} ${date} um ${time} Uhr`;
    
    if (dweetMessage.content.id==="WaterTemperatureFishTank"){
        valueWassertemperatur.textContent = dweetMessage.content.value + ' °C';
    }

    if (dweetMessage.content.id==="AirTemperatureOutside"){
        valueLufttemperatur.textContent = dweetMessage.content.value + ' °C';
    }
}

window.onload = function() {

    let navigationMenuButton = document.getElementById('navigation-menu-button');
    let navigationBar = document.getElementById('navigation-bar');

    navigationMenuButton.addEventListener('click', function(){
        navigationBar.classList.toggle('is-active');
        navigationMenuButton.classList.toggle('is-active');
    });

    timestampMesswerte = document.getElementById('timestampMesswerte');
    valueLufttemperatur = document.getElementById('valueLufttemperatur');
    valueWassertemperatur = document.getElementById('valueWassertemperatur');
    valueSubstrattemperatur = document.getElementById('valueSubstrattemperatur');
       
    dweetio.get_latest_dweet_for(dweetThingId, function(err, dweet){
        onDweetEvent(dweet[0]);
    });

    dweetio.listen_for(dweetThingId, function(dweet){
        onDweetEvent(dweet);
    });

    // const socket = new WebSocket('ws://127.0.0.1:8100');
    // socket.addEventListener('message', function(event) {onMessageEvent(event)});
};