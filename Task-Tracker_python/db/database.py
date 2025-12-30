from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import os
from dotenv import load_dotenv
from pymongo.server_api import ServerApi


# Load environment variables from .env file
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable is not set.")

client = AsyncIOMotorClient(MONGO_URI, server_api=ServerApi('1'))
try:
    # Test the connection
    client.admin.command('ping')
    print("MongoDB connection successful.")
except ConnectionFailure:   
    print("MongoDB connection failed.")
# Create a database instance
db = client[DATABASE_NAME]