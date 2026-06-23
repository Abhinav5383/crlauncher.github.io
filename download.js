window.addEventListener("load", main);

async function main() {
    const latestTag = await getLatestTag();
    const strippedTag = latestTag.slice(1);

    const pageTitle = document.querySelector("#title");
    pageTitle.innerText += ` ${latestTag}`;

    function downloadUrl(filename) {
        return `https://github.com/CRLauncher/CRLauncher/releases/download/${latestTag}/${filename}`;
    }

    const fileUrls = {
        deb: downloadUrl(`CRLauncher-${strippedTag}-x86_64.deb`),
        rpm: downloadUrl(`CRLauncher-${strippedTag}-x86_64.rpm`),
        dmg: downloadUrl(`CRLauncher-${strippedTag}.dmg`),
        msi: downloadUrl(`CRLauncher-${strippedTag}.msi`),
        jar: downloadUrl("CRLauncher.jar"),
    };

    const fileLinks = document.querySelectorAll("a.file-url");
    fileLinks.forEach((link) => {
        const fileType = link.dataset.fileType;
        link.setAttribute("href", fileUrls[fileType]);
    });

    const mainContent = document.querySelector("main");
    const loadingIndicator = document.querySelector(".loading-indicator");

    loadingIndicator.classList.add("hidden");
    mainContent.classList.remove("hidden");
}

async function getLatestTag() {
    const res = await fetch("https://api.github.com/repos/CRLauncher/CRLauncher/releases/latest");
    const data = await res.json();
    return data.tag_name;
}
