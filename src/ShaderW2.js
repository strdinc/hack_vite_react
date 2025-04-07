// Three JS
//--------------------------------------------------------------------
var scene, camera, renderer, container;
var _width, _height;
var userDataGUI;
var _ambientLights, _lights;
var mousePointerX, mousePointerY;
var geoetry_space = 100;
//---
var _c = 1439; // Amount
var _s = 3;   // Shape
var _a = 1;   // Radio
//---

var Options = {
  cam: {
    zoom: 450
  },
  sphere: {
    vel: 0.5,
    segm: _s,
    size: _a,
    cant: _c,
    distance: 50,
    theta: 0.0138,
    angle: 0.083,
    phi: 18
  }
}
//---

var _groupItem = new THREE.Group();
window.addEventListener('load', init, false);
function init() {
  createGUI();
  createWorld();
  createLights();
  //createGrid();
  createPrimitive();
  createMousePointer();
  createCircles();
  //---
  animation();
}


var Theme = {
  primary: 0xFFFFFF,
  secundary: 0x0000FF,
  danger: 0xFF0000,
  darker: 0x111111,
  sphereColor1: 0x00A3EA, // Новый цвет 1
  sphereColor2: 0xFF39A4  // Новый цвет 2
};

function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;
  //---
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(Theme.darker, 400, 700);
  scene.background = new THREE.Color(Theme.darker);
  //---
  camera = new THREE.PerspectiveCamera(35, _width/_height, 1, 5000);
  camera.position.set(0,0,1000);
  //---
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  //---
  document.body.appendChild(renderer.domElement);
  //---
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
  console.log('- resize -');
}
//--------------------------------------------------------------------
function createLights() {
  //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
  _ambientLights = new THREE.HemisphereLight(Theme.primary, Theme.secundary, 2);
  _lights = new THREE.PointLight(Theme.primary, 1);
  _lights.position.set(1000,1000,-500);
  scene.add(_lights);
  scene.add(_ambientLights);
}

function createMousePointer() {
  var starsGeometry = new THREE.Geometry();
  for ( var i = 0; i < 1000; i ++ ) {
    var star = new THREE.Vector3();
    var distance = 2;
    var theta = THREE.Math.randFloatSpread(90);
    var phi = THREE.Math.randFloatSpread(90);
    //---
    star.x = distance * Math.sin(theta) * Math.cos(phi);
    star.y = distance * Math.sin(theta) * Math.sin(phi);
    star.z = distance * Math.cos(theta);
    starsGeometry.computeBoundingSphere();
    //starsGeometry.normalize();
    starsGeometry.vertices.push( star );
    //---
  }
  var starsMaterial = new THREE.PointsMaterial( { color: 0xFFFFFF } );
  var starField = new THREE.Points( starsGeometry, starsMaterial );
  //_primitive.mesh.add( starField );
}

function createCircles() {
  // Очистка предыдущих объектов
  for (var i = _groupItem.children.length - 1; i >= 0; i--) {
    _groupItem.remove(_groupItem.children[i]);
  }

  // Геометрия круга
  var geometry = new THREE.CircleBufferGeometry(_a, _s);

  // Материалы для двух цветов
  var material1 = new THREE.MeshStandardMaterial({
    color: 0x00A3EA, // Первый цвет
    side: THREE.DoubleSide,
    wireframe: false
  });

  var material2 = new THREE.MeshStandardMaterial({
    color: 0xFF39A4, // Второй цвет
    side: THREE.DoubleSide,
    wireframe: false
  });

  // Создание объектов
  var distance = Options.sphere.distance;
  for (var i = 0; i < _c; i++) {
    var circle = new THREE.Mesh(geometry, i % 2 === 0 ? material1 : material2); // Чередование цветов
    var theta = (i * (360 / 26));
    var phi = i / 26;

    // Позиционирование объектов
    circle.position.x = distance * Math.sin(theta + i) * Math.cos(phi);
    circle.position.y = distance * Math.sin(theta + i) * Math.sin(phi);
    circle.position.z = distance * Math.cos(theta + i);

    // Добавление объекта в группу
    _groupItem.add(circle);
  }

  // Добавление группы в сцену
  scene.add(_groupItem);
}

