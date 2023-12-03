from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import SubmitField

class UploadEventLogForm(FlaskForm):
    file = FileField('Event Log', validators=[FileAllowed(['csv'])])
    submit = SubmitField('Upload')
