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

interface UploadResponse {
  success: boolean;
  url: string;
  error?: string;
}

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach((btn: Element): void => {
  btn.addEventListener('click', function(this: HTMLElement): void {
    const tabName = this.getAttribute('data-tab');
    
    if (!tabName) return;
    
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach((b: Element): void => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((c: Element): void => c.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    this.classList.add('active');
    const tabContent = document.getElementById(tabName);
    if (tabContent) {
      tabContent.classList.add('active');
    }
  });
});

// Load Settings
async function loadAdminSettings(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/settings`);
    const settings: Settings = await response.json();
    
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    
    if (phoneInput) phoneInput.value = settings.phone || '';
    if (emailInput) emailInput.value = settings.email || '';
  } catch (error) {
    console.error('Lỗi khi tải cài đặt:', error);
  }
}

// Save Settings
async function saveSettings(): Promise<void> {
  const phoneInput = document.getElementById('phone') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  
  const phone = phoneInput?.value || '';
  const email = emailInput?.value || '';
  
  try {
    await fetch(`${API_URL}/settings/phone`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: phone })
    });
    
    await fetch(`${API_URL}/settings/email`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: email })
    });
    
    alert('✅ Đã lưu cài đặt thành công!');
  } catch (error) {
    console.error('Lỗi khi lưu cài đặt:', error);
    alert('❌ Lỗi khi lưu cài đặt');
  }
}

// Load Sections for Admin
async function loadAdminSections(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/sections`);
    const sections: Section[] = await response.json();
    
    const container = document.getElementById('sectionsContainer');
    if (!container) return;
    
    container.innerHTML = sections.map((section: Section): string => `
      <div class="section-editor">
        <h3>${section.name}</h3>
        <div class="form-group">
          <label>Nội dung:</label>
          <textarea id="section-content-${section.id}" rows="6">${section.content || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Video:</label>
          <input type="file" id="section-video-file-${section.id}" accept="video/*">
          <small>Hoặc nhập URL video:</small>
          <input type="text" id="section-video-url-${section.id}" value="${section.video_url || ''}" placeholder="https://...">
        </div>
        <button class="btn btn-primary" onclick="saveSection(${section.id})">💾 Lưu</button>
      </div>
    `).join('');
  } catch (error) {
    console.error('Lỗi khi tải sections:', error);
  }
}

