/**
 * Created by alex on 15/03/16.
 */
angular
    .module('pointService')
    .directive('navigationPc', navigationPc);


function navigationPc(){
    return {
        restrict : 'AE',

        templateUrl : '/common/directives/navigationPc/navigationPc.template.html',
        scope : {
            navigationPc : '=content'
        }
    };
}




