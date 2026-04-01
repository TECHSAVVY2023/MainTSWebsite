/**
 * Profile form options: cities and provinces for dropdowns.
 * Province first, then City filtered by selected province.
 * Supports API: when NUXT_PUBLIC_API_BASE is set, fetches cities from /locations/cities?province=...
 */

export interface ProfileOption {
  value: string
  label: string
}

/** Philippine provinces (81) – alphabetical */
const PROFILE_PROVINCES: ProfileOption[] = [
  { value: '', label: 'e.g. Misamis Occidental' },
  { value: 'Abra', label: 'Abra' },
  { value: 'Agusan del Norte', label: 'Agusan del Norte' },
  { value: 'Agusan del Sur', label: 'Agusan del Sur' },
  { value: 'Aklan', label: 'Aklan' },
  { value: 'Albay', label: 'Albay' },
  { value: 'Antique', label: 'Antique' },
  { value: 'Apayao', label: 'Apayao' },
  { value: 'Aurora', label: 'Aurora' },
  { value: 'Basilan', label: 'Basilan' },
  { value: 'Bataan', label: 'Bataan' },
  { value: 'Batanes', label: 'Batanes' },
  { value: 'Batangas', label: 'Batangas' },
  { value: 'Benguet', label: 'Benguet' },
  { value: 'Biliran', label: 'Biliran' },
  { value: 'Bohol', label: 'Bohol' },
  { value: 'Bukidnon', label: 'Bukidnon' },
  { value: 'Bulacan', label: 'Bulacan' },
  { value: 'Cagayan', label: 'Cagayan' },
  { value: 'Camarines Norte', label: 'Camarines Norte' },
  { value: 'Camarines Sur', label: 'Camarines Sur' },
  { value: 'Camiguin', label: 'Camiguin' },
  { value: 'Capiz', label: 'Capiz' },
  { value: 'Catanduanes', label: 'Catanduanes' },
  { value: 'Cavite', label: 'Cavite' },
  { value: 'Cebu', label: 'Cebu' },
  { value: 'Cotabato', label: 'Cotabato' },
  { value: 'Davao de Oro', label: 'Davao de Oro' },
  { value: 'Davao del Norte', label: 'Davao del Norte' },
  { value: 'Davao del Sur', label: 'Davao del Sur' },
  { value: 'Davao Occidental', label: 'Davao Occidental' },
  { value: 'Davao Oriental', label: 'Davao Oriental' },
  { value: 'Dinagat Islands', label: 'Dinagat Islands' },
  { value: 'Eastern Samar', label: 'Eastern Samar' },
  { value: 'Guimaras', label: 'Guimaras' },
  { value: 'Ifugao', label: 'Ifugao' },
  { value: 'Ilocos Norte', label: 'Ilocos Norte' },
  { value: 'Ilocos Sur', label: 'Ilocos Sur' },
  { value: 'Iloilo', label: 'Iloilo' },
  { value: 'Isabela', label: 'Isabela' },
  { value: 'Kalinga', label: 'Kalinga' },
  { value: 'La Union', label: 'La Union' },
  { value: 'Laguna', label: 'Laguna' },
  { value: 'Lanao del Norte', label: 'Lanao del Norte' },
  { value: 'Lanao del Sur', label: 'Lanao del Sur' },
  { value: 'Leyte', label: 'Leyte' },
  { value: 'Maguindanao del Norte', label: 'Maguindanao del Norte' },
  { value: 'Maguindanao del Sur', label: 'Maguindanao del Sur' },
  { value: 'Marinduque', label: 'Marinduque' },
  { value: 'Masbate', label: 'Masbate' },
  { value: 'Metro Manila', label: 'Metro Manila' },
  { value: 'Misamis Occidental', label: 'Misamis Occidental' },
  { value: 'Misamis Oriental', label: 'Misamis Oriental' },
  { value: 'Mountain Province', label: 'Mountain Province' },
  { value: 'Negros Occidental', label: 'Negros Occidental' },
  { value: 'Negros Oriental', label: 'Negros Oriental' },
  { value: 'Northern Samar', label: 'Northern Samar' },
  { value: 'Nueva Ecija', label: 'Nueva Ecija' },
  { value: 'Nueva Vizcaya', label: 'Nueva Vizcaya' },
  { value: 'Occidental Mindoro', label: 'Occidental Mindoro' },
  { value: 'Oriental Mindoro', label: 'Oriental Mindoro' },
  { value: 'Palawan', label: 'Palawan' },
  { value: 'Pampanga', label: 'Pampanga' },
  { value: 'Pangasinan', label: 'Pangasinan' },
  { value: 'Quezon', label: 'Quezon' },
  { value: 'Quirino', label: 'Quirino' },
  { value: 'Rizal', label: 'Rizal' },
  { value: 'Romblon', label: 'Romblon' },
  { value: 'Samar', label: 'Samar' },
  { value: 'Sarangani', label: 'Sarangani' },
  { value: 'Siquijor', label: 'Siquijor' },
  { value: 'Sorsogon', label: 'Sorsogon' },
  { value: 'South Cotabato', label: 'South Cotabato' },
  { value: 'Southern Leyte', label: 'Southern Leyte' },
  { value: 'Sultan Kudarat', label: 'Sultan Kudarat' },
  { value: 'Sulu', label: 'Sulu' },
  { value: 'Surigao del Norte', label: 'Surigao del Norte' },
  { value: 'Surigao del Sur', label: 'Surigao del Sur' },
  { value: 'Tarlac', label: 'Tarlac' },
  { value: 'Tawi-Tawi', label: 'Tawi-Tawi' },
  { value: 'Zambales', label: 'Zambales' },
  { value: 'Zamboanga del Norte', label: 'Zamboanga del Norte' },
  { value: 'Zamboanga del Sur', label: 'Zamboanga del Sur' },
  { value: 'Zamboanga Sibugay', label: 'Zamboanga Sibugay' },
  { value: 'Other', label: 'Other' }
]

