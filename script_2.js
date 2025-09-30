

// Webflow GSAP Animation Script
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Check screen size - only run on screens above 991px
    function checkScreenSize() {
        return window.innerWidth > 991;
    }
    
    // Exit if screen is too small
    if (!checkScreenSize()) {
        return;
    }
    
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
    
    // Get all background divs
    const bg1 = document.getElementById('bg_1');
    const bg2 = document.getElementById('bg_2');
    const bg2_2 = document.getElementById('bg_2_2');
    const bg3 = document.getElementById('bg_3');
    const bg3_2 = document.getElementById('bg_3_2');
    
    // Get all highlight text elements
    const highlight1Elements = document.querySelectorAll('.highlight_1');
    const highlight2Elements = document.querySelectorAll('.highlight_2');
    const highlight3Elements = document.querySelectorAll('.highlight_3');
    
    // Check if all required elements exist
    const requiredElements = [
        { element: btn1, id: 'btn_1' },
        { element: btn2, id: 'btn_2' },
        { element: btn3, id: 'btn_3' },
        { element: p1Img, id: 'p1_img' },
        { element: text1, id: 'text_1' },
        { element: text2, id: 'text_2' },
        { element: text3, id: 'text_3' },
        { element: bg1, id: 'bg_1' }
    ];
    
    // Check for highlight elements
    console.log('Found highlight elements:', {
        highlight1: highlight1Elements.length,
        highlight2: highlight2Elements.length,
        highlight3: highlight3Elements.length
    });
    
    for (let item of requiredElements) {
        if (!item.element) {
            console.error(`Element with id "${item.id}" not found.`);
            return;
        }
    }
    
    // Check for optional background elements
    const optionalBgElements = [
        { element: bg2, id: 'bg_2' },
        { element: bg2_2, id: 'bg_2_2' },
        { element: bg3, id: 'bg_3' },
        { element: bg3_2, id: 'bg_3_2' }
    ];
    
    const existingBgElements = optionalBgElements.filter(item => item.element);
    console.log('Found background elements:', existingBgElements.map(item => item.id));
    
    // Check for multiple elements with same ID (p2_img and p3_img)
    if (p2ImgElements.length === 0) {
        console.error('No elements with id "p2_img" found.');
        return;
    }
    
    if (p3ImgElements.length === 0) {
        console.error('No elements with id "p3_img" found.');
        return;
    }
    
    // Set initial state of background divs (bg_1 will be shown on page load)
    gsap.set(bg1, {
        width: "65px",
        opacity: 1.0
    });
    
    // Set initial state for existing background elements only
    const allBgElements = [bg2, bg2_2, bg3, bg3_2].filter(element => element);
    if (allBgElements.length > 0) {
        gsap.set(allBgElements, {
            width: "0px",
            opacity: 0
        });
    }
    
    
    // Function to update button states
    function updateButtonStates(activeButton) {
        const buttons = [btn1, btn2, btn3];
        
        buttons.forEach(button => {
            if (button === activeButton) {
                // Active button - white background
                gsap.to(button, {
                    backgroundColor: "#ffffff",
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Add active class
                button.classList.add('button-active');
                button.classList.remove('button-inactive');
                
            } else {
                // Inactive button - purple with 40% opacity
                gsap.to(button, {
                    backgroundColor: "rgba(142, 97, 216, 0.4)", // #8E61D8 with 40% opacity
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Add inactive class
                button.classList.add('button-inactive');
                button.classList.remove('button-active');
            }
        });
    }
    
    // Animation function to handle opacity changes
    function animateElements(activeButton) {
        // Update button states first
        updateButtonStates(activeButton);
        
        // Create a timeline for smooth animations
        const tl = gsap.timeline();
        
        if (activeButton === btn1) {
            // Button 1 clicked - show p1_img and text_1, dim others
            
            // Animate bg_1 to 65px width and opacity 1.0
            tl.to(bg1, {
                width: "65px",
                opacity: 1.0,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
            
            // Reset other background divs to 0px width and opacity 0 (only if they exist)
            const otherBgElements = [bg2, bg2_2, bg3, bg3_2].filter(element => element);
            if (otherBgElements.length > 0) {
                tl.to(otherBgElements, {
                    width: "0px",
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
            
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
            
            // Change highlight text colors for btn_1
            // Set highlight_1 to white
            highlight1Elements.forEach(element => {
                tl.to(element, {
                    color: "#fff",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            // Reset other highlight elements to gray
            highlight2Elements.forEach(element => {
                tl.to(element, {
                    color: "#656363",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            highlight3Elements.forEach(element => {
                tl.to(element, {
                    color: "#656363",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
        } else if (activeButton === btn2) {
            // Button 2 clicked - show p2_img and text_2, dim others
            
            // Animate bg_2 to 90px and bg_2_2 to 120px width with opacity 1.0 (only if they exist)
            if (bg2) {
                tl.to(bg2, {
                    width: "105px",
                    opacity: 1.0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
            
            if (bg2_2) {
                tl.to(bg2_2, {
                    width: "138px",
                    opacity: 1.0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
            
            // Reset other background divs to 0px width and opacity 0 (only if they exist)
            const otherBgElements = [bg1, bg3, bg3_2].filter(element => element);
            if (otherBgElements.length > 0) {
                tl.to(otherBgElements, {
                    width: "0px",
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
            
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
            
            // Change highlight text colors for btn_2
            // Set highlight_2 elements to white
            highlight2Elements.forEach(element => {
                tl.to(element, {
                    color: "#fff",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            // Reset other highlight elements to gray
            highlight1Elements.forEach(element => {
                tl.to(element, {
                    color: "#656363",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            highlight3Elements.forEach(element => {
                tl.to(element, {
                    color: "#656363",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
        } else if (activeButton === btn3) {
            // Button 3 clicked - show p3_img and text_3, dim others
            
            // Animate bg_3 to 213px and bg_3_2 to 158px width with opacity 1.0 (only if they exist)
            if (bg3) {
                tl.to(bg3, {
                    width: "213px",
                    opacity: 1.0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
            
            if (bg3_2) {
                tl.to(bg3_2, {
                    width: "158px",
                    opacity: 1.0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
            
            // Reset other background divs to 0px width and opacity 0 (only if they exist)
            const otherBgElements = [bg1, bg2, bg2_2].filter(element => element);
            if (otherBgElements.length > 0) {
                tl.to(otherBgElements, {
                    width: "0px",
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
            
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
            
            // Change highlight text colors for btn_3
            // Set highlight_3 elements to white
            highlight3Elements.forEach(element => {
                tl.to(element, {
                    color: "#fff",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            // Reset other highlight elements to gray
            highlight1Elements.forEach(element => {
                tl.to(element, {
                    color: "#656363",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
            
            highlight2Elements.forEach(element => {
                tl.to(element, {
                    color: "#656363",
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            });
        }
    }
    
    // Add hover effects for buttons
    function addHoverEffects() {
        const buttons = [btn1, btn2, btn3];
        
        buttons.forEach(button => { 
            // Mouse enter effect - white background on hover
            button.addEventListener('mouseenter', function() {
                gsap.to(button, {
                    backgroundColor: "#ffffff",
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            // Mouse leave effect - return to original state
            button.addEventListener('mouseleave', function() {
                if (button.classList.contains('button-active')) {
                    // Keep white if it's the active button
                    gsap.to(button, {
                        backgroundColor: "#ffffff",
                        duration: 0.2,
                        ease: "power2.out"
                    });
                } else {
                    // Return to purple with 40% opacity if inactive
                    gsap.to(button, {
                        backgroundColor: "rgba(142, 97, 216, 0.4)",
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
    
    // Add click event listeners for buttons
    btn1.addEventListener('click', function() {
        animateElements(btn1);
    });
    
    btn2.addEventListener('click', function() {
        animateElements(btn2);
    });
    
    btn3.addEventListener('click', function() {
        animateElements(btn3);
    });
    
    // Add click event listeners for images
    p1Img.addEventListener('click', function() {
        animateElements(btn1);
    });
    
    // Add click listeners to all p2_img elements
    p2ImgElements.forEach(img => {
        img.addEventListener('click', function() {
            animateElements(btn2);
        });
    });
    
    // Add click listeners to all p3_img elements
    p3ImgElements.forEach(img => {
        img.addEventListener('click', function() {
            animateElements(btn3);
        });
    });
    
    // Initialize hover effects
    addHoverEffects();
    
    // Set initial state (similar to btn_1 click)
    // This ensures the page loads with the correct initial state
    animateElements(btn1);
    
    // Handle window resize - disable/enable animations based on screen size
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (!checkScreenSize()) {
                // Screen is now too small - remove all event listeners and reset styles
                [btn1, btn2, btn3].forEach(button => {
                    button.replaceWith(button.cloneNode(true));
                });
                
                // Also remove image click listeners
                p1Img.replaceWith(p1Img.cloneNode(true));
                p2ImgElements.forEach(img => {
                    img.replaceWith(img.cloneNode(true));
                });
                p3ImgElements.forEach(img => {
                    img.replaceWith(img.cloneNode(true));
                });
                
                // Reset background divs to initial state (only existing ones)
                const allBgElements = [bg1, bg2, bg2_2, bg3, bg3_2].filter(element => element);
                if (allBgElements.length > 0) {
                    gsap.set(allBgElements, {
                        width: "0px",
                        opacity: 0
                    });
                }
            }
        }, 250);
    });
});
