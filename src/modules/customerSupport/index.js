import ChatWidget from './ui/ChatWidget';

export async function initialize() {
  console.log('Customer support module initialized');
  return { success: true };
}

export { ChatWidget };