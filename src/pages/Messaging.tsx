
import NavBar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Search, Send } from "lucide-react";

const Messaging = () => {
  const [message, setMessage] = useState("");
  
  // Dummy data for messages
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Mandar Patil",
      avatar: "/lovable-uploads/c537598b-c6fa-42e9-ac7b-1cc824f19783.png",
      lastMessage: "Hello, how are you?",
      time: "2h",
      unread: true,
      messages: [
        { id: 1, text: "Hi there!", sender: "them", time: "10:30 AM" },
        { id: 2, text: "Hello, how are you?", sender: "them", time: "10:32 AM" },
      ]
    },
    {
      id: 2,
      name: "LinkedIn Jobs",
      avatar: "/public/placeholder.svg",
      lastMessage: "We found a job for you!",
      time: "1d",
      unread: false,
      messages: [
        { id: 1, text: "We found a job for you!", sender: "them", time: "Yesterday" },
      ]
    },
    {
      id: 3,
      name: "Career Insights",
      avatar: "/public/placeholder.svg",
      lastMessage: "Tips for your next interview",
      time: "2d",
      unread: false,
      messages: [
        { id: 1, text: "Tips for your next interview", sender: "them", time: "2 days ago" },
      ]
    }
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: selectedConversation.messages.length + 1,
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });
    setMessage("");
  };
  
  return (
    <div className="min-h-screen bg-linkedin-light">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Conversation List */}
          <div className="md:col-span-4">
            <Card>
              <CardContent className="p-0">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search messages" 
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div className="divide-y">
                  {conversations.map((conv) => (
                    <div 
                      key={conv.id}
                      className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${selectedConversation.id === conv.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <img 
                          src={conv.avatar} 
                          alt={conv.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conv.time}</span>
                        </div>
                        <p className={`text-sm truncate ${conv.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                          {conv.lastMessage}
                        </p>
                      </div>
                      {conv.unread && (
                        <div className="ml-2 w-2 h-2 bg-linkedin-blue rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Message Area */}
          <div className="md:col-span-8">
            <Card className="h-[calc(100vh-160px)] flex flex-col">
              <div className="border-b p-3 flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={selectedConversation?.avatar} 
                    alt={selectedConversation?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedConversation?.name}</h3>
                </div>
              </div>
              
              <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
                <div className="space-y-4">
                  {selectedConversation?.messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender !== 'me' && (
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1">
                          <img 
                            src={selectedConversation.avatar} 
                            alt={selectedConversation.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="max-w-[70%]">
                        <div 
                          className={`px-3 py-2 rounded-lg ${
                            msg.sender === 'me' 
                              ? 'bg-linkedin-blue text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${msg.sender === 'me' ? 'text-right' : ''}`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <div className="p-3 border-t flex">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="mr-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={sendMessage}
                  className="rounded-full bg-linkedin-blue"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messaging;
