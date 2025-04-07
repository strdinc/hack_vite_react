document.querySelectorAll('.qa .q').forEach(button => {
  button.addEventListener('click', () => {
    const currentQA = button.parentElement;
    const allQA = document.querySelectorAll('.qa');

    allQA.forEach(qa => {
      if (qa !== currentQA) {
        qa.classList.remove('active');
      }
    });

    currentQA.classList.toggle('active');
  });
});
