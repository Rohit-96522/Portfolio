import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageSquare, X, ArrowUpRight, Loader2, Plus } from 'lucide-react'
import { PageTitle } from '../components/PageTitle'
import { supabase } from '../lib/supabase'

type GridSize = 8 | 16

interface Comment {
  id: string
  text: string
  created_at: string
}

interface Project {
  id: string
  grid_size: GridSize
  pixels: string[]
  description: string
  link: string
  likes: number
  isLiked?: boolean
  comments?: Comment[]
}

export function VisitorsPage() {
  const [feed, setFeed] = useState<Project[]>([])
  const [isLoadingFeed, setIsLoadingFeed] = useState(true)
  
  const [activeCommentProjectId, setActiveCommentProjectId] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setIsLoadingFeed(true)
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (projectsError) throw projectsError

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true })

      if (commentsError) throw commentsError

      const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]')

      const formattedFeed: Project[] = projectsData.map(p => ({
        ...p,
        isLiked: likedProjects.includes(p.id),
        comments: commentsData.filter(c => c.project_id === p.id)
      }))

      setFeed(formattedFeed)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoadingFeed(false)
    }
  }

  const toggleLike = async (id: string, currentlyLiked: boolean) => {
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]')
    
    // Optimistic UI update
    setFeed(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !currentlyLiked,
          likes: currentlyLiked ? p.likes - 1 : p.likes + 1
        }
      }
      return p
    }))

    try {
      const project = feed.find(p => p.id === id)
      if (!project) return
      
      const newLikesCount = currentlyLiked ? project.likes - 1 : project.likes + 1

      const { error } = await supabase
        .from('projects')
        .update({ likes: Math.max(0, newLikesCount) })
        .eq('id', id)

      if (error) throw error

      if (currentlyLiked) {
        localStorage.setItem('likedProjects', JSON.stringify(likedProjects.filter((pid: string) => pid !== id)))
      } else {
        localStorage.setItem('likedProjects', JSON.stringify([...likedProjects, id]))
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      fetchProjects() // Revert on failure
    }
  }

  const postComment = async (projectId: string) => {
    if (!newComment.trim()) return
    setIsPostingComment(true)
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          project_id: projectId,
          text: newComment
        }])
        .select()

      if (error) throw error

      if (data) {
        setFeed(prev => prev.map(p => {
          if (p.id === projectId) {
            return {
              ...p,
              comments: [...(p.comments || []), data[0]]
            }
          }
          return p
        }))
        setNewComment('')
      }
    } catch (error) {
      console.error('Error posting comment:', error)
      alert('Failed to post comment.')
    } finally {
      setIsPostingComment(false)
    }
  }

  const activeProjectForComments = feed.find(p => p.id === activeCommentProjectId)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <PageTitle title="VISITORS" className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white" />
        
        <Link 
          to="/pixels"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded font-mono text-sm uppercase tracking-widest hover:opacity-90 transition-opacity w-fit"
        >
          <Plus className="w-4 h-4" />
          Create Pixel Art
        </Link>
      </div>

      <section className="space-y-8">
        {isLoadingFeed ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
          </div>
        ) : feed.length === 0 ? (
          <div className="text-center space-y-4 py-24 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
            <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">No projects yet.</p>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">Be the first one to create a pixel and share your work.</p>
            <Link 
              to="/pixels"
              className="inline-block mt-4 px-6 py-2 border border-neutral-200 dark:border-neutral-800 rounded text-sm font-mono hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              CREATE YOUR PIXEL
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feed.map(project => (
              <div key={project.id} className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-950/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex flex-col group shadow-sm hover:shadow-md duration-300">
                <div 
                  className="w-full aspect-square border-b border-neutral-200 dark:border-neutral-800 grid bg-neutral-50 dark:bg-neutral-900/50"
                  style={{ 
                    gridTemplateColumns: `repeat(${project.grid_size}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${project.grid_size}, minmax(0, 1fr))`
                  }}
                >
                  {project.pixels.map((color, idx) => (
                    <div 
                      key={idx}
                      style={{ backgroundColor: color !== 'transparent' ? color : undefined }}
                    />
                  ))}
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 flex-1 whitespace-pre-wrap">
                    {project.description}
                  </p>
                  
                  {project.link && project.link.trim() !== '' && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors mb-6 w-fit"
                    >
                      View Project <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/60 pt-4 mt-auto">
                    <button 
                      onClick={() => toggleLike(project.id, project.isLiked || false)}
                      className={`flex items-center gap-1.5 transition-colors ${project.isLiked ? 'text-red-500' : 'hover:text-neutral-900 dark:hover:text-white'}`}
                    >
                      <Heart className={`w-4 h-4 ${project.isLiked ? 'fill-current' : ''} ${project.isLiked ? 'animate-pulse' : ''}`} />
                      <span className="font-mono">{project.likes}</span>
                    </button>
                    <button 
                      onClick={() => setActiveCommentProjectId(project.id)}
                      className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-mono">{project.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Comments Modal */}
      {activeCommentProjectId && activeProjectForComments && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-neutral-950/20 dark:bg-neutral-950/60 backdrop-blur-sm"
            onClick={() => setActiveCommentProjectId(null)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-mono font-bold tracking-widest text-neutral-900 dark:text-white">
                COMMENTS · {activeProjectForComments.comments?.length || 0}
              </h3>
              <button 
                onClick={() => setActiveCommentProjectId(null)}
                className="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950/30">
              {!activeProjectForComments.comments || activeProjectForComments.comments.length === 0 ? (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-8 font-mono">No comments yet.</p>
              ) : (
                activeProjectForComments.comments.map((comment, i) => (
                  <div key={comment.id}>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">{comment.text}</p>
                    {i !== activeProjectForComments.comments!.length - 1 && (
                      <hr className="border-neutral-200 dark:border-neutral-800 my-4" />
                    )}
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="flex flex-col gap-3">
                <textarea 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 rounded p-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-none h-20"
                />
                <button 
                  onClick={() => postComment(activeCommentProjectId)}
                  disabled={!newComment.trim() || isPostingComment}
                  className="w-full flex justify-center items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-sm uppercase tracking-widest py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isPostingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}