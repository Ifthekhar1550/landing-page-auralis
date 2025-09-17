//hover dropdown
const dropdownBtn = document.getElementById("dropdown-btn") as HTMLButtonElement;
const dropdownMenu = document.getElementById("dropdown-menu") as HTMLDivElement;

let closeTimeout: number | undefined;

dropdownBtn.addEventListener("mouseenter", () => {
    clearTimeout(closeTimeout);
    dropdownMenu.classList.remove("hidden");
});

dropdownBtn.addEventListener("mouseleave", (event) => {
    if (!dropdownMenu.contains(event.relatedTarget as Node)) {
        closeTimeout = window.setTimeout(() => {
            dropdownMenu.classList.add("hidden");
        }, 500);
    }
});

dropdownMenu.addEventListener("mouseleave", () => {
    closeTimeout = window.setTimeout(() => {
        dropdownMenu.classList.add("hidden");
    }, 100);
});

dropdownMenu.addEventListener("mouseenter", () => {
    clearTimeout(closeTimeout);
});

// mobile ham and nav
document.addEventListener('DOMContentLoaded', function(): void {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn') as HTMLButtonElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;
    const menuIcon = document.getElementById('menu-icon') as HTMLElement;
    const mobileDropdownBtn = document.getElementById('mobile-dropdown-btn') as HTMLButtonElement;
    const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu') as HTMLDivElement;
    const mobileDropdownArrow = document.getElementById('mobile-dropdown-arrow') as HTMLElement;

    function toggleMobileMenu(): void {
        const isOpen = !mobileMenu?.classList.contains('-translate-y-full') && !mobileMenu?.classList.contains('opacity-0');
        
        if (isOpen) {
            mobileMenu?.classList.add('-translate-y-full');
            mobileMenu?.classList.add('opacity-0');
            menuIcon?.classList.remove('fa-times');
            menuIcon?.classList.add('fa-bars');
            mobileDropdownMenu?.classList.add('hidden');
            mobileDropdownArrow?.classList.remove('rotate-180');
        } else {
            mobileMenu?.classList.remove('-translate-y-full');
            mobileMenu?.classList.remove('opacity-0');
            menuIcon?.classList.remove('fa-bars');
            menuIcon?.classList.add('fa-times');
        }
    }

    mobileMenuBtn?.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    mobileDropdownBtn?.addEventListener('click', function(e: Event): void {
        e.stopPropagation();
        const isHidden = mobileDropdownMenu?.classList.contains('hidden');
        
        if (isHidden) {
            mobileDropdownMenu?.classList.remove('hidden');
            mobileDropdownArrow?.classList.add('rotate-180');
        } else {
            mobileDropdownMenu?.classList.add('hidden');
            mobileDropdownArrow?.classList.remove('rotate-180');
        }
    });

    document.addEventListener('click', function(e: Event): void {
        const target = e.target as Element;
        const isMenuOpen = !mobileMenu?.classList.contains('-translate-y-full');
        
        if (isMenuOpen && mobileMenu && !mobileMenu.contains(target) && !mobileMenuBtn?.contains(target)) {
            toggleMobileMenu();
        }
        
        if (dropdownBtn && dropdownMenu && !dropdownBtn.contains(target) && !dropdownMenu.contains(target)) {
            clearTimeout(closeTimeout);
            dropdownMenu.classList.add('hidden');
        }
    });

    window.addEventListener('resize', function(): void {
        if (window.innerWidth >= 768) {
            mobileMenu?.classList.add('-translate-y-full');
            menuIcon?.classList.remove('fa-times');
            menuIcon?.classList.add('fa-bars');
            mobileDropdownMenu?.classList.add('hidden');
            mobileDropdownArrow?.classList.remove('rotate-180');
        }
    });

    document.querySelectorAll('#mobile-menu a').forEach((link: Element) => {
        link.addEventListener('click', function(): void {
            toggleMobileMenu();
        });
    });

    mobileMenu?.addEventListener('click', function(e: Event): void {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e: KeyboardEvent): void {
        if (e.key === 'Escape') {
            const isMenuOpen = !mobileMenu?.classList.contains('-translate-y-full');
            if (isMenuOpen) {
                toggleMobileMenu();
            }
            if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
                clearTimeout(closeTimeout);
                dropdownMenu.classList.add('hidden');
            }
        }
    });
});

// use case tsbs
interface TabSystem {
    tabButtons: NodeListOf<Element>;
    tabContents: NodeListOf<Element>;
    init(): void;
    showTab(targetTab: string): void;
}

class ProductTabs implements TabSystem {
    tabButtons: NodeListOf<Element>;
    tabContents: NodeListOf<Element>;

    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init(): void {
        this.tabButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLButtonElement;
                const tabName = target.getAttribute('data-tab');
                if (tabName) {
                    this.showTab(tabName);
                }
            });
        });
    }

    showTab(targetTab: string): void {
        this.tabButtons.forEach((btn) => {
            btn.classList.remove('active-tab');
        });

        this.tabContents.forEach((content) => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });

        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeButton) {
            activeButton.classList.add('active-tab');
        }

        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
            targetContent.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductTabs();
});

