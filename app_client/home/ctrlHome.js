/**
 * Created by alex on 14/03/16.
 */

function ctrlHome(){
    var vm = this;
    vm.navigationPc = {};
    vm.navigationPc.test = "hello world";
    vm.navigationPc.isConnected = false;
    vm.test = "alex";
}


angular.module('pointService')
    .controller('ctrlHome', ctrlHome);

