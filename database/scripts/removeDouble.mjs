import fs from 'fs'; // Importing the fs module to read and write files
import CFF_ALL from './jsonFiles/00_vff_merged.json' assert { type: 'json' }; // Importing the JSON file

// Remove duplicate objects based on the `id` field
const uniqueData = Array.from(
  new Map(CFF_ALL.map((item) => [item.id, item])).values()
);

// Convert the filtered data to a JSON string
const uniqueDataJson = JSON.stringify(uniqueData, null, 2);

// Write the filtered data to a new JSON file
fs.writeFile('./jsonFiles/00_vff_merged_unique.json', uniqueDataJson, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File has been written successfully!');
  }
});
