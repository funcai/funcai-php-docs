# Installation

#### 1. Install the package via [composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos):

    composer require funcai/funcai-php

#### 2. Download the tensorflow library:

    php vendor/funcai/funcai-php/install.php

This downloads tensorflow to `./tensorflow`.

#### 3. Download a model

    php vendor/funcai/funcai-php/install-stylization.php

This downloads the stylization model to `./models`

#### 4. Configure the models folder
You will need to move the models folder to a permanent location.
For example, move it to `/var/www/models` on your server. In that case make sure to set the base path accordingly:

    \FuncAI\Config::setModelBasePath('/var/www/models');

You can also move the folder directly into your project and check them into git, but the folder might get quite big (100 Mb up to multiple Gb).
