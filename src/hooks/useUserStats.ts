import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfileService } from '@/services/UserProfileService';

interface UserStats {
  eventsRegistered: number;
  eventsOrganized: number;
  upcomingEvents: number;
  communitiesJoined: number;
}

/**
 * Custom hook to fetch and manage user statistics
 */
export function useUserStats() {
  const [stats, setStats] = useState<UserStats>({
    eventsRegistered: 0,
    eventsOrganized: 0,
    upcomingEvents: 0,
    communitiesJoined: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userProfile } = useAuth();

  useEffect(() => {
    if (!user || !userProfile) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const userStats = await UserProfileService.getUserStats(user.uid);
        setStats(userStats);
      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Failed to load user statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, userProfile]);

  const refreshStats = async () => {
    if (!user) return;
    
    try {
      setError(null);
      const userStats = await UserProfileService.getUserStats(user.uid);
      setStats(userStats);
    } catch (err) {
      console.error('Error refreshing user stats:', err);
      setError('Failed to refresh user statistics');
    }
  };

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
}