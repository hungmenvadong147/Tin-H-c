// API Base URL
const API_URL = 'http://localhost:3000/api';

// Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('navMenu').classList.remove('active');
    });
});

// Load Settings
async function loadSettings() {
    try {
        const response = await fetch(`${API_URL}/settings`);
        const settings = await response.json();
        
        if (settings.phone) {
            document.getElementById('header-phone').textContent = settings.phone;
        }
        if (settings.email) {
            document.getElementById('header-email').textContent = settings.email;
        }
    } catch (error) {
        console.error('Lỗi khi tải cài đặt:', error);
    }
}

// Load Sections
async function loadSections() {
    try {
        const response = await fetch(`${API_URL}/sections`);
        const sections = await response.json();
        
        sections.forEach((section, index) => {
            const contentDiv = document.getElementById(`section-${index + 1}-content`);
            const videoDiv = document.getElementById(`section-${index + 1}-video`);
            
            if (contentDiv) {
                contentDiv.innerHTML = section.content || '<p>Chưa có nội dung</p>';
            }
            
            if (videoDiv && section.video_url) {
                videoDiv.innerHTML = `<video controls><source src="${section.video_url}" type="video/mp4">Trình duyệt không hỗ trợ video.</video>`;
            }
        });
    } catch (error) {
        console.error('Lỗi khi tải sections:', error);
    }
}

// Load Courses
async function loadCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const courses = await response.json();
        
        const coursesGrid = document.getElementById('coursesGrid');
        
        if (courses.length === 0) {
            coursesGrid.innerHTML = '<p style="text-align: center; color: #666;">Chưa có khóa học nào</p>';
            return;
        }
        
        coursesGrid.innerHTML = courses.map(course => `
            <div class="course-card">
                ${course.video_url ? `<video controls><source src="${course.video_url}" type="video/mp4"></video>` : ''}
                <div class="course-card-content">
                    <h3>${course.title}</h3>
                    <p>${course.description || ''}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Lỗi khi tải khóa học:', error);
    }
}

// Load Gallery
async function loadGallery() {
    try {
        const response = await fetch(`${API_URL}/gallery`);
        const images = await response.json();
        
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (images.length === 0) {
            galleryGrid.innerHTML = '<p style="text-align: center; color: #666;">Chưa có hình ảnh nào</p>';
            return;
        }
        
        galleryGrid.innerHTML = images.map(image => `
            <div class="gallery-item">
                <img src="${image.image_url}" alt="${image.caption || 'Gallery image'}">
                ${image.caption ? `<div class="caption">${image.caption}</div>` : ''}
            </div>
        `).join('');
    } catch (error) {
        console.error('Lỗi khi tải gallery:', error);
    }
}

// Smooth scroll for navigation
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    loadSections();
    loadCourses();
    loadGallery();
});
