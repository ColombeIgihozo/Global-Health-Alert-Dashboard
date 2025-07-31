# Global-Health-Alert-Dashboard
Global Health Alert Dashboard

##  Features
- Fetches live COVID-19 data from external API
- Search by country
- Pagination with only 4 pages shown at once (Prev/Next navigation)
- Click a country to view more details
- Country flags included for visual reference
- Error handling for API failures
- Responsive and user-friendly UI
- Dashboard layout with global summary and country list

# Build backend Docker image
docker build -t yourdockerhubusername/global-health-backend ./backend

# Build frontend Docker image
docker build -t yourdockerhubusername/global-health-frontend ./frontend

# Run backend container on port 8081
docker run -d -p 8081:8081 yourdockerhubusername/global-health-backend

# Run frontend container on port 8080
docker run -d -p 8080:80 yourdockerhubusername/global-health-frontend

# Now open your browser and go to:
# http://localhost:8080

##  API Used
- [disease.sh API](https://disease.sh) – Provides live COVID-19 statistics.

> ⚠ API keys are securely managed with environment variables.

##  Demo
A recorded demo is available to show the dashboard functionalities and how users can interact with it.
https://youtu.be/J1bBL-0gaVQ

##  Acknowledgements
Thanks to the disease.sh API and open-source contributors who made this possible.
EOF
