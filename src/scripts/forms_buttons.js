document.addEventListener("DOMContentLoaded", () => {
    // Элементы формы
    const studentButton = document.getElementById("form_track_button_student");
    const pupilButton = document.getElementById("form_track_button_pupil");
    const yesButton = document.getElementById("form_command_button_yes");
    const noButton = document.getElementById("form_command_button_no");
    const commandNameField = document.getElementById("command_name");
    const commandAlert = document.getElementById("command_alert");

    // Скрытые поля для трека и команды
    const trackInput = document.getElementById("selected_track");
    const commandInput = document.getElementById("selected_command");

    // Переменные для хранения выбранных значений
    let selectedTrack = "none"; // Значение по умолчанию
    let selectedCommand = "none"; // Значение по умолчанию

    // Функция для управления треками
    function toggleTrackButton(button1, button2) {
        button1.addEventListener("click", () => {
            button1.classList.add("active_button_form");
            button2.classList.remove("active_button_form");
            selectedTrack = "student"; // Обновляем значение для "студенты"
            trackInput.value = selectedTrack; // Обновляем значение скрытого поля
        });
        button2.addEventListener("click", () => {
            button2.classList.add("active_button_form");
            button1.classList.remove("active_button_form");
            selectedTrack = "pupil"; // Обновляем значение для "школьники"
            trackInput.value = selectedTrack; // Обновляем значение скрытого поля
        });
    }

    // Функция для управления командами
    function toggleCommandButton(yes, no, field, alert) {
        yes.addEventListener("click", () => {
            yes.classList.add("active_button_form");
            no.classList.remove("active_button_form");
            field.classList.remove("hidden");
            field.required = true;
            alert.classList.remove("hidden");
            selectedCommand = "yes"; // Обновляем значение для "да"
            commandInput.value = selectedCommand; // Обновляем значение скрытого поля
        });
        no.addEventListener("click", () => {
            no.classList.add("active_button_form");
            yes.classList.remove("active_button_form");
            field.classList.add("hidden");
            field.required = false;
            alert.classList.add("hidden");
            field.value = ""; // Очистка поля
            selectedCommand = "no"; // Обновляем значение для "нет"
            commandInput.value = selectedCommand; // Обновляем значение скрытого поля
        });
    }

    // Запуск функций
    toggleTrackButton(studentButton, pupilButton);
    toggleCommandButton(yesButton, noButton, commandNameField, commandAlert);

    // Логирование данных перед отправкой формы (опционально)
    document.querySelector("form").addEventListener("submit", (event) => {
        console.log("Submitting form with values:");
        console.log("Selected Track:", trackInput.value);
        console.log("Selected Command:", commandInput.value);
    });
});