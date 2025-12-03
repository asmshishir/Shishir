document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Smooth scrolling for navigation links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // See My Love Tree CTA button functionality
    const seeLoveTreeBtn = document.getElementById('see-love-tree-btn');
    if (seeLoveTreeBtn) {
        seeLoveTreeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const loveTreeSection = document.getElementById('love-tree');
            if (loveTreeSection) {
                const headerOffset = header.offsetHeight;
                const elementPosition = loveTreeSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }

    // Background Audio Logic
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-btn');
    const musicIcon = musicToggleButton ? musicToggleButton.querySelector('i') : null;

    if (backgroundMusic && musicToggleButton && musicIcon) {
        backgroundMusic.volume = 0.3; // Set a default volume

        // Attempt to autoplay muted music
        backgroundMusic.play().then(() => {
            // Autoplay successful (muted)
            backgroundMusic.muted = true;
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        }).catch(error => {
            // Autoplay blocked, music remains paused and muted
            console.log("Autoplay blocked. User interaction required to play audio.", error);
            backgroundMusic.muted = true;
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        });

        // Toggle music on button click
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic.paused || backgroundMusic.muted) {
                backgroundMusic.muted = false; // Unmute first
                backgroundMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            } else {
                backgroundMusic.muted = true; // Mute
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            }
        });

        // Fallback for autoplay blocked: play/unmute on first user interaction
        const handleFirstInteraction = () => {
            if (backgroundMusic.paused && !backgroundMusic.muted) {
                 // If paused but not muted (meaning autoplay tried to play unmuted and was blocked)
                backgroundMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            } else if (backgroundMusic.muted) {
                 // If muted
                backgroundMusic.muted = false;
                backgroundMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
    }

    // Fade-in animations on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appeared');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Heart particle effects
    const heartContainer = document.querySelector('.heart-container');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function createHeart() {
        if (!heartContainer) return;

        const heart = document.createElement('div');
        heart.classList.add('heart');
        heartContainer.appendChild(heart);

        // Position heart near the cursor
        heart.style.left = (mouseX + (Math.random() - 0.5) * 200) + 'px'; // -100 to +100px around mouseX
        heart.style.top = (mouseY + (Math.random() - 0.5) * 200) + 'px'; // -100 to +100px around mouseY
        
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5 seconds
        heart.style.opacity = Math.random() * 0.5 + 0.5; // 0.5-1 opacity
        heart.style.width = Math.random() * 10 + 10 + 'px'; // 10-20px
        heart.style.height = heart.style.width;

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Create hearts if the container exists, with reduced frequency
    if (heartContainer) {
        setInterval(createHeart, 2000); // Create a new heart every 2000ms (further reduced frequency)
    }

    // Terms and Conditions Modal Logic
    const termsModal = document.getElementById('terms-modal');
    const openTermsModalBtn = document.getElementById('open-terms-modal');
    const closeTermsModalBtn = document.querySelector('.close-button');

    if (openTermsModalBtn) {
        openTermsModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.style.display = 'block';
        });
    }

    if (closeTermsModalBtn) {
        closeTermsModalBtn.addEventListener('click', () => {
            termsModal.style.display = 'none';
        });
    }

    // Image Modal Logic
    const imageModal = document.getElementById('image-modal');
    const fullImage = document.getElementById('full-image');
    const imageCloseButton = document.querySelector('.image-close-button');
    const clickableImages = document.querySelectorAll('.clickable-image');

    clickableImages.forEach(image => {
        image.addEventListener('click', () => {
            fullImage.src = image.src;
            imageModal.style.display = 'block';
        });
    });

    if (imageCloseButton) {
        imageCloseButton.addEventListener('click', () => {
            imageModal.style.display = 'none';
        });
    }

    // Close any modal if user clicks outside of it
    window.addEventListener('click', (e) => {
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Form Validation for apply.html
    const applyForm = document.getElementById('girlfriend-application-form');
    if (applyForm) {
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const emailInput = document.getElementById('email');
        const reasonTextarea = document.getElementById('reason');
        const photoInput = document.getElementById('photo');
        const favoriteDateInput = document.getElementById('favorite-date');
        const agreementCheckbox = document.getElementById('agreement');
        const loyaltyInput = document.getElementById('loyalty');
        const loyaltyValueSpan = document.getElementById('loyalty-value');

        loyaltyInput.addEventListener('input', () => {
            loyaltyValueSpan.textContent = loyaltyInput.value;
        });

        applyForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            let isValid = true;

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            // Validate Name
            if (nameInput.value.trim() === '') {
                displayError(nameInput, 'Name is required.');
                isValid = false;
            }

            // Validate Age
            if (ageInput.value === '' || parseInt(ageInput.value) < 18) {
                displayError(ageInput, 'Age must be 18 or older.');
                isValid = false;
            }

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Reason (textarea)
            if (reasonTextarea.value.trim().length < 50) {
                displayError(reasonTextarea, 'Please write at least 50 characters.');
                isValid = false;
            }

            // Validate Photo upload (check if a file is selected)
            if (photoInput.files.length === 0) {
                displayError(photoInput, 'Please upload a photo.');
                isValid = false;
            }

            // Validate Favorite Date Idea
            if (favoriteDateInput.value.trim() === '') {
                displayError(favoriteDateInput, 'Favorite date idea is required.');
                isValid = false;
            }

            // Validate Agreement checkbox
            if (!agreementCheckbox.checked) {
                displayError(agreementCheckbox, 'You must agree to the terms and conditions.');
                isValid = false;
            }

            if (isValid) {
                alert('Application Submitted Successfully! (This is a demo, no data is actually sent.)');
                applyForm.reset(); // Reset form after successful submission
                loyaltyValueSpan.textContent = loyaltyInput.value; // Reset loyalty display
            }
        });

        function displayError(inputElement, message) {
            let errorContainer = inputElement.nextElementSibling;
            if (inputElement.type === 'checkbox') {
                errorContainer = inputElement.closest('.checkbox-group').querySelector('.error-message');
            }
            if (errorContainer && errorContainer.classList.contains('error-message')) {
                errorContainer.textContent = message;
                errorContainer.style.display = 'block';
            }
        }
    }
});
