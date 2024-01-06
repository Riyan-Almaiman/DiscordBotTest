const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

async function downloadAndCompressVideo(url) {
    if (!ytdl.validateURL(url)) {
        throw new Error('Invalid YouTube URL');
    }

    // Get video info to check duration
    const info = await ytdl.getInfo(url);
    const videoLengthSeconds = parseInt(info.videoDetails.lengthSeconds, 10);

    // Check if video duration exceeds 5 minutes (300 seconds)
    if (videoLengthSeconds > 300) {
        throw new Error('Video is longer than 5 minutes');
    }

    const tempFilePath = path.join(__dirname, 'tempVideo.mp4');
    const compressedFilePath = path.join(__dirname, 'compressedVideo.mp4');

    return new Promise((resolve, reject) => {
        ytdl(url, { filter: 'audioandvideo' })
            .pipe(fs.createWriteStream(tempFilePath))
            .on('finish', () => {
                ffmpeg(tempFilePath)
                    .setFfmpegPath(ffmpegStatic)
                    .videoCodec('libx264')
                    .audioCodec('aac')
                    .audioBitrate(96)
                    .videoBitrate(500)
                    .size('640x?')
                    .format('mp4')
                    .on('end', () => {
                        const stats = fs.statSync(compressedFilePath);
                        const fileSizeInMB = stats.size / 1024 / 1024;
                        fs.unlink(tempFilePath, (err) => {
                            if (err) console.error('Error deleting temp file:', err);
                        });

                        if (fileSizeInMB > 25) {
                            fs.unlink(compressedFilePath, (err) => {
                                if (err) console.error('Error deleting compressed file:', err);
                            });
                            reject('Compressed video exceeds 25 MB');
                        } else {
                            resolve(compressedFilePath);
                        }
                    })
                    .on('error', (err) => {
                        reject(err);
                    })
                    .save(compressedFilePath);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

module.exports = { downloadAndCompressVideo };
