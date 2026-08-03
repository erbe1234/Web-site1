const api = {
  list: 'get_events.php',
  add: 'add_event.php',
  update: 'update_event.php',
  delete: 'delete_event.php',
};

const state = {
  events: [],
  activeAlarm: null,
  audioContext: null,
  fallbackInterval: null,
  fallbackNodes: [],
  triggeredKeys: new Set(JSON.parse(localStorage.getItem('eventReminderTriggeredKeys') || '[]')),
};

const $ = (id) => document.getElementById(id);

const form = $('event-form');
const eventsList = $('events-list');
const message = $('message');
const refreshStatus = $('refresh-status');
const alarmBox = $('alarm-notification');
const alarmAudio = $('alarm-audio');

function saveTriggeredKeys() {
  localStorage.setItem('eventReminderTriggeredKeys', JSON.stringify([...state.triggeredKeys].slice(-100)));
}

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value ?? '';
  return div.innerHTML;
}

function showMessage(text, type = 'success') {
  message.textContent = text;
  message.className = `message ${type}`;

  window.setTimeout(() => {
    message.textContent = '';
    message.className = 'message';
  }, 4500);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({
    success: false,
    message: 'Reponse serveur invalide.',
  }));

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Une erreur est survenue.');
  }

  return data;
}

function eventDateTime(event) {
  const base = event.snooze_until || `${event.event_date} ${event.event_time}`;
  return new Date(String(base).replace(' ', 'T'));
}

function reminderKey(event) {
  const base = event.snooze_until || `${event.event_date} ${event.event_time}`;
  return `${event.id}:${base}`;
}

