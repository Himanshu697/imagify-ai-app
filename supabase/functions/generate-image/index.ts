// Fixed Edge Function for Image Generation
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Generate image function called')
    
    const { prompt } = await req.json()
    console.log('Received prompt:', prompt)

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Generating image with prompt:', prompt)

    // Get API key from environment
    const apiKey = Deno.env.get('CLIPDROP_API_KEY')
    if (!apiKey) {
      console.error('CLIPDROP_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Call Clipdrop API
    const formData = new FormData()
    formData.append('prompt', prompt)

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: formData,
    })

    console.log('Clipdrop API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Clipdrop API error:', errorText)
      return new Response(
        JSON.stringify({ 
          error: 'Image generation failed', 
          details: errorText 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get image as array buffer
    const imageBuffer = await response.arrayBuffer()
    console.log('Image buffer size:', imageBuffer.byteLength)

    // Convert to base64 - FIXED METHOD
    const uint8Array = new Uint8Array(imageBuffer)
    const base64 = btoa(String.fromCharCode(...uint8Array))
    const base64Image = `data:image/png;base64,${base64}`

    console.log('Base64 image length:', base64Image.length)

    // Return response - FIXED: Direct string response instead of JSON.stringify
    return new Response(
      `{"imageUrl":"${base64Image}"}`,
      {
        status: 200,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    )

  } catch (error) {
    console.error('Function error:', error.message, error.stack)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})