var video = document.createElement('video');
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = '200px';
video.style.height = '200px';

/* Setting up the constraint */
var facingMode = "environment"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
var constraints = {
  audio: false,
  video: {
   facingMode: facingMode
  }
};

/* Stream it to video element */
navigator.mediaDevices.getUserMedia(constraints)
  .then(gotMedia)
  .catch(error => console.error('getUserMedia() error:', error));


function gotMedia(mediaStream) {
  const mediaStreamTrack = mediaStream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamTrack);

  const img = document.querySelector('img');

  const loop = () => {
    imageCapture.takePhoto()
      .then(blob => {
        img.src = URL.createObjectURL(blob);
        img.onload = () => { URL.revokeObjectURL(this.src); }
        const data = new FormData();
        data.append('image', blob)

        return axios({
          method: 'post',
          url: 'http://0.0.0.0:5000/ocr',
          data: data, 
          headers: {
            'Content-Type': 'multipart/form-data; boundary='+data._boundary,
          }
        })

        //fetch('http://0.0.0.0:5000/ocr', {method:'POST', body: data})
      })
      .then((response) => {
        // aqui deveremos receber a imagem tratada e o ocr
        console.log(response)
      })
      .catch(error => console.error('takePhoto() error:', error))
      .finally(()=> {
        loop()
      })
    ;
  }
  loop()

}



