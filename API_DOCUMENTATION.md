# Konversen API Documentation

## Overview
Konversen is an API for managing leads, campaigns, and user activities. Built with Node.js, Express.js, PostgreSQL (Supabase), and JWT authentication.

## Base URL
```
http://localhost:5000

or

https://konversen-be.up.railway.app/
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## User Roles
- **Admin**: Full system access
- **Manager**: Access to campaigns and leads management
- **Sales**: Limited access to assigned campaigns

---

## Authentication Endpoints

### POST /api/authentications
Login to get access and refresh tokens.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "id": "USR-abc123",
    "role": "Admin"
  }
}
```

### PUT /api/authentications
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Access token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### DELETE /api/authentications
Logout and invalidate refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Refresh token deleted successfully"
}
```

---

## Users Endpoints

### POST /api/users
**[Admin Only]** Create new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullname": "John Doe",
  "phone": "08123456789",
  "address": "Jalan ABC",
  "role": "Sales"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "userId": "USR-abc123"
  }
}
```

### GET /api/users
**[Admin Only]** Get all users with optional filters, search, and pagination.

**Query Parameters:**
- `role` (optional): Filter by role (Sales, Manager, Admin)
- `isActive` (optional): Filter by active status (true/false)
- `search` (optional): Search by name or email (case-insensitive)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "id": "USR-abc123",
        "fullname": "John Doe",
        "email": "user@example.com",
        "role": "Sales",
        "avatar_url": "https://supabase.co/storage/avatars/avatar.jpg",
        "is_active": true,
        "last_login_at": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 45,
      "itemsPerPage": 10
    }
  }
}
```

### GET /api/users/:id
**[Admin Only]** Get user by ID.

**Response:**
```json
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": {
    "id": "USR-abc123",
    "fullname": "John Doe",
    "email": "user@example.com",
    "phone": "08123456789",
    "address": "Jalan ABC",
    "role": "Sales",
    "avatar_url": "https://supabase.co/storage/avatars/avatar.jpg",
    "is_active": true,
    "last_login_at": "2024-01-15T10:30:00.000Z",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### PUT /api/users/:id