//--------------------------------------------------------------------


function createGUI() {
  var gui = new dat.GUI();
  //gui.close();

  var cameraGUI = gui.addFolder('Camera');
  var setupGUI = gui.addFolder('Setup');
  var sphereGUI = gui.addFolder('Sphere');

  cameraGUI.add(Options.cam, 'zoom', 0, 500);
  setupGUI.add(Options.sphere, 'segm', 3, 7).step(1).name('Shape').onChange(function(argument) {
    //---
    _s = argument;
    createCircles();
    //---
  });
  setupGUI.add(Options.sphere, 'cant', 100, 2000).name('Amount').onChange(function(newValue) {
    //---
    _c = newValue;
    createCircles();
    //---
  });
  setupGUI.add(Options.sphere, 'size', 1, 10).step(1).name('Size').onChange(function(newValue) {
    //---
    _a = newValue;
    createCircles();
    //---
  });

  sphereGUI.add(Options.sphere, 'vel', 0.1, 1.0).name('Speed');
  sphereGUI.add(Options.sphere, 'distance', 10, 100).name('Radius').step(1);
  //sphereGUI.add(Options.sphere, 'theta', 0.01, 0.1).name('Theta');
  sphereGUI.add(Options.sphere, 'angle', 0.01, 0.1).name('Angle');
  sphereGUI.add(Options.sphere, 'phi', 1, 20).name('PI');

  sphereGUI.open();
  setupGUI.close();

}

function createBGColor() {
  renderer.setClearColor(new THREE.Color(Options.color.bgcolor));
}
//--------------------------------------------------------------------
var primitiveElement = function() {
  this.mesh = new THREE.Object3D();
  var geo = new THREE.IcosahedronGeometry(0.7, 4);
  var mat = new THREE.MeshPhongMaterial({color:Theme.primary, flatShading:false, wireframe:false});
  var matl = new THREE.MeshPhysicalMaterial({color:Theme.primary, flatShading:true});
  var mesh = new THREE.Mesh(geo, mat);
  var line = new THREE.Line(geo, matl);
  //---
  this.mesh.add(mesh);
  //this.mesh.add(line);
}
var _primitive;
function createPrimitive() {
  _primitive = new primitiveElement();
  _primitive.mesh.scale.set(100, 100, 100);
  scene.add(_primitive.mesh);

  // Установка начального цвета сферы
  updateSphereColor(Theme.sphereColor1); // Используем первый цвет по умолчанию
}

// Функция для обновления цвета сферы
function updateSphereColor(color) {
  _primitive.mesh.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      child.material.color.set(color);
    }
  });
}
//--------------------------------------------------------------------
function animation() {
  var time = Date.now() / 100000;
  _primitive.mesh.rotation.y += 0.001;
  _groupItem.rotation.y = _primitive.mesh.rotation.y;
  _groupItem.rotation.x = _primitive.mesh.rotation.y;
  _groupItem.rotation.z = _primitive.mesh.rotation.y;
  //---

  //--- THREE.Math.randFloatSpread(90)
  var d = (Options.sphere.distance * 5);
  var t = Math.sin(Options.sphere.theta) * 100;
  var a = ((Options.sphere.vel * 10) + time) + Math.sin((Math.cos(Options.sphere.angle) * 90)) * 15;
  var p = Math.cos(Options.sphere.phi) * 45;
  //---
  var f = 2;
  var r = THREE.Math.randFloatSpread(360);
  //---
  TweenMax.to(camera.position, 1, {z:-Options.cam.zoom + 1000});
  TweenMax.to(_primitive.mesh.scale, 1, {
    x:d / f,
    y:d / f,
    z:d / f
  })
  //---
  for (var i = 0, l = _groupItem.children.length; i<l; i++) {
    var _particle = _groupItem.children[i];
    var theta = ((i + 1)*(a / t)) * Math.PI / 180;
    var phi = (i + 1) / p;
    //---
    _particle.position.x = d * Math.sin(theta + i) * Math.cos(phi);
    _particle.position.y = d * Math.sin(theta + i) * Math.sin(phi);
    _particle.position.z = d * Math.cos(theta + i);

    _particle.lookAt(scene.position);
  }
  //---
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
}
