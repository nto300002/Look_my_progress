import { Profile } from "@/lib/definitions";

export async function fetchUserProfile(userId: string): Promise<Profile> {
  const response = await fetch(`/api/users/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  
  const profile = await response.json();
  return profile;
}