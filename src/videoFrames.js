export class VideoToFrames {
  /**
     * Extracts frames from the video and returns them as an array of imageData
     * @param videoUrl url to the video file (html5 compatible format) eg: mp4
     * @param amount number of frames per second or total number of frames that you want to extract
     * @param type [fps, totalFrames] The method of extracting frames: Number of frames per second of video or the total number of frames acros the whole video duration. defaults to fps
     */
  static getFrames( videoUrl, amount, specificFrames) {
    return new Promise((resolve) => {
      let frames = []
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      let duration
  
      let video = document.createElement('video')
      video.crossOrigin = 'anonymous'
      video.preload = 'auto'
      let that = this
      
      video.addEventListener('loadeddata', async function () {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        duration = video.duration
  
        let totalFrames = amount
        let indexFrame = 0

        for (let time = 0; time < duration; time += duration / totalFrames) {
          console.log({ indexFrame, time })
          // GET SPECIFIC FRAMES
          if (specificFrames?.length) {
            const findFrame = specificFrames?.find(specificFrame => specificFrame === indexFrame) ?? null
            if (findFrame) {
            //   console.log('specific: ', indexFrame)
            //   console.log('specific: ', time)
              frames.push(await that.getVideoFrame(video, context, canvas, time))
            }
          } else {
            // SHOW ALL FRAMES
            frames.push(await that.getVideoFrame(video, context, canvas, time))
          }
          indexFrame++
        }
        resolve(frames)
      })
      video.src = videoUrl
      video.load()
    }
    )
  }
  
  static getVideoFrame(video, context, canvas, time) {
    return new Promise((resolve) => {
      let eventCallback = () => {
        video.removeEventListener('seeked', eventCallback)
        this.storeFrame(video, context, canvas, resolve)
      }
      video.addEventListener('seeked', eventCallback)
      video.currentTime = time
    }
    )
  }
  
  static storeFrame(video, context, canvas, resolve) {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    resolve(canvas.toDataURL())
  }
}
  