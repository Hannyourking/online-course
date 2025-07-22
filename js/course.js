// Ambil ID course dari URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

fetch('data/courses.json')
  .then(res => res.json())
  .then(courses => {
    const course = courses.find(c => c.id == courseId);
    if (course) {
      const detailContainer = document.getElementById('course-detail');
      detailContainer.innerHTML = `
      <div class="col-md-6">
        <div class="card shadow-sm">
          <img src="${course.image}" class="card-img-top" alt="${course.title}">
          <div class="card-body">
            <h5 class="card-title">${course.title}</h5>
            <p class="card-text">${course.description}</p>
            <p><strong>Harga: ${course.price}</strong></p>
            <button onclick="goToEnroll(${course.id})" class="btn btn-success w-100">Daftar Sekarang</button>
          </div>
        </div>
      </div>
    `;
    
    } else {
      document.getElementById('course-detail').innerHTML = `<p>Course tidak ditemukan.</p>`;
    }
  });

function enroll(id) {
  alert(`Anda mendaftar course ID: ${id}`);
}
function goToEnroll(courseId) {
    // Simpan ID course yang dipilih ke localStorage
    localStorage.setItem('selectedCourse', courseId);
    // Pindah ke halaman enroll.html
    window.location.href = 'enroll.html';
  }
  
