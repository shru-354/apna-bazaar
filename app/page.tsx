"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  shop: string;
  category: string;
  price: number;
  unit: string;
  emoji: string;
  color: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    shop: "Sharma Vegetable Store",
    category: "Vegetables",
    price: 30,
    unit: "500 g",
    emoji: "🍅",
    color: "#fff0eb",
  },
  {
    id: 2,
    name: "Farm Fresh Potatoes",
    shop: "Sharma Vegetable Store",
    category: "Vegetables",
    price: 25,
    unit: "1 kg",
    emoji: "🥔",
    color: "#f5eddf",
  },
  {
    id: 3,
    name: "Fresh Bananas",
    shop: "Gupta Fruit Corner",
    category: "Fruits",
    price: 50,
    unit: "1 dozen",
    emoji: "🍌",
    color: "#fff6d9",
  },
  {
    id: 4,
    name: "Sweet Red Apples",
    shop: "Gupta Fruit Corner",
    category: "Fruits",
    price: 120,
    unit: "1 kg",
    emoji: "🍎",
    color: "#ffe9e6",
  },
  {
    id: 5,
    name: "Full Cream Milk",
    shop: "Fresh Dairy Point",
    category: "Dairy",
    price: 34,
    unit: "500 ml",
    emoji: "🥛",
    color: "#eaf4ff",
  },
  {
    id: 6,
    name: "Fresh Paneer",
    shop: "Fresh Dairy Point",
    category: "Dairy",
    price: 90,
    unit: "200 g",
    emoji: "🧀",
    color: "#fff4d9",
  },
  {
    id: 7,
    name: "Whole Wheat Bread",
    shop: "City Bakery",
    category: "Bakery",
    price: 40,
    unit: "1 pack",
    emoji: "🍞",
    color: "#f7eadc",
  },
  {
    id: 8,
    name: "Chocolate Cake",
    shop: "City Bakery",
    category: "Bakery",
    price: 250,
    unit: "500 g",
    emoji: "🍰",
    color: "#f7e5df",
  },
  {
    id: 9,
    name: "Basmati Rice",
    shop: "Gupta General Store",
    category: "Groceries",
    price: 85,
    unit: "1 kg",
    emoji: "🍚",
    color: "#f5f0e7",
  },
  {
    id: 10,
    name: "Cooking Oil",
    shop: "Gupta General Store",
    category: "Groceries",
    price: 140,
    unit: "1 litre",
    emoji: "🫒",
    color: "#edf4df",
  },
  {
    id: 11,
    name: "Classic Notebook",
    shop: "Shree Stationery",
    category: "Stationery",
    price: 45,
    unit: "1 piece",
    emoji: "📓",
    color: "#e9efff",
  },
  {
    id: 12,
    name: "Blue Ball Pens",
    shop: "Shree Stationery",
    category: "Stationery",
    price: 30,
    unit: "Pack of 5",
    emoji: "🖊️",
    color: "#e8f3ff",
  },
];

