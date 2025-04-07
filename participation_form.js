document.getElementById('myForm').addEventListener('submit', function (event) {

    const studentButton = document.getElementById("form_track_button_student");
    const pupilButton = document.getElementById("form_track_button_pupil");
    const yesButton = document.getElementById("form_command_button_yes");
    const noButton = document.getElementById("form_command_button_no");
    const commandNameField = document.getElementById("command_name");
    const commandAlert = document.getElementById("command_alert");

    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const form = this; // Сохраняем ссылку на форму
    const formData = new FormData(form); // Создаем объект FormData из формы
    const successMessage = document.getElementById('successMessage');
    const menuButtons = document.getElementById('menubuttonsall');

    // Скрываем кнопки меню
    menuButtons.style.display = 'none';

    fetch('submit.php', {
        method: 'POST',
        body: formData // Передаем данные формы
    })
        .then(response => response.json()) // Получаем ответ от сервера в формате JSON
        .then(data => {
            if (data.status === 'success') {
                // Если успешный ответ, показываем сообщение об успехе
                document.querySelector('#successMessage .success_massage_text').textContent = data.message;
                successMessage.style.display = 'block'; // Показываем сообщение

                studentButton.classList.remove("active_button_form");
                pupilButton.classList.remove("active_button_form");
                yesButton.classList.remove("active_button_form");
                noButton.classList.remove("active_button_form");
                commandNameField.classList.add("hidden");
                commandAlert.classList.add("hidden");

                // Очищаем форму
                form.reset();

                // Через 2 секунды скрываем сообщение и возвращаем кнопки меню
                setTimeout(() => {
                    successMessage.style.display = 'none'; // Скрываем сообщение
                    menuButtons.style.display = 'flex'; // Возвращаем кнопки меню
                }, 2000);
            } else {
                // Если ошибка, выводим сообщение об ошибке
                alert(data.message);

                // Возвращаем кнопки меню через 2 секунды
                setTimeout(() => {
                    menuButtons.style.display = 'flex';
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных.');

            // Возвращаем кнопки меню через 2 секунды
            setTimeout(() => {
                menuButtons.style.display = 'flex';
            }, 2000);
        });
});