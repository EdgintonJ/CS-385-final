// Texture for Bonds, not spheres. Original plan was for spheres, but swapped to bonds.

function initTexture (img) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([155, 155, 155, 255]));

    let texImage = new Image();
    texImage.crossOrigin = "";
    texImage.src = img;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
        gl.RGBA, gl.UNSIGNED_BYTE, texImage);
    gl.generateMipmap(gl.TEXTURE_2D);

    return texture;
}

