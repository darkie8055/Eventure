"use client"

import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar,
  Building,
  Plus
} from 'lucide-react';

// Mock user data
const mockUser = {
  name: 'Student User',
  email: 'student@college.edu',
  role: 'student' as const,
  avatar: '/placeholder.svg'
};

// Mock colleges data
const mockColleges = [
  {
    id: '1',
    name: 'Government Engineering College',
    location: 'City Center, State',
    type: 'Government',
    established: '1965',
    students: 5000,
    communities: 12,
    upcomingEvents: 8,
    description: 'Premier engineering institution known for technical excellence and innovation.',
    departments: ['Computer Science', 'Mechanical', 'Electrical', 'Civil'],
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'ABC Institute of Technology',
    location: 'Tech Park, State',
    type: 'Private',
    established: '1985',
    students: 3500,
    communities: 8,
    upcomingEvents: 12,
    description: 'Modern technical institute focusing on industry-ready education.',
    departments: ['IT', 'Electronics', 'Chemical', 'Biotechnology'],
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'XYZ University College',
    location: 'University Town, State',
    type: 'University',
    established: '1950',
    students: 8000,
    communities: 20,
    upcomingEvents: 15,
    description: 'Comprehensive university offering diverse academic programs.',
    departments: ['Engineering', 'Sciences', 'Arts', 'Commerce', 'Management'],
    image: '/placeholder.svg'
  }
];

export default function CollegeSelection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const filteredColleges = mockColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || college.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSelectCollege = (collegeId: string) => {
    // Implementation for selecting a college
    console.log('Selected college:', collegeId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Select Your College</h1>
          <p className="text-muted-foreground">
            Choose your institution to connect with your campus community and events
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="card-elevated mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="university">University</option>
              </select>
              <Button
                variant="outline"
                onClick={() => setShowRequestForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Request New College
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* College List */}
        <div className="grid gap-6">
          {filteredColleges.length === 0 ? (
            <Card className="card-elevated">
              <CardContent className="p-12 text-center">
                <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No colleges found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or request to add a new college
                </p>
                <Button onClick={() => setShowRequestForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Request New College
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredColleges.map((college) => (
              <Card key={college.id} className="card-elevated hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <Building className="h-12 w-12 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{college.name}</h3>
                            <Badge variant="outline">{college.type}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{college.description}</p>
                        </div>
                        <Button
                          onClick={() => handleSelectCollege(college.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Select College
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Est. {college.established}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{college.students.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{college.communities} communities</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">Departments:</span>
                          <div className="flex flex-wrap gap-1">
                            {college.departments.slice(0, 3).map((dept, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {dept}
                              </Badge>
                            ))}
                            {college.departments.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{college.departments.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-primary">{college.upcomingEvents}</span> upcoming events
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Request New College Form */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Request New College</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">College Name</label>
                  <Input placeholder="Enter college name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="City, State" />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Government</option>
                    <option>Private</option>
                    <option>University</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Reason for Request</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    rows={3}
                    placeholder="Why should this college be added?"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowRequestForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1">
                    Submit Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
