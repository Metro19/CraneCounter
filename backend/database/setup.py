# Connect to MariaDB server
from sqlalchemy import text, create_engine

from database.db_main import Base

server_engine = create_engine("mariadb://root:mypass@localhost:3306")

# Create the database if it doesn't exist
with server_engine.connect() as conn:
    conn.execute(text("CREATE DATABASE IF NOT EXISTS cranes"))

# Connect to the new database and create tables
db_engine = create_engine("mariadb://root:mypass@localhost:3306/cranes")
Base.metadata.create_all(db_engine)
