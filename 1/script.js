// ===============================================
// Modern Love Letter App - Interactive JavaScript
// ===============================================

// Letter Modal Management
function openLetter() {
    const modal = document.getElementById('letterModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const letterPaper = modal.querySelector('.letter-paper');
    letterPaper.style.animation = 'letterUnfold 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
}

function closeLetter() {
    const modal = document.getElementById('letterModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Love Message Management
function showLoveMessage() {
    const overlay = document.getElementById('loveMessageOverlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Create sparkle effect
    createSparkleEffect();
    
    // Add heart burst animation
    createHeartBurst();
    
    // Play success sound (if desired)
    // playLoveSound();
}

function hideLoveMessage() {
    const overlay = document.getElementById('loveMessageOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Dynamic Heart Creation
function createHeartBurst() {
    const container = document.querySelector('.love-message-content');
    const colors = ['💖', '💕', '💗', '💞', '💝', '💓', '💘'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = colors[Math.floor(Math.random() * colors.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '5';
        heart.style.animation = `heartBurst 2s ease-out forwards`;
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2500);
    }
}

// Sparkle Effect
function createSparkleEffect() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const body = document.body;
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.fontSize = Math.random() * 15 + 10 + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = `sparkleFade 3s ease-out forwards`;
        sparkle.style.animationDelay = Math.random() * 1 + 's';
        
        body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 4000);
    }
}

// Floating Hearts Background Animation
function initFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts-container');
    if (!heartsContainer) return;
    
    // Additional dynamic hearts
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createFloatingHeart();
        }
    }, 3000);
}

function createFloatingHeart() {
    const heartsContainer = document.querySelector('.floating-hearts-container');
    const heartTypes = ['💖', '💕', '💗', '💞', '💝', '💓', '💘'];
    
    const heart = document.createElement('div');
    heart.classList.add('heart', 'dynamic-heart');
    heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 8 + 12) + 's';
    heart.style.animationDelay = '0s';
    heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, parseInt(heart.style.animationDuration) * 1000);
}

// Envelope Hover Effect Enhancement
function enhanceEnvelopeAnimation() {
    const letterCard = document.querySelector('.letter-card');
    if (!letterCard) return;
    
    letterCard.addEventListener('mouseenter', () => {
        const heartSeal = letterCard.querySelector('.heart-seal');
        if (heartSeal) {
            heartSeal.style.animation = 'sealPulse 0.5s ease-in-out 3';
        }
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const letterModal = document.getElementById('letterModal');
        const loveOverlay = document.getElementById('loveMessageOverlay');
        
        if (e.key === 'Escape') {
            if (loveOverlay && loveOverlay.classList.contains('active')) {
                hideLoveMessage();
            } else if (letterModal && letterModal.classList.contains('active')) {
                closeLetter();
            }
        }
        
        if (e.key === 'Enter' && !letterModal.classList.contains('active')) {
            openLetter();
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Performance Optimization - Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme Toggle (Optional Feature)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Advanced Letter Animation
function addAdvancedLetterAnimations() {
    const letterPaper = document.querySelector('.letter-paper');
    if (!letterPaper) return;
    
    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letterUnfold {
            0% {
                transform: scale(0.1) rotateY(-90deg);
                opacity: 0;
            }
            50% {
                transform: scale(0.8) rotateY(-45deg);
                opacity: 0.7;
            }
            100% {
                transform: scale(1) rotateY(0deg);
                opacity: 1;
            }
        }
        
        @keyframes heartBurst {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0.5) rotate(360deg) translateY(-100px);
                opacity: 0;
            }
        }
        
        @keyframes sparkleFade {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            25% {
                transform: scale(1.2) rotate(90deg);
                opacity: 1;
            }
            75% {
                transform: scale(1) rotate(270deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0.5) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Touch Gesture Support
function initTouchGestures() {
    let startX, startY;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Swipe detection
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - could close modal
                    const activeModal = document.querySelector('.letter-modal.active');
                    if (activeModal) closeLetter();
                } else {
                    // Swipe right - could open letter
                    const letterModal = document.getElementById('letterModal');
                    if (letterModal && !letterModal.classList.contains('active')) {
                        openLetter();
                    }
                }
            }
        }
        
        startX = null;
        startY = null;
    });
}

