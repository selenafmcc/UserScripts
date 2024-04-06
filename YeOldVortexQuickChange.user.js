// ==UserScript==
// @name         Ye Olde Fishing Vortex Quick Change
// @namespace    http://tampermonkey.net/
// @version      2024-04-06
// @description  allows you to change pets in Ye Olde Fishing Vortex
// @author       toto (squeaktho)
// @match        https://www.neopets.com/water/fishing.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

// HI! DON'T BE INTIMIDATED BY THE CODE!! COMMENTS LIKE THIS WILL TELL YOU WHAT TO CHANGE!!! (you'll mostly want to check out lines 28 through 31 though lol)

(function() {
    'use strict';
    // Find button
    var targetButton = $("button:contains('Cast Your Line Again')");

    // Create a container for the pet images
    var buttonContainer = $("<div></div>").css({
        "text-align": "center", // Center div lmao
        "margin-top": "10px",
    });

    // Append container after "Cast Your Line Again"
    targetButton.after(buttonContainer);

    // Append the buttons to the container
    // HI FOLKS! THIS IS WHERE YOU'RE SUPPOSED TO EDIT AND ADD YOUR PETS! CHANGE THE HREF URL TO new_active_pet=YOUR PETS NAME!
    // YOU CAN ALSO CHANGE THE PIC SOURCE TO WHATEVER YOU WANT TO! I USED MY QUICKREF PICS! I'LL SHOW HOW TO GET THEM ON THE GIT OR SOMETHING LMFAO
    // HAVE MORE PETS? ADD ANOTHER <a id="petx"...> BLOCK! HAVE LESS? DELETE ONE! THE WORLD IS YOUR OYSTER WHEN TALKING WITH COMPUTERS!
    buttonContainer.append(
        '<a id="pet1" href="https://www.neopets.com/process_changepet.phtml?new_active_pet=YOUR PETS NAME" target="_blank"><img id="petimg1" src="YOUR PIC HERE" style="margin-left: 10px;"></a>',
        '<a id="pet2" href="https://www.neopets.com/process_changepet.phtml?new_active_pet=YOUR OTHER PETS NAME" target="_blank"><img id="petimg2" src="YOUR PIC HERE" style="margin-left: 10px;"></a>'
    );

    // Even listener for clicking, closes the newly opened tab
    $("a[id^='pet']").on("click", function() {
        var newTab = window.open($(this).attr("href"), "_blank");
        setTimeout(function() {
            newTab.close();
        }, 200); // delay in milliseconds
        return false;
    });

})();
