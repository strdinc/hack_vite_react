// Получаем все элементы
const menuButton = document.getElementById('menuButton');
const buttons = document.querySelectorAll('.navigation_button');

let isAnimating = false; // Флаг для отслеживания анимации

// Функция для последовательного показа кнопок
function showButtonsSequentially() {
  if (isAnimating) return; // Если анимация уже запущена, выходим
  isAnimating = true; // Устанавливаем флаг анимации
  disableButtons(); // Блокируем кнопки

  let delay = 0; // Задержка между показом кнопок
  buttons.forEach((button, index) => {
    setTimeout(() => {
      button.classList.add('visible'); // Добавляем класс для плавного появления
      if (index === buttons.length - 1) {
        isAnimating = false; // Сбрасываем флаг после завершения анимации
        enableButtons(); // Разблокируем кнопки
      }
    }, delay);
    delay += 50; // Увеличиваем задержку для следующей кнопки
  });
}

// Функция для последовательного скрытия кнопок
function hideButtonsSequentially() {
  if (isAnimating) return; // Если анимация уже запущена, выходим
  isAnimating = true; // Устанавливаем флаг анимации
  disableButtons(); // Блокируем кнопки

  let delay = 0; // Задержка между скрытием кнопок
  for (let i = buttons.length - 1; i >= 0; i--) {
    setTimeout(() => {
      buttons[i].classList.remove('visible'); // Убираем класс для плавного исчезновения
      if (i === 0) {
        isAnimating = false; // Сбрасываем флаг после завершения анимации
        enableButtons(); // Разблокируем кнопки
      }
    }, delay);
    delay += 50; // Увеличиваем задержку для предыдущей кнопки
  }
}

// Функция для блокировки кнопок
function disableButtons() {
  menuButton.style.pointerEvents = 'none'; // Отключаем клики на menuButton
  buttons.forEach(button => {
    button.style.pointerEvents = 'none'; // Отключаем клики на кнопках меню
  });
}

// Функция для разблокировки кнопок
function enableButtons() {
  menuButton.style.pointerEvents = 'auto'; // Включаем клики на menuButton
  buttons.forEach(button => {
    button.style.pointerEvents = 'auto'; // Включаем клики на кнопках меню
  });
}

// Добавляем обработчик события клика на menuButton
menuButton.addEventListener('click', () => {
  const isActive = menuButton.classList.toggle('active');

  if (isActive) {
    // Если кнопка активна, показываем кнопки
    showButtonsSequentially();
  } else {
    // Если кнопка неактивна, скрываем кнопки
    hideButtonsSequentially();
  }
});

// Добавляем обработчики событий для кнопок навигации
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-scroll-to'); // Получаем ID целевого блока
    const targetElement = document.getElementById(targetId); // Находим элемент по ID
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // Плавная прокрутка
        block: 'start' // Верхняя граница блока совпадает с верхней границей видимой области
      });
    }
  });
});

// Функция для деактивации меню
function deactivateMenu() {
  if (menuButton.classList.contains('active')) {
    menuButton.classList.remove('active'); // Деактивируем кнопку
    hideButtonsSequentially(); // Скрываем кнопки
  }
}

// Добавляем обработчики событий для скролла
window.addEventListener('wheel', deactivateMenu); // Колёсико мыши
window.addEventListener('keydown', (event) => {
  // Стрелки вверх/вниз или пробел
  if (['ArrowUp', 'ArrowDown', 'Space'].includes(event.key)) {
    deactivateMenu();
  }
});
window.addEventListener('scroll', deactivateMenu); // Перетаскивание ползунка скроллбара