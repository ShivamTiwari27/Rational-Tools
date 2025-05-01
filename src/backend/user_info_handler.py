from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import smtplib
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)

@app.route("/submit-info", methods=["POST"])
def submit_info():
    data = request.get_json()
    save_to_csv(data)
    send_email(data)
    return jsonify({"status": "success"}), 200

def save_to_csv(data):
    file_exists = False
    try:
        file_exists = open("user_submissions.csv", 'r')
    except FileNotFoundError:
        pass

    with open("user_submissions.csv", "a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        if not file_exists:
            writer.writerow(["Name", "Email", "Phone", "Purpose"])
        writer.writerow([data['name'], data['email'], data['phone'], data['purpose']])

def send_email(data):
    msg = EmailMessage()
    msg['Subject'] = "New WQI Tool User Submission"
    msg['From'] = "shivam99266452@gmail.com"
    msg['To'] = "shivam99266452@gmail.com"

    msg.set_content(f"""
    New user has submitted information:

    Name: {data['name']}
    Email: {data['email']}
    Phone: {data['phone']}
    Purpose: {data['purpose']}
    """)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login("shivam99266452@gmail.com", "dvyq xtrt lgyw dcva")
            smtp.send_message(msg)
    except Exception as e:
        print("Email sending failed:", e)

if __name__ == "__main__":
    app.run(debug=True)
