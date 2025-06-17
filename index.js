
    // Hamburger menu functionality
    document.addEventListener('DOMContentLoaded', function() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const menuDropdown = document.getElementById('menuDropdown');
        const themeToggle = document.getElementById('themeToggle');
        
        // Check for saved theme preference or default to light
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
        
        // Hamburger menu toggle
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            menuDropdown.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburgerBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
                hamburgerBtn.classList.remove('active');
                menuDropdown.classList.remove('active');
            }
        });
        
        // Theme toggle functionality
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
        
        console.log('Resume loaded successfully with theme support');
    });

      // PDF download functionality (placeholder)
    function downloadPDF() {
        // Close hamburger menu before printing
        closeHamburgerMenu();
        
        // For now, this will just print the page
        // In a real implementation, you could use libraries like jsPDF or html2pdf
        alert('PDF download feature coming soon! For now, use Print and save as PDF.');
        window.print();
    }
    
    // Function to close hamburger menu
    function closeHamburgerMenu() {
        const hamburgerBtn = document.querySelector('#hamburgerBtn');
        const menuDropdown = document.querySelector('#menuDropdown');
        
        hamburgerBtn.classList.remove('active');
        menuDropdown.classList.remove('active');
    }
    
    // Custom print function that handles theme and menu closing
    function printCV() {
        closeHamburgerMenu();
        
        // Small delay to ensure menu is closed before printing
        setTimeout(() => {
            window.print();
        }, 100);
    }
