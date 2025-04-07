let activeButton = null; // Хранит текущую активную кнопку

// Функция запуска анимации
function activateGradient(button) {
  if (button && activeButton !== button) {
    deactivateGradient(activeButton); // Отключаем предыдущую кнопку
    button.classList.add('animated-gradient'); // Добавляем класс с анимацией
    activeButton = button; // Устанавливаем текущую активную кнопку
  }
}

// Функция отключения анимации
function deactivateGradient(button) {
  if (button) {
    button.classList.remove('animated-gradient'); // Убираем класс с анимацией
  }
}

// Отслеживание положения якорей
function handleScroll() {
  const anchors = document.querySelectorAll('.anchor');
  const viewportTop = window.innerHeight * 0.45; // Верхняя граница области
  const viewportBottom = window.innerHeight * 0.55; // Нижняя граница области

  let closestAnchor = null;
  let minDistance = Infinity;

  anchors.forEach((anchor) => {
    const rect = anchor.getBoundingClientRect();
    const anchorCenter = rect.top + rect.height / 2;

    const targetId = anchor.getAttribute('data-target');
    const targetButton = document.getElementById(targetId);

    // Проверяем, находится ли якорь в области 45–55%
    if (anchorCenter > viewportTop && anchorCenter < viewportBottom) {
      const distance = Math.abs(anchorCenter - (viewportTop + viewportBottom) / 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestAnchor = targetButton;
      }
    }
  });

  if (closestAnchor !== activeButton) {
    activateGradient(closestAnchor); // Включаем анимацию у ближайшей кнопки
  } else if (!closestAnchor && activeButton) {
    deactivateGradient(activeButton); // Выключаем активную кнопку, если якорь покидает область
    activeButton = null;
  }
}

// Отключаем анимацию у всех кнопок при загрузке
function resetAllButtons() {
  const buttons = document.querySelectorAll('.gradient-text');
  buttons.forEach((button) => {
    button.classList.remove('animated-gradient'); // Убираем класс анимации
  });
  activeButton = null; // Сбрасываем активную кнопку
}

// Подключаем обработчик событий
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', resetAllButtons); // Сбрасываем стили при загрузке страницы
