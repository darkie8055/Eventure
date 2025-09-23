"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Shield,
  Mail,
  Bell,
  Database,
  Users,
  Building,
  Calendar,
  AlertTriangle,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Globe,
  Clock,
  FileText,
  Activity,
  BarChart3,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  getDocs
} from "firebase/firestore";

interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    supportEmail: string;
    maintenanceMode: boolean;
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    maxFileUploadSize: number;
    defaultUserRole: string;
  };
  notifications: {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
    notifyOnNewUser: boolean;
    notifyOnNewCommunity: boolean;
    notifyOnNewEvent: boolean;
    notifyOnVerificationRequest: boolean;
  };
  security: {
    passwordMinLength: number;
    requireStrongPassword: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    enableTwoFactor: boolean;
    allowedEmailDomains: string[];
  };
  features: {
    enableCommunityCreation: boolean;
    enableEventCreation: boolean;
    enableChat: boolean;
    enableBookmarks: boolean;
    enableRatings: boolean;
    enableComments: boolean;
    maxCommunitiesPerUser: number;
    maxEventsPerCommunity: number;
  };
}

interface SystemStats {
  lastBackup: string;
  databaseSize: string;
  storageUsed: string;
  systemUptime: string;
  activeSessions: number;
  errorCount: number;
}

const defaultSettings: SystemSettings = {
  general: {
    siteName: "Eventure",
    siteDescription: "College Event and Community Management Platform",
    supportEmail: "support@eventure.com",
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxFileUploadSize: 10,
    defaultUserRole: "student",
  },
  notifications: {
    enableEmailNotifications: true,
    enablePushNotifications: false,
    notifyOnNewUser: true,
    notifyOnNewCommunity: true,
    notifyOnNewEvent: false,
    notifyOnVerificationRequest: true,
  },
  security: {
    passwordMinLength: 8,
    requireStrongPassword: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
    allowedEmailDomains: ["college.edu", "university.edu"],
  },
  features: {
    enableCommunityCreation: true,
    enableEventCreation: true,
    enableChat: true,
    enableBookmarks: true,
    enableRatings: true,
    enableComments: true,
    maxCommunitiesPerUser: 5,
    maxEventsPerCommunity: 50,
  },
};

