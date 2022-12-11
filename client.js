
const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {

  fetch('/click', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        console.log('click ');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

