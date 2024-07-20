// Smooth Scrolling for Nav Links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    body.classList.add(currentTheme);

    if (currentTheme === 'light-theme') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeToggle.checked = true;
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeToggle.checked = false;
    }
}

themeToggle.addEventListener('change', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    if (body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light-theme');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark-theme');
    }
});

// Get blog posts from localStorage or initialize with an empty array
const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

// Function to save blog posts to localStorage
function saveBlogPosts() {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// Function to render blog posts in the dashboard
function renderDashboardPosts() {
    const postList = document.getElementById('post-list');
    if (!postList) return; // Exit if not on the dashboard page
    postList.innerHTML = '';
    blogPosts.forEach((post, index) => {
        postList.innerHTML += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${post.title}</td>
                <td>${post.date}</td>
                <td>
                    <button onclick="editPost(${index})" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editPostModal">Edit</button>
                    <button onclick="deletePost(${index})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
    });
    const totalPostsElement = document.getElementById('total-posts');
    if (totalPostsElement) totalPostsElement.innerText = blogPosts.length;
}

// Function to render blog posts in the blog page
function renderBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    if (!blogPostsContainer) return; // Exit if not on the blog page
    blogPostsContainer.innerHTML = '';
    blogPosts.forEach((post, index) => {
        const shortDescription = post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content;
        blogPostsContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card bg-dark text-white h-100">
                    <img src="images/pngtree-dark-grunge-room-web-design-concept-blogging-platform-photo-image_17739772.jpg" class="card-img-top" alt="Blog Image">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${shortDescription}</p>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="card-text mb-1"><small>by Robin Doak</small></p>
                                <p class="card-text"><small class="text-muted">${post.date}</small></p>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postModal${index}">Read More</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Read More Modal -->
            <div class="modal fade" id="postModal${index}" tabindex="-1" aria-labelledby="postModalLabel${index}" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-white">
                        <div class="modal-header">
                            <h5 class="modal-title" id="postModalLabel${index}">${post.title}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${post.content}</p>
                            <p class="text-muted"><small>Posted on ${post.date}</small></p>
                            <p class="text-muted"><small>by Robin Doak</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Function to delete a blog post
function deletePost(index) {
    blogPosts.splice(index, 1);
    saveBlogPosts();
    renderDashboardPosts();
    renderBlogPosts(); // Update blog page as well
}

// Function to create a new blog post
document.getElementById('new-post-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTitle = document.getElementById('new-post-title').value;
    const newContent = document.getElementById('new-post-content').value;
    const newDate = new Date().toLocaleDateString();

    blogPosts.push({ title: newTitle, content: newContent, date: newDate });
    saveBlogPosts();
    renderDashboardPosts();
    renderBlogPosts(); // Update blog page as well

    document.getElementById('new-post-form').reset();
    document.querySelector('#newPostModal .btn-close').click();
});

// Function to edit a blog post
function editPost(index) {
    const post = blogPosts[index];
    document.getElementById('edit-post-title').value = post.title;
    document.getElementById('edit-post-content').value = post.content;

    document.getElementById('edit-post-form').onsubmit = function(event) {
        event.preventDefault();
        post.title = document.getElementById('edit-post-title').value;
        post.content = document.getElementById('edit-post-content').value;
        post.date = new Date().toLocaleDateString();
        saveBlogPosts();
        renderDashboardPosts();
        renderBlogPosts(); // Update blog page as well
        document.querySelector('#editPostModal .btn-close').click();
    };
}

// Render blog posts on page load
document.addEventListener('DOMContentLoaded', function() {
    renderDashboardPosts();
    renderBlogPosts();
});
