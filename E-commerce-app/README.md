# E-commerce App

A modern, fully responsive e-commerce web application built with vanilla JavaScript, HTML, and CSS. This project simulates a real online shopping experience, including product browsing, advanced filtering, cart, wishlist, user authentication, reviews, and an admin panel for product management. All data is managed client-side for demo purposes.

---

## ✨ Features

- **Product Catalog:**
  - Browse a wide range of products with images, prices, ratings, and categories. Products are loaded from an API and can be extended by the admin.

- **Search & Autocomplete:**
  - Real-time search bar with instant product suggestions and keyboard navigation.

- **Advanced Filtering:**
  - Filter by category (multi-select)
  - Filter by price range (min/max)
  - Filter by rating (4★ & above, 3★ & above)
  - Sort by popularity, price (low/high), or rating

- **Responsive Product Grid & List View:**
  - Toggle between grid and list layouts. Fully responsive for desktop and mobile.

- **Cart System:**
  - Add, remove, and update product quantities in the shopping cart
  - Cart persists in local storage per user/guest
  - "Fly to cart" animation for visual feedback
  - Cart modal with product details, quantity controls, and total calculation

- **Wishlist (Favorites):**
  - Add/remove products to a wishlist (per user or guest)
  - Wishlist persists in local storage
  - "Fly to wishlist" animation and modal for viewing favorites

- **User Authentication:**
  - Login, signup, guest mode, and admin login (all local, no backend)
  - Modal-based authentication with form validation
  - User session persists in local storage

- **Admin Panel:**
  - Add, edit, and delete products (admin only)
  - View user list (admin only)
  - Product management with inline editing and form-based addition

- **Product Details Modal:**
  - Image gallery with thumbnails
  - Product description, price, stock, and rating
  - Size selector for clothing categories
  - Add to cart from modal
  - Reviews section: users can add/view reviews (per product, per user)

- **Review System:**
  - Users can leave reviews (rating + comment) on products
  - Reviews are stored in local storage and displayed per product

- **Dark/Light Mode:**
  - Toggle between dark and light themes
  - Theme preference saved in local storage

- **Demo Payment Modal:**
  - Simulated Visa payment modal for checkout
  - Test card details provided for demo
  - Success/failure feedback with animated GIF

- **Animated UI & Visual Feedback:**
  - Animated floating category icons in hero section
  - Animated GIFs for cart, wishlist, and purchase success
  - Smooth transitions for modals and overlays

- **Persistent Data:**
  - Cart, wishlist, user session, and reviews are all saved in local storage

- **Mobile-Friendly & Accessible:**
  - Responsive design for all devices
  - Keyboard navigation for search and modals
  - Accessible labels and focus management

- **Error Handling & User Feedback:**
  - Graceful error messages for failed API calls or invalid actions
  - Alert modals for out-of-stock, invalid login, etc.

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/BlankName450/Brainwave_Matrix_Intern.git
   ```
2. **Navigate to the E-commerce app folder:**
   ```sh
   cd Brainwave_Matrix_Intern/E-commerce-app
   ```
3. **Open `index.html` in your browser.**
   - No build step or server required; all logic is client-side.

---

## 📁 Folder Structure

```
E-commerce-app/
  |-- cart.gif
  |-- fav.gif
  |-- index.html
  |-- login-card.html
  |-- purchased.gif
  |-- style.css
  |-- README.md
```

- `index.html` — Main application file
- `style.css` — Styles for the app
- `login-card.html` — Login/signup modal content
- `cart.gif`, `fav.gif`, `purchased.gif` — UI animations
- `README.md` — Project documentation

---

## 🙏 Credits & Acknowledgments

- Product data powered by [dummyjson.com](https://dummyjson.com/)
- Icons and images: [SVGRepo](https://www.svgrepo.com/), [Unsplash](https://unsplash.com/), and open-source resources
- Developed as part of a frontend learning challenge

---

**Feel free to fork, use, or contribute!**
