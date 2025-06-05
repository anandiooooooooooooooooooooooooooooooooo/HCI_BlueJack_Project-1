document.addEventListener("DOMContentLoaded", () => {
// Header Component
const headerHTML = `
    <header class="site-header">
        <nav class="left">
            <a href="./rewards.html">Rewards</a>
            <a href="./about-us.html">About Us</a>
        </nav>
        <a href="./index.html" class="center">
            <img src="../assets/icon/logo.png" alt="Mr. Coffe Logo">
            <p class="title">MR. COFFE</p>
        </a>
        <nav class="right">
            <a href="./menu.html">Menu</a>
            <a href="./order.html">Order</a>
        </nav>
    </header>
`;

// Footer Component
const footerHTML = `
    <footer class="site-footer">
        <div class="footer-section-1">
            <div class="wrap-1">
                <p class="main-text">Not Just Coffe, It's Mr. Coffe</p>
            </div>
            <div class="wrap-2">
                <p class="wrap-2-header">About</p>
                <div class="wrap-2-info">
                    <a href="./index.html">Home</a>
                    <a href="./rewards.html">Rewards</a>
                    <a href="./menu.html">Menu</a>
                    <a href="./order.html">Order</a>
                </div>
            </div>
            <div class="wrap-3">
                <p class="wrap-3-header">Download</p>
                <div class="wrap-3-info">
                    <img src="../assets/img/googleplay.png" alt="">
                    <img src="../assets/img/appstore.png" alt="">
                </div>
            </div>
            <div class="wrap-4">
                <p class="wrap-4-header">Contant</p>
                <div class="wrap-4-info">
                    <div class="left">
                        <p>Address:</p>
                        <p>Number:</p>
                        <p>Email:</p>
                    </div>
                    <div class="right">
                        <p>Jl. Kopi No. 1, Jakarta, Indonesia</p>
                        <p>021-123456789</p>
                        <p>mr.coffe@email.com</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-section-2">
            <div class="left">
                <img src="../assets/icon/logo.png" alt="">
            </div>
            <div class="right">
                <p>© 2023 Mr. Coffe. All rights reserved.</p>
            </div>
        </div>
    </footer>
`;

// Inject components
const header = document.getElementById("component-header");
const footer = document.getElementById("component-footer");

if (header && footer) {
    header.innerHTML = headerHTML;
    footer.innerHTML = footerHTML;
} else {
    console.warn("Header or footer container not found in the document.");
}
});