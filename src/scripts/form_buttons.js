document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    if (!form) {
        console.error('Форма не найдена!');
        return;
    }

    // Скрытые поля
    const selectedTrackInput = document.getElementById('selected_track');
    const selectedCommandInput = document.getElementById('selected_command');
    const commandNameInput = document.getElementById('command_name');

    // Кнопки трека
    const trackButtons = document.querySelectorAll('.form_track_button_student, .form_track_button_pupil');
    trackButtons.forEach(button => {
        button.addEventListener('click', function () {
            const trackValue = this.id === 'form_track_button_student' ? 'student' : 'pupil';
            selectedTrackInput.value = trackValue;

            // Визуальное выделение выбранной кнопки
            trackButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Кнопки команды
    const commandButtons = document.querySelectorAll('.form_command_button_yes, .form_command_button_no');
    commandButtons.forEach(button => {
        button.addEventListener('click', function () {
            const commandValue = this.id === 'form_command_button_yes' ? 'yes' : 'no';
            selectedCommandInput.value = commandValue;

            // Визуальное выделение выбранной кнопки
            commandButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Показать/скрыть поле для названия команды
            if (commandValue === 'yes') {
                commandNameInput.classList.remove('hidden');
                document.getElementById('command_alert').classList.remove('hidden');
            } else {
                commandNameInput.classList.add('hidden');
                document.getElementById('command_alert').classList.add('hidden');
                commandNameInput.value = '';
            }
        });
    });
});