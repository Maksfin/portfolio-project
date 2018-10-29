const web = (function() {
  return {
    init: function() {
      var container;
      var camera, scene, renderer;
      var uniforms;
      var mouse = {x:0, y:0};
      var loader = new THREE.TextureLoader();

      init();
      animate();
      
      function init() {
        container = document.getElementById( 'bg' );
          
        camera = new THREE.Camera();
        camera.position.z = 1;
        scene = new THREE.Scene();
        var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

        var MyTexture = loader.load( './assets/img/water.jpg' );
        var mapTexture = loader.load( './assets/img/water-maps.jpg' );
        MyTexture.minFilter = THREE.LinearFilter;

        uniforms = {
          u_time: { type: 'f', value: 1.0 },
          u_animation: { type: 'f', value: 0.0 },
          u_mouse: { type: 'v2', value: new THREE.Vector2() },
          u_resolution: { type: 'v2', value: new THREE.Vector2() },
          u_size: {type:'v2', value: new THREE.Vector2(MyTexture.image.width,MyTexture.image.height) },
          u_image: {value:MyTexture },
          u_maps: {value:mapTexture},
        };
        var material = new THREE.ShaderMaterial( {
          uniforms: uniforms,
          vertexShader: document.getElementById( 'vertexShader' ).textContent,
          fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        } );
        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
          
        container.appendChild( renderer.domElement );
        onWindowResize();
        window.addEventListener( 'resize', onWindowResize, false );
      }
      function onWindowResize( event ) {
        renderer.setSize( window.innerWidth, window.innerHeight );
        uniforms.u_resolution.value.x = renderer.domElement.width;
        uniforms.u_resolution.value.y = renderer.domElement.height;
        uniforms.u_mouse.value.x = mouse.x;
        uniforms.u_mouse.value.y = mouse.y;
      }
      function animate() {
        requestAnimationFrame( animate );
        render();
      }
      function render() {
        uniforms.u_time.value += 1.0;
        renderer.render( scene, camera );
      }

      document.addEventListener('mousemove',function(event){
        TweenLite.to(uniforms.u_mouse.value, 1, {
          x: ((event.pageX / window.innerWidth) - 0.5) * 1.5,
          y: ((event.pageY / window.innerHeight)- 0.5) * 1.5,
        });
      });

    },
  };
}());

module.exports = web;