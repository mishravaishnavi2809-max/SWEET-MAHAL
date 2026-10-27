 
import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});

  const sweets = [
    { id: 1, name: "Gulab Jamun", price: 30, emoji: "🍯" },
    { id: 2, name: "Rasgulla", price: 25, emoji: "🍡" },
    { id: 3, name: "Kaju Katli", price: 50, emoji: "🍬" },
    { id: 4, name: "Motichoor Ladoo", price: 35, emoji: "🟠" },
    { id: 5, name: "Jalebi", price: 20, emoji: "🥨" },
    { id: 6, name: "Barfi", price: 30, emoji: "🍰" }
  ];

  function addToCart(sweet) {
    const qty = Number(quantity[sweet.id] || 1);

    setCart((oldCart) => {
      const found = oldCart.find((item) => item.id === sweet.id);

      if (found) {
        return oldCart.map((item) =>
          item.id === sweet.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [...oldCart, { ...sweet, quantity: qty }];
    });

    alert(sweet.name + " added to cart!");
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  return (
    <div className="app">
      <header>
        <h1>🍬 Sweet Paradise 🍬</h1>
        <p>Welcome to our Sweet Shop</p>
        <h3>Fresh Sweets, Happy Moments!</h3>
      </header>

      <h2 className="heading">Our Delicious Sweets</h2>

      <div className="sweet-container">
        {sweets.map((sweet) => (
          <div className="sweet-card" key={sweet.id}>
            <div className="sweet-emoji">{sweet.emoji}</div>
            <h3>{sweet.name}</h3>
            <p>Price: ₹{sweet.price} / piece</p>

            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity[sweet.id] || 1}
              onChange={(e) =>
                setQuantity({
                  ...quantity,
                  [sweet.id]: Math.max(1, Number(e.target.value))
                })
              }
            />

            <button onClick={() => addToCart(sweet)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🛒 My Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity} = ₹
              {item.price * item.quantity}
            </p>
          ))
        )}

        <h3>Total Items: {totalItems}</h3>
        <h3>Total Amount: ₹{totalPrice}</h3>

        <button
          onClick={() => {
            if (cart.length > 0) {
              alert("Thank you for shopping at Sweet Paradise!");
              setCart([]);
            } else {
              alert("Please add sweets to your cart first.");
            }
          }}
        >
          Place Order
        </button>
      </div>

      <footer>
        <p>© 2026 Sweet Paradise | Made with Love</p>
      </footer>
    </div>
  );
}

export default App;
