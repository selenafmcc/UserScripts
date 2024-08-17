// ==UserScript==
// @name         Turmy pet change
// @namespace    http://tampermonkey.net/
// @version      2024-04-06
// @description  allows you to change pets in the Turmaculus page
// @author       toto but it was gurase's idea
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

    //Grab the petpets from neopets homepage :3
    var pets = [];
    $.ajax({
        url: "https://www.neopets.com/home/index.phtml", // Shoutouts to Luxittarius
        method: "GET",
        success: function(data) {
            console.log("succesful query")
            $(data).find(".hp-carousel-pet").each(function() { //find petpet and owner data
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

            // Append container after wake up button
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

            // Add event listener to close the new tab after a delay, recycled code is my best friend
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


    //Sese did this part tee hee hee
    //Get recent Turmy times from ~Brownhownd
    var todayTime; var dailyTitle;
    $.ajax({
        url: "https://www.neopets.com/~Brownhownd",
        method: "GET",
        success: function(data){
            $(data).find(".title").each(function() {
                if (dailyTitle=="Daily Due Up Times") {todayTime = $(this).html(); dailyTitle="Awake today at: ";}
                else if ($(this).html() == "Daily Due Up Times") dailyTitle = $(this).html();
            });
            //Trim off the extra lines and whitespace, we only want the most recent one!
            todayTime = todayTime.slice(0,todayTime.indexOf("<p>")).trim().replace(":"," at");
            //console.log(todayTime);

            //Find the Turmy Header and place the next wakeup time underneath!
            var turmHeader = $("#turmaculus_container p:contains('wake him up??')");

            var wakeUpTime = $("<p></p>");

            wakeUpTime.append('His next wake up time is <b>' + todayTime + '</b> according to <a href="https://www.neopets.com/~Brownhownd"> this page</a>.');
            turmHeader.after(wakeUpTime);

        }

    });

})();

