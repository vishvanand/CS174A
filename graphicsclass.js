



var azhimuth = [0,1,0];

var canvas;
var gl;
var program;


var mvMat;
var pMat;
var orthopMat;


var colorBuffer;
var vertarray;
var shapecol;
 
var aspect = 1; 

var deg = 0; 
 


var color;

var buffer;



var crosssize = 7;
var inccross = 0;

var x = 0; 
var y = 0; 
var z = -40;

window.onload = function init() {
	

	canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);	
	if(!gl) {
		
		alert("WebGL is not available!");
	}
	
	
	
document.onkeydown =  zx; //onkeypress can't read arrow keys
function zx(e){
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    console.log(e.which);

    if(charCode == 67)
    {
    	console.log("Pressed C");

    	


	flipcolors(shapecol);

	render();
    }


    if(charCode == 38)
    {
    	y+=0.25;
    	render();
    }

    if(charCode == 40)
    {
    	y-=0.25;
    	render();
    }


    if(charCode == 39)
    {

    	deg+=1;

    	render();
    }

     if(charCode == 37)
    {

    	deg-=1;
    	render();
    }

    if(charCode == 73)
    {
    	
    	


    	var offset = vec3(1,0,0);
    	var matrix = rotate(deg, azhimuth);

    		for(var k = 0; k< 4; k++)
    		console.log(matrix[k]);

    	//console.log(matrix[0],matrix[2]);

//tthis codes is to try and offset for the rotation
    	hx = x + matrix[0][0]*0 + matrix[0][1]*0 + matrix[0][2]*1;
    	hz = z + matrix[2][0]*0 + matrix[2][1]*0 + matrix[2][2]*1;


    	x = hx;
    	z = hz;

    	
    	//z++;
    	console.log(x,z);
    	render();

    }

    if(charCode == 75)
    {

    	var offset = vec3(1,0,0);
    	var matrix = rotate(deg, azhimuth);

    		for(var k = 0; k< 4; k++)
    		console.log(matrix[k]);

    	//console.log(matrix[0],matrix[2]);

    	hx = x + (matrix[0][2]*1);
    	hz = z - (matrix[2][2]*1);


    	x = hx;
    	z = hz;
    	z--;
    	render();
    }

    if(charCode == 74)
    {
    	x--;
    	render();
    }

    if(charCode == 76)
    {
    	x++;
    	
    	render();
    }


    if(charCode == 187)
    {

    		if(inccross == 0)
    	inccross = 1;
    else
    	inccross = 0;
    	drawc();

    }

    if(charCode == 87)
    {
    	canvas.width += 10;
    	aspect = canvas.width/canvas.height;
    	render();
    }

    if(charCode == 78)
    {
    	canvas.width -= 10;
    	aspect = canvas.width/canvas.height;
    	render();
    }

    if(charCode == 27)
    {
	aspect = 1;
	deg = 0;
	x = 0;
	y = 0;
	z = -40;
	render();
    }

    if(inccross == 1)
    {
    	drawc();
    }


	}

	
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	aspect = canvas.width/canvas.height; 
	gl.clearColor(0.0, 0.0, 0.0, 1.0); 
	gl.enable(gl.DEPTH_TEST); 
	



