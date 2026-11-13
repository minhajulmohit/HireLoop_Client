const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${baseUrl}/users/${userId}/premium`)
  return response.json()
}
