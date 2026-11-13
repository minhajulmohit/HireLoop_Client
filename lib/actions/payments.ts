const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
export const paymentSuccessVerify = async (sessionId: string) => {
  const response = await fetch(`${baseUrl}//payment/success-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  })
  return response.json()
}
