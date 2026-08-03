<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

try {
    $stmt = get_pdo()->prepare(
        "SELECT
            id,
            title,
            description,
            event_date,
            event_time,
            category,
            alarm_enabled,
            reminder_status,
            snooze_until,
            created_at,
            updated_at
         FROM events
         WHERE reminder_status <> 'dismissed'
         ORDER BY
            COALESCE(snooze_until, TIMESTAMP(event_date, event_time)) ASC,
            id ASC"
    );

    $stmt->execute();

    json_response([
        'success' => true,
        'events' => $stmt->fetchAll(),
    ]);
} catch (Throwable $e) {
    json_response([
        'success' => false,
        'message' => 'Impossible de charger les evenements.',
    ], 500);
}
