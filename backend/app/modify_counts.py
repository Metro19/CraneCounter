import dataclasses
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database.db_main import User, Addition

counts_router = APIRouter()
from app.database.setup import db_engine

@dataclasses.dataclass()
class Counts:
    total: int
    given_away: int
    on_hand: int

def get_counts(session: Session) -> Counts:
    total = 0
    given_away = 0
    on_hand = 0

    for row in session.scalars(select(Addition)).all():
        on_hand += row.count
        total += max(0, row.count)

        if not row.give_away and row.count < 0:
            total += row.count

        if row.give_away:
            given_away += row.count

    return Counts(total=total, given_away=abs(given_away), on_hand=on_hand)

@counts_router.get("/internal_counts")
async def get_internal_counts(user_obj: Annotated[User, Depends(get_current_user)]):
    with Session(db_engine) as session:
        return get_counts(session)

@counts_router.post("/add_one")
async def add_one(user_obj: Annotated[User, Depends(get_current_user)]):
    with Session(db_engine) as session:
        session.add(Addition(count=1, date=datetime.now(), give_away=False))

        return get_counts(session)

@counts_router.post("/change_counts")
async def add_one(user_obj: Annotated[User, Depends(get_current_user)], add: int, subtract: int, give_away: int):
    with Session(db_engine) as session:
        if add:
            session.add(Addition(count=add, give_away=False))

        if subtract:
            session.add(Addition(count=(subtract * -1), give_away=False))

        if give_away:
            session.add(Addition(count=(give_away * -1), date=datetime.now(), give_away=True))

        session.commit()

        return get_counts(session)