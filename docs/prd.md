# Requirements Document

## 1. Application Overview

**Application Name**: INFOTECH INTERNET SERVICES Bundle Purchase Platform

**Description**: A single-page web application enabling customers to purchase data bundles, SMS offers, and minutes offers instantly without registration. The platform includes an admin dashboard for package management and integrates with external payment gateway.

---

## 2. Users and Usage Scenarios

**Target Users**:
- Primary: Customers purchasing telecom bundles (data, SMS, minutes)
- Secondary: Admin managing bundle packages and monitoring sales

**Core Usage Scenarios**:
- Customers browse available bundles and complete purchases via M-Pesa payment
- Admin logs in to manage package inventory and view sales analytics

---

## 3. Page Structure and Functionality

### 3.1 Page Hierarchy

```
INFOTECH INTERNET SERVICES Platform
├── Home Page (Public)
│   ├── Header Navigation
│   ├── Hero Section
│   ├── Data Bundles Section
│   ├── Buy Many Times Offers Section
│   ├── SMS Offers Section
│   └── Minutes Offers Section
├── Track Order Page (Public)
├── How It Works Page (Public)
├── Contact Us Page (Public)
├── Payment Wait Page (Public)
├── Admin Login Modal
└── Admin Dashboard (Protected)
    ├── Summary Cards
    ├── Sales Trend Chart
    └── Package Management Table
```

### 3.2 Home Page

**Header Navigation**:
- Display application name「INFOTECH INTERNET SERVICES」with green verification tick icon
- Navigation links: Home, Track Order, How It Works, Contact Us
- Support button
- Admin Login button (opens login modal)

**Hero Section**:
- Dark green background
- Main text:「Stay Connected, Stay Ahead. Buy affordable data, SMS and minutes bundles instantly and securely.」
- Feature pills: Fast Delivery, Secure Payment, 24/7 Support

**Bundle Sections** (4 categories):

Each section displays bundle cards in grid layout with:
- Category title
- Individual bundle cards showing: title, price (Ksh), validity period
- Buy Now button on each card

**A. Data Bundles - Buy Once Daily**:
- Ksh 20 = 250MB (24 hrs)
- Ksh 19 = 1GB (1 hr)
- Ksh 50 = 1.5GB (3 hrs)
- Ksh 55 = 1.25GB (Till Midnight)
- Ksh 99 = 1GB (24 hrs)
- Ksh 49 = 350MB (7 Days)
- Ksh 300 = 2.5GB (7 Days)

**B. Buy Many Times Offers**:
- Ksh 110 = 2GB (24 hrs)
- Ksh 22 = 1GB (1 hr)
- Ksh 52 = 1.5GB (3 hrs)

**C. SMS Offers**:
- Ksh 5 = 20 SMS (24 hrs)
- Ksh 10 = 200 SMS (24 hrs)
- Ksh 30 = 1000 SMS (7 Days)

**D. Minutes Offers**:
- Ksh 21 = 45 Mins (3 hrs)
- Ksh 51 = 50 Mins (Till Midnight)
- Ksh 54 = Credo 200 (Till Midnight)
- Ksh 200 = 250 Mins (7 Days)

### 3.3 Track Order Page

Provides order tracking functionality for customers.

### 3.4 How It Works Page

Explains the bundle purchase process and platform features.

### 3.5 Contact Us Page

Displays contact information and support channels.

### 3.6 Purchase Flow

**Phone Number Modal**:
- Triggered when user clicks Buy Now on any bundle card
- Input field for Safaricom phone number (format: 07xxxxxxxx or 01xxxxxxxx)
- Proceed button

**Payment Wait Page**:
- Fullscreen display with green loader spinner
- Text:「Check on your Phone for Confirmation. Please wait for the automated M-Pesa STK prompt and input your PIN.」
- Automatically displayed after user clicks Proceed in phone number modal

### 3.7 Admin Login Modal

