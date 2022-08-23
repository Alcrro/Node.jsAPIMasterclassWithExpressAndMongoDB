const root = document.querySelector('.root');

// async function getData() {
//   const ids = await (
//     await fetch('http://127.0.0.1:5000/api/v1/bootcamps?select=name')
//   ).json();

//   const newIds = Object.values(ids);

//   const data = Promise.all(
//     newIds.map(
//       async () =>
//         await (
//           await fetch(`http://127.0.0.1:5000/api/v1/bootcamps?select=name`)
//         ).json()
//     )
//   );
//   return data;
// }

// getData().then((data) => {
//   root.innerHTML = data;
//   console.log(data);
// });

const menu = [
  {
    _id: '5d713995b721c3bb38c1f5d0',
    user: '5d7a514b5d2c12c7449be045',
    name: 'Devworks Bootcamp',
    description:
      'Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer',
    website: 'https://devworks.com',
    phone: '(111) 111-1111',
    email: 'enroll@devworks.com',
    address: '233 Bay State Rd Boston MA 02215',
    careers: ['Web Development', 'UI/UX', 'Business'],
    housing: true,
    jobAssistance: true,
    jobGuarantee: false,
    acceptGi: true,
    averageCost: 3000,
  },
  {
    _id: '5d713a66ec8f2b88b8f830b8',
    user: '5d7a514b5d2c12c7449be046',
    name: 'ModernTech Bootcamp',
    description:
      'ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX',
    website: 'https://moderntech.com',
    phone: '(222) 222-2222',
    email: 'enroll@moderntech.com',
    address: '220 Pawtucket St, Lowell, MA 01854',
    careers: ['Web Development', 'UI/UX', 'Mobile Development'],
  },
];
const url = 'http://127.0.0.1:5000/api/v1/bootcamps?select=name&limit=2';
window.addEventListener('DOMContentLoaded', function () {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      let data = item.data;
      let courses = data[0].courses;
      console.log(data);
      console.log(courses);
      let dataPush = [];
      for (let i = 0; i < data.length; i++) {
        for (let c = 0; c < courses.length; c++) {
          dataPush += `

				<h1>${courses[c].title}</h1>
				<h3>${courses[c].description}</h3>
				<h5>${courses[c].createdAt}</h5>

				`;
        }
      }
      root.innerHTML = dataPush;
      console.log(dataPush);
    });
});
