/**
 * Created by alex on 15/03/16.
 */
angular
    .module('pointService')
    .directive('footerGeneric', footerGeneric);

function footerGeneric(){
    return {
        restrict : 'EA',
        templateUrl : '/common/directives/footerGeneric/footerGeneric.template.html',
        scope : {
            content : '=content'
        }
    };
}