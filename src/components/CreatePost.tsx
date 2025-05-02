
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Image, FileVideo, Calendar, X } from "lucide-react";
import { toast } from "sonner";

// Create a post context/store
let posts = [];
let postUpdateListeners = [];

// Function to subscribe to post updates
export function subscribeToPostUpdates(callback) {
  postUpdateListeners.push(callback);
  return () => {
    postUpdateListeners = postUpdateListeners.filter(cb => cb !== callback);
  };
}

// Function to get all posts
export function getPosts() {
  return [...posts];
}

// Function to add a new post
export function addPost(post) {
  posts = [post, ...posts];
  postUpdateListeners.forEach(callback => callback(posts));
}

export default function CreatePost() {
  const [postText, setPostText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  const handleCreatePost = () => {
    if (!postText.trim() && !selectedImage && !selectedVideo) {
      toast.error("Please add some content to your post");
      return;
    }
    
    const newPost = {
      id: Date.now(),
      author: {
        name: "Sonali Kotlapure",
        title: "Student at Deogiri Institute of Engineering and Management Studies",
        image: "/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png"
      },
      content: postText,
      time: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      image: selectedImage,
      video: selectedVideo,
      scheduled: isScheduleOpen ? `${scheduleDate} ${scheduleTime}` : null
    };
    
    addPost(newPost);
    
    setPostText("");
    setSelectedImage(null);
    setSelectedVideo(null);
    setIsScheduleOpen(false);
    setScheduleDate("");
    setScheduleTime("");
    setIsDialogOpen(false);
    
    toast.success(isScheduleOpen ? "Post scheduled successfully" : "Post created successfully");
  };
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedVideo(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src="/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex-1 justify-start text-linkedin-text text-sm font-normal rounded-full h-12 border-gray-300 hover:bg-gray-100 hover:border-gray-300"
            >
              Start a post
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create a post</DialogTitle>
            </DialogHeader>
            
            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <p className="font-medium">Sonali Kotlapure</p>
                <Button variant="outline" size="sm" className="text-xs rounded-full mt-1 h-6 px-3">
                  Public
                </Button>
              </div>
            </div>
            
            <textarea 
              className="w-full border-none outline-none resize-none h-32 placeholder:text-gray-500"
              placeholder="What do you want to talk about?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            
            {/* Image preview */}
            {selectedImage && (
              <div className="relative mt-2">
                <img 
                  src={selectedImage} 
                  alt="Selected image" 
                  className="max-h-64 rounded-lg object-contain" 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full h-7 w-7 p-1"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Video preview */}
            {selectedVideo && (
              <div className="relative mt-2">
                <video 
                  src={selectedVideo} 
                  controls 
                  className="max-h-64 w-full rounded-lg" 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full h-7 w-7 p-1"
                  onClick={handleRemoveVideo}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Schedule options */}
            {isScheduleOpen && (
              <div className="flex flex-col gap-2 mt-2 p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Schedule for later</h3>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 block mb-1">Date</label>
                    <Input 
                      type="date" 
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 block mb-1">Time</label>
                    <Input 
                      type="time" 
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={selectedVideo !== null}
                  >
                    <Image className="h-5 w-5 text-gray-600" />
                  </Button>
                  
                  <input
                    type="file"
                    accept="video/*"
                    ref={videoInputRef}
                    onChange={handleVideoSelect}
                    className="hidden"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={selectedImage !== null}
                  >
                    <FileVideo className="h-5 w-5 text-gray-600" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-full ${isScheduleOpen ? 'bg-gray-200' : ''}`}
                    onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                  >
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
                <Button 
                  className="rounded-full bg-linkedin-blue"
                  disabled={!postText.trim() && !selectedImage && !selectedVideo}
                  onClick={handleCreatePost}
                >
                  {isScheduleOpen ? 'Schedule' : 'Post'}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex justify-between mt-3 pt-1">
        <Button 
          variant="ghost" 
          className="flex-1 text-sm text-linkedin-text hover:bg-gray-100 hover:text-linkedin-text"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="w-5 h-5 text-blue-600 mr-2" />
          Media
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex-1 text-sm text-linkedin-text hover:bg-gray-100 hover:text-linkedin-text"
          onClick={() => {
            setIsScheduleOpen(true);
            setIsDialogOpen(true);
          }}
        >
          <Calendar className="w-5 h-5 text-amber-700 mr-2" />
          Event
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex-1 text-sm text-linkedin-text hover:bg-gray-100 hover:text-linkedin-text"
          onClick={() => videoInputRef.current?.click()}
        >
          <FileVideo className="w-5 h-5 text-orange-600 mr-2" />
          Video
        </Button>
      </div>
    </div>
  );
}
