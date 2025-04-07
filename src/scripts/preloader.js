// Скрипт для управления прелоадером
document.addEventListener("DOMContentLoaded", () => {
  // Находим элемент прелоадера
  const preloader = document.getElementById('preloader');

  // Имитация задержки загрузки (например, 2 секунды)
  setTimeout(() => {
    // Добавляем класс 'hidden', чтобы скрыть прелоадер
    preloader.classList.add('hidden');
  }, 2000); // Задержка в миллисекундах (2000 = 2 секунды)

  // Если нужно учитывать полную загрузку страницы (включая изображения и другие ресурсы)
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
  });
});