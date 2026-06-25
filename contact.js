// ============================================
// PCStore Perth — contact.html logic
// Handles: Messenger link, contact form submission, nav toggle
// ============================================

import { supabase, MESSENGER_LINK } from './supabase-client.js';

// Set Messenger link
document.getElementById('contact-messenger-btn').href = MESSENGER_LINK;

// Nav toggle
document.getElementById('nav-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// Contact form submission
document.getElementById('contact-form-submit').addEventListener('click', async () => {
  const name = document.getElementById('cf-name').value.trim();
  const contact = document.getElementById('cf-contact').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !contact || !message) {
    alert('Please fill in all fields');
    return;
  }

  const btn = document.getElementById('contact-form-submit');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const { error } = await supabase.from('messages').insert({ name, contact, message });

  btn.disabled = false;
  btn.textContent = 'Send message';

  if (error) {
    alert('Error: ' + error.message);
    return;
  }

  document.getElementById('contact-form-view').classList.add('hidden');
  document.getElementById('contact-form-success').classList.remove('hidden');
});
