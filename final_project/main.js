
"use strict";

// Jordan Edginton
// CS 385-02 final project: Ethylbenzine

// This is a 2D representation of the molecule and where each carbon and hydrogen is.
/*
      H1         H2   H9    H8
       \        /       \  /
       C2  ==  C1        C7 -- H7
      /          \      /
H0 -- C3         C0 -- C6 -- H6
      \\        //      \
        C4 -- C5         H5
        /      \
       H3       H4
*/

let gl;
let canvas;
let mole_dist = 0.3;                     // Distance between each atom in molecule
let carbon_size = 0.09;
let hydrogen_size = carbon_size / 3;
let carbon_slices = 30;
let carbon_stacks = 8;
let hydrogen_slices = 15;
let hydrogen_stacks = 5;
let rotation_angle = 0;
let orbit_x, orbit_z, orbit_hyp;
let projectionMatrix;
let viewMatrix;
let viewProjMat;


function setup_object (obj, ms, obj_ms, type){
    // This is where we set up each of our carbons and hydrogens.
    ms.load(obj_ms);
    ms.push();
    if (type === 'c'){
        ms.scale(carbon_size);
    }
    else{
        ms.scale(hydrogen_size);
    }
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    obj.P = viewProjMat;
    obj.MV = ms.current()
}


function setup_branch (obj, ms, obj_ms, rot){
    // This is where we set up or bonds in the "hexagon" of the molecule. Bonds not in the molecule require
    // more rotates and so had to be done outside this function.
    ms.load(obj_ms);
    ms.push();
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    ms.rotate(rot, [0, 0, 1])
    obj.P = viewProjMat;
    obj.MV = ms.current()
}



function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(4);
    gl.enable(gl.DEPTH_TEST);

    projectionMatrix = perspective(90, gl.canvas.width / gl.canvas.height, .1, 4);
    viewMatrix = lookAt(vec3(.9, 0, .9), vec3(0, 0, 0), vec3(.4, 1, -.5))  ;
    viewProjMat = mult(projectionMatrix, viewMatrix);

    // Bonds
    let B0 = new Cube()
    let B1 = new Cube()
    let B2 = new Cube()
    let B3 = new Cube()
    let B4 = new Cube()
    let B5 = new Cube()
    let B6 = new Cube()
    let B7 = new Cube()
    let B8 = new Cube()
    let B9 = new Cube()
    let B10 = new Cube()
    let B11 = new Cube()
    let B12 = new Cube()
    let B13 = new Cube()
    let B14 = new Cube()
    let B15 = new Cube()
    let B16 = new Cube()
    let B17 = new Cube()
    let B18 = new Cube()
    let B19 = new Cube()
    let B20 = new Cube()

    // Hydrogens
    let H0 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H1 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H2 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H3 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H4 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H5 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H6 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H7 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H8 = new Sphere(hydrogen_slices, hydrogen_stacks);
    let H9 = new Sphere(hydrogen_slices, hydrogen_stacks);

    // Carbons
    let C0 = new Sphere(carbon_slices, carbon_stacks, 'c');
    let C1 = new Sphere(carbon_slices, carbon_stacks, 'c');
    let C2 = new Sphere(carbon_slices, carbon_stacks, 'c');
    let C3 = new Sphere(carbon_slices, carbon_stacks, 'c');
    let C4 = new Sphere(carbon_slices, carbon_stacks, 'c');
    let C5 = new Sphere(carbon_slices, carbon_stacks, 'c');
    let C6 = new Sphere(carbon_slices, carbon_stacks, 'c');
    let C7 = new Sphere(carbon_slices, carbon_stacks, 'c');

    setTimeout(() => {
        requestAnimationFrame(render(B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18, B19, B20,
            C0, C1, C2, C3, C4, C5, C6, C7, H0, H1, H2, H3, H4, H5, H6, H7, H8, H9))
    }, 1000 / 30);
}

