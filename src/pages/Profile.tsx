
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';
import StarRating from '@/components/common/StarRating';
import AvailabilitySelector from '@/components/common/AvailabilitySelector';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [rating, setRating] = useState(user?.rating || 3);
  
  const handleSaveProfile = () => {
    if (!name || !email) {
      toast({
        title: "Required fields missing",
        description: "Please provide your name and email.",
        variant: "destructive",
      });
      return;
    }
    
    updateUser({
      name,
      email,
      phoneNumber,
      bio,
      rating
    });
    
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };
  
  const handleAvailabilityChange = (availability: any) => {
    updateUser({ availability });
    
    toast({
      title: "Availability updated",
      description: "Your availability has been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium">
                    Phone Number (optional)
                  </label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bio" className="block text-sm font-medium">
                    Bio (optional)
                  </label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell potential players a bit about yourself..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skill Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6 py-2">
                <StarRating value={rating} onChange={setRating} size="lg" />
                
                <div className="w-full text-center">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full w-full mt-1">
                    <div 
                      className="h-2 bg-squash-primary rounded-full transition-all duration-300"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button
              className="bg-squash-primary hover:bg-squash-primary/90"
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="availability" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Select the times you're typically available to play.
              </p>
              
              <AvailabilitySelector 
                availability={user?.availability || {
                  monday: { morning: false, afternoon: false, evening: false },
                  tuesday: { morning: false, afternoon: false, evening: false },
                  wednesday: { morning: false, afternoon: false, evening: false },
                  thursday: { morning: false, afternoon: false, evening: false },
                  friday: { morning: false, afternoon: false, evening: false },
                  saturday: { morning: false, afternoon: false, evening: false },
                  sunday: { morning: false, afternoon: false, evening: false },
                }} 
                onChange={handleAvailabilityChange}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Match Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                We'll implement preference settings in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
