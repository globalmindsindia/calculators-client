import { useEffect } from 'react';

/**
 * Custom hook to scroll to top when component mounts
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export const useScrollToTop = (smooth: boolean = true) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, [smooth]);
};

/**
 * Function to scroll to top programmatically
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export const scrollToTop = (smooth: boolean = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

/**
 * Function to scroll to a specific element
 * @param elementId - ID of the element to scroll to
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export const scrollToElement = (elementId: string, smooth: boolean = true) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start'
    });
  }
};