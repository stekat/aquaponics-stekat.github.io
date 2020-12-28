var timerID;
var timestampMesswerte;
var valueLufttemperatur;
var valueIntervallFlutung;
var valueWassertemperatur;
var valueSubstrattemperatur;
var elementActionDetailFlutung;
var elementCurrentActionFlutung;
var dweetThingId="aquaponics.sensors.489ec411-b663-4b05-9e6c-b841579d6dd2";

window.addEventListener('load', function() {

    let navigationMenuButton = document.getElementById('navigation-menu-button');
    let navigationBar = document.getElementById('navigation-bar');

    navigationMenuButton.addEventListener('click', function(){
        navigationBar.classList.toggle('is-active');
        navigationMenuButton.classList.toggle('is-active');
    });

    timestampMesswerte = document.getElementById('timestampMesswerte');
    valueLufttemperatur = document.getElementById('valueLufttemperatur');
    valueIntervallFlutung = document.getElementById('valueAnzahlFlutungen')
    valueWassertemperatur = document.getElementById('valueWassertemperatur');
    valueSubstrattemperatur = document.getElementById('valueSubstrattemperatur');
    elementActionDetailFlutung = document.getElementById('action-detail-Flutung');
    elementCurrentActionFlutung = document.getElementById('current-action-Flutung')
       
    dweetio.get_latest_dweet_for(dweetThingId, function(err, dweet){
        onDweetEvent(dweet[0]);
    });

    dweetio.listen_for(dweetThingId, function(dweet){
        onDweetEvent(dweet);
    });

    let currentDate = new this.Date();

    this.timerID = this.setTimeout(function() {
        this.setInterval(this.onTimerTick, 60 * 1000);
    }, (60 - currentDate.getSeconds()) * 1000);

    this.onTimerTick();
    
    // const socket = new WebSocket('ws://127.0.0.1:8100');
    // socket.addEventListener('message', function(event) {onMessageEvent(event)});
});

function onTimerTick() {

    let currentMinute = new this.Date().getMinutes();

    if ((currentMinute >= 0 && currentMinute < 15) || (currentMinute >= 30 && currentMinute < 45)){
        this.elementActionDetailFlutung.style.display="none";
        this.elementCurrentActionFlutung.style.display="block";
    }
    else{
        let remainingTime = 15 - (currentMinute - (15*(this.Math.floor(currentMinute/15))));        
        this.elementActionDetailFlutung.style.display="block";
        this.elementCurrentActionFlutung.style.display="none";
        valueIntervallFlutung.textContent = remainingTime === 0 ? 1 : remainingTime;
    }
}

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

function onDweetPumpEvent(dweetMessage){
    if (dweetMessage.content.id === "WaterPumpFishTank"){
        if (dweetMessage.content.status === 0){

            this.timerID = this.setTimeout(function() {
                this.setInterval(this.onTimerTick, 60 * 1000);
            }, (60 - currentDate.getSeconds()) * 1000);

            

            let remainingTime = 15 - (currentMinute - (15*(this.Math.floor(currentMinute/15))));        
            this.elementActionDetailFlutung.style.display="block";
            this.elementCurrentActionFlutung.style.display="none";
            valueIntervallFlutung.textContent = remainingTime === 0 ? 1 : remainingTime;
        }
        else{
            this.elementActionDetailFlutung.style.display="none";
            this.elementCurrentActionFlutung.style.display="block";
        }
    }
}