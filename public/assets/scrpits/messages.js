document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.like-form');

  forms.forEach(form => {
    const messageId = form.dataset.id;
    const button = form.querySelector('.like-button');

    // Load initial state from localStorage
    if (localStorage.getItem('liked_' + messageId) === 'true') {
      button.classList.add('liked');
      button.textContent = 'Unlike 💔';
    }

    button.addEventListener('click', () => {
      const isLiked = button.classList.toggle('liked');
      localStorage.setItem('liked_' + messageId, isLiked);

      button.textContent = isLiked ? 'Unlike 💔' : 'Like ❤️';
    });
  });
});