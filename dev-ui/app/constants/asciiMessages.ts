export const ASCII_EMPTY_MESSAGES = [
  `   /\\_/\\  
  ( o.o )   No entries found in database yet!
   > ^ <    Publish an update from the Dashboard.`,

  `  ┌──────────────────────────────┐
  │  > SYSTEM STATUS: ALL_CLEAR  │
  │  > AWAITING COMMUNITY POSTS  │
  └──────────────────────────────┘`,

  `  (╯°□°)╯︵ ┻━┻
  Nothing published here yet!
  Check back soon or submit a new post.`,

  `   (\\__/)
   ( •_•)   It's quiet in here...
   / > ☕   Have a coffee while we wait for posts!`,

  `   _____ _   _ _____  _______     __
  | ____| |_| |  _ \\|_   _\\ \\   / /
  |  _| |  _  | |_) | | |  \\ \\_/ / 
  | |___| | | |  __/  | |   \\   /  
  |_____|_| |_|_|     |_|    |_|   `
]

export function getRandomAsciiMessage (): string {
  const idx = Math.floor(Math.random() * ASCII_EMPTY_MESSAGES.length)
  return ASCII_EMPTY_MESSAGES[idx] || ASCII_EMPTY_MESSAGES[0]
}
