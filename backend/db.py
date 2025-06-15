# db.py
import motor.motor_asyncio
import os

MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB_NAME", "your_db_name")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]
requests_collection = db["inputlogs"]  # or your jobs collection name
