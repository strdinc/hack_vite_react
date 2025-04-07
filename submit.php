<?php
// Настройки подключения к базе данных
$host = 'localhost';
$dbname = 'u2963574_default';
$username = 'u2963574_default';
$password = 'db40y3FY0LYacFq0';

try {
    // Подключение к базе данных
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получение данных из формы
    $full_name = trim($_POST['full_name']);
    $institution = trim($_POST['institution']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $selected_track = $_POST['selected_track'] ?? 'none'; // Если не выбрано, значение по умолчанию
    $selected_command = $_POST['selected_command'] ?? 'none';
    $command_name = isset($_POST['command_name']) && !empty(trim($_POST['command_name']))
        ? trim($_POST['command_name'])
        : ($selected_command === 'no' ? 'no_command' : '');

    // Проверка обязательных полей
    if (empty($full_name) || empty($institution) || empty($phone) || empty($email)) {
        echo json_encode(['status' => 'error', 'message' => 'все поля должны быть заполнены.']);
        exit;
    }

    // SQL-запрос для вставки данных
    $stmt = $pdo->prepare("
        INSERT INTO form (
            full_name, institution, phone, email, selected_track, selected_command, command_name
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $full_name,
        $institution,
        $phone,
        $email,
        $selected_track,
        $selected_command,
        $command_name
    ]);

    // Возвращаем успешный ответ
    echo json_encode(['status' => 'success', 'message' => 'заявка успешно отправлена']);
    exit;
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'ошибка базы данных: ' . $e->getMessage()]);
    exit;
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'общая ошибка: ' . $e->getMessage()]);
    exit;
}
?>