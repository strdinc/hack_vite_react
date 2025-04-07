document.querySelectorAll('.partner_container').forEach(container => {
  const canvas = container.querySelector('.wave_canvas');
  const ctx = canvas.getContext('2d');

  // Настройка размеров Canvas
  function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let isHovered = false;
  let waveRadius = 0;
  let centerX = 0;
  let centerY = 0;

  // Флаги для управления последовательностью анимации
  let isWaveExpanding = false;
  let isTextVisible = false;

  // Анимация волны
  function animateWave() {
    if (!isHovered && waveRadius <= 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isHovered) {
      if (!isWaveExpanding) {
        // Расширение волны
        waveRadius += 15; // Скорость расширения волны
        if (waveRadius >= Math.hypot(canvas.width, canvas.height)) {
          isWaveExpanding = true;
          setTimeout(() => {
            isTextVisible = true; // Показываем текст после завершения волны
          }, 100); // Задержка перед появлением текста
        }
      }
    } else {
      if (isTextVisible) {
        // Скрываем текст перед сжатием волны
        isTextVisible = false;
      }
      waveRadius -= 15; // Скорость сжатия волны
    }

    waveRadius = Math.max(waveRadius, 0); // Ограничение минимального радиуса
    waveRadius = Math.min(waveRadius, Math.hypot(canvas.width, canvas.height)); // Ограничение максимального радиуса

    // Рисуем волну
    ctx.beginPath();
    ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(0,92,255)'; // Цвет волны для ID
    if (container.classList.contains('partner_container_KemSU')) {
      ctx.fillStyle = 'rgb(0,0,0)'; // Цвет волны для KemSU
    }
    if (container.classList.contains('partner_container_etc')) {
      ctx.fillStyle = 'rgb(143,0,204)'; // Цвет волны для etc
    }
    ctx.fill();

    requestAnimationFrame(animateWave);
  }

  // Управление видимостью текста
  function updateTextVisibility() {
    const title = container.querySelector('.partner_title');
    const description = container.querySelector('.partner_description');
    if (isTextVisible) {
      title.style.opacity = 1;
      description.style.opacity = 1;
    } else {
      title.style.opacity = 0;
      description.style.opacity = 0;
    }
  }

  // Начало анимации при наведении
  container.addEventListener('mouseenter', (e) => {
    isHovered = true;
    isWaveExpanding = false;
    isTextVisible = false;
    const rect = container.getBoundingClientRect();
    centerX = e.clientX - rect.left;
    centerY = e.clientY - rect.top;
    waveRadius = 0;
    animateWave();
    updateTextVisibility();
  });

  // Конец анимации при уходе курсора
  container.addEventListener('mouseleave', () => {
    isHovered = false;
    isWaveExpanding = false;
    isTextVisible = false;
    updateTextVisibility();
  });

  // Обновление видимости текста в процессе анимации
  setInterval(updateTextVisibility, 100);
});