/** Cities by province. Province value -> cities. */
const CITIES_BY_PROVINCE: Record<string, ProfileOption[]> = {
  'Metro Manila': [
    { value: '', label: 'e.g. Ozamiz City' },
    { value: 'Manila', label: 'Manila' },
    { value: 'Quezon City', label: 'Quezon City' },
    { value: 'Caloocan', label: 'Caloocan' },
    { value: 'Taguig', label: 'Taguig' },
    { value: 'Pasig', label: 'Pasig' },
    { value: 'Makati', label: 'Makati' },
    { value: 'Mandaluyong', label: 'Mandaluyong' },
    { value: 'Other', label: 'Other' }
  ],
  'Misamis Occidental': [
    { value: '', label: 'e.g. Ozamiz City' },
    { value: 'Ozamiz City', label: 'Ozamiz City' },
    { value: 'Oroquieta City', label: 'Oroquieta City' },
    { value: 'Tangub City', label: 'Tangub City' },
    { value: 'Other', label: 'Other' }
  ],
  'Misamis Oriental': [
    { value: '', label: 'e.g. Cagayan de Oro' },
    { value: 'Cagayan de Oro', label: 'Cagayan de Oro' },
    { value: 'Gingoog City', label: 'Gingoog City' },
    { value: 'El Salvador City', label: 'El Salvador City' },
    { value: 'Other', label: 'Other' }
  ],
  'Cebu': [
    { value: '', label: 'e.g. Cebu City' },
    { value: 'Cebu City', label: 'Cebu City' },
    { value: 'Lapu-Lapu City', label: 'Lapu-Lapu City' },
    { value: 'Mandaue City', label: 'Mandaue City' },
    { value: 'Talisay City', label: 'Talisay City' },
    { value: 'Other', label: 'Other' }
  ],
  'Davao del Sur': [
    { value: '', label: 'e.g. Davao City' },
    { value: 'Davao City', label: 'Davao City' },
    { value: 'Digos City', label: 'Digos City' },
    { value: 'Other', label: 'Other' }
  ],
  'Benguet': [
    { value: '', label: 'e.g. Baguio' },
    { value: 'Baguio', label: 'Baguio' },
    { value: 'Other', label: 'Other' }
  ],
  'Iloilo': [
    { value: '', label: 'e.g. Iloilo City' },
    { value: 'Iloilo City', label: 'Iloilo City' },
    { value: 'Passi City', label: 'Passi City' },
    { value: 'Other', label: 'Other' }
  ],
  'Zamboanga del Sur': [
    { value: '', label: 'e.g. Zamboanga City' },
    { value: 'Zamboanga City', label: 'Zamboanga City' },
    { value: 'Pagadian City', label: 'Pagadian City' },
    { value: 'Other', label: 'Other' }
  ],
  'Batangas': [
    { value: '', label: 'Select city' },
    { value: 'Batangas City', label: 'Batangas City' },
    { value: 'Lipa City', label: 'Lipa City' },
    { value: 'Tanauan City', label: 'Tanauan City' },
    { value: 'Other', label: 'Other' }
  ],
  'Cavite': [
    { value: '', label: 'Select city' },
    { value: 'Bacoor', label: 'Bacoor' },
    { value: 'Cavite City', label: 'Cavite City' },
    { value: 'Dasmariñas', label: 'Dasmariñas' },
    { value: 'Imus', label: 'Imus' },
    { value: 'Other', label: 'Other' }
  ],
  'Laguna': [
    { value: '', label: 'Select city' },
    { value: 'Calamba', label: 'Calamba' },
    { value: 'San Pablo City', label: 'San Pablo City' },
    { value: 'Santa Rosa', label: 'Santa Rosa' },
    { value: 'Other', label: 'Other' }
  ],
  'Rizal': [
    { value: '', label: 'Select city' },
    { value: 'Antipolo', label: 'Antipolo' },
    { value: 'Taytay', label: 'Taytay' },
    { value: 'Cainta', label: 'Cainta' },
    { value: 'Other', label: 'Other' }
  ],
  'Bohol': [
    { value: '', label: 'Select city' },
    { value: 'Tagbilaran City', label: 'Tagbilaran City' },
    { value: 'Other', label: 'Other' }
  ],
  'Negros Occidental': [
    { value: '', label: 'Select city' },
    { value: 'Bacolod City', label: 'Bacolod City' },
    { value: 'Other', label: 'Other' }
  ],
  'Palawan': [
    { value: '', label: 'Select city' },
    { value: 'Puerto Princesa City', label: 'Puerto Princesa City' },
    { value: 'Other', label: 'Other' }
  ],
  'Other': [
    { value: '', label: 'e.g. Ozamiz City' },
    { value: 'Manila', label: 'Manila' },
    { value: 'Quezon City', label: 'Quezon City' },
    { value: 'Cebu City', label: 'Cebu City' },
    { value: 'Davao City', label: 'Davao City' },
    { value: 'Ozamiz City', label: 'Ozamiz City' },
    { value: 'Other', label: 'Other' }
  ]
}

