/* ================= DOM ================= */

const intro =
    document.getElementById("intro");

const veil =
    document.getElementById("veil");

const enterButton =
    document.getElementById("enter");

const skipButton =
    document.getElementById("skip");


/* ================= INTRO TIMERS ================= */

const introTimers = [];

let introFinished = false;


function schedule(
    callback,
    delay
) {

    const timer =
        setTimeout(
            callback,
            delay
        );

    introTimers.push(timer);

}


function showElement(
    selector,
    delay
) {

    schedule(
        () => {

            const element =
                document.querySelector(
                    selector
                );

            if (element) {

                element.classList.add(
                    "on"
                );

            }

        },
        delay
    );

}


function hideElement(
    selector,
    delay
) {

    schedule(
        () => {

            const element =
                document.querySelector(
                    selector
                );

            if (element) {

                element.classList.remove(
                    "on"
                );

            }

        },
        delay
    );

}


/* ================= ENTER ================= */

function enterKingdom(
    fast = false
) {

    if (introFinished) return;

    introFinished = true;


    introTimers.forEach(
        clearTimeout
    );


    try {

        sessionStorage.setItem(
            "seen",
            "1"
        );

    } catch (error) {

        console.log(
            "Session storage unavailable."
        );

    }


    /* Remove veil */

    if (veil) {

        veil.style.transitionDuration =
            fast
                ? "0.8s"
                : "1.5s";

        veil.style.opacity = "0";

    }


    /* Enable body */

    document.body.classList.add(
        "in"
    );


    /* Magical effects */

    if (
        typeof enableLanterns ===
        "function"
    ) {

        enableLanterns();

    }


    if (
        typeof createBurst ===
        "function"
    ) {

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            120
        );

    }


    /* Music */

    if (
        typeof playMusic ===
        "function"
    ) {

        playMusic();

    }


    /* Intro */

    if (intro) {

        intro.classList.add(
            "out"
        );

        setTimeout(
            () => {

                intro.remove();

            },
            fast ? 800 : 1400
        );

    }

}


/* ================= BUTTONS ================= */

if (enterButton) {

    enterButton.addEventListener(
        "click",
        () => {

            enterKingdom(false);

        }
    );

}


if (skipButton) {

    skipButton.addEventListener(
        "click",
        () => {

            enterKingdom(true);

        }
    );

}


/* ================= CHECK SEEN ================= */

let alreadySeen = false;


try {

    alreadySeen =
        sessionStorage.getItem(
            "seen"
        ) === "1";

} catch (error) {

    alreadySeen = false;

}


if (alreadySeen) {

    introFinished = true;


    if (intro) {

        intro.remove();

    }


    if (veil) {

        veil.style.transition =
            "none";

        veil.style.opacity =
            "0";

    }


    document.body.classList.add(
        "in"
    );


    if (
        typeof enableLanterns ===
        "function"
    ) {

        enableLanterns();

    }

} else {

    /* First visit */

    schedule(
        () => {

            if (veil) {

                veil.style.opacity =
                    "0";

            }

        },
        1500
    );


    schedule(
        () => {

            if (
                typeof enableLanterns ===
                "function"
            ) {

                enableLanterns();

            }

        },
        4200
    );


    showElement(
        "#t1",
        5200
    );


    hideElement(
        "#t1",
        8200
    );


    showElement(
        "#t2",
        9000
    );


    hideElement(
        "#t2",
        12200
    );


    showElement(
        "#t3",
        13000
    );


    showElement(
        "#t4",
        14500
    );


    showElement(
        "#enter",
        16000
    );

}


/* ================= SCROLL REVEAL ================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "vis"
                        );

                        if (
                            !entry.target.classList.contains(
                                "hair"
                            )
                        ) {

                            if (
                                typeof sfx ===
                                "function"
                            ) {

                                sfx("hover");

                            }

                        }

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(".rv")
    .forEach(
        element => {

            observer.observe(
                element
            );

        }
    );


/* ================= NEWLY CREATED CARDS ================= */

const cardObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "vis"
                        );

                        cardObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(
        ".project-card, .certificate-card"
    )
    .forEach(
        card => {

            cardObserver.observe(
                card
            );

        }
    );


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll(
        "main section"
    );

const navLinks =
    document.querySelectorAll(
        "header a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute(
                                        "href"
                                    )
                                    ===
                                    `#${entry.target.id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.45
        }
    );


sections.forEach(
    section => {

        sectionObserver.observe(
            section
        );

    }
);

