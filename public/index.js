(() => {
    const canvas = document.querySelector("#gl-canvas");
    const gl = canvas.getContext("webgl");

    if (gl === null) {
        window.alert("Your browser does not support WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
    const vsSource = `
        attribute vec4 aVertexPosition;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `;

    const vertices = [0.5, 0.5, -0.5, -0.5, 0.5, -0.5];

    let vertex_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const vertCode = `
        attribute vec2 coordinates;
	
        void main(void) {
            gl_Position = vec4(coordinates, 0.0, 1.0);
        }
    `;

    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    const fragCode = `
        void main(void) {
            gl_FragColor = vec4(0, 0.8, 0, 1);
        }
    `;

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    let coordinatesVar = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coordinatesVar, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coordinatesVar);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
})();
