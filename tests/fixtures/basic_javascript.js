// Definition of constants
const delay = 2000; // 2 seconds

// Definition of an array
const data = [
  'This is a simple demonstration',
  'of various JavaScript features',
  'supported by Node.js v18',
];

// Definition of a function
function formatData(dataArray) {
  return dataArray.join('\n');
}

// Asynchronous function that simulates an I/O operation
function simulateAsyncOperation(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(formatData(data));
      } else {
        reject(new Error('No data provided'));
      }
    }, delay);
  });
}

// Use of an arrow function, promise and async/await
const processData = async (data, delay) => {
  try {
    // Use of string
    const result = await simulateAsyncOperation(data, delay);

    // Console log
    console.log('Data has been processed successfully:');
    console.log(result);
  } catch (error) {
    // Error handling
    console.error('An error occurred while processing data:');
    console.error(error);
  }
};

// Use of if/else control structure
if (process.argv.includes('--process')) {
  // Invoking the function
  await processData(data, delay);
} else {
  console.log('Run the program with --process argument to process data');
}
