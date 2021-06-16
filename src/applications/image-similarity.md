# Image similarity
Detect how similar two given images are

## Demo
<Demo-ImageSimilarity />

Given two images, this application calculates how similar these images are.

## Use it for
 - Showing similar images to your users
 - Add an "image search" feature to your app, where users can upload an image and you find matching images in your database
 - Grouping / filtering similar images
 - Detecting different sizes of the same image

## Installation
After you've followed the [installation instructions](/guide/installation.md), run the following to install the application:
``` php
php vendor/funcai/funcai-php/install-bitmr50x1-featurevector.php 
```

## Usage
``` php
$model = new \FuncAI\Models\BitMR50x1();
$result = $model->predict([
  $pathToInputImage
]);
```

The result will be a so called "feature vector". A feature vector is an array of float values. You can either predict the feature vectors of two or more images at once and compare them, or you can store the feature vector in your database. To calculate the similarity, you need to use an algorithm like the "cosine similarity". See our [example file](https://github.com/funcai/funcai-php/blob/main/example-bitmr50x1-featurevector.php) for a sample implementation.

There are also other more complex, but more performant ways to find similar feature vectors if you have a large amount of feature vectors. Interesting projects to get started with large scale feature vector comparisons are [faiss](https://github.com/facebookresearch/faiss) and [milvus](https://github.com/milvus-io/milvus).

Also, if you are using Elasticsearch, it has [native support](https://www.elastic.co/blog/text-similarity-search-with-vectors-in-elasticsearch) to calculate the cosine similarity.