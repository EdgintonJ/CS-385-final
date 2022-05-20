
function Sphere( slices, stacks, type, vertexShader, fragmentShader) {
    let i, j;  // loop counters

    /*let program = initShaders(gl,
        vertexShader || "Sphere-vertex-shader",
        fragmentShader || "Sphere-fragment-shader");*/
    let program;
    if (type === 'c'){
        program = initShaders(gl,
            vertexShader || "Carbon-vertex-shader",
            fragmentShader || "Carbon-fragment-shader");
    }
    else{
        program = initShaders(gl,
            vertexShader || "Hydro-vertex-shader",
            fragmentShader || "Hydro-fragment-shader");
    }


    // const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);

    /*const programInfo = {
        program: program,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(program, 'aTextureCoord'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(program, 'uSampler'),
        }
    };*/


    let nSlices = slices || 20; // Default number of slices
    let nStacks = stacks || 12; // Default number of stacks

    let dPhi = Math.PI / nStacks;
    let dTheta = 2.0 * Math.PI / nSlices;

    let positions = [];

    // Generate the coordinates for the vertices of the sphere,
    //   starting at the North pole.
    positions.push(0.0, 0.0, 1.0);

    for (j = 1; j < nStacks; ++j) {
        let phi = j * dPhi;
        let z = Math.cos(phi);

        for (i = 0; i < nSlices; ++i) {
            let theta = i * dTheta;
            let sinPhi = Math.sin(phi);
            let x = Math.cos(theta) * sinPhi;
            let y = Math.sin(theta) * sinPhi;

            positions.push(x, y, z);
        }
    }

    positions.push(0.0, 0.0, -1.0);
    
    positions.numComponents = 3;

    // Generate the sphere's topology (i.e., indices)
    let indices = [];

    // Since we'll be using multiple draw calls to render the sphere,
    // build up an array of those calls' parameters to simplify rendering
    let drawCalls = [];

    // Generate the indices for the North Pole cap.  "indices.length" will
    // be zero at this point, but you'll see the pattern of using indices'
    // length value in future computations, so we use it here as well to
    // not break the pattern 
    let start = indices.length; // this will be zero here, but 
    let offset = start * 2 /* sizeof(gl.UNSIGNED_SHORT) */ ;

    let n = 1; // starting value of each "row" of indices
    let m;     // temporary index computation variable 
    
    indices.push(0);
    for (i = 0; i < nSlices; ++i) {
        m = n + i;
        indices.push(m);
    }
    indices.push(n);

    drawCalls.push({
        type: gl.TRIANGLE_FAN,
        count: indices.length,
        offset: offset
    });

    // Generate the indices for each band around the sphere
    start = indices.length;
    offset = start * 2 /* sizeof(gl.UNSIGNED_SHORT) */ ;

    for (j = 0; j < nStacks - 2; ++j) {
        for (i = 0; i < nSlices; ++i) {
            m = n + i;
            indices.push(m);
            indices.push(m + nSlices);
        }
        indices.push(n);
        indices.push(n + nSlices);

        n += nSlices;

        drawCalls.push({
            type: gl.TRIANGLE_STRIP,
            count: indices.length - start,
            offset: offset
        });

        start = indices.length;
        offset = start * 2 /* sizeof(gl.UNSIGNED_SHORT) */ ;
    }

    // Generate the indices for the South Pole cap
    indices.push(n + nSlices);
    indices.push(n);
    for (i = 0; i < nSlices; ++i) {
        m = n + nSlices - i - 1;
        indices.push(m);
    }

    drawCalls.push({
        type: gl.TRIANGLE_FAN,
        count: indices.length - start,
        offset: offset
    });

    // Configure our WebGL vertex and index buffers
    positions.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positions.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions),
        gl.STATIC_DRAW);
    
    indices.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices),
        gl.STATIC_DRAW);

    // Set up our aPosition vertex shader attribute
    let aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);

    // Initialize our externally viewable variables
    this.PointMode = false;
    let P = gl.getUniformLocation(program, "P");
    if (P) { this.P = mat4(); }

    let MV = gl.getUniformLocation(program, "MV");
    if (MV) { this.MV = mat4(); }

    let color = gl.getUniformLocation(program, "color");
    if (color) { this.color = vec4(); }

    // Define our render() function
    this.render = function () {
        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, positions.buffer);
        gl.vertexAttribPointer(aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices.buffer);

        if (P) { gl.uniformMatrix4fv(P, false, flatten(this.P)); }
        if (MV) { gl.uniformMatrix4fv(MV, false, flatten(this.MV)); }
        if (color) { gl.uniform4fv(color, flatten(this.color)); }

        // Iterate across the drawCalls array.  The variable "p" contains
        // each set of parameters for the gl.drawElements call
        for (let p of drawCalls) {
            gl.drawElements(this.PointMode ? gl.POINTS : p.type,
                p.count, gl.UNSIGNED_SHORT, p.offset);
        }
    };
};