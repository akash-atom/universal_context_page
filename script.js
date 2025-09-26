// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Please include GSAP CDN in your header.');
        return;
    }
    
    // Get all elements
    const redBlock = document.getElementById('red');
    const greenBlock = document.getElementById('green');
    const blueBlock = document.getElementById('blue');
    const btn1 = document.getElementById('btn_1');
    const btn2 = document.getElementById('btn_2');
    const btn3 = document.getElementById('btn_3');
    
    // Check if all elements exist
    const elements = [redBlock, greenBlock, blueBlock, btn1, btn2, btn3];
    const elementIds = ['red', 'green', 'blue', 'btn_1', 'btn_2', 'btn_3'];
    
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i]) {
            console.error(`Element with id "${elementIds[i]}" not found.`);
            return;
        }
    }
    
    // Store all blocks in an array for easier manipulation
    const blocks = [redBlock, greenBlock, blueBlock];
    
    // Get the SVG paths
    const path1 = document.getElementById('path_1');
    const path2 = document.getElementById('path_2');
    const path3 = document.getElementById('path_3');
    const paths = [path1, path2, path3];
    
    // Check if paths exist
    if (!path1 || !path2 || !path3) {
        console.warn('SVG paths not found. Line animations will be skipped.');
        console.log('Looking for elements with IDs: path_1, path_2, path_3');
        console.log('Found elements:', {
            path1: !!path1,
            path2: !!path2,
            path3: !!path3
        });
    } else {
        console.log('✅ All SVG paths found!');
        // Set up the drawing animation for each path
        paths.forEach(path => {
            if (path) {
                // Get the total length of the path
                const pathLength = path.getTotalLength();
                
                console.log(`Setting up ${path.id}:`);
                console.log(`- Path length: ${pathLength.toFixed(2)}px`);
                console.log(`- Current stroke-dasharray: ${path.getAttribute('stroke-dasharray')}`);
                console.log(`- Current stroke-dashoffset: ${path.getAttribute('stroke-dashoffset')}`);
                
                // Set initial state - line is hidden by dash offset
                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                    opacity: 1
                });
                
                console.log(`✅ ${path.id} setup complete!`);
            }
        });
    }
    
    // Function to animate blocks and connecting lines
    function animateBlocks(activeBlock, activePath) {
        // Kill any existing animations on the paths to prevent conflicts
        paths.forEach(path => {
            if (path) {
                gsap.killTweensOf(path);
            }
        });
        
        // Create a timeline for smooth animation
        const tl = gsap.timeline();
        
        // Animate all blocks
        blocks.forEach(block => {
            if (block === activeBlock) {
                // Fade in the active block
                tl.to(block, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0); // Start at the same time
            } else {
                // Fade out inactive blocks
                tl.to(block, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0); // Start at the same time
            }
        });
        
        // Animate connecting lines if paths exist
        if (paths.every(path => path)) {
            console.log('🎬 Starting line animation...');
            paths.forEach(path => {
                if (path === activePath) {
                    // Draw the active line
                    const pathLength = path.getTotalLength();
                    console.log(`Drawing ${path.id} (length: ${pathLength.toFixed(2)}px)`);
                    console.log(`Current strokeDasharray: ${path.style.strokeDasharray}`);
                    console.log(`Current strokeDashoffset: ${path.style.strokeDashoffset}`);
                    
                    tl.to(path, {
                        strokeDashoffset: 0,
                        duration: 1.5,
                        ease: "none"
                    }, 0.1); // Start slightly after block animation
                } else {
                    // Hide inactive lines
                    const pathLength = path.getTotalLength();
                    console.log(`Hiding ${path.id}`);
                    tl.to(path, {
                        strokeDashoffset: pathLength,
                        duration: 0.3,
                        ease: "none"
                    }, 0); // Start immediately
                }
            });
        } else {
            console.warn('⚠️ Some paths are missing, skipping line animation');
        }
    }
    
    // Add click event listeners
    btn1.addEventListener('click', function() {
        animateBlocks(redBlock, path1);
        updateButtonStyles(btn1);
        console.log('Button 1 clicked - Red block activated');
    });
    
    btn2.addEventListener('click', function() {
        animateBlocks(greenBlock, path2);
        updateButtonStyles(btn2);
        console.log('Button 2 clicked - Green block activated');
    });
    
    btn3.addEventListener('click', function() {
        animateBlocks(blueBlock, path3);
        updateButtonStyles(btn3);
        console.log('Button 3 clicked - Blue block activated');
    });
    
    // Function to update button styles using CSS classes
    function updateButtonStyles(activeButton) {
        const buttons = [btn1, btn2, btn3];
        
        buttons.forEach(button => {
            if (button === activeButton) {
                // Add active class to the clicked button
                button.classList.add('button-active');
                button.classList.remove('button-inactive');
            } else {
                // Add inactive class to other buttons
                button.classList.add('button-inactive');
                button.classList.remove('button-active');
            }
        });
    }
    
    // Set initial button styles (btn1 should be active initially)
    updateButtonStyles(btn1);
    
    // Draw the initial path (path_1) since red block is visible on page load
    if (path1) {
        const pathLength = path1.getTotalLength();
        gsap.to(path1, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "none"
        });
        console.log('🎨 Drawing initial path_1 on page load');
    }
   
    console.log('Block animation system initialized successfully!');
    console.log('Initial state: Red block visible, Green and Blue blocks hidden');
    console.log('Line drawing animations are ready!');
});