// Pricing toggle 
interface PricingPlan {
    monthly: number;
    yearly: number;
}

interface PricingPlans {
    basic: PricingPlan;
    pro: PricingPlan;
    enterprise: PricingPlan;
}

const prices: PricingPlans = {
    basic: { monthly: 26, yearly: 20 },
    pro: { monthly: 38, yearly: 32 },
    enterprise: { monthly: 50, yearly: 45 }
};

const monthlyBtn = document.getElementById('monthlyBtn') as HTMLButtonElement;
const yearlyBtn = document.getElementById('yearlyBtn') as HTMLButtonElement;
const toggleSlider = document.getElementById('toggleSlider') as HTMLDivElement;
const basicPrice = document.getElementById('basicPrice') as HTMLSpanElement;
const proPrice = document.getElementById('proPrice') as HTMLSpanElement;
const enterprisePrice = document.getElementById('enterprisePrice') as HTMLSpanElement;
const billingPeriods = document.querySelectorAll('.billing-period') as NodeListOf<HTMLSpanElement>;

let isYearly: boolean = false;

function initializeSlider(): void {
    const btnRect = monthlyBtn.getBoundingClientRect();
   
    toggleSlider.style.width = `${btnRect.width}px`;
    toggleSlider.style.height = `${btnRect.height}px`;
    toggleSlider.style.left = '4px';
    toggleSlider.style.top = '50%';
    toggleSlider.style.transform = 'translateY(-50%)';
}

function updatePrices(): void {
    if (isYearly) {
        basicPrice.textContent = prices.basic.yearly.toString();
        proPrice.textContent = prices.pro.yearly.toString();
        enterprisePrice.textContent = prices.enterprise.yearly.toString();
        billingPeriods.forEach(period => period.textContent = 'Year');
    } else {
        basicPrice.textContent = prices.basic.monthly.toString();
        proPrice.textContent = prices.pro.monthly.toString();
        enterprisePrice.textContent = prices.enterprise.monthly.toString();
        billingPeriods.forEach(period => period.textContent = 'Month');
    }
}

function togglePricing(yearly: boolean): void {
    isYearly = yearly;
    
    if (yearly) {
        const yearlyRect = yearlyBtn.getBoundingClientRect();
        const containerRect = yearlyBtn.parentElement!.getBoundingClientRect();
        const offset = yearlyRect.left - containerRect.left;
        toggleSlider.style.transform = `translateX(${offset}px) translateY(-50%)`;
        
        monthlyBtn.classList.remove('text-black');
        monthlyBtn.classList.add('text-gray-400');
        yearlyBtn.classList.remove('text-gray-400');
        yearlyBtn.classList.add('text-black');
    } else {
        toggleSlider.style.transform = 'translateX(0) translateY(-50%)';
        
        monthlyBtn.classList.remove('text-gray-400');
        monthlyBtn.classList.add('text-black');
        yearlyBtn.classList.remove('text-black');
        yearlyBtn.classList.add('text-gray-400');
    }
    
    updatePrices();
}

monthlyBtn.addEventListener('click', () => togglePricing(false));
yearlyBtn.addEventListener('click', () => togglePricing(true));

document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
    updatePrices();
});

window.addEventListener('resize', () => {
    initializeSlider();
    togglePricing(isYearly);
});

// Content expansion toggle
const toggleBtn = document.getElementById('toggleBtn') as HTMLButtonElement;
const overlayContainer = document.getElementById('overlayContainer') as HTMLElement;
const shadowOverlay = document.getElementById('shadowOverlay') as HTMLElement;
const hiddenRows = document.querySelectorAll('.hidden-row') as NodeListOf<HTMLElement>;

let isExpanded = false;

toggleBtn.addEventListener('click', () => {
    if (!isExpanded) {
        overlayContainer.style.transform = 'translateY(200px)';
        shadowOverlay.style.opacity = '0';
        
        hiddenRows.forEach((card, index) => {
            setTimeout(() => {
                card.style.maxHeight = '300px';
                card.style.opacity = '1';
            }, index * 100);
        });
        
        toggleBtn.textContent = 'Show Less';
        isExpanded = true;
    } else {
        overlayContainer.style.transform = 'translateY(-50px)';
        
        hiddenRows.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.maxHeight = '0';
            }, index * 50);
        });
        
        setTimeout(() => {
            shadowOverlay.style.opacity = '1';
        }, 300);
        
        toggleBtn.textContent = 'Show More';
        isExpanded = false;
    }
});

// Testimonial card hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.transform = 'translateY(-4px) scale(1.01)';
        (card as HTMLElement).style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
        (card as HTMLElement).style.boxShadow = 'none';
    });
});