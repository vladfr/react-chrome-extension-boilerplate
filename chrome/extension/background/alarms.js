import * as AppSettings from '../../../app/constants/AppSettings'

let time = AppSettings.POMODORO;
let interval;

function tick() {
    chrome.storage.local.get('state', (obj) => {
        let timers = obj.state.timers[0];
        if (timers) {
            console.log(timers.time);
            if (timers.time <= 0) {
                chrome.storage.local.set({state: { 'timers': [{
                    time: AppSettings.POMODORO,
                    running: false
                }]}});
                clearInterval(interval);
                chrome.notifications.create('reminder', {
                    type: 'basic',
                    iconUrl: 'img/icon-128.png',
                    title: 'Pomo done!',
                    message: 'You have completed a Pomo! Time for a break!',
                    buttons: [{title:'Write summary'}]
                }, function(notificationId) {
                    console.log("Last error:", chrome.runtime.lastError);
                });
            }
            else {
                chrome.storage.local.set({state: { 'timers': [{
                    time: timers.time - 1,
                    running: true
                }]}});
            }
        }
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == 'start') {
        chrome.storage.local.set({state: { 'timers': [{
            time: AppSettings.POMODORO,
            running: false
        }]}});
        interval = setInterval(tick, 1000);
        sendResponse(true);
    }
});

chrome.notifications.onButtonClicked.addListener(function(id, btn) {
    chrome.browserAction.getPopup({}, function(popupUrl) {
        console.log(popupUrl);
    })
});