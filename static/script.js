var video = document.getElementById('video');
var startbutton = document.getElementById('startbutton');
var camera_div = document.getElementById("camera_div")

//width and height of video square in the webpage
var WIDTH = null;
var HEIGHT = null; 

// true width and height of videocamera
var WIDTH_VID = null;
var HEIGHT_VID = null;
  
// width and height of whole webpage
var WIDTH_GLOBAL = window.innerWidth;
var HEIGHT_GLOBAL = window.innerHeight;
  
// side length of the bounding box square
var BOX_SIDE = null;

navigator.mediaDevices
  .getUserMedia({ video: {facingMode: 'environment'}, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.play();

  })
  .catch((err) => {
    console.error(`An error occurred: ${err}`);
  });
  
video.addEventListener("playing", () => {
	let w = camera_div.clientWidth;
	let h = camera_div.clientHeight;
	WIDTH_VID = video.videoWidth;
	HEIGHT_VID = video.videoHeight;
	set_video_dims(video,w,h);
	video.style.outline = "solid";
	video.style.objectFit = "fill";
	video.style.position = "absolute";
	set_boundbox_dims(camera_div);
  //check();
});


function set_video_dims(vid, w, h) {
	let ratio = WIDTH_VID/HEIGHT_VID;
	let m = Math.min(w, h);
	let M = Math.max(w, h);
	if (M / (ratio)<= m) {
		m = M / (ratio);
	}
	HEIGHT = m;
	WIDTH = m * ratio;
	vid.style.height = HEIGHT;
	vid.style.width = WIDTH;
	vid.style.left = (WIDTH_GLOBAL - WIDTH)/2;
}

function set_boundbox_dims(par) {
	let boundbox = document.createElement("div");
  BOX_SIDE = Math.min(HEIGHT, WIDTH) * 0.8;
	boundbox.style.outline = "5px dashed green";
  
	boundbox.style.width = BOX_SIDE;
	boundbox.style.height = BOX_SIDE;
	boundbox.style.position = "absolute";
	boundbox.style.left = (WIDTH_GLOBAL - BOX_SIDE)/2;
	boundbox.style.top = (HEIGHT - BOX_SIDE)/2;
	par.appendChild(boundbox);
}

// function check() {
//   let c = document.createElement("div");
//   c.innerHTML = "WIDTH =" + WIDTH + "\nHEIGHT =" + HEIGHT + "\nWIDTH_VID =" + WIDTH_VID + "\nHEIGHT_VID =" + HEIGHT_VID + "WIDTH_GLOBAL =" + WIDTH_GLOBAL + "\nHEIGHT_GLOBAL =" + HEIGHT_GLOBAL;
//   document.body.appendChild(c);
  
// }


  
  
startbutton.addEventListener(
  "click",
  (ev) => {
    takepicture();
    ev.preventDefault();
  },
  false
);

function takepicture_and_choose() {

	let output_div = document.createElement("div");
	output_div.style.textAlign = "center";

	let top_rel = (HEIGHT - BOX_SIDE)/2;
	let left_rel = (WIDTH - BOX_SIDE)/2;
	let similarity = HEIGHT_VID / HEIGHT;
	let sx = left_rel * similarity;
	let sy = top_rel * similarity;
	let true_dim = similarity * BOX_SIDE;

	let canvas = document.createElement("canvas");
	canvas.style.textAlign = "center";
	canvas.width = BOX_SIDE;
	canvas.height = BOX_SIDE;

	let context = canvas.getContext("2d");

	camera_div.remove();
	startbutton.remove();
	context.drawImage(video, sx, sy, true_dim, true_dim,0,0,BOX_SIDE,BOX_SIDE);	
	output_div.appendChild(canvas);
	document.body.appendChild(output_div);
	
	// insert yes or no buttons with listeners
	let new_div = document.createElement("div");
	new_div.style.textAlign = "center";
	new_div.style.margin = "auto";
	let yes = document.createElement("button");
	yes.innerHTML = "Accept";
	yes.addEventListener("click", () => {});
	let no = document.createElement("button");
	no.innerHTML = "Reject";
	no.addEventListener("click", () => {location.reload();});
	new_div.appendChild(yes);
	new_div.appendChild(no);
	document.body.appendChild(new_div);

}
  
async function getText() {
  fetch('/upload', {
        method : 'POST',
        body : JSON.stringify( {
            'name' : 'Rahul Kumar',
            'country' : 'India'
        })
  })
  .then(function(response) {console.log(response)})
  .catch(function(error) {
        console.log(error);
    });
}

function takepicture() {
  let top_rel = (HEIGHT - BOX_SIDE)/2;
	let left_rel = (WIDTH - BOX_SIDE)/2;
	let similarity = HEIGHT_VID / HEIGHT;
	let sx = left_rel * similarity;
	let sy = top_rel * similarity;
	let true_dim = similarity * BOX_SIDE;

	let canvas = document.createElement("canvas");
	canvas.style.textAlign = "center";
	canvas.width = BOX_SIDE;
	canvas.height = BOX_SIDE;

	let context = canvas.getContext("2d");

	camera_div.remove();
	startbutton.remove();
	context.drawImage(video, sx, sy, true_dim, true_dim,0,0,BOX_SIDE,BOX_SIDE);	
  data = canvas.toDataURL();
  console.log(data);
  send_pic(data);
}
  
function send_pic(data) {
  fetch('/upload', {
        method : 'POST',
        body : JSON.stringify( {
            img : data
        })
  })
  .then(function (response) {return response.text()})
  .then(function (text) {
  	new_div = document.createElement("div");
	new_div.innerHTML = text;
	document.body.appendChild(new_div);
	return none
  }) 
  .catch(function(error) {
        console.log(error);
    });
}
