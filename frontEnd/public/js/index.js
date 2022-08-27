const root = document.querySelector('.root');

const url = 'http://127.0.0.1:5000/api/v1/bootcamps';
window.addEventListener('DOMContentLoaded', function () {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      let data = item.data;
      let courses = data[0].courses;
      let dataPush = [];
      for (let i = 0; i < data.length; i++) {
        for (let c = 0; c < courses.length; c++) {
          dataPush += `
				<h1>${courses[c].title}</h1>
				<h3>${courses[c].description}</h3>
				<h5>${courses[c].createdAt}</h5>`;
        }
      }
      root.innerHTML = dataPush;
    });
});
