"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Users,
  Building,
  FileImage,
  X,
  Info,
  ShieldCheck,
  Calendar,
  User,
  Mail,
  Phone
} from 'lucide-react';

interface VerificationDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded: boolean;
}

interface VerificationFormData {
  // Community Lead Info
  fullName: string;
  email: string;
  phone: string;
  position: string;
  studentId: string;
  department: string;
  yearOfStudy: string;
  
  // Community Info
  communityName: string;
  communityDescription: string;
  communityCategory: string;
  communityType: 'student_organization' | 'academic_club' | 'cultural_society' | 'sports_club' | 'special_interest';
  establishedDate: string;
  expectedMembers: string;
  
  // Faculty Advisor (required for verification)
  facultyAdvisorName: string;
  facultyAdvisorEmail: string;
  facultyAdvisorDepartment: string;
  facultyAdvisorPhone: string;
  
  // Purpose and Goals
  communityGoals: string;
  plannedActivities: string;
  benefitsToStudents: string;
  
  // Administrative Info
  meetingFrequency: string;
  meetingLocation: string;
  constitution: boolean;
  budgetPlan: boolean;
  
  // Social Media
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export default function CommunityVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VerificationFormData>({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
    communityName: '',
    communityDescription: '',
    communityCategory: '',
    communityType: 'student_organization',
    establishedDate: '',
    expectedMembers: '',
    facultyAdvisorName: '',
    facultyAdvisorEmail: '',
    facultyAdvisorDepartment: '',
    facultyAdvisorPhone: '',
    communityGoals: '',
    plannedActivities: '',
    benefitsToStudents: '',
    meetingFrequency: '',
    meetingLocation: '',
    constitution: false,
    budgetPlan: false
  });

