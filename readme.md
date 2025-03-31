# Process

---

The website will include white, and orange colour combination overall , and black in some places for text and on

Don't use shadcn or other UI library for now only tailwindcss for design. Use icons of "font awesome" I have installed the modules for it.

Now starting with the design whilst implementing API integration with the backend, also setup proper state management when needed, for now I would like you to start with :

**Webpage Design Requirements for Swiggy-like Landing Page**

1. **Hero Section**

- **Background**: Vibrant orange gradient (#FC8019 to #FFA726)
- **Content**:

  - Centered heading: "Order food & . Discover the best restaurants." (White text, bold, 3xl size)
  - Subheading: "Swiggy it!" (White text, xl size)
  - Search bar with:
    - Input field: "Enter your delivery location"
    - Secondary input: "Search for restaurant/food item"
    - Rounded corners, subtle shadow
    - Search icon on right side

- Use Tailwind's grid system and flexbox
- Implement smooth transitions using `transition` classes
- Add `hover:shadow-lg` for card interactions
- Use `@apply` for custom orange gradient if needed
- Keep search inputs accessible with proper ARIA labels

use pictures from /svg_icon and /Home folders inside /public.
Add anything important you think I may have missed

2. **Navbar Component**

Create a React Navbar component with:

- Swiggy-like logo on left , (whenver pressed will take you to the homescreen)

- 'restaurant' links to all the present/ affiliated restaurants (information from the backend)

- "cart" option which should take the user (in unregistered ) to the sign up/ log in page. Only a logged in user should be shown the items present in cart for now.

- Profile icon (show dropdown when logged in, else take to the registration page and ask for infromation, register the user). Conditional rendering for login/signup , Use Tailwind for styling. Make responsive.

3. Functionality details for "restaurant" option present on navbar

when clicked on the restaurants link it should take the user to the **Restaurant Listing Page** which would include

A restaurant card grid showing: Restaurant image, Name, Average rating, etc.
Add hover effects using Tailwind. Fetch data from the respective api from the database.

clicking on the restaurant card will also show you the all the food items that are present in the restaurant. And then the registered user can select the food items they would like and that would add them to cart.

Create a modal that opens when clicking food items, showing:

Large food image, Description, Add to cart button (disabled for guests which are unregistered users) , Use Headless UI for modal transitions.

4. Details for 'Cart' on navbar

When clicked upon should show users all the food items the user has selected, the restaurant from where the food is selected, and the total price for all the items. There should be a "proceed to checkout" button present below the details onto the left side.

for now the button won't do anything given there is no payment functionality yet. so all it will say is "Success! " and the order will be added to database uh

If there are no orders simply show "your cart is empty" in black font , and orange button below it saying "see restaurants" which takes you to the restaurant listing screen

5. Details for user profile

clicking on the user profile section on navbar (which would be respresented with the username of the logged in user) , should take you to the page with options for setting "addresses" ,seeing "previous orders" , and logging out in "log out" option

whilst highlighting information such as phone number and what is asked.

the user schema in backend includes:

name , email , phone , address , role , orders , profileImage

also a button for editing profile.