- Triggered by clicking Admin Login button in header
- Input fields: Username/Email, Password
- Login button

### 3.8 Admin Dashboard

**Summary Cards**:
- Total Revenue: KES 125,430
- Total Orders: 1,248
- Pending Payments: 28
- Sales trend chart visualization

**Package Management Table**:
- Displays all packages from database with columns: Category, Title, Price, Validity
- Action buttons per row: Edit Bundle, Delete Bundle
- Add New Bundle button above table
- Real-time synchronization with backend database

**Add/Edit Bundle Form**:
- Fields: Category (dropdown), Title, Price, Validity
- Save and Cancel buttons

---

## 4. Business Rules and Logic

### 4.1 Data Source Priority
- Fetch bundle data from backend database (packages table)
- If database returns empty or fails, display default fallback bundles as specified in section 3.2

### 4.2 Customer Purchase Flow
1. User clicks Buy Now on selected bundle card
2. System opens phone number input modal
3. User enters Safaricom phone number and clicks Proceed
4. System redirects user to payment gateway: https://pay.gifted.co.ke/pay/infotechservices
5. System simultaneously displays Payment Wait Page with loader and instruction text

### 4.3 Admin Authentication
- Hardcoded credentials:
  - Username/Email: boaz
  - Password: 123456789
- Successful login grants access to Admin Dashboard
- Failed login displays error message

### 4.4 Admin Package Management
- Add New Bundle: Opens form, saves new package to database upon submission
- Edit Bundle: Opens pre-filled form, updates existing package in database
- Delete Bundle: Removes package from database after confirmation
- All operations reflect immediately in both admin table and public bundle display

### 4.5 Database Structure

Table name: packages

Columns:
- id: UUID (primary key, auto-generated)
- category: TEXT (values: data_bundles, buy_many_times, sms_offers, minutes_offers)
- title: TEXT
- price: NUMERIC
- validity: TEXT
- created_at: TIMESTAMP WITH TIME ZONE (auto-generated)

Row Level Security:
- Public read access enabled for all users
- Full access (insert, update, delete) restricted to authenticated admin

### 4.6 Data Isolation
- Customer payment data is NOT stored in backend database
- Backend database only stores package information
- Payment processing handled entirely by external gateway: https://pay.gifted.co.ke/pay/infotechservices

---

## 5. Exceptions and Edge Cases

| Scenario | Handling |
|----------|----------|
| Database fetch fails | Display default fallback bundles |
| Invalid phone number format | Show validation error, prevent Proceed action |
| Admin login with wrong credentials | Display error message, remain on login modal |
| Delete last bundle in category | Allow deletion, category section shows empty state |
| Network timeout during payment redirect | User remains on Payment Wait Page, can manually navigate back |
| Concurrent admin edits | Last save wins, no conflict resolution |

---

## 6. Acceptance Criteria

1. Customer opens Home Page and views all four bundle categories with default or database-fetched packages
2. Customer clicks Buy Now on any bundle, enters valid Safaricom phone number in modal
3. Customer clicks Proceed, browser redirects to https://pay.gifted.co.ke/pay/infotechservices
4. Payment Wait Page displays with green loader and instruction text
5. Admin clicks Admin Login, enters credentials (boaz / 123456789), successfully accesses Admin Dashboard
6. Admin clicks Add New Bundle, fills form, saves, and new package appears in both admin table and public display
7. Admin edits existing bundle, changes price, saves, and updated price reflects on Home Page immediately
8. Admin deletes a bundle, confirms action, and bundle disappears from both admin table and public display

---

## 7. Out of Scope for Current Release

- Customer account registration and login system
- Order history tracking for customers
- Payment status verification or callback handling
- Email or SMS notifications
- Multi-language support
- Mobile app version
- Advanced analytics dashboard with date range filters
- Bulk package import/export functionality
- Customer reviews or ratings
- Promotional discount codes
- Automated inventory management
- Integration with telecom provider APIs for bundle activation