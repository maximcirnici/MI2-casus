(function () {
    'use strict';
    let kaart = document.querySelectorAll('.flip-card-inner'); /* Selecteert elke kaar in het spel*/
    let cardflipt = false; /* booleans die bekijkt als de kaart geflipt is of niet*/
    let winWondow = document.querySelector("#wonVenster"); /* bevat het venster als je wint*/
    let matchedCard = document.getElementsByClassName("active"); /* */
    let lock = false; /* Als 2 kaarten omgedraaid zijn kan je geen 3de bij klikken*/
    let first, second; /* 1ste kaart en 2 de kaart die worden bijgehouden in de functie 'FlipCard'*/
    let sound = new Audio(); /* Audio bestand die afspeelt als op de kaarten worden geklikt*/
    sound.src = "sound/button-09.mp3"; /* Audio bestand die afspeelt wanneer de speler gewonnen heeft */
    let winningSound = new Audio();
    winningSound.src = "sound/win.mp3";
    let shuffleCards = new Audio();
    shuffleCards.src = "sound/shuffle_cards.mp3";
    let correctSound = new Audio();
    correctSound.src = "sound/rightanswer.mp3";
    let msgTyped = document.querySelector(".message span");
    let count = 0;
    let loseWindow = document.querySelector("#LoseVenster");
    let speelOpnieuw = document.querySelector('#play_again');

    let photos = [
        {url: "img/number1.png"},
        {url: "img/flag.png"},
        {url: "img/crown.png"},
        {url: "img/car2.png"},
        {url: "img/boat.png"},
        {url: "img/balloon.png"},
        {url: "img/ring.png"},
        {url: "img/sleep.png"}
    ],

    i = 0;


    function showPhoto(){
        
    }




    /* event 'click' als op een kaart wordt geklikt dan voer voer dan de volgende code uit:'*/
    kaart.forEach(card => card.addEventListener('click', function (e) {
        let num = Math.floor(Math.random() * photos.length);
        document.getElementById("imgBig").src = photos[i].url;
        sound.play();
        aantal();
        if (lock) return;


        /* Als de kaart de classe 'active' bevat verwijder de classe anders voeg de classe toe*/
        /* classe 'active' zorgt ervoor dat de kaart omgedraaid wordt.*/
        if (this.classList.contains('active')) this.classList.remove('active');
        else this.classList.add('active');

        /* bepaald als de kaart omgedraaid is en slaag de waarde op in 'first' en 'second'*/
        if (!cardflipt) {
            cardflipt = true;
            first = this;
        } else {
            cardflipt = false;
            second = this;

            /* het is een match */
            /* Als de eerstekaart matcht met de 2de kaart, voeg de classe 'active' toe zodat de kaarten niet meer omdraaien*/
            if (first.dataset.subject === second.dataset.subject) {
                first.classList.add('active');
                second.classList.add('active');

                setTimeout(() => {
                    correctSound.play();
                }, 450);

                /* Verwijst naar de functie 'Won'*/
                Won();
            }
            /* Matchen ze niet draai de kaarten terug om*/
            else {
                lock = true;
                /* als bijde kaarten omgedraaid zijn en niet matchen, zorgt 'setTimeout' ervoor dat de kaarten niet onmiddelijk terug omgedraaid worden, maar na een ogenblikje '*/
                setTimeout(() => {
                    /* beide kaarten matchen NIET, verwijder dan de classe 'active' zodat de kaarten terug omgedraaid worden */
                    first.classList.remove('active');
                    second.classList.remove('active');
                    lock = false;
                }, 900);
            }
        }

        /* functie 'Won' laat een venster tonen met de meldingen dat de speler gewonnen heeft*/
        function Won() {
            setTimeout(() => {
                /* Als 16 kaarten de classe 'active hebben', toon dan de venster */
                if (matchedCard.length == 4) {
                    winningSound.play();
                    winWondow.classList.add("active_win");
                    playAgain();
                }
            }, 750);
        }

    }));

    function aantal() {
        count++;
        msgTyped.innerText = count;

        if (count == 34) {
            loseWindow.classList.add("active_win");
        }

    }

    /* Als er op knop 'play again' wordt geklikt, verwijder het wonvenster en refresh de pagina*/
    function playAgain() {
        speelOpnieuw.addEventListener('click', function (e) {
            winWondow.classList.remove('active_win') || loseWindow.classList.remove('active_win');
            location.reload();
        })
    }

    /* !!!! Werkt nog niet !!!*/
    (function shuffle() {
        kaart.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        });
    })();

})();