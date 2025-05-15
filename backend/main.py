from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import create_engine, text, select
from sqlalchemy.orm import Session

from database.db_main import Base, Addition

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Connect to MariaDB server
server_engine = create_engine("mariadb://root:mypass@localhost:3306")

# Create the database if it doesn't exist
with server_engine.connect() as conn:
    conn.execute(text("CREATE DATABASE IF NOT EXISTS cranes"))

# Connect to the new database and create tables
db_engine = create_engine("mariadb://root:mypass@localhost:3306/cranes")
Base.metadata.create_all(db_engine)

@app.get("/count")
async def root():
    total = 0

    with Session(db_engine) as session:
        for row in session.scalars(select(Addition)).all():
            if row.count > 0:
                total += row.count

    return {"count": total}


@app.get("/disposed_of")
async def say_hello():
    total = 0

    with Session(db_engine) as session:
        for row in session.scalars(select(Addition)).all():
            if row.count < 0:
                total += row.count

    return {"count": abs(total)}
