
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




/////////////]]]]


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".form-btn").forEach(button => {
    button.addEventListener("click", () => {
      const formId = button.dataset.target;
      const form = document.getElementById(formId);

      form.style.display = form.style.display === "none" ? "block" : "none";
      button.classList.toggle("active");
    });
  });
document.querySelectorAll("#anonymousCheck").forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const form = checkbox.closest("form");
    const nameField = form.querySelector("#nameField");
    const nameInput = form.querySelector("#fromInput");

    nameField.style.display = checkbox.checked ? "none" : "block";
    nameInput.value = checkbox.checked ? "Anoniem" : "";
  });
});
 // Show popup 
 document.querySelectorAll("#dropTextarea").forEach(textarea => {
  textarea.addEventListener("focus", () => {
    const popup = textarea.closest("form").querySelector("#messagePopup");
    popup?.classList.add("show");
  });
});
 // loading/success state
 document.addEventListener("click", async (event) => {
  if (!event.target.matches(".post-btn")) return;

  event.preventDefault();

  const button = event.target;
  const formId = button.dataset.id;
  const form = document.querySelector(`#post-form-${formId}`);
  if (!form) return;

  const loading = form.querySelector(".loading-state");
  const success = form.querySelector(".success-message");

  loading?.classList.remove("hide");
  loading?.classList.add("show");

  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: new URLSearchParams(data)
  });



  form.reset();
  loading?.classList.remove("show");
  success?.classList.add("show");

  setTimeout(() => {
    success?.classList.remove("show");
  }, 2400);
});
});