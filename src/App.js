import React, { Component } from 'react';
import './App.css';

// Sample product data (you can load this from an API or JSON file in a real application)
const products = [
  { category: "electronics", title: "Smartphone", description: "A high-end smartphone.", price: 599.99, image: "https://m-cdn.phonearena.com/images/article/142420-wide-two_1200/The-iPhone-15-Pro-Max-will-have-better-specs-than-the-iPhone-15-Pro.jpg?1662731593" },
  { category: "clothing", title: "T-Shirt", description: "Comfortable cotton T-shirt.", price: 19.99, image: "https://th.bing.com/th/id/OIP.K9IRA0G3Mr9Y8JrrFQo4LQHaJ4?pid=ImgDet&rs=1" },
  { category: "home", title: "Coffee Maker", description: "Automatic coffee maker with a timer.", price: 79.99, image: "https://i5.walmartimages.com/asr/069af1d8-5685-449b-8e9b-3ad3c27b15ca_1.f45921073d88668461d3c45a413108d5.jpeg" },
  { category: "electronics", title: "Laptop", description: "Powerful laptop for work and entertainment.", price: 899.99, image: "https://medias.audiofanzine.com/images/normal/apple-macbook-pro-15-touchbar-2017-1846209.jpg" },
  { category: "clothing", title: "Jeans", description: "Classic denim jeans.", price: 49.99, image: "https://cdnc.lystit.com/photos/2013/03/18/levis-rain-shower-511-slim-jeans-product-2-7396731-874305876.jpeg" },
  { category: "clothing", title: "Shirt", description: "Wrinkle free shirt.", price: 29.99, image: "https://th.bing.com/th/id/OIP.bB2NWhYPjvqKoV7-llIuNQHaHa?pid=ImgDet&rs=1" },
  { category: "electronics", title: "Laptop", description: "A basic laptop for work and education.", price: 549.99, image: "https://th.bing.com/th/id/OIP.NOh9EcFXrTXT0SWBlBHygQHaE6?pid=ImgDet&rs=1" },
  { category: "electronics", title: "Samsung TV", description: "A 55 inch large smart-TV", price: 849.99, image: "https://d2cdo4blch85n8.cloudfront.net/wp-content/uploads/2020/01/New-Samsung-TVs-Unveiled-CES-2020-Featured-image.jpg" },
  { category: "home", title: "Iron Box", description: "An Iron box with steam iron", price: 109.99, image: "https://th.bing.com/th/id/OIP.1dVnw-SA-LBVs_TTAaY5RAHaFf?pid=ImgDet&rs=1" },
  //https://d2cdo4blch85n8.cloudfront.net/wp-content/uploads/2020/01/New-Samsung-TVs-Unveiled-CES-2020-Featured-image.jpg
  // Add more products here
];

class App extends Component {
  state = {
    categoryFilter: "all",
    sortOption: "price-low",
    currentPage: 1,
    itemsPerPage: 6,
  };

  handleCategoryChange = (event) => {
    this.setState({ categoryFilter: event.target.value, currentPage: 1 });
  };

  handleSortChange = (event) => {
    this.setState({ sortOption: event.target.value });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handleNextPage = () => {
    const totalPages = Math.ceil(
      this.filteredProducts().length / this.state.itemsPerPage
    );
    if (this.state.currentPage < totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  filteredProducts() {
    const { categoryFilter, sortOption } = this.state;

    // Filter and sort products
    return products
      .filter(product => categoryFilter === "all" || product.category === categoryFilter)
      .sort((a, b) => {
        if (sortOption === "price-low") {
          return a.price - b.price;
        } else if (sortOption === "price-high") {
          return b.price - a.price;
        }
        return 0;
      });
  }

  render() {
    const { categoryFilter, sortOption, currentPage, itemsPerPage } = this.state;

    const currentItems = this.filteredProducts().slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    // Calculate total pages
    const totalItems = this.filteredProducts().length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="App">
        <h1>Product List</h1>
        <br></br>
        <div className="filters">
          <label htmlFor="category">Category:</label>
          <select id="category" onChange={this.handleCategoryChange} value={categoryFilter}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
          </select>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" onChange={this.handleSortChange} value={sortOption}>
            <option value="price-low">Price Low to High</option>
            <option value="price-high">Price High to Low</option>
          </select>
        </div>
        <div className="product-list">
          {currentItems.map((product, index) => (
            <div className="product-item" key={index}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={this.handlePreviousPage}>Previous</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => this.handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={this.handleNextPage}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
