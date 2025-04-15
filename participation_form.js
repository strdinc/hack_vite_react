document.addEventListener('DOMContentLoaded', function() {
    // Обработчики кнопок трека
    document.getElementById('form_track_button_student').addEventListener('click', function() {
        this.classList.add('active_button_form');
        document.getElementById('form_track_button_pupil').classList.remove('active_button_form');
        document.getElementById('selected_track').value = 'student';
    });

    document.getElementById('form_track_button_pupil').addEventListener('click', function() {
        this.classList.add('active_button_form');
        document.getElementById('form_track_button_student').classList.remove('active_button_form');
        document.getElementById('selected_track').value = 'pupil';
    });

    // Обработчики кнопок команды
    document.getElementById('form_command_button_yes').addEventListener('click', function() {
        this.classList.add('active_button_form');
        document.getElementById('form_command_button_no').classList.remove('active_button_form');
        document.getElementById('selected_command').value = 'yes';
        document.getElementById('command_name').classList.remove('hidden');
        document.getElementById('command_alert').classList.remove('hidden');
    });

    document.getElementById('form_command_button_no').addEventListener('click', function() {
        this.classList.add('active_button_form');
        document.getElementById('form_command_button_yes').classList.remove('active_button_form');
        document.getElementById('selected_command').value = 'no';
        document.getElementById('command_name').classList.add('hidden');
        document.getElementById('command_alert').classList.add('hidden');
    });

    // Форматирование даты рождения
    document.getElementById('birthday').addEventListener('input', function() {
        formatBirthday(this);
    });

    checkAgeForConsent(document.getElementById('birthday').value);

    // Кастомная кнопка загрузки файла
    const realFileBtn = document.getElementById('consent_file');
    const customBtn = document.querySelector('.custom-file-button');
    const fileName = document.querySelector('.file-name');

    customBtn.addEventListener('click', function() {
        realFileBtn.click();
    });

    realFileBtn.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'Файл не выбран';
        }
    });

    // Обработчик отправки формы
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();
        validateAndSubmitForm(this);
    });
});

function formatBirthday(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2 && value.length <= 4) {
        value = value.substring(0, 2) + '.' + value.substring(2);
    } else if (value.length > 4) {
        value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4, 8);
    }

    input.value = value.substring(0, 10);
    checkAgeForConsent(value);
}

function checkAgeForConsent(dateString) {
    const consentContainer = document.getElementById('consent_container');
    const consentFile = document.getElementById('consent_file');

    // Сначала скрываем контейнер (на случай, если дата невалидна)
    consentContainer.classList.add('hidden');
    consentFile.removeAttribute('required');

    if (!dateString || dateString.length !== 10) return;

    const parts = dateString.split('.');
    if (parts.length !== 3) return;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    // Проверка валидности даты
    const birthday = new Date(year, month, day);
    if (isNaN(birthday.getTime())) return;

    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    // Показываем контейнер только если возраст меньше 18
    if (age < 18) {
        consentContainer.classList.remove('hidden');
        consentFile.setAttribute('required', '');
    }
}

function validateAndSubmitForm(form) {
    // Проверка выбранного трека
    const selectedTrack = document.getElementById('selected_track').value;
    if (selectedTrack === 'none') {
        alert('Пожалуйста, выберите трек (студенты или школьники)');
        return;
    }

    // Проверка выбранного варианта команды
    const selectedCommand = document.getElementById('selected_command').value;
    if (selectedCommand === 'none') {
        alert('Пожалуйста, укажите, есть ли у вас команда');
        return;
    }

    // Проверка названия команды, если выбрано "да"
    if (selectedCommand === 'yes' && !document.getElementById('command_name').value.trim()) {
        alert('Пожалуйста, укажите название команды');
        return;
    }

    // Проверка даты рождения
    const birthdayInput = document.getElementById('birthday');
    if (!validateBirthday(birthdayInput)) {
        alert('Пожалуйста, введите корректную дату рождения в формате дд.мм.гггг');
        return;
    }

    const formData = new FormData(form);
    const successMessage = document.getElementById('successMessage');
    const menuButtons = document.getElementById('menubuttonsall');

    menuButtons.style.display = 'none';

    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.querySelector('#successMessage .success_massage_text').textContent = data.message;
                successMessage.style.display = 'block';

                // Сброс формы
                form.reset();
                document.querySelectorAll('.active_button_form').forEach(btn => {
                    btn.classList.remove('active_button_form');
                });
                document.getElementById('selected_track').value = 'none';
                document.getElementById('selected_command').value = 'none';
                document.getElementById('command_name').classList.add('hidden');
                document.getElementById('command_alert').classList.add('hidden');
                document.getElementById('consent_container').classList.add('hidden');

                setTimeout(() => {
                    successMessage.style.display = 'none';
                    menuButtons.style.display = 'flex';
                }, 2000);
            } else {
                alert(data.message);
                setTimeout(() => {
                    menuButtons.style.display = 'flex';
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных.');
            setTimeout(() => {
                menuButtons.style.display = 'flex';
            }, 2000);
        });
}

function validateBirthday(input) {
    const pattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!pattern.test(input.value)) {
        input.classList.add('error');
        return false;
    }

    const parts = input.value.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime()) ||
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year) {
        input.classList.add('error');
        return false;
    }

    input.classList.remove('error');
    return true;
}