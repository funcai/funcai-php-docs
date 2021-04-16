# Introduction
FuncAI is a high performance, state of the art machine learning library for PHP.
It has no dependencies and can run everywhere PHP can run. It uses Tensorflow under the hood.

## Why FuncAI?
We strive to make machine learning as easy as possible. You can get started without any machine learning knowledge.

FuncAI runs on your existing commodity hardware and you do not need to meddle with other languages or frameworks.

Without FuncAI you would need your own inference server written in python, a hosted API for machine learning or something like [TFX](https://www.tensorflow.org/tfx/api_overview) to host your models. All of these solutions require detailed knowledge about machine learning, a significant financial investment and / or have a steep learning curve.

FuncAI makes it possible to use state of the art machine learning in PHP without external dependencies.

## Example

After you've taken care of the [installation](/guide/installation.md), using FuncAI PHP is as easy as:
``` php
$model = new \FuncAI\Models\Stylization();
$result = $model->predict([
  './avatar.jpg',
  './style.jpg',
]);
```

## Features

 - **Runs everywhere** - You only need PHP, **nothing else**
 - **Super simple API** - No machine learning knowledge required
 - **Many applications** - Wide range of machine learning applications ready to use

