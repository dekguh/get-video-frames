import { useState } from 'react'
import { VideoToFrames } from './videoFrames'

function App() {
  const [listFrames, setListFrames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fileVideo, setFileVideo] = useState(null)
  const [totalFrames, setTotalFrames] = useState(30)
  const [fromUrl, setFromUrl] = useState(null)
  const [specificFrames, setSpecificFrames] = useState([])

  const handleUploadChange = (event) => {
    const [file] = event.target.files
    setFileVideo(file)
  }

  const handleExtractClick = async () => {
    setIsLoading(true)
    const fileUrl = fromUrl ?? URL.createObjectURL(fileVideo)
    const frames = await VideoToFrames.getFrames(fileUrl, totalFrames, specificFrames)
    setIsLoading(false)

    setListFrames(frames)
  }

  return (
    <div className='p-6'>
      {/* UPLOAD */}
      <div className='mb-6'>
        <div className='mb-6'>
          <label className='border border-gray-400 py-4 px-6 text-gray-500 font-medium cursor-pointer'>
          Choose video
            <input
              type='file'
              className='hidden'
              accept='video/*'
              onChange={handleUploadChange}
            />
          </label>
        </div>

        <div className='my-4'>
          <label className='block'>Video from url (keep empty if via upload)</label>
          <input
            className='border border-gray-400 py-3 px-2'
            placeholder='video url'
            type='text'
            onChange={event => setFromUrl(event.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='block'>total frames</label>
          <input
            className='border border-gray-400 py-3 px-2'
            placeholder={totalFrames}
            type='number'
            onChange={event => setTotalFrames(Number(event.target.value))}
          />
        </div>

        <div className='my-4'>
          <label className='block'>show specific frames (keep empty for show all frames)</label>
          <input
            className='border border-gray-400 py-3 px-2'
            placeholder='ex: 1,9,30'
            type='text'
            onChange={event => setSpecificFrames(event.target.value.split(',').map(frame => Number(frame)))}
          />
        </div>

        {fileVideo?.name && <h6 className='my-4 font-medium'>video: {fileVideo?.name}</h6>}

        <button
          className='py-4 px-6 bg-blue-400 text-white disabled:cursor-not-allowed'
          onClick={() => handleExtractClick()}
        >
          {isLoading ? 'Processing...' : 'Extract Frames'}
        </button>
      </div>

      {/* LIST FRAMES */}
      <div className='flex flex-row flex-wrap'>
        {listFrames?.map((image, index) => (
          <img className='m-2 w-[160px]' src={image} key={index} />
        ))}
      </div>
    </div>
  )
}

export default App
