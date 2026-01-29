from fastapi import FastAPI
from mockData import products
from dtos import ProductDTO

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


@app.get("/products")
async def get_products():
    return {"products": products}


# get query  params example
@app.get("/products/{product_id}")
async def get_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return {"product": product}
    return {"message": "Product not found"}


# path param example
@app.get("/search/")
async def search_products(q: str = ""):
    results = []
    for product in products:
        if q.lower() in product["name"].lower():
            results.append(product)
    return {"results": results}


# post example
@app.post("/products/")
async def create_product(product: ProductDTO):
    products.append(product.dict())
    return {"message": "Product created successfully", "product": product}
