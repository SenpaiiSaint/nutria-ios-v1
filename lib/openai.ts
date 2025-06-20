export async function aiSuggestMeal({
    protein,
    carbs,
    fat,
  }: {
    protein: number
    carbs: number
    fat: number
  }) {
    // Check for API key with multiple possible names
    const key = process.env.EXPO_PUBLIC_OPENAI_API_KEY || 
                process.env.OPENAI_API_KEY || 
                process.env.REACT_APP_OPENAI_API_KEY
    
    if (!key) {
      console.error('OpenAI API key not found. Please set EXPO_PUBLIC_OPENAI_API_KEY in your environment variables.')
      throw new Error('OpenAI API key not configured. Please check your environment variables.')
    }
  
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Create ONE simple meal idea that is high-protein and low-CO₂.
Target macros ≈ P${protein}g C${carbs}g F${fat}g.
Return name + short bullet-list of ingredients.
Keep it simple and practical.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      })
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error('OpenAI API error:', res.status, errorData)
        throw new Error(`OpenAI API error: ${res.status} - ${errorData.error?.message || 'Unknown error'}`)
      }
  
      const json = await res.json()
      const text = json?.choices?.[0]?.message?.content?.trim()
      
      if (!text) {
        throw new Error('No response from OpenAI API')
      }
      
      return text
    } catch (error) {
      console.error('OpenAI request failed:', error)
      if (error instanceof Error) {
        throw new Error(`AI suggestion failed: ${error.message}`)
      }
      throw new Error('AI suggestion failed: Unknown error')
    }
  }
  