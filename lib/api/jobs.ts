const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getJobs = async () => {
  const res = await fetch(`${baseUrl}/jobs`)
  return res.json()
}