**[Admin Only]** Update user by ID.

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "fullname": "John Smith",
  "phone": "08199999999",
  "address": "New Address",
  "role": "Manager",
  "isActive": true
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User updated successfully"
}
```

### DELETE /api/users/:id
**[Admin Only]** Delete user by ID.

**Response:**
```json
{
  "status": "success",
  "message": "User deleted successfully"
}
```

### GET /api/users/profile
**[All Roles]** Get current user profile.

**Response:**
```json
{
  "status": "success",
  "message": "User profile retrieved successfully",
  "data": {
    "id": "USR-abc123",
    "email": "user@example.com",
    "fullname": "John Doe",
    "phone": "08123456789",
    "address": "Jalan ABC",
    "role": "Sales",
    "avatar_url": "https://supabase.co/storage/avatars/avatar.jpg",
    "is_active": true,
    "last_login_at": "2024-01-15T10:30:00.000Z",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### PUT /api/users/profile
**[All Roles]** Update current user profile.

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "fullname": "John Smith",
  "phone": "08199999999",
  "address": "New Address"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Profile updated successfully"
}
```

### PUT /api/users/change-password
**[All Roles]** Change current user password.

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

### GET /api/users/:id/activities
**[Admin Only]** Get user activities by ID.

**Query Parameters:**
- `limit` (optional): Number of activities to return (default: 50)

**Response:**
```json
{
  "status": "success",
  "message": "User activities retrieved successfully",
  "data": {
    {
      "id": "ACT-iOfUlBaoJjhTthTV",
      "campaign_name": "N/A",
      "lead_name": "N/A",
      "time": "2025-12-06T23:36:03.983Z",
      "action": "LOGIN",
      "description": "User USR-pYGoMGrNRmfW8D-- logged in successfully"
    }
  }
}
```

### GET /api/users/dashboard/stats
**[Admin Only]** Get user statistics for dashboard.

**Response:**
```json
{
  "status": "success",
  "message": "User statistics retrieved successfully",
  "data": {
    "totalAccounts": 25,
    "salesAccounts": 20,
    "managerAccounts": 4,
    "adminAccounts": 1,
    "activeAccounts": 23
  }
}
```

---

## Campaigns Endpoints

### POST /api/campaigns
**[Manager only]** Create new campaign.

**Request Body:**
```json
{
  "name": "Campaign A",
  "description": "Promo akhir tahun",
  "targetLeads": 200,
  "startDate": "2025-12-10T00:00:00.000Z",
  "endDate": "2026-01-10T00:00:00.000Z",
  "collaboratorEmails": [
    "sales@konversen.com",
    "sales1@example.com"
  ]
}

```

**Response:**
```json
{
  "status": "success",
  "message": "Campaign created successfully",
  "data": {
    "campaignId": "CMP-abc123"
  }
}
```

### GET /api/campaigns
**[All Roles]** Get campaigns based on user role and access.

**Query Parameters:**
- `name` (optional): Search by campaign name (case-insensitive)
- `status` (optional): Filter by campaign status (Active, Completed, Paused)
- `startDate` (optional): Filter campaigns starting from this date
- `endDate` (optional): Filter campaigns starting up to this date
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "message": "Campaigns retrieved successfully",
  "data": {
    "campaigns": [
      {
        "id": "CMP-abc123",
        "name": "Q1 2024 Campaign",
        "target_leads": 150,
        "start_date": "2024-01-01T00:00:00.000Z",
        "end_date": "2024-03-31T23:59:59.000Z",
        "created_by": "USR-manager1",
        "status": "Active", 
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 45,
      "itemsPerPage": 10
    }
  }
}
```

### GET /api/campaigns/:id
**[Based on Access]** Get campaign by ID.

**Response:**
```json
{
    "status": "success",
    "message": "Campaign retrieved successfully",
    "data": {
        "campaign": {
            "id": "CPG-KxTu97L4frU84adQ",
            "name": "Campaign A",
            "start_date": "2025-12-09T17:00:00.000Z",
            "end_date": "2026-01-09T17:00:00.000Z",
            "status": "Active",
            "target_leads": 200,
            "description": "Promo akhir tahun",
            "created_by": "Campaign Manager",
            "collaborators": [
                "sales@konversen.com",
                "sales1@example.com"
            ]
        }
    }
}
```

### PUT /api/campaigns/:id
**[Owner Only]** Update campaign by ID.

**Request Body:**
```json
{
  "name": "Campaign A",
  "description": "Promo akhir tahun",
  "targetLeads": 200,
  "startDate": "2025-12-10T00:00:00.000Z",
  "endDate": "2026-01-10T00:00:00.000Z",
  "collaboratorEmails": [
    "sales@konversen.com",
    "sales1@example.com"
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Campaign updated successfully"
}
```

### DELETE /api/campaigns/:id
**[Owner Only]** Delete campaign by ID.

**Response:**
```json
{
  "status": "success",
  "message": "Campaign deleted successfully"
}
```

### GET /api/campaigns/dropdown
**[All Roles]** Get campaigns for dropdown (simplified format).

**Response:**
```json
{
  "status": "success",
  "message": "Campaigns retrieved successfully",
  "data": [
      {
        "id": "CMP-abc123",
        "name": "Q1 2024 Campaign"
      }
  ]
}
```

### GET /api/campaigns/dashboard/stats
**[Based on Access]** Get campaign statistics for dashboard.
**Response:**
```json
{
  "status": "success",
  "message": "Campaign statistics retrieved successfully",
  "data": {
    "totalCampaigns": 10,
    "activeCampaigns": 6,
    "completedCampaigns": 3,
    "pausedCampaigns": 1
  }
}
```


---

## Leads Endpoints

### GET /api/leads
**[Based on Campaign Access]** Get leads with filters and pagination.

**Query Parameters:**
- `campaignId` (required): Campaign ID
- `status` (optional): Filter by lead status
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "message": "Leads retrieved successfully",
  "data": {
    "campaignId": "CMP-abc123",
    "leads": [
      {
        "id": "LD-13",
        "name": "Cahyadi Maryadi",
        "email": "cahyadi.13@gmail.com",
        "age": 53,
        "job": "Technician",
        "city": "Tangerang",
        "score": 11,
        "status": "Pending",
        "has_activity": false
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 95,
      "itemsPerPage": 10
    }
  }
}
```

### GET /api/leads/:id
**[Based on Campaign Access]** Get lead details by ID.

**Query Parameters:**
- `campaignId` (required): Campaign ID

**Response:**
```json
{
  "status": "success",
  "message": "Lead retrieved successfully",
  "data": {
    "id": "LD-13",
    "name": "Cahyadi Maryadi",
    "email": "cahyadi.13@gmail.com",
    "phone": "+62830-6510-349",
    "city": "Tangerang",
    "age": 53,
    "job": "Technician",
    "education": "Secondary",
    "balance": "Low",
    "contact": "Unknown",
    "score": 11,
    "cluster": "New Prospects",
    "campaign_status": "pending"
  }
}
```

### PUT /api/leads/:leadId/status
**[Based on Campaign Access]** Update lead status.

**Query Parameters:**
- `campaignId` (required): Campaign ID

**Request Body:**
```json
{
  "status": "Converted"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Lead status successfully changed to coverted"
}
```

### GET /api/leads/dashboard/stats
**[Based on Campaign Access]** Get lead statistics for dashboard.

**Query Parameters:**
- `campaignId` (required): Campaign ID

**Response:**
```json
{
  "status": "success",
  "message": "Lead statistics retrieved successfully",
  "data": {
    "totalLeads": 150,
    "highProbability": 45,
    "leadsContacted": 60,
    "convertedLeads": 15
  }
}
```

---

## Notes Endpoints

### POST /api/notes
**[Based on Campaign Access]** Add note to lead.

**Request Body:**
```json
{
  "campaignId": "CMP-abc123",
  "leadId": "LED-abc123",
  "noteText": "Called customer, interested in our service",
  "noteType": "Feedback"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Note created successfully",
  "data": {
    "noteId": "NOT-abc123"
  }
}
```

### GET /api/notes
**[Based on Campaign Access]** Get notes for a lead.

**Query Parameters:**
- `campaignId` (required): Campaign ID
- `leadId` (required): Lead ID

**Response:**
```json
{
  "status": "success",
  "message": "Notes retrieved successfully",
  "data": {
    "id": "NOT-O1u6-y2m4dYCacTt",
    "created_by": "Sales Representative",
    "time": "2025-12-07T02:10:12.191Z",
    "type": "Internal",
    "text": "Internal yes, C"
  }
}
```

### DELETE /api/notes/:noteId
**[Creator or Admin Only]** Delete note by ID.

**Response:**
```json
{
  "status": "success",
  "message": "Note deleted successfully"
}
```

---

## Upload Endpoints

### POST /api/upload/avatar
**[All Roles]** Upload avatar for current user.

**Request Body:** `multipart/form-data`
- `file`: Image file (max 5MB, jpg/jpeg/png/gif/webp)

**Response:**
```json
{
  "status": "success",
  "message": "Avatar uploaded successfully",
  "data": {
    "url": "https://supabase.co/storage/v1/object/public/avatars/USR-abc123-1674123456.jpg",
    "fileName": "USR-abc123-1674123456.jpg"
  }
}
```

### POST /api/upload/avatar/:userId
**[Admin Only]** Upload avatar for specific user.

**Request Body:** `multipart/form-data`
- `file`: Image file (max 5MB, jpg/jpeg/png/gif/webp)

**Response:**
```json
{
  "status": "success",
  "message": "Avatar uploaded successfully",
  "data": {
    "url": "https://supabase.co/storage/v1/object/public/avatars/USR-abc123-1674123456.jpg",
    "fileName": "USR-abc123-1674123456.jpg"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "fail",
  "message": "Invalid payload"
}
```

### 401 Unauthorized
```json
{
  "status": "fail",
  "message": "Access token not found"
}
```

### 403 Forbidden
```json
{
  "status": "fail",
  "message": "You do not have access to this resource"
}
```

### 404 Not Found
```json
{
  "status": "fail",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Sorry, there was a failure on our server."
}
```

---

## Lead Status Values
- `Pending`: Lead has not been contacted yet or is awaiting follow-up.
- `Contacted`: Initial contact has been made; lead responded but is not yet converted.
- `Converted`: Lead has been successfully converted to a customer.
- `Failed`: Lead is disqualified, uninterested, or lost and will not be converted.


## Note Types
- `System`: Automated system note
- `Feedback`: Customer feedback note
- `Internal`: Internal team note

---

## Rate Limiting
No rate limiting implemented in current version.

## Pagination
Default pagination: 10 items per page
Maximum limit: 100 items per page

## File Upload Limits
- Maximum file size: 5MB
- Supported formats: JPG, JPEG, PNG, GIF, WEBP
- Storage: Supabase Storage

---

*API Documentation v1.0 - Generated on December 5, 2025*