import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

import { getSiteSettings } from '@/lib/queries/settings'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  const clubName =
    settings?.club_name || 'Comercial Rugby Club'

  return (
    <div className="min-h-screen bg-white">
      <Header
        clubName={clubName}
        logoUrl={settings?.logo_url}
      />

      <main>{children}</main>

      <Footer
        clubName={clubName}
        shortDescription={settings?.short_description}
        logoUrl={settings?.logo_url}
        address={settings?.address}
        phone={settings?.phone}
        contactEmail={settings?.contact_email}
        whatsappNumber={settings?.whatsapp_number}
        instagramUrl={settings?.instagram_url}
        facebookUrl={settings?.facebook_url}
        youtubeUrl={settings?.youtube_url}
      />
    </div>
  )
}