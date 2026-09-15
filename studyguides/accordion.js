/**
 * Accordion Logic
 * Handles the opening and closing of topic sections.
 * Uses event delegation to handle both main and nested accordions robustly.
 */
document.addEventListener('click', (e) => {
    // Check if the clicked element is (or is inside) an accordion header
    const header = e.target.closest('.accordion-header');

    if (header) {
        // Prevent default action (useful if headers are anchors, though they are divs here)
        e.preventDefault();

        // Find the closest card container (parent of this header)
        // This handles both '.topic-accordion-card' and '.sub-accordion-card'
        const card = header.closest('.topic-accordion-card, .sub-accordion-card');

        if (card) {
            // Toggle the active state on the card
            card.classList.toggle('active');
        }
    }
});
