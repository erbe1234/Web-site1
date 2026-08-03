<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

require_post();

try {
    $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

    if ($id <= 0) {
        json_response([
            'success' => false,
            'message' => 'Identifiant invalide.',
        ], 422);
    }

    $stmt = get_pdo()->prepare('DELETE FROM events WHERE id = :id');
    $stmt->execute([':id' => $id]);

    json_response([
        'success' => true,
        'message' => 'Evenement supprime avec succes.',
    ]);
} catch (Throwable $e) {
    json_response([
        'success' => false,
        'message' => 'Impossible de supprimer l evenement.',
    ], 500);
}
