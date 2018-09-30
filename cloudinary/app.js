(function () {
    'use strict';

    angular.module('cloudinaryTest', [
        'cloudinary'
    ])
        .config(['cloudinaryProvider', function (cloudinaryProvider) {
            cloudinaryProvider
                .set("cloud_name", "hunk4smqo")
                .set("secure", true)
                .set("upload_preset", "my_preset");
        }]);
    ;
})();