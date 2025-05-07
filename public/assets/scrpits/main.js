document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".form-btn");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const targetId = this.dataset.target;
      const formArticle = document.getElementById(targetId);

      if (formArticle.style.display === "none") {
        formArticle.style.display = "block";
      } else {
        formArticle.style.display = "none";
      }
    });
  });
});



const anonymousCheckbox = document.getElementById('anonymousCheck');
const nameField = document.getElementById('nameField');
const fromInput = document.getElementById('fromInput');

anonymousCheckbox.addEventListener('change', () => {
  if (anonymousCheckbox.checked) {
    nameField.style.display = 'none';         
    fromInput.value = 'Anoniem';              
  } else {
    nameField.style.display = 'block';        
    fromInput.value = '';                     
  }
});
//pop uo
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('messagePopup');
  const textarea = document.getElementById('dropTextarea');
  textarea.addEventListener('focus', () => {
    popup.classList.add('show');
  });
});

function toggleActive() {
  document.querySelector('.form-btn').classList.toggle('active');
}
