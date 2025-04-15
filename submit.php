<?php
header('Content-Type: application/json');

// Настройки подключения к базе данных
$db_host = 'localhost';
$db_name = 'u2963574_default';
$db_user = 'u2963574_default';
$db_pass = 'db40y3FY0LYacFq0';

// Настройки FTP
$ftp_host = '37.140.192.226';
$ftp_user = 'u2963574';
$ftp_pass = '39kQ7hTwVARNxnb3';
$ftp_dir = '/upload_files/';

try {
    // Проверка обязательных полей
    $required = ['full_name', 'birthday', 'institution', 'phone', 'email', 'selected_track', 'selected_command'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Все обязательные поля должны быть заполнены");
        }
    }

    // Проверка трека и команды
    if ($_POST['selected_track'] === 'none') {
        throw new Exception("Не выбран трек");
    }

    if ($_POST['selected_command'] === 'none') {
        throw new Exception("Не указано наличие команды");
    }

    if ($_POST['selected_command'] === 'yes' && empty(trim($_POST['command_name']))) {
        throw new Exception("Не указано название команды");
    }

    // Валидация и преобразование даты рождения
    if (!preg_match('/^\d{2}\.\d{2}\.\d{4}$/', $_POST['birthday'])) {
        throw new Exception("Неверный формат даты рождения");
    }

    $birthday = DateTime::createFromFormat('d.m.Y', $_POST['birthday']);
    if (!$birthday) {
        throw new Exception("Некорректная дата рождения");
    }
    $birthday_db = $birthday->format('Y-m-d');

    // Проверка возраста
    $today = new DateTime();
    $age = $today->diff($birthday)->y;
    $is_minor = $age < 18;

    // Обработка файла согласия
    $consent_path = null;
    if ($is_minor) {
        if (!isset($_FILES['consent_file']) || $_FILES['consent_file']['error'] !== UPLOAD_ERR_OK) {
            throw new Exception("Для участников младше 18 лет необходимо загрузить согласие");
        }

        $file = $_FILES['consent_file'];
        $allowed_types = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/png',
            'image/jpeg'
        ];

        if (!in_array($file['type'], $allowed_types)) {
            throw new Exception("Неподдерживаемый формат файла. Разрешены: PDF, Word, PNG, JPEG");
        }

        // Генерация имени файла
        $fullName = trim($_POST['full_name']);
        $translit = [
            'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo', 'ж' => 'zh',
            'з' => 'z', 'и' => 'i', 'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o',
            'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts',
            'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu',
            'я' => 'ya'
        ];

        $latinName = mb_strtolower($fullName);
        $latinName = strtr($latinName, $translit);
        $latinName = preg_replace('/[^a-z0-9]/', '_', $latinName);
        $hash = bin2hex(random_bytes(4));
        $file_ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $file_name = $latinName . '_' . $hash . '.' . $file_ext;

        // Подключение к FTP и загрузка файла
        $ftp_conn = ftp_connect($ftp_host) or throw new Exception("Не удалось подключиться к FTP");
        ftp_login($ftp_conn, $ftp_user, $ftp_pass) or throw new Exception("Ошибка авторизации FTP");
        ftp_pasv($ftp_conn, true);

        $remote_path = $ftp_dir . $file_name;

        if (!ftp_put($ftp_conn, $remote_path, $file['tmp_name'], FTP_BINARY)) {
            ftp_close($ftp_conn);
            throw new Exception("Ошибка загрузки файла на сервер");
        }

        ftp_close($ftp_conn);
        $consent_path = $remote_path;
    }

    // Подключение к базе данных
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL-запрос
    $stmt = $pdo->prepare("
        INSERT INTO form (
            full_name, birthday, institution, phone, email,
            selected_track, selected_command, command_name,
            consent_file_path, is_minor, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    $stmt->execute([
        trim($_POST['full_name']),
        $birthday_db,
        trim($_POST['institution']),
        trim($_POST['phone']),
        trim($_POST['email']),
        $_POST['selected_track'],
        $_POST['selected_command'],
        $_POST['selected_command'] === 'yes' ? trim($_POST['command_name']) : 'no_command',
        $consent_path,
        $is_minor ? 1 : 0
    ]);

    echo json_encode(['status' => 'success', 'message' => 'форма успешно отправлена']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>