# Architecture

Most of FuncAI-php application logic is written in PHP. We then use PHP's [FFI](https://www.php.net/manual/en/class.ffi.php) feature to access [Tensorflow](https://www.tensorflow.org/)'s c library which in turn runs your predictions on your CPU or GPU (coming later).

This architecture gives us the best of both worlds:

 - Easy to use, because all relevant code is written in PHP
 - Production ready performance, because all performance relevant code is written in c