
//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers) {
    // 设置清楚颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 全部清除
    gl.clearDepth(1.0);
    // 启用深度测试
    gl.enable(gl.DEPTH_TEST);
    // 设置深度测试
    gl.depthFunc(gl.LEQUAL);
    // 清空画布
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
    // 创建透视矩阵
    // 视图角度
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    // 宽高比
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    // 可见范围
    const zNear = 0.1;
    const zFar = 100.0;
    // 创建一个矩阵保存结果
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix,
      fieldOfView,
      aspect,
      zNear,
      zFar);
    
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();
    
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    
    mat4.translate(modelViewMatrix,     // destination matrix
      modelViewMatrix,     // matrix to translate
      [-0.0, 0.0, -6.0]);  // amount to translate
    
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
        gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }
    
    // Tell WebGL to use our program when drawing
    
    gl.useProgram(programInfo.program);
    
    // Set the shader uniforms
    
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
    
    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}
