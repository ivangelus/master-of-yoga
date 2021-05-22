<img src="./readme-logos/logo.png"> 
<br><br>
Build strength, awareness and harmony in both the mind and body.

To truly enjoy all the benefits of Yoga, proper form is not only desirable but necessary.  
However, you might have found yourself with neither the time nor the money to have lessons.  
Well, in that case, Master of Yoga was built with exactly you in mind!  

We are trying to combine the power of machine learning and the flexibility of the web browser  
to offer people with an all-around solution to practicing Yoga at your own pace, on your own  
schedule and wherever you feel most confortable.

By leveraging the use of your webcam, you will have on the fly feedback on your form as you  
transition between positions and work your way through our pre-defined beginner, intermediate  
or advanced tracks. But don't worry! If our list does not suit your needs or you're looking for  
something fresh, you can build your own custom routines. What matters is to keep practicing.  

Master all positions and collect medals along the way to becoming a Master of Yoga!  

Want to see what this is all about? We made a demo video: https://www.youtube.com/watch?v=GA051u0XuO4&list=WL&index=2.  
And if you want to use the application yourself, just go to https://masterofyoga.netlify.app.

Have fun!

*** This application is merely a proof of concept. All the code is available and free to use. ***

<br>

## Meet the Team
Ignacio Raphael Conti - https://github.com/ignaraph  
Ivan Gelo - https://github.com/IvanGelo1  
Mihael Machado de Souza - https://github.com/mihaelsouza  
Stefan Sarmir - https://github.com/stevo95  

<br>

## Folder Structure
```
── client ** React Frontend built using Create-React-App
│   ├── public
│   │   └── tfjs ** Holds each position's binary classifier
│   │
│   └── src
│       ├── assets
│       ├── components 
│       ├── containers 
│       ├── interfaces ** Reusable data transfer objects and their initial states
│       ├── pages ** General pages reached through navigation
│       ├── redux ** Redux store and slicers using redux's toolkits
│       ├── services ** Backend logic and Firebase storage and auth services
│       └── utilities ** Model initializers and drawing utilities
│
├── server ** Django backend
│   ├── routines ** Endpoints related to Yoga poses and pre-defined routines
│   ├── server ** General settings and firebase communication logic
│   └── users ** Endpoints dealing with user authorization and personal data
│
└── tensorflow-classifier  ** Template for training the binary classifiers
    ├── images ** Minimal dataset used to train the classifiers, 28 classes
    └── MobileNetV2 ** Used to extract keypoints from static images
```
<br>

## Tech Stack
### Frontend
<img src="./readme-logos/react.svg" height="45px"> <img src="./readme-logos/redux.svg" height="45px"> <img src="./readme-logos/axios.png" width="45px" height="45px"> <img src="./readme-logos/typescript.svg" height="45px"> 

### Backend
<img src="./readme-logos/django.svg" height="45px"> <img src="./readme-logos/python.svg" height="45px">

### Utilities
<img src="./readme-logos/firebase.svg" height="45px"> <img src="./readme-logos/tensorflow.svg" height="45px"> 
