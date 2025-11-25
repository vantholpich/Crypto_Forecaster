import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { base64Image } = await req.json();

        if (!base64Image) {
            throw new Error('No image provided');
        }

        const apiKey = Deno.env.get('OPENAI_API_KEY');
        if (!apiKey) {
            throw new Error('OpenAI API Key not set');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-4o", // Using gpt-4o as it's the latest vision capable model
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "You are a crypto trading expert. Analyze this chart and provide a price forecast. Be concise. Give a BUY/SELL/HOLD recommendation and a target price." },
                            {
                                type: "image_url",
                                image_url: {
                                    "url": `data:image/jpeg;base64,${base64Image}`,
                                },
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await response.json();
        const forecast = data.choices[0].message.content;

        return new Response(JSON.stringify({ forecast }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
