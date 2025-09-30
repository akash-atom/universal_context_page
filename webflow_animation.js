// Webflow GSAP Animation Script
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Please include GSAP CDN in your Webflow project header.');
        return;
    }
    
    // Get all button elements
    const btn1 = document.getElementById('btn_1');
    const btn2 = document.getElementById('btn_2');
    const btn3 = document.getElementById('btn_3');
    
    // Get all image elements
    const p1Img = document.getElementById('p1_img');
    const p2ImgElements = document.querySelectorAll('#p2_img'); // Multiple elements with same ID
    const p3ImgElements = document.querySelectorAll('#p3_img'); // Multiple elements with same ID
    
    // Get all text elements
    const text1 = document.getElementById('text_1');
    const text2 = document.getElementById('text_2');
    const text3 = document.getElementById('text_3');
    
    // Check if all required elements exist
    const requiredElements = [
        { element: btn1, id: 'btn_1' },
        { element: btn2, id: 'btn_2' },
        { element: btn3, id: 'btn_3' },
        { element: p1Img, id: 'p1_img' },
        { element: text1, id: 'text_1' },
        { element: text2, id: 'text_2' },
        { element: text3, id: 'text_3' }
    ];
    
    for (let item of requiredElements) {
        if (!item.element) {
            console.error(`Element with id "${item.id}" not found.`);
            return;
        }
    }
    
    // Check for multiple elements with same ID (p2_img and p3_img)
    if (p2ImgElements.length === 0) {
        console.error('No elements with id "p2_img" found.');
        return;
    }
    
    if (p3ImgElements.length === 0) {
        console.error('No elements with id "p3_img" found.');
        return;
    }
    
    console.log(`Found ${p2ImgElements.length} elements with id "p2_img"`);
    console.log(`Found ${p3ImgElements.length} elements with id "p3_img"`);
    
    // Animation function to handle opacity changes
    function animateElements(activeButton) {
        // Create a timeline for smooth animations
        const tl = gsap.timeline();
        
        if (activeButton === btn1) {
            // Button 1 clicked - show p1_img and text_1, dim others
            console.log('Button 1 clicked - Activating p1_img and text_1');
            
            // Show p1_img and text_1
            tl.to(p1Img, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            tl.to(text1, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            // Dim p2_img elements and hide text_2
            p2ImgElements.forEach(img => {
                tl.to(img, {
                    opacity: 0.3,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            tl.to(text2, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            // Dim p3_img elements and hide text_3
            p3ImgElements.forEach(img => {
                tl.to(img, {
                    opacity: 0.3,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            tl.to(text3, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
        } else if (activeButton === btn2) {
            // Button 2 clicked - show p2_img and text_2, dim others
            console.log('Button 2 clicked - Activating p2_img and text_2');
            
            // Show p2_img elements and text_2
            p2ImgElements.forEach(img => {
                tl.to(img, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            tl.to(text2, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            // Dim p1_img and hide text_1
            tl.to(p1Img, {
                opacity: 0.3,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            tl.to(text1, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            // Dim p3_img elements and hide text_3
            p3ImgElements.forEach(img => {
                tl.to(img, {
                    opacity: 0.3,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            tl.to(text3, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
        } else if (activeButton === btn3) {
            // Button 3 clicked - show p3_img and text_3, dim others
            console.log('Button 3 clicked - Activating p3_img and text_3');
            
            // Show p3_img elements and text_3
            p3ImgElements.forEach(img => {
                tl.to(img, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            tl.to(text3, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            // Dim p1_img and hide text_1
            tl.to(p1Img, {
                opacity: 0.3,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            tl.to(text1, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            // Dim p2_img elements and hide text_2
            p2ImgElements.forEach(img => {
                tl.to(img, {
                    opacity: 0.3,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            tl.to(text2, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
        }
    }
    
    // Add click event listeners
    btn1.addEventListener('click', function() {
        animateElements(btn1);
    });
    
    btn2.addEventListener('click', function() {
        animateElements(btn2);
    });
    
    btn3.addEventListener('click', function() {
        animateElements(btn3);
    });
    
    // Set initial state (similar to btn_1 click)
    // This ensures the page loads with the correct initial state
    console.log('Setting initial state...');
    animateElements(btn1);
    
    console.log('✅ Webflow animation system initialized successfully!');
    console.log('Initial state: p1_img and text_1 visible, others dimmed/hidden');
});

