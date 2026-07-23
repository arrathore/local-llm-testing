const fileInput = document.getElementById('audioFile');
const convertBtn = document.getElementById('convertBtn');
const statusDiv = document.getElementById('status');
const previewAudio = document.getElementById('previewAudio');
const downloadLink = document.getElementById('downloadLink');

let selectedFile = null;

fileInput.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        
        // Validate file type
        const validTypes = ['audio/wav', 'application/x-wav'];
        const isWAV = validTypes.includes(selectedFile.type);
        
        statusDiv.textContent = `Selected: ${selectedFile.name}`;
        convertBtn.disabled = false;
    } else {
        selectedFile = null;
        fileInput.value = '';
    }
});

convertBtn.addEventListener('click', function() {
    if (!selectedFile) return;
    
    statusDiv.textContent = 'Converting...';
    downloadLink.style.display = 'none';
    previewAudio.style.display = 'block';
    
    // Create object URL for the file
    const audioUrl = URL.createObjectURL(selectedFile);
    previewAudio.src = audioUrl;
    previewAudio.play();

    // Simulate conversion process (in production, this would call a backend API)
    setTimeout(() => {
        statusDiv.textContent = 'Conversion complete!';
        
        // Create download link for converted file
        const blob = new Blob([selectedFile], { type: selectedFile.type });
        const mp3Url = URL.createObjectURL(blob);
        
        downloadLink.href = mp3Url;
        downloadLink.download = `${selectedFile.name.replace('.wav', '.mp3')}`;
        downloadLink.style.display = 'inline-block';
    }, 2000);
});

// Handle audio file type validation in browser
fileInput.addEventListener('change', function(e) {
    const files = e.target.files || [];
    
    if (files.length > 0 && !['audio/wav'].includes(files[0].type)) {
        statusDiv.textContent = 'Please select a WAV file';
        convertBtn.disabled = true;
    } else {
        selectedFile = files[0];
        const isWAV = ['audio/wav', 'application/x-wav'].includes(selectedFile.type);
        
        if (isWAV) {
            statusDiv.textContent = `Selected: ${selectedFile.name}`;
            convertBtn.disabled = false;
        } else {
            statusDiv.textContent = 'Please select a WAV file';
            convertBtn.disabled = true;
        }
    }
});

// Add event listener for audio preview on play/pause events to update UI state
previewAudio.addEventListener('ended', function() {
    // Audio playback finished - could add additional logic here if needed
});
