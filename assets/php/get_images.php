<?php
$directory = '../upload'; // Thay đổi đường dẫn này thành đường dẫn thư mục chứa các tệp tin hình ảnh của bạn

// Lấy danh sách các tệp tin trong thư mục
$files = scandir($directory);

// Lọc ra chỉ các tệp tin hình ảnh
$imageFiles = array_filter($files, function($file) {
    $extension = pathinfo($file, PATHINFO_EXTENSION);
    $imageExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Các phần mở rộng tệp tin hình ảnh hợp lệ
    return in_array($extension, $imageExtensions);
});

// Mảng chứa thông tin chi tiết về tệp tin hình ảnh
$imageDetails = [];

foreach ($imageFiles as $imageFile) {
    $filePath = $directory . '/' . $imageFile;
    $imageInfo = getimagesize($filePath);
    $filePathUrl = str_replace('..', '/media-module/assets',htmlspecialchars($filePath));

    // var_dump($filePathUrl);
    $imageDetails[] = [
        'url' => htmlspecialchars($filePathUrl),
        'name' => htmlspecialchars($imageFile),
        'width' => $imageInfo[0],
        'height' => $imageInfo[1],
        'mime' => htmlspecialchars($imageInfo['mime']),
        'size' => filesize($filePath)
    ];
}

// Chuyển đổi thành chuỗi JSON
$jsonResult = json_encode($imageDetails, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

// Trả về chuỗi JSON
header('Content-Type: application/json');
echo $jsonResult;
?>