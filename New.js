const form = document.querySelector('form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const submitButton = document.querySelector('input[type="submit"]');
const successMessage = document.querySelector('#success-message');
const errorMessage = document.querySelector('#error-message');

let isLoading = false;
let successMessageText = null;
let errorMessageText = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (isLoading) return;
  isLoading = true;
  successMessageText = null;
  errorMessageText = null;
  const values = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };
  try {
    const response = await fetch('https://formspree.io/f/mrgndnbn', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      successMessageText = 'Your message has been sent successfully!';
    } else {
      errorMessageText = 'There was an error sending your message. Please try again later.';
    }
  } catch (error) {
    console.error('Error sending email:', error);
    errorMessageText = 'There was an error sending your message. Please try again later.';
  } finally {
    isLoading = false;
    submitButton.disabled = false;
    successMessage.innerText = successMessageText;
    errorMessage.innerText = errorMessageText;
  }
});