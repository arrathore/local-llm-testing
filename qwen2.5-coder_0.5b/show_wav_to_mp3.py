import sys

def convert_wav_to_mp3(wav_file_path, mp3_file_path):
    # Check if the WAV file exists
    if not os.path.exists(wav_file_path):
        print(f"Error: {wav_file_path} does not exist.")
        return
    
    # Use ffmpeg to convert the WAV file to MP3
    command = f"ffmpeg -i {wav_file_path} -vn -acodec libmp3enc -ar 44100 {mp3_file_path}"
    try:
        os.system(command)
        print(f"Conversion successful: {mp3_file_path}")
    except Exception as e:
        print(f"Error converting WAV to MP3: {e}")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python show_wav_to_mp3.py <wav_file_path> <mp3_file_path>")
        sys.exit(1)
    
    wav_file_path = sys.argv[1]
    mp3_file_path = sys.argv[2]
    convert_wav_to_mp3(wav_file_path, mp3_file_path)
