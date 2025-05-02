
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

interface FeedPostProps {
  author: {
    name: string;
    title: string;
    image: string;
  };
  time: string;
  content: string;
  jobAd?: {
    title: string;
    company: string;
    description: string;
    link: string;
  };
  isJobSites?: boolean;
  image?: string;
  video?: string;
}

export default function FeedPost({ author, time, content, jobAd, isJobSites, image, video }: FeedPostProps) {
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-300 mb-4 overflow-hidden">
      {/* Post Header */}
      <div className="p-3 flex">
        <div className="mr-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-sm">{author.name}</h3>
              <p className="text-xs text-linkedin-text">{author.title}</p>
              <div className="flex items-center text-xs text-linkedin-text">
                <span>{time}</span>
                <span className="mx-1">•</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"></path>
                  <path d="M8 2a.75.75 0 00-.75.75v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25v-4.25a.75.75 0 00-.75-.75z"></path>
                </svg>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="px-3 pb-2">
        <p className="text-sm mb-2">
          {content.length > 150 && !showMore 
            ? `${content.slice(0, 150)}...` 
            : content}
          {content.length > 150 && (
            <button 
              className="text-linkedin-blue font-medium ml-1" 
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "see less" : "see more"}
            </button>
          )}
        </p>
        
        {/* Image content */}
        {image && (
          <div className="mt-2 mb-3">
            <img 
              src={image} 
              alt="Post image" 
              className="w-full rounded-lg object-contain max-h-96" 
            />
          </div>
        )}
        
        {/* Video content */}
        {video && (
          <div className="mt-2 mb-3">
            <video 
              src={video} 
              controls 
              className="w-full rounded-lg max-h-96" 
            />
          </div>
        )}
        
        {isJobSites && (
          <div className="bg-gray-900 text-white p-4 rounded">
            <div className="text-xl font-bold mb-3">Top Websites for Job Seekers • 12 pages</div>
            <div className="flex justify-center">
              <div className="text-center">
                <div className="text-7xl font-bold text-yellow-400">10</div>
                <div className="text-2xl font-bold">Best Job Search Websites in 2025</div>
                <div className="mt-8 space-y-3 text-left">
                  <div className="text-xl">1. Indeed</div>
                  <div className="text-xl">2. LinkedIn</div>
                  <div className="text-xl">3. Dice</div>
                  <div className="text-xl">4. Glassdoor</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {jobAd && (
          <div className="border border-gray-300 rounded mt-3">
            <div className="p-3">
              <h4 className="font-medium">{jobAd.title}</h4>
              <p className="text-sm text-linkedin-text">{jobAd.company}</p>
              <p className="text-sm mt-2">{jobAd.description}</p>
            </div>
            <div className="border-t border-gray-300 p-3">
              <Button className="bg-linkedin-blue hover:bg-blue-700 text-white rounded-full text-sm">
                Apply Now
              </Button>
            </div>
          </div>
        )}
        
        {/* Reactions count */}
        {likes > 0 && (
          <div className="flex items-center mt-2 text-xs text-linkedin-text">
            <div className="flex -space-x-1 mr-1">
              <div className="w-4 h-4 rounded-full bg-linkedin-blue flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                  <path d="M8.86 1.999a1.27 1.27 0 00-1.714 0l-4.574 4.52A1.31 1.31 0 002 7.638a1.31 1.31 0 00.331.87l4.575 4.52a1.27 1.27 0 001.714 0 1.217 1.217 0 000-1.734l-2.407-2.077h7.037a1.267 1.267 0 001.277-1.254c0-.693-.57-1.254-1.277-1.254H6.213l2.407-2.077a1.217 1.217 0 000-1.733z" />
                </svg>
              </div>
            </div>
            {likes}
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="px-2 py-1 flex border-t border-gray-200">
        <Button 
          variant="ghost" 
          className={`flex-1 rounded-md text-sm ${liked ? 'text-linkedin-blue font-medium' : 'text-linkedin-text'}`}
          onClick={handleLike}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-5 h-5 mr-1 ${liked ? 'fill-linkedin-blue' : 'fill-current'}`}>
            <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
          </svg>
          Like
        </Button>
        
        <Button variant="ghost" className="flex-1 rounded-md text-sm text-linkedin-text">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-1" fill="currentColor">
            <path fillRule="evenodd" d="M7 9h10v1H7zm0 4h7v-1H7z"></path>
            <path fillRule="evenodd" d="M22 3H2v18h20zM4 18.5V5h16v13.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5z"></path>
          </svg>
          Comment
        </Button>
        
        <Button variant="ghost" className="flex-1 rounded-md text-sm text-linkedin-text">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-1" fill="currentColor">
            <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
          </svg>
          Share
        </Button>
      </div>
    </div>
  );
}