// Initialize App
function initApp() {
    // Add advanced animations
    addAdvancedLetterAnimations();
    
    // Initialize features
    initFloatingHearts();
    enhanceEnvelopeAnimation();
    initKeyboardNavigation();
    initSmoothScrolling();
    initLazyLoading();
    initThemeToggle();
    initTouchGestures();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    console.log('💕 Love Letter App initialized successfully! 💕');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export functions for potential external use
window.LoveLetterApp = {
    openLetter,
    closeLetter,
    showLoveMessage,
    hideLoveMessage,
    createHeartBurst,
    createSparkleEffect
};

window.requestAnimationFrame =
window.__requestAnimationFrame ||
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    (function () {
        return function (callback, element) {
            var lastTime = element.__lastTime;
            if (lastTime === undefined) {
                lastTime = 0;
            }
            var currTime = Date.now();
            var timeToCall = Math.max(1, 33 - (currTime - lastTime));
            window.setTimeout(callback, timeToCall);
            element.__lastTime = currTime + timeToCall;
        };
    })();
window.isDevice = 
(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(((navigator.userAgent 
    || navigator.vendor || window.opera)).toLowerCase()));
var loaded = false;
var init = function () {
if (loaded) return;
loaded = true;
var mobile = window.isDevice;
var koef = mobile ? 0.5 : 1;
var canvas = document.getElementById('heart');
var ctx = canvas.getContext('2d');
var width = canvas.width = koef * innerWidth;
var height = canvas.height = koef * innerHeight;
var rand = Math.random;
ctx.fillStyle = "rgba(0,0,0,1)";
ctx.fillRect(0, 0, width, height);

var heartPosition = function (rad) {
    //return [Math.sin(rad), Math.cos(rad)];
    return [Math.pow(Math.sin(rad), 3), 
        -(15 * Math.cos(rad) - 5 * 
        Math.cos(2 * rad) - 2 * 
        Math.cos(3 * rad) - Math.cos(4 * rad))];
};
var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
    return [dx + pos[0] * sx, dy + pos[1] * sy];
};

window.addEventListener('resize', function () {
    width = canvas.width = koef * innerWidth;
    height = canvas.height = koef * innerHeight;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);
});

var traceCount = mobile ? 20 : 50;
var pointsOrigin = [];
var i;
var dr = mobile ? 0.3 : 0.1;
for (i = 0; i < Math.PI * 2; i += dr) 
pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
for (i = 0; i < Math.PI * 2; i += dr) 
pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
for (i = 0; i < Math.PI * 2; i += dr) 
pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
var heartPointsCount = pointsOrigin.length;

var targetPoints = [];
var pulse = function (kx, ky) {
    for (i = 0; i < pointsOrigin.length; i++) {
        targetPoints[i] = [];
        targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
        targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
    }
};

var e = [];
for (i = 0; i < heartPointsCount; i++) {
    var x = rand() * width;
    var y = rand() * height;
    e[i] = {
        vx: 0,
        vy: 0,
        R: 2,
        speed: rand() + 5,
        q: ~~(rand() * heartPointsCount),
        D: 2 * (i % 2) - 1,
        force: 0.2 * rand() + 0.7,
        f: "hsla(0," + ~~(40 * rand() + 60) + "%," + ~~(60 * rand() + 20) + "%,.3)",
        trace: []
    };
    for (var k = 0; k < traceCount; k++) e[i].trace[k] = {x: x, y: y};
}

var config = {
    traceK: 0.4,
    timeDelta: 0.01
};

var time = 0;
var loop = function () {
    var n = -Math.cos(time);
    pulse((1 + n) * .5, (1 + n) * .5);
    time += ((Math.sin(time)) < 0 ? 9 : (n > 0.8) ? .2 : 1) * config.timeDelta;
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, width, height);
    for (i = e.length; i--;) {
        var u = e[i];
        var q = targetPoints[u.q];
        var dx = u.trace[0].x - q[0];
        var dy = u.trace[0].y - q[1];
        var length = Math.sqrt(dx * dx + dy * dy);
        if (10 > length) {
            if (0.95 < rand()) {
                u.q = ~~(rand() * heartPointsCount);
            }
            else {
                if (0.99 < rand()) {
                    u.D *= -1;
                }
                u.q += u.D;
                u.q %= heartPointsCount;
                if (0 > u.q) {
                    u.q += heartPointsCount;
                }
            }
        }
        u.vx += -dx / length * u.speed;
        u.vy += -dy / length * u.speed;
        u.trace[0].x += u.vx;
        u.trace[0].y += u.vy;
        u.vx *= u.force;
        u.vy *= u.force;
        for (k = 0; k < u.trace.length - 1;) {
            var T = u.trace[k];
            var N = u.trace[++k];
            N.x -= config.traceK * (N.x - T.x);
            N.y -= config.traceK * (N.y - T.y);
        }
        ctx.fillStyle = u.f;
        for (k = 0; k < u.trace.length; k++) {
            ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
        }
    }
    //ctx.fillStyle = "rgba(255,255,255,1)";
    //for (i = u.trace.length; i--;) ctx.fillRect(targetPoints[i][0], targetPoints[i][1], 2, 2);

    window.requestAnimationFrame(loop, canvas);
};
loop();
};

var s = document.readyState;
if (s === 'complete' || s === 'loaded' || s === 'interactive') init();
else document.addEventListener('DOMContentLoaded', init, false);