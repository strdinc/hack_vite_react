document.addEventListener('DOMContentLoaded', function() {
    // Форматирование даты рождения с автоматической вставкой точек
    const birthdayInput = document.getElementById('birthday');
    if (birthdayInput) {
        birthdayInput.addEventListener('input', function() {
            formatBirthday(this);
        });

        birthdayInput.addEventListener('blur', function() {
            validateBirthday(this);
        });
    }

    // Обработчик отправки формы
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submit(this);
        });
    }
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

function validateBirthday(input) {
    const pattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!pattern.test(input.value)) {
        input.setCustomValidity('Пожалуйста, введите дату в формате дд.мм.гггг');
        return false;
    }

    const parts = input.value.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Проверка корректности даты
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime()) ||
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year) {
        input.setCustomValidity('Введите корректную дату');
        return false;
    }

    input.setCustomValidity('');
    return true;
}

function checkAgeForConsent(dateString) {
    if (!dateString || dateString.length !== 10) return;

    const parts = dateString.split('.');
    if (parts.length !== 3) return;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const birthday = new Date(year, month, day);
    if (isNaN(birthday.getTime())) return;

    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    const consentContainer = document.getElementById('consent_container');
    const consentFile = document.getElementById('consent_file');

    if (age < 18) {
        consentContainer.classList.remove('hidden');
        consentFile.setAttribute('required', '');
    } else {
        consentContainer.classList.add('hidden');
        consentFile.removeAttribute('required');
    }
}