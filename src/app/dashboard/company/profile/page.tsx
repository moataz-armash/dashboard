/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MeSpDnKyjpf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"

export default function CompanyProfile() {
  return (
    <div>
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <img
              src="data:image/jpeg;base64,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"
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">A101</h1>
              <Button size="sm">Change photo</Button>
            </div>
          </div>
        </header>
        <div className=" grid grid-cols-2 gap-8">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="E.g. Jane Doe" defaultValue="Meadow Richardson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="E.g. jane@example.com" />
              </div>
              <Card>
                <CardHeader>
                  <div>Language</div>
                  <div>Choose your preferred language</div>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="en">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="en" name="language" value="en" className="peer hidden" />
                        <Label htmlFor="en" className="cursor-pointer peer-checked:text-blue-600">English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="fr" name="language" value="fr" className="peer hidden" />
                        <Label htmlFor="fr" className="cursor-pointer peer-checked:text-blue-600">French</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="es" name="language" value="es" className="peer hidden" />
                        <Label htmlFor="es" className="cursor-pointer peer-checked:text-blue-600">Spanish</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>Change Password</div>
              <div>For your security, please do not share your password with others.</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input type="password" id="current-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input type="password" id="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input type="password" id="confirm-password" />
              </div>
            </CardContent>
          </Card>



        </div>
        <div className="pt-6 text-right">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}
