module.exports = {
  preset: 'ts-jest',  
  testEnvironment: 'jsdom', 
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',  
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
