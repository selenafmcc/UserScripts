// ==UserScript==
// @name         Turmy pet change
// @namespace    http://tampermonkey.net/
// @version      2024-04-06
// @description  allows you to change pets in the Turmaculus page
// @author       toto (squeaktho)
// @match        https://www.neopets.com/medieval/turmaculus.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const diffpettext = document.createElement('h3');
    diffpettext.style.fontFamily = "'MuseoSansRounded700', 'Arial', sans-serif";
    diffpettext.style.textAlign = 'center';
    diffpettext.textContent = "Send a different petpet?";


    var pets = [];
    $.ajax({
        url: "https://www.neopets.com/home/index.phtml", // Shoutouts to Luxittarius
        method: "GET",
        success: function(data) {
            console.log("succesful query")
            $(data).find(".hp-carousel-pet").each(function() { //596
                let petpetImg = $(this).attr("data-petpetimg");
                let petpetName = $(this).attr("data-petpet");
                let ownName = $(this).attr("data-name");
                pets.push({petpetimg: petpetImg, petpetName: petpetName, ownName: ownName});
            });
            console.log(pets)

            // Find button
            var targetButton = $("button:contains('Wake Up!')");

            // Create a container for the pet images
            var buttonContainer = $("<div></div>").css({
                "text-align": "center", // Center div lmao
                "margin-top": "10px",
            });

            // Append container after "Cast Your Line Again"
            targetButton.parent().after(buttonContainer);
            targetButton.parent().after(diffpettext);


            // Create as many buttons as there are pets, use name and image attributes
            for (let i = 0; i < pets.length; i++){
                if(typeof pets[i].petpetimg !== 'undefined'){
                    buttonContainer.append('<a id="pet1" href="https://www.neopets.com/process_changepet.phtml?new_active_pet=' + pets[i].ownName + '" target="_blank"><img id="petimg1" src="' + pets[i].petpetimg + '" style="margin-left: 10px;"></a>')
                }
                else{
                    buttonContainer.append('<a id="pet1" href="https://www.neopets.com/process_changepet.phtml?new_active_pet=' + pets[i].ownName + '" target="_blank"><img id="petimg1" src="https://images.neopets.com/halloween/gravedanger/poof.gif" style="margin-left: 10px;"></a>')
                }
            }
            console.log(buttonContainer)

            // Add event listener to close the new tab after a delay
            $("a[id^='pet']").on("click", function() {
                var newTab = window.open($(this).attr("href"), "_blank");
                setTimeout(function() {
                    newTab.close();
                    location.reload(); // Reload the page after clicking on the pet
                }, 200); // This is the delay in milisecs, no idea if it can be shorter
                return false; // Prevent default link behavior
            });

        }


    });

})();

