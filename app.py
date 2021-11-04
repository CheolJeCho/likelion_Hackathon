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
    client_id = "hisrmopk72"
    client_secret = "OVFnfHyy0JbVqpjFS6goeTPlKQgiNetvuPi2lsL0"
    url = "https://naveropenapi.apigw.ntruss.com/vision/v1/face"
    files = {'image': request.files['image']}
    headers = {'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret }
    response = requests.post(url,  files=files, headers=headers)
    rescode = response.status_code
    if(rescode==200):
        print (response.text)
    else:
        print("Error Code:" + rescode)

    return response.text


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)