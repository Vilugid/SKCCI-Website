import { useEffect, useRef, useCallback } from 'react';
import { driver, Driver, DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';
import { TabItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const ONBOARDING_STORAGE_KEY = 'skcci_onboarding_tour_completed';

function isElementVisible(selector: string): boolean {
  if (typeof document === 'undefined') return false;
  const el = document.querySelector(selector);
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

export function hasCompletedOnboarding(): boolean {
  try {
    return Boolean(localStorage.getItem(ONBOARDING_STORAGE_KEY));
  } catch {
    return false;
  }
}

export function markOnboardingCompleted(status: 'completed' | 'skipped' = 'completed'): void {
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, status);
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

interface UseOnboardingTourOptions {
  activeTab: TabItem;
  isLoading: boolean;
  onNavigateTab: (tab: TabItem) => void;
}

export function useOnboardingTour({ activeTab, isLoading, onNavigateTab }: UseOnboardingTourOptions) {
  const { isTagalog } = useLanguage();
  const driverRef = useRef<Driver | null>(null);
  const autoStartTriggeredRef = useRef(false);
  const pendingStartTimerRef = useRef<number | null>(null);

  const buildSteps = useCallback((): DriveStep[] => {
    const steps: DriveStep[] = [
      {
        popover: {
          title: isTagalog
            ? 'Maligayang Pagdating sa SKCCI!'
            : 'Welcome to SAVIOR-KING Commission Church',
          description: isTagalog
            ? 'Ang Iyong Simbahan, Ang Iyong Pamilya. Samahan kami sa isang mabilis na gabay upang matuklasan ang mga tampok ng ating portal.'
            : 'Your Church, Your Family. Take a quick walkthrough of our digital home to explore services, Bible plans, events, and prayer resources.',
          align: 'center',
        },
      },
    ];

    if (isElementVisible('#hero-actions')) {
      steps.push({
        element: '#hero-actions',
        popover: {
          title: isTagalog ? 'Planuhin ang Pagbisita o Sumali' : 'Plan Your Visit & Connect',
          description: isTagalog
            ? 'Makikita rito ang iskedyul ng Linggong Pagsamba at mga mabilisang button para planuhin ang pagbisita o sumali sa Cell Group.'
            : 'Find Sunday Worship details and jump straight into planning your first visit or connecting with a local Cell Group.',
          side: 'top',
          align: 'start',
        },
      });
    }

    if (isElementVisible('#desktop-nav-welcome')) {
      steps.push({
        element: '#desktop-nav-welcome',
        popover: {
          title: isTagalog ? 'Welcome Kit at Ebanghelyo' : 'Welcome Kit & Gospel',
          description: isTagalog
            ? 'Buksan ito upang mabasa ang mensahe ng Ebanghelyo at masimulan ang 100-Day Bible Reading Plan.'
            : 'Explore The Gospel message and begin your 100 Days Bible Reading Plan to build daily spiritual momentum.',
          side: 'bottom',
          align: 'center',
        },
      });
    } else if (isElementVisible('#welcome-kit-tiles')) {
      steps.push({
        element: '#welcome-kit-tiles',
        popover: {
          title: isTagalog ? 'Ebanghelyo at 100-Day Bible Plan' : 'The Gospel & 100 Days Bible Plan',
          description: isTagalog
            ? 'Simulan dito ang iyong paglalakbay sa pananampalataya gamit ang Ebanghelyo at pang-araw-araw na pagbabasa ng Bibliya.'
            : 'Start your faith journey here with The Gospel presentation and our interactive 100 Days Bible Plan.',
          side: 'top',
          align: 'center',
        },
      });
    }

    if (isElementVisible('#desktop-nav-grow')) {
      steps.push({
        element: '#desktop-nav-grow',
        popover: {
          title: isTagalog ? 'Lumago sa Pananampalataya' : 'Grow & Discipleship Tools',
          description: isTagalog
            ? 'I-access ang Consolidation Manuals, 365 Bible Guide, Cell Groups, Leader Tools, at Formal Education.'
            : 'Access Consolidation Manuals, the 365-Day Bible Guide, Cell Groups, Leader Tools, and Formal Education.',
          side: 'bottom',
          align: 'center',
        },
      });
    } else if (isElementVisible('#mobile-hamburger-btn')) {
      steps.push({
        element: '#mobile-hamburger-btn',
        popover: {
          title: isTagalog ? 'Menu ng Nabigasyon' : 'Explore All Sections',
          description: isTagalog
            ? 'I-tap ito anumang oras upang buksan ang Welcome Kit, Grow resources, Events, Prayer Hub, at Pagkakaloob.'
            : 'Tap here anytime to navigate to Welcome Kit, Grow resources, Events & RSVPs, Prayer Hub, and Giving.',
          side: 'bottom',
          align: 'end',
        },
      });
    }

    if (isElementVisible('#desktop-nav-events')) {
      steps.push({
        element: '#desktop-nav-events',
        popover: {
          title: isTagalog ? 'Mga Kaganapan at RSVP' : 'Events & RSVPs',
          description: isTagalog
            ? 'Tingnan ang mga paparating na pagtitipon, mag-RSVP para sa mga aktibidad, at balikan ang mga nakaraang pagtitipon.'
            : 'Browse upcoming services and fellowships, reserve your spot with one click, and view past gathering archives.',
          side: 'bottom',
          align: 'center',
        },
      });
    }

    if (isElementVisible('#header-lang-toggle')) {
      steps.push({
        element: '#header-lang-toggle',
        popover: {
          title: isTagalog ? 'Palitan ang Wika (EN / FIL)' : 'Bilingual Toggle (EN / FIL)',
          description: isTagalog
            ? 'Lumipat sa pagitan ng English at Tagalog anumang oras sa isang pindot lang.'
            : 'Switch the website seamlessly between English and Filipino/Tagalog whenever you prefer.',
          side: 'bottom',
          align: 'end',
        },
      });
    }

    if (isElementVisible('#hannah-chat-launcher')) {
      steps.push({
        element: '#hannah-chat-launcher',
        popover: {
          title: isTagalog ? 'Kausapin si Hannah' : 'Meet Hannah, Your Virtual Usher',
          description: isTagalog
            ? 'May tanong tungkol sa iskedyul ng simbahan o Cell Group? Magtanong kay Hannah anumang oras.'
            : 'Have questions about service times, Bible guides, or how to get involved? Chat with Hannah anytime.',
          side: 'right',
          align: 'end',
        },
      });
    }

    if (isElementVisible('#header-take-tour-btn')) {
      steps.push({
        element: '#header-take-tour-btn',
        popover: {
          title: isTagalog ? 'Ulitin ang Tour Anumang Oras' : 'Restart This Tour Anytime',
          description: isTagalog
            ? 'Maaari mong pindutin ang button na ito sa itaas kung nais mong ulitin ang gabay na tour.'
            : 'Need a quick refresher later? Click this Take Tour (?) button in the header anytime to restart.',
          side: 'bottom',
          align: 'end',
        },
      });
    }

    return steps;
  }, [isTagalog]);

  const launchDriver = useCallback(() => {
    if (driverRef.current) {
      driverRef.current.destroy();
      driverRef.current = null;
    }

    const steps = buildSteps();
    if (steps.length === 0) return;

    const driverObj = driver({
      showProgress: true,
      progressText: '{{current}} of {{total}}',
      animate: true,
      smoothScroll: true,
      allowClose: true,
      overlayColor: '#0F2C59',
      overlayOpacity: 0.62,
      stagePadding: 8,
      stageRadius: 12,
      popoverClass: 'skcci-tour-popover',
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
      doneBtnText: 'Done',
      closeBtnLabel: 'Close tour',
      steps,
      onPopoverRender: (popover, opts) => {
        const footerBtns = popover.footerButtons;
        if (!footerBtns) return;

        let skipBtn = footerBtns.querySelector('.skcci-skip-tour-btn') as HTMLButtonElement | null;
        if (!skipBtn) {
          skipBtn = document.createElement('button');
          skipBtn.type = 'button';
          skipBtn.className = 'skcci-skip-tour-btn';
          skipBtn.textContent = 'Skip Tour';
          skipBtn.setAttribute('aria-label', 'Skip Tour');
          skipBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            markOnboardingCompleted('skipped');
            opts.driver.destroy();
          });
          footerBtns.prepend(skipBtn);
        }

        const isLast = opts.driver.isLastStep();
        skipBtn.style.display = isLast ? 'none' : 'inline-flex';
      },
      onDestroyed: (_el, _step, opts) => {
        markOnboardingCompleted(opts.reason === 'done' ? 'completed' : 'skipped');
        driverRef.current = null;
      },
    });

    driverRef.current = driverObj;
    driverObj.drive();
  }, [buildSteps]);

  const startTour = useCallback(() => {
    if (pendingStartTimerRef.current !== null) {
      window.clearTimeout(pendingStartTimerRef.current);
      pendingStartTimerRef.current = null;
    }

    if (activeTab !== 'Home') {
      onNavigateTab('Home');
      pendingStartTimerRef.current = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        launchDriver();
      }, 220);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      pendingStartTimerRef.current = window.setTimeout(() => {
        launchDriver();
      }, 160);
    }
  }, [activeTab, onNavigateTab, launchDriver]);

  // Auto-start once on the user's very first visit
  useEffect(() => {
    if (isLoading || autoStartTriggeredRef.current) return;
    if (hasCompletedOnboarding()) {
      autoStartTriggeredRef.current = true;
      return;
    }

    const timer = window.setTimeout(() => {
      if (autoStartTriggeredRef.current || hasCompletedOnboarding()) return;
      autoStartTriggeredRef.current = true;
      launchDriver();
    }, 650);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isLoading, launchDriver]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pendingStartTimerRef.current !== null) {
        window.clearTimeout(pendingStartTimerRef.current);
      }
      if (driverRef.current) {
        driverRef.current.destroy();
        driverRef.current = null;
      }
    };
  }, []);

  return { startTour };
}
