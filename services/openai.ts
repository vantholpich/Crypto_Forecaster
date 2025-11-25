import { supabase } from './supabase';

export const analyzeChart = async (base64Image: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-chart', {
      body: { base64Image },
    });

    if (error) {
      throw new Error(error.message || 'Failed to invoke Edge Function');
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data.forecast;
  } catch (error) {
    console.error("Error analyzing chart:", error);
    throw error;
  }
};