const PROFILE_GENDERS: ProfileOption[] = [
  { value: '', label: 'e.g. Male' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' }
]

const DEFAULT_CITY_OPTIONS: ProfileOption[] = [
  { value: '', label: 'Select province first' }
]

export function useProfileOptions () {
  const config = useRuntimeConfig()
  const apiBase =
    String((config.public as { apiBase?: string }).apiBase ?? '').trim() || ''

  async function fetchCitiesFromApi (province: string): Promise<ProfileOption[]> {
    if (!apiBase || !province) return []
    try {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/locations/cities?province=${encodeURIComponent(province)}`)
      if (!res.ok) return []
      const data = await res.json()
      if (Array.isArray(data)) {
        return data.map((c: { value?: string; label?: string; name?: string; id?: string }) => ({
          value: c.value ?? c.id ?? c.name ?? '',
          label: c.label ?? c.name ?? c.value ?? ''
        }))
      }
      return []
    } catch {
      return []
    }
  }

  function getCitiesForProvince (province: string): ProfileOption[] {
    if (!province) return DEFAULT_CITY_OPTIONS
    return CITIES_BY_PROVINCE[province] ?? [
      { value: '', label: 'Select city' },
      { value: 'Other', label: 'Other' }
    ]
  }

  return {
    states: PROFILE_PROVINCES,
    genders: PROFILE_GENDERS,
    getCitiesForProvince,
    fetchCitiesFromApi,
    hasLocationsApi: !!apiBase
  }
}
