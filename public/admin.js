// API Base URL
const API_URL = 'http://localhost:3000/api';

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Load Settings
async function loadAdminSettings() {
    try {
        const response = await fetch(`${API_URL}/settings`);
        const settings = await response.json();
        
        document.getElementById('phone').value = settings.phone || '';
        document.getElementById('email').value = settings.email || '';
    } catch (error) {
        console.error('Lỗi khi tải cài đặt:', error);
    }
}

// Save Settings
async function saveSettings() {
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    
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
async function loadAdminSections() {
    try {
        const response = await fetch(`${API_URL}/sections`);
        const sections = await response.json();
        
        const container = document.getElementById('sectionsContainer');
        container.innerHTML = sections.map(section => `
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
async function saveSection(id) {
    const content = document.getElementById(`section-content-${id}`).value;
    const videoUrl = document.getElementById(`section-video-url-${id}`).value;
    const videoFile = document.getElementById(`section-video-file-${id}`).files[0];
    
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
            const uploadResult = await uploadResponse.json();
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
async function loadAdminCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const courses = await response.json();
        
        const container = document.getElementById('coursesContainer');
        
        if (courses.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666;">Chưa có khóa học nào</p>';
            return;
        }
        
        container.innerHTML = courses.map(course => `
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
function showAddCourseForm() {
    document.getElementById('addCourseForm').style.display = 'block';
    document.getElementById('courseTitle').value = '';
    document.getElementById('courseDescription').value = '';
    document.getElementById('courseVideoUrl').value = '';
    document.getElementById('courseVideo').value = '';
}

// Hide Add Course Form
function hideAddCourseForm() {
    document.getElementById('addCourseForm').style.display = 'none';
}

// Add Course
async function addCourse() {
    const title = document.getElementById('courseTitle').value;
    const description = document.getElementById('courseDescription').value;
    const videoUrl = document.getElementById('courseVideoUrl').value;
    const videoFile = document.getElementById('courseVideo').files[0];
    
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
            const uploadResult = await uploadResponse.json();
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
async function deleteCourse(id) {
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

// Edit Course (simplified - reuse add form)
async function editCourse(id) {
    alert('Chức năng sửa đang được phát triển. Hiện tại bạn có thể xóa và thêm lại khóa học.');
}

// Load Gallery for Admin
async function loadAdminGallery() {
    try {
        const response = await fetch(`${API_URL}/gallery`);
        const images = await response.json();
        
        const container = document.getElementById('galleryContainer');
        
        if (images.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666;">Chưa có hình ảnh nào</p>';
            return;
        }
        
        container.innerHTML = images.map(image => `
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
async function addGalleryImage() {
    const imageFile = document.getElementById('galleryImage').files[0];
    const caption = document.getElementById('galleryCaption').value;
    
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
        const uploadResult = await uploadResponse.json();
        
        await fetch(`${API_URL}/gallery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_url: uploadResult.url, caption })
        });
        
        alert('✅ Đã thêm ảnh thành công!');
        document.getElementById('galleryImage').value = '';
        document.getElementById('galleryCaption').value = '';
        loadAdminGallery();
    } catch (error) {
        console.error('Lỗi khi thêm ảnh:', error);
        alert('❌ Lỗi khi thêm ảnh');
    }
}

// Delete Gallery Image
async function deleteGalleryImage(id) {
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

// Initialize Admin
document.addEventListener('DOMContentLoaded', function() {
    loadAdminSettings();
    loadAdminSections();
    loadAdminCourses();
    loadAdminGallery();
});
