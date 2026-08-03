<?php
declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| MySQL configuration
|--------------------------------------------------------------------------
| Local XAMPP example:
|   DB_HOST = '127.0.0.1'
|   DB_NAME = 'event_reminder'
|   DB_USER = 'root'
|   DB_PASS = ''
|
| Hostinger shared hosting example:
|   DB_HOST = 'localhost' or the MySQL hostname shown in hPanel
|   DB_NAME = 'u123456789_event_reminder'
|   DB_USER = 'u123456789_event_user'
|   DB_PASS = 'your_private_password'
|
| Keep this file private. Do not publish real credentials in screenshots,
| README files, public repositories, or client-side JavaScript.
*/

const DB_HOST = '127.0.0.1';
const DB_NAME = 'event_reminder';
const DB_USER = 'root';
const DB_PASS = '';
const DB_CHARSET = 'utf8mb4';

function get_pdo(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;

    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function json_response(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_input(?string $value, int $maxLength = 1000): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);

    if (strlen($value) > $maxLength) {
        $value = substr($value, 0, $maxLength);
    }

    return $value;
}

function normalize_time(string $time): string
{
    if (preg_match('/^\d{2}:\d{2}$/', $time) === 1) {
        $time .= ':00';
    }

    return $time;
}

function validate_event_payload(array $source, bool $requireId = false): array
{
    $errors = [];
    $id = isset($source['id']) ? (int) $source['id'] : 0;

    if ($requireId && $id <= 0) {
        $errors[] = 'Identifiant invalide.';
    }

    $title = clean_input($source['title'] ?? '', 255);
    $description = clean_input($source['description'] ?? '', 5000);
    $eventDate = clean_input($source['event_date'] ?? '', 10);
    $eventTime = normalize_time(clean_input($source['event_time'] ?? '', 8));
    $category = clean_input($source['category'] ?? '', 100);
    $alarmEnabled = isset($source['alarm_enabled']) ? 1 : 0;

    if ($title === '') {
        $errors[] = 'Le titre est obligatoire.';
    }

    $dateObject = DateTime::createFromFormat('Y-m-d', $eventDate);
    if (!$dateObject || $dateObject->format('Y-m-d') !== $eventDate) {
        $errors[] = 'La date est invalide.';
    }

    $timeObject = DateTime::createFromFormat('H:i:s', $eventTime);
    if (!$timeObject || $timeObject->format('H:i:s') !== $eventTime) {
        $errors[] = 'L heure est invalide.';
    }

    if ($errors !== []) {
        json_response([
            'success' => false,
            'message' => implode(' ', $errors),
        ], 422);
    }

    return [
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'event_date' => $eventDate,
        'event_time' => $eventTime,
        'category' => $category,
        'alarm_enabled' => $alarmEnabled,
    ];
}

function require_post(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response([
            'success' => false,
            'message' => 'Methode non autorisee.',
        ], 405);
    }
}
