// "use strict";

        // DECLARED MY HTML ELEMENTS AS VARIABLES

            // Mobile menu
const menuBars = $('.manuBars');
const mobileMenu = $('.navMob');

            // FORM FOR THE URL
const userUrl = document.querySelector('.urlInput');
const form = document.querySelector('form');
const urlBtn = $('.urlBtn');
var urlErr = $('.urlErr');
var result = $('.result');
var psuedo = $('.psuedo');
var resultBtn = $('.resultBtn');
var resultCp = $('resultCp');


    var resultBase = '';
    var rsB = [];
    var resultSkeleton = '';

        // FUNCTION TO TOGGLE MOBILE MENU
menuBars.on('click', function() {
    if (mobileMenu.css('display') === 'none') {
        mobileMenu.css('display', 'block');
    } else {
        mobileMenu.css('display', 'none');
    }
});




//URL Validiation
function urlValidation(defaultUrl) {
    const urlRule =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (defaultUrl.match(urlRule)) {
      return true;
    } else {
      return false;
    }
}
//URL Validiation
function urlChecker(defaultUrl) {
    const urlRule =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (defaultUrl.match(urlRule)) {
      return true;
    } else {
      return false;
    }
}

urlBtn.on('click', (e) => {
    e.preventDefault();
    let userInput = userUrl.value;

    console.log(userInput);
    //URL Validation
  if (!urlChecker(userInput)) {
    urlErr.css('display', 'inline-block');
    userUrl.classList.add("err");
    urlErr.append('Please enter a valid link 😅');
  }else{
    urlErr.css('display', 'none');
    userUrl.classList.remove('err');

    fetch(`https://api.shrtco.de/v2/shorten?url=` + userInput)
    .then((response) => response.json(
        // console.log(response)
    ))
    .then((response) =>{
        if (response.ok) {
            // console.log(response)
            resultBase = response.result.short_link;
        }
        console.log(resultBase);
        psuedo.css('display', 'block');
        var psA = psuedo.append(
        `<br>
        <div class="result">
            <p class="resultP">${userInput}</p>
            <a href="#" class="resultA">${resultBase}</a>
            <button type="submit" class="resultBtn">copy</button>
            <button class="resultCp">Copied!</button>
        </div>`);
        rsB.push(psA);

        console.log(psA);
        
        $('.resultBtn').each(function() {
            $(this).on('click', function() {
                const resultA = $(this).siblings('.resultA'); // Select the .resultA element
                const linkText = resultA.text(); // Get the text content of .resultA
                
                // Copy the text to the clipboard
                navigator.clipboard.writeText(linkText)
                    .then(() => {
                        const resultCp = $(this).siblings('.resultCp');
                        if (resultCp.css('display') === 'none') {
                            resultCp.css('display', 'block');
                            $(this).css('display', 'none');
                        } else {
                            resultCp.css('display', 'none');
                            $(this).css('display', 'block');
                        }
                    })
                    .catch((error) => {
                        console.error("Error copying text:", error);
                    });
            });
        });
        
        
        

        
    })
  }
});