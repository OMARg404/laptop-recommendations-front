import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const brands = ['Asus', 'Alurin', 'MSI', 'HP', 'Lenovo', 'Medion', 'Acer', 'Apple', 'Razer', 'Gigabyte', 'Dell', 'LG', 'Samsung', 'PcCom', 'Microsoft', 'Primux', 'Prixton', 'Dynabook Toshiba', 'Thomson', 'Denver', 'Deep Gaming', 'Vant', 'Innjoo', 'Jetwing', 'Millenium', 'Realme', 'Toshiba'];
// const statusOptions = ['New', 'Refurbished'];
// const modelOptions = ['ExpertBook', 'Go', 'Katana', '15S', 'Crosshair', 'ThinkPad', 'VivoBook', 'Akoya', 'Victus', 'V15', 'Thin', 'ROG', 'IdeaPad', 'Cyborg', 'M515UA', 'TUF', 'Aspire', 'Pavilion', 'Vector', 'Chromebook', 'Omen', 'ZenBook', 'Creator', 'MacBook Air', 'ThinkBook', '250', 'Modern', '255', 'MacBook Pro'];
const cpuOptions = ['Intel Core i5', 'Intel Celeron', 'Intel Core i3', 'Intel Core i7', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M1', 'Apple M2', 'Intel Core i9'];
const gpuOptions = ['RTX 3050', 'RTX 4060', 'RTX 4070', 'RTX 3060', 'RTX 4080', 'GTX 1650', 'RTX 3070', 'RX 6800S', 'GTX 1070'];
// const screenOptions = [15.6, 17.3, 14, 16.1, 13.3, 16, 13.6, 13.4];

function sendPreferencesToBackend(preferences) {
  return axios.post('http://localhost:5000/recommend', preferences)
    .then(response => {
      console.log('Recommended laptops:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('There was an error!', error);
      throw new Error('There was an error while sending preferences to the backend');
    });
}

function ProductFilter() {
  const [filters, setFilters] = useState({
    brand: '',
    status: '',
    model: '',
    cpu: '',
    gpu: '',
    ram: [0, 64],
    storage: [0, 1000],
    screen: [0, 20],
    price: [0, 1900],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value.split(',').map(Number)
    });
  };
  const resetFilters = () => {
    setFilters({
      brand: '',
      cpu: '',
      gpu: '',
      ram: [0, 64],
      storage: [0, 1000],
      price: [0, 1900],
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const recommendedProducts = await sendPreferencesToBackend(filters);
      setProducts(recommendedProducts.slice(0, 20));  // Show only the first 20 products
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError('An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Laptop Filter</h1>

      {/* Product filter form */}
      <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
  <div className="row mb-4">
    {/* Brand Selection */}
    <div className="col-md-4 mb-3">
      <label htmlFor="brand" className="form-label fw-bold">Brand</label>
      <select
        className="form-select"
        name="brand"
        value={filters.brand}
        onChange={handleFilterChange}
        aria-label="Select Brand"
      >
        <option value="">Select Brand</option>
        {brands.map((brand, index) => (
          <option key={index} value={brand}>{brand}</option>
        ))}
      </select>
    </div>

    {/* CPU Selection */}
    <div className="col-md-4 mb-3">
      <label htmlFor="cpu" className="form-label fw-bold">CPU</label>
      <select
        className="form-select"
        name="cpu"
        value={filters.cpu}
        onChange={handleFilterChange}
        aria-label="Select CPU"
      >
        <option value="">Select CPU</option>
        {cpuOptions.map((cpu, index) => (
          <option key={index} value={cpu}>{cpu}</option>
        ))}
      </select>
    </div>

    {/* GPU Selection */}
    <div className="col-md-4 mb-3">
      <label htmlFor="gpu" className="form-label fw-bold">GPU</label>
      <select
        className="form-select"
        name="gpu"
        value={filters.gpu}
        onChange={handleFilterChange}
        aria-label="Select GPU"
      >
        <option value="">Select GPU</option>
        {gpuOptions.map((gpu, index) => (
          <option key={index} value={gpu}>{gpu}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Range Inputs for RAM, Storage, and Price */}
  <div className="row mb-4">
    <div className="col-md-4 mb-3">
      <label htmlFor="ram" className="form-label fw-bold">RAM (GB)</label>
      <input
        type="range"
        className="form-range"
        id="ram"
        name="ram"
        value={filters.ram.join(',')}
        min="0"
        max="64"
        step="1"
        onChange={handleRangeChange}
        aria-label="Select RAM range"
      />
      <div className="mt-2 text-center text-muted">
        {filters.ram[0]} GB - {filters.ram[1]} GB
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <label htmlFor="storage" className="form-label fw-bold">Storage (GB)</label>
      <input
        type="range"
        className="form-range"
        id="storage"
        name="storage"
        value={filters.storage.join(',')}
        min="0"
        max="1000"
        step="1"
        onChange={handleRangeChange}
        aria-label="Select Storage range"
      />
      <div className="mt-2 text-center text-muted">
        {filters.storage[0]} GB - {filters.storage[1]} GB
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <label htmlFor="price" className="form-label fw-bold">Price ($)</label>
      <input
        type="range"
        className="form-range"
        id="price"
        name="price"
        value={filters.price.join(',')}
        min="0"
        max="1900"
        step="10"
        onChange={handleRangeChange}
        aria-label="Select Price range"
      />
      <div className="mt-2 text-center text-muted">
        ${filters.price[0]} - ${filters.price[1]}
      </div>
    </div>
  </div>

  {/* Submit and Reset Buttons */}
  <div className="text-center">
  {/* Apply Filters Button */}
  <button
    type="submit"
    className="btn btn-primary w-50 py-2 rounded-pill"
    disabled={loading}
    aria-busy={loading ? "true" : "false"}
    style={{ transition: 'all 0.3s ease' }}
  >
    {loading ? (
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    ) : (
      'Apply Filters'
    )}
  </button>
  
  {/* Reset Filters Button */}
  <button
    type="button"
    className="btn btn-secondary w-50 py-2 rounded-pill mt-3"
    onClick={resetFilters}
    style={{ transition: 'all 0.3s ease' }}
  >
    Reset Filters
  </button>

  {/* Optional: Adding hover effects for better interactivity */}
  <style jsx>{`
    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .btn:active {
      transform: translateY(1px);
    }
  `}</style>
</div>

</form>



      {error && <div className="alert alert-danger mt-4">{error}</div>}

      {/* Display Products */}
      <div className="row mt-5">
      {products.map((product, index) => (
  <div key={index} className="col-md-4 mb-4">
    <div className="card h-100 shadow-lg rounded border-light">
      {/* Product Image */}
      <img src={product.image} className="card-img-top rounded-top" alt={product.model} />
      
      <div className="card-body d-flex flex-column bg-light">
        {/* Card Header */}
        <h5 className="card-title text-center text-uppercase font-weight-bold text-dark">{product.Brand} {product.Model}</h5>

        {/* Product Features */}
        <ul className="list-unstyled mb-3 text-muted">
          <li><strong>Brand:</strong> {product.Brand}</li>
          <li><strong>Model:</strong> {product.Model}</li>
          <li><strong>Status:</strong> {product.Status}</li>
          <li><strong>CPU:</strong> {product.CPU}</li>
          <li><strong>GPU:</strong> {product.GPU}</li>
          <li><strong>RAM:</strong> {product.RAM} GB</li>
          <li><strong>Storage:</strong> {product.Storage} GB</li>
          <li><strong>Storage Type:</strong> {product.Storagetype}</li>
          <li><strong>Screen:</strong> {product.Screen} inches</li>
          <li><strong>Touchscreen:</strong> {product.Touch}</li>
        </ul>

        {/* Price Section */}
        <div className="mt-auto">
          <h5 className="text-center text-danger font-weight-bold mb-2">${product.FinalPrice}</h5>
          <button className="btn btn-success w-100 py-2 rounded-pill hover-shadow">Add to Cart</button>
        </div>
      </div>

      {/* Card Footer with hover effect */}
      <div className="card-footer text-center bg-light rounded-bottom">
        <button className="btn btn-outline-primary btn-sm w-100 hover-shadow">View Details</button>
      </div>
    </div>
  </div>
))}



      </div>
    </div>
  );
}

export default ProductFilter;
