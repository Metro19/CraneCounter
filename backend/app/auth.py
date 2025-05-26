import uuid
from datetime import datetime, timedelta
from enum import Enum, auto
from typing import Union, Annotated

import argon2
from argon2.exceptions import VerificationError, VerifyMismatchError, InvalidHashError
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.db_main import User, Token
from app.database.setup import db_engine

ph = argon2.PasswordHasher()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
TOKEN_USE_LENGTH = timedelta(days=7)

class PasswordResults(Enum):
    Valid = auto()
    No_User = auto()
    Bad_Password = auto()
    DB_Error = auto()

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    with Session(db_engine) as session:
        db_token: Union[Token, None] = session.scalar(select(Token).where(Token.token_id == token))

        # check if object was returned
        if db_token is None:
            print("X")
            raise credentials_exception

        # check if token returned has expired
        if datetime.now() > db_token.expiration:
            session.delete(db_token)
            session.commit()
            print("Z")
            raise credentials_exception

        # return* the user
        return session.scalar(select(User).where(User.username == db_token.username))

def check_password(username: str, proposed_password: str) -> PasswordResults:
    """
    Check to see if the password for a user is valid

    :param username: Username to check
    :param proposed_password: Potential password to check
    :return: PasswordResults object of the outcome
    """

    with Session(db_engine) as session:
        db_user = session.scalar(select(User).where(User.username == username))

        # check for no user
        if db_user is None:
            return PasswordResults.No_User

        # check for valid password
        try:
            ph.verify(db_user.pwd, proposed_password)

            if ph.check_needs_rehash(db_user.pwd):
                db_user.pwd = ph.hash(db_user.pwd)

                session.commit()

            return PasswordResults.Valid


        except VerificationError:
            return PasswordResults.Bad_Password

        except InvalidHashError:
            return PasswordResults.DB_Error

def create_token(username: str) -> str:
    """
    Create a token for a user

    :param username: Username to create
    :return: New token for the user
    """
    with Session(db_engine) as session:
        new_token = str(uuid.uuid4())
        new_obj = Token(username=username, token_id=new_token, expiration=(datetime.now() + TOKEN_USE_LENGTH))

        session.add(new_obj)
        session.commit()

        return new_token

auth_router = APIRouter()

@auth_router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    result = check_password(form_data.username, form_data.password)

    if result != PasswordResults.Valid:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    else:
        return {"access_token": create_token(form_data.username), "token_type": "bearer"}

@auth_router.get("/user_check")
async def get_self(user_obj: Annotated[User, Depends(get_current_user)]):
    return {"username": user_obj.username}
