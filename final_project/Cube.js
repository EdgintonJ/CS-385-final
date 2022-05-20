

function Cube() {

    /* // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cone shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    var n = numSides || DefaultNumSides; // Number of sides

    var theta = 0.0;
    var dTheta = 2.0 * Math.PI / n;
    
    // Record the number of components for each vertex's position in the Cone object's 
    //   positions property. (that's why there's a "this" preceding the positions here).
    //   Here, we both create the positions object, as well as initialize its
    //   numComponents field.
    //
    this.positions = { numComponents : 3 };
    
    // Initialize temporary arrays for the Cone's indices and vertex positions
    //
    var positions = [ 0.0, 0.0, 0.0 ];
    var indices = [ 0 ];


    // positions.push( 0.0, 0.0, 1.0 );
    
    // Close the triangle fan by repeating the first (non-center) point.
    //

    positions.push( 1.0, 0.0, 0.0 );
    positions.push( 0.0, 1.0, 0.0 );

    indices.push(1);
    indices.push(2);

    // Record the number of indices in one of our two disks that we're using to make the
    //   cone.  At this point, the indices array contains the correct number of indices for a
    //   single disk, and as we render the cone as two disks of the same size, this value is
    //   precisely what we need.
    //
    this.indices = { count : indices.length };

    // Now build up the list for the cone.  First, add the apex vertex onto the index list
    //
    indices.push(n + 1);

    // Next, we need to append the rest of the vertices for the permieter of the disk.
    // However, the cone's perimeter vertices need to be reversed since it's effectively a
    // reflection of the bottom disk.
    //
    indices = indices.concat( indices.slice(1,n+2).reverse() );*/

    let program = initShaders(gl, "Bond-vertex-shader", "Bond-fragment-shader");
   // let program = initShaders(gl, "Sphere-vertex-shader", "Sphere-fragment-shader");

    const programInfo = {
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
    };

    initTexture("https://webglfundamentals.org/webgl/resources/f-texture.png");

    let positions = [

        .013, .14, -.013,
        .013, -.14, -.013,                     //        2 / 6  *         * 0 / 4
        -.013, .14, -.013,
        -.013, -.14, -.013,                    //        3 / 7  *         * 1 / 5

        .013, .14, .013,
        .013, -.14, .013,
        -.013, .14, .013,
        -.013, -.14, .013
        ];

    let indices = [

        // front
        0, 1, 2,
        3, 1, 2,

        // top
        2, 0, 4,
        4, 6, 2,

        // right
        0, 1, 5,
        5, 4, 0,

        // left
        2, 6, 7,
        3, 7, 2,

        // bottom
        3, 7, 1,
        1, 5, 7,

        // back
        6, 4, 5,
        5, 6, 7
    ];

    var edges = [
        0, 2,  // "Front" face edges
        1, 0,
        2, 3,
        3, 1,
        4, 5,  // "Back" face edges
        4, 6,
        6, 7,
        7, 5,
        0, 4,  // "Side" edges
        1, 5,
        2, 6,
        3, 7
    ];

    /*var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    // Set Texcoords.
    setTexcoords(gl);*/

    gl.getUniformLocation(program, "R")
    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    edges.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i( gl.getUniformLocation(program, 'aTextureCoord'), 0);

    // MV = gl.getUniformLocation(program, "MV");
    // this.MV = mat4();  // mat4() is in MV.js
    let P = gl.getUniformLocation(program, "P");
    if (P) { this.P = mat4(); }

    let MV = gl.getUniformLocation(program, "MV");
    if (MV) { this.MV = mat4(); }

    let color = gl.getUniformLocation(program, "color");
    if (color) { this.color = vec4(); }

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );

        gl.uniformMatrix4fv(MV, false, flatten(this.MV));

        if (P) { gl.uniformMatrix4fv(P, false, flatten(this.P)); }
        if (MV) { gl.uniformMatrix4fv(MV, false, flatten(this.MV)); }
        if (color) { gl.uniform4fv(color, flatten(this.color)); }

        // Render the wireframe version of the cube
        /**gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );*/

        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

};
