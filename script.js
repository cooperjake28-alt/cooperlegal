document.getElementById('year').textContent = new Date().getFullYear();

// Contact form validation
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

function setError(field, message) {
  const wrapper = field.closest('.field');
  wrapper.classList.toggle('invalid', Boolean(message));
  wrapper.querySelector('.error').textContent = message;
}

function validate() {
  let firstInvalid = null;
  form.querySelectorAll('[required]').forEach((field) => {
    let message = '';
    if (!field.value.trim()) {
      message = 'This field is required.';
    } else if (field.type === 'email' && !field.validity.valid) {
      message = 'Please enter a valid email address.';
    }
    setError(field, message);
    if (message && !firstInvalid) firstInvalid = field;
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

form.querySelectorAll('[required]').forEach((field) =>
  field.addEventListener('input', () => {
    if (field.closest('.field').classList.contains('invalid')) setError(field, '');
  })
);

// MOCK SUBMIT: shows the success state without sending anything.
// When Web3Forms is set up, replace the timeout below with:
//   const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
//   if (!res.ok) { /* show an error */ return; }
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!validate()) return;

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Sending…';

  await new Promise((resolve) => setTimeout(resolve, 900));

  form.hidden = true;
  success.hidden = false;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
