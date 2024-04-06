// ==UserScript==
// @name         Ye Olde Fishing Vortex quick pet change
// @namespace    http://tampermonkey.net/
// @version      2024-04-06
// @description  allows you to change pets in Ye Olde Fishing Vortex
// @author       toto (squeaktho)
// @match        https://www.neopets.com/water/fishing.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var pets = [];
    $.ajax({
        url: "https://www.neopets.com/quickref.phtml", // Shoutouts to Luxittarius
        method: "GET",
        success: function(data) {
            $(data).find(".pet_toggler img").each(function() {
                let name = $(this).attr("title");
                let image = $(this).attr("style").split("'")[1];
                pets.push({name: name, image: image});
            });

            // Find button
            var targetButton = $("button:contains('Cast Your Line Again')");

            // Create a container for the pet images
            var buttonContainer = $("<div></div>").css({
                "text-align": "center", // Center div lmao
                "margin-top": "10px",
            });

            // Append container after "Cast Your Line Again"
            targetButton.after(buttonContainer);

            // Create as many buttons as there are pets, use name and image attributes
            for (let i = 0; i < pets.length; i++){
                buttonContainer.append('<a id="pet1" href="https://www.neopets.com/process_changepet.phtml?new_active_pet=' + pets[i].name + '" target="_blank"><img id="petimg1" src="' + pets[i].image + '" style="margin-left: 10px;"></a>')
            }

            // Add event listener to close the new tab after a delay
            $("a[id^='pet']").on("click", function() {
                var newTab = window.open($(this).attr("href"), "_blank");
                setTimeout(function() {
                    newTab.close();
                }, 200); // This is the delay in milisecs, no idea if it can be shorter
                return false; // Prevent default link behavior
            });

        }


    });

})();

