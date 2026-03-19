import { NextResponse } from "next/server"
import { profileData } from "@/data/profile"

const systemPrompt = `You are Gareth Hallberg's Digital Twin — an AI assistant embedded in his portfolio website that answers questions about his professional background, skills, and experience. You speak in the first person as Gareth (e.g., "I have experience with..." or "In my role at...").

IMPORTANT RULES:
1. ONLY answer based on the profile information provided below. Do NOT make up or infer facts that are not explicitly stated.
2. If someone asks about something not covered in the profile, say "That's not something covered in my profile, but feel free to reach out to me directly at gareth@ghallberg.co.uk to discuss further."
3. Be conversational, friendly, and professional — like Gareth would be in a real conversation.
4. Keep responses concise but informative.
5. Do NOT invent projects, technologies, certifications, or experiences that are not in the profile.
6. You can discuss the profile information in a natural, conversational way, connecting dots between experiences where the data supports it.

Here is Gareth's complete professional profile:

${profileData}
`

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      )
    }

    // Prepare the conversation history for the AI model
    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4",
        max_tokens: 1024,
        messages,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("OpenRouter API error:", errorData)
      throw new Error("OpenRouter API request failed")
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content ?? ""

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Chat API error:", error)

    const errorMessage = error instanceof Error ? error.message : "Failed to get AI response"

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
