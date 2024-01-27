window.addEventListener('DOMContentLoaded', function () {
    var selectedImages = []; // Array to store selected images
    var storedData;
    // window.eventHandle = {
    //     fetchImageList: function () {
    //         var storedData = window.localStorage.getItem('imageData');

    //         // console.log(storedData);
    //         if (storedData) {
    //             var data = JSON.parse(storedData);
    //             data.forEach(function (image) {
    //                 loadImage(image);
    //             });
    //         } else {
    //             console.log('No image data found in localStorage');
    //         }
    //     }
    // };

    function loadImage(image) {
        var list = document.querySelector('.list');

        // if (imagesAll.length > 0) {
        //     imagesAll.forEach((e) => {
        //         e.remove();
        //     });
        // };

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

            if (selectedImages.length >= 1) {
                toggleActionMedia(true);
            } else {
                toggleActionMedia(false);
            }
        });
    };





    // Menu window media module
    let contentWrapper = document.querySelector(".content-wrapper");
    let imageSelectedBtn = document.querySelector(".action-media > .action > .image-selected");
    let inputRadioMenuAll = document.querySelectorAll(".radio-input");
    // console.log(inputRadioMenuAll);
    let mediaLibraryContent = document.querySelector(".media-library-content");

    var actionMediaElements = document.querySelectorAll('.action-media *');

    var countSelectedElement = document.querySelector(".count-selected");
    var quantityImagesElement = document.querySelector(".quantity-images");
    var cancelSelectedBtn = this.document.querySelector(".cancelSelectedBtn");
    var imagesAll = window.document.querySelectorAll(".list > .img-media");

    // Lắng nghe sự kiện nút input type files ở cửa sổ mới
    let inputElement = document.querySelector(".input-div > .input");

    let imageDeleteBtn = this.window.document.querySelector(".action-media > .action > .image-delete");

    if (inputElement) {
        inputElement.addEventListener("change", handleFileUpload);
    };

    var render = () => {
        storedData = window.localStorage.getItem('imageData');
        // console.log(storedData);

        // Nếu tồn tại thì xóa
        if (storedData) {
            window.localStorage.removeItem('imageData');
        }

        // Sau khi xóa xong thì tạo lại 
        fetch('/media-module/assets/php/get_images.php')
            .then(response => response.json())
            .then(data => {
                // Lưu dữ liệu vào localStorage
                localStorage.setItem('imageData', JSON.stringify(data));
                storedData = window.localStorage.getItem('imageData');
                var data = JSON.parse(storedData);
                destroyAllImagesElement();

                // Tạo hiệu ứng fade
                var fadeDuration = 500; // Thời gian fade (ms)
                var fadeDelay = 100; // Độ trễ giữa các hình ảnh fade (ms)
                var fadeIndex = 0; // Chỉ số hiện tại của hình ảnh fade

                function loadImageWithFade() {
                    if (fadeIndex < data.length) {
                        loadImage(data[fadeIndex]);
                        fadeIndex++;
                        setTimeout(loadImageWithFade, fadeDelay);
                    }
                }

                loadImageWithFade();
            })
            .catch(error => console.error('Error:', error));
    }

    function destroyAllImagesElement() {
        imagesAll = window.document.querySelectorAll(".list > .img-media");
        if (imagesAll.length > 0) {
            imagesAll.forEach((e) => {
                e.remove();
            })
        }
        // console.log(imagesAll.length);
    }

    // console.log(imageDeleteBtn);

    if (contentWrapper) {
        contentWrapper.children[0].classList.add("displayBlock");
        contentWrapper.children[0].classList.add("displayFlex");
    };

    if (inputRadioMenuAll) {
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

                    render();
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
    };


    // Lắng nghe sự kiện tải ảnh lên server
    function handleFileUpload(event) {
        const files = event.target.files; // Lấy danh sách các tệp đã chọn
        // console.log(files);

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
                    alert("Tải lên thành công");
                } else if (response.status >= 400 && response.status < 500) {
                    // Xử lý khi mã trạng thái là lỗi 400 - 499
                    alert("Ảnh đã tồn tại, lỗi yêu cầu không hợp lệ: " + response.status);
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


    if (imageDeleteBtn) {
        imageDeleteBtn.addEventListener("click", () => {
            console.log(selectedImages);

            // Gửi yêu cầu xóa từng ảnh
            selectedImages.forEach((image) => {
                deleteImage(image.src);
            });
            selectedImages = [];
        });
    }

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
                    render();
                    toggleActionMedia(false);
                } else {
                    // Xử lý trạng thái lỗi (status 500)
                    alert('Lỗi khi xóa ảnh');
                }
            })
            .catch(error => {
                console.error('Lỗi khi xóa ảnh:', error);
            });
    }

    if (imageSelectedBtn) {
        imageSelectedBtn.addEventListener("click", () => {
            if (selectedImages.length > 0) {
                console.log("Hình ảnh đã chọn: ", selectedImages);
                window.opener.postMessage(selectedImages, "*");
                cancelSelected();
            } else {
                this.alert("Vui lòng chọn hình ảnh");
            }
        });
    }

    if (cancelSelectedBtn) {
        cancelSelectedBtn.addEventListener("click", () => {
            cancelSelected();
        })
    }

    let cancelSelected = () => {
        imgMediaAll = document.querySelectorAll('.img-media');
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
        toggleActionMedia(false);
    };

    function toggleActionMedia(status) {
        if (status === true) {
            actionMediaElements.forEach(function (element) {
                toggleCountSelectedElement(true);

                element.style.display = 'block';
                if (element.tagName.toLowerCase() === 'img') {
                    element.style.width = '100%';
                    element.style.height = 'auto';
                    element.style.padding = '1px';
                }
            });
        } else if (status === false) {
            actionMediaElements.forEach(function (element) {
                element.style.display = 'none';
                // countSelectedElement.style.display = 'none';
                toggleCountSelectedElement(false);


            });
        }
    }

    function toggleCountSelectedElement(status) {
        if (status === true) {
            countSelectedElement.style.display = 'block';
            quantityImagesElement.textContent = selectedImages.length;
        } else if (status === false) {
            countSelectedElement.style.display = 'none';
        }
    }
    // Open a new window and call the fetchImageList function
    // newWindow = window.open('', '_blank');




    render();
});