function formatDateTime(event) {
  const date = eventDateTime(event);

  if (Number.isNaN(date.getTime())) {
    return `${event.event_date} ${event.event_time}`;
  }

  return date.toLocaleString('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function resetForm() {
  form.reset();
  $('id').value = '';
  $('alarm_enabled').checked = true;
  $('form-title').textContent = 'Ajouter un evenement';
  $('submit-button').textContent = 'Ajouter';
  $('cancel-edit').classList.add('hidden');
}

function fillForm(event) {
  $('id').value = event.id;
  $('title').value = event.title;
  $('description').value = event.description || '';
  $('event_date').value = event.event_date;
  $('event_time').value = String(event.event_time || '').slice(0, 5);
  $('category').value = event.category || '';
  $('alarm_enabled').checked = Number(event.alarm_enabled) === 1;
  $('form-title').textContent = 'Modifier un evenement';
  $('submit-button').textContent = 'Modifier';
  $('cancel-edit').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderEvents() {
  if (state.events.length === 0) {
    eventsList.innerHTML = '<p class="empty">Aucun evenement a venir.</p>';
    return;
  }

  eventsList.innerHTML = state.events.map((event) => {
    const alarmText = Number(event.alarm_enabled) === 1 ? 'Alarme active' : 'Alarme desactivee';
    const statusText = event.reminder_status === 'snoozed' ? 'Repete dans 5 minutes' : 'En attente';
    const statusClass = event.reminder_status === 'snoozed' ? 'status-snoozed' : '';

    return `
      <article class="event-card" data-id="${event.id}">
        <div class="event-main">
          <div class="event-topline">
            <h3>${escapeHtml(event.title)}</h3>
            <span class="badge">${escapeHtml(event.category || 'General')}</span>
          </div>
          <p class="event-description">${escapeHtml(event.description || 'Aucune description.')}</p>
          <div class="event-meta">
            <span>${escapeHtml(formatDateTime(event))}</span>
            <span>${alarmText}</span>
            <span class="${statusClass}">${statusText}</span>
          </div>
        </div>
        <div class="event-actions">
          <button type="button" class="button secondary" data-action="edit" data-id="${event.id}">Modifier</button>
          <button type="button" class="button danger" data-action="delete" data-id="${event.id}">Supprimer</button>
        </div>
      </article>
    `;
  }).join('');
}

async function loadEvents() {
  try {
    refreshStatus.textContent = 'Actualisation en cours...';
    const data = await requestJson(api.list);
    state.events = data.events || [];
    renderEvents();
    checkAlarms();
    refreshStatus.textContent = `Derniere verification : ${new Date().toLocaleTimeString('fr-FR')}.`;
  } catch (error) {
    eventsList.innerHTML = '<p class="empty">Impossible de charger les evenements. Verifiez config.php et MySQL.</p>';
    refreshStatus.textContent = 'Erreur de connexion au serveur.';
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const isEditing = Boolean($('id').value);

  if (!$('alarm_enabled').checked) {
    formData.delete('alarm_enabled');
  }

  try {
    const data = await requestJson(isEditing ? api.update : api.add, {
      method: 'POST',
      body: formData,
    });

    showMessage(data.message);
    resetForm();
    await loadEvents();
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

async function deleteEvent(id) {
  if (!window.confirm('Supprimer cet evenement ?')) {
    return;
  }

  const formData = new FormData();
  formData.append('id', id);

  try {
    const data = await requestJson(api.delete, {
      method: 'POST',
      body: formData,
    });

    showMessage(data.message);
    await loadEvents();
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

function stopFallbackSound() {
  if (state.fallbackInterval) {
    window.clearInterval(state.fallbackInterval);
    state.fallbackInterval = null;
  }

  state.fallbackNodes.forEach((node) => {
    try {
      node.stop();
    } catch (error) {
      // Node already stopped.
    }
  });

  state.fallbackNodes = [];
}

function playFallbackSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  state.audioContext = state.audioContext || new AudioContextClass();

  const playTone = () => {
    if (!state.activeAlarm) {
      return;
    }

    const oscillator = state.audioContext.createOscillator();
    const gain = state.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, state.audioContext.currentTime);
    gain.gain.setValueAtTime(0.001, state.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, state.audioContext.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, state.audioContext.currentTime + 0.55);

    oscillator.connect(gain);
    gain.connect(state.audioContext.destination);
    oscillator.start();
    oscillator.stop(state.audioContext.currentTime + 0.6);
    state.fallbackNodes.push(oscillator);
  };

  playTone();
  state.fallbackInterval = window.setInterval(playTone, 1000);
}

function stopAlarmSound() {
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  stopFallbackSound();
}

async function playAlarmSound() {
  stopAlarmSound();

  try {
    alarmAudio.currentTime = 0;
    await alarmAudio.play();
  } catch (error) {
    playFallbackSound();
  }
}

function showAlarm(event) {
  state.activeAlarm = event;
  state.triggeredKeys.add(reminderKey(event));
  saveTriggeredKeys();

  $('alarm-title').textContent = event.title;
  $('alarm-description').textContent = event.description || formatDateTime(event);
  alarmBox.classList.remove('hidden');
  playAlarmSound();
}

function checkAlarms() {
  if (state.activeAlarm) {
    return;
  }

  const now = new Date();

  for (const event of state.events) {
    if (Number(event.alarm_enabled) !== 1) {
      continue;
    }

    const dueAt = eventDateTime(event);
    const diff = now.getTime() - dueAt.getTime();
    const key = reminderKey(event);

    // A 30-second window matches the automatic polling interval.
    if (diff >= 0 && diff <= 30000 && !state.triggeredKeys.has(key)) {
      showAlarm(event);
      break;
    }
  }
}

async function updateAlarmAction(action) {
  if (!state.activeAlarm) {
    return;
  }

  const formData = new FormData();
  formData.append('id', state.activeAlarm.id);
  formData.append('action', action);

  try {
    const data = await requestJson(api.update, {
      method: 'POST',
      body: formData,
    });

    showMessage(data.message);
  } catch (error) {
    showMessage(error.message, 'error');
  }

  alarmBox.classList.add('hidden');
  state.activeAlarm = null;
  stopAlarmSound();
  await loadEvents();
}

eventsList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');

  if (!button) {
    return;
  }

  const selected = state.events.find((item) => String(item.id) === String(button.dataset.id));

  if (!selected) {
    return;
  }

  if (button.dataset.action === 'edit') {
    fillForm(selected);
  }

  if (button.dataset.action === 'delete') {
    deleteEvent(selected.id);
  }
});

form.addEventListener('submit', handleSubmit);
$('cancel-edit').addEventListener('click', resetForm);
$('refresh-events').addEventListener('click', loadEvents);
$('stop-alarm').addEventListener('click', () => updateAlarmAction('dismiss'));
$('snooze-alarm').addEventListener('click', () => updateAlarmAction('snooze'));

loadEvents();
window.setInterval(loadEvents, 30000);
