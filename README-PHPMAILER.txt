PHPMailer setup steps
=====================

1) Install Composer on the server or local machine.
2) Open terminal in this folder and run:
   composer require phpmailer/phpmailer

3) Copy mail config:
   - Copy mail-config.php.example to mail-config.php
   - Fill real SMTP credentials in mail-config.php

4) Run this site with PHP server:
   php -S localhost:8000

5) Open:
   http://localhost:8000/contact.php

The form posts to send-mail.php and sends mail using PHPMailer SMTP.
