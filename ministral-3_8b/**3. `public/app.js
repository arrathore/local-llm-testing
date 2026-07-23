document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const convertBtn = document.getElementById('convertBtn');
    const progressBar = document.getElementById('progressBar');
    const statusText = document.getElementById('statusText');
    const downloadLink = document.getElementById('downloadLink');

    // Drag & drop functionality
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropArea.style.borderColor = '#4a6fa5';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropArea.style.borderColor = '#ccc';
        }, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    // Click to browse
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            convertBtn.disabled = false;
        }
    });

    function handleDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length === 1 && files[0].type.startsWith('audio/wav')) {
            fileInput.files = files;
            convertBtn.disabled = false;
        } else {
            alert('Please select a valid WAV file.');
        }
    }

    // Convert to MP3
    convertBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) return;

        statusText.textContent = 'Converting...';
        progressBar.classList.remove('hidden');
        convertBtn.disabled = true;
        downloadLink.href = '#';

        try {
            // Simulate conversion (replace with actual backend API call)
            const response = await simulateConversion(file);
            downloadLink.href = URL.createObjectURL(response);
            downloadLink.textContent = file.name.replace('.wav', '.mp3');
            downloadLink.classList.remove('hidden');
            statusText.textContent = 'Conversion complete!';
        } catch (error) {
            console.error('Error:', error);
            statusText.textContent = 'Conversion failed. Check the console.';
        }
    });

    // Simulate conversion (replace with actual API call)
    async function simulateConversion(file) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const blob = new Blob([new Uint8Array(1024 * 1024)], { type: 'audio/mpeg' });
                resolve(blob);
            }, 1500); // Simulate delay
        });
    }
});
