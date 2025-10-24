app.filter('prefixPhone', function() //filter are used whild rendering or showing data
{
    return function(input) {
      return input.indexOf("+") == 0 ? "+"+input :  input;
    };
  });


  // <span><i class="feather-map-pin"></i>{{s | split:'@-@':0}}</span>
  app.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        
        return input.split(splitChar)[splitIndex];
    }
  });
    app.filter('stars', function() {
      return function(count) {
         
          return new Array(count);
      }
    });
      app.filter('unstars', function() {
        return function(count) {
            
            return new Array(5-count);;
            }
        });
        app.filter('capitalize', function() {
          return function(input) {
              if (!input) return '';
              return input.replace(/\b\w/g, function(char) {
                  return char.toUpperCase();
              });
          };
      });