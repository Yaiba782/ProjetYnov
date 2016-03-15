/**
 * Created by alex on 15/03/16.
 */
angular.module('pointService')
    .directive('headerGeneric', headerGeneric);

function headerGeneric(){
    return {
        restrict : 'AE',
        templateUrl : '/common/directives/headerGeneric/headerGeneric.template.html',
        scope : {
            content : '=content'
        }
    };

}