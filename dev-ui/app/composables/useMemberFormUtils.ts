export interface MemberFormState {
  firstname: string
  middlename: string
  lastname: string
  birthdate: string
  role: string
  idNumber: string
  mobile: string
  email: string
  website: string
  gcashPoints: number
  bonusPoints: number
  voucherPoints: number
  honorariumPoints: number
  numberOfProjects: number
}

export function createEmptyMemberForm (): MemberFormState {
  return {
    firstname: '',
    middlename: '',
    lastname: '',
    birthdate: '',
    role: 'Participant',
    idNumber: '',
    mobile: '',
    email: '',
    website: '',
    gcashPoints: 0,
    bonusPoints: 0,
    voucherPoints: 0,
    honorariumPoints: 0,
    numberOfProjects: 0,
  }
}

export function formatMemberCreateError (err: any) {
  const d = err?.data ?? err?.response?._data
  if (!d) return err?.message || 'Request failed'
  if (typeof d === 'string') return d
  if (d.detail) return typeof d.detail === 'string' ? d.detail : JSON.stringify(d.detail)
  if (d.message) return d.message
  const fieldErrors = d.non_field_errors || d
  if (typeof fieldErrors === 'object') {
    const parts: string[] = []
    for (const [k, v] of Object.entries(fieldErrors)) {
      if (Array.isArray(v)) parts.push(`${k}: ${v.join(', ')}`)
      else if (v) parts.push(`${k}: ${v}`)
    }
    if (parts.length) return parts.join('\n')
  }
  return JSON.stringify(d)
}

export async function createMemberRequest (
  apiBase: string,
  form: MemberFormState,
  file: File | null | undefined,
) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(form)) {
    if (value === '' || value === null || value === undefined) continue
    formData.append(key, typeof value === 'number' || typeof value === 'boolean' ? String(value) : value)
  }

  if (file) {
    formData.append('profilePicture', file)
  }

  await $fetch(`${apiBase}/member/create/`, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })
}
