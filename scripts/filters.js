let boardStyleElement = null;
let canvasStyleElement = null;

export function applyFilters(blackAndWhite, filter3dData, brightness, contrast) {
    if (blackAndWhite) {
        applyBoardFilter(brightness, contrast);
    } else {
        removeBoardFilter();
    }

    if (filter3dData) {
        applyCanvasFilter(brightness, contrast);
    } else {
        removeCanvasFilter();
    }
}

export function removeFilters() {
    removeBoardFilter();
    removeCanvasFilter();
}

function applyBoardFilter(brightness, contrast) {
    if (!boardStyleElement) {
        boardStyleElement = document.createElement('style');
        document.head.appendChild(boardStyleElement);
    }
    boardStyleElement.textContent = `
        #board {
            filter: grayscale(100%) brightness(${brightness}) contrast(${contrast});
        }
    `;
}

function removeBoardFilter() {
    if (boardStyleElement) {
        boardStyleElement.remove();
        boardStyleElement = null;
    }
}

function applyCanvasFilter(brightness, contrast) {
    if (!canvasStyleElement) {
        canvasStyleElement = document.createElement('style');
        document.head.appendChild(canvasStyleElement);
    }
    canvasStyleElement.textContent = `
        canvas {
            filter: grayscale(100%) brightness(${brightness}) contrast(${contrast});
        }
    `;
}

function removeCanvasFilter() {
    if (canvasStyleElement) {
        canvasStyleElement.remove();
        canvasStyleElement = null;
    }
}