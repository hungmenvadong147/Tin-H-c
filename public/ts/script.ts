// API Base URL
const API_URL: string = 'http://localhost:3000/api';

// Interfaces
interface Settings {
  phone?: string;
  email?: string;
}

interface Section {
  id: number;
  name: string;
  content: string;
  video_url?: string;
}

interface Course {
  id: number;
  title: string;
  description?: string;
  video_url?: string;
  created_at: string;
}

interface GalleryImage {
  id: number;
  image_url: string;
  caption?: string;
}

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', (): void => {
    navMenu.classList.toggle('active');
  });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach((link: Element): void => {
  link.addEventListener('click', (): void => {
    navMenu?.classList.remove('active');
  });
});

// Load Settings
async function loadSettings(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/settings`);
    const settings: Settings = await response.json();
    
    const phoneElement = document.getElementById('header-phone');
    const emailElement = document.getElementById('header-email');
    
    if (settings.phone && phoneElement) {
      phoneElement.textContent = settings.phone;
    }
    if (settings.email && emailElement) {
      emailElement.textContent = settings.email;
    }
  } catch (error) {
    console.error('Lỗi khi tải cài đặt:', error);
  }
}

// Load Sections
async function loadSections(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/sections`);
    const sections: Section[] = await response.json();
    
    sections.forEach((section: Section, index: number): void => {
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
async function loadCourses(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/courses`);
    const courses: Course[] = await response.json();
    
    const coursesGrid = document.getElementById('coursesGrid');
    
    if (!coursesGrid) return;
    
    if (courses.length === 0) {
      coursesGrid.innerHTML = '<p style="text-align: center; color: #666;">Chưa có khóa học nào</p>';
      return;
    }
    
    coursesGrid.innerHTML = courses.map((course: Course): string => `
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
async function loadGallery(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/gallery`);
    const images: GalleryImage[] = await response.json();
    
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;
    
    if (images.length === 0) {
      galleryGrid.innerHTML = '<p style="text-align: center; color: #666;">Chưa có hình ảnh nào</p>';
      return;
    }
    
    galleryGrid.innerHTML = images.map((image: GalleryImage): string => `
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
const smoothScrollLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
smoothScrollLinks.forEach((anchor: Element): void => {
  anchor.addEventListener('click', function (this: HTMLElement, e: Event): void {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', (): void => {
  loadSettings();
  loadSections();
  loadCourses();
  loadGallery();
});
