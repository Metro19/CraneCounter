from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import auth_router
from app.database.db_main import Addition
from app.database.setup import db_engine
from app.modify_counts import counts_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(counts_router)

origins = ["http://localhost:5173", "localhost", "http://localhost"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/count")
async def root():
    total = 0

    with Session(db_engine) as session:
        for row in session.scalars(select(Addition)).all():
            if not row.give_away:
                total += row.count

    return {"count": total}


@app.get("/disposed_of")
async def say_hello():
    total = 0

    with Session(db_engine) as session:
        for row in session.scalars(select(Addition)).all():
            if row.count < 0 and row.give_away:
                total += row.count

    return {"count": abs(total)}
