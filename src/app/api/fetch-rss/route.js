// import fetch from 'node-fetch';
import xml2js from 'xml2js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(text);
    
    if (result.rss && result.rss.channel && result.rss.channel[0].item) {
      return new Response(JSON.stringify(result.rss.channel[0].item), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error("Invalid RSS feed structure", result);
      return new Response(JSON.stringify({ error: 'Invalid RSS feed structure' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.error("Error fetching RSS feed", err);
    return new Response(JSON.stringify({ error: 'Error fetching RSS feed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
