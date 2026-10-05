import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { PageTitle } from '../components/PageTitle'
import { supabase } from '../lib/supabase'

type GridSize = 8 | 16

const PALETTE = [
  'transparent',
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', 
  '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
]

export function PixelProjectsPage() {
  const navigate = useNavigate()
  const [gridSize, setGridSize] = useState<GridSize>(8)
  const [pixels, setPixels] = useState<string[]>(Array(64).fill('transparent'))
  const [selectedColor, setSelectedColor] = useState<string>('#000000')
  const [isDrawing, setIsDrawing] = useState(false)
  
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  
  const [isPublishing, setIsPublishing] = useState(false)

  const handleSizeChange = (size: GridSize) => {
    if (size !== gridSize) {
      setGridSize(size)
      setPixels(Array(size * size).fill('transparent'))
    }
  }

  const handleClear = () => {
    setPixels(Array(gridSize * gridSize).fill('transparent'))
  }

  const paintPixel = (index: number) => {
    setPixels(prev => {
      const newPixels = [...prev]
      newPixels[index] = selectedColor
      return newPixels
    })
  }

  const handleMouseDown = (index: number) => {
    setIsDrawing(true)
    paintPixel(index)
  }

  const handleMouseEnter = (index: number) => {
    if (isDrawing) {
      paintPixel(index)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handlePublish = async () => {
    const hasPixels = pixels.some(p => p !== 'transparent')
    if (!hasPixels) return alert('Please draw something on the canvas.')
    if (!description.trim()) return alert('Please enter a project description.')
    if (link.trim() !== '' && !isValidUrl(link)) return alert('Please enter a valid project URL (e.g., https://example.com)')

    setIsPublishing(true)
    try {
      const { error } = await supabase
        .from('projects')
        .insert([{
          grid_size: gridSize,
          pixels: pixels,
          description: description,
          link: link,
          likes: 0
        }])

      if (error) throw error

      // Redirect to visitors page on success
      navigate('/visitors')
    } catch (error) {
      console.error('Error publishing project:', error)
      alert('Failed to publish project. Make sure you connected Supabase!')
      setIsPublishing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <section className="space-y-12">
        <PageTitle title="PIXEL//STUDIO" className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          {/* Left Column: Canvas and Tools */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-4">Create Your Pixel</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleSizeChange(8)}
                  className={`px-4 py-2 text-sm font-mono border rounded transition-colors ${gridSize === 8 ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white' : 'bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'}`}
                >
                  8 × 8
                </button>
                <button 
                  onClick={() => handleSizeChange(16)}
                  className={`px-4 py-2 text-sm font-mono border rounded transition-colors ${gridSize === 16 ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white' : 'bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'}`}
                >
                  16 × 16
                </button>
              </div>
            </div>

            <div 
              className="w-full aspect-square border border-neutral-200 dark:border-neutral-800 grid cursor-crosshair bg-neutral-50 dark:bg-neutral-900/50 rounded overflow-hidden"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
              }}
            >
              {pixels.map((color, idx) => (
                <div 
                  key={idx}
                  onMouseDown={() => handleMouseDown(idx)}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  className="border-r border-b border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-75 select-none"
                  style={{ 
                    backgroundColor: color !== 'transparent' ? color : undefined,
                    borderRightWidth: (idx + 1) % gridSize === 0 ? 0 : 1,
                    borderBottomWidth: idx >= gridSize * (gridSize - 1) ? 0 : 1
                  }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PALETTE.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 relative ${selectedColor === color ? 'border-neutral-900 dark:border-white scale-110' : 'border-neutral-200 dark:border-neutral-800'}`}
                    style={{ backgroundColor: color === 'transparent' ? '#f5f5f5' : color }}
                    aria-label={`Select color ${color}`}
                  >
                    {color === 'transparent' && <span className="absolute inset-0 m-[2px] rounded-full bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#ccc_2px,#ccc_4px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#444_2px,#444_4px)] pointer-events-none"></span>}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleClear}
                className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                [ Clear Canvas ]
              </button>
            </div>
          </div>

          {/* Right Column: Details and Submission */}
          <div className="space-y-6 lg:pt-[4.5rem]">
            <div>
              <label className="block text-sm font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-2">Project Description</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value.slice(0, 300))}
                placeholder="Tell other developers what you built..."
                className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 rounded p-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-none h-32"
              />
              <div className="text-right text-xs text-neutral-400 mt-1 font-mono">{description.length}/300</div>
            </div>

            <div>
              <label className="block text-sm font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-2">Project Link (Optional)</label>
              <input 
                type="url"
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://... (optional)"
                className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 rounded p-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
            </div>

            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full flex justify-center items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-sm uppercase tracking-widest py-4 rounded hover:opacity-90 transition-opacity mt-4 disabled:opacity-50"
            >
              {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Project'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
