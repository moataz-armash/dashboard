"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";
import userProfile from "@/assets/userprofile.jpg";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/spinner";
import { CompanyProfile, useProfileStore } from "../profileStore";
import {
  SubmitEntityUpdate,
  getImage,
  handleFileChange,
  handleImageClick,
} from "@/lib/helpers";

const fields = [
  "name",
  "email",
  "registrationNumber",
  "description",
  "phone",
  "address",
  "website",
  "legalEntityType",
  "sector",
  "dateOfIncorporation",
  "industry",
  "taxId",
  "currency",
  "enrollmentDate",
];

const entityDefaults = {
  socialMedia: {},
  addressId: "",
  dateOfIncorporation: new Date().toISOString(),
};

const endpoint: string = "/company/profile";

interface CompanyProfileFormProps {
  initialProfileData: CompanyProfile | null;
  token: string | null; // Token might be needed for client-side actions
  serverFetchError?: string | null;
}

export default function CompanyProfileForm({
  initialProfileData,
  token,
  serverFetchError,
}: CompanyProfileFormProps) {
  const { setProfile } = useProfileStore();

  const profilePhotoUrl = `${getImage(
    initialProfileData?.profilePhoto
  )}&v=${Date.now()}`;
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | StaticImageData>(
    profilePhotoUrl || userProfile
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await SubmitEntityUpdate({
      formRef,
      fileInputRef,
      fields,
      entityDefaults,
      endpoint,
      token,
      fileFallbackUrl: profilePhotoUrl,
      setIsLoading,
      onSuccess: () => {
        toast.success("Company profile updated successful");
        setTimeout(() => {
          document.location.reload();
        }, 1500);
      },
      onError: () => toast.error("Update failed"),
      updateRequest: "updateCompanyRequest",
    });
  };

  useEffect(() => {
    setProfile(initialProfileData);
  }, [initialProfileData, setProfile]);

  if (!initialProfileData) {
    return <div>No profile data available.</div>;
  }

  const {
    name,
    email,
    profilePhoto,
    registrationNumber,
    description,
    phone,
    website,
    legalEntityType,
    sector,
    industry,
    taxId,
    currency,
    enrollmentDate,
  } = initialProfileData;

  return (
    <div>
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            {previewImage ? (
              <Image
                src={previewImage}
                alt={`${name} || Avatar`}
                width={96}
                height={96}
                className="rounded-full"
                style={{ aspectRatio: "96/96", objectFit: "cover" }}
              />
            ) : (
              <Spinner className="h-24 w-24 text-gray-500" />
            )}

            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{name}</h1>
              <Button
                type="button"
                size="sm"
                onClick={() => handleImageClick(fileInputRef)}
              >
                Change photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                name="profilePhoto"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setPreviewImage)}
              />
            </div>
          </div>
        </header>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-8">
            <Card>
              <CardContent className="space-y-4">
                <div className="space-y-2 mt-2">
                  <Label htmlFor="name">
                    Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="A101"
                    name="name"
                    defaultValue={name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    placeholder="E.g. jane@example.com"
                    defaultValue={email}
                    name="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">
                    Registration Number<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="registrationNumber"
                    placeholder="E.g. 12345678"
                    defaultValue={registrationNumber}
                    name="registrationNumber"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description<span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Company description"
                    defaultValue={description}
                    name="description"
                    className="w-full rounded border-gray-200 px-3 py-2 text-sm shadow-sm  focus:ring-indigo-500block p-2.5  text-gray-900 bg-gray-50 border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="e.g. +90 555 555 55 55"
                    defaultValue={phone}
                    name="phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    defaultValue={website}
                    name="website"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-4">
                <div className="space-y-2 mt-2">
                  <Label htmlFor="legalEntityType">Legal Entity Type</Label>
                  <Input
                    id="legalEntityType"
                    placeholder="e.g. LLC, Inc."
                    name="legalEntityType"
                    defaultValue={legalEntityType}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Input
                    id="sector"
                    placeholder="e.g. Technology"
                    defaultValue={sector}
                    name="sector"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g. Software"
                    defaultValue={industry}
                    name="industry"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    placeholder="e.g. 1234567890"
                    defaultValue={taxId}
                    name="taxId"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    placeholder="e.g. USD, EUR"
                    defaultValue={currency}
                    name="currency"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                  <Input
                    id="enrollmentDate"
                    defaultValue={enrollmentDate}
                    readOnly
                    name="enrollmentDate"
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="pt-6 text-right mb-8 w-full flex justify-end">
            <Button type="submit" className="w-[25%]">
              Save {isLoading && <Spinner text="Submitting" className="ml-6" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
