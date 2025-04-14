function adjustScale() {
    const body = document.body;
    const content = document.documentElement;

    // Ширина контента (включая прокрутку)
    const contentWidth = content.scrollWidth;
    // Ширина окна браузера
    const windowWidth = window.innerWidth;

    // Если контент шире экрана — уменьшаем масштаб
    if (contentWidth > windowWidth) {
        const scale = windowWidth / contentWidth; // 95% от масштаба (чтобы был запас)
        body.style.transform = `scale(${scale})`;
        body.style.transformOrigin = 'top left';
        body.style.width = `${100 / scale}%`; // Компенсируем ширину
    } else {
        body.style.transform = 'none'; // Возвращаем исходный масштаб
    }
}

// Запускаем при загрузке и при изменении размера окна
window.addEventListener('load', adjustScale);
window.addEventListener('resize', adjustScale);