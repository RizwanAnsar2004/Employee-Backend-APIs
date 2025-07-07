
# Registration Flows


# Business/Organization Registration Flow

This document outlines the complete registration process for business owners or organizations, including OTP verification, user data collection, sensitive document submission, and manual verification.

---

## 📋 Overview

The registration flow is designed to ensure that all businesses and organizations are verified before gaining access. It includes OTP verification, user and organization data collection, and team approval.

---

## 🧾 Step-by-Step Process

### 1. Start Registration
- The user initiates registration by entering:
  - **Email**
  - **Phone number**

### 2. OTP Verification
- These values are saved in the `OTP_VERIFICATIONS` collection.
- An OTP is sent to both the **email** and **phone number**.
- User is required to verify the OTP.

### 3. OTP Verification Check
- **If OTP is not verified:**
  - User is prompted to complete verification.
- **If OTP is verified:**
  - Proceed to the next step.

### 4. Collect Business Owner Info
- Gather the following:
  - `UserID` (identity)
  - First Name
  - Last Name
  - Date of Birth

### 5. Password Creation
- User sets a secure password.

### 6. Collect Sensitive Information
- Required:
  - `FrontLicenseImgID`
  - `BackLicenseImgID`
- Optional:
  - Bank Name
  - Bank ID
  - Account Title
  - Account Number
  - SWIFT Code

### 7. Store User Info
- All collected user data is saved in the `USERS` collection.

### 8. Collect Organization Information
- Gather the following:
  - Name
  - Type
  - Registration Number
  - (Optional) License Number
  - Industry/Sector
  - Email
  - Phone Number
  - Website
  - Address (City, Country)
  - Established Date
  - Logo
  - Description
  - (Optional) Number of Employees

### 9. Verification by Internal Team
- The registration is reviewed manually by the verification team.

### 10. Final Decision
- **If approved:**
  - Registration is marked as **Successful**.
- **If failed:**
  - User is notified via **email**.
  - A reason is provided.
  - A link is given to retry registration.

---

## 🗃️ MongoDB Collections Used
- `OTP_VERIFICATIONS`
- `USERS`
- `LICENSES`
- `USER_BANKS`
- `USER_BUSINESSES` or `ORGANIZATIONS`

---

## ✅ End of Process
Once the organization is approved, the registration is complete.

# Business/Organization Registration Flow

This document outlines the complete registration process for business owners or organizations, including OTP verification, user data collection, sensitive document submission, and manual verification.

---

## 📋 Overview

The registration flow is designed to ensure that all businesses and organizations are verified before gaining access. It includes OTP verification, user and organization data collection, and team approval.

---

## 🧾 Step-by-Step Process

### 1. Start Registration
- The user initiates registration by entering:
  - **Email**
  - **Phone number**

### 2. OTP Verification
- These values are saved in the `OTP_VERIFICATIONS` collection.
- An OTP is sent to both the **email** and **phone number**.
- User is required to verify the OTP.

### 3. OTP Verification Check
- **If OTP is not verified:**
  - User is prompted to complete verification.
- **If OTP is verified:**
  - Proceed to the next step.

### 4. Collect Business Owner Info
- Gather the following:
  - `UserID` (identity)
  - First Name
  - Last Name
  - Date of Birth

### 5. Password Creation
- User sets a secure password.

### 6. Collect Sensitive Information
- Required:
  - `FrontLicenseImgID`
  - `BackLicenseImgID`
- Optional:
  - Bank Name
  - Bank ID
  - Account Title
  - Account Number
  - SWIFT Code

### 7. Store User Info
- All collected user data is saved in the `USERS` collection.

### 8. Collect Organization Information
- Gather the following:
  - Name
  - Type
  - Registration Number
  - (Optional) License Number
  - Industry/Sector
  - Email
  - Phone Number
  - Website
  - Address (City, Country)
  - Established Date
  - Logo
  - Description
  - (Optional) Number of Employees

### 9. Verification by Internal Team
- The registration is reviewed manually by the verification team.

### 10. Final Decision
- **If approved:**
  - Registration is marked as **Successful**.
- **If failed:**
  - User is notified via **email**.
  - A reason is provided.
  - A link is given to retry registration.

---

## 🗃️ MongoDB Collections Used
- `OTP_VERIFICATIONS`
- `USERS`
- `LICENSES`
- `USER_BANKS`
- `USER_BUSINESSES` or `ORGANIZATIONS`

---

## ✅ End of Process
Once the organization is approved, the registration is complete.

# Business/Organization Registration Flow

This document outlines the complete registration process for business owners or organizations, including OTP verification, user data collection, sensitive document submission, and manual verification.

---

## 📋 Overview

The registration flow is designed to ensure that all businesses and organizations are verified before gaining access. It includes OTP verification, user and organization data collection, and team approval.

---

## 🧾 Step-by-Step Process

### 1. Start Registration
- The user initiates registration by entering:
  - **Email**
  - **Phone number**

### 2. OTP Verification
- These values are saved in the `OTP_VERIFICATIONS` collection.
- An OTP is sent to both the **email** and **phone number**.
- User is required to verify the OTP.

### 3. OTP Verification Check
- **If OTP is not verified:**
  - User is prompted to complete verification.
- **If OTP is verified:**
  - Proceed to the next step.

### 4. Collect Business Owner Info
- Gather the following:
  - `UserID` (identity)
  - First Name
  - Last Name
  - Date of Birth

### 5. Password Creation
- User sets a secure password.

### 6. Collect Sensitive Information
- Required:
  - `FrontLicenseImgID`
  - `BackLicenseImgID`
- Optional:
  - Bank Name
  - Bank ID
  - Account Title
  - Account Number
  - SWIFT Code

### 7. Store User Info
- All collected user data is saved in the `USERS` collection.

### 8. Collect Organization Information
- Gather the following:
  - Name
  - Type
  - Registration Number
  - (Optional) License Number
  - Industry/Sector
  - Email
  - Phone Number
  - Website
  - Address (City, Country)
  - Established Date
  - Logo
  - Description
  - (Optional) Number of Employees

### 9. Verification by Internal Team
- The registration is reviewed manually by the verification team.

### 10. Final Decision
- **If approved:**
  - Registration is marked as **Successful**.
- **If failed:**
  - User is notified via **email**.
  - A reason is provided.
  - A link is given to retry registration.

---

## 🗃️ MongoDB Collections Used
- `OTP_VERIFICATIONS`
- `USERS`
- `LICENSES`
- `USER_BANKS`
- `USER_BUSINESSES` or `ORGANIZATIONS`

---

## ✅ End of Process
Once the organization is approved, the registration is complete.

![USER REGISTRATION AND ORGANIZATION REGISTRATION FLOW](https://github.com/user-attachments/assets/f25558df-7e5d-4010-a30d-c4a90a18c0f4)

