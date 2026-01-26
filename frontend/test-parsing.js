// Test parsing function
function parseInput(inputStr) {
  const parts = inputStr.split(',').map(p => p.trim())
  
  // Try to detect which part is date and which is location
  let date = ''
  let location = ''
  
  for (const part of parts) {
    // Check if part looks like a date (contains digits and dots/dashes)
    if (/\d{1,2}[.\-/]\d{1,2}[.\-/]\d{4}/.test(part)) {
      // Convert to YYYY-MM-DD format
      const dateMatch = part.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/)
      if (dateMatch) {
        const [, day, month, year] = dateMatch
        date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    } else if (part && !date) {
      // If no date found yet and this part doesn't look like a date, it's probably location
      location = part
    } else if (part && !location) {
      // If we have date but no location, this is location
      location = part
    }
  }
  
  // Fallback: if we couldn't parse properly, assume first is location, second is date
  if (!date && !location && parts.length >= 2) {
    location = parts[0]
    const dateStr = parts[1]
    const dateMatch = dateStr.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/)
    if (dateMatch) {
      const [, day, month, year] = dateMatch
      date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
  
  console.log('🔍 Parsed input:', { original: inputStr, date, location })
  
  return {
    date: date || '1991-08-24', // fallback date
    location: location || 'Unknown Location'
  }
}

// Test cases
console.log('Testing parsing function:')
console.log('1. "Kyiv, 24.08.1991":', parseInput('Kyiv, 24.08.1991'))
console.log('2. "24.08.1991, Kyiv":', parseInput('24.08.1991, Kyiv'))
console.log('3. "London, 15-03-1985":', parseInput('London, 15-03-1985'))
console.log('4. "01/01/2000, Paris":', parseInput('01/01/2000, Paris'))