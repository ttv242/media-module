<?php
$data = json_decode(file_get_contents('php://input'), true);

$imageUrl = $data['imageUrl'];

function deleteImage($imageUrl)
{
    $imagePath = '../upload/' . basename($imageUrl);

    if (file_exists($imagePath)) {
        unlink($imagePath);
        return true;
    } else {
        return false;
    }
}

$result = deleteImage($imageUrl);

if ($result) {
    http_response_code(200); // Trạng thái thành công
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500); // Trạng thái lỗi máy chủ
    echo json_encode(['status' => 'error']);
}
?>