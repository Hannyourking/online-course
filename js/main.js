let allCourses = []; // menyimpan semua course
let currentKeyword = ''; // keyword pencarian
let currentPriceFilter = 'all'; // filter harga

// Ambil data course
fetch('data/courses.json')
  .then(res => res.json())
  .then(courses => {
    allCourses = courses;
    applyFilters();
  });

// Fungsi render daftar course
function renderCourses(courses) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // reset isi
  
    if (courses.length === 0) {
      courseList.innerHTML = '<p class="text-muted">Tidak ada course ditemukan.</p>';
      return;
    }
  
    courses.forEach(course => {
      const div = document.createElement('div');
      div.classList.add('col-md-4'); // grid 3 kolom
      div.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${course.image}" class="card-img-top" alt="${course.title}">
          <div class="card-body">
            <h5 class="card-title">${course.title}</h5>
            <p class="card-text">${course.description}</p>
            <p><strong>${course.price}</strong></p>
            <a href="course.html?id=${course.id}" class="btn btn-primary">Detail</a>
          </div>
        </div>
      `;
      courseList.appendChild(div);
    });
  }
  

// Fungsi menerapkan filter dan search
function applyFilters() {
  let filtered = allCourses;

  // Filter berdasarkan keyword
  if (currentKeyword) {
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(currentKeyword)
    );
  }

  // Filter berdasarkan harga
  if (currentPriceFilter === 'gratis') {
    filtered = filtered.filter(course =>
      course.price.toLowerCase() === 'gratis'
    );
  } else if (currentPriceFilter === 'berbayar') {
    filtered = filtered.filter(course =>
      course.price.toLowerCase() !== 'gratis'
    );
  }

  renderCourses(filtered);
}

// Event listener untuk search
document.getElementById('search-box').addEventListener('input', function(e) {
  currentKeyword = e.target.value.toLowerCase();
  applyFilters();
});

// Event listener untuk filter harga
document.getElementById('price-filter').addEventListener('change', function(e) {
  currentPriceFilter = e.target.value;
  applyFilters();
});
