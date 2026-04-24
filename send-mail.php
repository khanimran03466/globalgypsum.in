<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ./contact.html');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $subject === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ./contact.html?status=error');
    exit;
}

$configPath = __DIR__ . '/mail-config.php';
if (!file_exists($configPath)) {
    header('Location: ./contact.html?status=error');
    exit;
}

require_once $configPath;

$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    // PHPMailer not installed via composer, try manual include if needed or error
    header('Location: ./contact.html?status=no-phpmailer');
    exit;
}

require $autoloadPath;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = (int) SMTP_PORT;

    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO); 
    $mail->addReplyTo($email, $name);
    
    $mail->isHTML(true);
    $mail->Subject = '[Website Contact] ' . $subject;
    $mail->Body = '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>'
        . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
        . '<p><strong>Message:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>';
    $mail->AltBody = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";
    $mail->send();

    header('Location: ./contact.html?status=success');
    exit;
} catch (Exception $exception) {
    // Log error if needed: $exception->getMessage()
    header('Location: ./contact.html?status=error');
    exit;
}
?>
