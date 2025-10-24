// Not in use as of now
app.service('getString', function() {
    this.myCommonFunction = function() {
      // Your common function logic goes here
      console.log('This is a common function.');
      
      // Return a value (for example, a string)
      return 'Hello from common function!';
    };
  });
  app.service('CryptoService', function() {
    var passphrase = "SaPo";

    this.encrypt = function(input) {
        return CryptoJS.AES.encrypt(input, passphrase).toString();
    };

    this.decrypt = function(input) {
        return CryptoJS.AES.decrypt(input, passphrase).toString(CryptoJS.enc.Utf8);
    };
});