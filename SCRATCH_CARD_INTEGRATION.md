# Scratch Card Widget - Integration Guide

## Overview
The ScratchCardWidget can be integrated with forms to automatically trigger scratching after successful form submission. When `scratch-card-box-is-form` is set to "on", scratching is disabled and the result can be triggered programmatically.

## Setup

### 1. Add Required Data Attributes
```html
<div 
  class="scratch-card-container"
  data-scratch-card-box-is-form="on"
  data-scratch-card-image="your-scratch-image.png"
  data-scratch-items='[{"id":1,"loseOption":"off","couponCode":"SAVE10"},{"id":2,"loseOption":"on"}]'
  data-winning-img-imageimagesrc="win-image.png"
  data-winning-text1-title="Congratulations, you won"
  data-losing-text1-title="Sorry, You didn't win anything"
  <!-- ... more data attributes ... -->
></div>
```

### 2. Form Integration

#### Basic Form Example
```html
<!DOCTYPE html>
<html>
<head>
  <title>Scratch Card Form Integration</title>
</head>
<body>
  <form id="myForm" style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2>Enter Your Details</h2>
    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-weight: bold;">Name:</label>
      <input type="text" id="name" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
    </div>
    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email:</label>
      <input type="email" id="email" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
    </div>
    
    <button type="submit" style="width: 100%; padding: 12px; background: #5F62FF; color: white; border: none; border-radius: 4px; font-size: 16px; font-weight: bold; cursor: pointer;">
      Submit & Scratch
    </button>
  </form>

  <!-- Scratch Card Widget -->
  <div 
    id="scratchCard1"
    class="scratch-card-container"
    data-scratch-card-box-is-form="on"
    data-scratch-card-image="your-scratch-image.png"
    data-scratch-items='[{"id":1,"loseOption":"off","couponCode":"SAVE10"},{"id":2,"loseOption":"on"}]'
    style="max-width: 400px; margin: 50px auto; padding: 20px; background: #f0f9ff; border-radius: 16px; text-align: center;"
  >
    <div class="preview-card" style="position: relative; display: inline-block; width: 400px; height: 300px; margin: 20px auto;">
      <!-- Background content -->
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px; overflow: hidden; z-index: 0;">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f8f9fa; color: #6c757d; font-size: 14px; font-weight: bold;">
          <div style="text-align: center;">
            <div>🎁</div>
            <div>Scratch to reveal</div>
            <div style="font-size: 12px; margin-top: 4px;">Win or Lose</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Result card - hidden by default -->
    <div class="result-card" style="display: none; margin-top: 1rem; justify-content: center; align-items: center; min-height: 400px;"></div>
  </div>

  <script>
    // Handle form submission
    document.getElementById('myForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
      };
      
      // Submit form (replace with your actual submission logic)
      console.log('Form submitted:', formData);
      
      // Simulate form submission success
      setTimeout(() => {
        // Trigger scratch card after successful submission
        if (typeof triggerScratchCard === 'function') {
          triggerScratchCard('scratchCard1');
        }
      }, 500);
    });
  </script>
</body>
</html>
```

## API Reference

### Global Functions

#### `triggerScratchCard(containerId?: string)`
Programmatically triggers the scratch card to reveal the result.

**Parameters:**
- `containerId` (optional): The ID of the specific scratch card container to trigger. If not provided, triggers all scratch cards on the page.

**Example:**
```javascript
// Trigger specific scratch card
triggerScratchCard('scratchCard1');

// Trigger all scratch cards
triggerScratchCard();
```

## Data Attributes

### Container Attributes
- `data-scratch-card-box-is-form`: Set to "on" to enable form mode
- `data-scratch-card-image`: Path to scratch overlay image
- `data-scratch-items`: JSON string of items array

### Winning Screen Attributes
- `data-winning-img-imageimagesrc`: Path to win icon image
- `data-winning-text1-title`: Title text
- `data-winning-text1-fontsize`: Font size
- `data-winning-text1-fontcolor`: Font color
- `data-winning-text1-bg-color`: Background color
- `data-winning-text2-title`: Subtitle text
- `data-winning-text2-fontsize`: Font size
- `data-winning-text2-fontcolor`: Font color
- `data-winning-text2-bg-color`: Background color
- `data-winning-coupon-box-color`: Coupon box color
- `data-winning-coupon-box-fontcolor`: Coupon text color
- `data-winning-coupon-box-fontsize`: Coupon font size

### Losing Screen Attributes
- `data-losing-img-imageimagesrc`: Path to lose icon image
- `data-losing-text1-title`: Title text
- `data-losing-text1-fontsize`: Font size
- `data-losing-text1-fontcolor`: Font color
- `data-losing-text1-bg-color`: Background color

## Items Array Structure
```javascript
[
  {
    "id": 1,
    "title": "Coupon Code",
    "couponCode": "SAVE10",
    "loseOption": "off",  // "on" for lose, "off" for win
    "score": 100
  },
  {
    "id": 2,
    "title": "No Win",
    "couponCode": "",
    "loseOption": "on",   // This is a lose option
    "score": 0
  }
]
```

## Form Integration Best Practices

1. **Validate form before triggering**: Ensure form submission is successful before calling `triggerScratchCard()`

2. **Provide user feedback**: Show loading state while processing form submission

3. **Handle errors**: Implement proper error handling for failed submissions

4. **Track events**: Log the scratch card trigger event for analytics

**Example with error handling:**
```javascript
document.getElementById('myForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  try {
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Submit form
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Success - trigger scratch
      if (typeof triggerScratchCard === 'function') {
        triggerScratchCard('scratchCard1');
      }
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit form. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit & Scratch';
  }
});
```

## Troubleshooting

### Scratch card doesn't trigger
- Ensure `scratch-card-box-is-form` is set to "on"
- Check that the container ID matches
- Verify that `triggerScratchCard` function is available

### Result doesn't show
- Check browser console for errors
- Verify items array is properly formatted
- Ensure all required data attributes are set

### Image not loading
- Verify image paths are correct
- Check CORS settings for external images
- Ensure images are accessible

## Support
For issues or questions, please refer to the main documentation or contact support.

