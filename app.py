import os
import uvicorn
import numpy as np
import face_recognition
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
import re
from io import BytesIO
import pandas as pd
from datetime import datetime
import shutil
import spacy

nlp = spacy.load("en_core_web_sm")

# Initialize FastAPI app
app = FastAPI()

MAX_ABSENCE_PERCENTAGE = 0.25

# Path to training images
TRAINING_IMAGES_PATH = 'Training_images'
UPLOADS_PATH = 'client/uploads'  # Directory for uploaded images

# Lists to store known face encodings and names
known_face_encodings: List[np.ndarray] = []
classNames: List[str] = []

def load_and_encode_faces(path: str):
    """
    Load images from the specified path and encode faces.
    """
    print("Loading training images from:", path)
    for filename in os.listdir(path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(path, filename)
            img = face_recognition.load_image_file(img_path)
            encodings = face_recognition.face_encodings(img)
            if encodings:
                known_face_encodings.append(encodings[0])
                classNames.append(os.path.splitext(filename)[0])
                print(f"Loaded and encoded: {filename}")
            else:
                print(f"Warning: No faces found in {filename}")
    print("Training Complete. Total images loaded:", len(classNames))

# Load known faces and names at startup
load_and_encode_faces(TRAINING_IMAGES_PATH)

# Define a response model
class RecognitionResult(BaseModel):
    name: str

@app.post("/recognize")
async def recognize_face(request: Request):
    try:
        # Get the JSON body from the request
        data = await request.json()
        print(data)

        filename = data.get('fileName')
        print(filename)

        if not filename:
            raise HTTPException(status_code=400, detail="Filename must be provided.")

        # Construct the path for the uploaded image
        upload_file_path = os.path.join(UPLOADS_PATH, filename)

        print(f"Trying to access file at: {UPLOADS_PATH}")

        # Check if the file exists
        if not os.path.isfile(upload_file_path):
            raise HTTPException(status_code=404, detail="File not found.")

        # Load the uploaded image from the correct path
        image = face_recognition.load_image_file(upload_file_path)

        # Find all face encodings in the uploaded image
        face_encodings = face_recognition.face_encodings(image)

        if not face_encodings:
            print("No face detected in the uploaded image.")
            return JSONResponse(content={"name": "Unknown"})

        face_encoding = face_encodings[0]
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"

        # Calculate distances and find the best match
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances) if matches else None

        if matches and best_match_index is not None and matches[best_match_index]:
            name = classNames[best_match_index]
        
        print(f"Recognition result: {name}")
        
        return RecognitionResult(name=name)

    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail="Failed to process the uploaded image.")


import re

MAX_ABSENCE_PERCENTAGE = 0.25  # Example: 25%

def extract_subject_info(query, subjects):
    """
    Extract subject information for attendance, marks, or leaves.
    """
    subject_match = re.search(r"(attendance|marks|leaves?) in (.+)", query.lower())
    if subject_match:
        action = subject_match.group(1).strip()
        subject_name = subject_match.group(2).title()

        for subject in subjects:
            if subject['subjectName'] == subject_name:
                return action, subject
    return None, None

def generate_response(action, subject, max_absence_percentage=MAX_ABSENCE_PERCENTAGE):
    """
    Generate a response based on the action and subject data.
    """
    if action == "attendance":
        return (f"In {subject['subjectName']}, you have attended {subject['totalPresent']} classes "
                f"and were absent for {subject['totalAbsent']} classes.")
    elif action == "marks":
        return (f"In {subject['subjectName']}, you scored {subject['Marks']} marks out of {subject['TotalMarks']}.")
    elif action in ["leaves", "leave"]:
        total_classes = subject['totalPresent'] + subject['totalAbsent']
        max_allowed_absent = int(total_classes * max_absence_percentage)
        remaining_leaves = max_allowed_absent - subject['totalAbsent']
        if remaining_leaves > 0:
            return (f"You can take {remaining_leaves} more leaves in {subject['subjectName']} "
                    f"out of a maximum of {max_allowed_absent} allowed absences.")
        else:
            return f"You have reached the maximum allowable absences in {subject['subjectName']}."
    return "Invalid action."

