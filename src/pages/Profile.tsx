import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, Pencil } from "lucide-react";
import { 
  ProfileEditor, 
  EducationOrExperienceEditor, 
  ProfilePhotoEditor,
  SkillsEditor
} from "@/components/ProfileEditor";

const Profile = () => {
  // Profile state with initial dummy data
  const [profile, setProfile] = useState({
    name: "Rupali Khandare",
    headline: "Student at Deogiri Institute of Engineering and Management Studies",
    location: "Aurangabad, Maharashtra, India",
    connections: 1110,
    profileViews: 120,
    postImpressions: 7,
    about: "I am a passionate engineering student with interest in web development and UI/UX design. Looking for opportunities to grow my skills in these areas.",
    photo: "/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png",
  });

  const [experience, setExperience] = useState([
    {
      role: "Web Design Intern",
      company: "ABC Technologies",
      duration: "Jun 2023 - Aug 2023 · 3 mos",
      description: "Worked on various web design projects using HTML, CSS, and JavaScript. Collaborated with the team to create responsive web interfaces."
    }
  ]);

  const [education, setEducation] = useState([
    {
      school: "Deogiri Institute of Engineering and Management Studies",
      degree: "Bachelor of Engineering - BE, Computer Science",
      duration: "2021 - 2025"
    },
    {
      school: "City College",
      degree: "Higher Secondary Certificate, Science",
      duration: "2019 - 2021"
    }
  ]);

  const [skills, setSkills] = useState([
    "HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "UI Design"
  ]);

  // Load profile data from localStorage if available
  useEffect(() => {
    const storedProfile = localStorage.getItem('linkedinProfile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(prevProfile => ({
          ...prevProfile,
          ...parsedProfile
        }));
      } catch (error) {
        console.error('Failed to parse profile data:', error);
      }
    }
  }, []);

  // Handlers for updating profile sections
  const handleProfileUpdate = (data: any) => {
    const updatedProfile = { ...profile, ...data };
    setProfile(updatedProfile);
    
    // Save to localStorage for sharing with other components
    const storedProfile = localStorage.getItem('linkedinProfile');
    const profileData = storedProfile ? JSON.parse(storedProfile) : {};
    localStorage.setItem('linkedinProfile', JSON.stringify({
      ...profileData,
      ...data
    }));
  };

  const handlePhotoChange = (photoUrl: string) => {
    setProfile({ ...profile, photo: photoUrl });
    // Note: ProfilePhotoEditor now handles saving to localStorage
  };

  const handleAddExperience = (item: any) => {
    setExperience([...experience, item]);
  };

  const handleEditExperience = (index: number, item: any) => {
    const updated = [...experience];
    updated[index] = item;
    setExperience(updated);
  };

  const handleDeleteExperience = (index: number) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setExperience(updated);
  };

  const handleAddEducation = (item: any) => {
    setEducation([...education, item]);
  };

  const handleEditEducation = (index: number, item: any) => {
    const updated = [...education];
    updated[index] = item;
    setEducation(updated);
  };

  const handleDeleteEducation = (index: number) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
  };

  return (
    <div className="min-h-screen bg-linkedin-light">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {/* Profile Header Card */}
        <Card className="mb-4 overflow-hidden rounded-lg">
          {/* Cover Image */}
          <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          
          <CardContent className="px-6 pb-6 relative">
            {/* Profile Picture */}
            <ProfilePhotoEditor 
              currentPhoto={profile.photo}
              onPhotoChange={handlePhotoChange}
            />
            
            {/* Edit Profile Button */}
            <div className="flex justify-end mt-2">
              <ProfileEditor
                section="profile"
                title="Profile"
                currentData={{
                  name: profile.name,
                  headline: profile.headline,
                  location: profile.location
                }}
                onSave={(data) => handleProfileUpdate(data)}
                fields={[
                  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { name: "headline", label: "Headline", type: "text", placeholder: "Your professional headline" },
                  { name: "location", label: "Location", type: "text", placeholder: "Your location" }
                ]}
              />
            </div>
            
            {/* Profile Info */}
            <div className="mt-14">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-700 mt-1">{profile.headline}</p>
              
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.location}</span>
                <span className="mx-2">•</span>
                <Link to="#" className="text-linkedin-blue font-medium">
                  {profile.connections} connections
                </Link>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button className="bg-linkedin-blue hover:bg-blue-700 rounded-full">Connect</Button>
                <Button variant="outline" className="rounded-full">Message</Button>
                <Button variant="outline" className="rounded-full">More</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* About Section */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">About</h2>
              <ProfileEditor
                section="about"
                title="About"
                currentData={{ about: profile.about }}
                onSave={(data) => handleProfileUpdate({ about: data.about })}
                fields={[
                  { name: "about", label: "About", type: "textarea", placeholder: "Write about yourself..." }
                ]}
              />
            </div>
            <p className="text-gray-700">{profile.about}</p>
          </CardContent>
        </Card>
        
        {/* Experience Section */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <EducationOrExperienceEditor
              section="experience"
              items={experience}
              onAdd={handleAddExperience}
              onEdit={handleEditExperience}
              onDelete={handleDeleteExperience}
            />
          </CardContent>
        </Card>
        
        {/* Education Section */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <EducationOrExperienceEditor
              section="education"
              items={education}
              onAdd={handleAddEducation}
              onEdit={handleEditEducation}
              onDelete={handleDeleteEducation}
            />
          </CardContent>
        </Card>
        
        {/* Skills Section */}
        <Card>
          <CardContent className="p-6">
            <SkillsEditor
              skills={skills}
              onSkillsChange={setSkills}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
