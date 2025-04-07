document.addEventListener("DOMContentLoaded", () => {
    const buttonFirst = document.getElementById("title_back_buttons_first");
    const buttonSecond = document.getElementById("title_back_buttons_second");
    const letterGlitchCont = document.getElementById("LetterGlitch_cont");

    let shaderScriptLoaded = false; // Флаг для отслеживания загрузки скрипта

    // Функция для добавления скрипта
    function loadShaderScript() {
        if (!shaderScriptLoaded) {
            const script = document.createElement("script");
            script.src = "Shader_WOGUI_etc.js";
            script.defer = true;
            document.body.appendChild(script);
            shaderScriptLoaded = true;
            window.isScriptActive = true; // Активируем скрипт
            console.log("Shader_WOGUI_etc.js loaded.");
        }
    }

    // Функция для деактивации скрипта
    function unloadShaderScript() {
        if (shaderScriptLoaded) {
            window.isScriptActive = false; // Деактивируем скрипт
            console.log("Shader_WOGUI_etc.js deactivated.");
        }
    }

    // Обработчик для первой кнопки
    buttonFirst.addEventListener("click", () => {
        loadShaderScript(); // Загружаем скрипт
        letterGlitchCont.style.display = "none"; // Скрываем контейнер
    });

    // Обработчик для второй кнопки
    buttonSecond.addEventListener("click", () => {
        unloadShaderScript(); // Деактивируем скрипт
        letterGlitchCont.style.display = "block"; // Показываем контейнер
    });
});