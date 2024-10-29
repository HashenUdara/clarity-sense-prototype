"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Upload,
  FileAudio,
  Download,
  Play,
  Pause,
  Clock,
  Users,
} from "lucide-react";
import { AppSidebar } from "./app-sidebar";

export function ClaritySenseDashboardComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      setIsProcessing(true);
      // Simulating processing time
      setTimeout(() => {
        setTranscript(
          "This is a sample transcript of the uploaded audio file. In a real application, this would be generated by processing the audio file."
        );
        setIsProcessing(false);
      }, 2000);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const recentFiles = [
    { name: "interview.mp3", date: "2024-10-28" },
    { name: "lecture_notes.wav", date: "2024-10-27" },
    { name: "meeting_minutes.m4a", date: "2024-10-26" },
  ];

  const notifications = [
    {
      id: 1,
      message: "Your file 'interview.mp3' has been processed.",
      isNew: true,
    },
    {
      id: 2,
      message: "New feature: AI-powered noise reduction is now available!",
      isNew: true,
    },
    { id: 3, message: "Your subscription will renew in 5 days.", isNew: false },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* <Sidebar className="w-64 bg-white border-r">
          <SidebarHeader>
            <div className="p-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Clarity Sense
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <FileAudio className="mr-2 h-4 w-4" />
                  My Files
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </Sidebar> */}

        <AppSidebar />

        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Audio Processing Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Processed Files
                    </CardTitle>
                    <FileAudio className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">254</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Processing Time
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2s</div>
                    <p className="text-xs text-muted-foreground">
                      Average per file
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      +7% from last week
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Audio File</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="audio-upload"
                        accept="audio/*"
                      />
                      <label htmlFor="audio-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag and drop your audio file here, or click to select
                        </p>
                      </label>
                    </div>
                    {file && (
                      <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <FileAudio className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            {file.name}
                          </span>
                        </div>
                      </div>
                    )}
                    <Button
                      onClick={handleUpload}
                      disabled={!file || isProcessing}
                      className="w-full mt-4"
                    >
                      {isProcessing ? "Processing..." : "Upload and Process"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transcript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                      {transcript ? (
                        <p className="text-gray-700">{transcript}</p>
                      ) : (
                        <p className="text-gray-400 italic">
                          Transcript will appear here after processing
                        </p>
                      )}
                    </div>
                    <Button disabled={!transcript} className="w-full">
                      <Download className="mr-2 h-4 w-4" /> Download clean audio
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Audio Player</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={togglePlayPause}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <Slider
                        value={[audioProgress]}
                        max={100}
                        step={1}
                        className="w-full"
                        onValueChange={(value) => setAudioProgress(value[0])}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {Math.floor(audioProgress / 60)}:
                      {(audioProgress % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <FileAudio className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="text-sm text-gray-700">
                              {file.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {file.date}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-700">
                            {notification.message}
                          </span>
                          {notification.isNew && (
                            <Badge variant="secondary">New</Badge>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}