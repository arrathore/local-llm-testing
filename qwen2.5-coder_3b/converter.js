function convertToMp3() {
    const wavFileInput = document.getElementById('wavFileInput');
    const status = document.getElementById('status');

    if (wavFileInput.files.length === 0) {
        status.textContent = 'Please select a WAV file.';
        return;
    }

    const file = wavFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const audioContext = new AudioContext();
        const arrayBuffer = e.target.result;

        audioContext.decodeAudioData(arrayBuffer, function(buffer) {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);

            // Create a MediaRecorder instance
            const mediaRecorder = new MediaRecorder(source.stream);
            let chunks = [];

            mediaRecorder.ondataavailable = function(event) {
                chunks.push(event.data);
            };

            mediaRecorder.onstop = function() {
                const blob = new Blob(chunks, { type: 'audio/mpeg' });
                const url = URL.createObjectURL(blob);

                // Create a download link
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name.replace('.wav', '.mp3');
                a.click();

                // Clean up
                URL.revokeObjectURL(url);
            };

            mediaRecorder.start();
        });
    };

    reader.readAsArrayBuffer(file);
}