// Save Section
async function saveSection(id: number): Promise<void> {
  const contentTextarea = document.getElementById(`section-content-${id}`) as HTMLTextAreaElement;
  const videoUrlInput = document.getElementById(`section-video-url-${id}`) as HTMLInputElement;
  const videoFileInput = document.getElementById(`section-video-file-${id}`) as HTMLInputElement;
  
  const content = contentTextarea?.value || '';
  const videoUrl = videoUrlInput?.value || '';
  const videoFile = videoFileInput?.files?.[0];
  
  let finalVideoUrl = videoUrl;
  
  // Upload video file if selected
  if (videoFile) {
    const formData = new FormData();
    formData.append('file', videoFile);
    
    try {
      const uploadResponse = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const uploadResult: UploadResponse = await uploadResponse.json();
      finalVideoUrl = uploadResult.url;
    } catch (error) {
      console.error('Lỗi khi upload video:', error);
      alert('❌ Lỗi khi upload video');
      return;
    }
  }
  
  try {
    await fetch(`${API_URL}/sections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, video_url: finalVideoUrl })
    });
    
    alert('✅ Đã lưu nội dung thành công!');
  } catch (error) {
    console.error('Lỗi khi lưu section:', error);
    alert('❌ Lỗi khi lưu nội dung');
  }
}

// Load Courses for Admin
async function loadAdminCourses(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/courses`);
    const courses: Course[] = await response.json();
    
    const container = document.getElementById('coursesContainer');
    if (!container) return;
    
    if (courses.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #666;">Chưa có khóa học nào</p>';
      return;
    }
    
    container.innerHTML = courses.map((course: Course): string => `
      <div class="course-item">
        <h3>${course.title}</h3>
        <p>${course.description || ''}</p>
        ${course.video_url ? `<video controls style="max-width: 300px;"><source src="${course.video_url}" type="video/mp4"></video>` : ''}
        <div class="course-actions">
          <button class="btn btn-warning" onclick="editCourse(${course.id})">✏️ Sửa</button>
          <button class="btn btn-danger" onclick="deleteCourse(${course.id})">🗑️ Xóa</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Lỗi khi tải khóa học:', error);
  }
}

// Show Add Course Form
function showAddCourseForm(): void {
  const form = document.getElementById('addCourseForm') as HTMLElement;
  const titleInput = document.getElementById('courseTitle') as HTMLInputElement;
  const descInput = document.getElementById('courseDescription') as HTMLTextAreaElement;
  const videoUrlInput = document.getElementById('courseVideoUrl') as HTMLInputElement;
  const videoInput = document.getElementById('courseVideo') as HTMLInputElement;
  
  if (form) form.style.display = 'block';
  if (titleInput) titleInput.value = '';
  if (descInput) descInput.value = '';
  if (videoUrlInput) videoUrlInput.value = '';
  if (videoInput) videoInput.value = '';
}

// Hide Add Course Form
function hideAddCourseForm(): void {
  const form = document.getElementById('addCourseForm') as HTMLElement;
  if (form) form.style.display = 'none';
}

// Add Course
async function addCourse(): Promise<void> {
  const titleInput = document.getElementById('courseTitle') as HTMLInputElement;
  const descInput = document.getElementById('courseDescription') as HTMLTextAreaElement;
  const videoUrlInput = document.getElementById('courseVideoUrl') as HTMLInputElement;
  const videoInput = document.getElementById('courseVideo') as HTMLInputElement;
  
  const title = titleInput?.value || '';
  const description = descInput?.value || '';
  const videoUrl = videoUrlInput?.value || '';
  const videoFile = videoInput?.files?.[0];
  
  if (!title) {
    alert('⚠️ Vui lòng nhập tiêu đề khóa học');
    return;
  }
  
  let finalVideoUrl = videoUrl;
  
  // Upload video file if selected
  if (videoFile) {
    const formData = new FormData();
    formData.append('file', videoFile);
    
    try {
      const uploadResponse = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const uploadResult: UploadResponse = await uploadResponse.json();
      finalVideoUrl = uploadResult.url;
    } catch (error) {
      console.error('Lỗi khi upload video:', error);
      alert('❌ Lỗi khi upload video');
      return;
    }
  }
  
  try {
    await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, video_url: finalVideoUrl })
    });
    
    alert('✅ Đã thêm khóa học thành công!');
    hideAddCourseForm();
    loadAdminCourses();
  } catch (error) {
    console.error('Lỗi khi thêm khóa học:', error);
    alert('❌ Lỗi khi thêm khóa học');
  }
}

// Delete Course
async function deleteCourse(id: number): Promise<void> {
  if (!confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
    return;
  }
  
  try {
    await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE'
    });
    
    alert('✅ Đã xóa khóa học thành công!');
    loadAdminCourses();
  } catch (error) {
    console.error('Lỗi khi xóa khóa học:', error);
    alert('❌ Lỗi khi xóa khóa học');
  }
}

// Edit Course
async function editCourse(id: number): Promise<void> {
  alert('Chức năng sửa đang được phát triển. Hiện tại bạn có thể xóa và thêm lại khóa học.');
}

// Load Gallery for Admin
async function loadAdminGallery(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/gallery`);
    const images: GalleryImage[] = await response.json();
    
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    if (images.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #666;">Chưa có hình ảnh nào</p>';
      return;
    }
    
    container.innerHTML = images.map((image: GalleryImage): string => `
      <div class="gallery-admin-item">
        <img src="${image.image_url}" alt="${image.caption || ''}">
        <button class="delete-btn" onclick="deleteGalleryImage(${image.id})">×</button>
      </div>
    `).join('');
  } catch (error) {
    console.error('Lỗi khi tải gallery:', error);
  }
}

// Add Gallery Image
async function addGalleryImage(): Promise<void> {
  const imageInput = document.getElementById('galleryImage') as HTMLInputElement;
  const captionInput = document.getElementById('galleryCaption') as HTMLInputElement;
  
  const imageFile = imageInput?.files?.[0];
  const caption = captionInput?.value || '';
  
  if (!imageFile) {
    alert('⚠️ Vui lòng chọn ảnh');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', imageFile);
  
  try {
    const uploadResponse = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const uploadResult: UploadResponse = await uploadResponse.json();
    
    await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: uploadResult.url, caption })
    });
    
    alert('✅ Đã thêm ảnh thành công!');
    if (imageInput) imageInput.value = '';
    if (captionInput) captionInput.value = '';
    loadAdminGallery();
  } catch (error) {
    console.error('Lỗi khi thêm ảnh:', error);
    alert('❌ Lỗi khi thêm ảnh');
  }
}

// Delete Gallery Image
async function deleteGalleryImage(id: number): Promise<void> {
  if (!confirm('Bạn có chắc chắn muốn xóa ảnh này?')) {
    return;
  }
  
  try {
    await fetch(`${API_URL}/gallery/${id}`, {
      method: 'DELETE'
    });
    
    alert('✅ Đã xóa ảnh thành công!');
    loadAdminGallery();
  } catch (error) {
    console.error('Lỗi khi xóa ảnh:', error);
    alert('❌ Lỗi khi xóa ảnh');
  }
}

// Make functions globally available
(window as any).saveSettings = saveSettings;
(window as any).saveSection = saveSection;
(window as any).showAddCourseForm = showAddCourseForm;
(window as any).hideAddCourseForm = hideAddCourseForm;
(window as any).addCourse = addCourse;
(window as any).deleteCourse = deleteCourse;
(window as any).editCourse = editCourse;
(window as any).addGalleryImage = addGalleryImage;
(window as any).deleteGalleryImage = deleteGalleryImage;

// Initialize Admin
document.addEventListener('DOMContentLoaded', (): void => {
  loadAdminSettings();
  loadAdminSections();
  loadAdminCourses();
  loadAdminGallery();
});
