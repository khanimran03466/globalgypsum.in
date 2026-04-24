<?php
/**
 * Global Gypsum SMTP Configuration
 */

// SMTP Server Details
define('SMTP_HOST', 'smtp.example.com');     // e.g., smtp.gmail.com
define('SMTP_USER', 'your-email@example.com');
define('SMTP_PASS', 'your-app-password');
define('SMTP_SECURE', 'tls');                // 'tls' or 'ssl'
define('SMTP_PORT', 587);                    // 587 for tls, 465 for ssl

// Mail Routing
define('MAIL_TO', 'info@globalgypsum.in');   // Destination for contact form submissions
define('MAIL_FROM', 'no-reply@globalgypsum.in');
define('MAIL_FROM_NAME', 'Global Gypsum Website');
