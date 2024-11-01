// vertex.glsl
varying float vThickness;

attribute float thickness;

void main() {
    // Pass the thickness to the fragment shader
    vThickness = thickness;

    // Compute the line's position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Set the size of the line based on the thickness attribute
    gl_PointSize = vThickness; // Set the size for the point
}
