document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-button');
    const menuTitle = document.getElementById('menuTitle');
    const mainMenuImage = document.getElementById('mainMenuImage');
    // const menuList = document.getElementById('menuList'); // menuList is not directly used, can be removed if not needed elsewhere
    const allMenuItems = document.querySelectorAll('.menu-item');

    // Update these paths to your actual first item images or desired defaults
    const categoryDefaultImages = {
        "Espresso": "images/classic_mr_espresso.jpg", // Should match data-image of first Espresso item
        "Frappe": "images/caramel_cloud_frappe.jpg",    // Update to first Frappe item's image
        "Brewed": "images/mountain_drip_brew.jpg",    // Update to first Brewed item's image
        "Bread": "images/golden_butter_croissant.jpg"      // Update to first Bread item's image
    };

    function updateMainMenuAltText(element) {
        const itemNameTextSpan = element.querySelector('.item-name-text');
        if (itemNameTextSpan) {
            return itemNameTextSpan.textContent.trim();
        }
        // Fallback if somehow the span isn't found (shouldn't happen with correct HTML)
        const menuNameSpan = element.querySelector('.menu-item-name');
        if (menuNameSpan) {
            return menuNameSpan.textContent.trim(); // Will include icon alt text if icon is first
        }
        return "Menu item"; // Generic fallback
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            menuTitle.textContent = `Menu | ${selectedCategory}`;

            let firstItemInCategory = null;

            allMenuItems.forEach(item => {
                item.classList.remove('active'); // Remove active from all items first
                if (item.classList.contains(selectedCategory.toLowerCase())) {
                    item.style.display = 'flex'; // IMPORTANT CHANGE HERE!
                    if (!firstItemInCategory) {
                        firstItemInCategory = item;
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Set main image to the default for the category
            // This will be quickly overridden if firstItemInCategory is found and has a data-image
            if (categoryDefaultImages[selectedCategory]) {
                mainMenuImage.src = categoryDefaultImages[selectedCategory];
                mainMenuImage.alt = selectedCategory; // Alt text is the category name initially
            } else {
                // Fallback if no category default image specified
                mainMenuImage.src = "images/placeholder_general.jpg"; // Ensure this placeholder exists
                mainMenuImage.alt = "Select a category";
            }

            if (firstItemInCategory) {
                firstItemInCategory.classList.add('active');
                if (firstItemInCategory.dataset.image) {
                    mainMenuImage.src = firstItemInCategory.dataset.image;
                    mainMenuImage.alt = updateMainMenuAltText(firstItemInCategory);
                }
            }
        });
    });

    allMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.dataset.image) {
                mainMenuImage.src = item.dataset.image;
                mainMenuImage.alt = updateMainMenuAltText(item);
            }

            allMenuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    if (categoryButtons.length > 0) {
        categoryButtons[0].click(); // Simulate a click on the first category to initialize
    }
});