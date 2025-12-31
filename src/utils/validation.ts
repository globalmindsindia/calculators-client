export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.length <= 3) return 'Name must be greater than 3 characters';
  if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return 'Phone number is required';

  // Remove +91 prefix if present for validation
  let cleanPhone = phone.replace(/^\+91/, '');

  // Check if only numbers
  if (!/^\d+$/.test(cleanPhone)) return 'Phone number can only contain digits';

  // Check length (should be 10 digits after removing +91)
  if (cleanPhone.length !== 10) return 'Phone number must be 10 digits';

  // Check starting digit
  if (!/^[6789]/.test(cleanPhone)) return 'Phone number must start with 6, 7, 8, or 9';

  // Check for no digit repeating 5 or more times
  for (let i = 0; i <= 9; i++) {
    const digit = i.toString();
    if ((cleanPhone.match(new RegExp(digit, 'g')) || []).length >= 5) {
      return `Digit ${digit} cannot repeat 5 or more times`;
    }
  }

  return null;
};

export const formatPhoneNumber = (phone: string): string => {
  // Ensure +91 prefix
  if (!phone.startsWith('+91')) {
    return '+91' + phone.replace(/^\+91/, '');
  }
  return phone;
};
