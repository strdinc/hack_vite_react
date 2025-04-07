// Функция для создания Intersection Observer
function setupShaderObserver() {
    const options = {
        root: null, // относительно viewport
        rootMargin: '0px', // без отступов
        threshold: 0.1 // срабатывает, когда 10% элемента видимо
    };

    // Создаем объект Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Контейнер в поле видимости
                activateShaderScript();
            } else {
                // Контейнер вне поля видимости
                deactivateShaderScript();
            }
        });
    }, options);

    // Наблюдаем за контейнером #first_screen
    const firstScreenContainer = document.getElementById('first_screen');
    if (firstScreenContainer) {
        observer.observe(firstScreenContainer);
    }
}

// Функция для активации скрипта Shader_WOGUI.js
function activateShaderScript() {
    console.log('Shader_WOGUI.js activated');

    // Проверяем, загружен ли скрипт
    const existingScript = document.querySelector('script[src="Shader_WOGUI.js"]');
    if (!existingScript) {
        // Если скрипт еще не загружен, добавляем его
        const script = document.createElement('script');
        script.src = 'Shader_WOGUI.js';
        script.defer = true;
        document.head.appendChild(script);
    }
}

// Функция для деактивации скрипта Shader_WOGUI.js
function deactivateShaderScript() {
    console.log('Shader_WOGUI.js deactivated');

    // Удаляем скрипт из DOM
    const existingScript = document.querySelector('script[src="Shader_WOGUI.js"]');
    if (existingScript) {
        existingScript.remove();
    }
}

// Инициализация Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    setupShaderObserver();
});