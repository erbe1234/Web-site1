<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

require_post();

try {
    $data = validate_event_payload($_POST);

    $stmt = get_pdo()->prepare(
        'INSERT INTO events
            (title, description, event_date, event_time, category, alarm_enabled, reminder_status, snooze_until)
         VALUES
            (:title, :description, :event_date, :event_time, :category, :alarm_enabled, :reminder_status, NULL)'
    );

    $stmt->execute([
        ':title' => $data['title'],
        ':description' => $data['description'],
        ':event_date' => $data['event_date'],
        ':event_time' => $data['event_time'],
        ':category' => $data['category'],
        ':alarm_enabled' => $data['alarm_enabled'],
        ':reminder_status' => 'pending',
    ]);

    json_response([
        'success' => true,
        'message' => 'Evenement ajoute avec succes.',
        'id' => (int) get_pdo()->lastInsertId(),
    ]);
} catch (Throwable $e) {
    json_response([
        'success' => false,
        'message' => 'Impossible d ajouter l evenement.',
    ], 500);
}
