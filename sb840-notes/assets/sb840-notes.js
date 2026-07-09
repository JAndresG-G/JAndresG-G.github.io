document.querySelectorAll("[data-load-embed]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-load-embed");
    const target = document.getElementById(targetId);
    if (!target) return;

    const src = target.getAttribute("data-src");
    if (!src) return;

    target.setAttribute("src", src);
    target.removeAttribute("data-src");
    button.setAttribute("disabled", "disabled");
    button.textContent = "Interactive view loaded";
  });
});

const currentPage = document.body.getAttribute("data-page");
if (currentPage) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("data-nav") === currentPage) {
      link.classList.add("active");
    }
  });
}

function initChartLightbox() {
  const triggers = document.querySelectorAll("[data-chart-lightbox]");
  if (!triggers.length) return;

  const ZOOM_MIN = 1;
  const ZOOM_MAX = 3;
  const ZOOM_STEP = 0.25;

  const dialog = document.createElement("dialog");
  dialog.className = "chart-lightbox";
  dialog.setAttribute("aria-label", "Enlarged figure");
  dialog.innerHTML = `
    <div class="chart-lightbox-panel">
      <div class="chart-lightbox-toolbar" aria-label="Zoom controls">
        <button type="button" class="chart-lightbox-zoom" data-zoom="out" aria-label="Zoom out">&minus;</button>
        <button type="button" class="chart-lightbox-zoom" data-zoom="reset">Fit</button>
        <button type="button" class="chart-lightbox-zoom" data-zoom="in" aria-label="Zoom in">+</button>
      </div>
      <button type="button" class="chart-lightbox-close" aria-label="Close enlarged figure">&times;</button>
      <div class="chart-lightbox-viewport">
        <img class="chart-lightbox-image" alt="" draggable="false">
      </div>
      <p class="chart-lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(dialog);

  const image = dialog.querySelector(".chart-lightbox-image");
  const caption = dialog.querySelector(".chart-lightbox-caption");
  const viewport = dialog.querySelector(".chart-lightbox-viewport");
  const closeButton = dialog.querySelector(".chart-lightbox-close");
  const zoomOutButton = dialog.querySelector('[data-zoom="out"]');
  const zoomResetButton = dialog.querySelector('[data-zoom="reset"]');
  const zoomInButton = dialog.querySelector('[data-zoom="in"]');

  let naturalWidth = 0;
  let naturalHeight = 0;
  let fitZoom = 1;
  let zoomLevel = ZOOM_MIN;
  let dragState = null;

  const canPan = () =>
    viewport.scrollWidth > viewport.clientWidth + 2 ||
    viewport.scrollHeight > viewport.clientHeight + 2;

  const updatePanCursor = () => {
    requestAnimationFrame(() => {
      viewport.classList.toggle("can-pan", canPan());
    });
  };

  const updateZoomButtons = () => {
    zoomOutButton.disabled = zoomLevel <= ZOOM_MIN;
    zoomInButton.disabled = zoomLevel >= ZOOM_MAX;
    zoomResetButton.disabled = zoomLevel === ZOOM_MIN;
  };

  const calculateFitZoom = () => {
    if (!naturalWidth || !naturalHeight) return 1;
    const availableWidth = Math.max(viewport.clientWidth - 16, 120);
    const availableHeight = Math.max(viewport.clientHeight - 16, 120);
    return Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight);
  };

  const applyZoom = () => {
    if (!naturalWidth) return;
    const scale = fitZoom * zoomLevel;
    image.style.width = `${Math.round(naturalWidth * scale)}px`;
    image.style.maxWidth = "none";
    image.style.height = "auto";
    updateZoomButtons();
    updatePanCursor();
  };

  const centerViewport = () => {
    requestAnimationFrame(() => {
      viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
      viewport.scrollTop = Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2);
      updatePanCursor();
    });
  };

  const resetView = () => {
    fitZoom = calculateFitZoom();
    zoomLevel = ZOOM_MIN;
    applyZoom();
    centerViewport();
  };

  const setZoom = (level) => {
    zoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, level));
    applyZoom();
  };

  const initializeFigure = () => {
    naturalWidth = image.naturalWidth;
    naturalHeight = image.naturalHeight;
    if (!naturalWidth) return;
    resetView();
  };

  const onDragMove = (event) => {
    if (!dragState) return;
    event.preventDefault();
    viewport.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.x);
    viewport.scrollTop = dragState.scrollTop - (event.clientY - dragState.y);
  };

  const endDrag = () => {
    if (!dragState) return;
    dragState = null;
    viewport.classList.remove("is-dragging");
    document.removeEventListener("pointermove", onDragMove);
    document.removeEventListener("pointerup", endDrag);
    document.removeEventListener("pointercancel", endDrag);
  };

  const startDrag = (event) => {
    if (event.button !== 0 || !canPan()) return;
    event.preventDefault();
    dragState = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    viewport.classList.add("is-dragging");
    document.addEventListener("pointermove", onDragMove);
    document.addEventListener("pointerup", endDrag);
    document.addEventListener("pointercancel", endDrag);
  };

  const closeLightbox = () => {
    endDrag();
    dialog.close();
  };

  const clearLightbox = () => {
    naturalWidth = 0;
    naturalHeight = 0;
    fitZoom = 1;
    zoomLevel = ZOOM_MIN;
    image.removeAttribute("src");
    image.style.width = "";
    image.style.maxWidth = "";
    viewport.classList.remove("can-pan", "is-dragging");
    updateZoomButtons();
  };

  const openLightbox = (trigger) => {
    const inlineImage = trigger.querySelector("img");
    const src = trigger.getAttribute("data-chart-lightbox") || inlineImage?.getAttribute("src") || "";
    const alt = inlineImage?.getAttribute("alt") || "";
    const captionText = trigger.getAttribute("data-lightbox-caption") || alt;

    clearLightbox();
    image.src = src;
    image.alt = alt;
    caption.textContent = captionText;
    caption.hidden = !captionText;
    dialog.showModal();

    const loadFigure = () => {
      requestAnimationFrame(() => {
        initializeFigure();
      });
    };

    if (image.complete) {
      loadFigure();
    } else {
      image.onload = () => {
        loadFigure();
        image.onload = null;
      };
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });

  zoomOutButton.addEventListener("click", () => setZoom(zoomLevel - ZOOM_STEP));
  zoomResetButton.addEventListener("click", resetView);
  zoomInButton.addEventListener("click", () => setZoom(zoomLevel + ZOOM_STEP));

  viewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      setZoom(zoomLevel + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
    },
    { passive: false }
  );

  viewport.addEventListener("pointerdown", startDrag);

  closeButton.addEventListener("click", closeLightbox);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeLightbox();
  });
  dialog.addEventListener("close", () => {
    endDrag();
    document.body.classList.remove("chart-lightbox-open");
    clearLightbox();
  });
  dialog.addEventListener("cancel", () => {
    document.body.classList.remove("chart-lightbox-open");
  });
  dialog.addEventListener("show", () => {
    document.body.classList.add("chart-lightbox-open");
  });

  updateZoomButtons();
}

initChartLightbox();
