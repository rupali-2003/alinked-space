
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProfileCard() {
  // Get profile data from localStorage if available
  const [profile, setProfile] = useState({
    name: "Rupali khandare",
    headline: "Student at Deogiri Institute of Engineering and Management Studies",
    photo: "/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png",
    profileViews: 120,
    postImpressions: 6.5
  });

  // Check for profile updates from the Profile page
  useEffect(() => {
    const handleStorageChange = () => {
      const storedProfile = localStorage.getItem('linkedinProfile');
      if (storedProfile) {
        try {
          const parsedProfile = JSON.parse(storedProfile);
          setProfile(prev => ({
            ...prev,
            name: parsedProfile.name || prev.name,
            headline: parsedProfile.headline || prev.headline,
            photo: parsedProfile.photo || prev.photo
          }));
        } catch (error) {
          console.error('Failed to parse profile data:', error);
        }
      }
    };

    // Initial check
    handleStorageChange();

    // Create an event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up an interval to check for updates
    // This helps when localStorage is updated in the same window
    const intervalId = setInterval(handleStorageChange, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <div className="px-4 pt-0 pb-4">
        <div className="flex flex-col items-center">
          <Link to="/profile" className="w-16 h-16 -mt-8 rounded-full border-2 border-white overflow-hidden">
            <img 
              src={profile.photo} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </Link>
          <Link to="/profile" className="text-lg font-medium mt-2 hover:underline">{profile.name}</Link>
          <p className="text-sm text-linkedin-text text-center">{profile.headline}</p>
        </div>
        
        <div className="mt-3 border-t border-gray-200 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-linkedin-text">Profile viewers</span>
            <span className="text-linkedin-blue font-medium">{profile.profileViews}</span>
          </div>
          <div className="flex justify-between text-sm mt-1.5">
            <span className="text-linkedin-text">Post impressions</span>
            <span className="text-linkedin-blue font-medium">{profile.postImpressions}</span>
          </div>
        </div>
        
        <div className="mt-3 border-t border-gray-200 pt-3">
          <p className="text-sm text-linkedin-text">Access exclusive tools & insights</p>
          <Button variant="ghost" className="text-sm text-linkedin-text font-medium mt-1 pl-0 hover:bg-transparent">
            <span className="mr-2 text-amber-600">🏆</span> Your Premium features
          </Button>
        </div>
        
        <div className="mt-2 border-t border-gray-200 pt-3">
          <Button variant="ghost" className="text-sm text-linkedin-text font-medium pl-0 hover:bg-transparent">
            <span className="mr-2">🔖</span> Saved items
          </Button>
        </div>
      </div>
    </div>
  );
}
