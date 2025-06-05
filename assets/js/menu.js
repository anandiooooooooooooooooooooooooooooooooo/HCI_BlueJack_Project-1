document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const categoryButtons = document.querySelectorAll('.category-button');
    const menuTitle = document.getElementById('menuTitle'); // Targets <h2 id="menuTitle" class="menu-panel-title">
    const mainMenuImage = document.getElementById('mainMenuImage'); // Targets <img id="mainMenuImage">
    const allMenuItems = document.querySelectorAll('.menu-item'); // Targets <li class="menu-item ...">

    // --- Default Images for Categories ---
    // These paths should be relative to your HTML file.
    // They are used if a selected category has no visible items with a data-image,
    // or as an initial image before an item is auto-selected.
    // Ensure these images exist at the specified paths.
    const categoryDefaultImages = {
        "Espresso": "../img/menu-1.jpg", // Example: path to default/first espresso image
        "Frappe": "../img/menu-2.jpg",    // Example: path to default/first frappe image
        "Brewed": "../img/menu-3.jpg",    // Example: path to default/first brewed image
        "Bread": "../img/menu-4.jpg"      // Example: path to default/first bread image
        // Add a general placeholder if you have one:
        // "placeholder": "images/placeholder_general.jpg"
    };
    const generalPlaceholderImage = "images/placeholder_general.jpg"; // Fallback if no other image is found

    // --- Helper Function to Update Alt Text ---
    // Gets the text from the '.item-name-text' span for better alt descriptions.
    function updateMainMenuAltText(menuListItem) {
        const itemNameTextSpan = menuListItem.querySelector('.item-name-text');
        if (itemNameTextSpan) {
            return itemNameTextSpan.textContent.trim();
        }
        // Fallback for safety, though should not be needed with correct HTML
        const menuNameSpan = menuListItem.querySelector('.menu-item-name');
        if (menuNameSpan) {
            // This might include the icon's alt text if the structure is different
            // or if .item-name-text is missing.
            return menuNameSpan.textContent.trim();
        }
        return "Selected menu item"; // Generic fallback alt text
    }

    // --- Event Listener for Category Buttons ---
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;

            // Update active state for category buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update menu panel title
            if (menuTitle) {
                menuTitle.textContent = `Menu | ${selectedCategory}`;
            }

            let firstItemInCategory = null;

            // Filter menu items: show items of selectedCategory, hide others
            allMenuItems.forEach(item => {
                item.classList.remove('active'); // Deactivate all items first
                if (item.classList.contains(selectedCategory.toLowerCase())) {
                    item.style.display = 'flex'; // Use 'flex' as per CSS for item layout
                    if (!firstItemInCategory) {
                        firstItemInCategory = item; // Capture the first visible item
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Update the main displayed image and its alt text
            if (firstItemInCategory && firstItemInCategory.dataset.image) {
                // If a first item exists and has a data-image, use it
                mainMenuImage.src = firstItemInCategory.dataset.image;
                mainMenuImage.alt = updateMainMenuAltText(firstItemInCategory);
                firstItemInCategory.classList.add('active'); // Set this item as active
            } else if (categoryDefaultImages[selectedCategory]) {
                // Otherwise, if a default image for the category exists, use it
                mainMenuImage.src = categoryDefaultImages[selectedCategory];
                mainMenuImage.alt = selectedCategory; // Alt text is the category name
            } else {
                // Ultimate fallback: use a general placeholder
                // Ensure 'images/placeholder_general.jpg' exists or change path
                mainMenuImage.src = generalPlaceholderImage;
                mainMenuImage.alt = "Please select a menu item";
            }
        });
    });

    // --- Event Listener for Individual Menu Items ---
    allMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update main image based on the clicked item's data-image attribute
            if (item.dataset.image) {
                mainMenuImage.src = item.dataset.image;
                mainMenuImage.alt = updateMainMenuAltText(item);
            }

            // Update active state: deactivate all items, then activate the clicked one
            allMenuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // --- Initial Page Setup ---
    // Simulate a click on the first category button to load initial content
    if (categoryButtons.length > 0) {
        categoryButtons[0].click();
    } else if (allMenuItems.length > 0) {
        // Fallback if no category buttons but items exist (less likely for this setup)
        // Show all items and select the first one if possible
        let firstItem = null;
        allMenuItems.forEach(item => {
            item.style.display = 'flex';
            if (!firstItem) firstItem = item;
        });
        if (firstItem && firstItem.dataset.image) {
            mainMenuImage.src = firstItem.dataset.image;
            mainMenuImage.alt = updateMainMenuAltText(firstItem);
            firstItem.classList.add('active');
        }
        if (menuTitle) menuTitle.textContent = "Menu | All Items";
    }
});
