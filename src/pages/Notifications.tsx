import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/ProfileCard";

interface Notification {
  id: number;
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
    link: string;
  };
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock data for notifications (similar to the screenshot)
    const mockNotifications: Notification[] = [
      {
        id: 1,
        author: {
          name: "Kohinoor Group Pune",
          title: "Promoted",
          image: "/public/placeholder.svg",
        },
        time: "12m",
        content: "SOFTWARE ENGINEER 30+ OPPORTUNITIES IN PUNE",
        jobAd: {
          title: "Software Engineer",
          company: "Kohinoor Group Pune",
          link: "#",
        },
      },
      {
        id: 2,
        author: {
          name: "Nitesh Thengde",
          title: "Professional Contact",
          image: "/public/placeholder.svg",
        },
        time: "42m",
        content: "commented on Harish Uthayakumar's post: But I think BlueLearn was the best community platform",
      },
      {
        id: 3,
        author: {
          name: "Gunjan M.",
          title: "Professional Contact",
          image: "/public/placeholder.svg",
        },
        time: "1h",
        content: "posted a photo",
      },
      {
        id: 4,
        author: {
          name: "Coding Ninjas",
          title: "Educational Platform",
          image: "/public/placeholder.svg",
        },
        time: "3h",
        content: "was live for Amazon SDE Resume Tips: STAND OUT and GET Shortlisted",
      },
      {
        id: 5,
        author: {
          name: "CareerForFreshers",
          title: "Job Opportunities",
          image: "/public/placeholder.svg",
        },
        time: "3h",
        content: "Mega Walk-In Drive on 3rd May 2025",
      },
    ];

    setNotifications(mockNotifications);
  }, []);

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
              showManageNotifications={true}
            />
          </div>

          {/* Main notifications feed */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-linkedin-blue text-white rounded-full">All</button>
                <button className="px-4 py-2 text-gray-600">Jobs</button>
                <button className="px-4 py-2 text-gray-600">My posts</button>
                <button className="px-4 py-2 text-gray-600">Mentions</button>
              </div>
            </div>

            {notifications.map((notification) => (
              <div key={notification.id} className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={notification.author.image}
                    alt={notification.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{notification.author.name}</p>
                    <p className="text-sm text-gray-600">{notification.content}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                    {notification.jobAd && (
                      <a href={notification.jobAd.link} className="text-linkedin-blue text-sm mt-1 block">
                        View jobs
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <img src="/public/placeholder.svg" alt="Kohinoor Group" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Kohinoor Group Pune</p>
                  <p className="text-sm text-gray-600">
                    Rupali, you might like to follow Kohinoor Group Pune!
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Visit the company page for Kohinoor Group Pune!
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Kishor & 14 other connections also follow
                  </p>
                </div>
              </div>
              <button className="mt-3 border border-linkedin-blue text-linkedin-blue rounded-full px-4 py-1">
                Follow
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4 mt-4 text-sm text-gray-600 space-y-2">
              <a href="#" className="block">About</a>
              <a href="#" className="block">Accessibility</a>
              <a href="#" className="block">Help Center</a>
              <a href="#" className="block">Privacy & Terms</a>
              <a href="#" className="block">Ad Choices</a>
              <a href="#" className="block">Advertising</a>
              <a href="#" className="block">Business Services</a>
              <a href="#" className="block">Get the LinkedIn app</a>
              <a href="#" className="block">More</a>
              <p className="mt-4">LinkedIn Corporation © 2025</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;