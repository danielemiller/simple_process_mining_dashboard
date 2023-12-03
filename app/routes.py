import os
from flask import render_template, request, url_for, redirect
from werkzeug.utils import secure_filename
from app import app, db
from app.models import EventLog, User
from app.forms import UploadEventLogForm

# Set the directory where uploaded files will be stored
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=['GET', 'POST'])
def upload():
    form = UploadEventLogForm()
    if form.validate_on_submit():
        # Get the file fro the form
        file = form.file.data

        # Secure the filename before storing it directly from the user input
        filename = secure_filename(file.filename)

        # Define the full path for the file
        file_path = os.path.join(app.config(['UPLOAD_FOLDER'], filename))

        # Save the file to the filesystem
        file.save(file_path)

        # Create a new EventLog entry
        event_log = EventLog(filename=filename, user_id=current_user.id)
        db.session.add(event_log)
        db.session.commit()

        return redirect(url_for('home'))
    return render_template('upload.html', title='Upload Event Log', form=form)

@app.route("/register", methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return 'User registered!'