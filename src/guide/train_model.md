# Train your own model
You can train your own models with funcAI-php without installing or even knowing machine learning libraries. Everything you need is PHP and Docker, then you're good to go.  

Try the following example that guides you through the steps and try it out with your own data afterwards.

## Image classifier
### Cats and dogs example
 > This installation instruction assumes you have [docker](https://docs.docker.com/get-docker/) installed on your system. 

#### 1. Setup laravel

```
git clone https://github.com/funcai/funcai-image-classification-sample.git
composer install
./vendor/bin/sail up
./vendor/bin/sail shell
./vendor/funcai/funcai-php/install.php
```

#### 2. Get the cats-dogs dataset
The cats-dogs dataset can be used to train a classifier which tells you if a given image contains a dog or a cat.

 - Download the [cats-dogs](https://www.microsoft.com/en-us/download/details.aspx?id=54765) dataset
 - Extract the zip file to the storage/app/ folder so that the final data structure looks like this:
   ```
   storage
     app
       PetImages
         Cat
         Dog
   ```

#### 3. Generate the FuncAI export
```
./vendor/bin/sail shell
php artisan images:export
```
Note that the export will take a while, because the images will be preprocessed for training.

In the meantime, feel free to have a look at `app/Console/Commands/ExportImage.php` to see how easy it is to create your own exports :)

Now the data is preprocessed and ready to be used for training a classifier.  

#### 4. Train image classifier
To now train the classifier run
```
docker run -v $PWD/image_classification/data/image-classification-export:/funcai-php/my-export \
  -v $PWD/storage/models:/funcai-php/models \
  -e data=/funcai-php/my-export \
  -e performance=fast \
  funcai/funcai-train-image-classifier:latest
```

#### 5. Try model
Now we can reap the rewards of our previous work. We can finally predict wether a picture is a cat or a dog. To do that,
we enter the sail shell again and execute the `php artisan images:classify` command:
```
./vendor/bin/sail shell
php artisan images:classify
```
We now see, that an example dog picture was successfully classified as a dog!

### Make it your own
> This part requires that you completed step 1 of the cats and dogs example.
#### 1. Preparing the data
Training with your own data is as easy as with the cats and dogs dataset. The directory where your training images are stored should have the following structure:
   ```
    my-data
      category1
        image1_1.jpg
        ...
      category2
        image2_1.jpg
        ...
   ```

#### 2. Generate the FuncAI export
Have a look at the script at `app/Console/Commands/ExportImage.php`. There are some things you'll need to change like the name of your task, the expected classes, and where those images can be found. Change that and then run 
```
./vendor/bin/sail shell
php artisan images:export
```
> If adjusting the script to your needs is challenging feel free to open an issue on [github](https://github.com/funcai/funcai-image-classification-sample).
#### 3. Train image classifier
To now train the classifier run
```
docker run -v $PWD/my-data:/funcai-php/my-export \
  -v $PWD/storage/models:/funcai-php/models \
  -e data=/funcai-php/my-export \
  -e performance=fast \
  funcai/funcai-train-image-classifier:latest
```

Here you should replace **my-data** with the path where your data is. For training you have three different performance options:
1. *Fast*  
Chose this option when you only care about fast predictions and precision is not your main goal.
2. *Balanced*  
If you cannot decide if fast or precise is the better option for you go with balanced.
3. *Precise*  
This is the way to go when time is not your concern and it is only about getting the correct prediction.

#### 4. Use your own classifier
Have a look at `app/Console/Commands/ClassifyImages.php`, you have to change that script so that it uses your new model instead of the cats and dogs one. For that, change the task name and performance level to the ones chosen before and adjust the storage path of the image to classify. When that is done enter the sail shell again and execute the `php artisan images:classify` command:
```
./vendor/bin/sail shell
php artisan images:classify
```
The output should be a successful classification of *your* image!

![Alt Text](https://media.giphy.com/media/FlWgXEtj5aM5G/giphy.gif)

### Possible applications
For what would such an image classifier be useful?  
Some ideas would be:  
- Automatically put user uploaded images in one of your predefined image categories
- Detect if an image fits to the topic of your website
  > For example on a website built to share recipes you could check if an image actually includes a meal
- Validate that an image is not [NSFW](https://www.urbandictionary.com/define.php?term=NFSW)  
