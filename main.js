// ===========================================
// LANGUAGE SELECTION
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Get elements
    const languageScreen = document.getElementById('languageScreen');
    const mainContent = document.getElementById('mainContent');
    const englishBtn = document.getElementById('englishBtn');
    const tagalogBtn = document.getElementById('tagalogBtn');
    
    console.log('Elements found:', { languageScreen, mainContent, englishBtn, tagalogBtn });
    
    // Check if language was already selected (from localStorage)
    const languageSelected = localStorage.getItem('discriminationPHIL_language');
    
    if (languageSelected === 'english') {
        console.log('Language already selected: English');
        // User already selected English before, skip language screen
        languageScreen.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.classList.add('english-selected');
        
        // Trigger fade-in animations for main content
        setTimeout(() => {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }, 100);
    } else {
        console.log('Showing language selection screen');
        // Show language selection screen
        languageScreen.style.display = 'flex';
        mainContent.style.display = 'none';
    }
    
    // English button click
    if (englishBtn) {
        englishBtn.addEventListener('click', function() {
            console.log('English button clicked');
            
            // Save selection to localStorage
            localStorage.setItem('discriminationPHIL_language', 'english');
            
            // Add a smooth transition effect
            languageScreen.style.opacity = '0';
            languageScreen.style.transition = 'opacity 0.5s ease';
            
            console.log('Fading out language screen...');
            
            // Wait for fade out, then switch to main content
            setTimeout(() => {
                console.log('Switching to main content');
                languageScreen.style.display = 'none';
                mainContent.style.display = 'block';
                
                // Add a class to trigger fade-in
                mainContent.classList.add('visible');
                
                // Trigger fade-in animations for main content sections
                setTimeout(() => {
                    const fadeElements = document.querySelectorAll('.fade-in');
                    console.log('Fade elements found:', fadeElements.length);
                    fadeElements.forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                }, 100);
            }, 500);
        });
    } else {
        console.error('English button not found!');
    }
    
    // Tagalog button click (disabled for now)
    if (tagalogBtn) {
        tagalogBtn.addEventListener('click', function() {
            if (!tagalogBtn.disabled) {
                // Will implement Tagalog version later
                alert('Tagalog version coming soon! Using English for now.');
                localStorage.setItem('discriminationPHIL_language', 'tagalog');
            }
        });
    }
    
    // ===========================================
    // SEARCH FUNCTIONALITY
    // ===========================================
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    // Search pages mapping (simplified for now)
    const searchPages = {
        'women': 'learn.html#women',
        'women rights': 'learn.html#women',
        'woman': 'learn.html#women',
        'pwd': 'learn.html#pwd',
        'disability': 'learn.html#pwd',
        'pwd laws': 'learn.html#pwd',
        'elderly': 'learn.html#elderly',
        'senior': 'learn.html#elderly',
        'elderly rights': 'learn.html#elderly',
        'lgbt': 'learn.html#lgbt',
        'lgbt protection': 'learn.html#lgbt',
        'gay': 'learn.html#lgbt',
        'trans': 'learn.html#lgbt',
        'discrimination': 'learn.html',
        'rights': 'learn.html',
        'laws': 'learn.html',
        'help': 'resources.html',
        'resources': 'resources.html',
        'news': 'news.html',
        'quiz': 'quiz.html',
        'test': 'quiz.html'
    };
    
    function performSearch(query) {
        const normalizedQuery = query.toLowerCase().trim();
        
        // Check for exact matches first
        if (searchPages[normalizedQuery]) {
            window.location.href = searchPages[normalizedQuery];
            return;
        }
        
        // Check for partial matches
        for (const [key, page] of Object.entries(searchPages)) {
            if (normalizedQuery.includes(key)) {
                window.location.href = page;
                return;
            }
        }
        
        // If no match, show alert and suggest common terms
        const suggestions = Object.keys(searchPages).slice(0, 5).join(', ');
        alert(`No exact match found for "${query}". Try searching for: ${suggestions}`);
    }
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            if (query.trim() !== '') {
                performSearch(query);
            }
        });
    }
    
    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                if (query.trim() !== '') {
                    performSearch(query);
                }
            }
        });
    }
    
    // Suggestion tags click
    if (suggestionTags.length > 0) {
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const searchTerm = this.getAttribute('data-search');
                if (searchInput) searchInput.value = searchTerm;
                performSearch(searchTerm);
            });
        });
    }
    
    // ===========================================
    // COLLAPSE EXAMPLES FUNCTIONALITY
    // ===========================================
    const collapseBtn = document.getElementById('collapseBtn');
    const examplesContent = document.getElementById('examplesContent');
    
    if (collapseBtn && examplesContent) {
        let examplesVisible = true;
        
        // Initialize max-height for smooth transition
        examplesContent.style.maxHeight = examplesContent.scrollHeight + 'px';
        examplesContent.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
        
        collapseBtn.addEventListener('click', function() {
            examplesVisible = !examplesVisible;
            
            if (examplesVisible) {
                // Show examples
                examplesContent.style.maxHeight = examplesContent.scrollHeight + 'px';
                examplesContent.style.opacity = '1';
                collapseBtn.innerHTML = '<i class="fas fa-chevron-up"></i><span>Hide Examples</span>';
            } else {
                // Hide examples
                examplesContent.style.maxHeight = '0';
                examplesContent.style.opacity = '0';
                examplesContent.style.overflow = 'hidden';
                collapseBtn.innerHTML = '<i class="fas fa-chevron-down"></i><span>Show Examples</span>';
            }
        });
    }
    
    // ===========================================
    // MOBILE MENU FUNCTIONALITY
    // ===========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileCloseBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        mobileCloseBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
	
	    // ===========================================
    // NEWS CAROUSEL FUNCTIONALITY
    // ===========================================
    const newsCards = document.querySelectorAll('.news-card');
    const newsPrevBtn = document.getElementById('newsPrevBtn');
    const newsNextBtn = document.getElementById('newsNextBtn');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    let currentNewsIndex = 0;
    const totalNews = newsCards.length;
    
    // Function to update active news card
    function updateActiveNews(index) {
        // Remove active class from all cards and dots
        newsCards.forEach(card => card.classList.remove('active'));
        carouselDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current card and dot
        newsCards[index].classList.add('active');
        carouselDots[index].classList.add('active');
        
        currentNewsIndex = index;
    }
    
    // Previous button click
    if (newsPrevBtn) {
        newsPrevBtn.addEventListener('click', function() {
            let newIndex = currentNewsIndex - 1;
            if (newIndex < 0) {
                newIndex = totalNews - 1; // Loop to last card
            }
            updateActiveNews(newIndex);
        });
    }
    
    // Next button click
    if (newsNextBtn) {
        newsNextBtn.addEventListener('click', function() {
            let newIndex = currentNewsIndex + 1;
            if (newIndex >= totalNews) {
                newIndex = 0; // Loop to first card
            }
            updateActiveNews(newIndex);
        });
    }
    
    // Dot indicators click
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            updateActiveNews(index);
        });
    });
  
    
    // Optional: Auto-rotate news every 5 seconds
    let newsInterval;
    
    function startAutoRotate() {
        newsInterval = setInterval(() => {
            let newIndex = currentNewsIndex + 1;
            if (newIndex >= totalNews) {
                newIndex = 0;
            }
            updateActiveNews(newIndex);
        }, 5000); // Change every 5 seconds
    }
    
    function stopAutoRotate() {
        clearInterval(newsInterval);
    }
    
    // Start auto-rotate
    startAutoRotate();
    
    // Pause auto-rotate when hovering over carousel
    const newsCarousel = document.querySelector('.news-carousel-container');
    if (newsCarousel) {
        newsCarousel.addEventListener('mouseenter', stopAutoRotate);
        newsCarousel.addEventListener('mouseleave', startAutoRotate);
    }
    
    // ===========================================
    // SCROLL ANIMATIONS
    // ===========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // ===========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    console.log('Initialization complete');
});