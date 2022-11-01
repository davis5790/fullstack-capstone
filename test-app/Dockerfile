FROM python:3.8-slim-buster
RUN pip install requests
RUN pip install flask
COPY app.py .
COPY templates/data.html templates/form.html templates/
EXPOSE 80
CMD ["python3", "app.py"]