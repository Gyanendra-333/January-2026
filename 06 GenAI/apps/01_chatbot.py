from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    temperature=0.2
)

try:
    response = llm.invoke("What is the capital of France?")
    print(response.content)
except Exception as e:
    print("LLM Error:", e)
