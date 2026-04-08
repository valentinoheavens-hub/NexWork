import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  
  const chats = [
    { id: 1, name: "John Doe", company: "Acme Corp", lastMsg: "The logo concepts look great!", time: "2m ago", unread: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
    { id: 2, name: "Sarah Smith", company: "Global Tech", lastMsg: "Can we schedule a call for tomorrow?", time: "1h ago", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 3, name: "Mike Ross", company: "Zest Foods", lastMsg: "Invoice received, thank you.", time: "3h ago", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  ];

  const messages = [
    { id: 1, sender: "John Doe", text: "Hi Felix, I've reviewed the initial discovery document.", time: "10:30 AM", isMe: false },
    { id: 2, sender: "Me", text: "Great! Any specific feedback on the target audience section?", time: "10:35 AM", isMe: true },
    { id: 3, sender: "John Doe", text: "It's spot on. I think we should lean more into the 'premium' feel for the brand identity.", time: "10:40 AM", isMe: false },
    { id: 4, sender: "John Doe", text: "The logo concepts look great!", time: "10:42 AM", isMe: false },
  ];

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-160px)] flex gap-6">
        {/* Chat List */}
        <Card className="w-80 border-none shadow-sm flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search messages..." className="pl-10 bg-slate-50 border-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={cn(
                  "w-full p-4 flex gap-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50",
                  activeChat === chat.id && "bg-indigo-50/50 border-l-4 border-l-indigo-600"
                )}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{chat.name}</h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="flex-1 border-none shadow-sm flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={chats.find(c => c.id === activeChat)?.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-slate-900">{chats.find(c => c.id === activeChat)?.name}</h4>
                <p className="text-xs text-emerald-500 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-400"><Phone className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="text-slate-400"><Video className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="text-slate-400"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[70%] p-4 rounded-2xl text-sm shadow-sm",
                  msg.isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none"
                )}>
                  <p>{msg.text}</p>
                  <p className={cn("text-[10px] mt-2", msg.isMe ? "text-indigo-200" : "text-slate-400")}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-slate-400 shrink-0">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input 
                placeholder="Type your message..." 
                className="flex-1 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-indigo-500"
              />
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;