def chatbot_response(query, data):
    """
    Process the chatbot query and return a response based on the student's profile data.
    """
    # Personal information queries
    if "email" in query.lower():
        return f"Your email is {data.get('email', 'not provided')}."
    elif "username" in query.lower():
        return f"Your username is {data.get('username', 'not provided')}."
    elif "class" in query.lower():
        return f"The person is in class group {data.get('classGroup', 'unknown')}."
    
    # Subject-related queries
    action, subject = extract_subject_info(query, data.get('subjects', []))
    if subject:
        return generate_response(action, subject)

    # Total subjects query
    if "total subjects" in query.lower():
        return f"You are enrolled in {len(data.get('subjects', []))} subjects."
    
    # List all subjects
    elif "subjects" in query.lower():
        subject_names = ", ".join([subject['subjectName'] for subject in data.get('subjects', [])])
        return f"You are studying the following subjects: {subject_names}."
    
    return "I'm sorry, I didn't understand the question. Can you please rephrase?"



@app.post("/chatbot")
async def chatbot_endpoint(request: Request):
    """
    Endpoint for chatbot interaction.
    """
    try:
        # Get the JSON body from the request
        data = await request.json()

        # Extract query and student details
        query = data.get('query')
        student_details = data.get('studentDetails')

        if not query or not student_details:
            raise HTTPException(status_code=400, detail="Query and student details must be provided.")

        # Call the chatbot response function
        response = chatbot_response(query, student_details)
        return JSONResponse(content={"response": response})

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error processing the request.")
  

