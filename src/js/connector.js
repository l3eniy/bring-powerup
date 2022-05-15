var BRING_ICON = 'https://global-uploads.webflow.com/5fbe6548a005d56f0dd39a2e/5fc24a65f7e1555200865e1b_bring-logo.svg';

var onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
};

window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        return [{
            // usually you will provide a callback function to be run on button click
            // we recommend that you use a popup on click generally
            icon: BRING_ICON, // don't use a colored icon here
            text: 'zu Bring',
            callback: onBtnClick,
            condition: 'edit'
        }];
    }
});