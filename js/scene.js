/* ================= HELPERS ================= */

const $ = selector =>
    document.querySelector(selector);


/* ================= RANDOM ================= */

const R = i =>
    Math.abs(Math.sin(i * 91.7)) % 1;


/* ================= MOUNTAINS ================= */

function mt(
    seed,
    base,
    amp,
    color,
    count
) {

    let d =
        `M0 600L0 ${base}`;

    for (
        let i = 0;
        i <= count;
        i++
    ) {

        const x =
            i * 1000 / count;

        const y =
            base
            - Math.abs(
                Math.sin(i * seed)
            ) * amp
            - Math.cos(
                i * seed * 2.1
            ) * amp * 0.3;

        d +=
            `L${x} ${y}`;
    }

    d +=
        `L1000 600Z`;

    return `
        <path
            d="${d}"
            fill="${color}"
        />
    `;
}


/* ================= TREES ================= */

function trees(
    y,
    color,
    count,
    height
) {

    let d = "";

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const x =
            i * 1000 / count
            + R(i) * 14;

        const h =
            height *
            (
                0.6
                + R(i + 3) * 0.8
            );

        d +=
            `M${x - 13} ${y}
             L${x} ${y - h}
             L${x + 13} ${y}
             Z`;
    }

    return `
        <path
            d="${d}"
            fill="${color}"
        />
    `;
}


/* ================= CASTLE ================= */

function castle() {

    let s = `
        <ellipse
            cx="500"
            cy="330"
            rx="260"
            ry="170"
            fill="url(#cg)"
        />
    `;

    const towers = [

        [500, 64, 250, 100],
        [428, 38, 185, 75],
        [572, 38, 185, 75],
        [368, 30, 130, 58],
        [632, 30, 130, 58],
        [470, 26, 215, 60],
        [530, 26, 215, 60]

    ];


    towers.forEach(
        ([x, w, h, roof], i) => {

            const top =
                450 - h;

            s += `
                <rect
                    x="${x - w / 2}"
                    y="${top}"
                    width="${w}"
                    height="${h}"
                    fill="#4b3a94"
                />

                <polygon
                    points="
                        ${x - w / 2 - 6},${top}
                        ${x},${top - roof}
                        ${x + w / 2 + 6},${top}
                    "
                    fill="#c07ad8"
                />

                <line
                    x1="${x}"
                    y1="${top - roof}"
                    x2="${x}"
                    y2="${top - roof - 22}"
                    stroke="#ffd86b"
                    stroke-width="2"
                />

                <polygon
                    points="
                        ${x},${top - roof - 22}
                        ${x + 16},${top - roof - 16}
                        ${x},${top - roof - 10}
                    "
                    fill="#ff9ecb"
                />
            `;


            for (
                let k = 0;
                k < Math.floor(h / 60);
                k++
            ) {

                s += `
                    <rect
                        x="${x - 4}"
                        y="${top + 22 + k * 50}"
                        width="8"
                        height="14"
                        rx="4"
                        fill="#ffd86b"
                        class="lantern-glow"
                        style="
                            animation-delay:
                            ${i * 0.4 + k * 0.3}s
                        "
                    />
                `;

            }

        }
    );


    s += `
        <rect
            x="345"
            y="385"
            width="310"
            height="66"
            fill="#3d2d82"
        />

        <path
            d="
                M485 451
                V417
                A15 15 0 0 1 515 417
                V451
                Z
            "
            fill="#ffd86b"
        />
    `;


    return s;
}


/* ================= TOWER ================= */

function rtower() {

    return `
        <g class="sway">

            <rect
                x="105"
                y="250"
                width="50"
                height="190"
                fill="#51409c"
            />

            <polygon
                points="
                    98,250
                    130,196
                    162,250
                "
                fill="#e78ac3"
            />

            <rect
                x="123"
                y="280"
                width="14"
                height="22"
                rx="7"
                fill="#ffd86b"
            />

            <path
                d="
                    M130 296
                    C112 330 150 350 128 385
                    S108 420 126 445
                "
                fill="none"
                stroke="#ffd86b"
                stroke-width="6"
                stroke-linecap="round"
            />

        </g>
    `;
}


/* ================= BUILD SCENE ================= */

const svg = document.getElementById("sv");

if (svg) {

    svg.innerHTML = `

        <defs>

            <radialGradient id="cg">

                <stop
                    offset="0"
                    stop-color="#ffd0f5"
                    stop-opacity=".55"
                />

                <stop
                    offset="1"
                    stop-color="#ffd0f5"
                    stop-opacity="0"
                />

            </radialGradient>

        </defs>

        <g id="l1">
            ${mt(
                1.3,
                330,
                90,
                "#3b2a86",
                16
            )}
        </g>

        <g id="l2">
            ${mt(
                2.1,
                420,
                70,
                "#2c1d6a",
                18
            )}

            ${castle()}
        </g>

        <g id="l3">

            ${mt(
                0.8,
                500,
                40,
                "#1e1356",
                14
            )}

            ${trees(
                520,
                "#170d40",
                60,
                60
            )}

            ${rtower()}

        </g>

        <g id="l4">

            ${trees(
                610,
                "#0d0627",
                46,
                110
            )}

        </g>

    `;

}


/* ================= PARALLAX ================= */

let mx = 0;
let my = 0;


function parallax() {

    const sy =
        window.scrollY / 6;

    [
        ["l1", 0.2],
        ["l2", 0.5],
        ["l3", 0.9],
        ["l4", 1.5]

    ].forEach(
        ([id, factor]) => {

            const element =
                document.getElementById(id);

            if (!element) return;

            element.style.transform =
                `
                translate(
                    ${mx * factor * -14}px,
                    ${my * factor * -7
                    + sy * factor * 0.3}px
                )
                `;
        }
    );

}


