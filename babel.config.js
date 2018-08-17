module.exports = function(api) {

  api.cache(false);

  const presets = [
    ['@babel/preset-env', {targets: {node: 'current'}}]
  ];

  return {
    presets
  };
};
