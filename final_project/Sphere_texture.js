
function loadTexture(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
        gl.RGBA, gl.UNSIGNED_BYTE, image);
    /*gl.texParameteri(gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_NEAREST);*/
    gl.generateMipmap(gl.TEXTURE_2D);
    // gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_{S,T}, param );
    // gl.bindTexture(gl.TEXTURE_2D, null);
}

function initTexture (img) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([155, 155, 155, 255]));

    let texImage = new Image();
    // texbmp = new gl.ImageB;
    // texImage.src = "https://webglfundamentals.org/webgl/resources/f-texture.png";

    // var image = document.getElementById("texImage");
    texImage.crossOrigin = "";
    texImage.src = img;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
        gl.RGBA, gl.UNSIGNED_BYTE, texImage);
    gl.generateMipmap(gl.TEXTURE_2D);
    /*texImage.onload = function () {
        loadTexture(texImage, texture);
    };*/

    return texture;
}