window.addEventListener(
    "pointermove",
    event => {

        mx =
            event.clientX /
            window.innerWidth
            - 0.5;

        my =
            event.clientY /
            window.innerHeight
            - 0.5;

        parallax();

        if (
            Math.random() < 0.25
            && typeof particles !== "undefined"
        ) {

            particles.push({

                x: event.clientX,

                y: event.clientY,

                vx:
                    Math.random() - 0.5,

                vy:
                    Math.random() - 0.8,

                life: 0.9,

                fade: 0.97,

                color: "255,230,150"

            });

        }

    }
);


window.addEventListener(
    "scroll",
    parallax,
    { passive: true }
);


/* ================= PARTICLES ================= */

const canvas =
    document.getElementById("fx");

const ctx =
    canvas?.getContext("2d");


let W = 0;
let H = 0;

let particles = [];
let stars = [];
let lanterns = [];

let lanternsEnabled = false;


/* ================= RESIZE ================= */

function resizeCanvas() {

    if (!canvas) return;

    W =
        canvas.width =
        window.innerWidth;

    H =
        canvas.height =
        window.innerHeight;


    stars =
        Array.from(
            {
                length:
                    Math.min(
                        220,
                        Math.floor(
                            W * H / 6500
                        )
                    )
            },
            () => ({

                x:
                    Math.random() * W,

                y:
                    Math.random() * H * 0.85,

                radius:
                    Math.random() * 1.4
                    + 0.3,

                phase:
                    Math.random() * 6

            })
        );

}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* ================= LANTERN ================= */

function createLantern(
    randomY = true
) {

    return {

        x:
            Math.random() * W,

        y:
            randomY
                ? Math.random() * H
                : H + 50,

        speed:
            0.25
            + Math.random() * 0.5,

        size:
            12
            + Math.random() * 14,

        phase:
            Math.random() * 6,

        alpha: 0

    };

}


/* ================= BURST ================= */

function burst(
    x,
    y,
    amount = 50
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const velocity =
            1 +
            Math.random() * 5;

        particles.push({

            x,

            y,

            vx:
                Math.cos(angle)
                * velocity,

            vy:
                Math.sin(angle)
                * velocity,

            life: 1,

            fade: 0.96,

            color:
                Math.random() < 0.5
                    ? "255,216,107"
                    : "255,158,203"

        });

    }

}


/* ================= ANIMATION ================= */

function animate(time) {

    requestAnimationFrame(
        animate
    );

    if (!ctx) return;

    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    /* Stars */

    for (
        const star of stars
    ) {

        ctx.globalAlpha =
            0.35
            +
            0.65 *
            Math.abs(
                Math.sin(
                    time / 900
                    + star.phase
                )
            );

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    /* Lanterns */

    if (lanternsEnabled) {

        const amount =
            window.innerWidth < 600
                ? 7
                : 14;


        while (
            lanterns.length < amount
        ) {

            lanterns.push(
                createLantern(
                    lanterns.length
                    < amount / 2
                )
            );

        }


        for (
            const lantern of lanterns
        ) {

            lantern.y -=
                lantern.speed;

            lantern.phase +=
                0.015;

            lantern.alpha =
                Math.min(
                    1,
                    lantern.alpha
                    + 0.008
                );


            if (
                lantern.y < -60
            ) {

                Object.assign(
                    lantern,
                    createLantern(false)
                );

            }


            const x =
                lantern.x
                +
                Math.sin(
                    lantern.phase
                ) * 14;

            const radius =
                lantern.size;


            const gradient =
                ctx.createRadialGradient(
                    x,
                    lantern.y,
                    0,
                    x,
                    lantern.y,
                    radius * 3.2
                );


            gradient.addColorStop(
                0,
                `rgba(
                    255,
                    200,
                    90,
                    ${0.5 * lantern.alpha}
                )`
            );


            gradient.addColorStop(
                1,
                "rgba(255,200,90,0)"
            );


            ctx.globalAlpha = 1;

            ctx.fillStyle =
                gradient;

            ctx.fillRect(
                x - radius * 3.2,
                lantern.y - radius * 3.2,
                radius * 6.4,
                radius * 6.4
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    214,
                    120,
                    ${0.95 * lantern.alpha}
                )`;


            ctx.beginPath();

            ctx.ellipse(
                x,
                lantern.y,
                radius * 0.55,
                radius * 0.75,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.fillStyle =
                `rgba(
                    255,
                    250,
                    220,
                    ${lantern.alpha}
                )`;


            ctx.beginPath();

            ctx.ellipse(
                x,
                lantern.y + radius * 0.1,
                radius * 0.18,
                radius * 0.3,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }

    }


    /* Particles */

    for (
        let i =
            particles.length - 1;

        i >= 0;

        i--
    ) {

        const p =
            particles[i];

        p.x += p.vx;

        p.y += p.vy;

        p.vx *= p.fade;

        p.vy *= p.fade;

        p.life -= 0.011;


        if (
            p.life <= 0
        ) {

            particles.splice(
                i,
                1
            );

            continue;

        }


        ctx.globalAlpha =
            p.life;

        ctx.fillStyle =
            `rgba(
                ${p.color},
                1
            )`;

        ctx.shadowBlur = 8;

        ctx.shadowColor =
            `rgb(
                ${p.color}
            )`;


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            2.2 * p.life + 0.5,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;

    }


    ctx.globalAlpha = 1;

}


requestAnimationFrame(
    animate
);


/* ================= EXTERNAL ACCESS ================= */

window.enableLanterns = () => {

    lanternsEnabled = true;

};


window.createBurst = burst;

