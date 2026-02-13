// MeshCore + BitChat Setup Guide - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    initTabs();
    
    // Smooth scroll for navigation
    initSmoothScroll();
    
    // Active navigation highlighting
    initActiveNav();
    
    // Checklist persistence
    initChecklist();
});

/**
 * Tab switching for config sections
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                // Account for sticky nav height
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight active navigation item based on scroll position
 */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function highlightNav() {
        const scrollPos = window.scrollY;
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial highlight
    highlightNav();
}

/**
 * Persist checklist state in localStorage
 */
function initChecklist() {
    const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
    const storageKey = 'meshcore-bitchat-checklist';
    
    // Load saved state
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        try {
            const state = JSON.parse(saved);
            checkboxes.forEach((cb, index) => {
                if (state[index]) {
                    cb.checked = true;
                }
            });
        } catch (e) {
            // Ignore parse errors
        }
    }
    
    // Save state on change
    checkboxes.forEach((cb, index) => {
        cb.addEventListener('change', () => {
            const state = {};
            checkboxes.forEach((c, i) => {
                state[i] = c.checked;
            });
            localStorage.setItem(storageKey, JSON.stringify(state));
        });
    });
}

/**
 * Add copy-to-clipboard functionality for code blocks
 */
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach(block => {
        const wrapper = block.parentElement;
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 10px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            color: #94a3b8;
            font-size: 12px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
        `;
        
        wrapper.style.position = 'relative';
        wrapper.appendChild(copyBtn);
        
        // Show on hover
        wrapper.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        wrapper.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        // Copy functionality
        copyBtn.addEventListener('click', async () => {
            const code = block.textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                copyBtn.textContent = 'Failed';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            }
        });
    });
}

// Initialize code copy after DOM load
document.addEventListener('DOMContentLoaded', initCodeCopy);