  const [documents, setDocuments] = useState<VerificationDocument[]>([
    { id: '1', name: 'Student ID Copy', type: 'required', size: '', uploaded: false },
    { id: '2', name: 'Faculty Advisor Recommendation Letter', type: 'required', size: '', uploaded: false },
    { id: '3', name: 'Community Constitution', type: 'required', size: '', uploaded: false },
    { id: '4', name: 'Proposed Budget Plan', type: 'required', size: '', uploaded: false },
    { id: '5', name: 'List of Initial Members', type: 'required', size: '', uploaded: false },
    { id: '6', name: 'College Administration Approval', type: 'optional', size: '', uploaded: false },
    { id: '7', name: 'Community Logo/Banner', type: 'optional', size: '', uploaded: false }
  ]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof VerificationFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (documentId: string, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, uploaded: true, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }
        : doc
    ));
  };

  const removeDocument = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, uploaded: false, size: '' }
        : doc
    ));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitVerification = () => {
    // Handle verification submission
    console.log('Submitting verification:', formData, documents);
    // Redirect to verification status page
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Personal Information
              </h2>
              <p className="text-gray-600">Please provide your personal details as the community lead.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@college.edu"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="studentId">Student ID *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  placeholder="Enter your student ID"
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleInputChange('department', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer_science">Computer Science</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                    <SelectItem value="sciences">Sciences</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearOfStudy">Year of Study *</Label>
                <Select
                  value={formData.yearOfStudy}
                  onValueChange={(value) => handleInputChange('yearOfStudy', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="graduate">Graduate Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Intended Position *</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => handleInputChange('position', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your intended position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="president">President</SelectItem>
                    <SelectItem value="vice_president">Vice President</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                    <SelectItem value="founder">Founder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Community Details
              </h2>
              <p className="text-gray-600">Provide detailed information about your community.</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="communityName">Community Name *</Label>
                  <Input
                    id="communityName"
                    value={formData.communityName}
                    onChange={(e) => handleInputChange('communityName', e.target.value)}
                    placeholder="Enter community name"
                  />
                </div>
                <div>
                  <Label htmlFor="communityCategory">Category *</Label>
                  <Select
                    value={formData.communityCategory}
                    onValueChange={(value) => handleInputChange('communityCategory', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="arts">Arts & Culture</SelectItem>
                      <SelectItem value="sports">Sports & Recreation</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="social">Social & Community Service</SelectItem>
                      <SelectItem value="professional">Professional Development</SelectItem>
                      <SelectItem value="special_interest">Special Interest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="communityType">Community Type *</Label>
                  <Select
                    value={formData.communityType}
                    onValueChange={(value) => handleInputChange('communityType', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student_organization">Student Organization</SelectItem>
                      <SelectItem value="academic_club">Academic Club</SelectItem>
                      <SelectItem value="cultural_society">Cultural Society</SelectItem>
                      <SelectItem value="sports_club">Sports Club</SelectItem>
                      <SelectItem value="special_interest">Special Interest Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expectedMembers">Expected Members *</Label>
                  <Select
                    value={formData.expectedMembers}
                    onValueChange={(value) => handleInputChange('expectedMembers', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Expected member count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-25">10-25 members</SelectItem>
                      <SelectItem value="25-50">25-50 members</SelectItem>
                      <SelectItem value="50-100">50-100 members</SelectItem>
                      <SelectItem value="100-200">100-200 members</SelectItem>
                      <SelectItem value="200+">200+ members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="communityDescription">Community Description *</Label>
                <Textarea
                  id="communityDescription"
                  value={formData.communityDescription}
                  onChange={(e) => handleInputChange('communityDescription', e.target.value)}
                  placeholder="Provide a detailed description of your community, its mission, and what it aims to achieve..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="communityGoals">Community Goals & Objectives *</Label>
                <Textarea
                  id="communityGoals"
                  value={formData.communityGoals}
                  onChange={(e) => handleInputChange('communityGoals', e.target.value)}
                  placeholder="Describe the specific goals and objectives of your community..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="plannedActivities">Planned Activities *</Label>
                <Textarea
                  id="plannedActivities"
                  value={formData.plannedActivities}
                  onChange={(e) => handleInputChange('plannedActivities', e.target.value)}
                  placeholder="List the activities, events, and programs you plan to organize..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="benefitsToStudents">Benefits to Students *</Label>
                <Textarea
                  id="benefitsToStudents"
                  value={formData.benefitsToStudents}
                  onChange={(e) => handleInputChange('benefitsToStudents', e.target.value)}
                  placeholder="Explain how your community will benefit students and contribute to campus life..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Faculty Advisor & Administrative Details
              </h2>
              <p className="text-gray-600">Every community requires a faculty advisor for verification.</p>
            </div>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Faculty Advisor Requirement</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      A faculty advisor must approve and supervise your community. They will receive an email to confirm their support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="facultyAdvisorName">Faculty Advisor Name *</Label>
                  <Input
                    id="facultyAdvisorName"
                    value={formData.facultyAdvisorName}
                    onChange={(e) => handleInputChange('facultyAdvisorName', e.target.value)}
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="facultyAdvisorEmail">Faculty Advisor Email *</Label>
                  <Input
                    id="facultyAdvisorEmail"
                    type="email"
                    value={formData.facultyAdvisorEmail}
                    onChange={(e) => handleInputChange('facultyAdvisorEmail', e.target.value)}
                    placeholder="advisor.email@college.edu"
                  />
                </div>
                <div>
                  <Label htmlFor="facultyAdvisorDepartment">Advisor Department *</Label>
                  <Input
                    id="facultyAdvisorDepartment"
                    value={formData.facultyAdvisorDepartment}
                    onChange={(e) => handleInputChange('facultyAdvisorDepartment', e.target.value)}
                    placeholder="Computer Science Department"
                  />
                </div>
                <div>
                  <Label htmlFor="facultyAdvisorPhone">Advisor Phone</Label>
                  <Input
                    id="facultyAdvisorPhone"
                    value={formData.facultyAdvisorPhone}
                    onChange={(e) => handleInputChange('facultyAdvisorPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="meetingFrequency">Meeting Frequency *</Label>
                  <Select
                    value={formData.meetingFrequency}
                    onValueChange={(value) => handleInputChange('meetingFrequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How often will you meet?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="meetingLocation">Meeting Location *</Label>
                  <Input
                    id="meetingLocation"
                    value={formData.meetingLocation}
                    onChange={(e) => handleInputChange('meetingLocation', e.target.value)}
                    placeholder="Library Room 201, Student Center, etc."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Required Documents Status</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="constitution" 
                      checked={formData.constitution}
                      onCheckedChange={(checked) => handleInputChange('constitution', checked as boolean)}
                    />
                    <label htmlFor="constitution" className="text-sm">
                      I have prepared a community constitution outlining rules, structure, and governance
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="budgetPlan" 
                      checked={formData.budgetPlan}
                      onCheckedChange={(checked) => handleInputChange('budgetPlan', checked as boolean)}
                    />
                    <label htmlFor="budgetPlan" className="text-sm">
                      I have prepared a budget plan for community activities and events
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Social Media Links (Optional)</Label>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Input
                      placeholder="Website URL"
                      value={formData.website || ''}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Instagram Handle"
                      value={formData.instagram || ''}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Facebook Page"
                      value={formData.facebook || ''}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="LinkedIn"
                      value={formData.linkedin || ''}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Document Upload
              </h2>
              <p className="text-gray-600">Upload the required documents for verification.</p>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Document Requirements</AlertTitle>
              <AlertDescription>
                Please ensure all documents are clear, legible, and in PDF or image format (max 10MB each). 
                Required documents must be uploaded before submission.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {documents.map((doc) => (
                <Card key={doc.id} className={`border-2 ${doc.type === 'required' ? 'border-red-200' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${doc.uploaded ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {doc.uploaded ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <FileText className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {doc.name}
                            <Badge variant={doc.type === 'required' ? 'destructive' : 'secondary'}>
                              {doc.type}
                            </Badge>
                          </h4>
                          {doc.uploaded && doc.size && (
                            <p className="text-sm text-gray-500">Size: {doc.size}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.uploaded ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeDocument(doc.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        ) : (
                          <div className="relative">
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload(doc.id, e.target.files[0]);
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Verification Process</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      After submission, your application will be reviewed by the college administration. 
                      You&apos;ll receive updates via email and can track the status in your profile.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Community Verification Application
          </h1>
          <p className="text-gray-600">
            Complete this form to get your community officially verified and start organizing events
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span className={currentStep >= 1 ? 'text-purple-600 font-semibold' : ''}>Personal Info</span>
              <span className={currentStep >= 2 ? 'text-purple-600 font-semibold' : ''}>Community Details</span>
              <span className={currentStep >= 3 ? 'text-purple-600 font-semibold' : ''}>Faculty Advisor</span>
              <span className={currentStep >= 4 ? 'text-purple-600 font-semibold' : ''}>Documents</span>
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-2"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={submitVerification}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}