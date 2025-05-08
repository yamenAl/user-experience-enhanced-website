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
