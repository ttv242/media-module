window.addEventListener('DOMContentLoaded', function () {


    // Menu window media module
    let contentWrapper = document.querySelector(".content-wrapper");
    contentWrapper.children[0].classList.add("displayBlock");
    contentWrapper.children[0].classList.add("displayFlex");

    let inputRadioMenuAll = document.querySelectorAll(".radio-input");
    // console.log(inputRadioMenuAll);
    let mediaLibraryContent = document.querySelector(".media-library-content");

    inputRadioMenuAll.forEach((radio, index) => {
        radio.addEventListener('click', (e) => {
            // this.window.console.log(contentWrapper.children[index])
            if (e.target.checked && index === 0) {
                contentWrapper.children[index].classList.add("displayBlock");
                contentWrapper.children[index].classList.add("displayFlex");

                contentWrapper.children[index + 1].classList.remove("displayBlock");
                contentWrapper.children[index + 1].classList.remove("displayFlex");

                contentWrapper.children[index + 2].classList.remove("displayBlock");
                contentWrapper.children[index + 2].classList.remove("displayFlex");
            } else if (e.target.checked && index === 1) {
                contentWrapper.children[index].classList.add("displayBlock");
                contentWrapper.children[index].classList.add("displayFlex");

                contentWrapper.children[index - 1].classList.remove("displayBlock");
                contentWrapper.children[index - 1].classList.remove("displayFlex");

                contentWrapper.children[index + 1].classList.remove("displayBlock");
                contentWrapper.children[index + 1].classList.remove("displayFlex");
            } else if (e.target.checked && index === 2) {
                contentWrapper.children[index].classList.remove("displayBlock");
                contentWrapper.children[index].classList.remove("displayFlex");

                contentWrapper.children[index - 1].classList.remove("displayBlock");
                contentWrapper.children[index - 1].classList.remove("displayFlex");

                contentWrapper.children[index - 2].classList.remove("displayBlock");
                contentWrapper.children[index - 2].classList.remove("displayFlex");
            }
        });
    });

    // Lắng nghe sự kiện tải ảnh lên server
    function handleFileUpload(event) {
        const files = event.target.files; // Lấy danh sách các tệp đã chọn
        console.log(files);

        // Tạo một đối tượng FormData mới
        const formData = new FormData();

        // Xử lý từng tệp đã chọn
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log("File Name:", file.name);
            console.log("File Type:", file.type);
            console.log("File Size:", file.size, "bytes");

            // Thêm tệp vào FormData với tên "file[]"
            formData.append("file[]", file);
        }

        // Gửi yêu cầu POST tới máy chủ với dạng dữ liệu multipart/form-data
        fetch("/media-module/assets/php/upload.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // Xử lý khi mã trạng thái là 200 OK
                    alert("Tải lên thành công, đóng tab và reload lại trang");
                } else if (response.status >= 400 && response.status < 500) {
                    // Xử lý khi mã trạng thái là lỗi 400 - 499
                    alert("Lỗi yêu cầu không hợp lệ: " + response.status);
                    throw new Error("Bad request");
                } else if (response.status >= 500 && response.status < 600) {
                    // Xử lý khi mã trạng thái là lỗi 500 - 599
                    alert("Lỗi máy chủ: " + response.status);
                    throw new Error("Server error");
                } else {
                    // Xử lý khi mã trạng thái không thuộc 400 - 499 hoặc 500 - 599
                    throw new Error("Unknown error");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                // Xử lý lỗi nếu cần
            });
    }


    // Lắng nghe sự kiện nút input type files ở cửa sổ mới
    const inputElement = document.querySelector(".input-div > .input");
    inputElement.addEventListener("change", handleFileUpload);

    let imageDeleteBtn = this.window.document.querySelector(".action-media > .action > .image-delete");
    // console.log(imageDeleteBtn);
    imageDeleteBtn.addEventListener("click", () => {
        console.log(selectedImages);

        // Gửi yêu cầu xóa từng ảnh
        selectedImages.forEach((image) => {
            deleteImage(image.src);
        });
        selectedImages = [];
    });


    // Lắng nghe sự kiên xóa ảnh 
    function deleteImage(imageSrc) {
        // Gửi yêu cầu xóa ảnh đến máy chủ
        fetch('/media-module/assets/php/delete_image.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageUrl: imageSrc })
        })
            .then(response => {
                if (response.ok) {

                    var imagesAll = this.window.document.querySelectorAll(".list > img");
                    imagesAll.forEach((e) => {
                        // console.log(e.src);
                        if (imageSrc === e.src) {
                            // console.log(e.src);
                            e.remove();

                        }
                    });

                    // Xử lý trạng thái thành công (status 200)
                    // alert('Ảnh đã được xóa thành công');
                } else {
                    // Xử lý trạng thái lỗi (status 500)
                    alert('Lỗi khi xóa ảnh');
                }
            })
            .catch(error => {
                console.error('Lỗi khi xóa ảnh:', error);
            });
    }


    let imageSelectedBtn = document.querySelector(".action-media > .action > .image-selected");
    imageSelectedBtn.addEventListener("click", () => {
        if (selectedImages.length > 0) {
            console.log("Hình ảnh đã chọn: ", selectedImages);
            window.opener.postMessage(selectedImages, "*");
            cancelSelected();
        } else {
            this.alert("Vui lòng chọn hình ảnh");
        }
    });



    var selectedImages = []; // Array to store selected images
    window.eventHandle = {
        fetchImageList: function () {
            var storedData = localStorage.getItem('imageData');

            // console.log(storedData);
            if (storedData) {
                var data = JSON.parse(storedData);
                data.forEach(function (image) {
                    loadImage(image);
                });
            } else {
                console.log('No image data found in localStorage');
            }
        }
    };

    var countSelectedElement = document.querySelector(".count-selected");
    var quantityImagesElement = document.querySelector(".quantity-images");
    var cancelSelectedBtn = this.document.querySelector(".cancelSelectedBtn");
    cancelSelectedBtn.addEventListener("click", () => {
        cancelSelected();
    })

    const cancelSelected = () => {
        // cancelSelectedBtn.addEventListener("click", () => {
        var imgMediaAll = document.querySelectorAll('.img-media');
        // console.log(imgMediaAll);
        imgMediaAll.forEach((e) => {
            selectedImages.forEach((v) => {
                if (e.src == v.src) {
                    // console.log(v.src);
                    e.classList.remove('img-selected');
                };
            });
        });

        selectedImages = [];
        countSelectedElement.style.display = 'none';
    };
    // };

    function loadImage(image) {
        var list = document.querySelector('.list');
        var imageElement = document.createElement('img');
        imageElement.crossOrigin = 'anonymous';
        imageElement.src = image.url;
        imageElement.className = "img-media";
        imageElement.dataset.name = image.name;
        imageElement.dataset.width = image.width;
        imageElement.dataset.height = image.height;
        imageElement.dataset.mime = image.mime;
        imageElement.dataset.size = image.size;
        list.appendChild(imageElement);

        // Click event handler for the created image
        imageElement.addEventListener('click', function (e) {
            var imageReview = document.querySelector(".image-review img");
            var imageName = document.querySelector(".image-name");
            var imageWH = document.querySelector(".image-wh");
            var imageMime = document.querySelector(".image-mime");
            var imageSize = document.querySelector(".image-size");
            imageReview.src = e.target.src;
            imageName.innerHTML = e.target.dataset.name;
            imageWH.innerHTML = e.target.dataset.width + ' by ' + e.target.dataset.height + ' pixels';
            imageMime.innerHTML = e.target.dataset.mime;
            imageSize.innerHTML = (e.target.dataset.size / 1024).toFixed(2) + ' KB';

            // Check if the image has been selected before
            var index = selectedImages.findIndex(function (item) {
                return item.src === e.target.src;
            });

            if (index === -1) {
                // Add the image to the selectedImages array if it doesn't exist
                selectedImages.push({
                    src: e.target.src,
                    name: e.target.dataset.name,
                    width: e.target.dataset.width,
                    height: e.target.dataset.height,
                    mime: e.target.dataset.mime,
                    size: e.target.dataset.size
                });
                e.target.classList.add('img-selected');
            } else {
                // Remove the image from the selectedImages array if it already exists
                selectedImages.splice(index, 1);
                e.target.classList.remove('img-selected');
            }

            // console.log("Selected Images:", selectedImages);

            var actionMediaElements = document.querySelectorAll('.action-media *');
            if (selectedImages.length >= 1) {
                actionMediaElements.forEach(function (element) {
                    countSelectedElement.style.display = 'block';
                    quantityImagesElement.textContent = selectedImages.length;

                    element.style.display = 'block';
                    if (element.tagName.toLowerCase() === 'img') {
                        element.style.width = '100%';
                        element.style.height = 'auto';
                        element.style.padding = '1px';
                    }
                });
            } else {
                actionMediaElements.forEach(function (element) {
                    element.style.display = 'none';
                    countSelectedElement.style.display = 'none';

                });
            }
        });
    };

    // Open a new window and call the fetchImageList function
    newWindow = window.open('', '_blank');
    window.eventHandle.fetchImageList();
});
