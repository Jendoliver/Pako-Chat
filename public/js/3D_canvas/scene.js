var camera, scene, renderer;
var planeGeometry;
var audio;

var size_plane_x = 20;
var size_plane_z = 20;

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.1, 1000);
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 13;
	camera.lookAt(scene.position);
}

function createPlane() {
	planeGeometry = new THREE.PlaneGeometry(size_plane_x, size_plane_z);
	var planeMaterial = new THREE.MeshLambertMaterial({
		color: 0xcccccc
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x = -Math.PI / 2;

	scene.add(plane);
}

function createLight() {
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(10, 20, 20);
	spotLight.shadowCameraNear = 20;
	spotLight.shadowCameraFar = 50;
	spotLight.castShadow = true;
	scene.add(spotLight);
}

function createRenderer() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});

	console.log('HEIGHT ', document.getElementById('mid_column_game').offsetHeight, 'Width ', document.getElementById('mid_column_game').offsetWidth)
	renderer.setSize(750, 422);
	renderer.shadowMap.enabled = true;
	//document.body.appendChild(renderer.domElement);
	//document.querySelector("#3d_canvas").appendChild(renderer.domElement);
	document.getElementById("mid_column_game").appendChild(renderer.domElement);
}

function init() {
	createCamera();
	createPlane();
	createLight();
	createRenderer();
}

function animate() {
	my_car.render();
	my_car.turn();
	my_car.update();
	my_car.margin();
	my_car.audioo();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}



var my_car = new Car();
motor_powerON = new Audio('/assets/sound/motor.mp3');
motor_powerOFF = new Audio('/assets/sound/motor2.mp3');
scene = new THREE.Scene();

init();
animate();