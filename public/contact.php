<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Methode non autorisee.']);
    exit;
}

function clean_value(string $value, int $maxLength): string
{
    $value = trim(strip_tags($value));

    if (strlen($value) > $maxLength) {
        $value = substr($value, 0, $maxLength);
    }

    return $value;
}

$name = clean_value($_POST['name'] ?? '', 120);
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = clean_value($_POST['subject'] ?? '', 180);
$message = clean_value($_POST['message'] ?? '', 5000);

if ($name === '' || !$email || $subject === '' || strlen($message) < 10) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Veuillez remplir correctement tous les champs.',
    ]);
    exit;
}

$to = 'beutchatoumi@gmail.com';
$mailSubject = 'Nouveau message depuis le site ETB: ' . $subject;
$mailBody = "Nom: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ETB Website <no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
];

$sent = mail($to, $mailSubject, $mailBody, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Le serveur n a pas pu envoyer le message.',
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Message envoye avec succes.',
]);
