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

// PDF download functionality using browser's native print-to-PDF
function downloadPDF() {
    // Close hamburger menu before download
    closeHamburgerMenu();
    
    // Show progress indicator
    showProgressIndicator();
    updateProgress(10, 'Initializing PDF generation...');
    
    // Add a small delay to ensure progress indicator is visible
    setTimeout(() => {
        updateProgress(30, 'Preparing content for PDF...');
        
        // Use the reliable browser print-to-PDF method
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const originalTheme = document.documentElement.getAttribute('data-theme');
        
        try {
            // Hide hamburger menu and force light theme
            if (hamburgerMenu) {
                hamburgerMenu.style.display = 'none';
            }
            document.documentElement.setAttribute('data-theme', 'light');
            
            updateProgress(50, 'Optimizing layout for print...');
            
            // Add print-specific styles temporarily
            const printStyle = document.createElement('style');
            printStyle.id = 'temp-print-style';
            printStyle.textContent = `
                @media print {
                    @page {
                        size: A4;
                        margin: 0.5in;
                    }
                    body { 
                        background: white !important; 
                        color: #333 !important;
                        font-size: 12pt !important;
                        line-height: 1.4 !important;
                    }
                    .container { 
                        max-width: none !important; 
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .header { 
                        background: #667eea !important; 
                        color: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        padding: 20pt !important;
                        margin-bottom: 10pt !important;
                    }
                    .header * { 
                        color: white !important; 
                    }
                    .section { 
                        background: #f8f9fa !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        padding: 15pt !important;
                        margin-bottom: 10pt !important;
                        border-left: 3pt solid #667eea !important;
                        page-break-inside: avoid !important;
                    }
                    .section h2 { 
                        color: #333 !important;
                        font-size: 14pt !important;
                        margin-bottom: 10pt !important;
                    }
                    .experience-item, .reference-item { 
                        page-break-inside: avoid !important;
                        margin-bottom: 10pt !important;
                        padding: 10pt !important;
                        background: white !important;
                        border: 1pt solid #ddd !important;
                    }
                    .skills-grid { 
                        display: block !important;
                    }
                    .skill-item { 
                        display: inline-block !important;
                        background: #667eea !important;
                        color: white !important;
                        padding: 3pt 8pt !important;
                        margin: 2pt !important;
                        border-radius: 10pt !important;
                        font-size: 10pt !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    table { 
                        border-collapse: collapse !important;
                        width: 100% !important;
                        margin-bottom: 10pt !important;
                    }
                    td, th { 
                        border: 1pt solid #ddd !important;
                        padding: 6pt !important;
                        font-size: 10pt !important;
                        color: #333 !important;
                    }
                    .hamburger-menu { 
                        display: none !important; 
                    }
                    h1, h2, h3, h4, h5, h6 { 
                        color: inherit !important;
                    }
                    p, li, span, div { 
                        color: #333 !important;
                    }
                    .header h1, .header p, .header * { 
                        color: white !important; 
                    }
                }
            `;
            document.head.appendChild(printStyle);
            
            updateProgress(70, 'Preparing PDF download...');
            
            // Wait a moment for styles to apply
            setTimeout(() => {
                updateProgress(90, 'Preparing instructions...');
                
                // Keep progress visible for a moment longer
                setTimeout(() => {
                    hideProgressIndicator();
                    
                    // Show detailed instructions for better UX
                    const instructionsModal = createInstructionsModal();
                    document.body.appendChild(instructionsModal);
                    
                    // Set up event listeners for the modal
                    setupInstructionsModal(instructionsModal);
                }, 800); // Give more time to see the progress
                
                // Clean up after a delay
                setTimeout(() => {
                    cleanupPrintStyles();
                }, 3000);
                
            }, 500);
            
        } catch (error) {
            console.error('Error in PDF setup:', error);
            hideProgressIndicator();
            cleanupPrintStyles();
            alert('PDF setup failed. Please try using the Print CV button instead.');
        }
    }, 300); // Small delay to show initial progress
    
    function triggerPDFDownload() {
        // Try modern approach first
        if (window.navigator && window.navigator.userAgent) {
            const isChrome = window.navigator.userAgent.includes('Chrome');
            const isEdge = window.navigator.userAgent.includes('Edg');
            
            if (isChrome || isEdge) {
                // For Chrome/Edge, we can suggest better UX
                try {
                    // Set document title for PDF filename suggestion
                    const originalTitle = document.title;
                    document.title = 'Musa_Makaphela_CV';
                    
                    // Trigger print
                    window.print();
                    
                    // Restore title after a delay
                    setTimeout(() => {
                        document.title = originalTitle;
                    }, 2000);
                    
                    return;
                } catch (e) {
                    console.log('Advanced PDF mode failed, using standard print');
                }
            }
        }
        
        // Fallback to standard print
        window.print();
    }
    
    function cleanupPrintStyles() {
        // Remove temporary print styles
        const tempStyle = document.getElementById('temp-print-style');
        if (tempStyle) {
            tempStyle.remove();
        }
        
        // Restore original theme and hamburger menu
        document.documentElement.setAttribute('data-theme', originalTheme);
        if (hamburgerMenu) {
            hamburgerMenu.style.display = 'block';
        }
    }
    
    function createInstructionsModal() {
        const modal = document.createElement('div');
        modal.id = 'pdf-instructions-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Inter', sans-serif;
        `;
        
        const browserType = getBrowserType();
        const instructions = getBrowserSpecificInstructions(browserType);
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 30px; max-width: 500px; margin: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-height: 80vh; overflow-y: auto;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 48px; margin-bottom: 10px;">📄</div>
                    <h2 style="margin: 0; color: #333; font-size: 24px; font-weight: 600;">Download CV as PDF</h2>
                    <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">Browser: ${browserType}</p>
                </div>
                
                <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                    <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px; font-weight: 600;">📋 Step-by-Step Instructions:</h3>
                    ${instructions}
                </div>
                
                <div style="background: #fff3cd; border-radius: 8px; padding: 15px; margin-bottom: 25px; border: 1px solid #ffeaa7;">
                    <p style="margin: 0; color: #856404; font-size: 14px;">
                        <strong>💡 Pro tip:</strong> Once you select "Save as PDF" once, your browser will remember this preference for future downloads!
                    </p>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: space-between;">
                    <button id="cancel-pdf-btn" style="flex: 1; padding: 12px; border: 2px solid #ddd; background: white; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #666; transition: all 0.2s;">
                        Cancel
                    </button>
                    <button id="proceed-pdf-btn" style="flex: 2; padding: 12px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                        🚀 Open Print Dialog
                    </button>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    function getBrowserType() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
        if (userAgent.includes('Edg')) return 'Microsoft Edge';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
        return 'Unknown Browser';
    }
    
    function getBrowserSpecificInstructions(browserType) {
        const baseInstructions = `
            <ol style="margin: 0; padding-left: 20px; color: #333; line-height: 1.6;">
                <li style="margin-bottom: 8px;">Click <strong>"🚀 Open Print Dialog"</strong> below</li>
                <li style="margin-bottom: 8px;">In the print dialog, look for <strong>"Destination"</strong> or <strong>"Printer"</strong></li>
        `;
        
        let specificStep = '';
        switch (browserType) {
            case 'Chrome':
                specificStep = `<li style="margin-bottom: 8px;">Click the dropdown and select <strong>"Save as PDF"</strong></li>`;
                break;
            case 'Microsoft Edge':
                specificStep = `<li style="margin-bottom: 8px;">Click the dropdown and select <strong>"Microsoft Print to PDF"</strong> or <strong>"Save as PDF"</strong></li>`;
                break;
            case 'Firefox':
                specificStep = `<li style="margin-bottom: 8px;">Click the dropdown and select <strong>"Microsoft Print to PDF"</strong></li>`;
                break;
            default:
                specificStep = `<li style="margin-bottom: 8px;">Select <strong>"Save as PDF"</strong> or <strong>"Microsoft Print to PDF"</strong> option</li>`;
        }
        
        return baseInstructions + specificStep + `
                <li style="margin-bottom: 8px;">Click <strong>"Save"</strong> or <strong>"Print"</strong></li>
                <li style="margin-bottom: 0;">Choose your download location and save as <strong>"Musa_Makaphela_CV.pdf"</strong></li>
            </ol>
        `;
    }
    
    function setupInstructionsModal(modal) {
        const cancelBtn = modal.querySelector('#cancel-pdf-btn');
        const proceedBtn = modal.querySelector('#proceed-pdf-btn');
        
        // Add hover effects
        cancelBtn.addEventListener('mouseenter', () => {
            cancelBtn.style.borderColor = '#999';
            cancelBtn.style.color = '#333';
        });
        cancelBtn.addEventListener('mouseleave', () => {
            cancelBtn.style.borderColor = '#ddd';
            cancelBtn.style.color = '#666';
        });
        
        proceedBtn.addEventListener('mouseenter', () => {
            proceedBtn.style.transform = 'translateY(-2px)';
            proceedBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
        });
        proceedBtn.addEventListener('mouseleave', () => {
            proceedBtn.style.transform = 'translateY(0)';
            proceedBtn.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        });
        
        // Button actions
        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            cleanupPrintStyles();
        });
        
        proceedBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            triggerPDFDownload();
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                cleanupPrintStyles();
            }
        });
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                cleanupPrintStyles();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
}

// Alternative PDF method using browser's print functionality
function usePrintToPDF() {
    // This function is now integrated into downloadPDF()
    downloadPDF();
}

// Progress indicator functions
function showProgressIndicator() {
    // Remove existing progress indicator if any
    hideProgressIndicator();
    
    const progressOverlay = document.createElement('div');
    progressOverlay.id = 'pdf-progress-overlay';
    progressOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
    `;
    
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        min-width: 350px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        border: 1px solid #e0e0e0;
    `;
    
    progressContainer.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 10px;">⚡</div>
        <h3 style="margin: 0 0 20px 0; color: #333; font-size: 18px; font-weight: 600;">Generating PDF</h3>
        <div style="width: 100%; background: #f0f0f0; border-radius: 10px; height: 8px; margin-bottom: 15px; overflow: hidden;">
            <div id="progress-bar" style="width: 10%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; border-radius: 10px; transition: width 0.3s ease;"></div>
        </div>
        <p id="progress-text" style="margin: 0; color: #666; font-size: 14px;">Initializing...</p>
    `;
    
    progressOverlay.appendChild(progressContainer);
    document.body.appendChild(progressOverlay);
}

function updateProgress(percentage, text) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    if (progressText) {
        progressText.textContent = text;
    }
}

function hideProgressIndicator() {
    const progressOverlay = document.getElementById('pdf-progress-overlay');
    if (progressOverlay) {
        progressOverlay.remove();
    }
}

// Function to close hamburger menu
function closeHamburgerMenu() {
    const hamburgerBtn = document.querySelector('#hamburgerBtn');
    const menuDropdown = document.querySelector('#menuDropdown');
    
    if (hamburgerBtn && menuDropdown) {
        hamburgerBtn.classList.remove('active');
        menuDropdown.classList.remove('active');
    }
}

// Custom print function that handles theme and menu closing
function printCV() {
    closeHamburgerMenu();
    
    // Small delay to ensure menu is closed before printing
    setTimeout(() => {
        window.print();
    }, 100);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const printBtn = document.querySelector('.print-btn');
    const downloadBtn = document.querySelector('.download-btn');
    
    if (printBtn) {
        printBtn.addEventListener('click', printCV);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPDF);
    }
});
