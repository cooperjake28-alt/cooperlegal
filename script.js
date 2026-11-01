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

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!validate()) return;

  const button = form.querySelector('button[type="submit"]');
  const sendError = document.getElementById('form-error');
  sendError.hidden = true;
  button.disabled = true;
  button.textContent = 'Sending…';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Send failed');
  } catch (err) {
    button.disabled = false;
    button.textContent = 'Send message';
    sendError.hidden = false;
    return;
  }

  form.hidden = true;
  success.hidden = false;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
