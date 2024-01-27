window.addEventListener('DOMContentLoaded', function () {
    var selectBtn = document.querySelector('button[data-select-images="true"]');
    var newWindow; // Biến newWindow được khai báo ở mức độ phạm vi rộng




    selectBtn.addEventListener('click', function (event) {
        event.preventDefault();
        openNewWindow();
    });

    function openNewWindow() {
        var currentURL = window.location.href;
        var newURL = currentURL + "./index.html";
        var windowFeatures = "width=1800,height=1000";

        newWindow = window.open(newURL, '_blank', windowFeatures); // Gán giá trị cho biến newWindow

        // Fetch dữ liệu từ máy chủ
        // fetch('/media-module/assets/php/get_images.php')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Lưu dữ liệu vào localStorage
        //         localStorage.setItem('imageData', JSON.stringify(data));
        //         newWindow = window.open(newURL, '_blank', windowFeatures); // Gán giá trị cho biến newWindow

        //     })
        //     .catch(error => console.error('Error:', error));

        window.addEventListener('unload', function () {
            // Kiểm tra nếu newWindow không tồn tại, xóa dữ liệu trong localStorage
            if (!newWindow || newWindow.closed) {
                localStorage.removeItem('imageData');
            }
        });
    };

    window.addEventListener("message", (event) => {
        const receivedData = event.data;
        // console.log("Received data from child window:", receivedData);

        if (receivedData != null) {
            var imageNames = receivedData.map(function (image) {
                return image.name;
            });

            selectBtn.value = imageNames.join(", ");
            console.log(selectBtn.value);
        }
    });

});