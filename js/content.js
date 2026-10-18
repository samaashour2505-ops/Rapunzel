/* ================= HOME ================= */

const nameElement =
    document.getElementById("hn");

const footerName =
    document.getElementById("fn");

const roleElement =
    document.getElementById("hr");

const metaElement =
    document.getElementById("hm");


if (nameElement) {

    nameElement.textContent =
        CONFIG.name;

}


if (footerName) {

    footerName.textContent =
        CONFIG.name;

}


if (roleElement) {

    roleElement.textContent =
        `${CONFIG.role} | Creative Web Experiences`;

}


if (metaElement) {

    metaElement.textContent =
        `${CONFIG.edu} · ${CONFIG.loc}`;

}


/* ================= PHOTO ================= */

const photoElement =
    document.getElementById("ph");


if (
    photoElement
    && CONFIG.photo
) {

    photoElement.innerHTML = `
        <img
            src="${CONFIG.photo}"
            alt="${CONFIG.name}"
        >
    `;

}


/* ================= ABOUT ================= */

const aboutElement =
    document.getElementById("ab");


if (aboutElement) {

    const interests =
        CONFIG.interests;

    let interestText = "";

    if (interests.length === 1) {

        interestText =
            interests[0];

    } else if (
        interests.length === 2
    ) {

        interestText =
            `${interests[0]} and ${interests[1]}`;

    } else {

        interestText =
            interests
                .slice(0, -1)
                .join(", ")
            +
            " and "
            +
            interests[
                interests.length - 1
            ];

    }


    aboutElement.innerHTML = `

        <h3>
            Hello, I'm ${CONFIG.name}
        </h3>

        <p>
            I'm a ${CONFIG.role}
            and ${CONFIG.edu}
            based in ${CONFIG.loc}.
        </p>

        <p style="margin-top:15px">
            I turn ideas into smooth,
            beautiful and responsive web
            experiences.
        </p>

        <p style="margin-top:15px">
            I'm especially curious about
            ${interestText}.
        </p>

    `;

}


/* ================= SKILLS ================= */

const skillsElement =
    document.getElementById("sk");


if (skillsElement) {

    skillsElement.innerHTML =
        CONFIG.skills
            .map(
                skill =>
                    `
                    <span class="chip">
                        ${skill}
                    </span>
                    `
            )
            .join("");

}


/* ================= INTERESTS ================= */

const interestsElement =
    document.getElementById("in");


if (interestsElement) {

    interestsElement.innerHTML =
        CONFIG.interests
            .map(
                interest =>
                    `
                    <span class="chip">
                        ${interest}
                    </span>
                    `
            )
            .join("");

}


/* ================= PROJECTS ================= */

const projectsElement =
    document.getElementById("pj");


if (projectsElement) {

    projectsElement.innerHTML =
        CONFIG.projects
            .map(
                project => `

                    <article
                        class="card project-card rv"
                    >

                        <div class="ph">

                            ${
                                project.image
                                ? `
                                    <img
                                        src="${project.image}"
                                        alt="${project.t}"
                                        loading="lazy"
                                    >
                                `
                                :
                                "Project image"
                            }

                        </div>

                        <h3>
                            ${project.t}
                        </h3>

                        <p>
                            ${project.d}
                        </p>

                        <p>
                            <small>
                                ${project.tech}
                            </small>
                        </p>

                        <a
                            class="card-link"
                            href="${project.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Project ✦
                        </a>

                    </article>

                `
            )
            .join("");

}


/* ================= CERTIFICATES ================= */

const certificatesElement =
    document.getElementById("ce");


if (certificatesElement) {

    certificatesElement.innerHTML =
        CONFIG.certs
            .map(
                certificate => `

                    <article
                        class="card certificate-card rv"
                    >

                        <div class="ph">

                            ${
                                certificate.image
                                ? `
                                    <img
                                        src="${certificate.image}"
                                        alt="${certificate.t}"
                                        loading="lazy"
                                    >
                                `
                                :
                                "Certificate image"
                            }

                        </div>

                        <h3>
                            ${certificate.t}
                        </h3>

                        <small>
                            ${certificate.by}
                        </small>

                        <br>

                        <a
                            class="card-link"
                            href="${certificate.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Certificate ✦
                        </a>

                    </article>

                `
            )
            .join("");

}


/* ================= CONTACT ================= */

const contactElement =
    document.getElementById("ct");


if (contactElement) {

    contactElement.innerHTML = `

        <p>
            Have a project, an idea,
            or a quest in mind?
            Let's create something magical together.
        </p>

        <div class="row">

            <a
                class="btn"
                href="mailto:${CONFIG.email}"
            >
                ${CONFIG.email}
            </a>

            <a
                class="btn ghost"
                href="${CONFIG.github}"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>

            <a
                class="btn ghost"
                href="${CONFIG.linkedin}"
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>

        </div>

        <p style="margin-top:20px">

            <small>
                ${CONFIG.phone}
                ·
                ${CONFIG.loc}
            </small>

        </p>

    `;

}