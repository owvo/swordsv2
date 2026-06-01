const overlay = document.getElementById('overlay');
const animatedImg = document.getElementById('animatedImg');
const closeBtn = document.getElementById('closeBtn');
const textarea = overlay.querySelector('textarea');

// Dynamic key-value store keeping track of whatever text you type per image ID
const textStorage = {};

document.querySelectorAll('.track img').forEach(img => {
    img.addEventListener('click', (e) => {
        const targetImg = e.target;
        const imgId = targetImg.getAttribute('data-id');
        
        // Fetch the element's current exact layout metrics mid-flight
        const rect = targetImg.getBoundingClientRect();

        // Prepare Saved Text Content
        textarea.value = textStorage[imgId] || "";
        textarea.setAttribute('data-current-id', imgId);

        // Clone dimensions and position onto the animation layer instance
        animatedImg.src = targetImg.src;
        animatedImg.style.top = rect.top + 'px';
        animatedImg.style.left = rect.left + 'px';
        animatedImg.style.width = rect.width + 'px';
        animatedImg.style.height = rect.height + 'px';
        animatedImg.style.transform = 'rotate(0deg)';

        // Render transition container active
        document.body.classList.add('modal-open');
        overlay.classList.add('active');

        // Force layout recalculation engine reflow step
        animatedImg.offsetHeight;

        // Fire custom smooth flight transitions & 360 CCW rotation
        overlay.classList.add('open');
        animatedImg.style.top = '0px';
        animatedImg.style.left = '0px';
        animatedImg.style.width = '50vw';
        animatedImg.style.height = '100vh';
        animatedImg.style.transform = 'rotate(-360deg)';
    });
});

// Write and update context text string locally on key inputs
textarea.addEventListener('input', (e) => {
    const currentId = textarea.getAttribute('data-current-id');
    if (currentId) {
        textStorage[currentId] = e.target.value;
    }
});

// Close functions
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Wipe styles clean once transition finishes execution
    setTimeout(() => {
        animatedImg.src = "";
        animatedImg.style.transform = 'none';
    }, 500);
});
