AppOca.service("requests", function($http) {

  return {
    getLojas: getLojas
  };
  
  function getLojas(){

    var request = $http({
      method: "GET",
      url: "http://oca-admin.herokuapp.com/clients/index.json"
    });

    return( request.then( handleSuccess, handleError ) );
  };

  function handleSuccess( response ){
    return ( response.data )
  };

  function handleError( response ){
    return ( response.data )
    if (
      ! angular.isObject( response.data ) ||
      ! response.data.message
    ) {
      return( $q.reject( "An unknown error occurred." ) );
    }
      // Otherwise, use expected error message.
      return( $q.reject( response.data.message ) );
  };

});
