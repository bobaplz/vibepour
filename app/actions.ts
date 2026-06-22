"use server";

export async function subscribeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return { success: false, error: "Missing API configuration" };
  }

  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, email }),
  });

  if (!res.ok) {
    return { success: false, error: "Subscription failed" };
  }

  return { success: true };
}
