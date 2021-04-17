# Image stylization
Apply the style of one image to another image.

## Example
![Mona Lisa and a hand drawn comic character which combined result in a third image of Mona Lisa in the style of the comic character](~@images/php-ai-image-stylization.jpg)

Given the image of Mona Lisa and the painting, this application generates an image of Mona Lisa in the style of the painting. 

## Use it for
 - Enabling your users to create fun modifications of their images
 - Ensuring a consistent style of cover images
 - Generating avatars

## Installation
After you've followed the [installation instructions](/guide/installation.md), run the following to install the application:
``` php
php vendor/funcai/funcai-php/install-stylization.php
```

## Usage
``` php
$model = new \FuncAI\Models\Stylization();
$result = $model->predict([
  $pathToInputImage,
  $pathToStyleImage,
]);
```