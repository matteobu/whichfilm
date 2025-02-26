const fs = require('fs');

function cleanJsonFile(filePath) {
  try {
    // Read the JSON file synchronously
    const data = fs.readFileSync(filePath, 'utf8');
    let jsonData = JSON.parse(data);

    // Ensure it's an array (handle multiple movies)
    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData]; // Convert to array if it's a single object
    }

    // const cleanedData = jsonData.map((movie) => {
    //   // Delete unwanted properties
    //   delete movie.production_companies;
    //   delete movie.production_countries;

    //   return movie; // Make sure to return the modified object
    // });
    // // Process each movie object
    const cleanedData = jsonData.map((movie) => {
      return {
        ...movie,
        // Convert genres to an array of names
        genres: movie.genres
          ? movie.genres.map((g) => g.name).filter(Boolean)
          : [],
        // Convert spoken_languages to an array of English names
        spoken_languages: movie.spoken_languages
          ? movie.spoken_languages
              .map((lang) => lang.english_name)
              .filter(Boolean)
          : [],
      };
    });

    // Overwrite the JSON file with cleaned data
    fs.writeFileSync(filePath, JSON.stringify(cleanedData, null, 2), 'utf8');

    console.log('JSON file cleaned and saved successfully.');
  } catch (error) {
    console.error('Error processing JSON:', error);
  }
}

// Example usage: replace 'data.json' with your actual file path
cleanJsonFile('./CFF_PALME_DOR_FILMS_WINNERS.json');
