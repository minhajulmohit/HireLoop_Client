// public/companies folder er logo gulo company name er sathe match koray
const COMPANY_LOGOS = [
  "adobe",
  "airbnb",
  "amazon",
  "apple",
  "google",
  "meta",
  "microsoft",
  "netflix",
  "nvidia",
  "spotify",
  "tesla",
  "uber",
]

export function getCompanyLogo(companyName: string) {
  const match = COMPANY_LOGOS.find((logo) =>
    companyName.toLowerCase().replace(/\s+/g, "").includes(logo)
  )
  if (!match) return null
  return `/companies/${match}.png`
}
