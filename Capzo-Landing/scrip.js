(function () {
  const trollContainer = document.getElementById("troll-container");
  const pixelHats = [
  "assets/Capzo toffee.png",
  "assets/Capzo black.png",
  "assets/logo pixel.png",
  "assets/Nombre pixel.png",
  "assets/Smile.png"
];
  const trollPhrases = [
    "Too cool to close",
    "Capzo owns your head",
    "Urban Infection: Loading...",
    "Style.exe activated",
    "LOL. You love it.",
    "Now you can't leave",
    "404: Your freedom not found",
    "CAPZO.exe running..."
  ];

  let internalClickCount = 0;

 function createFloatingHat() {
  const floatDiv = document.createElement("div");
  floatDiv.className = "floating";
  const pos = getRandomPosition();
  floatDiv.style.top = pos.top + "px";
  floatDiv.style.left = pos.left + "px";

  const hatImg = document.createElement("img");
  const randomIndex = Math.floor(Math.random() * pixelHats.length);
  hatImg.src = pixelHats[randomIndex];
  hatImg.alt = "Capzo pixel hat";
  floatDiv.appendChild(hatImg);
  trollContainer.appendChild(floatDiv);

  startBounce(floatDiv);
}

  function getRandomPosition() {
    return {
      top: Math.floor(Math.random() * (window.innerHeight - 150)),
      left: Math.floor(Math.random() * (window.innerWidth - 300))
    };
  }

 function createFloatingHat() {
  const floatDiv = document.createElement("div");
  floatDiv.className = "floating";
  const pos = getRandomPosition();
  floatDiv.style.top = pos.top + "px";
  floatDiv.style.left = pos.left + "px";

  const hatImg = document.createElement("img");
  const randomIndex = Math.floor(Math.random() * pixelHats.length);
  hatImg.src = pixelHats[randomIndex];
  hatImg.alt = "Capzo pixel hat";

  // ✅ Evento para clonar 10 más al hacer clic en la imagen
  hatImg.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que también cuente como clic general
    for (let i = 0; i < 10; i++) {
      createFloatingHat();
    }
  });

  floatDiv.appendChild(hatImg);
  trollContainer.appendChild(floatDiv);

  startBounce(floatDiv);
}

 function createFloatingMessage(text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "floating-text";
  const pos = getRandomPosition();
  messageDiv.style.top = pos.top + "px";
  messageDiv.style.left = pos.left + "px";
  messageDiv.textContent = text;
  trollContainer.appendChild(messageDiv);

  startBounce(messageDiv);
}

  function spawnTrollElements(count) {
    for (let i = 0; i < count; i++) {
      createFloatingHat();
      createFloatingMessage(trollPhrases[Math.floor(Math.random() * trollPhrases.length)]);
    }
  }

  spawnTrollElements(5);

document.body.addEventListener("click", () => {
  internalClickCount++;

  const mainAudio = document.getElementById("troll-audio");
  const blueAudio = document.getElementById("blue-audio");

  if (internalClickCount < 4) {
    if (mainAudio.paused) {
      mainAudio.play().catch(err => console.error("No se pudo reproducir el audio:", err));
    }
    spawnTrollElements(5);
  } else {
    // Detener música actual
    mainAudio.pause();
    mainAudio.currentTime = 0;

    // Reproducir nueva música
    blueAudio.play().catch(err => console.error("Error al reproducir el audio azul:", err));

    spawnTrollElements(20);
    document.getElementById("bluescreen").style.display = "block";

    setTimeout(() => {
      window.location.href = "https://capzo.store";
    }, 8000);
  }
});
})();function startBounce(el) {
  let x = el.offsetLeft;
  let y = el.offsetTop;
  let dx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3);
  let dy = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3);

  function animate() {
    const elWidth = el.offsetWidth;
    const elHeight = el.offsetHeight;

    // rebote horizontal
    if (x + dx < 0 || x + elWidth + dx > window.innerWidth) {
      dx = -dx;
    }

    // rebote vertical
    if (y + dy < 0 || y + elHeight + dy > window.innerHeight) {
      dy = -dy;
    }

    x += dx;
    y += dy;

    el.style.left = x + 'px';
    el.style.top = y + 'px';

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}ue 