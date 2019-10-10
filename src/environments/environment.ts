// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLAPI: 'http://localhost/CodeIgniter-3.0.1/',
  LOCALSTORAGE: 'Proyectofinal',

  facebook: 'sss',
  instagram: 'ss',
  twitter: 'ss',

  firebaseConfig: {
    apiKey: "AIzaSyBTrRnkYGf5omqUcJKqE8CZg9JeIrTHL5s",
    authDomain: "proyectofinal-5adb5.firebaseapp.com",
    databaseURL: "https://proyectofinal-5adb5.firebaseio.com",
    projectId: "proyectofinal-5adb5",
    storageBucket: "",
    messagingSenderId: "193965440998",
    appId: "1:193965440998:web:c64e8f067d57b86d"
  },

  metas: {
    title : 'Titulo de web',
    description : 'Descripcion por defecto',
    keywords : 'palabras',
    author : 'Autor',
    image : 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg',
    image_type : 'image/jpg',
    robots : 'index, follow', 
    url : ''
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
