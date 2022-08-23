const feedDisplay = document.querySelector('.root');

// fetch('http://127.0.0.1:5000/api/v1/bootcamps')
//   .then((response) => response.json())
//   .then((data) => {
//     feedDisplay.innerHTML = JSON.stringify(data);
//   });

// const url = 'http://127.0.0.1:5000/api/v1/bootcamps';

// getData(url).then((data) => console.log(data));

// async function getData(url) {
//   const response = await fetch(url);
//   const data = await response.json();
//   const arrOfPromises = data.map((item) => {
//     fetch('http://127.0.0.1:5000/api/v1/bootcamps');
//   });
//   return Promise.all(arrOfPromises);
// }

window.addEventListener('DOMContentLoaded', function () {
  const newData = request();
  let result = [newData].map(function (item) {
    return new request(item);
  });
  console.log(result);
});

const api = 'http://127.0.0.1:5000/api/v1/navbar';

const request = async function getListening() {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

// request();
