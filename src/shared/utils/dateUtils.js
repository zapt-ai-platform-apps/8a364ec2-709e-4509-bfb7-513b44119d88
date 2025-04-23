/**
 * Format a date string or object into a human-readable format
 * @param {string|Date} dateInput - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput) {
  if (!dateInput) return 'N/A';
  
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'Invalid Date';
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleDateString('en-US', options);
}