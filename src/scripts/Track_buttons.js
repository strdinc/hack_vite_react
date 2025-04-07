// Получаем кнопки
const studentButton = document.querySelector('.track_button_student');
const pupilButton = document.querySelector('.track_button_pupil');

// Получаем элементы для отображения
const studentElements = document.querySelectorAll('.students');
const pupilElements = document.querySelectorAll('.pupils');

// Функция для переключения активной кнопки
function toggleTrack(showStudents) {
  // Удаляем класс "active" со всех кнопок
  studentButton.classList.remove('active');
  pupilButton.classList.remove('active');

  // Добавляем класс "active" для текущей кнопки
  if (showStudents) {
    studentButton.classList.add('active');
  } else {
    pupilButton.classList.add('active');
  }

  // Показываем/скрываем соответствующие элементы
  studentElements.forEach(el => (el.style.display = showStudents ? 'block' : 'none'));
  pupilElements.forEach(el => (el.style.display = showStudents ? 'none' : 'block'));
}

// Устанавливаем начальное состояние (активная кнопка "студенты")
toggleTrack(true);

// Добавляем обработчики событий
studentButton.addEventListener('click', () => toggleTrack(true));
pupilButton.addEventListener('click', () => toggleTrack(false));