export default function AdminSettingsPage() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    lastBackup: "2024-01-15 02:00:00",
    databaseSize: "2.4 GB",
    storageUsed: "1.8 GB",
    systemUptime: "15 days",
    activeSessions: 42,
    errorCount: 3,
  });
  const [newEmailDomain, setNewEmailDomain] = useState("");
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsRef = doc(db, "system", "settings");
        const settingsDoc = await getDoc(settingsRef);
        
        if (settingsDoc.exists()) {
          const data = settingsDoc.data() as SystemSettings;
          setSettings(data);
        } else {
          // Initialize with default settings
          await setDoc(settingsRef, {
            ...defaultSettings,
            updatedAt: serverTimestamp(),
            updatedBy: userProfile?.email,
          });
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        toast({
          title: "Error",
          description: "Failed to load system settings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [userProfile?.email, toast]);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const settingsRef = doc(db, "system", "settings");
      
      await updateDoc(settingsRef, {
        ...settings,
        updatedAt: serverTimestamp(),
        updatedBy: userProfile?.email,
      });

      toast({
        title: "Settings Saved",
        description: "System settings have been updated successfully",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddEmailDomain = () => {
    if (newEmailDomain && !settings.security.allowedEmailDomains.includes(newEmailDomain)) {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          allowedEmailDomains: [...prev.security.allowedEmailDomains, newEmailDomain],
        },
      }));
      setNewEmailDomain("");
    }
  };

  const handleRemoveEmailDomain = (domain: string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        allowedEmailDomains: prev.security.allowedEmailDomains.filter(d => d !== domain),
      },
    }));
  };

  const handleBackupDatabase = () => {
    setIsBackupDialogOpen(false);
    toast({
      title: "Backup Started",
      description: "Database backup has been initiated",
    });
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `eventure-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast({
            title: "Settings Imported",
            description: "Settings have been imported successfully. Remember to save them.",
          });
        } catch (error) {
          toast({
            title: "Import Error",
            description: "Failed to import settings. Please check the file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const updateGeneralSetting = (key: keyof SystemSettings['general'], value: any) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [key]: value,
      },
    }));
  };

  const updateNotificationSetting = (key: keyof SystemSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const updateSecuritySetting = (key: keyof SystemSettings['security'], value: any) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }));
  };

  const updateFeatureSetting = (key: keyof SystemSettings['features'], value: any) => {
    setSettings(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: value,
      },
    }));
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">
                  System Settings
                </h1>
                <p className="text-muted-foreground">
                  Configure platform settings and system preferences
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleExportSettings}
                  variant="outline"
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportSettings}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Import
                  </Button>
                </div>
                
                <Button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="gap-2"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Settings
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Site Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={settings.general.siteName}
                          onChange={(e) => updateGeneralSetting('siteName', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input
                          id="supportEmail"
                          type="email"
                          value={settings.general.supportEmail}
                          onChange={(e) => updateGeneralSetting('supportEmail', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={settings.general.siteDescription}
                        onChange={(e) => updateGeneralSetting('siteDescription', e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="maxFileSize">Max File Upload Size (MB)</Label>
                        <Input
                          id="maxFileSize"
                          type="number"
                          min="1"
                          max="100"
                          value={settings.general.maxFileUploadSize}
                          onChange={(e) => updateGeneralSetting('maxFileUploadSize', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="defaultRole">Default User Role</Label>
                        <Select
                          value={settings.general.defaultUserRole}
                          onValueChange={(value) => updateGeneralSetting('defaultUserRole', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="community_lead">Community Lead</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable to temporarily disable access to the platform
                          </p>
                        </div>
                        <Switch
                          checked={settings.general.maintenanceMode}
                          onCheckedChange={(checked) => updateGeneralSetting('maintenanceMode', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Allow User Registration</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow new users to create accounts
                          </p>
                        </div>
                        <Switch
                          checked={settings.general.allowRegistration}
                          onCheckedChange={(checked) => updateGeneralSetting('allowRegistration', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Email Verification</Label>
                          <p className="text-sm text-muted-foreground">
                            Users must verify their email before accessing the platform
                          </p>
                        </div>
                        <Switch
                          checked={settings.general.requireEmailVerification}
                          onCheckedChange={(checked) => updateGeneralSetting('requireEmailVerification', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable email notifications for system events
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.enableEmailNotifications}
                          onCheckedChange={(checked) => updateNotificationSetting('enableEmailNotifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable browser push notifications
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.enablePushNotifications}
                          onCheckedChange={(checked) => updateNotificationSetting('enablePushNotifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>New User Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify admins when new users register
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.notifyOnNewUser}
                          onCheckedChange={(checked) => updateNotificationSetting('notifyOnNewUser', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>New Community Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify admins when new communities are created
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.notifyOnNewCommunity}
                          onCheckedChange={(checked) => updateNotificationSetting('notifyOnNewCommunity', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>New Event Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify admins when new events are created
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.notifyOnNewEvent}
                          onCheckedChange={(checked) => updateNotificationSetting('notifyOnNewEvent', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Verification Request Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify admins when verification requests are submitted
                          </p>
                        </div>
                        <Switch
                          checked={settings.notifications.notifyOnVerificationRequest}
                          onCheckedChange={(checked) => updateNotificationSetting('notifyOnVerificationRequest', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                        <Input
                          id="passwordMinLength"
                          type="number"
                          min="6"
                          max="20"
                          value={settings.security.passwordMinLength}
                          onChange={(e) => updateSecuritySetting('passwordMinLength', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          min="5"
                          max="480"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => updateSecuritySetting('sessionTimeout', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          min="3"
                          max="10"
                          value={settings.security.maxLoginAttempts}
                          onChange={(e) => updateSecuritySetting('maxLoginAttempts', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Strong Passwords</Label>
                          <p className="text-sm text-muted-foreground">
                            Require uppercase, lowercase, numbers, and special characters
                          </p>
                        </div>
                        <Switch
                          checked={settings.security.requireStrongPassword}
                          onCheckedChange={(checked) => updateSecuritySetting('requireStrongPassword', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Enable Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Require 2FA for admin accounts
                          </p>
                        </div>
                        <Switch
                          checked={settings.security.enableTwoFactor}
                          onCheckedChange={(checked) => updateSecuritySetting('enableTwoFactor', checked)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Allowed Email Domains</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Only allow registrations from these email domains
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter domain (e.g., college.edu)"
                            value={newEmailDomain}
                            onChange={(e) => setNewEmailDomain(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddEmailDomain()}
                          />
                          <Button onClick={handleAddEmailDomain} variant="outline">
                            Add
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {settings.security.allowedEmailDomains.map((domain) => (
                            <Badge key={domain} variant="secondary" className="gap-2">
                              {domain}
                              <button
                                onClick={() => handleRemoveEmailDomain(domain)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Settings */}
              <TabsContent value="features" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Feature Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Community Creation</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow users to create new communities
                          </p>
                        </div>
                        <Switch
                          checked={settings.features.enableCommunityCreation}
                          onCheckedChange={(checked) => updateFeatureSetting('enableCommunityCreation', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Event Creation</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow communities to create events
                          </p>
                        </div>
                        <Switch
                          checked={settings.features.enableEventCreation}
                          onCheckedChange={(checked) => updateFeatureSetting('enableEventCreation', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Chat System</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable chat functionality for communities
                          </p>
                        </div>
                        <Switch
                          checked={settings.features.enableChat}
                          onCheckedChange={(checked) => updateFeatureSetting('enableChat', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Bookmarks</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow users to bookmark events
                          </p>
                        </div>
                        <Switch
                          checked={settings.features.enableBookmarks}
                          onCheckedChange={(checked) => updateFeatureSetting('enableBookmarks', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Event Ratings</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow users to rate events
                          </p>
                        </div>
                        <Switch
                          checked={settings.features.enableRatings}
                          onCheckedChange={(checked) => updateFeatureSetting('enableRatings', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow users to comment on events
                          </p>
                        </div>
                        <Switch
                          checked={settings.features.enableComments}
                          onCheckedChange={(checked) => updateFeatureSetting('enableComments', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="maxCommunities">Max Communities per User</Label>
                        <Input
                          id="maxCommunities"
                          type="number"
                          min="1"
                          max="20"
                          value={settings.features.maxCommunitiesPerUser}
                          onChange={(e) => updateFeatureSetting('maxCommunitiesPerUser', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="maxEvents">Max Events per Community</Label>
                        <Input
                          id="maxEvents"
                          type="number"
                          min="10"
                          max="200"
                          value={settings.features.maxEventsPerCommunity}
                          onChange={(e) => updateFeatureSetting('maxEventsPerCommunity', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Info */}
              <TabsContent value="system" className="space-y-6">
                {/* System Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Database className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Database Size</p>
                          <p className="text-xl font-bold">{systemStats.databaseSize}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">System Uptime</p>
                          <p className="text-xl font-bold">{systemStats.systemUptime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Sessions</p>
                          <p className="text-xl font-bold">{systemStats.activeSessions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* System Actions */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      System Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Database Backup</h4>
                        <p className="text-sm text-muted-foreground">
                          Last backup: {systemStats.lastBackup}
                        </p>
                      </div>
                      <Dialog open={isBackupDialogOpen} onOpenChange={setIsBackupDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Create Backup
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create Database Backup</DialogTitle>
                            <DialogDescription>
                              This will create a full backup of the database. The process may take several minutes.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsBackupDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleBackupDatabase}>
                              Start Backup
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">System Logs</h4>
                        <p className="text-sm text-muted-foreground">
                          {systemStats.errorCount} errors in the last 24 hours
                        </p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        View Logs
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Cache Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Clear system cache to improve performance
                        </p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Clear Cache
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}