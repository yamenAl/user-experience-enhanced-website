document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const close = document.querySelector('.menu-close');

    toggle.addEventListener('click', () => {
      menu.classList.add('open');
    });

    close.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });