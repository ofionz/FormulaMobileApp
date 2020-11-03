export function write (path, data) {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    fs.root.getFile(path, { create: true, exclusive: false }, function (fileEntry) {
      //var sample = new Blob(['some file data'], { type: 'text/plain' }); this works too or you can just use ['some file data'] like below

      fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwrite = function() {
          alert("Successful file write...");
        };

        fileWriter.onerror = function (e) {
          alert("Failed file write: " + e.toString());
        };

        fileWriter.write(data);
      });

    }, function() {alert('onErrorCreateFile')});

  }, function() {alert('onErrorLoadFs')});
}

export function read(path) {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    fs.root.getFile(path, { create: true, exclusive: false }, function (fileEntry) {
      //var sample = new Blob(['some file data'], { type: 'text/plain' }); this works too or you can just use ['some file data'] like below
      fileEntry.file(function (file) {
        const reader = new FileReader();
        reader.onload = function() {
          alert("Successful file read: " + this.result);
        };

        reader.readAsText(file);

      }, function() {alert('onErrorReadFile')});


    }, function() {alert('onErrorCreateFile')});

  }, function() {alert('onErrorLoadFs')});
}