# Konversify - Lead Management System

Konversify is a web application for managing leads and marketing campaigns with automatic scoring system using machine learning. This application provides various user roles (Admin, Manager, Sales) with features tailored for each role.

## 🚀 Key Features

### Admin Dashboard
- User account management (CRUD)
- View user account details
- Filter and search users
- User activity monitoring
- Access control and permissions

### Manager Dashboard
- Campaign management (CRUD).
- Set collaborators for campaigns.
- View all campaign details.
- Filter and search campaigns.
- View leads with scoring and cluster information.
- Filter and search leads.
- Add notes and update lead statuses across all campaigns.

### Sales Dashboard
- View campaign details for assigned campaigns only.
- Filter and search campaigns.
- View leads with scoring and cluster information for assigned campaigns only.
- Filter and search leads.
- Add notes and update lead statuses for assigned campaigns only.

## 🛠️ Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.4
- **Styling**: Tailwind CSS 3.4.18
- **HTTP Client**: Axios 1.13.2
- **Icons**: React Icons 5.5.0, Lucide React 0.548.0
- **UI Components**: React Range 1.10.0

## 📋 Prerequisites

Make sure you have installed:
- Node.js (version 16 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. Clone this repository
```bash
git clone <repository-url>
cd FRONTEND-main
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open browser and access
```
http://localhost:5173
```

## 📦 Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets (images, icons)
│   ├── admin/
│   ├── logo/
│   ├── manager/
│   └── sales/
├── components/      # Reusable components
│   ├── admin/       # Admin-specific components
│   ├── campaign/    # Campaign management components
│   ├── layout/      # Layout components (Header, Navbar, etc)
│   ├── profile/     # Profile management components
│   ├── sales/       # Sales-specific components
│   └── utils/       # Utility components (Modal, Button, etc)
├── contexts/        # React Context (AuthContext)
├── hooks/           # Custom hooks
├── pages/           # Page components
│   ├── Admin/
│   ├── Manager/
│   └── Sales/
├── services/        # API services
│   ├── api.js
│   ├── authService.js
│   ├── campaignService.js
│   ├── leadService.js
│   ├── noteService.js
│   ├── profileService.js
│   ├── uploadService.js
│   └── userService.js
├── App.jsx          # Main App component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🔐 Roles & Permissions

### Admin
- Full access to all features
- Manage user accounts
- View all data

### Manager
- Create and manage campaigns
- Invite sales to campaign
- Monitor campaign performance

### Sales
- View assigned campaigns
- Manage leads (update status, add notes)
- View lead details and scoring
- Filter and search leads

## 📱 Main Pages

### Authentication
- `/` - Login page

### Admin
- `/admin/dashboard` - Admin dashboard
- `/admin/profile` - Admin profile

### Manager
- `/manager/dashboard` - Manager dashboard
- `/manager/campaign` - Campaign management
- `/manager/profile` - Manager profile

### Sales
- `/sales/dashboard` - Sales dashboard
- `/sales/campaign` - Campaign details and leads
- `/sales/profile` - Sales profile

## 🌐 Environment Variables

Create a `.env` file in the root directory and add the following:
```env
API_URL=http://localhost:your-backend-port
```

## 🎯 Feature Details

### Lead Scoring
- Receive probability scores processed by the ML model
- Visual indicator with colors:
  - High (>= 80%): Green
  - Medium (40-79%): Yellow
  - Low (< 40%): Red

### Campaign Management
- Set target leads
- Define campaign period
- Invite collaborators
- Track progress with summary cards

### Lead Management
- Multiple status tracking
- Add notes for each lead
- Advanced filtering (age, job, status, probability)

### Profile Management
- Update user profile
- Change password
- Upload avatar

## 🐛 Troubleshooting

### Port already in use
```bash
# Change port in vite.config.js or kill process using the port
```

### Dependencies error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author
- Ilham Ramadhan - R657D5Y0835
- Rizka Alfadilla - R299D5Y1740
- Rizky Hanifa Afania -  R012D5X1749

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: Make sure the backend API is running before running this frontend application.
