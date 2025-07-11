// script.js

const signInBtn = document.querySelector(".nav-links div:first-child");
const loginBtn = document.querySelector(".nav-links div:nth-child(2)");
const panelAllBtn = document.querySelector(".panel-all");

const modalHTML = `
  <div id="signup-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
    <div id="modal-content" style="background: white; padding: 30px; border-radius: 10px; width: 300px; text-align: center;">
      <h2>Sign Up</h2>
      <form id="signup-form">
        <input type="text" placeholder="Full Name" required style="width: 100%; padding: 8px; margin: 8px 0;">
        <input type="tel" placeholder="Phone Number" required style="width: 100%; padding: 8px; margin: 8px 0;">
        <input type="password" placeholder="Password" required style="width: 100%; padding: 8px; margin: 8px 0;">
        <button type="submit" style="padding: 10px 20px; margin-top: 10px; background-color: #febd69; border: none; cursor: pointer;">Sign Up</button>
      </form>
      <p style="margin-top: 10px; font-size: 0.85rem;">Already have an account? <a href="#" id="show-login" style="color: #007185;">Log In</a></p>
      <button onclick="document.getElementById('signup-modal').remove()" style="margin-top: 10px; background: none; border: none; color: #0066c0; cursor: pointer;">Close</button>
    </div>
  </div>
`;

const loginFormHTML = `
  <h2>Log In</h2>
  <form id="login-form">
    <input type="tel" placeholder="Phone Number" required style="width: 100%; padding: 8px; margin: 8px 0;">
    <input type="password" placeholder="Password" required style="width: 100%; padding: 8px; margin: 8px 0;">
    <button type="submit" style="padding: 10px 20px; margin-top: 10px; background-color: #febd69; border: none; cursor: pointer;">Log In</button>
  </form>
  <p style="margin-top: 10px; font-size: 0.85rem;">Don't have an account? <a href="#" id="show-signup" style="color: #007185;">Sign Up</a></p>
  <button onclick="document.getElementById('signup-modal').remove()" style="margin-top: 10px; background: none; border: none; color: #0066c0; cursor: pointer;">Close</button>
`;

function loadSignupModal() {
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Signup Successful! ");
    document.getElementById("signup-modal").remove();
  });
  document.getElementById("show-login").addEventListener("click", function (e) {
    e.preventDefault();
    showLoginModal();
  });
}

function showLoginModal() {
  const modal = document.getElementById("signup-modal");
  const modalContent = document.getElementById("modal-content");
  if (modal && modalContent) {
    modalContent.innerHTML = loginFormHTML;
    addLoginEvents();
  } else {
    document.body.insertAdjacentHTML("beforeend", `<div id='signup-modal' style='position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;'><div id='modal-content' style='background: white; padding: 30px; border-radius: 10px; width: 300px; text-align: center;'>${loginFormHTML}</div></div>`);
    addLoginEvents();
  }
}

function addLoginEvents() {
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Login Successful! (This is just a demo.)");
    document.getElementById("signup-modal").remove();
  });
  document.getElementById("show-signup").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("signup-modal").remove();
    signInBtn.click();
  });
}

if (signInBtn) {
  signInBtn.addEventListener("click", loadSignupModal);
}

if (loginBtn) {
  loginBtn.addEventListener("click", showLoginModal);
}

if (panelAllBtn) {
  panelAllBtn.addEventListener("click", () => {
    let categoryDiv = document.getElementById("category-list");
    if (categoryDiv) {
      categoryDiv.remove();
      return;
    }
    categoryDiv = document.createElement("div");
    categoryDiv.id = "category-list";
    categoryDiv.style = `
      position: absolute;
      top: 100px;
      left: 0;
      background: #f9f9f9;
      padding: 20px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      z-index: 999;
    `;

    const categories = [
      "📱 Mobile Phones",
      "💻 Electronics",
      "✏️ Stationery Items",
      "👕 Clothing",
      "🛏️ Furniture",
      "💄 Beauty & Health",
      "🎸 Musical Instruments",
      "📚 Books",
      "🍳 Kitchen Appliances",
      "🎮 Gaming Consoles",
      "🐾 Pets & Supplies",
      "🔧 Tools & DIY",
      "🏋️ Sports & Fitness",
      "🖼️ Art & Decor",
      "🚲 Bikes & Scooters"
    ];

    categories.forEach(cat => {
      const item = document.createElement("div");
      item.style = "background: white; margin-bottom: 10px; padding: 12px 20px; border-radius: 6px; width: 250px; font-weight: 500; cursor: pointer;";
      item.textContent = cat;

      const keyword = cat.split(" ")[1]?.toLowerCase();
      item.addEventListener("click", () => {
        const allCards = document.querySelectorAll(".product-card");
        allCards.forEach(card => {
          card.style.display = card.dataset.category === keyword ? "block" : "none";
        });
        const section = document.querySelector(".recently-added");
        if (section) section.scrollIntoView({ behavior: "smooth" });
        categoryDiv.remove();
      });

      categoryDiv.appendChild(item);
    });

    const hero = document.querySelector(".hero");
    if (hero) {
      hero.insertAdjacentElement("afterend", categoryDiv);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.insertAdjacentElement("afterend", recentlyAddedSection);
  }
});


const sellFormHTML = `
  <div id="sell-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
    <div id="sell-modal-content" style="background: white; padding: 30px; border-radius: 10px; width: 350px; text-align: center;">
      <h2>Sell Your Item</h2>
      <form id="sell-form">
        <input type="text" placeholder="Item Name" required style="width: 100%; padding: 8px; margin: 8px 0;">
        <textarea placeholder="Description" required style="width: 100%; padding: 8px; margin: 8px 0;"></textarea>
        <input type="file" accept="image/*" required style="margin: 8px 0;">
        <select required style="width: 100%; padding: 8px; margin: 8px 0;">
          <option value="">Select Category</option>
          <option value="mobile">Mobile Phones</option>
          <option value="electronics">Electronics</option>
          <option value="stationery">Stationery Items</option>
          <option value="clothing">Clothing</option>
          <option value="furniture">Furniture</option>
          <option value="beauty">Beauty & Health</option>
          <option value="music">Musical Instruments</option>
          <option value="books">Books</option>
          <option value="kitchen">Kitchen Appliances</option>
          <option value="gaming">Gaming Consoles</option>
          <option value="pets">Pets & Supplies</option>
          <option value="tools">Tools & DIY</option>
          <option value="sports">Sports & Fitness</option>
          <option value="art">Art & Decor</option>
          <option value="bikes">Bikes & Scooters</option>
        </select>
        <button type="submit" style="padding: 10px 20px; background-color: #febd69; border: none; cursor: pointer;">Submit</button>
      </form>
      <button onclick="document.getElementById('sell-modal').remove()" style="margin-top: 10px; background: none; border: none; color: #0066c0; cursor: pointer;">Close</button>
    </div>
  </div>
`;

function loadSellModal() {
  document.body.insertAdjacentHTML("beforeend", sellFormHTML);

  document.getElementById("sell-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Your item has been listed! (This is a demo.)");
    document.getElementById("sell-modal").remove();
  });
}

const sellBtn = document.getElementById("sell-btn");
if (sellBtn) {
  sellBtn.addEventListener("click", loadSellModal);
}
