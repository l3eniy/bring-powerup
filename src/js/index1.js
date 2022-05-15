
var BRING_ICON = 'https://global-uploads.webflow.com/5fbe6548a005d56f0dd39a2e/5fc24a65f7e1555200865e1b_bring-logo.svg';
var Promise = TrelloPowerUp.Promise
var TRELLO_API_KEY = "00c34f6aad85b68994bdc5dbc0c5454a"
var API_CALLS_SLEEP_DURATION = 125



var onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
    let x = t.get('member', 'private', 'auth');
    console.log(x);
};


function onCardChecklistsClick (e) {
    return ensureUserAuthorized(e, function () {
        return e.popup({
            title: "Download Checklists As...",
            items: [{text: "TXT file", callback: downloadCardChecklists}]
        })
    })
}

function ensureUserAuthorized(e, t) {
    return e.get("member", "private", "token").then(function (n) {
        return n ? t() : renderAuthPopup(e)
    })
}

function renderAuthPopup(e) {
    return e.popup({
        title: "Authorization Required",
        args: {apiKey: TRELLO_API_KEY},
        url: "./authorize.html",
        height: 180
    })
}

function downloadCardChecklists (e) {
    return getChecklists(e, "cards", e.getContext().card).then(function (t) {
        //var n = stringifyChecklist(t);
        console.log(t)
        e.closePopup()
    })
}

function getChecklists (e, t, n) {
    return new Promise(function (r) {
        return e.get("member", "private", "token").then(function (e) {
            var o = new XMLHttpRequest;
            o.addEventListener("readystatechange", function () {
                this.readyState === this.DONE && r(JSON.parse(this.responseText))
            }), o.open("GET", "https://api.trello.com/1/" + t + "/" + n + "/checklists?key=" + TRELLO_API_KEY + "&token=" + e),
                o.send(null)
        })
    })
}


window.TrelloPowerUp.initialize({
    'show-settings': function(t, options){
        // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
        // what should Trello show. We highly recommend the popup in this case as
        // it is the least disruptive, and fits in well with the rest of Trello's UX
        return t.popup({
            title: 'Bring anmelden',
            url: './configure.html',
            height: 184 // we can always resize later
        });
    }, "card-buttons": function (e) {
        var t = {icon: BRING_ICON, text: "zu Bring", callback: onCardChecklistsClick};
        return e.card("all").then(function (e) {
            return e.badges.checkItems > 0 ? [t] : []
        })
    }, "authorization-status": function (e) {
        return e.get("member", "private", "token").then(function (e) {
            return {authorized: !!e}
        })
    }, "show-authorization": function (e) {
        return renderAuthPopup(e)
    }
}, {
    appKey: '00c34f6aad85b68994bdc5dbc0c5454a',
    appName: 'bring-powerup'
});