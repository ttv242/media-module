<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>



  <div id="container" class="container">
    <div class="wrapper">
      <form action="./server.php" method="POST" class="form">
        <label for=""> Hình ảnh
          <button type="text" class="uploadImage" data-select-images='true'> Chọn tệp
            <input type="hidden" value name="files">
          </button>
        </label>
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>

  <script src="./assets/js/main.js"></script>
  <!-- <script src="./assets/js/handleEvent.js"></script> -->
</body>

</html>