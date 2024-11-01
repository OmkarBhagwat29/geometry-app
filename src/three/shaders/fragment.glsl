// Fragment Shader
varying float vThickness;

void main() {
    // Set the color of the line (white for this example)
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color

    // Optionally, you can modify the alpha based on thickness
    // gl_FragColor.a = vThickness; // Use thickness for transparency if needed
}