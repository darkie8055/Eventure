"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Upload, Plus, X, Tag, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock community lead data
const mockUser = {
  name: 'Sarah Wilson',
  email: 'sarah@ieee.college.edu',
  role: 'community_lead' as const,
  avatar: '/placeholder.svg',
  community: 'IEEE Student Branch'
};

const CreateEvent = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    registrationLink: '',
    maxParticipants: '',
    tags: [] as string[],
    poster: null as File | null,
    category: '',
    eventType: 'in-person',
    requiresApproval: false,
    isPrivate: false,
    allowWaitlist: true,
    sendReminders: true,
    collectFeedback: true,
    prerequisites: '',
    agenda: '',
    contactEmail: mockUser.email,
    contactPhone: '',
    registrationDeadline: '',
    cancellationPolicy: '',
    refundPolicy: 'no-refund'
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedTags = [
    'Workshop', 'Seminar', 'Hackathon', 'Competition', 'Technical', 'Cultural', 
    'AI/ML', 'Web Development', 'Mobile App', 'Data Science', 'Networking', 'Innovation'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, poster: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Event Created Successfully!",
        description: "Your event has been created and is now visible to students",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        endTime: '',
        location: '',
        registrationLink: '',
        maxParticipants: '',
        tags: [] as string[],
        poster: null as File | null,
        category: '',
        eventType: 'in-person',
        requiresApproval: false,
        isPrivate: false,
        allowWaitlist: true,
        sendReminders: true,
        collectFeedback: true,
        prerequisites: '',
        agenda: '',
        contactEmail: mockUser.email,
        contactPhone: '',
        registrationDeadline: '',
        cancellationPolicy: '',
        refundPolicy: 'no-refund'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Create New Event</h1>
          <p className="text-muted-foreground">
            Create an engaging event for your community and attract student participation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Essential details about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter event title (e.g., AI/ML Workshop)"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event, what participants will learn, prerequisites, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date *</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Event Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter venue (e.g., Seminar Hall A, Online - Zoom)"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>
                Optional information to enhance your event listing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  id="registrationLink"
                  placeholder="https://forms.google.com/... or https://eventbrite.com/..."
                  value={formData.registrationLink}
                  onChange={(e) => handleInputChange('registrationLink', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty to use Eventure&apos;s built-in registration system
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Maximum Participants</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="Enter maximum number of participants"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Event Poster */}
              <div className="space-y-2">
                <Label>Event Poster</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {formData.poster ? (
                    <div className="space-y-2">
                      <p className="text-sm text-foreground">{formData.poster.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(formData.poster.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, poster: null }))}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload event poster (Max 5MB)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="poster-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('poster-upload')?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Event Tags
              </CardTitle>
              <CardDescription>
                Add tags to help students discover your event (maximum 5 tags)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add New Tag */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter custom tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(newTag);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddTag(newTag)}
                  disabled={!newTag || formData.tags.length >= 5}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Suggested Tags */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags
                    .filter(tag => !formData.tags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleAddTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Event Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure additional event options and requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <select 
                    id="eventType"
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="in-person">In-Person</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Category</option>
                    <option value="technical">Technical</option>
                    <option value="cultural">Cultural</option>
                    <option value="academic">Academic</option>
                    <option value="sports">Sports</option>
                    <option value="social">Social</option>
                    <option value="professional">Professional Development</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    value={formData.registrationDeadline}
                    onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requiresApproval"
                    checked={formData.requiresApproval}
                    onChange={(e) => setFormData(prev => ({ ...prev, requiresApproval: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="requiresApproval">Require manual approval for registrations</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowWaitlist"
                    checked={formData.allowWaitlist}
                    onChange={(e) => setFormData(prev => ({ ...prev, allowWaitlist: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="allowWaitlist">Enable waitlist when event is full</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sendReminders"
                    checked={formData.sendReminders}
                    onChange={(e) => setFormData(prev => ({ ...prev, sendReminders: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="sendReminders">Send automatic reminders to registered participants</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="collectFeedback"
                    checked={formData.collectFeedback}
                    onChange={(e) => setFormData(prev => ({ ...prev, collectFeedback: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="collectFeedback">Collect feedback after event completion</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="isPrivate">Make this a private event (invitation only)</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Content & Requirements */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Event Content & Requirements</CardTitle>
              <CardDescription>
                Provide detailed information about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="agenda">Event Agenda (Optional)</Label>
                <Textarea
                  id="agenda"
                  placeholder="e.g., 
10:00 AM - Registration & Welcome
10:30 AM - Opening Presentation
11:30 AM - Hands-on Workshop
12:30 PM - Lunch Break
..."
                  value={formData.agenda}
                  onChange={(e) => handleInputChange('agenda', e.target.value)}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites (Optional)</Label>
                <Textarea
                  id="prerequisites"
                  placeholder="List any skills, knowledge, or items participants should have/bring..."
                  value={formData.prerequisites}
                  onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact & Policies */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Contact Information & Policies</CardTitle>
              <CardDescription>
                Provide contact details and event policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone (Optional)</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellationPolicy">Cancellation Policy (Optional)</Label>
                <Textarea
                  id="cancellationPolicy"
                  placeholder="Describe your event cancellation and rescheduling policy..."
                  value={formData.cancellationPolicy}
                  onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="refundPolicy">Refund Policy</Label>
                <select 
                  id="refundPolicy"
                  value={formData.refundPolicy}
                  onChange={(e) => handleInputChange('refundPolicy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="no-refund">No Refunds</option>
                  <option value="full-refund">Full Refund Available</option>
                  <option value="partial-refund">Partial Refund Available</option>
                  <option value="credit-only">Credit/Transfer Only</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? 'Creating...' : 'Create Event'}
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
