from datetime import datetime
from typing import Optional

from sqlalchemy.orm import DeclarativeBase, Mapped
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