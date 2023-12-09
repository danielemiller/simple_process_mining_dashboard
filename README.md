# Simple Process Mining Dashboard

## Project Overview

The Simple Process Mining Dashboard is a web application designed for visualizing and analyzing business process data. It enables users to upload process data and engage in basic process mining tasks, with the results displayed on a user-friendly dashboard.

### Key Features

- **User Authentication**: Secure registration, login, and logout.
- **Data Upload and Storage**: Users can upload and store CSV files containing event logs.
- **Process Mining Operations**: Includes discovery of process models, cycle time calculation, and bottleneck identification.
- **Interactive Dashboard**: Visualization of process data and KPIs.
- **Responsive UI**: Intuitive and adaptive interface for various devices.

### Technology Stack

- **Backend**: Flask (Python)
- **Process Mining**: PM4Py library
- **Database**: SQLite / PostgreSQL
- **Frontend**: Angular, HTML, CSS, JavaScript
- **Version Control**: Git

## Development Setup

### Prerequisites

- Python 3.x
- Node.js and npm (for Angular frontend)
- Git

### Backend Setup

```sh
# Clone the repository
git clone <repository-url>
cd <repository-name>/backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate

# Install the requirements
pip install -r requirements.txt
```

### Frontend Setup

```sh
# Navigate to the frontend directory from the root of the repository
cd <repository-name>/frontend

# Install the dependencies
npm install

# Serve the application
ng serve

# The Angular app will be available at localhost:4200
```

### Running the Application

```sh
# Navigate to the backend directory
cd <repository-name>/backend

# Run the Flask app
flask run --port 5050

# The backend API will be available at localhost:5050
```

## Usage

After setting up both the frontend and backend, you can access the application through the browser at `localhost:4200`. From there, you can register an account, log in, upload event logs, and view the process mining dashboard.

## New Feature: Event Log Generator

The application now includes a feature to generate random event logs. This allows users to test the app even if they don't have any event logs readily available.

### Generating an Event Log

- Choose a core process like Procurement, Accounts Payable, Order Management, or Accounts Receivable from the dropdown menu.
- Click the "Generate and Download Log" button to create and download an event log with 3000 rows of process data.

## Contributions

This project is open for contributions. Please ensure to follow the project's coding standards and submit a pull request for review.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.