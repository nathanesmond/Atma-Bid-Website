# **Kelas E Kelompok 7**

## **Anggota Kelompok**

-   **Kevin Philips Tanamas (220711789)** - Frontend & Integrasi
-   **Nathanael Esmond Hartono (220711888)** - Frontend & Responsive
-   **Marsella Adinda Oktaviani (220712081)** - Frontend & Integrasi
-   **Stanyslaus Hary Muntoro (220712140)** - Frontend, Backend & Integrasi

---

## **Username & Password Login**

### Login User

-   **Username**: `userpw`
-   **Password**: `userpw`

### Login Admin

-   **Username**: `admin@gmail.com`
-   **Password**: `admin1234`

---

## **Bonus yang Diambil**

### Hosting

-   **Backend**: [https://atmabid-backend.stary.dev/](https://atmabid-backend.stary.dev/)
-   **Frontend**: [https://demo-frontend.com/](https://demo-frontend.com/)

### Routes API

#### **Public Routes**

-   `POST /register` - Register user baru
-   `POST /login` - Login user
-   `POST /forgot-password` - Reset password
-   `GET /auctions/featured-cars` - Menampilkan mobil unggulan
-   `GET /auctions/hottest-bids` - Menampilkan penawaran tertinggi
-   `GET /auctions/upcoming` - Menampilkan lelang yang akan datang

#### **Protected Routes** _(auth:sanctum)_

-   **User**

    -   `GET /user/profile` - Menampilkan profil user
    -   `POST /user/profile` - Update profil user
    -   `POST /user/change-password` - Mengganti password

-   **Cars**

    -   `GET|POST /cars`
    -   `GET|PUT|DELETE /cars/{id}`

-   **Auctions**

    -   `GET|POST /auctions`
    -   `GET|PUT|DELETE /auctions/{id}`

-   **Payments**

    -   `GET|POST /payments`
    -   `GET|PUT|DELETE /payments/{id}`

-   **Bids**

    -   `GET /auctions/{auction_id}/bids` - Menampilkan semua bid pada auction
    -   `POST /bids` - Menambahkan bid baru

-   **Admin**
    -   `GET /getAllUser` - Menampilkan semua user
    -   `GET /getAllAuction` - Menampilkan semua auction
    -   `PUT /updateUserStatus/{user_id}` - Update status user
    -   `PUT /updateAuction/{auction_id}` - Update auction
    -   `DELETE /deleteUser/{user_id}` - Hapus user

---

### **React**

-   Link Repository: [https://github.com/Vingorithm/PW_E_7_React](https://github.com/Vingorithm/PW_E_7_React)

---

### **Technologies Used**

-   **Backend**: Laravel
-   **Frontend**: React.js
-   **Database**: MySQL
-   **Authentication**: Sanctum

---
