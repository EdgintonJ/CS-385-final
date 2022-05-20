

function Cube() {

    let program = initShaders(gl, "Bond-vertex-shader", "Bond-fragment-shader");

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

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

};