var side = 0.6; 
vertarray = [//I used five lines because I wanted to use same array for vertarray
            // Front face
            vec3(-side, -side, side),
            vec3(side, -side, side),
            vec3(side, side, side),
            vec3(-side, side, side),
            vec3(-side, -side, side),
            // Back face
            vec3(-side, -side, -side), 
            vec3(-side, side, -side),
            vec3(side, side, -side),
            vec3(side, -side, -side),
            vec3(-side, -side, -side), 

			
            // Top face
            vec3(-side, side, -side),
             vec3(-side, side, side),
            vec3(side, side, side),
            vec3(side, side, -side),
            vec3(-side, side, -side),

            // Bottom face
            vec3(-side, -side, -side),
            vec3(side, -side, -side),
            vec3(side, -side, side), 
            vec3(-side, -side, side),
            vec3(-side, -side, -side),

            // Right face
            vec3(side, -side, -side),
            vec3(side, side, -side),
            vec3(side, side, side),
            vec3(side, -side, side),
            vec3(side, -side, -side),

            // Left face
            vec3(-side, -side, -side), 
            vec3(-side, -side, side), 
            vec3(-side, side, side), 
            vec3(-side, side, -side),
            vec3(-side, -side, -side)

            
            
        ];

	
	
	shapecol = [
   	 vec4(1.0, 1.0, 0.0, 1.0),
     vec4(0.6, 0.0, 0.0, 1.0),
     vec4(0.0, 1.0, 1.0, 1.0),
     vec4(1.0, 0.5, 0.0, 1.0),
     vec4(0.2, 0.3, 0.0, 1.0),
     vec4(0.0, 1.0, 0.0, 1.0),
     vec4(0.5, 0.0, 1.0, 1.0),
     vec4(1.0, 0.5, 1.0, 1.0)
 
		   
	];


	



	
	
    program = initShaders(gl, "vertex-shader", "fragment-shader"); 
    gl.useProgram(program);
	
	
	buffer = gl.createBuffer(); 
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer); 
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertarray), gl.STATIC_DRAW); 

	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
		
	
	render();
};


function flipcolors(colors)
{

var x = colors[colors.length-1];
	for(i=colors.length-1;i>0;i--)
	{
		colors[i] = colors[i-1];
	}

	colors[0] = x;
}
function render() {

	
	pMat = perspective(45, aspect, 0.1, -1); 
	orthopMat = ortho(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);
		
	color = gl.getUniformLocation(program, "color");
    mvMat = gl.getUniformLocation(program, "mvMat");
	
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	var cMatrix = mat4();
	
	var positions = [
		vec3(-10, -10, -10),
		vec3(-10, -10, 10),
		vec3(-10, 10, -10),
		vec3(-10, 10, 10),
		vec3(10, -10, -10),
		vec3(10, -10, 10),
		vec3(10, 10, -10),
		vec3(10, 10, 10)
	];
	
	
	for(var i=0; i<8; i++) {
		rendercube(cMatrix, positions[i],  shapecol[i]); //given position and colors
	}
	
	
}






function rendercube(cMatrix, tvec, cc) {
	
	//console.log(i);
	cMatrix = mat4();
    cMatrix = mult(cMatrix, pMat);
    	

    	cMatrix = mult(cMatrix,rotate(deg,azhimuth));

    	cMatrix = mult(cMatrix, translate(vec3(x, y, z))); 

		cMatrix = mult(cMatrix, translate(tvec));
        gl.uniformMatrix4fv(mvMat, false, flatten(cMatrix));	
	
	gl.uniform4fv(color, flatten(vec4(1.0, 1.0, 1.0, 0.0)));
	gl.drawArrays(gl.LINES, 0, 30);

	gl.uniform4fv(color, flatten(cc));

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 30);
	//gl.drawArrays(gl.LINE_STRIP, 5, 5);
	//gl.drawArrays(gl.LINE_STRIP, 8, 12);
	//gl.drawArrays(gl.LINE_STRIP, 12, 16);
	
}


crossvert = 
	[
  vec3(-crosssize,0,0),
 
  vec3(crosssize,0,0),
   vec3(0,-crosssize,0),
  vec3(0,crosssize,0)
	];
//To draw crosshairs
	function drawc()
	{
		console.log("HI!");

		render();
		var chairBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,chairBuffer);




		gl.bufferData(gl.ARRAY_BUFFER, flatten(crossvert),gl.STATIC_DRAW);
		gl.vertexAttribPointer(gl.getAttribLocation(program, "vPosition"), 3, gl.FLOAT, false, 0, 0);

		cMatrix = mat4();
		cMatrix = mult(cMatrix,orthopMat);
		cMatrix = mult(cMatrix, scale(vec3(0.1, 0.1, 0.1)));

		gl.uniform4fv(color, flatten(vec4(1.0, 1.0, 1.0, 1.0)));
		gl.uniformMatrix4fv(mvMat, false, flatten(cMatrix));	
		gl.drawArrays(gl.LINES, 0, 4);

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.vertexAttribPointer(gl.getAttribLocation(program, "vPosition"), 3, gl.FLOAT, false, 0, 0);

	}