def generate_detailed_report(student_data):
    subjects = student_data.get('subjects', [])
    report = []

    # Adding Enhanced CSS Styles
    report.append("""
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f9fc;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #2c3e50;
            font-weight: bold;
        }
        h1 {
            font-size: 28px;
            border-bottom: 3px solid #16a085;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        h2 {
            font-size: 24px;
            margin-top: 20px;
            color: #16a085;
            border-left: 5px solid #16a085;
            padding-left: 10px;
        }
        h3 {
            font-size: 20px;
            margin-top: 15px;
            color: #3498db;
            border-left: 4px solid #3498db;
            padding-left: 8px;
        }
        p, li {
            font-size: 16px;
            color: #555;
            margin-bottom: 10px;
        }
        strong {
            color: #2c3e50;
            font-weight: bold;
        }
        ul {
            list-style-type: disc;
            margin-left: 20px;
            background-color: #ecf0f1;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
        }
        li {
            margin-bottom: 8px;
            font-size: 16px;
            color: #333;
        }
        .section {
            margin-bottom: 30px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .subject-analysis {
            padding: 10px 0;
            margin-top: 10px;
            border-top: 1px solid #ddd;
        }
        .recommendations ul {
            background-color: #f0f7f5;
            padding: 15px;
            border-radius: 5px;
            color: #2c3e50;
        }
        .recommendations li {
            font-weight: bold;
        }
        .conclusion {
            background-color: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
            color: #555;
            box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #16a085;
            margin: 20px 0;
            border-radius: 5px;
        }
        .total-summary {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
            margin-top: 20px;
            font-size: 16px;
            color: #333;
        }
        .highlight {
            background-color: #eafaf1;
            padding: 8px 12px;
            border-radius: 5px;
            font-weight: bold;
            color: #16a085;
        }
    </style>
    """)

    # Introduction
    report.append("<div class='section'>")
    report.append("<h1>Student Attendance Report</h1>")
    report.append("<hr>")
    report.append("<p><strong>This detailed report provides an analysis of the student’s attendance and class participation across various subjects.</strong> "
                  "The report also includes insights on engagement, performance risks due to absences, and recommendations for improvement.</p><br>")

    # Subject-wise analysis
    total_classes = 0
    total_present = 0
    total_absent = 0
    max_allowed_absent = 0
    subject_analysis = []

    for subject in subjects:
        subject_name = subject.get('subjectName')
        total_present_subject = subject.get('totalPresent')
        total_absent_subject = subject.get('totalAbsent')
        total_classes_subject = total_present_subject + total_absent_subject
        max_absent = int(total_classes_subject * MAX_ABSENCE_PERCENTAGE)
        remaining_leaves = max_absent - total_absent_subject

        subject_analysis.append(f"<div class='subject-analysis'><h3>{subject_name}</h3>")
        subject_analysis.append(f"<p>Total Classes Attended: <span class='highlight'>{total_present_subject}</span></p>")
        subject_analysis.append(f"<p>Total Absences: <span class='highlight'>{total_absent_subject}</span></p>")
        subject_analysis.append(f"<p>Total Classes Conducted: <span class='highlight'>{total_classes_subject}</span></p>")
        subject_analysis.append(f"<p>Maximum Allowed Absences: <span class='highlight'>{max_absent}</span></p>")
        subject_analysis.append(f"<p>Remaining Leaves: <span class='highlight'>{remaining_leaves}</span></p></div><br>")

        # Accumulate totals
        total_classes += total_classes_subject
        total_present += total_present_subject
        total_absent += total_absent_subject
        max_allowed_absent += max_absent

    # Add subject analysis to the report
    report.append("<div class='section'>")
    report.append("<h2>Subject-wise Attendance Breakdown</h2>")
    report.append("<hr>")
    report.extend(subject_analysis)
    report.append("</div>")

    # Absence Analysis
    total_classes_attended = total_present
    total_absences = total_absent
    total_possible_absences = max_allowed_absent
    total_absence_percentage = (total_absences / total_classes) * 100

    report.append("<div class='section total-summary'>")
    report.append("<h2>Absence Analysis</h2>")
    report.append("<hr>")
    report.append(f"<p>Total Classes Attended: <strong>{total_classes_attended}</strong></p>")
    report.append(f"<p>Total Absences: <strong>{total_absences}</strong></p>")
    report.append(f"<p>Total Possible Absences (allowed): <strong>{total_possible_absences}</strong></p>")
    report.append(f"<p>Absence Percentage: <strong>{total_absence_percentage:.2f}%</strong></p>")

    # Provide analysis based on absence percentage
    if total_absence_percentage > 25:
        report.append("<p>The student has exceeded the acceptable absence percentage for the semester. "
                      "This may negatively impact their performance. It is advised to make up for missed classes or seek extra help.</p><br>")
    else:
        report.append("<p>The student is within the acceptable absence percentage, indicating good engagement and participation.</p><br>")
    report.append("</div>")

    # Performance Insights
    report.append("<div class='section'>")
    report.append("<h2>Performance Insights</h2>")
    report.append("<hr>")

    if total_absence_percentage > 25:
        report.append("<p>Due to high absenteeism, the student's understanding may be impacted. To avoid gaps in learning, attending future classes is crucial.</p><br>")
    else:
        report.append("<p>The student's consistent attendance demonstrates commitment to their studies, suggesting a strong performance.</p><br>")

    # Recommendations
    report.append("<div class='section recommendations'>")
    report.append("<h2>Recommendations</h2>")
    report.append("<hr>")
    report.append("<ul>")
    
    if total_absence_percentage > 25:
        report.append("<li>Attend remaining classes to fill in learning gaps.</li>")
        report.append("<li>Seek support from instructors for missed content.</li>")
        report.append("<li>Utilize online resources to catch up on material.</li>")
    else:
        report.append("<li>Maintain attendance and active class participation.</li>")
        report.append("<li>Engage in discussions and seek feedback from teachers.</li>")
    
    report.append("</ul><br>")
    report.append("</div>")

    # Conclusion
    report.append("<div class='section conclusion'>")
    report.append("<h2>Conclusion</h2>")
    report.append("<hr>")
    report.append("<p>The student has maintained good attendance and engagement, with an overall positive impact on their performance. "
                  "It is advised to continue attending classes consistently and using resources to support learning. "
                  "Good attendance will contribute to academic success.</p><br>")
    report.append("</div>")

    # Final report as HTML
    return "".join(report)


@app.post("/generate-report")
async def generate_detailed_report_endpoint(request: Request):
    try:
        data = await request.json()
        student_data = data.get('studentDetails')

        if not student_data:
            raise HTTPException(status_code=400, detail="Student details must be provided.")

        # Generate the detailed report as a string
        report = generate_detailed_report(student_data)

        # Return the detailed report as JSON response
        return JSONResponse(content={"report": report})

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to generate the report.")


@app.post("/upload")
async def upload_image(request: Request):
    try:

        data = await request.json()
        filename = data.get('fileName')

        print(filename)
        # Construct the path for the source and destination files
        source_file_path = os.path.join(UPLOADS_PATH, filename)
        destination_file_path = os.path.join(TRAINING_IMAGES_PATH, filename)

        # Check if the source file exists in client/uploads
        if not os.path.isfile(source_file_path):
            raise HTTPException(status_code=404, detail="File not found in client/uploads.")

        # Copy the file to the Training_images directory
        shutil.copyfile(source_file_path, destination_file_path)

        return JSONResponse(content={"filename": filename, "message": "File uploaded successfully to Training_images"})

    except Exception as e:
        print(f"Error uploading image: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload the image.")

# Run the FastAPI app with the specified port
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
