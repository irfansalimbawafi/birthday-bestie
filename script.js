/* =========================================================
   PAGE NAVIGATION
========================================================= */

const pages = [
    "opening",
    "photos",
    "letter",
    "wish",
    "mystery"
];

let currentPage = 0;


/* Elements */

const progressDots =
    document.querySelectorAll(".progress-dot");

const startBtn =
    document.getElementById("startBtn");

const nextToLetter =
    document.getElementById("nextToLetter");

const nextToWish =
    document.getElementById("nextToWish");

const nextToMystery =
    document.getElementById("nextToMystery");


/* Show page */

function showPage(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }

    const current =
        document.getElementById(
            pages[currentPage]
        );

    const next =
        document.getElementById(
            pages[index]
        );


    if (current) {
        current.classList.remove("active");
    }

    if (next) {
        next.classList.add("active");
    }


    currentPage = index;

    updateProgress();
}


/* Progress */

function updateProgress() {

    progressDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        }
    );

}


/* Navigation */

startBtn.addEventListener(
    "click",
    () => {

        showPage(1);

        startMusic();

    }
);


nextToLetter.addEventListener(
    "click",
    () => {

        showPage(2);

    }
);


nextToWish.addEventListener(
    "click",
    () => {

        showPage(3);

    }
);


nextToMystery.addEventListener(
    "click",
    () => {

        showPage(4);

    }
);



/* =========================================================
   MUSIC
========================================================= */

const birthdayMusic =
    document.getElementById(
        "birthdayMusic"
    );

const musicBtn =
    document.getElementById(
        "musicBtn"
    );

let musicPlaying = false;


function startMusic() {

    birthdayMusic
        .play()
        .then(() => {

            musicPlaying = true;

            musicBtn.textContent = "♫";

        })
        .catch(() => {

            musicPlaying = false;

        });

}


musicBtn.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            birthdayMusic.pause();

            musicPlaying = false;

            musicBtn.textContent = "♪";

        } else {

            startMusic();

        }

    }
);



/* =========================================================
   PHOTO ROLL
========================================================= */

const photoTrack =
    document.getElementById(
        "photoTrack"
    );

const photoRoll =
    document.getElementById(
        "photoRoll"
    );

const photoCounter =
    document.getElementById(
        "photoCounter"
    );

const prevPhoto =
    document.getElementById(
        "prevPhoto"
    );

const nextPhoto =
    document.getElementById(
        "nextPhoto"
    );


const photos = [
    "assets/photos/photo1.jpeg",
    "assets/photos/photo2.jpeg",
    "assets/photos/photo3.jpeg",
    "assets/photos/photo4.jpeg",
    "assets/photos/photo5.jpeg",
    "assets/photos/photo6.jpeg"
];


let currentPhoto = 0;


/* Create photos */

photos.forEach(
    (src, index) => {

        const card =
            document.createElement("div");

        card.className = "photo-card";

        card.style.setProperty(
            "--rotation",
            `${index % 2 === 0 ? -2 : 2}deg`
        );


        const img =
            document.createElement("img");

        img.src = src;

        img.alt =
            `Memory photo ${index + 1}`;

        img.draggable = false;


        card.appendChild(img);

        photoTrack.appendChild(card);

    }
);


function updatePhoto() {

    const cards =
        photoTrack.querySelectorAll(
            ".photo-card"
        );

    if (!cards.length) {
        return;
    }


    const card = cards[currentPhoto];


    const scrollPosition =
        card.offsetLeft -
        (
            photoRoll.clientWidth -
            card.clientWidth
        ) / 2;


    photoRoll.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
    });


    photoCounter.textContent =
        `${currentPhoto + 1} / ${photos.length}`;

}


prevPhoto.addEventListener(
    "click",
    () => {

        currentPhoto--;

        if (currentPhoto < 0) {
            currentPhoto =
                photos.length - 1;
        }

        updatePhoto();

    }
);


nextPhoto.addEventListener(
    "click",
    () => {

        currentPhoto++;

        if (currentPhoto >= photos.length) {
            currentPhoto = 0;
        }

        updatePhoto();

    }
);



