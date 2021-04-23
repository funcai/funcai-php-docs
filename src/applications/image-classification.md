# Image classification
Find out what's in an image. Returns the top 5 classes out of a list of 21.825 classes.

## Demo
<Demo-ImageClassification />

Given any image, this application returns the top 5 categories which describe the primary subject in the image.

## Use it for
 - Making your images searchable by content
 - Generating image names or alt attributes
 - Grouping your images by content

## Installation
After you've followed the [installation instructions](/guide/installation.md), run the following to install the application:
``` php
php vendor/funcai/funcai-php/install-imagenet21k.php
```

## Usage
``` php
$model = new \FuncAI\Models\Imagenet21k();
$result = $model->predict($pathToInputImage);
```