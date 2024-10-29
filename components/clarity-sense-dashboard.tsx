"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Upload,
  FileAudio,
  Download,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "./ui/separator";

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

  // const notifications = [
  //   {
  //     id: 1,
  //     message: "Your file 'interview.mp3' has been processed.",
  //     isNew: true,
  //   },
  //   {
  //     id: 2,
  //     message: "New feature: AI-powered noise reduction is now available!",
  //     isNew: true,
  //   },
  //   { id: 3, message: "Your subscription will renew in 5 days.", isNew: false },
  // ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Clarity Sense</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Audio Processing Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-screen-2xl  py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className=" mb-10 ">
              <h2 className="text-3xl  font-bold tracking-tight">
                Denoise and Transcribe with Ease
              </h2>
              <p className="text-muted-foreground">
                Clean up your audio and get detailed transcripts in seconds.{" "}
                Just upload, process, and download
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className=" flex flex-col gap-4  justify-between">
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
                      size={"lg"}
                      className="w-full mt-4 rounded-full"
                    >
                      {isProcessing ? "Processing..." : "Upload and Process"}
                    </Button>
                  </CardContent>
                </Card>
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
              </div>

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
                  <Card className="my-4">
                    <CardHeader>
                      <CardTitle>Audio Player</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className=" flex space-x-2 items-center">
                          <Button
                            onClick={togglePlayPause}
                            size="icon"
                            variant={"outline"}
                            className="size-9 rounded-full"
                          >
                            <ChevronLeft className="size-3" />
                          </Button>
                          <Button
                            onClick={togglePlayPause}
                            size="icon"
                            variant={"secondary"}
                            className="h-10 w-10 rounded-full"
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>

                          <Button
                            onClick={togglePlayPause}
                            size="icon"
                            variant={"outline"}
                            className="size-9 rounded-full"
                          >
                            <ChevronRight className="size-3" />
                          </Button>
                        </div>
                        <div className="flex-1">
                          <Slider
                            value={[audioProgress]}
                            max={100}
                            step={1}
                            className="w-full"
                            onValueChange={(value) =>
                              setAudioProgress(value[0])
                            }
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {Math.floor(audioProgress / 60)}:
                          {(audioProgress % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Button size={"lg"} className="w-full rounded-full">
                    <Download className="mr-2 h-4 w-4" /> Download clean audio
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
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
            </div> */}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
