(function(context){
    context.Pagination = function Pagination(config){
        this.config = config;
        
        this.checkParameter('baseUrl')
            .checkParameter('totalPages')
            .checkParameter('currentPageNo');

        config.pageSize = config.pageSize || 10;

        this.pages = [];
    };

    Pagination.prototype = {
        constructor: Pagination,

        checkParameter: function(parameter){
            if(!this.config[parameter]){
                throw new Error(this.constructor.toString() + ' need ' + parameter + ' parameter!');
            }
            return this;
        },

        renderFirstAndPrevPage: function(){
            var pages = this.pages, config = this.config;

            if(config.currentPageNo > 1){
                pages.push(template('<li><a href="{{url}}" rel="first">First</a></li>',{
                    url : urlForPage(config.baseUrl, 1)
                }));
                pages.push(template('<li><a href="{{url}}" rel="prev"><span class="prev active">Prev</span></a></li>',{
                    url : urlForPage(config.baseUrl, config.currentPageNo - 1)
                }));
            }else{
                pages.push('<li><span class="first inactive">First</span></li>');
                pages.push('<li><span class="prev inactive">Prev</span></li>');
            }

            return this;
        },
        
        renderLastAndNextPage: function(){
            var pages = this.pages, config = this.config;

            if(config.currentPageNo < config.totalPages){
                pages.push(template('<li><a href="{{url}}" rel="next"><span class="next active">Next</span></a></li>',{
                    url : urlForPage(config.baseUrl, config.currentPageNo + 1)
                }));
                pages.push(template('<li><a href="{{url}}" rel="last">Last</a></li>',{
                    url : urlForPage(config.baseUrl, config.totalPages)
                }));
            }else{
                pages.push('<li><span class="next inactive">Next</span></li>');
                pages.push('<li><span class="icon-to-end inactive">Last</span></li>');
            }

            return this;
        },

        renderMainPages: function(){
            var config = this.config;
            var pages = this.pages, start, end;
            if(config.currentPageNo <= config.pageSize / 2 + 1){
                start = 1;
                end = Math.min(config.pageSize, config.totalPages);
            }else{
                //render Sibling pages according to Current page
               start = config.currentPageNo - Math.floor(config.pageSize / 2);
               end = Math.min(config.currentPageNo + Math.round(config.pageSize / 2) - 1, config.totalPages);
            }
            for(var i = start; i <= end; i++){
                pages.push(template('<li><a href="{{url}}" class="{{current}}">{{page}}</a></li>', {
                    url : urlForPage(config.baseUrl, i),
                    page : i,
                    current : i === config.currentPageNo ? 'current' : ''
                }));
            }
            return this;
        },

        toHtml: function(){
            this.renderFirstAndPrevPage()
                .renderMainPages()
                .renderLastAndNextPage();   

            return this.pages.join('');
        }
    };

    function template (tmpl, data) {
        return tmpl.replace(/\{\{\s*(.*?)\s*\}\}/g, function () {
            return data[arguments[1]] || "";
        });
    };

    function urlForPage(baseUrl, page){
        var search = window.location.search;
        return encodeURIComponent(search === "" ? baseUrl + page : baseUrl + page + search);
    };
})(typeof exports !== 'undefined' ? exports : window);