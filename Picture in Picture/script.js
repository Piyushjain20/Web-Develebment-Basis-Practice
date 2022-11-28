const videoElement = document.getElementById("video");
const btn = document.getElementById("btn");
async function selectAndStartMediaStream() {
  try {
    let captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    videoElement.srcObject = captureStream;
    videoElement.onloadeddata = () => {
      videoElement.play();
      videoElement.requestPictureInPicture();
    };
  } catch (error) {
    alert(error);
  }
}
function stopMediaStream() {
  let tracks = videoElement.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  videoElement.srcObject = null;
}
async function toggleStream() {
  if (videoElement.srcObject !== null) {
    if (document.pictureInPictureElement) document.exitPictureInPicture();
    stopMediaStream();
    btn.textContent = "START";
  } else {
    await selectAndStartMediaStream();
    btn.textContent = "STOP";
  }
}

btn.addEventListener("click", async () => {
  toggleStream();
});
