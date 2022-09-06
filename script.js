// ==UserScript==
// @name         TypeRace
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://play.typeracer.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=typeracer.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function callEvent (element) {
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', false, true);
        element.dispatchEvent(evt);
    }

    document.addEventListener('click', async function (e) {
        let target = null;
        if (e.target.nodeName == 'SPAN') {
            target = e.target.parentElement;
        } else if (e.target.nodeName == 'DIV') {
            target = e.target;
        } else if (e.target.nodeName == 'INPUT') {
            let text = await navigator.clipboard.readText();
            text = text.split(' ');
            target = e.target;
            for (let i = 0; i < text.length; i++) {
                setTimeout(function () {
                    target.value = text[i] + (i === text.length - 1 ? '' : ' ');
                    callEvent(target);
                }, 400 * i)
            }
        } else return;
        if (target === null) return;
        navigator.clipboard.writeText(target.textContent);
    });
})();
