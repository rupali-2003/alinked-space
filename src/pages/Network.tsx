
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { User, UserPlus, Users, Building, Grid2X2 } from "lucide-react";

const Network = () => {
  // Dummy connection suggestions
  const connectionSuggestions = [
    {
      id: 1,
      name: "Prakash Mehta",
      title: "Software Engineer at TechCorp",
      image: "/public/placeholder.svg",
      mutualConnections: 12
    },
    {
      id: 2,
      name: "Ananya Singh",
      title: "UX Designer at DesignHub",
      image: "/public/placeholder.svg",
      mutualConnections: 8
    },
    {
      id: 3,
      name: "Raj Patel",
      title: "Data Analyst at AnalyticsFirm",
      image: "/public/placeholder.svg",
      mutualConnections: 5
    },
    {
      id: 4,
      name: "Meera Sharma",
      title: "Product Manager at ProductCo",
      image: "/public/placeholder.svg",
      mutualConnections: 15
    }
  ];

  return (
    <div className="min-h-screen bg-linkedin-light">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left sidebar */}
          <div className="lg:col-span-3">
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="font-medium text-lg mb-3">Manage my network</h2>
                
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-start px-2">
                      <User className="w-5 h-5 mr-3" />
                      <span className="font-medium">Connections</span>
                      <span className="ml-auto font-medium">421</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start px-2">
                      <Users className="w-5 h-5 mr-3" />
                      <span>People I Follow</span>
                      <span className="ml-auto font-medium">67</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start px-2">
                      <Building className="w-5 h-5 mr-3" />
                      <span>Groups</span>
                      <span className="ml-auto font-medium">12</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start px-2">
                      <Grid2X2 className="w-5 h-5 mr-3" />
                      <span>Events</span>
                      <span className="ml-auto font-medium">4</span>
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-medium">Invitations</h2>
                  <Button variant="ghost" className="text-linkedin-blue text-sm">See all 8</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img src="/public/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Amit Patil</p>
                      <p className="text-sm text-gray-500">Backend Developer at CodeTech</p>
                      <p className="text-xs text-gray-500 mt-1">5 mutual connections</p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" className="rounded-full text-sm h-8">Ignore</Button>
                        <Button className="bg-linkedin-blue hover:bg-blue-700 rounded-full text-sm h-8">Accept</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img src="/public/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Neha Joshi</p>
                      <p className="text-sm text-gray-500">UI/UX Designer at DesignHub</p>
                      <p className="text-xs text-gray-500 mt-1">8 mutual connections</p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" className="rounded-full text-sm h-8">Ignore</Button>
                        <Button className="bg-linkedin-blue hover:bg-blue-700 rounded-full text-sm h-8">Accept</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-9">
            <h1 className="text-xl font-bold mb-4">People you may know</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectionSuggestions.map((connection) => (
                <Card key={connection.id} className="overflow-hidden">
                  <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden -mt-14 bg-white">
                        <img 
                          src={connection.image} 
                          alt={connection.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <h3 className="font-medium text-center mt-2">{connection.name}</h3>
                      <p className="text-sm text-gray-500 text-center">{connection.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{connection.mutualConnections} mutual connections</p>
                      
                      <Button 
                        variant="outline" 
                        className="w-full rounded-full mt-3 flex items-center justify-center"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="mx-auto mt-6 rounded-full block"
            >
              Show more
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Network;
