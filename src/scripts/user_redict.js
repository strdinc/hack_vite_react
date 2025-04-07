(function redirect() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  const currentURL = window.location.href;

  if (currentURL.includes('hackathonidigit.ru') && !currentURL.includes('m.hackathonidigit.ru') && isMobile) {
    setTimeout(() => {
      window.location.href = currentURL.replace('hackathonidigit.ru', 'm.hackathonidigit.ru');
    }, 500); // Задержка в 500ms для отображения прелоадера
  } else if (currentURL.includes('m.hackathonidigit.ru') && !isMobile) {
    setTimeout(() => {
      window.location.href = currentURL.replace('m.hackathonidigit.ru', 'hackathonidigit.ru');
    }, 500); // Задержка в 500ms для отображения прелоадера
  }
})();
