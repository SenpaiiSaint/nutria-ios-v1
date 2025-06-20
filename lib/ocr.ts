// Temporarily disabled due to native module linking issues
// import { loadTensorflowModel } from 'react-native-fast-tflite'

let model: any = null

// Load the model once
export async function initializeOCR() {
  try {
    // Temporarily disabled - return mock success
    console.log('OCR model loading disabled - using mock data')
    model = 'mock'
  } catch (error) {
    console.error('Failed to load OCR model:', error)
  }
}

/**
 * Accepts a local URI (file://) to a captured image,
 * returns array of SKU strings (e.g. ['000111222333'])
 */
export async function runOCR(imageUri: string): Promise<string[]> {
  // Temporarily return mock data
  console.log('OCR processing disabled - returning mock SKUs')
  return ['000111222333', '123456789012', '987654321098'] // fake SKUs
}