function render(B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18, B19, B20,
                C0, C1, C2, C3, C4, C5, C6, C7, H0, H1, H2, H3, H4, H5, H6, H7, H8, H9) {

    rotation_angle += 0.05;
    if (rotation_angle >= 3.14 * 2){rotation_angle = 0}  // when we do a full rotation, reset angle.

    let ms = new MatrixStack();

    let c0 = translate(0, 0.0, 0)
    setup_object(C0, ms, c0, 'c')

    let c1 = translate(mole_dist * .5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)), mole_dist * .5 * Math.sin(rotation_angle))
    setup_object(C1, ms, c1, 'c')

    let c2 = translate(mole_dist * 1.5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)), mole_dist * 1.5 * Math.sin(rotation_angle))
    setup_object(C2, ms, c2, 'c')

    let c3 = translate(mole_dist * 2 * Math.cos(rotation_angle), 0.0, mole_dist * Math.sin(rotation_angle) * 2)
    setup_object(C3, ms, c3, 'c')

    let c4 = translate(mole_dist * 1.5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -1, mole_dist * 1.5 * Math.sin(rotation_angle))
    setup_object(C4, ms, c4, 'c')

    let c5 = translate(mole_dist * .5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -1, mole_dist * .5 * Math.sin(rotation_angle))
    setup_object(C5, ms, c5, 'c')

    let c6 = translate(mole_dist * -1 * Math.cos(rotation_angle), 0.0, mole_dist * -1 * Math.sin(rotation_angle))
    setup_object(C6, ms, c6, 'c')

    orbit_x = mole_dist * -1.5;
    orbit_z = (Math.sqrt(Math.pow(mole_dist, 2) - Math.pow(mole_dist / 2, 2)) * -1);
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)));
    let c7 = translate(orbit_hyp * Math.cos(rotation_angle + .5) * -1 , 0,
        orbit_hyp * Math.sin(rotation_angle + .5) * -1 )
    setup_object(C7, ms, c7, 'c')


    let h0 = translate(mole_dist * 3 * Math.cos(rotation_angle), 0, mole_dist * 3 * Math.sin(rotation_angle))
    setup_object(H0, ms, h0, 'h')

    let h1 = translate(mole_dist * 1.5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
                          Math.pow(mole_dist / 2, 2)) + mole_dist, mole_dist * 1.5 * Math.sin(rotation_angle))
    setup_object(H1, ms, h1, 'h')

    let h2 = translate(mole_dist * .5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) + mole_dist, mole_dist * .5 * Math.sin(rotation_angle))
    setup_object(H2, ms, h2, 'h')

    let h3 = translate(mole_dist * 1.5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -1 - mole_dist, mole_dist * 1.5 * Math.sin(rotation_angle))
    setup_object(H3, ms, h3, 'h')

    let h4 = translate(mole_dist * .5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -1 - mole_dist, mole_dist * .5 * Math.sin(rotation_angle))
    setup_object(H4, ms, h4, 'h')

    // bond angle = 109.5, 1.63328 units in same plane

    orbit_x = mole_dist * -1.1;
    orbit_z = mole_dist * .9;
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)) * -1);
    let h5 = translate(orbit_hyp * Math.cos(rotation_angle - .51) ,
        mole_dist * 1.63328 * .44,
        orbit_hyp * Math.sin(rotation_angle - .51))
    setup_object(H5, ms, h5, 'h')

    let h6 = translate(orbit_hyp * Math.cos(rotation_angle - .51),
        mole_dist * 1.63328 * -.45,
        orbit_hyp * Math.sin(rotation_angle - .51))
    setup_object(H6, ms, h6, 'h')

    orbit_x = mole_dist * -1.47;
    orbit_z = Math.sqrt(Math.pow(mole_dist, 2) - Math.pow(mole_dist / 2, 2)) * 1.9;
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)) * -1);
    let h7 = translate(orbit_hyp * Math.cos(rotation_angle + .39),
        mole_dist * 1.63328 * -.46,
        orbit_hyp * Math.sin(rotation_angle + .39))
    setup_object(H7, ms, h7, 'h')

    let h8 = translate(orbit_hyp * Math.cos(rotation_angle + .39),
        mole_dist * 1.63328 * .45,
        orbit_hyp * Math.sin(rotation_angle + .39))
    setup_object(H8, ms, h8, 'h')

    orbit_x = mole_dist * -1;
    orbit_z = Math.sqrt(Math.pow(mole_dist, 2) - Math.pow(mole_dist / 2, 2)) * 2;
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)));
    let h9 = translate(orbit_hyp * Math.cos(rotation_angle + 1) * -1, 0, orbit_hyp * Math.sin(rotation_angle + 1) * -1)
    setup_object(H9, ms, h9, 'h')



    let b0 = translate(mole_dist * .25 * Math.cos(rotation_angle - .4), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -.5, mole_dist * .25 * Math.sin(rotation_angle - .4));
    setup_branch(B0, ms, b0, 30)
    let b1 = translate(mole_dist * .25 * Math.cos(rotation_angle + .4), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -.5, mole_dist * .25 * Math.sin(rotation_angle + .4));
    setup_branch(B1, ms, b1, 30)

    let b2 = translate(mole_dist * .25 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * .5, mole_dist * .25 * Math.sin(rotation_angle));
    setup_branch(B2, ms, b2, -30)

    let b3 = translate(mole_dist * Math.cos(rotation_angle - .1), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)), mole_dist * Math.sin(rotation_angle - .1));
    setup_branch(B3, ms, b3, 90)
    let b4 = translate(mole_dist * Math.cos(rotation_angle + .1), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)), mole_dist * Math.sin(rotation_angle + .1));
    setup_branch(B4, ms, b4, 90)

    let b5 = translate(mole_dist * 1.75 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * .5, mole_dist * 1.75 * Math.sin(rotation_angle));
    setup_branch(B5, ms, b5, 30)

    let b6 = translate(mole_dist * 1.75 * Math.cos(rotation_angle - .047), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -.5, mole_dist * 1.75 * Math.sin(rotation_angle - .047));
    setup_branch(B6, ms, b6, -30)
    let b7 = translate(mole_dist * 1.75 * Math.cos(rotation_angle + .047), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -.5, mole_dist * 1.75 * Math.sin(rotation_angle + .047));
    setup_branch(B7, ms, b7, -30)

    let b8 = translate(mole_dist * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -1, mole_dist * Math.sin(rotation_angle));
    setup_branch(B8, ms, b8, 90)

    let b9 = translate(mole_dist * .5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) + mole_dist * .5, mole_dist * .5 * Math.sin(rotation_angle));
    setup_branch(B9, ms, b9, 0)

    let b10 = translate(mole_dist * 1.5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) + mole_dist * .5, mole_dist * 1.5 * Math.sin(rotation_angle));
    setup_branch(B10, ms, b10, 0)

    let b11 = translate(mole_dist * 2.5 * Math.cos(rotation_angle), 0, mole_dist * 2.5 * Math.sin(rotation_angle));
    setup_branch(B11, ms, b11, 90)

    let b12 = translate(mole_dist * .5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -1 - mole_dist * .5, mole_dist * .5 * Math.sin(rotation_angle));
    setup_branch(B12, ms, b12, 0)

    let b13 = translate(mole_dist * 1.5 * Math.cos(rotation_angle), Math.sqrt(Math.pow(mole_dist, 2) -
        Math.pow(mole_dist / 2, 2)) * -1 - mole_dist * .5, mole_dist * 1.5 * Math.sin(rotation_angle));
    setup_branch(B13, ms, b13, 0)

    let b14 = translate(mole_dist * -.5 * Math.cos(rotation_angle), 0, mole_dist * -.5 * Math.sin(rotation_angle));
    setup_branch(B14, ms, b14, 90)

    orbit_x = mole_dist * -1.25;
    orbit_z = Math.sqrt(Math.pow(mole_dist, 2) - Math.pow(mole_dist / 2, 2)) * -.5;
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)) * -1);
    let b15 = translate(orbit_hyp * Math.cos(rotation_angle + .3), 0, orbit_hyp * Math.sin(rotation_angle + .3));
    ms.load(b15);
    ms.push();
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    ms.rotate(90, [0, 0, 1])
    ms.rotate(-60, [1, 0, 0])
    B15.P = viewProjMat;
    B15.MV = ms.current()

    orbit_z = Math.sqrt(Math.pow(mole_dist, 2) - Math.pow(mole_dist / 2, 2)) * -1.5;
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)) * -1);
    let b16 = translate(orbit_hyp * Math.cos(rotation_angle + .75), 0, orbit_hyp * Math.sin(rotation_angle + .75));
    ms.load(b16);
    ms.push();
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    ms.rotate(90, [0, 0, 1])
    ms.rotate(60, [1, 0, 0])
    B16.P = viewProjMat;
    B16.MV = ms.current()


    orbit_x = mole_dist * -1.1;
    orbit_z = mole_dist * -.76 * .5;
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)) * -1);
    let b17 = translate(orbit_hyp * Math.cos(rotation_angle - .3), mole_dist * 1.63328 * .47 * -.5,
        orbit_hyp * Math.sin(rotation_angle - .3));
    ms.load(b17);
    ms.push();
    ms.rotate(-45, [0, 1, 0])
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    ms.rotate(23, [0, 0, 1])
    ms.rotate(-41, [1, 0, 0])
    B17.P = viewProjMat;
    B17.MV = ms.current()

    let b18 = translate(orbit_hyp * Math.cos(rotation_angle - .3), mole_dist * 1.63328 * .47 * .5,
        orbit_hyp * Math.sin(rotation_angle - .3));
    ms.load(b18);
    ms.push();
    ms.rotate(-45, [0, 1, 0])
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    ms.rotate(-23, [0, 0, 1])
    ms.rotate(41, [1, 0, 0])
    B18.P = viewProjMat;
    B18.MV = ms.current()


    orbit_x = mole_dist * -1.75;
    orbit_z = Math.sqrt(Math.pow(mole_dist, 2) - Math.pow(mole_dist / 2, 2)) * -1;
    orbit_hyp = (Math.sqrt(Math.pow(orbit_x, 2) + Math.pow(orbit_z, 2)) * -1);
    let b19 = translate(orbit_hyp * Math.cos(rotation_angle + .45), mole_dist * 1.63328 * .45 * .5,
        orbit_hyp * Math.sin(rotation_angle + .45));
    ms.load(b19);
    ms.push();
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    ms.rotate(35, [0, 0, 1])
    B19.P = viewProjMat;
    B19.MV = ms.current()

    let b20 = translate(orbit_hyp * Math.cos(rotation_angle + .45), mole_dist * 1.63328 * .45 * -.5,
        orbit_hyp * Math.sin(rotation_angle + .45));
    ms.load(b20);
    ms.push();
    ms.rotate(rotation_angle * -57.42, [0, 1, 0])
    ms.rotate(-35, [0, 0, 1])
    B20.P = viewProjMat;
    B20.MV = ms.current()


    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);


    B20.render()
    ms.pop()

    B19.render()
    ms.pop()

    B18.render()
    ms.pop()

    B17.render()
    ms.pop()

    B16.render()
    ms.pop()

    B15.render()
    ms.pop()

    B14.render()
    ms.pop()

    B13.render()
    ms.pop()

    B12.render()
    ms.pop()

    B11.render()
    ms.pop()

    B10.render()
    ms.pop()

    B9.render()
    ms.pop()

    B8.render()
    ms.pop()

    B7.render()
    ms.pop()

    B6.render()
    ms.pop()

    B5.render()
    ms.pop()

    B4.render()
    ms.pop()

    B3.render()
    ms.pop()

    B2.render()
    ms.pop()

    B1.render()
    ms.pop()

    B0.render()
    ms.pop()

    H9.render()
    ms.pop()

    H8.render()
    ms.pop()

    H7.render()
    ms.pop()

    H6.render()
    ms.pop()

    H5.render()
    ms.pop()

    H4.render()
    ms.pop()

    H3.render()
    ms.pop()

    H2.render()
    ms.pop()

    H1.render()
    ms.pop()

    H0.render()
    ms.pop()

    C7.render()
    ms.pop()

    C6.render()
    ms.pop()

    C5.render()
    ms.pop()

    C4.render()
    ms.pop()

    C3.render()
    ms.pop()

    C2.render()
    ms.pop()

    C1.render()
    ms.pop()

    C0.render()
    ms.pop()


    setTimeout(() => {
        requestAnimationFrame(render(B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17,
            B18, B19, B20, C0, C1, C2, C3, C4, C5, C6, C7, H0, H1, H2, H3, H4, H5, H6, H7, H8, H9));
    }, 1000 / 25);
}

window.onload = init;
