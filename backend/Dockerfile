FROM python:3.13

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install "fastapi[standard]"

COPY ./app /code/app

CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "8000"]