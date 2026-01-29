from pydantic import BaseModel


class ProductDTO(BaseModel):
    id: int
    name: str
    price: float
    in_stock: bool