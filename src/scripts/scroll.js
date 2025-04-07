// Получаем элементы
    const scrollbarContainer = document.querySelector('.scrollbar-container');
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');

    // Параметры
    let isDragging = false;

    // Коэффициент прокрутки (можно изменять)
    const scrollFactor = 3; // Увеличьте значение для более быстрой прокрутки

    // Вычисляем высоту ползунка
    function updateScrollbarThumbHeight() {
      const contentHeight = document.body.scrollHeight; // Высота всего контента
      const viewportHeight = window.innerHeight; // Высота видимой области
      const thumbHeight = (viewportHeight / contentHeight) * 100; // Процентное соотношение
      scrollbarThumb.style.height = `${thumbHeight}%`;
    }

    // Обновляем позицию ползунка
    let isUpdatingThumb = false; // Флаг для предотвращения частых обновлений
    function updateScrollbarThumbPosition() {
      if (isUpdatingThumb) return;

      isUpdatingThumb = true;
      requestAnimationFrame(() => {
        const contentHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const maxScroll = contentHeight - viewportHeight;
        const thumbPosition = (scrollTop / maxScroll) * 100; // Процентное положение
        scrollbarThumb.style.top = `${thumbPosition}%`;
        isUpdatingThumb = false;
      });
    }

    // Привязываем прокрутку страницы к движению ползунка
    let isScrolling = false; // Флаг для предотвращения конфликтов анимации
    function scrollToPosition(targetScrollTop) {
      if (isScrolling) return;

      const start = window.scrollY;
      const distance = targetScrollTop - start;
      const duration = 300; // Длительность анимации в миллисекундах
      const startTime = performance.now();

      isScrolling = true;

      function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // От 0 до 1
        const ease = easeOutCubic(progress); // Функция плавности
        const newScrollTop = start + distance * ease;

        window.scrollTo(0, newScrollTop);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isScrolling = false;
        }
      }

      requestAnimationFrame(animateScroll);
    }

    // Функция плавности (ease-out cubic)
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    // Инициализация
    updateScrollbarThumbHeight();
    updateScrollbarThumbPosition();

    // Слушаем события прокрутки страницы
    window.addEventListener('scroll', () => {
      updateScrollbarThumbPosition();
    });

    // Слушаем изменение размеров окна
    window.addEventListener('resize', () => {
      updateScrollbarThumbHeight();
      updateScrollbarThumbPosition();
    });

    // Добавляем возможность перетаскивать ползунок
    scrollbarThumb.addEventListener('mousedown', (event) => {
      isDragging = true;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(event) {
      if (!isDragging) return;
      const containerHeight = scrollbarContainer.clientHeight;
      const offsetY = event.clientY - scrollbarContainer.getBoundingClientRect().top;
      const thumbPosition = offsetY / containerHeight;

      const contentHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = contentHeight - viewportHeight;

      scrollToPosition(thumbPosition * maxScroll);
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    // Добавляем клик по контейнеру для быстрого скролла
    scrollbarContainer.addEventListener('click', (event) => {
      if (event.target === scrollbarContainer) {
        const containerHeight = scrollbarContainer.clientHeight;
        const offsetY = event.clientY - scrollbarContainer.getBoundingClientRect().top;
        const thumbPosition = offsetY / containerHeight;

        const contentHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        const maxScroll = contentHeight - viewportHeight;

        scrollToPosition(thumbPosition * maxScroll);
      }
    });

    // Реакция на колесико мыши
    let lastWheelTime = 0;
    const wheelDelay = 16; // Задержка в миллисекундах (~60 FPS)

    window.addEventListener('wheel', (event) => {
      const now = Date.now();
      if (now - lastWheelTime < wheelDelay) return; // Пропускаем событие, если оно слишком частое
      lastWheelTime = now;

      const delta = event.deltaY * scrollFactor; // Умножаем на коэффициент прокрутки
      const currentScroll = window.scrollY;

      scrollToPosition(currentScroll + delta);
    });

    // Реакция на клавиши со стрелками
    window.addEventListener('keydown', (event) => {
      const currentScroll = window.scrollY;
      const scrollStep = 50 * scrollFactor; // Умножаем на коэффициент прокрутки

      if (event.key === 'ArrowDown') {
        scrollToPosition(currentScroll + scrollStep);
      } else if (event.key === 'ArrowUp') {
        scrollToPosition(currentScroll - scrollStep);
      }
    });