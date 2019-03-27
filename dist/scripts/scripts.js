var KetabShow=angular.module("KetabShow",["ngMaterial","mdSteppers","ui.router","ngFileUpload","pascalprecht.translate","unsavedChanges","ngCookies"]);KetabShow.config(function(e,a,t,l,r,n){r.extendPalette("teal",{500:"#607d8b"});r.theme("default").primaryPalette("blue-grey").accentPalette("blue-grey"),l.useStaticFilesLoader({prefix:"/lang/",suffix:".json"}),l.preferredLanguage("fa"),l.useLocalStorage(),l.useCookieStorage(),l.useMissingTranslationHandlerLog(),l.useSanitizeValueStrategy("escape"),a.otherwise("/"),e.state("home",{url:"/",templateUrl:"page/home/home.html",controller:"homeCtrl",data:{pageTitle:"Home"}}).state("abxwizard",{url:"/abxwizard",templateUrl:"page/abxwizard/abxwizard.html",controller:"abxwizardCtrl",data:{pageTitle:"Home"}}).state("abxmultiple",{url:"/abxmultiple",templateUrl:"page/abxmultiple/abxmultiple.html",controller:"abxmultipleCtrl",data:{pageTitle:"Home"}}),t.html5Mode(!0),n.useTranslateService=!1}),KetabShow.run(function(e,a){e.Language=a}),KetabShow.factory("Language",function(e){var a=["fa","ar"];return{isRtl:function(){for(var t=e.proposedLanguage()||e.use(),l=0;l<a.length;l+=1)if(t.indexOf(a[l])>-1)return!0;return!1}}});
var KetabShow = angular.module('KetabShow', [
    'ngMaterial',
    'mdSteppers',
    'ui.router',
    'ngFileUpload',
    'pascalprecht.translate',
    'unsavedChanges',
    'ngCookies'
]);

