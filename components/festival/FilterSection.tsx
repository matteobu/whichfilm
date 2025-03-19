'use client';
import { useEffect } from 'react';
import Select from 'react-select';

const FilterSection = ({
  filterKeysOptions,
  filterKeysValues,
  onFilterKeysClick,
}) => {
  // Convert filter keys into an array of options for React Select
  const genreOptions = filterKeysOptions.genres.map((genre) => ({
    label: genre,
    value: genre,
  }));
  const yearOptions = filterKeysOptions.years.map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }));
  const languageOptions = filterKeysOptions.languages.map((language) => ({
    label: language,
    value: language,
  }));
  // Added award options
  const awardOptions = filterKeysOptions.awards.map((award) => ({
    label: award.name,
    value: award.name,
  }));

  const handleMultiSelectChange = (selectedOptions: any, type: string) => {
    onFilterKeysClick(selectedOptions, type);
  };

  return (
    <section className="max-w-7xl mx-auto mt-8">
      <h2 className="text-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-6">
        Filter by awards, genres, years, and languages
      </h2>
      <div className="flex gap-6 mt-4 mb-6">
        <div className="w-1/4">
          <Select
            isMulti
            options={awardOptions}
            value={awardOptions.filter((option) =>
              filterKeysValues.awards.includes(option.value)
            )}
            onChange={(selected) => handleMultiSelectChange(selected, 'awards')}
            className="w-full"
            placeholder="Select Awards"
            styles={customStyles}
          />
        </div>
        <div className="w-1/4">
          <Select
            isMulti
            options={languageOptions}
            value={languageOptions.filter((option) =>
              filterKeysValues.languages.includes(option.value)
            )}
            onChange={(selected) =>
              handleMultiSelectChange(selected, 'languages')
            }
            className="w-full"
            placeholder="Select Languages"
            styles={customStyles}
          />
        </div>
        <div className="w-1/4">
          <Select
            isMulti
            options={genreOptions}
            value={genreOptions.filter((option) =>
              filterKeysValues.genres.includes(option.value)
            )}
            onChange={(selected) =>
              handleMultiSelectChange(selected, 'genres')
            }
            className="w-full"
            placeholder="Select Genres"
            styles={customStyles}
          />
        </div>
        <div className="w-1/4">
          <Select
            isMulti
            options={yearOptions}
            value={yearOptions.filter((option) =>
              filterKeysValues.years.includes(option.value)
            )}
            onChange={(selected) =>
              handleMultiSelectChange(selected, 'years')
            }
            className="w-full"
            placeholder="Select Years"
            styles={customStyles}
          />
        </div>
      </div>
    </section>
  );
};

export default FilterSection;

// Custom styles for react-select components
const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'var(--color-dark-gray-blue)',
    borderColor: 'var(--color-globalGradientMid)',
    borderRadius: '8px',
    color: 'white',
    padding: '4px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--color-globalGradientEnd)',
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--color-globalGradientMid)',
    borderRadius: '4px',
    maxWidth: 'none', // Prevent from expanding width beyond available space
    display: 'inline-block',
    margin: '0 4px', // Adds margin between selected items
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'white',
    whiteSpace: 'nowrap', // Ensures text doesn't wrap
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Adds "..." when the label overflows
    padding: '0 6px', // Padding to give space around the label
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'white',
    ':hover': {
      backgroundColor: 'var(--color-globalGradientEnd)',
      color: 'white',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--color-dark-gray)',
    borderRadius: '8px',
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused
      ? 'var(--color-globalGradientMid)'
      : 'var(--color-dark-gray-blue)',
    color: 'white',
    cursor: 'pointer',
  }),
  valueContainer: (base) => ({
    ...base,
    display: 'flex',
    flexWrap: 'nowrap', // Ensure the selected items stay in a single line
    overflowX: 'auto', // Enables horizontal scrolling when content overflows
    padding: '0', // Reduce any internal padding to minimize expansion
    minHeight: 'auto',
  }),
};
