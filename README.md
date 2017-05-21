# jquery.navigation-1.0.1
This plugin allows you to display a beautiful sliding menu with content on the custom sites effortlessly.Adaptive menu for screens larger than 991 pixels on small screens the menu is not displayed.
# Demo: The Basics Topics
## Setup
1. Create a basic **navigation** markup.Let's start with the description of the div element with the class container-fluid, I chose it specifically to stretch the menu the full width of the screen, you can use any other.
```html
<body>
    <div class="container-fluid">
        <div class="wrap-navigation">
            <div class="top-shadow"></div>
            <div class="wrap">
                <div class="nav-header">
                    <ul class="navigation list-unstyled">
                        <li>
                            <a href="#part1" class="text-uppercase default">
                                Part1
                            </a>
                        </li>
                        <li>
                            <a href="#part2" class="text-uppercase default">
                                Part2
                            </a>
                        </li>
                        <li>
                            <a href="#part3" class="text-uppercase default">
                                Part3
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="nav-body">
                    <div class="hide" id="part1">
                        <h3 class="text-center">Part1</h3>
                    </div>
                    <div class="hide" id="part2">
                        <h3 class="text-center">Part2</h3>
                    </div>
                    <div class="hide" id="part3">
                        <h3 class="text-center">Part3</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
```
2. To connect a file of styles.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your title</title>
    <link rel="stylesheet" href="css/jquery.navigation-1.0.1.css">
</head>
</html>
```
3. This plugin can work with **bootstrap.css** but it has to be connected at the beginning.
```html
<head>
    <meta charset="UTF-8">
    <title>Your title</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/jquery.navigation-1.0.1.css">
</head>
```
4. Now we need to connect before the closing body tag ***jquery*** file, I do it with ***google*** [go](https://developers.google.com/speed/libraries/#jquery).
```html
<body>
    
        ......
    //your markup
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</body>
```
5. It remains to connect the plugin file.
```html
<body>
    ......
    ......
    //your markup
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="js/jquery.navigation-1.0.1.js"></script>
</body>
```
6. Now by calling one method we run the plugin.
```html
<body>
    ......
    ......
    //your markup
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="js/jquery.navigation-1.0.1.js"></script>
    <script>
        $('ul.navigation').navigate();
    </script>
</body>
```
[Demo](https://andrey1787.github.io/jquery.navigation-1.0.1/)

# Documentation
## Configurations

> Example of a **navigation** object with configurations:

    $('ul.navigate').navigate({
        indent : 10,
        height : 200,
        speedX : 300,
        speedY : 300,
        width : 200
    });

## Basic Configuration

***The configuration options are passed into the navigation as an object on creation.***

| Config Property | Property Type | Example |      
     Description         | Default |
| :-------------: | :-----------: | :-----: | :---------: | :-----: |
| indent          | integer       | 5       | Indent the content from the navigation menu | 10      |
| height          | integer       | 150     | The height of the navigation menu            | 200     |
| speedX          | integer       | 500     | The speed of opening the content width           | 300     |
|speedY           | integer       | 500     | The speed of opening the content height          | 300     |
| width           | integer       | 150     | The width of the navigation menu            | 200     |

> Now, if you want to change the width and/or height of the navigation, you don't need to create a separate css file, and just pass these parameters to the **navigate** method in the configuration object.

```js
    $('ul.navigation').navigate({
        width : 150,
        height : 150
    });
```

> You can also do with the rest of the parameters alternating them or assigning all together.
> In the next version for convenience I will add some events.