class ResourceLoader {
    constructor() {
        this.placeholders = document.querySelectorAll('.content-placeholder');
        this.init();
    }

    init() {
        this.placeholders.forEach(placeholder => {
            const type = placeholder.dataset.type;
            const query = placeholder.dataset.query;
            
            // Create visual placeholder while resource is pending
            this.createPlaceholder(placeholder, type, query);
        });
    }

    createPlaceholder(element, type, query) {
        switch(type) {
            case 'image':
                element.innerHTML = `
                    <div class="resource-placeholder">
                        <p>📸 Image Placeholder: ${query}</p>
                        <button class="resource-action" onclick="resourceLoader.requestResource('${type}', '${query}', this)">
                            Add Image
                        </button>
                        <input type="file" class="resource-upload hidden" accept="image/*">
                        <div class="resource-options hidden">
                            <button class="use-ai">Generate with AI</button>
                            <button class="use-url">Use URL</button>
                            <button class="upload-file">Upload File</button>
                        </div>
                    </div>`;
                break;
            case 'video':
                element.innerHTML = `
                    <div class="resource-placeholder">
                        <p>🎥 Video Placeholder: ${query}</p>
                        <button class="resource-action" onclick="resourceLoader.requestResource('${type}', '${query}', this)">
                            Add Video
                        </button>
                        <div class="resource-options hidden">
                            <button class="use-url">Use URL</button>
                            <button class="upload-file">Upload File</button>
                            <button class="search-youtube">Search YouTube</button>
                        </div>
                    </div>`;
                break;
        }
    }

    requestResource(type, query, button) {
        const container = button.closest('.resource-placeholder');
        const options = container.querySelector('.resource-options');
        options.classList.remove('hidden');
        button.classList.add('hidden');

        // Set up event listeners for options
        options.querySelector('.use-url').addEventListener('click', () => {
            this.promptForUrl(container, type);
        });

        if (options.querySelector('.upload-file')) {
            options.querySelector('.upload-file').addEventListener('click', () => {
                const fileInput = container.querySelector('.resource-upload');
                fileInput.click();
            });
        }

        // Handle file uploads
        const fileInput = container.querySelector('.resource-upload');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files[0], container, type);
            });
        }
    }

    promptForUrl(container, type) {
        const url = prompt(`Enter ${type} URL:`);
        if (url) {
            this.validateAndInsertResource(url, container, type);
        }
    }

    handleFileUpload(file, container, type) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.validateAndInsertResource(e.target.result, container, type);
            };
            reader.readAsDataURL(file);
        }
    }

    validateAndInsertResource(url, container, type) {
        // Simple validation - could be enhanced
        if (type === 'image') {
            container.innerHTML = `<img src="${url}" alt="Resource image" class="resource-image">`;
        } else if (type === 'video') {
            container.innerHTML = `<video src="${url}" controls class="resource-video"></video>`;
        }
    }
}

// Initialize the resource loader
const resourceLoader = new ResourceLoader();
