<?php
$targetDir = "../upload/"; // Đường dẫn thư mục đích
$uploadedFiles = reArrayFiles($_FILES["file"]); // Chuyển đổi mảng tệp tin

// Hàm chuyển đổi mảng tệp tin
function reArrayFiles($fileArray)
{
    $fileArrayReArranged = array();

    if (isset($fileArray['name']) && is_array($fileArray['name'])) {
        $fileCount = count($fileArray['name']);
        $fileKeys = array_keys($fileArray);

        for ($i = 0; $i < $fileCount; $i++) {
            foreach ($fileKeys as $key) {
                $fileArrayReArranged[$i][$key] = $fileArray[$key][$i];
            }
        }
    }

    return $fileArrayReArranged;
}

// Kiểm tra xem có tệp tin nào được tải lên không
if (!empty($uploadedFiles)) {
    // Lặp qua từng tệp tin đã tải lên
    foreach ($uploadedFiles as $file) {
        $fileName = $file['name']; // Tên tệp tin
        $fileName = str_replace(' ', '_', $fileName); // Thay thế khoảng trắng bằng dấu gạch dưới
        $fileTmpName = $file['tmp_name']; // Đường dẫn tạm thời của tệp tin
        $targetFile = $targetDir . basename($fileName); // Đường dẫn tệp tin đích

        // Kiểm tra xem tệp tin đã tồn tại hay chưa
        if (file_exists($targetFile)) {
            http_response_code(400); // Bad Request
            echo "Tệp tin $fileName đã tồn tại.";
            exit;
        } else {
            // Di chuyển tệp tin tải lên vào thư mục đích
            if (move_uploaded_file($fileTmpName, $targetFile)) {
                http_response_code(200); // OK
                echo "Tải lên thành công: $fileName";
            } else {
                http_response_code(500); // Internal Server Error
                echo "Đã xảy ra lỗi khi tải lên $fileName.";
                exit;
            }
        }
    }
} else {
    http_response_code(400); // Bad Request
    echo "Không có tệp tin nào được tải lên.";
}
?>