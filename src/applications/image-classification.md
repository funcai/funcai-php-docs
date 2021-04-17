# Image classification
Find out what's in an image. Returns the top 5 classes out of a list of 21.825 classes.

## Example
![An image of a butterfly and 5 matching labels next to it](~@images/php-ai-image-classification.jpg)

Given any image, this application returns the top 5 categories which describe the primary subject of the image.

## Use it for
 - Making your images searchable by content
 - Generating image names or alt attributes
 - Grouping your images by content

## Installation
After you've followed the [installation instructions](/guide/installation.md), run the following to install the application:
``` php
php vendor/funcai/funcai-php/install-classification.php
```

## Usage
``` php
$model = new \FuncAI\Models\Classification();
$result = $model->predict($pathToInputImage);
```