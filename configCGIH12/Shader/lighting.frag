#version 330 core
struct Material
{
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

struct Light
{
    vec3 position;
    
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

out vec4 color;

uniform vec3 viewPos;
uniform Material material;
uniform Light light;
uniform Light light2;
uniform sampler2D texture_diffuse;

void main()
{
    // Ambient
    vec3 ambient = light.ambient *material.diffuse;
    
    // Diffuse
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * material.diffuse;
    
    // Specular
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = light.specular * (spec * material.specular);

    // Ambient2
    vec3 ambient2 = light2.ambient *material.diffuse;
    
    // Diffuse2
    norm = normalize(Normal);
    lightDir = normalize(light2.position - FragPos);
    diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse2 = light2.diffuse * diff * material.diffuse;
    
    // Specular2
    viewDir = normalize(viewPos - FragPos);
    reflectDir = reflect(-lightDir, norm);
    spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular2 = light2.specular * (spec * material.specular);

    vec3 result2 = ambient2 + diffuse2 + specular2;
    vec3 result = ambient + diffuse + specular;
    result = result + result2;
    //color = vec4(result, 1.0f);
    color = vec4(result, 1.0f)*texture(texture_diffuse,TexCoords);
}