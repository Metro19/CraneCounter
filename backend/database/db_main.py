from datetime import datetime
from typing import Optional

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, Mapped, relationship
from sqlalchemy.testing.schema import mapped_column


class Base(DeclarativeBase):
    pass

class Addition(Base):
    __tablename__ = "addition"

    id: Mapped[int] = mapped_column(primary_key=True)
    count: Mapped[int] = mapped_column()
    date: Mapped[Optional[datetime]] = mapped_column()

    def __repr__(self) -> str:
        return f"#{self.id} Count: {self.count} on {'None' if not self.date else self.date.isoformat()}"

class User(Base):
    __tablename__ = "user"

    username: Mapped[str] = mapped_column(String(40), primary_key=True)
    pwd: Mapped[str] = mapped_column(String(150))

class Token(Base):
    __tablename__ = "tokens"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(ForeignKey("user.username"))
    token_id: Mapped[str] = mapped_column(String(40))
    expiration: Mapped[datetime] = mapped_column()

