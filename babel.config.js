const ReactCompilerConfig = {
  target: '17' 
};

module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', ReactCompilerConfig],
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
};