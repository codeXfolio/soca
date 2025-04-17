import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              At Soneium Chat, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect information about you in various ways, including:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Personal Data:</strong> While using our service, we may ask you to provide certain personally
                identifiable information that can be used to contact or identify you, including but not limited to your
                email address, wallet addresses, and usage data.
              </li>
              <li>
                <strong>Usage Data:</strong> We may also collect information on how the service is accessed and used.
                This may include information such as your computer's Internet Protocol address, browser type, browser
                version, the pages of our service that you visit, the time and date of your visit, the time spent on
                those pages, and other diagnostic data.
              </li>
              <li>
                <strong>Blockchain Data:</strong> When you connect your wallet or perform transactions, we collect
                blockchain-related information necessary to interact with the blockchain networks.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To fulfill any other purpose for which you provide it</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclosure of Your Information</h2>
            <p>We may disclose your personal information in the following situations:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a
                portion of our assets, your information may be transferred as part of that transaction.
              </li>
              <li>
                <strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we
                will require those affiliates to honor this Privacy Policy.
              </li>
              <li>
                <strong>With Business Partners:</strong> We may share your information with our business partners to
                offer you certain products, services, or promotions.
              </li>
              <li>
                <strong>With Service Providers:</strong> We may share your information with service providers to monitor
                and analyze the use of our service, or to contact you.
              </li>
              <li>
                <strong>For Legal Purposes:</strong> We may disclose your information where required to do so by law or
                in response to valid requests by public authorities.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Security of Your Information</h2>
            <p>
              The security of your information is important to us, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
              means to protect your personal information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Data Protection Rights</h2>
            <p>
              You have certain data protection rights. If you wish to be informed about what personal data we hold about
              you and if you want it to be removed from our systems, please contact us.
            </p>
            <p>In certain circumstances, you have the following data protection rights:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>The right to access, update, or delete the information we have on you</li>
              <li>The right of rectification</li>
              <li>The right to object</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">Last updated: April 11, 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
