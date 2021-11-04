from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return render_template("main.html")

@app.route("/api/naver/face", methods=['POST'])
def ncloud_face():
    client_id = "내 client ID"
    client_secret = "내 client Secret"
    url = "https://openapi.naver.com/v1/vision/face"
    files = {'image': request.files['image']}
    headers = {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    response = requests.post(url,  files=files, headers=headers)
    rescode = response.status_code
    if(rescode==200):
        print (response.text)
    else:
        print("Error Code:" + rescode)

    return response.text


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)