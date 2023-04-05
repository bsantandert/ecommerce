# Ecommerce Website

A Website built to navigate through products and orders with an amazing cart experience.

## Design

The `diagrams` folder contains the database diagram and order creation flow diagram.

## Projects

This Website requires 2 projects running:

- Frontend
- Backend

Each project has the required information for setup.

## Implementation Notes - Improvements

- There is no current user or logged user implementation, navigation has the select option that will simulate a type of user.
- Stock of products is not updated, so you can just create as many orders based on the current stock of the product. (it has stock validation when you are adding the product to the order or updating the quantity in the cart page).
- Order amount is being calculated in frontend, as a improvement we could move that to back-end service.
- Using jest for tests, only added tests for util function in front-end and mappers in back-end.
- Search is using Postgress `to_tsvector` and `websearch_to_tsquery`, right now `product` table is not configured with indexes or configurations for [performance improvements](https://www.postgresql.org/docs/current/textsearch-indexes.html).

## Usage

The Website has 2 types of user, you can impersonate one or the order by using the select in the navigation bar, the page will be refreshed and the navigation options will change based on the user.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/change-current-user.PNG" alt="Agenda" width="600" height="250">
</p>

### Customer user

#### Products - Search

Products page will display all the products in the Website, you can use the search input to filter the products in real time. Also the url will be updated any time the search content is updated and the url can be shared.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/products-search.PNG" alt="products search" width="600" height="300">
</p>

#### Product Detail

Product detail page will display the product information with the options to add the product to the cart/order.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/product-detail.PNG" alt="product detail" width="600" height="300">
</p>

#### Cart

Cart page will display all the products added and will allow the customer user to update quantities, remove products and submit the order. Once the order is submitted a notification message will appear in the page.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/cart.PNG" alt="cart" width="600" height="300">
</p>

#### Orders

Orders page will display 2 tabs for pending and completed orders, each tab will display a table with the orders. The id rows are links to go to the Order Detail page.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/orders.PNG" alt="orders" width="600" height="300">
</p>

#### Order Detail

Order detail page will display the information of the order.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/order-detail-customer.PNG" alt="order detail" width="600" height="300">
</p>

### Admin user

Admin users will only see orders option in navigation bar.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/orders-admin.PNG" alt="order detail" width="600" height="300">
</p>

#### Order Detail Admin

Order detail page will display the information of the order and will also allow the user to update the employee assigned and the status of the order.

<p align="center">
  <img src="https://raw.githubusercontent.com/bsantandert/ecommerce/main/screenshots/order-detail-admin.PNG" alt="order detail" width="600" height="300">
</p>