KetabShow.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, $mdThemingProvider, unsavedWarningsConfigProvider ) {
    var neonRedMap = $mdThemingProvider.extendPalette('teal', {
        '500': '#607d8b',
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue-grey');


    $translateProvider.useStaticFilesLoader({
        prefix: '/lang/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('fa');
    $translateProvider.useLocalStorage();
    $translateProvider.useCookieStorage();
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useSanitizeValueStrategy('escape');


    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'page/home/home.html',
            controller: 'homeCtrl',
            data: {
                pageTitle: 'Home'
            }
        })
        .state('abxwizard', {
            url: '/abxwizard',
            templateUrl: 'page/abxwizard/abxwizard.html',
            controller: 'abxwizardCtrl',
            data: {
                pageTitle: 'Home'
            }
        })
        .state('abxmultiple', {
            url: '/abxmultiple',
            templateUrl: 'page/abxmultiple/abxmultiple.html',
            controller: 'abxmultipleCtrl',
            data: {
                pageTitle: 'Home'
            }
        });

    $locationProvider.html5Mode(true);
    unsavedWarningsConfigProvider.useTranslateService = false;
});

KetabShow.run(function ($rootScope, Language) {
    $rootScope.Language = Language;
});

KetabShow.factory('Language', function ($translate) {
    var rtlLanguages = ['fa' , 'ar'];
    var isRtl = function () {
        var languageKey = $translate.proposedLanguage() || $translate.use();
        for (var i = 0; i < rtlLanguages.length; i += 1) {
            if (languageKey.indexOf(rtlLanguages[i]) > -1)
                return true;
        }
        return false;
    };
    return {
        isRtl: isRtl
    };
});
KetabShow.controller("abxmultipleCtrl",function(e,r,t,n,i,s,a){var l=[];e.errorFlag=!1,e.title=i("abxmultiple Title"),r.changeLanguage=function(e){i.use(e)},r.$watch("files",function(){}),r.$watch("file",function(){null!=this.file&&(this.files=[this.file])}),r.sendToServer=function(){this.files&&this.files.length?r.upload(this.files):alert("error")},r.checkError=function(r){angular.forEach(r,function(r,t){null==r.error_msg||(e.errorFlag=!0)})},r.upload=function(r){if(r&&r.length){uploadUrl="https://ablibrary.net/dc/upload/books";for(var i=0;i<r.length;i++){var s=r[i];if(!s.$error){const i=e=>{const r=new FileReader;return new Promise((t,n)=>{r.onerror=(()=>{r.abort(),n(new DOMException("Problem parsing input file."))}),r.onload=(()=>{t(r.result)}),r.readAsText(e)})};(async s=>{try{var a="",o=!1;const m=await i(s);var u=m.indexOf("< ملف مرفق >");-1!=u&&(start=u+"< ملف مرفق >".length,end=m.indexOf("< / ملف مرفق >"),-1!=end&&(a=m.substring(start,end).trim()).length>0&&(o=!0));for(var f=null,c=!1,p=0;p<l.length;p++)if(l[p].name.toLowerCase()==a.toLowerCase()){c=!0,f=l[p];break}var d="";if((s.size/Math.pow(2,20)>20||c&&f.size/Math.pow(2,20)>80)&&(d="exceeding file size limit"),o&&!c&&(d="can't find PDF file"),(-1==m.indexOf("< هوية الكتاب >")||-1==m.indexOf("< / هوية الكتاب >")||-1==m.indexOf("< الكتاب >")||-1==m.indexOf("< / الكتاب >"))&&(d="doesn't match ABX format"),d.length>0)console.log(d),r.find(function(e){return e.name==s.name}).error_msg=d,e.errorFlag=!0;else t.upload({url:"https://ablibrary.net/dc/upload/books",data:{abx_file:s,pdf_file:f,sender_name:this.user.name,sender_email:this.user.email,sender_phone:this.user.telephone}}).then(function(t){n(function(){console.log("ok");var n=r.find(function(e){return e.name==t.config.data.abx_file.name});n.Response=t.data,n.color="green",e.errorFlag=!0})},function(t){console.log(t),n(function(){console.log("error");var n=r.find(function(e){return e.name==t.config.data.abx_file.name});switch(t.status){case 422:n.error_msg=t.data;break;case 500:n.error_msg="internal server error";break;case-1:n.error_msg="ablibrary server error"}n.status=t.status,n.color="red",e.errorFlag=!0})},function(e){r.find(function(r){return r.name==e.config.data.abx_file.name}).progress=parseInt(100*e.loaded/e.total)})}catch(t){r.find(function(e){return e.name==s.name}).error_msg=t.message,console.log(t.message),e.errorFlag=!0}})(s)}}}},r.$mdStepper=s,r.$timeout=n,r.isVertical=!0,r.isLinear=!0,r.isAlternative=!0,r.isMobileStepText=!0,r.campaign=!1,this.user={},r.fileSelect=function(){var t=r.$mdStepper("steppersMulti");if(this.files&&this.files.length){abx_files=[],l=[];for(var n=0;n<this.files.length;n++){var i=this.files[n];if(!i.$error){if(len=i.name.length,len<4)continue;idx=len-4,".abx"==i.name.substring(idx,len)&&abx_files.push(i),".pdf"==i.name.substring(idx,len)&&l.push(i)}}this.files=abx_files,e.files=abx_files,t.next()}else t.error(a("translate")("File selection is required"))},r.info=function(){var t=r.$mdStepper("steppersMulti");null!=this.user?null!=this.user.name?null!=this.user.rules?(e.user=this.user,t.next()):t.error(a("translate")("ruleslabel")+a("translate")("is required")):t.error(a("translate")("Name of person / organization")+a("translate")("is required")):t.error(a("translate")("All fields is required"))},r.previousStep=function(){r.$mdStepper("steppersMulti").back()},r.cancel=function(){r.$mdStepper("steppersMulti").back()},r.nextStep=function(){r.$mdStepper("steppersMulti").next()},r.showError=function(){r.$mdStepper("steppersMulti").error("Wrong campaign")},r.clearError=function(){r.$mdStepper("steppersMulti").clearError()},r.showFeedback=function(){r.$mdStepper("steppersMulti").showFeedback("Step 1 looks great! Step 2 is comming up.")},r.clearFeedback=function(){r.$mdStepper("steppersMulti").clearFeedback()}});
KetabShow.controller('abxmultipleCtrl', function ($rootScope, $scope, Upload, $timeout, $translate, $mdStepper, $filter) {

    var pdf_files = [];
    const attachment_start_tag = "< ملف مرفق >";
    const attachment_end_tag = "< / ملف مرفق >";
    const header_start_tag = "< هوية الكتاب >";
    const header_end_tag = "< / هوية الكتاب >";
    const body_start_tag = "< الكتاب >";
    const body_end_tag = "< / الكتاب >";
    $rootScope.errorFlag = false;

    $rootScope.title = $translate('abxmultiple Title');

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };

    $scope.$watch('files', function () {
        // $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if (this.file != null) {
            this.files = [this.file];
        }
    });

    $scope.sendToServer = function () {

        if (this.files && this.files.length)
            $scope.upload(this.files);
        else
            alert("error");
    }

    $scope.checkError = function (files) {
        angular.forEach(files, function (file, key) {
            if (file.error_msg != undefined) {
                $rootScope.errorFlag = true;
                return;
            }
        });
    }

    $scope.upload = function (files) {
        if (files && files.length) {
            uploadUrl = 'https://ablibrary.net/dc/upload/books';
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    const readUploadedFileAsText = (inputFile) => {
                        const temporaryFileReader = new FileReader();

                        return new Promise((resolve, reject) => {
                            temporaryFileReader.onerror = () => {
                                temporaryFileReader.abort();
                                reject(new DOMException("Problem parsing input file."));
                            };

                            temporaryFileReader.onload = () => {
                                resolve(temporaryFileReader.result);
                            };
                            temporaryFileReader.readAsText(inputFile);
                        });
                    };

                    const handleUpload = async (file) => {
                        try {
                            var pdf_file_name = "";
                            var has_attachment = false;
                            const text = await readUploadedFileAsText(file);
                            var idx = text.indexOf(attachment_start_tag);
                            if (idx != -1) {
                                start = idx + attachment_start_tag.length;
                                end = text.indexOf(attachment_end_tag)
                                if (end != -1) {
                                    pdf_file_name = text.substring(start, end).trim();
                                    if (pdf_file_name.length > 0){
                                        has_attachment = true;
                                    }
                                }
                            }
                            var pdf_file = null;
                            var found_attachment = false;
                            for (var j = 0; j < pdf_files.length; j++) {
                                if (pdf_files[j].name.toLowerCase() == pdf_file_name.toLowerCase()) {
                                    found_attachment = true;
                                    pdf_file = pdf_files[j];
                                    break;
                                }
                            }

                            var error_msg = "";
                            if (file.size / Math.pow(2,20) > 20 || (found_attachment && pdf_file.size / Math.pow(2,20) > 80)) {
                                error_msg = 'exceeding file size limit';  
                            }
                            if (has_attachment && !found_attachment) {
                                error_msg = "can't find PDF file";
                            }

                            //FIXME: check the existence of tags using regex in order to ignore extra spaces before and after tag names                             
                            var missing_tag = text.indexOf(header_start_tag) == -1 ||
                                text.indexOf(header_end_tag) == -1 ||
                                text.indexOf(body_start_tag) == -1 ||
                                text.indexOf(body_end_tag) == -1;
                            if (missing_tag) {
                                error_msg = "doesn't match ABX format";
                            }

                            if (error_msg.length > 0) {
                                console.log(error_msg);
                                var found = files.find(function (element) {
                                    return (element.name == file.name)
                                });                                
                                found.error_msg = error_msg;       
                                $rootScope.errorFlag = true;                                     
                                // TODO: Add error_msg to error list and change style of the corresponding file upload element 
                            } else {
                                /*
                                Possible responses from POST request to 'https://ablibrary.net/dc/upload/books':
                                    200: If the uploaded book is accepted and added, returns http status 200
                                    422: If the request is valid, but the book is not added, returns status 422 and the error message in response body
                                        (This error message could be either "existing_book", “invalid_abx” or “invalid_attachment”)
                                    413: Exceeding file size limit
                                    400: 
                                    500:
                                */
                                Upload.upload({
                                        url: 'https://ablibrary.net/dc/upload/books',
                                        data: {
                                            'abx_file': file,
                                            'pdf_file': pdf_file,
                                            'sender_name': this.user.name,
                                            'sender_email': this.user.email,
                                            'sender_phone': this.user.telephone
                                        }
                                    })
                                    .then(function (resp) {
                                        $timeout(function () {
                                            console.log('ok');
                                            var found = files.find(function (element) {
                                                return (element.name == resp.config.data.abx_file.name)
                                            });
                                            found.Response = resp.data
                                            found.color = 'green';
                                            $rootScope.errorFlag = true;
                                        });
                                        
                                    }, function (resp) {
                                        console.log(resp)
                                        $timeout(function () {
                                            console.log('error');
                                            var found = files.find(function (element) {
                                                return (element.name == resp.config.data.abx_file.name)
                                            });
                                            switch(resp.status){
                                                case 422:
                                                    found.error_msg = resp.data;
                                                    break;
                                                case 500:
                                                    found.error_msg = 'internal server error';
                                                    break;
                                                case -1:
                                                    found.error_msg = 'ablibrary server error';
                                            }
                                            found.status = resp.status;
                                            found.color = 'red';
                                            $rootScope.errorFlag = true;
                                        });
                                    }, function (evt) {
                                        var found = files.find(function (element) {
                                            return (element.name == evt.config.data.abx_file.name)
                                        });
                                        found.progress = parseInt(100.0 * evt.loaded / evt.total);

                                    });
                            }
                        } catch (e) {
                            var found = files.find(function (element) {
                                return (element.name == file.name)
                            });
                            found.error_msg = e.message;
                            console.log(e.message);
                            $rootScope.errorFlag = true;
                        }
                    }
                    handleUpload(file);
                }
            }
        }
    };

    $scope.$mdStepper = $mdStepper;
    $scope.$timeout = $timeout;
    $scope.isVertical = true;
    $scope.isLinear = true;
    $scope.isAlternative = true;
    $scope.isMobileStepText = true;
    $scope.campaign = false;
    this.user = {};

    $scope.fileSelect = function () {
        var steppers = $scope.$mdStepper('steppersMulti');

        if (this.files && this.files.length) {
            abx_files = [];
            pdf_files = [];
            for (var i = 0; i < this.files.length; i++) {
                var file = this.files[i];
                if (!file.$error) {
                    len = file.name.length;
                    if (len < 4) {
                        continue;
                    }
                    idx = len - 4;
                    if (file.name.substring(idx, len) == '.abx') {
                        abx_files.push(file);
                    }
                    if (file.name.substring(idx, len) == '.pdf') {
                        pdf_files.push(file);
                    }
                }
            }
            this.files = abx_files;
            $rootScope.files = abx_files;
            steppers.next();
        } else
            steppers.error($filter('translate')('File selection is required'));
    };

    $scope.info = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        if (this.user == undefined) {
            steppers.error($filter('translate')('All fields is required'));
            return;
        }
        if (this.user.name == undefined) {
            steppers.error($filter('translate')('Name of person / organization') + $filter('translate')('is required'));
            return;
        }
        // if (this.user.email == undefined) {
        //     steppers.error($filter('translate')('Email') + $filter('translate')('is required'));
        //     return;
        // }
        // if (this.user.telphone == undefined) {
        //     steppers.error($filter('translate')('Telphone') + $filter('translate')('is required'));
        //     return;
        // }

        if (this.user.rules == undefined) {
            steppers.error($filter('translate')('ruleslabel') + $filter('translate')('is required'));
            return;
        }

        $rootScope.user = this.user;
        steppers.next();
    };

    $scope.previousStep = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        steppers.back();
    };
    $scope.cancel = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        steppers.back();
    };
    $scope.nextStep = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        steppers.next();
    };

    $scope.showError = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        steppers.error('Wrong campaign');
    };
    $scope.clearError = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        steppers.clearError();
    };
    $scope.showFeedback = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        steppers.showFeedback('Step 1 looks great! Step 2 is comming up.');
    };
    $scope.clearFeedback = function () {
        var steppers = $scope.$mdStepper('steppersMulti');
        steppers.clearFeedback();
    };
});
KetabShow.controller("abxwizardCtrl",function(t,e,o,n,r,i,s,a){t.title=r("abxwizard Title"),e.$mdStepper=o,e.$timeout=n,e.isVertical=!0,e.isLinear=!0,e.isAlternative=!0,e.isMobileStepText=!0,e.campaign=!1,e.book={},e.chips1=["Insert page number","Paragraph of the original text"],e.step1=function(){var o=e.$mdStepper("steppers");this.files1&&this.files1.length&&(this.files1[0].color="green",this.files1[0].progress=100,t.files1=this.files1),this.files2&&this.files2.length&&(this.files2[0].color="green",this.files2[0].progress=100,t.files2=this.files2),o.next()},e.step2=function(){var o=e.$mdStepper("steppers");t.book=this.book,o.next()},e.step3=function(){var o=e.$mdStepper("steppers");t.book=this.book,o.next()},e.step4=function(){var o=e.$mdStepper("steppers");t.book=this.book,o.next(),e.getWeather()},e.getWeather=function(){if(t.files2||t.files1){const o="http://116.203.63.14/api/convert/",n=new Headers({"Content-Type":"application/json"});let r={book_info:{author:"string",death_date:"string",has_text:!0,isbn:"string",language:"string",manuscript:!0,name:"string",note:"string",page_match:!0,press:"string",print:"string",publication_date:"string",publisher:"string",research:"string",tags:"string",volume:"string"},include_toc_in_text:!0,pagination:{method:"string",number_of_words_per_page:0,offset:0,separator_token:"string",token_after_page_number:"string",token_before_page_number:"string"},pdf_file_name:"string",sections:{description_end_tag:"string",description_start_tag:"string",footnote_end_tag:"string",footnote_start_tag:"string",toc_end_tag:"string",toc_start_tag:"string"}};a.post(o,r,n).then(function(o){if(t.files2)for(var n=0;n<t.files2.length;n++){(r=t.files2[n]).$error||i.upload({url:"http://116.203.63.14/api/convert/"+o.data.token,headers:{"Content-Type":"text/plain",accept:"application/json"},data:{input_file:r}}).then(function(t){null==e.book.text&&(e.book.text=""),e.book.text+=t.data.abx_book}).catch(function(t){null==e.book.text&&(e.book.text=""),e.book.text+="Error In http://116.203.63.14/api/convert/"+o.data.token})}if(t.files1)for(n=0;n<t.files1.length;n++){var r;(r=t.files1[n]).$error||i.upload({url:"http://116.203.63.14/api/convert/"+o.data.token,headers:{"Content-Type":"text/plain",accept:"application/json"},data:{input_file:r}}).then(function(t){null==e.book.text&&(e.book.text=""),e.book.text+=t.data.abx_book}).catch(function(t){null==e.book.text&&(e.book.text=""),e.book.text+="Error In http://116.203.63.14/api/convert/"+o.data.token})}}).catch(function(t){e.book.text+="Error In http://116.203.63.14/api/convert/"})}else e.book.text="No File"},e.step5=function(){var o=e.$mdStepper("steppers");t.book=this.book,o.next()},e.step6=function(){var o=e.$mdStepper("steppers");t.book=this.book,o.next()},e.previousStep=function(){e.$mdStepper("steppers").back()},e.cancel=function(){e.$mdStepper("steppers").back()},e.nextStep=function(){e.$mdStepper("steppers").next()},e.showError=function(){e.$mdStepper("steppers").error("Wrong campaign")},e.clearError=function(){e.$mdStepper("steppers").clearError()},e.showFeedback=function(){e.$mdStepper("steppers").showFeedback("Step 1 looks great! Step 2 is comming up.")},e.clearFeedback=function(){e.$mdStepper("steppers").clearFeedback()},e.changeGroup1=function(){switch(e.book.group1){case 1:e.book.SeparatorSign="",e.book.WordCount="",e.book.StartingCounter="";break;case 2:e.book.Before="",e.book.Later="",e.book.WordCount="",e.book.StartingCounter="";break;case 3:e.book.Before="",e.book.Later="",e.book.SeparatorSign=""}},e.addToChips1=function(t){0==e.chips1.some(e=>e==t)&&e.chips1.push(t)}});
KetabShow.controller('abxwizardCtrl', function ($rootScope, $scope, $mdStepper, $timeout, $translate, Upload, $filter,$http) {

    $rootScope.title = $translate('abxwizard Title');

    $scope.$mdStepper = $mdStepper;
    $scope.$timeout = $timeout;
    $scope.isVertical = true;
    $scope.isLinear = true;
    $scope.isAlternative = true;
    $scope.isMobileStepText = true;
    $scope.campaign = false;
    $scope.book = {};
    $scope.chips1 = ['Insert page number', 'Paragraph of the original text'];


    $scope.step1 = function () {
        var steppers = $scope.$mdStepper('steppers');

        // steppers.showFeedback($filter('translate')('Uploading...'));

        // $scope.$timeout(function () {
        // steppers.showFeedback('');

        if (this.files1 && this.files1.length) {

            this.files1[0].color = 'green';
            this.files1[0].progress = 100;

            $rootScope.files1 = this.files1;
        }

        if (this.files2 && this.files2.length) {

            this.files2[0].color = 'green';
            this.files2[0].progress = 100;

            $rootScope.files2 = this.files2;
        }

        // }, 3000);



        steppers.next();

        // if (this.files1 && this.files1) {
        //     // for (var i = 0; i < this.files1; i++) {
        //         var file = this.files1[0];
        //         if (!file.$error) {
        //             Upload.upload({
        //                 url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        //                 data: {
        //                     file: file,
        //                     'username': $scope.username
        //                 }
        //             }).then(function (resp) {
        //                 $timeout(function () {
        //                     // var found = this.files1.find(function (element) {
        //                     //     return (element.name == resp.config.data.file.name)
        //                     // });
        //                     this.files1[0].Response = resp.data
        //                     this.files1[0].color = 'green';

        //                     ////////////

        //                     if (this.files2 && this.files2) {
        //                         // for (var i = 0; i < this.files2; i++) {
        //                             var file = this.files2[0];
        //                             if (!file.$error) {
        //                                 Upload.upload({
        //                                     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        //                                     data: {
        //                                         file: file,
        //                                         'username': $scope.username
        //                                     }
        //                                 }).then(function (resp) {
        //                                     $timeout(function () {
        //                                         // var found = this.files2.find(function (element) {
        //                                         //     return (element.name == resp.config.data.file.name)
        //                                         // });
        //                                         this.files2[0].Response = resp.data
        //                                         this.files2[0].color = 'green';

        //                                         steppers.next();
        //                                     });
        //                                 }, function (resp) {
        //                                     var steppers = $scope.$mdStepper('steppers');
        //                                     $timeout(function () {
        //                                         // var found = this.files2.find(function (element) {
        //                                         //     return (element.name == resp.config.data.file.name)
        //                                         // });
        //                                         this.files2[0].status = resp.status;
        //                                         this.files2[0].color = 'red';

        //                                         steppers.error(resp.status);
        //                                     });
        //                                 }, function (evt) {
        //                                     // var found = this.files2.find(function (element) {
        //                                     //     return (element.name == evt.config.data.file.name)
        //                                     // });

        //                                     this.files2[0].progress = parseInt(100.0 * evt.loaded / evt.total)
        //                                 });
        //                             }
        //                         // }
        //                     } else {
        //                         steppers.next();
        //                     }

        //                     ////////////


        //                 });
        //             }, function (resp) {
        //                 var steppers = $scope.$mdStepper('steppers');
        //                 $timeout(function () {
        //                     // var found = this.files1.find(function (element) {
        //                     //     return (element.name == resp.config.data.file.name)
        //                     // });
        //                     this.files1[0].status = resp.status;
        //                     this.files1[0].color = 'red';

        //                     steppers.error(resp.status);
        //                 });
        //             }, function (evt) {
        //                 // var found = this.files1.find(function (element) {
        //                 //     return (element.name == evt.config.data.file.name)
        //                 // });

        //                 this.files1[0].progress = parseInt(100.0 * evt.loaded / evt.total)
        //             });
        //         }
        //     // }
        // }




        // else{
        //     steppers.error($filter('translate')('File selection is required'));
        // }
    };

    $scope.step2 = function () {
        var steppers = $scope.$mdStepper('steppers');

        $rootScope.book = this.book;

        steppers.next();
    }

    $scope.step3 = function () {
        var steppers = $scope.$mdStepper('steppers');

        $rootScope.book = this.book;

        steppers.next();
    }

    $scope.step4 = function () {
        
        var steppers = $scope.$mdStepper('steppers');

        $rootScope.book = this.book;

        steppers.next();
        $scope.getWeather();
    }
    $scope.getWeather = function () {
        
        if(!$rootScope.files2 && !$rootScope.files1)
        {
            $scope.book.text = 'No File';
        }
        else
        {
        const endpoint = 'http://116.203.63.14/api/convert/';
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        let body = {
            "book_info": {
                "author": "string",
                "death_date": "string",
                "has_text": true,
                "isbn": "string",
                "language": "string",
                "manuscript": true,
                "name": "string",
                "note": "string",
                "page_match": true,
                "press": "string",
                "print": "string",
                "publication_date": "string",
                "publisher": "string",
                "research": "string",
                "tags": "string",
                "volume": "string"
            },
            "include_toc_in_text": true,
            "pagination": {
                "method": "string",
                "number_of_words_per_page": 0,
                "offset": 0,
                "separator_token": "string",
                "token_after_page_number": "string",
                "token_before_page_number": "string"
            },
            "pdf_file_name": "string",
            "sections": {
                "description_end_tag": "string",
                "description_start_tag": "string",
                "footnote_end_tag": "string",
                "footnote_start_tag": "string",
                "toc_end_tag": "string",
                "toc_start_tag": "string"
            }
        };
        $http.post(endpoint,body,headers)//, {search: searchParams})
            .then(function(result) {
                
                if ($rootScope.files2) {
                    for (var i = 0; i < $rootScope.files2.length; i++) {
                        var file = $rootScope.files2[i];
                        if (!file.$error) {
                             Upload.upload({
                             url: 'http://116.203.63.14/api/convert/'+result.data.token,
                             headers: 
                             { 
                               'Content-Type': 'text/plain',
                                accept: 'application/json' 
                             },
                             data: {
                                 'input_file': file
                                   }
                            }).then(function (resp) {
                             
                             if($scope.book.text == undefined) $scope.book.text='';
                             $scope.book.text += resp.data.abx_book;
                             }).catch(function(fallback) {
                             if($scope.book.text == undefined) $scope.book.text='';
                             $scope.book.text += 'Error In http://116.203.63.14/api/convert/'+result.data.token;
                            });
                        }    
                    }                       
                }
                if($rootScope.files1)
                {
                    for (var i = 0; i < $rootScope.files1.length; i++) {
                        var file = $rootScope.files1[i];
                        if (!file.$error) {
                             Upload.upload({
                             url: 'http://116.203.63.14/api/convert/'+result.data.token,
                             headers: 
                             { 
                               'Content-Type': 'text/plain',
                                accept: 'application/json' 
                             },
                             data: {
                                 'input_file': file
                                   }
                            }).then(function (resp) {
                             
                             if($scope.book.text == undefined) $scope.book.text='';
                             $scope.book.text += resp.data.abx_book;
                             }).catch(function(fallback) {
                             if($scope.book.text == undefined) $scope.book.text='';
                             $scope.book.text += 'Error In http://116.203.63.14/api/convert/'+result.data.token;
                            });
                        }    
                    }                       
                }
              }).catch(function(fallback) {
                $scope.book.text += 'Error In http://116.203.63.14/api/convert/';
             });
        }
    };
    $scope.step5 = function () {
        var steppers = $scope.$mdStepper('steppers');

        $rootScope.book = this.book;

        steppers.next();
    }

    $scope.step6 = function () {
        var steppers = $scope.$mdStepper('steppers');

        $rootScope.book = this.book;

        steppers.next();
    }
    $scope.previousStep = function () {
        var steppers = $scope.$mdStepper('steppers');
        steppers.back();
    };
    $scope.cancel = function () {
        var steppers = $scope.$mdStepper('steppers');
        steppers.back();
    };
    $scope.nextStep = function () {
        var steppers = $scope.$mdStepper('steppers');
        steppers.next();
    };
    $scope.showError = function () {
        var steppers = $scope.$mdStepper('steppers');
        steppers.error('Wrong campaign');
    };
    $scope.clearError = function () {
        var steppers = $scope.$mdStepper('steppers');
        steppers.clearError();
    };
    $scope.showFeedback = function () {
        var steppers = $scope.$mdStepper('steppers');
        steppers.showFeedback('Step 1 looks great! Step 2 is comming up.');
    };
    $scope.clearFeedback = function () {
        var steppers = $scope.$mdStepper('steppers');
        steppers.clearFeedback();
    };
    $scope.changeGroup1 = function (){
    
       switch($scope.book.group1)
        {
           case 1:
           {
                 $scope.book.SeparatorSign = '';
                 $scope.book.WordCount='';
                 $scope.book.StartingCounter='';
                 break;
            }
            case 2:
            {
            $scope.book.Before = '';
            $scope.book.Later = '';
            $scope.book.WordCount='';
            $scope.book.StartingCounter='';            
            break;
            }
            case 3:
            {
            $scope.book.Before = '';
            $scope.book.Later = '';
            $scope.book.SeparatorSign = '';            
            break;
           }
        }
   };
    $scope.addToChips1 = function (str){
        
        if($scope.chips1.some(a=> a == str) == false)
        {
            $scope.chips1.push(str);
        }
    };

});
KetabShow.controller("headerCtrl",function(e,t,g,n){switch(e.getCurrentLanguage=function(){return g.use()},e.changeLanguage=function(e){g.use(e)},e.gotoState=function(e){t.go(e)},g.proposedLanguage()||g.use()){case"fa":e.toggleRight=a("right");break;case"en":e.toggleRight=a("left");break;case"ar":e.toggleRight=a("right")}function a(e){return function(){n(e).toggle().then(function(){})}}e.isOpenRight=function(){var t=g.proposedLanguage()||g.use();switch(t){case"fa":e.toggleRight=a("right");break;case"en":e.toggleRight=a("left");break;case"ar":e.toggleRight=a("right")}switch(t){case"fa":return n("right").isOpen();case"en":return n("left").isOpen();case"ar":return n("right").isOpen()}}});
KetabShow.controller('headerCtrl', function ($scope, $state, $translate, $mdSidenav) {

    $scope.getCurrentLanguage = function () {

        return $translate.use();
    };

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    $scope.gotoState = function (x) {
        $state.go(x);
    };

    var currentLang = $translate.proposedLanguage() || $translate.use();

    switch (currentLang) {
        case 'fa':
            {
                $scope.toggleRight = buildToggler('right');
                break;
            }
        case 'en':
            {
                $scope.toggleRight = buildToggler('left');
                break;
            }
        case 'ar':
            {
                $scope.toggleRight = buildToggler('right');
                break;
            }
        default:
            break;
    }

    $scope.isOpenRight = function () {

        var currentLang = $translate.proposedLanguage() || $translate.use();

        switch (currentLang) {
            case 'fa':
                {
                    $scope.toggleRight = buildToggler('right');
                    break;
                }
            case 'en':
                {
                    $scope.toggleRight = buildToggler('left');
                    break;
                }
            case 'ar':
                {
                    $scope.toggleRight = buildToggler('right');
                    break;
                }
            default:
                break;
        }

        switch (currentLang) {
            case 'fa':
                {
                    return $mdSidenav('right').isOpen();
                    break;
                }
            case 'en':
                {
                    return $mdSidenav('left').isOpen();
                }
            case 'ar':
                {
                    return $mdSidenav('right').isOpen();
                }
            default:
                break;
        }

    };

    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                });
        };
    }


});

KetabShow.controller("homeCtrl",function(t,e,o,n){t.title=n("home Title"),e.changeLanguage=function(t){n.use(t)},this.gotoState=function(t){o.go(t)}});
KetabShow.controller('homeCtrl', function ($rootScope, $scope, $state, $translate) {

    $rootScope.title = $translate('home Title');

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    this.gotoState = function (x) {
        $state.go(x);
    };

    
});