const categories = [
  { name: "All", emoji: "🛍️" },
  { name: "Vegetables", emoji: "🥦" },
  { name: "Fruits", emoji: "🍎" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Bakery", emoji: "🥐" },
  { name: "Groceries", emoji: "🛒" },
  { name: "Stationery", emoji: "📚" },
];

const shops = [
  {
    name: "Sharma Vegetable Store",
    category: "Fresh vegetables",
    rating: "4.8",
    time: "15–25 min",
    emoji: "🥬",
    color: "#e9f5df",
  },
  {
    name: "Gupta Fruit Corner",
    category: "Fresh fruits",
    rating: "4.7",
    time: "15–20 min",
    emoji: "🍉",
    color: "#fff0df",
  },
  {
    name: "Fresh Dairy Point",
    category: "Milk & dairy",
    rating: "4.9",
    time: "10–20 min",
    emoji: "🥛",
    color: "#e6f2ff",
  },
  {
    name: "City Bakery",
    category: "Bread & bakery",
    rating: "4.6",
    time: "20–30 min",
    emoji: "🥖",
    color: "#f8e9dd",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [location, setLocation] = useState("Select your area");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        `${product.name} ${product.shop} ${product.category}`
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = products.reduce(
    (total, product) =>
      total + product.price * (cart[product.id] || 0),
    0
  );

  const cartProducts = products.filter(
    (product) => (cart[product.id] || 0) > 0
  );

  function addToCart(product: Product) {
    setCart((currentCart) => ({
      ...currentCart,
      [product.id]: (currentCart[product.id] || 0) + 1,
    }));

    setNotice(`${product.name} added to cart`);
    window.setTimeout(() => setNotice(""), 1800);
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) => {
      const updatedCart = { ...currentCart };
      const quantity = updatedCart[productId] || 0;

      if (quantity <= 1) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] = quantity - 1;
      }

      return updatedCart;
    });
  }

  function increaseQuantity(productId: number) {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] || 0) + 1,
    }));
  }

  function selectCategory(category: string) {
    setSelectedCategory(category);
    setShowAllProducts(true);
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="site-shell">
      <div className="announcement">
        <span>🌿</span> Shop local. Support your neighbourhood.
        <span className="announcement-right">
          Your neighbourhood, all in one place.
        </span>
      </div>

      <header className="navbar">
        <a href="#" className="brand">
          <span className="brand-icon">🛍️</span>
          <span>
            <strong>apna<span className="brand-green">bazaar</span></strong>
            <small>Aapke area ki dukaan</small>
          </span>
        </a>

        <label className="location-box">
          <span className="location-icon">📍</span>
          <span className="location-content">
            <small>DELIVERING TO</small>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              aria-label="Choose your delivery area"
            >
              <option>Select your area</option>
              <option>Naini, Prayagraj</option>
              <option>Civil Lines, Prayagraj</option>
              <option>Prayagraj</option>
              <option>Lucknow</option>
            </select>
          </span>
        </label>

        <nav className="nav-links">
          <a href="#shops">Local shops</a>
          <a href="#products">Products</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
          aria-label={`Open cart, ${cartCount} items`}
        >
          🛒 <span>My Cart</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-dot"></span>
            YOUR NEIGHBOURHOOD MARKETPLACE
          </div>

          <h1>
            Your local market,
            <br />
            <span>now at your fingertips.</span>
          </h1>

          <p className="hero-description">
            Discover the shops you love, find everyday essentials,
            and support the people who make your neighbourhood special.
          </p>

          <div className="hero-search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Search products, shops, groceries..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowAllProducts(true);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              aria-label="Search products and shops"
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <button
              className="search-button"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Search
            </button>
          </div>

          <div className="hero-benefits">
            <span>✓ Discover local shops</span>
            <span>✓ Everyday essentials</span>
            <span>✓ Shop closer to home</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            <div className="market-emoji">🧺</div>
            <div className="floating-card floating-top">
              <span className="floating-icon">🥦</span>
              <span>
                <strong>Fresh picks</strong>
                <small>From local sellers</small>
              </span>
            </div>
            <div className="floating-card floating-bottom">
              <span className="floating-icon">🏪</span>
              <span>
                <strong>Shop nearby</strong>
                <small>Know your community</small>
              </span>
            </div>
            <span className="decor decor-one">✳</span>
            <span className="decor decor-two">✦</span>
            <span className="decor decor-three">✳</span>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div>
          <span className="trust-icon">🏪</span>
          <span>
            <strong>Neighbourhood shops</strong>
            <small>Discover local favourites</small>
          </span>
        </div>
        <div>
          <span className="trust-icon">🥬</span>
          <span>
            <strong>Everyday essentials</strong>
            <small>Find what you need</small>
          </span>
        </div>
        <div>
          <span className="trust-icon">🤝</span>
          <span>
            <strong>Support local</strong>
            <small>Help small businesses grow</small>
          </span>
        </div>
      </section>

      <section className="section category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE THE MARKET</span>
            <h2>What are you looking for?</h2>
            <p>Find everyday essentials in just a few clicks.</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`category-card ${
                selectedCategory === category.name ? "category-active" : ""
              }`}
              onClick={() => selectCategory(category.name)}
            >
              <span className="category-emoji">{category.emoji}</span>
              <strong>{category.name}</strong>
              <span className="category-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section shops-section" id="shops">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MEET YOUR NEIGHBOURS</span>
            <h2>Shops around your area</h2>
            <p>Get to know the local businesses in your community.</p>
          </div>
          <a href="#products" className="text-link">
            Browse products <span>→</span>
          </a>
        </div>

        <div className="shops-grid">
          {shops.map((shop, index) => (
            <article className="shop-card" key={shop.name}>
              <div
                className="shop-art"
                style={{ backgroundColor: shop.color }}
              >
                <span className="shop-number">0{index + 1}</span>
                <span className="shop-emoji">{shop.emoji}</span>
                <span className="open-label">
                  <span className="live-dot"></span> Local shop
                </span>
              </div>

              <div className="shop-info">
                <span className="shop-category">{shop.category}</span>
                <h3>{shop.name}</h3>
                <div className="shop-meta">
                  <span>⭐ {shop.rating}</span>
                  <span>·</span>
                  <span>🕒 {shop.time}</span>
                </div>
                <button
                  className="shop-browse"
                  onClick={() => {
                    setSearch(shop.name);
                    setSelectedCategory("All");
                    setShowAllProducts(true);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore shop <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section products-section" id="products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A LITTLE BIT OF EVERYTHING</span>
            <h2>Everyday favourites</h2>
            <p>Explore products from our sample local shops.</p>
          </div>

          <span className="product-result-count">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="product-filters">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`filter-chip ${
                selectedCategory === category.name ? "filter-active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category.name);
                setShowAllProducts(true);
              }}
            >
              {category.emoji} {category.name}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {(showAllProducts
              ? filteredProducts
              : filteredProducts.slice(0, 8)
            ).map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className="product-art"
                  style={{ backgroundColor: product.color }}
                >
                  <span className="product-emoji">{product.emoji}</span>
                  <span className="product-tag">Local pick</span>
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>
                  <h3>{product.name}</h3>
                  <p className="product-shop">🏪 {product.shop}</p>

                  <div className="product-bottom">
                    <div>
                      <strong className="product-price">
                        ₹{product.price}
                      </strong>
                      <small className="product-unit"> / {product.unit}</small>
                    </div>

                    {(cart[product.id] || 0) === 0 ? (
                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                      >
                        + Add
                      </button>
                    ) : (
                      <div className="quantity-control">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          aria-label={`Remove one ${product.name}`}
                        >
                          −
                        </button>
                        <span>{cart[product.id]}</span>
                        <button
                          onClick={() => increaseQuantity(product.id)}
                          aria-label={`Add one ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🔎</span>
            <h3>No products found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              className="search-button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setShowAllProducts(false);
              }}
            >
              Show all products
            </button>
          </div>
        )}

        {!showAllProducts && filteredProducts.length > 8 && (
          <div className="view-all-wrap">
            <button
              className="view-all-button"
              onClick={() => setShowAllProducts(true)}
            >
              View all products <span>→</span>
            </button>
          </div>
        )}
      </section>

      <section className="local-banner">
        <div className="local-banner-icon">🌱</div>
        <div>
          <span className="eyebrow">GOOD THINGS START LOCALLY</span>
          <h2>Every local shop has a story.</h2>
          <p>
            Discover the people, products, and small businesses
            that make your neighbourhood unique.
          </p>
        </div>
        <a href="#shops" className="banner-button">
          Meet local shops <span>→</span>
        </a>
      </section>

      <footer className="footer">
        <a href="#" className="brand footer-brand">
          <span className="brand-icon">🛍️</span>
          <span>
            <strong>apna<span className="brand-green">bazaar</span></strong>
            <small>Aapke area ki dukaan</small>
          </span>
        </a>

        <p>Made for local communities, one shop at a time.</p>

        <span className="footer-note">
          © {new Date().getFullYear()} Apna Bazaar · Demo website
        </span>
      </footer>

      {notice && <div className="toast-message">✓ {notice}</div>}

      {showCart && (
        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
          role="presentation"
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR SHOPPING</span>
                <h2 id="cart-title">My Cart ({cartCount})</h2>
              </div>
              <button
                className="close-cart"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {cartProducts.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>
                <h3>Your cart is waiting</h3>
                <p>Add some local favourites to get started.</p>
                <button
                  className="search-button"
                  onClick={() => {
                    setShowCart(false);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore products
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartProducts.map((product) => (
                    <div className="cart-item" key={product.id}>
                      <div
                        className="cart-item-emoji"
                        style={{ backgroundColor: product.color }}
                      >
                        {product.emoji}
                      </div>

                      <div className="cart-item-details">
                        <strong>{product.name}</strong>
                        <small>{product.unit}</small>
                        <span>₹{product.price * cart[product.id]}</span>
                      </div>

                      <div className="quantity-control">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          aria-label={`Remove one ${product.name}`}
                        >
                          −
                        </button>
                        <span>{cart[product.id]}</span>
                        <button
                          onClick={() => increaseQuantity(product.id)}
                          aria-label={`Add one ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Subtotal</span>
                    <strong>₹{cartTotal}</strong>
                  </div>
                  <p>Delivery fees, if any, are not included.</p>
                  <button
                    className="checkout-button"
                    onClick={() =>
                      setNotice(
                        "Demo only — online checkout is not connected yet."
                      )
                    }
                  >
                    Continue · ₹{cartTotal}
                  </button>
                  <small className="demo-disclaimer">
                    Demo only. No payment or order will be placed.
                  </small>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}