import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CampaignProvider } from '@/context/CampaignContext';

export const metadata = {
  title: 'MediaFlow – Smart Media Marketing Platform',
  description: 'Amplify your local business with smart digital marketing. Connect with our media marketing team to launch campaigns, track analytics, and grow your brand.',
  keywords: 'media marketing, local business, digital marketing, campaigns, analytics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CampaignProvider>
              {children}
            </CampaignProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
