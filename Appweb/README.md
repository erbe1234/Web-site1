# Application web de rappel d'evenements

Application simple en HTML5, CSS3, JavaScript vanilla, PHP 8+, MySQL et PDO.
Elle permet d'ajouter, modifier et supprimer des evenements. Quand un evenement arrive, la page joue une alarme sonore et affiche une notification.

Important : l'alarme sonore fonctionne seulement si le navigateur est ouvert sur l'application. Certains navigateurs peuvent bloquer le son avant une premiere interaction utilisateur.

## Structure

```text
index.php
config.php
database.sql
add_event.php
update_event.php
delete_event.php
get_events.php
assets/css/style.css
assets/js/app.js
assets/sounds/alarm.mp3
README.md
```

## Installation locale avec XAMPP

1. Installez XAMPP avec PHP 8+ et MySQL/MariaDB.
2. Copiez le dossier du projet dans `htdocs`, par exemple :

```text
C:\xampp\htdocs\event-reminder
```

3. Lancez Apache et MySQL depuis le panneau XAMPP.
4. Ouvrez phpMyAdmin :

```text
http://localhost/phpmyadmin
```

5. Creez une base de donnees nommee :

```text
event_reminder
```

6. Importez le fichier `database.sql` dans cette base.
7. Configurez `config.php` :

```php
const DB_HOST = '127.0.0.1';
const DB_NAME = 'event_reminder';
const DB_USER = 'root';
const DB_PASS = '';
```

8. Ouvrez l'application :

```text
http://localhost/event-reminder
```

## Lancer avec le serveur PHP integre

Depuis le dossier du projet :

```bash
php -S localhost:8000
```

Puis ouvrez :

```text
http://localhost:8000
```

Le serveur PHP integre ne remplace pas MySQL. MySQL doit rester lance via XAMPP, Laragon, WAMP ou un service MySQL local.

## Creer la base MySQL manuellement

Dans phpMyAdmin ou dans un terminal MySQL :

```sql
CREATE DATABASE event_reminder CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE event_reminder;
```

Importez ensuite `database.sql`.

## Configuration Hostinger

1. Dans hPanel, creez une base MySQL.
2. Notez le nom de la base, l'utilisateur, le mot de passe et l'hote MySQL.
3. Modifiez `config.php` avec ces valeurs :

```php
const DB_HOST = 'localhost'; // ou l'hote indique par Hostinger
const DB_NAME = 'u123456789_event_reminder';
const DB_USER = 'u123456789_event_user';
const DB_PASS = 'votre_mot_de_passe_prive';
```

4. Importez `database.sql` dans phpMyAdmin Hostinger.
5. Uploadez tous les fichiers dans `public_html`.
6. Verifiez que le chemin suivant existe :

```text
public_html/assets/sounds/alarm.mp3
```

## Tester une alarme

1. Ouvrez l'application dans le navigateur.
2. Ajoutez un evenement avec la date du jour et une heure dans une ou deux minutes.
3. Laissez la page ouverte.
4. L'application verifie les evenements toutes les 30 secondes.
5. Au moment de l'evenement, une notification apparait avec :
   - Arreter l'alarme
   - Repeter dans 5 minutes

Si `assets/sounds/alarm.mp3` est absent ou bloque par le navigateur, le JavaScript utilise un fallback avec Web Audio API.

## Notes techniques

- Les actions AJAX retournent du JSON.
- Les requetes SQL utilisent PDO et des requetes preparees.
- Les entrees utilisateur sont nettoyees et validees cote serveur.
- Les identifiants MySQL restent uniquement dans `config.php`.
- La page ne se recharge pas apres ajout, modification ou suppression.
