
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingItemProps {
  title: string;
  time: string;
  readers: number;
}

function TrendingItem({ title, time, readers }: TrendingItemProps) {
  return (
    <div className="mb-3 last:mb-0">
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-xs text-linkedin-text">{time} ago • {readers} readers</p>
    </div>
  );
}

export default function TrendingPanel() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-3 flex justify-between items-center border-b border-gray-200">
        <h2 className="font-medium">Trending Now</h2>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4 text-gray-600" fill="currentColor">
            <path d="M8 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
        </div>
      </div>
      
      <div className="p-3">
        <div className="text-xs text-linkedin-text mb-2">curated by LinkedIn News</div>
        
        <TrendingItem
          title="Credit growth remains sluggish"
          time="4h"
          readers={407}
        />
        
        <TrendingItem
          title="Influencer economy shifts gears"
          time="3h"
          readers={347}
        />
        
        <TrendingItem
          title="Retailers cash in on AI"
          time="4h"
          readers={250}
        />
        
        <TrendingItem
          title="Demand for office leasing surge"
          time="2h"
          readers={195}
        />
        
        <TrendingItem
          title="Digital media zooms past television"
          time="4h"
          readers={163}
        />
        
        <div className="mt-3">
          <Button 
            variant="ghost" 
            className="w-full justify-center text-sm text-linkedin-text hover:bg-gray-100"
          >
            Show more <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-3">
        <h2 className="font-medium mb-3">Today's puzzles</h2>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded mr-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M5 5h2v2H5zm4 0h2v2H9zm0 4H7v2h2zm0 4H7v2h2zm-4 0h2v2H5zm12-8h2v2h-2zm-4 0h2v2h-2zm4 4h-2v2h2zm0 4h-2v2h2zm-4 0h2v2h-2zm-8 4h12v2H5z"></path>
              </svg>
            </div>
            <div>
              <div className="font-medium text-sm">Zip</div>
              <div className="text-xs text-linkedin-text">3 connections played</div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-linkedin-text" />
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded mr-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M19 5H5v2h14zm0 4H5v2h14zm0 4H5v2h14zm0 4H5v2h14z"></path>
              </svg>
            </div>
            <div>
              <div className="font-medium text-sm">Tango</div>
              <div className="text-xs text-linkedin-text">Harmonize the grid</div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-linkedin-text" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-500 rounded mr-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M4 2v20h16V2zm14 18H6V4h12z M10 7H8v2h2zm4 0h-2v2h2zm-4 4H8v2h2zm4 0h-2v2h2zm-4 4H8v2h2zm4 0h-2v2h2z"></path>
              </svg>
            </div>
            <div>
              <div className="font-medium text-sm">Queens</div>
              <div className="text-xs text-linkedin-text">Crown each region</div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-linkedin-text" />
        </div>
        
        <div className="mt-3">
          <Button 
            variant="ghost" 
            className="w-full justify-center text-sm text-linkedin-text hover:bg-gray-100"
          >
            Show more <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
