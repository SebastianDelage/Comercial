import PageHeader from '@/components/ui/PageHeader'
import SettingsForm from '@/components/admin/settings/SettingsForm'

import { getSiteSettings } from '@/lib/queries/settings'

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <section>
      <PageHeader
        title="Configuración"
        description="Administrá la identidad y los datos generales del sitio."
      />

      <SettingsForm settings={settings} />
    </section>
  )
}