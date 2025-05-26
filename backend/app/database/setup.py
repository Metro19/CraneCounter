# Connect to MariaDB server
from sqlalchemy import text, create_engine

from app.database.db_main import Base

connection_string = ("mysql://root:mypass@mdb:3306")
print(f"TEST {connection_string}")

server_engine = create_engine(connection_string)

# Create the database if it doesn't exist
with server_engine.connect() as conn:
    conn.execute(text("CREATE DATABASE IF NOT EXISTS cranes"))

server_engine.dispose()

# Connect to the new database and create tables
db_engine = create_engine(connection_string + "/cranes")
Base.metadata.create_all(db_engine)
