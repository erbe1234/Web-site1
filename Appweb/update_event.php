<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

require_post();

try {
    $pdo = get_pdo();
    $action = clean_input($_POST['action'] ?? '', 30);
    $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

    if ($id <= 0) {
        json_response([
            'success' => false,
            'message' => 'Identifiant invalide.',
        ], 422);
    }

    if ($action === 'dismiss') {
        $stmt = $pdo->prepare(
            "UPDATE events
             SET reminder_status = 'dismissed', snooze_until = NULL
             WHERE id = :id"
        );
        $stmt->execute([':id' => $id]);

        json_response([
            'success' => true,
            'message' => 'Alarme arretee.',
        ]);
    }

    if ($action === 'snooze') {
        $stmt = $pdo->prepare(
            "UPDATE events
             SET reminder_status = 'snoozed', snooze_until = DATE_ADD(NOW(), INTERVAL 5 MINUTE)
             WHERE id = :id"
        );
        $stmt->execute([':id' => $id]);

        json_response([
            'success' => true,
            'message' => 'Alarme repetee dans 5 minutes.',
        ]);
    }

    $data = validate_event_payload($_POST, true);

    $stmt = $pdo->prepare(
        'UPDATE events
         SET title = :title,
             description = :description,
             event_date = :event_date,
             event_time = :event_time,
             category = :category,
             alarm_enabled = :alarm_enabled,
             reminder_status = :reminder_status,
             snooze_until = NULL
         WHERE id = :id'
    );

    $stmt->execute([
        ':id' => $data['id'],
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
        'message' => 'Evenement modifie avec succes.',
    ]);
} catch (Throwable $e) {
    json_response([
        'success' => false,
        'message' => 'Impossible de modifier l evenement.',
    ], 500);
}
