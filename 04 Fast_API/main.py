from fastapi import FastAPI

app = FastAPI(title="My First FastAPI Server")


@app.get("/")
async def root():
    return {
        "status": "running",
        "message": "FastAPI server successfully started 🚀"
    }


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/gyan")
async def gyan():
    return {
        "message": "FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints."
    }
