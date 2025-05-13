import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface CompanyProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  registrationNumber: string;
  dateOfIncorporation: string;
  website: string;
  logo: string | null;
  description: string;
  coverPhoto: string | null;
  profilePhoto: string | null; // e.g., '/company/profile/some-id.JPG'
  socialMedia: Record<string, string>;
  legalEntityType: string;
  sector: string;
  industry: string;
  taxId: string;
  currency: string;
  enrollmentDate: string;
  bankAccountId: string | null;
  addressId: string;
  ownerId: string;
}

interface ProfileState {
  profile: CompanyProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (token: string) => Promise<void>;
  setProfile: (profile: CompanyProfile | null) => void;
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isLoading: false,
      error: null,
      fetchProfile: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/company/profile}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              cache: "no-store",
            }
          );
          if (!res.ok) {
            let errorMsg = `HTTP error! status: ${res.status}`;
            try {
              const errorData = await res.json();
              errorMsg = errorData.message || errorMsg;
            } catch (e) {
              // Failed to parse error JSON, use default message
            }
            throw new Error(errorMsg);
          }
          const data = await res.json();
          set({ profile: data.data, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false, profile: null });
          console.error("Failed to fetch company profile:", error);
        }
      },
      setProfile: (profileData: CompanyProfile | null) => {
        set({ profile: profileData, isLoading: false, error: null });
      },
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "company-profile",
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
