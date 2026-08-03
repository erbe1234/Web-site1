<?php
// Event reminder app entry point.
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rappel d'evenements</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="app-header">
    <div class="header-content">
      <p class="eyebrow">Agenda intelligent</p>
      <h1>Rappel d'evenements</h1>
      <p class="subtitle">
        Ajoutez vos moments importants, gardez cette page ouverte, et recevez une alarme au bon moment.
      </p>
    </div>
  </header>

  <main class="app-shell">
    <section class="panel form-panel" aria-labelledby="form-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Nouvel element</p>
          <h2 id="form-title">Ajouter un evenement</h2>
        </div>
        <button type="button" id="cancel-edit" class="button ghost hidden">Annuler</button>
      </div>

      <form id="event-form" autocomplete="off">
        <input type="hidden" id="id" name="id">

        <label for="title">Titre</label>
        <input type="text" id="title" name="title" maxlength="255" required placeholder="Ex. Examen JavaScript">

        <label for="description">Description</label>
        <textarea id="description" name="description" rows="4" placeholder="Details utiles, lieu, objectif..."></textarea>

        <div class="form-grid">
          <div>
            <label for="event_date">Date</label>
            <input type="date" id="event_date" name="event_date" required>
          </div>
          <div>
            <label for="event_time">Heure</label>
            <input type="time" id="event_time" name="event_time" required>
          </div>
        </div>

        <label for="category">Categorie</label>
        <input type="text" id="category" name="category" maxlength="100" placeholder="Cours, travail, famille...">

        <label class="checkbox-line" for="alarm_enabled">
          <input type="checkbox" id="alarm_enabled" name="alarm_enabled" value="1" checked>
          <span>Activer l'alarme sonore</span>
        </label>

        <button type="submit" id="submit-button" class="button primary">Ajouter</button>
      </form>

      <div id="message" class="message" role="status" aria-live="polite"></div>
    </section>

    <section class="panel list-panel" aria-labelledby="events-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Planning</p>
          <h2 id="events-title">Evenements a venir</h2>
          <p id="refresh-status" class="refresh-status">
            Verification automatique toutes les 30 secondes.
          </p>
        </div>
        <button type="button" id="refresh-events" class="button ghost">Actualiser</button>
      </div>

      <div id="events-list" class="events-list" aria-live="polite"></div>
    </section>
  </main>

  <aside id="alarm-notification" class="alarm-notification hidden" role="dialog" aria-modal="true" aria-live="assertive">
    <div class="alarm-pulse"></div>
    <div class="alarm-content">
      <p class="eyebrow">Rappel maintenant</p>
      <h2 id="alarm-title">Evenement</h2>
      <p id="alarm-description"></p>
      <div class="alarm-actions">
        <button type="button" id="stop-alarm" class="button danger">Arreter l'alarme</button>
        <button type="button" id="snooze-alarm" class="button secondary">Repeter dans 5 minutes</button>
      </div>
    </div>
  </aside>

  <audio id="alarm-audio" src="assets/sounds/alarm.mp3" preload="auto" loop></audio>
  <script src="assets/js/app.js"></script>
</body>
</html>
