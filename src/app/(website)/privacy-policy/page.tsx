import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 26, 2026";



  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Privacy Policy</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          
          {/* Documentation Sidebar */}
          <LegalSidebar />

          {/* Main Privacy Policy Content */}
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-10 pb-6 border-b border-gray-100">
              Last updated on {lastUpdated}
            </p>

            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600 prose-headings:font-bold prose-headings:text-gray-900">
              
              <p>
                Protecting your private information is our priority. This Statement of Privacy applies to the www.pcbglobe.com and PCB GLOBE and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to PCB GLOBE include the PCB GLOBE Website, associated Platforms, and PCB GLOBE Products and Services. The PCB GLOBE website is an Online Ordering Platform. By using the PCB GLOBE website, you consent to the data practices described in this statement.
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Collection of your Personal Information</h2>
              <p>
                PCB GLOBE may collect personally identifiable information, such as your name. If you purchase PCB GLOBE's products and services, we collect billing and credit card information. This information is used to complete the purchase transaction. PCB GLOBE may also collect anonymous demographic information, which is not unique to you, such as your age and gender. We may gather additional personal or non-personal information in the future.
              </p>
              <p className="mt-4">
                Information about your computer hardware and software may be automatically collected by PCB GLOBE. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the PCB GLOBE website.
              </p>
              <p className="mt-4">
                Please keep in mind that if you directly disclose personally identifiable information or personally sensitive data through PCB GLOBE's public message boards, this information may be collected and used by others.
              </p>
              <p className="mt-4">
                PCB GLOBE encourages you to review the privacy statements of websites you choose to link to from PCB GLOBE so that you can understand how those websites collect, use and share your information. PCB GLOBE is not responsible for the privacy statements or other content on websites outside of the PCB GLOBE website.
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Use of your Personal Information</h2>
              <p>
                PCB GLOBE collects and uses your personal information to operate its website(s) and deliver the services you have requested.
              </p>
              <p className="mt-4">
                PCB GLOBE may also use your personally identifiable information to inform you of other products or services available from PCB GLOBE and its affiliates. PCB GLOBE may also contact you via surveys to conduct research about your opinion of current services or of potential new services that may be offered.
              </p>
              <p className="mt-4">
                PCB GLOBE does not sell, rent or lease its customer lists to third parties.
              </p>
              <p className="mt-4">
                PCB GLOBE may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (e-mail, name, address, telephone number) is not transferred to the third party. PCB GLOBE may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to PCB GLOBE, and they are required to maintain the confidentiality of your information.
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Use of Cookies</h2>
              <p>
                The PCB GLOBE website may use "cookies" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.
              </p>
              <p className="mt-4">
                One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you personalize PCB GLOBE pages, or register with PCB GLOBE site or services, a cookie helps PCB GLOBE to recall your specific information on subsequent visits.
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Security of your Personal Information</h2>
              <p>
                To secure your personal information from unauthorized access, use or disclosure, PCB GLOBE uses the following: <br />
                <strong>PCI Compliance</strong>
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Children Under Thirteen</h2>
              <p>
                PCB GLOBE does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website.
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Opt-Out & Unsubscribe</h2>
              <p>
                We respect your privacy and give you an opportunity to opt-out of receiving announcements of certain information. Users may opt-out of receiving any or all communications from PCB GLOBE by contacting us here: E-mail : <strong>support@pcbglobe.com</strong>
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Changes to this Statement</h2>
              <p>
                PCB GLOBE will occasionally update this Statement of Privacy to reflect company and customer feedback. PCB GLOBE encourages you to periodically review this Statement to be informed of how PCB GLOBE is protecting your information.
              </p>

              <h2 className="text-xl mt-10 mb-4 tracking-tight">Contact Information</h2>
              <p>
                PCB GLOBE welcomes your questions or comments regarding this Statement of Privacy. If you believe that PCB GLOBE has not adhered to this Statement, please contact PCB GLOBE at: E-mail: <strong>support@pcbglobe.com</strong>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
