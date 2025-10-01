from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def summarize_text(text: str) -> str:
    prompt = f"Summarize the following content clearly and concisely:\n\n{text}"
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful summarizer."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.5,
    )
    return response.choices[0].message.content.strip()

def check_toxicity(text: str) -> dict:
    prompt = f"""Analyze the following text for toxicity. 
    Respond with JSON like:
    {{
      "toxic": true/false,
      "reasons": ["reason1", "reason2"]
    }}
    Text: {text}
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a content moderation assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0,
    )
    import json
    try:
        return json.loads(response.choices[0].message.content.strip())
    except:
        return {"toxic": False, "reasons": []}