/* =========================================================
   PHOTO DRAG / SWIPE
========================================================= */

let isDragging = false;
let startX = 0;
let scrollStart = 0;


photoRoll.addEventListener(
    "pointerdown",
    (event) => {

        isDragging = true;

        startX = event.clientX;

        scrollStart =
            photoRoll.scrollLeft;

        photoRoll.setPointerCapture(
            event.pointerId
        );

    }
);


photoRoll.addEventListener(
    "pointermove",
    (event) => {

        if (!isDragging) {
            return;
        }

        const distance =
            event.clientX - startX;

        photoRoll.scrollLeft =
            scrollStart - distance;

    }
);


photoRoll.addEventListener(
    "pointerup",
    (event) => {

        isDragging = false;

        try {

            photoRoll.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {}

    }
);


photoRoll.addEventListener(
    "pointercancel",
    () => {

        isDragging = false;

    }
);



/* =========================================================
   WISH FORM
========================================================= */

const wishForm =
    document.getElementById(
        "wishForm"
    );

const wishSuccess =
    document.getElementById(
        "wishSuccess"
    );


wishForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        /*
         * IMPORTANT:
         * The wish is NOT stored anywhere.
         * It only exists temporarily in this session.
         */


        wishForm.style.display =
            "none";


        wishSuccess.classList.add(
            "show"
        );


        nextToMystery.classList.add(
            "show"
        );

    }
);



/* =========================================================
   MYSTERY BOX
========================================================= */

const mysteryBoxes =
    document.querySelectorAll(
        ".mystery-box"
    );

const prizeReveal =
    document.getElementById(
        "prizeReveal"
    );

const prizeTitle =
    document.getElementById(
        "prizeTitle"
    );

const prizeDescription =
    document.getElementById(
        "prizeDescription"
    );

const prizeCode =
    document.getElementById(
        "prizeCode"
    );


/*
 * Ganti isi hadiah di bawah ini
 * sesuai hadiah yang sebenarnya.
 */

const prizes = [

    {
        title: "Netflix Premium",
        description:
            "A little movie night treat for you!",
        code: "NETFLIX-XXXX"
    },

    {
        title: "Coffee Treat",
        description:
            "Because you deserve a little caffeine happiness.",
        code: "COFFEE-XXXX"
    },

    {
        title: "Mystery Surprise",
        description:
            "Something special is waiting for you!",
        code: "SURPRISE-XXXX"
    }

];


/* Shuffle */

function shuffle(array) {

    const copy =
        [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            copy[i],
            copy[j]
        ] = [
            copy[j],
            copy[i]
        ];

    }

    return copy;
}


let shuffledPrizes =
    shuffle(prizes);


/* Open box */

mysteryBoxes.forEach(
    (box, clickedIndex) => {

        box.addEventListener(
            "click",
            () => {

                /*
                 * Prevent choosing another box
                 */

                mysteryBoxes.forEach(
                    (item) => {

                        item.disabled = true;

                    }
                );


                box.classList.add(
                    "chosen"
                );


                setTimeout(
                    () => {

                        const prize =
                            shuffledPrizes[
                                clickedIndex
                            ];


                        prizeTitle.textContent =
                            prize.title;

                        prizeDescription.textContent =
                            prize.description;

                        prizeCode.textContent =
                            prize.code;


                        document.querySelector(
                            ".mystery-boxes"
                        ).style.display =
                            "none";


                        prizeReveal.classList.add(
                            "show"
                        );


                        createConfetti();

                    },
                    800
                );

            }
        );

    }
);



/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.animationDuration =
            `${2 + Math.random() * 2.5}s`;


        piece.style.animationDelay =
            `${Math.random() * 0.5}s`;


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        container.appendChild(
            piece
        );


        setTimeout(
            () => {

                piece.remove();

            },
            5000
        );

    }

}



/* =========================================================
   INITIALIZE
========================================================= */

showPage(0);

updatePhoto();

updateProgress();