// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (event) => {
//   // Prevent the default behavior of the browser
//   event.preventDefault();
//   // Store the event for later use
//   deferredPrompt = event;

//   // Show the install button to the user
//   const installButton = document.getElementById('install-button');
//   installButton.style.display = 'block';

//   // Add a click event listener to the install button
//   installButton.addEventListener('click', () => {
//     // Show the installation prompt
//     deferredPrompt.prompt();

//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the PWA installation');
//       } else {
//         console.log('User declined the PWA installation');
//       }
//       deferredPrompt = null;
//       // Hide the install button
//       installButton.style.display = 'none';
//     });
//   });
// });
