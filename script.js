const activateAR = (href, isQuickLook, button) => {
  const anchor = document.createElement("a");
  if (isQuickLook) {
    isQuickLook = true;

    anchor.appendChild(document.createElement("img"));
    anchor.rel = "ar";
  }
  anchor.setAttribute("href", href);
  anchor.click();

  anchor.addEventListener("message", (event) => {
    button.dispatchEvent(new CustomEvent("quick-look-button-tapped"));
  });
};

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.Android()) {
  fetch(
    `https://advin-mjao.onrender.com/api/guess/armodels/63f4dc9046e2d89492ffe28f`,
    {
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then(({ data }) => {
      const src = data.model.android;

      let href = null;
      href = `intent://arvr.google.com/scene-viewer/1.0?file=${href}&mode=ar_only&resizable=false&disable_occlusion=true&`;

      href +=
        `#Intent;scheme=https;` +
        `package=com.google.ar.core;` +
        `action=android.intent.action.VIEW;`;

      href += `end;`;
      activateAR(href);
    });
} else if (isMobile.iOS()) {
  fetch(
    `https://advin-mjao.onrender.com/api/guess/armodels/63f4dc9046e2d89492ffe28f`,
    {
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then(({ data }) => {
      const iosSrc = data.model.ios;

      let href = `${iosSrc}#`;

      activateAR(href, true);
    });
  // document.location.href = "";
}
