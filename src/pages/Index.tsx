
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/ProfileCard";
import CreatePost, { getPosts, subscribeToPostUpdates } from "@/components/CreatePost";
import FeedPost from "@/components/FeedPost";
import TrendingPanel from "@/components/TrendingPanel";

const Index = () => {
  const [userPosts, setUserPosts] = useState([]);
  
  useEffect(() => {
    // Get initial posts
    setUserPosts(getPosts());
    
    // Subscribe to post updates
    const unsubscribe = subscribeToPostUpdates((posts) => {
      setUserPosts([...posts]);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-linkedin-light">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left sidebar */}
          <div className="lg:col-span-3">
            <ProfileCard />
          </div>
          
          {/* Main feed */}
          <div className="lg:col-span-6">
            <CreatePost />
            
            {/* User created posts */}
            {userPosts.map(post => (
              <FeedPost
                key={post.id}
                author={post.author}
                time={post.time}
                content={post.content}
                image={post.image}
                video={post.video}
              />
            ))}
            
            <FeedPost 
              author={{
                name: "Mandar Patil",
                title: "Data Analyst | Writes to 290k | Top 51 LinkedIn Creator Worldwide | EdTech",
                image: "/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png"
              }}
              time="9h"
              content="Why no one is giving me job opportunity 😪 😣"
              isJobSites={true}
            />
            
            <FeedPost 
              author={{
                name: "LinkedIn Jobs",
                title: "Official LinkedIn Jobs Page",
                image: "/public/placeholder.svg"
              }}
              time="2d"
              content="Looking for a role in software development? Check out this exciting opportunity at TechCorp!"
              jobAd={{
                title: "Senior React Developer",
                company: "TechCorp • San Francisco, CA",
                description: "We're seeking an experienced React developer to join our growing team. Remote work available with competitive salary and benefits.",
                link: "#"
              }}
            />
            
            <FeedPost 
              author={{
                name: "Career Insights",
                title: "Career Coaching & Advice",
                image: "/public/placeholder.svg"
              }}
              time="1d"
              content="Top tip for job seekers: Always customize your resume for each job application. Generic resumes are easy to spot and often quickly rejected. Take time to align your skills and experience with the specific requirements in the job description. This small effort can significantly increase your chances of getting an interview."
            />
          </div>
          
          {/* Right sidebar */}
          <div className="lg:col-span-3">
            <TrendingPanel />
            
            <div className="bg-white rounded-lg border border-gray-300 p-4 mt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <img src="/public/placeholder.svg" alt="Ad" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <p className="text-sm">Sonali, here's a 1-month free trial for Premium</p>
                </div>
              </div>
              
              <div className="flex mt-3">
                <img 
                  src="/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border border-white -mr-1" 
                />
                <div className="bg-linkedin-blue rounded-full text-white text-xs px-2 flex items-center">
                  Ad
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
