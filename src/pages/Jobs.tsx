import { useState } from "react";
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/ProfileCard";

interface Job {
  id: number;
  title: string;
  company: {
    name: string;
    location: string;
    image: string;
  };
  description: string;
  promoted?: boolean;
  easyApply?: boolean;
  responseTime?: string;
}

const Jobs = () => {
  const [lookingStatus, setLookingStatus] = useState<"actively" | "casually" | null>(null);
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Software Intern - Frontend",
      company: {
        name: "Guidepoint",
        location: "Pune, Maharashtra, India (Hybrid)",
        image: "/public/placeholder.svg",
      },
      description: "1 school alum works here",
    },
    {
      id: 2,
      title: "Python Web Developer",
      company: {
        name: "Sav.com",
        location: "Pune, Maharashtra, India (On-site)",
        image: "/public/placeholder.svg",
      },
      description: "",
      promoted: true,
      easyApply: true,
    },
    {
      id: 3,
      title: "Fullstack Java Developer",
      company: {
        name: "Luxoft",
        location: "Pune, Maharashtra, India (Hybrid)",
        image: "/public/placeholder.svg",
      },
      description: "Response time is typically 4 days",
    },
  ]);

  const handleLookingStatus = (status: "actively" | "casually") => {
    setLookingStatus(status);
  };

  return (
    <div className="min-h-screen bg-linkedin-light">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left sidebar */}
          <div className="lg:col-span-3">
            <ProfileCard
              user={{
                name: "Rupali Khandare",
                title: "JICE • 2025 • Java|Python|SQL|MongoDB|Django|Git|DBMS|HTML • Pune, Maharashtra",
                image: "/public/placeholder.svg",
              }}
              showExperienceButton={true}
            />
            <div className="bg-white rounded-lg border border-gray-300 p-4 mt-4">
              <div className="flex space-x-2">
                <button className="text-gray-600">Preferences</button>
                <button className="text-gray-600">My jobs</button>
                <button className="text-gray-600">Interview prep</button>
              </div>
              <a href="#" className="block mt-4 text-linkedin-blue">
                Post a free job
              </a>
            </div>
          </div>

          {/* Main jobs section */}
          <div className="lg:col-span-6">
            {/* Job search prompt */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Rupali, are you looking for a new job?
                </h2>
                <p className="text-sm text-gray-600">
                  Add your preferences to find relevant jobs and get notified about new open roles.
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLookingStatus("actively")}
                  className={`px-4 py-2 rounded-full ${
                    lookingStatus === "actively"
                      ? "bg-linkedin-blue text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Actively looking
                </button>
                <button
                  onClick={() => handleLookingStatus("casually")}
                  className={`px-4 py-2 rounded-full ${
                    lookingStatus === "casually"
                      ? "bg-linkedin-blue text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Casually browsing
                </button>
              </div>
            </div>

            {/* Job listings */}
            <h2 className="text-lg font-semibold mb-4">Top job picks for you</h2>
            <p className="text-sm text-gray-600 mb-4">
              Based on your profile, preferences, and activity like applies, searches, and saves
            </p>

            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={job.company.image}
                    alt={job.company.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company.name} • {job.company.location}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                    <div className="flex space-x-2 mt-2">
                      {job.promoted && (
                        <span className="text-xs text-gray-600">Promoted</span>
                      )}
                      {job.easyApply && (
                        <span className="text-xs text-linkedin-blue">Easy Apply</span>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-600">✕</button>
                </div>
              </div>
            ))}

            <a href="#" className="block text-center text-linkedin-blue mt-4">
              Show all
            </a>
          </div>

          {/* Right sidebar (empty in screenshot, but adding placeholder for consistency) */}
          <div className="lg:col-span-3"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white rounded-lg border border-gray-300 p-4 mt-4 text-sm text-gray-600 space-y-2 mx-auto max-w-7xl">
        <div className="flex space-x-4">
          <a href="#" className="block">About</a>
          <a href="#" className="block">Accessibility</a>
          <a href="#" className="block">Help Center</a>
          <a href="#" className="block">Privacy & Terms</a>
          <a href="#" className="block">Ad Choices</a>
          <a href="#" className="block">Advertising</a>
          <a href="#" className="block">Business Services</a>
        </div>
        <p className="mt-4">LinkedIn Corporation © 2025</p>
      </footer>
    </div>
  );
};

export default Jobs;