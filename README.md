# Residential Complexes Management

A full-stack web application for managing residential complexes, buildings, and admins. The platform includes features for listing, adding, and managing these entities with role-based admin assignment. Built with **Angular** (frontend) and **Flask** (backend).

Some Context for the app:
There are 3 roles: Super admin, Complex admin, and Building admin
Each of these 3 roles have different access to the application: 

- **Super Admin** can see all admins, add admins, search for admins, see all complexes and add complexes while assigning respective admins, and see all buildings with the ability to filter them based on a residential complex.  
- **Complex Admins** can see their assigned complexes with their buildings only and cannot add a complex or building.  
- **Building Admins** can only see their assigned buildings.  

None of the other admins can access admins info.

---

## Project Structure
```bash
residential-complexes-management/
│
├── frontend/ # Angular application
│ ├── src/
│    ├── core/ (contains guards/ interceptors/ models/interfaces and services)
│    ├── environments/
│    ├── features/ (contains the pages)
│    ├── shared/ (contains reused components)
│ ├── angular.json
│ └── package.json
│
├── backend/ # Flask APIs
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── validations/
│ ├── requirements.txt\
│ ├── app.py\
│ ├── config.py\
│ ├── extensions.py\
```

## Running the Application

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Instal dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set .env files with the variables:
   ```bash
   DB_USER
   DB_PASSWORD
   DB_HOST
   DB_NAME
   DB_PORT
   SECRET_KEY
   ```

4. Run the flask server
   ```bash
   .venv\Scripts\activate
   py app.py
   ```

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Instal dependencies:
   ```bash
   npm install
   ```

3. Run the frontend
   ```bash
   npm start or ng serve
   ```
