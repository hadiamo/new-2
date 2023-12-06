// HTML elements
const dreamInput = document.getElementById('dreamInput');
const interpretButton = document.getElementById('interpretButton');
const interpretationResult = document.getElementById('interpretationResult');

// Event listener for the interpret button
interpretButton.addEventListener('click', interpretDream);

// Function to handle dream interpretation
async function interpretDream() {
  const dreamText = dreamInput.value.trim();
  if (dreamText === '') {
    alert('Please enter a dream.');
    return;
  }

  // Disable the interpret button while processing
  interpretButton.disabled = true;

  try {
    const interpretation = await generateDreamInterpretation(dreamText);
    displayInterpretation(interpretation.choices[0].text);
  } catch (error) {
    console.log(error);
    alert('Failed to generate dream interpretation.');
  } finally {
    // Enable the interpret button
    interpretButton.disabled = false;
  }
}

// Function to generate dream interpretation using OpenAI API
async function generateDreamInterpretation(dreamText) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({ dreamText })
    });
  
    return await response.json();
  }

// Function to display the interpretation
function displayInterpretation(interpretation) {
  interpretationResult.textContent = interpretation;
}