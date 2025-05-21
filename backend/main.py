from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from auth import auth_router
from database.db_main import Addition
from database.setup import db_engine

app = FastAPI()

app.include_router(auth_router)

origins = ["http://localhost:5173"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

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
